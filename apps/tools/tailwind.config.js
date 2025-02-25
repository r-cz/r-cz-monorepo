/** @type {import('tailwindcss').Config} */
const sharedConfig = require("@r-cz/config/tailwind.config");

module.exports = {
  // Use the shared config as a base
  ...sharedConfig,
  // Override content paths for this specific app
  content: [
    ...sharedConfig.content,
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
};
