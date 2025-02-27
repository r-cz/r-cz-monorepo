import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000', // Default URL for main site
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'main-site',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
      testMatch: ['**/tests/main/**/*.spec.ts'],
    },
    {
      name: 'tools-site',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3001',
      },
      testMatch: ['**/tests/tools/**/*.spec.ts'],
    },
  ],
  webServer: [
    {
      command: 'cd apps/main && bun run build && npx serve@latest out -p 3000',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd apps/tools && bun run build && npx serve@latest out -p 3001',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
    },
  ],
});