import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '@r-cz/theme';
import { Button } from '@r-cz/shadcn-ui';

const ThemeToggle = () => {
  const [themeState, setThemeState] = useTheme();

  const toggleTheme = () => {
    if (themeState.source === 'system') {
      // If currently using system, switch to explicit light/dark
      const isDark = document.documentElement.classList.contains('dark');
      setThemeState({
        isDark: !isDark,
        source: 'user'
      });
    } else {
      // Toggle between light/dark
      setThemeState({
        isDark: !themeState.isDark,
        source: 'user'
      });
    }
  };

  const setSystemTheme = () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setThemeState({
      isDark,
      source: 'system'
    });
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {themeState.source === 'system' ? (
          <Laptop className="h-[1.2rem] w-[1.2rem]" />
        ) : themeState.isDark ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;