import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * The `execute` code tool, re-implemented for a Cloudflare Worker.
 *
 * The generated MCP server runs this tool with a *local* Deno subprocess
 * (packages/mcp-server/src/code-tool.ts), which a Worker cannot spawn. Instead we POST the user's
 * code to the remote Deno sandbox (packages/code-tool-sandbox) and translate its response into MCP
 * content blocks. The tool definition (name/description/inputSchema) and the response mapping are
 * kept identical to the generated tool so MCP clients see the same behavior.
 */

type TextBlock = { type: 'text'; text: string };
type ToolResult = { content: TextBlock[]; isError?: boolean };

/** Response contract of the remote Deno sandbox (see code-tool-sandbox/main.ts `WorkerOutput`). */
type SandboxOutput = {
  is_error: boolean;
  result: unknown;
  log_lines: string[];
  err_lines: string[];
};

// Description copied verbatim from packages/mcp-server/src/code-tool.ts so the tool behaves the same.
const prompt = `Runs JavaScript code to interact with the Thrive Mcp API.

You are a skilled TypeScript programmer writing code to interface with the service.
Define an async function named "run" that takes a single parameter of an initialized SDK client and it will be run.
For example:

\`\`\`
async function run(client) {
  const response = await client.public.api.v1.heatmap.generateGridPoints({
    grid_radius: 0,
    grid_size: 0,
    lat: 0,
    lng: 0,
  });

  console.log(response.count);
}
\`\`\`

You will be returned anything that your function returns, plus the results of any console.log statements.
Do not add try-catch blocks for single API calls. The tool will handle errors for you.
Do not add comments unless necessary for generating better code.
Code will run in a container, and cannot interact with the network outside of the given SDK client.
Variables will not persist between calls, so make sure to return or log any data you might need later.
Remember that you are writing TypeScript code, so you need to be careful with your types.
Always type dynamic key-value stores explicitly as Record<string, YourValueType> instead of {}.`;

export const executeTool: Tool = {
  name: 'execute',
  description: prompt,
  inputSchema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'Code to execute.',
      },
      intent: {
        type: 'string',
        description: 'Task you are trying to perform. Used for improving the service.',
      },
    },
    required: ['code'],
  },
};

function asError(message: string): ToolResult {
  return { content: [{ type: 'text', text: message }], isError: true };
}

/**
 * Runs the user's code by delegating to the remote Deno sandbox.
 *
 * Forwards, per the sandbox contract:
 *  - `THRIVE_MCP_BEARER_TOKEN` (the session bearer token) inside the `x-stainless-mcp-client-envs` header,
 *  - the selected `environment` as `client_opts.environment` in the body (the sandbox resolves the base
 *    URL from it; we deliberately do NOT forward THRIVE_MCP_BASE_URL — see the sandbox README),
 *  - the optional `sharedSecret` as the `Authorization` header (only if the sandbox requires one).
 */
export async function runRemoteExecute(params: {
  args: { code?: string; intent?: string };
  bearerToken: string | undefined;
  environment: string | undefined;
  sandboxUrl: string | undefined;
  sharedSecret?: string | undefined;
}): Promise<ToolResult> {
  const { args, bearerToken, environment, sandboxUrl, sharedSecret } = params;

  if (!sandboxUrl) {
    return asError('CODE_SANDBOX_URL is not configured on the worker.');
  }
  if (!bearerToken) {
    return asError('Missing bearer token for this session; cannot run code. Re-authenticate the MCP connection.');
  }

  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'x-stainless-mcp-client-envs': JSON.stringify({ THRIVE_MCP_BEARER_TOKEN: bearerToken }),
  };
  if (sharedSecret) {
    headers['authorization'] = sharedSecret;
  }

  const body = JSON.stringify({
    project_name: 'thrive-mcp',
    code: args.code ?? '',
    ...(args.intent ? { intent: args.intent } : {}),
    client_opts: { ...(environment ? { environment } : {}) },
  });

  let resp: Response;
  try {
    resp = await fetch(sandboxUrl, { method: 'POST', headers, body });
  } catch (e) {
    return asError(
      `Failed to reach the code sandbox at ${sandboxUrl}: ${e instanceof Error ? e.message : String(e)}`,
    );
  }

  let out: SandboxOutput;
  try {
    out = (await resp.json()) as SandboxOutput;
  } catch {
    const text = await resp.text().catch(() => '');
    return asError(`Code sandbox returned a non-JSON response (status ${resp.status}): ${text.slice(0, 500)}`);
  }

  // Map { is_error, result, log_lines, err_lines } -> MCP content blocks, mirroring the generated
  // local handler (packages/mcp-server/src/code-tool.ts:263-316).
  const blocks: TextBlock[] = [];
  if (out.result != null) {
    blocks.push({
      type: 'text',
      text: typeof out.result === 'string' ? out.result : JSON.stringify(out.result),
    });
  }
  if (out.log_lines?.length) {
    blocks.push({ type: 'text', text: out.log_lines.join('\n') });
  }
  if (out.err_lines?.length) {
    blocks.push({ type: 'text', text: 'Error output:\n' + out.err_lines.join('\n') });
  }
  if (blocks.length === 0) {
    blocks.push({
      type: 'text',
      text: out.is_error ? 'Code execution failed with no output.' : 'Code executed with no output.',
    });
  }

  const isError = out.is_error || !resp.ok;
  return { content: blocks, ...(isError ? { isError: true } : {}) };
}
