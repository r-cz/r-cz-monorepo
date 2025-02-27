import { test } from '@playwright/test';

/**
 * This test is for development purposes only - it helps inspect DOM structure
 * to create better selectors for the actual tests.
 * 
 * Run individually: bun playwright test tests/utils/inspector.spec.ts --headed
 */
test.describe('Site Inspector', () => {
  test('main site DOM inspector', async ({ page }) => {
    // Visit main site
    await page.goto('http://localhost:3000/');
    
    // Pause for manual inspection (when run with --headed and --debug)
    await page.pause();
    
    // Log useful information about the page
    console.log('Page title:', await page.title());
    
    // Log all links on the page
    const links = await page.locator('a[href]').all();
    console.log('Links on the page:');
    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`  - ${text?.trim() || '(no text)'}: ${href}`);
    }
    
    // Find the theme toggle
    const themeToggles = await page.locator('button').all();
    console.log('Potential theme toggles:');
    for (const button of themeToggles) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      console.log(`  - ${text?.trim() || '(no text)'} [aria-label="${ariaLabel || 'none'}"]`);
    }
  });
  
  test('tools site DOM inspector', async ({ page }) => {
    // Visit tools site
    await page.goto('http://localhost:3001/');
    
    // Pause for manual inspection (when run with --headed and --debug)
    await page.pause();
    
    // Log useful information about the page
    console.log('Page title:', await page.title());
    
    // Log all links on the page
    const links = await page.locator('a[href]').all();
    console.log('Links on the page:');
    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`  - ${text?.trim() || '(no text)'}: ${href}`);
    }
    
    // Find the tools pages
    console.log('Available tools:');
    const availableTools = await page.locator('a[href^="/"]').all();
    for (const tool of availableTools) {
      const href = await tool.getAttribute('href');
      const text = await tool.textContent();
      console.log(`  - ${text?.trim() || '(no text)'}: ${href}`);
    }
  });
});