# code-tool-sandbox

A self-hosted code-execution sandbox for the Thrive/LeadSnap MCP server, deployable to **Deno Deploy**.

## Why this exists

The Cloudflare-hosted MCP server bundles an `execute` code tool. In the deployed package
(`thrive-mcp-mcp`) that tool runs in **remote mode** — it POSTs the user's code to
`CODE_MODE_ENDPOINT_URL` (default: `https://api.stainless.com/api/ai/code-tool`). Stainless's hosted
sandbox blocks outbound network access to `app.crmthrive.com`:

> Network access to app.crmthrive.com:443 is blocked.

This service implements the **same request/response contract** as Stainless's endpoint, but runs the
code on infrastructure **we** control, so calls to `app.crmthrive.com` are not blocked. Point the MCP
server's `CODE_MODE_ENDPOINT_URL` at this service and the `execute` tool works against Thrive.

It reuses the proven execution core from `packages/mcp-server/src/code-tool-worker.ts` (run-function
extraction, optional TS check, SDK proxy, `tseval`, console capture). This works on **Deno** but not on
a plain Cloudflare Worker, because the core executes user code via
`import('data:application/typescript;...')`, which Deno supports natively and Workers block.

## The contract

```
POST /  (any path)
  headers:
    content-type: application/json
    x-stainless-mcp-client-envs: {"THRIVE_MCP_BEARER_TOKEN":"...","THRIVE_MCP_BASE_URL":"https://app.crmthrive.com"}
    authorization: <shared secret>        # only if SANDBOX_SHARED_SECRET is set
  body:
    { "project_name": "thrive-mcp", "code": "async function run(client){...}", "intent?": "...", "client_opts?": { "environment?": "Thrive" } }

200 / 400 response body:
  { "is_error": boolean, "result": unknown, "log_lines": string[], "err_lines": string[] }
```

The SDK client is built from the forwarded `x-stainless-mcp-client-envs` (bearer token + base URL).
`baseURL` and `environment` are mutually exclusive in the SDK, so the forwarded `THRIVE_MCP_BASE_URL`
takes precedence over `client_opts.environment`.

## Run locally

```bash
deno task start          # http://localhost:8000
# smoke test (no network call — just exercises the executor):
curl -sX POST http://localhost:8000 \
  -H 'content-type: application/json' \
  -H 'x-stainless-mcp-client-envs: {"THRIVE_MCP_BEARER_TOKEN":"test","THRIVE_MCP_BASE_URL":"https://app.crmthrive.com"}' \
  -d '{"project_name":"thrive-mcp","client_opts":{},"code":"async function run(client){ console.log(\"hi\"); return 1+1; }"}'
# => {"is_error":false,"result":2,"log_lines":["hi"],"err_lines":[]}
```

A real Thrive call (needs a valid bearer token):

```bash
curl -sX POST http://localhost:8000 \
  -H 'content-type: application/json' \
  -H 'x-stainless-mcp-client-envs: {"THRIVE_MCP_BEARER_TOKEN":"<thrive-token>","THRIVE_MCP_BASE_URL":"https://app.crmthrive.com"}' \
  -d '{"project_name":"thrive-mcp","client_opts":{},"code":"async function run(client){ return await client.public.api.v1.heatmap.generateGridPoints({grid_radius:500,grid_size:7,lat:37.7749,lng:-122.4194}); }"}'
```

## Deploy to Deno Deploy

> Use the **new** Deno Deploy platform (dashboard: https://console.deno.com). The old
> `deployctl` / `dash.deno.com` "Classic" platform no longer creates new projects (sunset 2026-07-20).
> The new platform uses the `deno deploy` command built into the Deno runtime.

```bash
# one-time: have a (free) org at https://console.deno.com
cd packages/code-tool-sandbox
deno deploy            # interactive: prompts login -> create/select org+app -> detects main.ts -> deploys
                       # prints the live URL, e.g. https://<app>.deno.dev
```

That URL is the value to set as `CODE_MODE_ENDPOINT_URL` on the MCP worker. Redeploy after changes by
re-running `deno deploy`. Stream logs with `deno deploy logs`. (If the interactive flow misbehaves on
an older Deno, `deno upgrade` first.)

### Optional: require a shared secret

```bash
deno deploy env add SANDBOX_SHARED_SECRET "<random-value>" --secret
```

Requests must then send `authorization: <that value>`. The MCP server only forwards an `Authorization`
header when a Stainless API key is configured for it, so requiring this also means wiring that key on
the worker — left off by default.

## Egress note

Deno Deploy does not enforce `--allow-net`, so there is no permission-level egress sandbox there. The
executor still only does what the submitted code does, using a bearer token the caller must supply, and
realistically reaches `app.crmthrive.com`. If you later want hard egress lockdown (prevent a malicious
snippet from exfiltrating the token), self-host instead with
`deno run --allow-net=app.crmthrive.com --allow-env --allow-read main.ts` — no code change needed.

## Wiring the MCP server (one-time)

In `packages/mcp-server/cloudflare-worker/wrangler.jsonc`:

1. Enable `process.env` population (this worker's compat date predates the 2025-04-01 default), so the
   server's `readEnv('CODE_MODE_ENDPOINT_URL')` sees the var:
   ```jsonc
   "compatibility_flags": ["nodejs_compat", "nodejs_compat_populate_process_env"]
   ```
2. Point the code tool at this service:
   ```jsonc
   "vars": { "CODE_MODE_ENDPOINT_URL": "https://<project>.deno.dev" }
   ```
3. `npm run deploy`.

**Do not** set `THRIVE_MCP_BASE_URL` / `THRIVE_MCP_ENVIRONMENT` as worker vars — a precedence quirk in
the package would then forward `undefined` and the sandbox would fall back to Leadsnap. The base URL
must keep coming from the **Thrive** selection in the OAuth consent form.
