# Shared Assets

This package contains shared static assets used across multiple apps in the monorepo.

## Asset Management

### Adding New Assets

**Important:** New assets should be added directly to this package rather than copied from app directories. This ensures a single source of truth for shared assets.

```bash
# Add new assets directly to the appropriate directory
packages/assets/icons/     # For app icons
packages/assets/manifest/  # For manifest templates
packages/assets/social/    # For social preview images
```

### Updating from App Directories

If you need to sync assets from app directories (for migration or one-time updates), use the utility script:

```bash
# From project root
bun run update-shared-assets
```

## Usage

### Icons

Copy the icons to your app's public directory during the build process:

```js
// In your app's next.config.js

const copyFiles = require('fs-extra').copy;
const path = require('path');

const nextConfig = {
  ...
  webpack: (config, { isServer, dev }) => {
    // Copy shared icons on build
    if (!dev && !isServer) {
      copyFiles(
        path.join(__dirname, '../../packages/assets/icons'), 
        path.join(__dirname, 'public/icons')
      );
    }
    return config;
  },
};
```

### Manifest

Use the appropriate manifest for your app:

```js
// For main app
const manifest = require('@r-cz/assets/manifest/main.json');

// For tools app
const manifest = require('@r-cz/assets/manifest/tools.json');
```

Or extend the base manifest with your app-specific properties:

```js
const baseManifest = require('@r-cz/assets/manifest/base.json');

const manifest = {
  ...baseManifest,
  name: "Your App Name",
  // Add app-specific properties
};
```
