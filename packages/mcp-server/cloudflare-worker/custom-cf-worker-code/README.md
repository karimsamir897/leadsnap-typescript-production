# Custom Cloudflare Worker Code

This directory contains custom code extensions for the LeadSnap MCP Server Cloudflare Worker deployment.

## Overview

The Cloudflare Worker hosts the MCP Server and provides OAuth authentication for API token management. This `custom-cf-worker-code` directory allows you to extend the worker with custom middleware, routes, or utilities without modifying the core server implementation.

## Structure

- `README.md` - Documentation for custom extensions (this file)
- Additional code files should be added here as needed

## Use Cases

Custom code in this directory can be used for:

- **Custom Middleware**: Add request/response processing before reaching the MCP server
- **Additional Routes**: Extend the worker with new HTTP endpoints
- **Utilities**: Helper functions for authentication, validation, or data transformation
- **Hooks**: Integrate with external services or monitoring tools
- **Request/Response Transformation**: Modify payloads for specific use cases

## Getting Started

### Adding Custom Routes

Create new route handlers in this directory and import them in the main worker configuration:

```typescript
// custom-route.ts
import { Hono } from 'hono';

export function createCustomRoutes(config: ServerConfig) {
  const app = new Hono();

  app.get('/custom/health', (c) => {
    return c.json({ status: 'healthy' });
  });

  return app;
}
```

### Custom Middleware

Add middleware to process all incoming requests:

```typescript
// custom-middleware.ts
import type { HonoRequest } from 'hono';

export function customLogging(req: HonoRequest) {
  console.log(`[Custom] ${req.method} ${req.url}`);
}
```

### Integration Points

The custom code can integrate with:

- **OAuth Flow**: Extend the authorization process in `app.ts`
- **Server Configuration**: Modify configuration passed to the MCP server
- **Client Properties**: Add additional fields to the OAuth consent screen
- **Request Validation**: Add custom validation logic before MCP routes

## Development

### Local Testing

1. Make changes to files in this directory
2. Import and use them in the cloudflare-worker `src/index.ts` or `src/app.ts`
3. Run `npm run dev` to test locally
4. Use the MCP Inspector to validate functionality

### Best Practices

- Keep custom code modular and focused on a single responsibility
- Use TypeScript for type safety
- Document any new environment variables or configuration options
- Test thoroughly before deploying to production
- Consider error handling and logging for debugging

## Environment Variables

If your custom code requires environment variables, add them to:

1. `wrangler.jsonc` for local development
2. Cloudflare Worker secrets for production deployment

Example:

```jsonc
{
  "env": {
    "production": {
      "vars": {
        "CUSTOM_API_KEY": "your-key-here"
      }
    }
  }
}
```

## Deployment

Custom code is automatically included when deploying the Cloudflare Worker:

```bash
# Build and deploy
npm run build
npm run deploy
```

## Troubleshooting

- **Code not loading**: Ensure imports are properly added to `index.ts` or `app.ts`
- **Type errors**: Verify TypeScript types match the Hono and MCP SDK versions
- **Environment variables not available**: Check `wrangler.jsonc` and Cloudflare Worker secrets
- **Runtime errors**: Check Cloudflare Worker logs in the dashboard or via `wrangler tail`

## Related Documentation

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Hono Framework](https://hono.dev/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [MCP Server Documentation](../README.md)
