# Monorepo Optimizations

This document outlines the optimizations made to improve code sharing and reduce duplication across the monorepo.

## 1. Shared Components

Common UI components have been extracted to the `@r-cz/ui` package:

- `ThemeToggle`: Shared theme toggle component
- `Header`: Flexible header component with customization props
- `Footer`: Flexible footer component with customization props

Apps now import these components and customize them as needed, reducing code duplication.

## 2. Shared Configuration

Configuration files have been consolidated in the `@r-cz/config` package:

- `tailwind.config.js`: Base Tailwind configuration
- `tsconfig.json`: Base TypeScript configuration
- `postcss.config.js`: Shared PostCSS configuration
- `next.config.js`: Base Next.js configuration

Apps now extend these base configurations, ensuring consistency while allowing app-specific overrides.

## 3. Shared Styles

CSS files have been moved to the `@r-cz/ui` package:

- `globals.css`: Shared base styles and theme variables
- `prism.css`: Code syntax highlighting styles
- `index.css`: Combined CSS exports

Apps now import these shared styles, eliminating duplication of CSS variables and base styles.

## 4. Theme Synchronization

The empty `@r-cz/theme-sync` package has been implemented to:

- Provide theme state management across apps
- Store theme preferences in localStorage
- Sync theme via cookies for server-side rendering
- Re-export theme components from next-themes

This ensures a consistent theming experience across all apps in the domain.

## 5. Shared Assets

Static assets are now centralized in the `@r-cz/assets` package:

- Common icon files in `icons/`
- Base manifest templates in `manifest/`
- Social preview images in `social/`
- Webpack configuration for build-time asset copying

Benefits:
- Single source of truth for common assets
- Automatic asset copying during build
- Direct addition of new assets to the shared package
- Clear documentation on asset management workflow

## Deployment

- The monorepo structure maintains separate build outputs for each app
- Cloudflare Pages watches specific paths for each app
- No deployment scripts are needed in the repo
- All DNS and deployment config is managed in Cloudflare

## Future Improvements

1. Add comprehensive testing for shared components
2. Create a documentation site for shared packages
3. Consider extracting more common functionality into shared packages
