/** @type {import('next').NextConfig} */
const baseConfig = require("@r-cz/config/next.config");

const nextConfig = {
  ...baseConfig,
  // Add any app-specific overrides here
  
  // Resolve the "document is not defined" error
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
};

module.exports = nextConfig;
