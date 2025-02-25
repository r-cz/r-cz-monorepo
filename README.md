# Ryan Cruz Monorepo

This monorepo houses multiple websites and applications under the ryancruz.com domain, providing shared components, configurations, and theme logic.

## Sites

- [ryancruz.com](https://ryancruz.com) - Main personal website
- [tools.ryancruz.com](https://tools.ryancruz.com) - Developer tools and utilities

## Structure

```
r-cz-monorepo/
├── apps/                 # Individual applications
│   ├── main/            # ryancruz.com
│   └── tools/           # tools.ryancruz.com
├── packages/             # Shared packages
│   ├── ui/              # UI components
│   ├── theme/           # Theme functionality
│   └── config/          # Shared configurations
```

## Development

```bash
# Install dependencies
bun install

# Start development servers
bun run dev

# Build all sites
bun run build

# Lint code
bun run lint

# Format code
bun run format
```

## Adding a New Site

1. Create a new directory in `apps/`
2. Set up dependencies to use shared packages
3. Import shared components and configurations

## Deployment

Each site is automatically deployed to Cloudflare Pages when changes are pushed to the main branch.
