/**
 * Self-hosted code-execution sandbox for the Thrive/LeadSnap MCP server.
 *
 * The Cloudflare-hosted MCP server (`thrive-mcp-mcp`) runs its `execute` code tool in "remote"
 * mode: it POSTs the user's code to whatever `CODE_MODE_ENDPOINT_URL` points at, using the same
 * request/response contract as Stainless's hosted code-tool. By pointing that env var at THIS
 * service we run the code ourselves, so outbound calls to app.crmthrive.com are no longer subject
 * to Stainless's sandbox egress allowlist.
 *
 * The execution core (run-function extraction, TS check, SDK proxy, tseval, console capture) is
 * ported almost verbatim from `packages/mcp-server/src/code-tool-worker.ts`. The only genuinely new
 * code is `Deno.serve`, which translates the remote POST contract into the `{ opts, code }` shape
 * the ported core expects.
 *
 * Why Deno: the core executes user code via `tseval` -> `import('data:application/typescript;...')`,
 * which Deno runs natively but a plain Cloudflare Worker blocks.
 */

import { ThriveMcp, type ClientOptions } from 'npm:leadsnap-mcp@0.6.0';
import ts from 'npm:typescript@5.8.3';
import Fuse from 'npm:fuse.js@7';
import util from 'node:util';
import { Buffer } from 'node:buffer';

type WorkerOutput = {
  is_error: boolean;
  result: unknown | null;
  log_lines: string[];
  err_lines: string[];
};

// ---------------------------------------------------------------------------
// Execution core — ported from packages/mcp-server/src/code-tool-worker.ts
// ---------------------------------------------------------------------------

async function tseval(code: string) {
  return import('data:application/typescript;charset=utf-8;base64,' + Buffer.from(code).toString('base64'));
}

function getRunFunctionSource(code: string): {
  type: 'declaration' | 'expression';
  client: string | undefined;
  code: string;
} | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter();

  for (const statement of sourceFile.statements) {
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return {
          type: 'declaration',
          client: statement.parameters[0]?.name.getText(),
          code: printer.printNode(ts.EmitHint.Unspecified, statement.body!, sourceFile),
        };
      }
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === 'run' &&
          declaration.initializer &&
          (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
        ) {
          return {
            type: 'expression',
            client: declaration.initializer.parameters[0]?.name.getText(),
            code: printer.printNode(ts.EmitHint.Unspecified, declaration.initializer, sourceFile),
          };
        }
      }
    }
  }

  return null;
}

const fuse = new Fuse(
  [
    'client.public.api.v1.heatmap.createHeatmap',
    'client.public.api.v1.heatmap.generateGridPoints',
    'client.public.api.v1.heatmap.listHeatmaps',
    'client.public.api.v1.heatmap.listLocations',
    'client.public.api.v1.heatmap.retrieveHeatmap',
    'client.public.api.v1.heatmap.retrieveHeatmapCompetitors',
    'client.public.api.v1.heatmap.retrieveHeatmapPoint',
    'client.public.api.v1.heatmap.schedules.createSchedule',
    'client.public.api.v1.heatmap.schedules.listSchedules',
    'client.public.api.v1.heatmap.schedules.pauseSchedule',
    'client.public.api.v1.heatmap.schedules.resumeSchedule',
    'client.public.api.v1.heatmap.schedules.retrieveSchedule',
    'client.public.api.v1.heatmap.schedules.updateSchedule',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

function parseError(code: string, error: unknown): string | undefined {
  if (!(error instanceof Error)) return;
  const cause = error.cause instanceof Error ? `: ${error.cause.message}` : '';
  const message = error.name ? `${error.name}: ${error.message}${cause}` : `${error.message}${cause}`;
  try {
    const lineNumber = error.stack?.match(/<anonymous>:([0-9]+):[0-9]+/)?.[1];
    const line =
      lineNumber &&
      code
        .split('\n')
        .at(parseInt(lineNumber, 10) - 1)
        ?.trim();
    return line ? `${message}\n  at line ${lineNumber}\n    ${line}` : message;
  } catch {
    return message;
  }
}

/**
 * Runs `code` (a top-level `run(client)` function) against a `ThriveMcp` client built from `opts`,
 * capturing console output. Returns a JSON Response carrying a `WorkerOutput`.
 */
async function runCode({ opts, code }: { opts: ClientOptions; code: string }): Promise<Response> {
  const runFunctionSource = code ? getRunFunctionSource(code) : null;
  if (!runFunctionSource) {
    const message =
      code ?
        'The code is missing a top-level `run` function.'
      : 'The code argument is missing. Provide one containing a top-level `run` function.';
    return Response.json(
      {
        is_error: true,
        result: `${message} Write code within this template:\n\n\`\`\`\nasync function run(client) {\n  // Fill this out\n}\n\`\`\``,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  // NB: the original worker also runs `getTSDiagnostics` here as a pre-flight type check. That relies
  // on resolving `leadsnap-mcp`'s types through the worker package's node_modules; under Deno's npm:
  // resolution the compiler host can't find them and emits false "Cannot find module" errors, so the
  // gate is omitted. It was always a nicety, not a correctness gate — runtime errors are still
  // reported via `parseError` below.

  let client: ThriveMcp;
  try {
    client = new ThriveMcp({ ...opts });
  } catch (e) {
    return Response.json(
      {
        is_error: true,
        result: parseError(code, e) ?? 'Failed to initialize the SDK client.',
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const log_lines: string[] = [];
  const err_lines: string[] = [];
  const originalConsole = globalThis.console;
  globalThis.console = {
    ...originalConsole,
    log: (...args: unknown[]) => {
      log_lines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      err_lines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (_client: any) => {};
    run_ = (await tseval(`${code}\nexport default run;`)).default;
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      is_error: false,
      result,
      log_lines,
      err_lines,
    } satisfies WorkerOutput);
  } catch (e) {
    return Response.json(
      {
        is_error: true,
        result: parseError(code, e),
        log_lines,
        err_lines,
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  } finally {
    globalThis.console = originalConsole;
  }
}

// ---------------------------------------------------------------------------
// HTTP adapter — speaks the remote code-tool contract the MCP server POSTs.
//
// Request:  POST  (any path)
//   headers: x-stainless-mcp-client-envs = JSON { THRIVE_MCP_BEARER_TOKEN, THRIVE_MCP_BASE_URL }
//   body:    { project_name, code, intent?, client_opts?: { environment? } }
// Response: WorkerOutput { is_error, result, log_lines, err_lines }
// ---------------------------------------------------------------------------

const SHARED_SECRET = Deno.env.get('SANDBOX_SHARED_SECRET');

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'GET') {
    // Lightweight health check (Deno Deploy hits "/" for status).
    return new Response('ok', { status: 200 });
  }
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Optional shared-secret gate. The MCP server forwards a Stainless API key (if configured) as the
  // `Authorization` header; set SANDBOX_SHARED_SECRET here and STAINLESS_API_KEY on the worker to the
  // same value to require it. Left unset = open (rely on a non-guessable URL + the caller needing a
  // valid Thrive bearer token).
  if (SHARED_SECRET && req.headers.get('authorization') !== SHARED_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  let body: { code?: string; client_opts?: { environment?: string } };
  try {
    body = await req.json();
  } catch {
    return Response.json(
      {
        is_error: true,
        result: 'Request body must be JSON.',
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400 },
    );
  }

  let clientEnvs: Record<string, string | undefined> = {};
  const envsHeader = req.headers.get('x-stainless-mcp-client-envs');
  if (envsHeader) {
    try {
      const parsed = JSON.parse(envsHeader);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) clientEnvs = parsed;
    } catch {
      // Ignore a malformed header; fall through to the missing-token check below.
    }
  }

  const bearerToken = clientEnvs.THRIVE_MCP_BEARER_TOKEN;
  if (!bearerToken) {
    return Response.json(
      {
        is_error: true,
        result:
          "Missing THRIVE_MCP_BEARER_TOKEN in the x-stainless-mcp-client-envs header. The MCP server should forward it from the connection's bearer token.",
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400 },
    );
  }

  const baseURL = clientEnvs.THRIVE_MCP_BASE_URL;
  const environment = body.client_opts?.environment;

  // baseURL and environment are mutually exclusive in the SDK; prefer the forwarded baseURL.
  const opts: ClientOptions = {
    ...(baseURL ? { baseURL }
    : environment ? { environment: environment as ClientOptions['environment'] }
    : {}),
    bearerToken,
    defaultHeaders: { 'X-Stainless-MCP': 'true' },
  };

  return await runCode({ opts, code: body.code ?? '' });
});
