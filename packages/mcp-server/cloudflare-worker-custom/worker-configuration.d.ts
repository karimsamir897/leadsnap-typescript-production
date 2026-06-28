/// <reference types="@cloudflare/workers-types" />

// Minimal hand-written env typing for this worker's bindings and vars.
// Declared in the `Cloudflare.Env` namespace so both the global `Env` and the `env` exported from
// `cloudflare:workers` (used in src/utils.ts) see these members.
// Regenerate from wrangler.jsonc anytime with `npm run cf-typegen`; then re-add SANDBOX_SHARED_SECRET,
// which is a secret and therefore not present in wrangler.jsonc.
declare namespace Cloudflare {
  interface Env {
    /** Durable Object that hosts the per-session MCP server (agents McpAgent). */
    MCP_OBJECT: DurableObjectNamespace;
    /** KV namespace used by @cloudflare/workers-oauth-provider to store grants/tokens. */
    OAUTH_KV: KVNamespace;
    /** Static assets binding (serves ./static, e.g. home.md). */
    ASSETS: Fetcher;
    /** URL of the remote Deno sandbox that runs the `execute` code tool. */
    CODE_SANDBOX_URL: string;
    /** Optional shared secret forwarded as the Authorization header to the sandbox. */
    SANDBOX_SHARED_SECRET?: string;
  }
}

interface Env extends Cloudflare.Env {}
