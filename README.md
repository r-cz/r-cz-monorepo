# ryancruz.com Monorepo

This monorepo contains two main applications:

- `ryancruz.com` - Personal site (in the `apps/main` directory)
- `tools.ryancruz.com` - Development tools (in the `apps/tools` directory)

## Tech Stack

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: Bun
- **Monorepo Management**: Turborepo

## Project Structure

```
r-cz-monorepo/
├── apps/
│   ├── main/           # Personal website (ryancruz.com)
│   └── tools/          # Developer tools (tools.ryancruz.com)
├── packages/
│   ├── assets/         # Shared static assets (icons, manifest files)
│   ├── config/         # Shared configuration (TypeScript, Tailwind, ESLint, Next.js)
│   ├── theme-sync/     # Theme persistence and synchronization
│   └── ui/             # Shared UI components and styles
└── docs/
    └── monorepo-optimizations.md  # Documentation on code sharing strategies
```

## Local Development

### Prerequisites

- [Bun](https://bun.sh/) (version 1.0.0 or higher)
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)

### Getting Started

1. Install dependencies:

```bash
bun install
```

2. Start the development server:

```bash
# Run all apps
bun dev

# Run a specific app
bun --cwd apps/main dev
bun --cwd apps/tools dev
```

3. Open your browser:
   - Main site: [http://localhost:3000](http://localhost:3000)
   - Tools site: [http://localhost:3001](http://localhost:3001)

## Build

To build all applications:

```bash
bun run build
```

To build a specific application:

```bash
# Build main site
bun --cwd apps/main build

# Build tools site
bun --cwd apps/tools build
```

## Updating Dependencies

To update dependencies across all packages in the monorepo:

```bash
bun run update-all
```

This command uses Turborepo to run `bun update --latest` in parallel across all workspaces, ensuring all package.json files are updated consistently.

## Clean

You can clean all build artifacts, node_modules, and cache directories using the clean script:

```bash
# Regular clean with confirmation prompt
bun clean

# Preview what would be cleaned (dry run)
bun clean:dry

# Clean without confirmation
bun clean:force
```

The clean script removes:
- All node_modules directories
- .next build directories
- out directories (Next.js exports)
- dist directories (in packages)
- .turbo cache directory

## Deployment

This project is deployed to Cloudflare Pages using Cloudflare's GitHub integration. Each site is deployed as a separate Cloudflare Pages project but they share the same GitHub repository.

Deployment is handled via Cloudflare Pages with build watch paths configured in the Cloudflare dashboard.

## Shared Code Strategy

This monorepo uses several strategies to reduce duplication and promote code reuse:

1. **Shared UI Components**: Common components like Header, Footer, and ThemeToggle are in `packages/ui`
2. **Shared Configurations**: Base configs for Next.js, TypeScript, Tailwind, and PostCSS in `packages/config`
3. **Shared Assets**: Common static assets like icons and manifest templates in `packages/assets`
4. **Shared Styles**: Base CSS and theme variables in `packages/ui/src/styles`
5. **Theme Synchronization**: Cross-app theme persistence in `packages/theme-sync`

See [monorepo-optimizations.md](./docs/monorepo-optimizations.md) for detailed documentation.

## Working with UI Components

### Adding a New shadcn/ui Component

1. Install the component using the shadcn-ui CLI
2. Add the component to the `packages/ui/src/components/ui` directory
3. Export the component from `packages/ui/src/index.ts`

### Adding a New Shared Component

1. Create the component in `packages/ui/src/components/common`
2. Export it from `packages/ui/src/components/common/index.ts`
3. Make sure it's exported from the main `packages/ui/src/index.ts`

### Using Shared Assets

Add new shared assets directly to the `packages/assets` directories:

```bash
# For icons, favicons, etc.
packages/assets/icons/

# For social preview images
packages/assets/social/
```

To update shared assets from app directories (for migration purposes):

```bash
bun run update-shared-assets
```

## Adding a New Tool

1. Create a new tool component in `apps/tools/src/tools`
2. Create a new route in `apps/tools/src/app`
3. Add the tool to the list in `apps/tools/src/app/page.tsx`

## Testing

This project uses Playwright for end-to-end testing. The tests are defined in the `tests` directory.

```bash
# Run all tests
bun run test

# Run tests for specific site
bun run test:main
bun run test:tools

# Run tests with UI mode for debugging
bun run test:ui
```

See [tests/README.md](./tests/README.md) for more details on testing.

## License

All rights reserved.
