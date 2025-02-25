# Ryan Cruz Monorepo

This monorepo contains various websites and applications for the ryancruz.com domain:

- `apps/main` - The main personal site (ryancruz.com)
- `apps/tools` - Developer tools and utilities (tools.ryancruz.com)
- `packages/ui` - Shared UI components
- `packages/theme` - Shared theming logic
- `packages/config` - Shared configurations

## Development

```bash
# Install dependencies
bun install

# Start development servers for all applications
bun run dev

# Build all applications
bun run build

# Preview all applications
bun run preview
```

## Project Structure

```
r-cz-monorepo/
├── apps/
│   ├── main/         (ryancruz.com)
│   ├── tools/        (tools.ryancruz.com)
│   └── [future sites]
├── packages/
│   ├── ui/           (shared components)
│   ├── config/       (shared configs)
│   └── theme/        (shared theme logic)
├── package.json
└── turbo.json
```

## Adding a New Site

To add a new site to the monorepo:

1. Create a new directory under `apps/`
2. Set up the package.json with dependencies on shared packages
3. Import and use shared components and configurations
