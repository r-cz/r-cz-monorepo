import { test, expect } from '@playwright/test';
import { testThemeSelection } from '../utils/theme-tests';

test.describe('Main Site Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Ryan Cruz/);
    await page.screenshot({ path: 'test-results/main-homepage.png' });
  });

  test('should handle navigation between pages', async ({ page }) => {
    await page.goto('/');
    
    // Find any internal links and try to navigate
    const links = page.locator('a[href^="/"]');
    const count = await links.count();
    
    if (count > 0) {
      // Test only the first link to avoid excessive navigation
      const link = links.first();
      const href = await link.getAttribute('href') || '';
      
      await link.click();
      
      // Verify navigation worked
      await expect(page.url()).toContain(href);
    } else {
      console.log('No internal navigation links found');
    }
  });

  test('should support theme switching', async ({ page }) => {
    // Test sequence: light → dark → system → light
    await page.goto('/');
    
    // 1. Light theme
    await testThemeSelection(page, 'light');
    await page.screenshot({ path: 'test-results/main-light-theme.png' });
    
    // 2. Dark theme
    await testThemeSelection(page, 'dark');
    await page.screenshot({ path: 'test-results/main-dark-theme.png' });
    
    // Check if theme is applied correctly
    const isDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    console.log(`Dark theme applied: ${isDark}`);
    
    // 3. System theme
    await testThemeSelection(page, 'system');
    
    // 4. Back to light
    await testThemeSelection(page, 'light');
  });
});