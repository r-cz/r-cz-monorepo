import React from 'react';
import { ThemeToggle as ShadcnThemeToggle } from '@r-cz/shadcn-ui';
import { useTheme as useLegacyTheme, ThemeState } from '@r-cz/theme';
import { useTheme as useShadcnTheme } from '@r-cz/shadcn-ui';

export interface ThemeToggleProps {
  className?: string;
}

// This is a compatibility component that bridges the old theme system
// with the new shadcn/ui theme system
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [legacyThemeState, setLegacyThemeState] = useLegacyTheme();
  const { theme, setTheme } = useShadcnTheme();

  // Sync the shadcn theme changes to the legacy theme system
  React.useEffect(() => {
    if (theme === 'light') {
      setLegacyThemeState({ isDark: false, source: 'user' });
    } else if (theme === 'dark') {
      setLegacyThemeState({ isDark: true, source: 'user' });
    } else if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setLegacyThemeState({ isDark, source: 'system' });
    }
  }, [theme, setLegacyThemeState]);

  return (
    <div className={className}>
      <ShadcnThemeToggle />
    </div>
  );
};

export default ThemeToggle;