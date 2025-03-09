import * as React from 'react';
import { ThemeProvider, useTheme as useNextTheme } from 'next-themes';

// Re-export from next-themes for convenience
export { ThemeProvider } from 'next-themes';
export const useTheme = useNextTheme;

// Store theme in localStorage
export const syncThemeWithLocalStorage = (theme: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('r-cz-theme', theme);
  }
};

// Get theme from localStorage
export const getThemeFromLocalStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('r-cz-theme');
  }
  return null;
};

// Create a cookie with the theme for server-side rendering
export const syncThemeWithCookie = (theme: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `r-cz-theme=${theme}; path=/; max-age=31536000`; // 1 year
  }
};

// Get theme from cookie
export const getThemeFromCookie = (): string | null => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    const themeCookie = cookies.find(cookie => cookie.trim().startsWith('r-cz-theme='));
    return themeCookie ? themeCookie.split('=')[1] : null;
  }
  return null;
};

// Sync theme across different apps in the same domain
export const useThemeSync = (initialTheme?: string) => {
  const { theme, setTheme: updateTheme } = useTheme();
  
  // Effect to sync theme changes to storage
  React.useEffect(() => {
    if (theme) {
      syncThemeWithLocalStorage(theme);
      syncThemeWithCookie(theme);
    }
  }, [theme]);
  
  // Effect to initialize from storage if needed
  React.useEffect(() => {
    if (!theme && !initialTheme) {
      const storedTheme = getThemeFromLocalStorage() || getThemeFromCookie();
      if (storedTheme) {
        updateTheme(storedTheme);
      }
    }
  }, [theme, initialTheme, updateTheme]);
  
  return { theme, setTheme: updateTheme };
};
