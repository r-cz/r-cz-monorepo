# Cloudflare Pages Setup Instructions

To deploy your monorepo sites on Cloudflare Pages, follow these steps.

## Site #1: ryancruz.com (main site)

1. Login to Cloudflare dashboard
2. Go to Pages > Create a project
3. Connect to your GitHub repository "r-cz/r-cz-monorepo"
4. Configure with these build settings:
   - **Project name**: main-site
   - **Production branch**: main
   - **Build command**: `bun run build:cf`
   - **Build output directory**: apps/main/dist
   - **Environment variables**:
     - `NODE_VERSION`: 18.17.0
     - `CF_PAGES_BRANCH`: main
5. Custom domain: ryancruz.com

## Site #2: tools.ryancruz.com

1. Login to Cloudflare dashboard
2. Go to Pages > Create a project
3. Connect to your GitHub repository "r-cz/r-cz-monorepo"
4. Configure with these build settings:
   - **Project name**: tools-site
   - **Production branch**: main
   - **Build command**: `bun run build:cf`
   - **Build output directory**: apps/tools/dist
   - **Environment variables**:
     - `NODE_VERSION`: 18.17.0
     - `CF_PAGES_BRANCH`: tools
5. Custom domain: tools.ryancruz.com

## Adding Custom Domains

1. In your Cloudflare Pages project, go to **Custom domains**
2. Add your custom domain
3. Cloudflare will handle the DNS configuration automatically since you're managing your domains through Cloudflare DNS

## Troubleshooting Build Issues

If you encounter build failures, check the build logs for errors. Common issues:

1. **Dependency resolution errors**: If you see errors about packages not being found, verify the `CF_PAGES_BRANCH` environment variable is set correctly.

2. **Build errors in packages**: The custom build script will log warnings for any packages that fail to build. Check your code for TypeScript errors or other issues.

3. **Environment variables not set correctly**: Double-check that all environment variables are correctly configured in your Cloudflare Pages settings.

## Testing Locally

To verify that your build will work on Cloudflare Pages, run:

```bash
# For the main site
APP_TO_BUILD=main bun ./cloudflare-build.js

# For the tools site
APP_TO_BUILD=tools bun ./cloudflare-build.js
```
