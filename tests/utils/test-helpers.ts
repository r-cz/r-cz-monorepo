import { Page, expect } from '@playwright/test';

/**
 * Helper function to test theme switching
 */
export async function testThemeSwitching(page: Page) {
  // Find theme toggle button
  const themeToggle = page.getByRole('button', { name: /theme|dark mode|light mode/i });
  
  // Get initial theme state
  const initialIsDark = await page.evaluate(() => {
    return document.documentElement.classList.contains('dark');
  });
  
  // Click the toggle
  await themeToggle.click();
  
  // Verify theme changed
  const newIsDark = await page.evaluate(() => {
    return document.documentElement.classList.contains('dark');
  });
  
  expect(newIsDark).not.toEqual(initialIsDark);
  
  // Return to original theme
  await themeToggle.click();
}

/**
 * Helper function to test navigation
 */
export async function testNavigation(page: Page, navSelector: string, expectedItems: number) {
  // Find navigation links
  const navLinks = page.locator(navSelector);
  const count = await navLinks.count();
  
  // Verify we have the expected number of navigation items
  expect(count).toBeGreaterThanOrEqual(expectedItems);
  
  // Click each link and verify navigation
  for (let i = 0; i < count; i++) {
    const link = navLinks.nth(i);
    const linkHref = await link.getAttribute('href');
    
    if (linkHref && !linkHref.startsWith('http')) {
      const startUrl = page.url();
      await link.click();
      
      // Check URL changed appropriately
      await expect(page).not.toHaveURL(startUrl);
      
      // Go back for next iteration
      await page.goBack();
    }
  }
}

/**
 * Helper function to test that a page loads successfully
 */
export async function testPageLoad(page: Page, url: string, expectedTitleRegex: RegExp) {
  await page.goto(url);
  await expect(page).toHaveTitle(expectedTitleRegex);
  await expect(page).toHaveURL(new URL(url, page.url()).toString());
}