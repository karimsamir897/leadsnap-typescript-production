import { makeOAuthConsent } from './app';
// `agents` and `@modelcontextprotocol/sdk` versions must stay in sync with the pins/overrides in
// package.json. `agents` declares an exact pin on `@modelcontextprotocol/sdk`; if our resolved version
// drifts, npm installs a second copy under `agents/node_modules/`, and the two `McpServer` classes
// become distinct constructors, breaking `instanceof` checks inside `agents`.
import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import OAuthProvider from '@cloudflare/workers-oauth-provider';
import type { ExportedHandler } from '@cloudflare/workers-types';
import { ClientOptions } from 'leadsnap-test-typescript';
// Reuse the generated doc-search tool + local index straight from the MCP server package.
import docsSearchTool, { setLocalSearch } from 'leadsnap-test-mcp-server/docs-search-tool';
import { LocalDocsSearch } from 'leadsnap-test-mcp-server/local-docs-search';
import { configureLogger } from 'leadsnap-test-mcp-server/logger';
import { executeTool, runRemoteExecute } from './execute-tool';

type MCPProps = {
  clientProps: ClientOptions;
};

const SERVER_NAME = 'thrive_mcp';
const SERVER_VERSION = '0.0.1';
const INSTRUCTIONS =
  'Use `search_docs` to discover SDK methods, parameters, and usage examples before writing code. ' +
  'Use `execute` to run TypeScript against the Thrive SDK by defining an async `run(client)` function. ' +
  'Prefer searching the docs first, then executing.';

/**
 * The information displayed on the OAuth consent screen. Collects the two values we persist per
 * session: the Sanctum bearer token and the target environment.
 */
const serverConfig: ServerConfig = {
  orgName: 'ThriveMcp',
  instructionsUrl: undefined, // Set a url for where you show users how to get an API key
  logoUrl: undefined, // Set a custom logo url to appear during the OAuth flow
  clientProperties: [
    {
      key: 'bearerToken',
      label: 'Bearer Token',
      description:
        'Authenticate using a Sanctum bearer token. Use @unauthenticated on a route method to mark public endpoints.',
      required: true,
      default: undefined,
      placeholder: 'My Bearer Token',
      type: 'password',
    },
    {
      key: 'environment',
      label: 'Environment',
      description: 'The environment to use for the client',
      required: false,
      default: 'Leadsnap',
      placeholder: 'Leadsnap',
      type: 'select',
      options: [
        { label: 'Leadsnap', value: 'Leadsnap' },
        { label: 'Thrive', value: 'Thrive' },
        { label: 'Staging', value: 'Staging' },
        { label: 'Local', value: 'Local' },
      ],
    },
  ],
};

export class MyMCP extends McpAgent<Env, unknown, MCPProps> {
  #resolveServer!: (server: McpServer) => void;
  #rejectServer!: (error: unknown) => void;
  server: Promise<McpServer> = new Promise<McpServer>((resolve, reject) => {
    this.#resolveServer = resolve;
    this.#rejectServer = reject;
  });

  async init() {
    try {
      if (this.props == null) {
        throw new Error('MCP props are not initialized');
      }

      configureLogger({ level: 'info', pretty: false });

      const server = new McpServer(
        { name: SERVER_NAME, version: SERVER_VERSION },
        { instructions: INSTRUCTIONS, capabilities: { tools: {}, logging: {} } },
      );

      // The wiring the generated worker omitted: initialize the local docs index and register it.
      // No `docsDir` => embedded SDK methods + README only, so `node:fs` is never touched
      // (Worker-safe). After this, `docsSearchTool.handler` no longer throws "Local search not
      // initialized".
      setLocalSearch(await LocalDocsSearch.create());

      const props = this.props.clientProps;
      const env = this.env;
      const tools = [docsSearchTool.tool, executeTool];
      const low = server.server;

      low.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

      low.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args = {} } = request.params;

        // search_docs: served entirely by the local in-memory index (no network, no token).
        if (name === docsSearchTool.tool.name) {
          return docsSearchTool.handler({ reqContext: {} as any, args });
        }

        // execute: delegate to the remote Deno sandbox, forwarding the session token + environment.
        if (name === executeTool.name) {
          return runRemoteExecute({
            args: args as { code?: string; intent?: string },
            bearerToken: props?.bearerToken,
            environment: props?.environment,
            sandboxUrl: env.CODE_SANDBOX_URL,
            sharedSecret: env.SANDBOX_SHARED_SECRET,
          });
        }

        throw new Error(`Unknown tool: ${name}`);
      });

      this.#resolveServer(server);
    } catch (error) {
      this.#rejectServer(error);
      throw error;
    }
  }
}

export type ServerConfig = {
  /**
   * The name of the company/project
   */
  orgName: string;

  /**
   * An optional company logo image
   */
  logoUrl?: string;

  /**
   * An optional URL with instructions for users to get an API key
   */
  instructionsUrl?: string;

  /**
   * Properties collected to initialize the client
   */
  clientProperties: ClientProperty[];
};

export type ClientProperty = {
  key: string;
  label: string;
  description?: string;
  required: boolean;
  default?: unknown;
  placeholder?: string;
  type: 'string' | 'number' | 'password' | 'select';
  options?: { label: string; value: string }[];
};

// Export the OAuth handler as the default
export default new OAuthProvider({
  apiHandlers: {
    // @ts-ignore - Headers type mismatch between agents' handler and ExportedHandler; compatible at runtime.
    '/sse': MyMCP.serveSSE('/sse'), // legacy SSE
    // @ts-ignore - Headers type mismatch between agents' handler and ExportedHandler; compatible at runtime.
    '/mcp': MyMCP.serve('/mcp'), // Streaming HTTP
  },
  // Type assertion needed due to Headers type mismatch between Hono and @cloudflare/workers-types
  // At runtime, Hono's fetch handler is fully compatible with ExportedHandler
  defaultHandler: makeOAuthConsent(serverConfig) as unknown as ExportedHandler,
  authorizeEndpoint: '/authorize',
  tokenEndpoint: '/token',
  clientRegistrationEndpoint: '/register',
});
