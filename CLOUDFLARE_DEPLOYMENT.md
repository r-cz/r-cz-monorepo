# Cloudflare Pages Deployment Guide

This monorepo contains multiple sites that are deployed to separate Cloudflare Pages instances:

- `ryancruz.com` - Personal site (in the `apps/main` directory)
- `tools.ryancruz.com` - Development tools (in the `apps/tools` directory)

## Deployment Configuration

Each site is deployed as a separate Cloudflare Pages project, but they share the same GitHub repository.

### Configuration for Cloudflare Pages

For each Cloudflare Pages project, use the following build settings:

1. **Build command:**
   ```
   bun run build:cf
   ```

2. **Build output directory:**
   - For `ryancruz.com`: `apps/main/dist`
   - For `tools.ryancruz.com`: `apps/tools/dist`

3. **Environment variables:**
   - `NODE_VERSION`: 18.17.0 (or latest LTS)
   - `CF_PAGES_BRANCH`: Set this to match the app directory name
     - For main site: `main`
     - For tools site: `tools`

## How It Works

The `build:cf` script ensures proper build order for all dependencies:

1. First, it analyzes and builds all package dependencies in the correct order
   - Only packages with a defined build script in their package.json will be built
   - It builds them in sequence: config → theme → shadcn-ui → ui

2. Then, it builds the specific app based on the `CF_PAGES_BRANCH` environment variable

This ensures that when Cloudflare Pages builds your project, all internal dependencies are correctly built and available before the app itself is built.

## Common Deployment Issues

### Problem: "Failed to resolve entry for package @r-cz/shadcn-ui"

This occurs when the build process on Cloudflare Pages attempts to build the main app before its dependencies are properly built. Our custom build script fixes this by ensuring dependencies are built first.

## Local Testing

To test the build process locally:

```bash
# To build the main site
APP_TO_BUILD=main bun ./cloudflare-build.js

# To build the tools site
APP_TO_BUILD=tools bun ./cloudflare-build.js
```

## Future Improvements

- Consider adding a pre-commit hook to ensure all packages build successfully before committing
- If package structure changes, update the order in the `cloudflare-build.js` script
- For complex dependency changes, consider using turborepo's dependency graph instead of hardcoded order
