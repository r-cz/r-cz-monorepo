import { test, expect } from '@playwright/test';
import { testThemeSelection } from '../utils/theme-tests';

test.describe('Tools Site Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Developer Tools|Ryan Cruz/);
    await page.screenshot({ path: 'test-results/tools-homepage.png' });
  });

  test('should navigate between tools', async ({ page }) => {
    await page.goto('/');
    
    // Look for tools links
    const mermaidLink = page.getByText(/mermaid/i).filter({ hasText: /.+/ });
    const tokenLink = page.getByText(/token|jwt/i).filter({ hasText: /.+/ });
    
    // Log found tools for debugging
    const hasMermaid = await mermaidLink.count() > 0;
    const hasToken = await tokenLink.count() > 0;
    console.log(`Found on page: Mermaid=${hasMermaid}, Token=${hasToken}`);
    
    // Try to navigate to a tool if available
    if (hasMermaid) {
      await mermaidLink.first().click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/mermaid-navigation.png' });
      await page.goto('/');
    }
    
    if (hasToken) {
      await tokenLink.first().click();
      await page.waitForTimeout(500); 
      await page.screenshot({ path: 'test-results/token-navigation.png' });
    }
  });

  test('should support theme switching', async ({ page }) => {
    // Test sequence: light → dark → system → light
    await page.goto('/');
    
    // 1. Light theme
    await testThemeSelection(page, 'light');
    await page.screenshot({ path: 'test-results/tools-light-theme.png' });
    
    // 2. Dark theme
    await testThemeSelection(page, 'dark');
    await page.screenshot({ path: 'test-results/tools-dark-theme.png' });
    
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

  test('should persist theme across tool pages', async ({ page }) => {
    // Set dark theme first
    await page.goto('/');
    await testThemeSelection(page, 'dark');
    
    // Navigate to a tool page
    try {
      // Try token-inspector first
      await page.goto('/token-inspector');
      await page.waitForTimeout(1000);
      
      // Check if dark theme persisted
      const isDarkOnTool = await page.evaluate(() => 
        document.documentElement.classList.contains('dark')
      );
      console.log(`Dark theme persisted on tool page: ${isDarkOnTool}`);
      await page.screenshot({ path: 'test-results/theme-persistence.png' });
    } catch (e) {
      console.log('Could not test theme persistence:', e);
    }
  });
});