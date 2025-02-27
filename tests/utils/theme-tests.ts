import { Page, expect } from '@playwright/test';

/**
 * Complete theme test that tries to interact with theme controls
 */
export async function testThemeSelection(page: Page, themeName: 'light' | 'dark' | 'system') {
  await page.screenshot({ path: `test-results/before-theme-${themeName}.png` });

  // First, check if there's a theme toggle button
  const themeToggle = page.locator('button').filter({ hasText: /theme/i }).first();
  const themeButtonWithSvg = page.locator('button:has(svg)').first();

  let foundToggle = false;

  if (await themeToggle.count() > 0) {
    foundToggle = true;
    console.log('Found theme toggle by text');
    await themeToggle.click();
  } else if (await themeButtonWithSvg.count() > 0) {
    foundToggle = true;
    console.log('Found theme toggle by SVG');
    await themeButtonWithSvg.click();
  }

  // If no toggle was found, try other common selectors
  if (!foundToggle) {
    const themeIconToggle = page.locator('[aria-label*="theme" i], [title*="theme" i]').first();
    
    if (await themeIconToggle.count() > 0) {
      console.log('Found theme toggle by aria-label/title');
      await themeIconToggle.click();
      foundToggle = true;
    }
  }

  // Take a screenshot after clicking to see what happened
  await page.waitForTimeout(500);
  await page.screenshot({ path: `test-results/after-toggle-${themeName}.png` });

  if (!foundToggle) {
    console.log('Could not find theme toggle button');
    return { selected: false, htmlClass: null, dataTheme: null };
  }

  // Now try to find theme options in a dropdown/menu
  let themeSelected = false;
  
  // Try several common patterns for theme options
  const selectors = [
    `[role="menuitem"]:has-text("${themeName}")`,
    `[role="option"]:has-text("${themeName}")`,
    `button:has-text("${themeName}")`,
    `li:has-text("${themeName}")`,
    `div[class*="menu"]:has-text("${themeName}")`,
    `div[class*="dropdown"]:has-text("${themeName}")`,
    `span:has-text("${themeName}")`,
    `[data-theme="${themeName}"]`
  ];

  for (const selector of selectors) {
    const option = page.locator(selector);
    if (await option.count() > 0 && await option.isVisible()) {
      console.log(`Found ${themeName} option with selector: ${selector}`);
      await option.click();
      themeSelected = true;
      break;
    }
  }

  // Take a final screenshot after attempting to select the theme
  await page.waitForTimeout(500);
  await page.screenshot({ path: `test-results/after-selection-${themeName}.png` });

  // Get theme information from the DOM
  const themeInfo = await page.evaluate(() => {
    // Try different ways of determining the theme
    const htmlClass = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const dataTheme = document.documentElement.getAttribute('data-theme');
    const computedBg = window.getComputedStyle(document.body).backgroundColor;
    
    return { 
      htmlClass, 
      dataTheme, 
      computedBg
    };
  });
  
  console.log(`Theme test: Selected ${themeName}, HTML class: ${themeInfo.htmlClass}, data-theme: ${themeInfo.dataTheme}`);
  
  return { ...themeInfo, selected: themeSelected };
}