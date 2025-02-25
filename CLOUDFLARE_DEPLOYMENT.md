# Cloudflare Pages Deployment

This document describes how the monorepo is deployed to Cloudflare Pages.

## Setup

The repository is a monorepo with multiple applications (`apps/main` and `apps/tools`). Each application is deployed to a separate Cloudflare Pages project.

### Main Website (ryancruz.com)

The main website is deployed from the `apps/main` directory. Cloudflare Pages is configured to use the `.cloudflare/pages.toml` configuration file which defines:

1. The build command: `bun run cf-build`
2. The output directory: `apps/main/.next`

The `cf-build` script navigates to the main app directory and runs the Next.js build command directly, avoiding the need for Turborepo in the Cloudflare environment.

### Tools Website (tools.ryancruz.com)

For the tools website, a similar approach is used with a separate Cloudflare Pages project.

## How to Update the Deployment

When making changes to the deployment process:

1. Update the root `package.json` scripts if needed
2. Update the `.cloudflare/pages.toml` configuration
3. Commit and push the changes to trigger a new deployment

## Troubleshooting

If deployment fails, check:

1. The build logs in Cloudflare Pages dashboard
2. Ensure all workspace dependencies are correctly installed
3. Verify the build script can access all necessary dependencies

Remember that Cloudflare Pages has specific environment constraints, and not all Node.js features may be available.
