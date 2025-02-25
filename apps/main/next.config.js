/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@r-cz/ui"],
  output: 'standalone',
};

module.exports = nextConfig;
