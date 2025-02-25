# Main Site (ryancruz.com)

This is the main personal website for Ryan Cruz.

## Development

From the root of the monorepo:

```bash
# Start just this app
bun run --filter=main dev

# Build just this app
bun run --filter=main build
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
  - `App.tsx` - Main app component
  - `main.tsx` - Entry point

## Deployment

This site is automatically deployed to Cloudflare Pages whenever changes are pushed to the main branch.
