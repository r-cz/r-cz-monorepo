/** @type {import('next').NextConfig} */
const baseConfig = require("@r-cz/config/next.config");
const fs = require('fs');
const path = require('path');

const nextConfig = {
  ...baseConfig,
  // Add any app-specific overrides here
  
  // Resolve the "document is not defined" error
  webpack: (config, { isServer, dev }) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    
    // Copy shared icons on build
    if (!dev && !isServer) {
      // Ensure dirs exist
      const iconDir = path.join(__dirname, 'public/icons');
      if (!fs.existsSync(iconDir)) {
        fs.mkdirSync(iconDir, { recursive: true });
      }
      
      // Copy shared assets
      const sharedIconsPath = path.join(__dirname, '../../packages/assets/icons');
      if (fs.existsSync(sharedIconsPath)) {
        fs.readdirSync(sharedIconsPath).forEach(file => {
          const src = path.join(sharedIconsPath, file);
          const dest = path.join(iconDir, file);
          if (fs.lstatSync(src).isFile()) {
            fs.copyFileSync(src, dest);
          }
        });
      }
    }
    
    return config;
  },
};

module.exports = nextConfig;
