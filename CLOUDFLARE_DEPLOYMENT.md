# Cloudflare Pages Deployment Guide

This monorepo contains multiple sites that are deployed to separate Cloudflare Pages instances:

- `ryancruz.com` - Personal site (in the `apps/main` directory)
- `tools.ryancruz.com` - Development tools (in the `apps/tools` directory)

## Deployment Configuration

Each site is deployed as a separate Cloudflare Pages project from the same GitHub repository using Cloudflare's GitHub integration and build watch paths.

### Configuration for Cloudflare Pages

For each Cloudflare Pages project, use the following settings:

1. **GitHub Integration**:
   - Connect the GitHub repository to Cloudflare Pages
   - Set up build watches for the specific app directories

2. **Build settings**:
   - **Build command**: Use the standard Next.js build command
     ```
     npm run build
     ```

3. **Build output directory**:
   - `.next` (standard Next.js output directory)

4. **Environment variables**:
   - `NODE_VERSION`: 18.17.0 (or latest LTS)
   - `NEXT_TELEMETRY_DISABLED`: 1

## Build Watch Paths

Cloudflare Pages can be configured to only build when specific files change. This is useful for a monorepo setup:

### Main site (ryancruz.com):
- `apps/main/**/*`
- `packages/**/*`

### Tools site (tools.ryancruz.com):
- `apps/tools/**/*`
- `packages/**/*`

## Testing Locally

To test the build process locally:

```bash
# To build all apps
bun build

# To build the main site only
bun --cwd apps/main build

# To build the tools site only
bun --cwd apps/tools build
```

## Migration to Next.js App Router

This project has been migrated from a custom Vite-based build to Next.js App Router for better performance, developer experience, and easier deployment.

### Key Changes

1. Switched from Vite to Next.js for both apps
2. Implemented App Router for improved routing and data fetching
3. Streamlined the UI components to exclusively use shadcn/ui
4. Configured for direct deployment from GitHub to Cloudflare Pages
