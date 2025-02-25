# Tools Site (tools.ryancruz.com)

This is the developer tools website that hosts various utilities.

## Development

From the root of the monorepo:

```bash
# Start just this app
bun run --filter=tools dev

# Build just this app
bun run --filter=tools build
```

Or from this directory:

```bash
# Start dev server
bun run dev

# Build for production
bun run build
```

## Structure

- `src/` - Source code
  - `components/` - Site-specific components
  - `tools/` - Individual tools
  - `App.tsx` - Main app component
  - `main.tsx` - Entry point

## Adding a New Tool

1. Create a new directory in `src/tools/`
2. Add the tool to the index in `src/tools/index.ts`
3. Create a route for the tool in your routing configuration

## Deployment

This site is automatically deployed to Cloudflare Pages whenever changes are pushed to the main branch.
