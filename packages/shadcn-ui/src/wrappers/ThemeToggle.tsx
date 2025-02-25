import { useState, useEffect, useRef } from 'react';
import { SunIcon, MoonIcon, LaptopIcon } from 'lucide-react';
import { useTheme } from '@r-cz/theme';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [themeState, setThemeState] = useTheme();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const setTheme = (isDark: boolean, source: 'user' | 'system' | 'localStorage') => {
    setThemeState({
      isDark,
      source
    });
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme settings"
      >
        {themeState.source === 'system' ? (
          <LaptopIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : themeState.isDark ? (
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-card rounded-lg shadow-lg border z-10">
          <button
            onClick={() => setTheme(false, 'user')}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2"
          >
            <SunIcon className="w-4 h-4" />
            Light
          </button>
          <button
            onClick={() => setTheme(true, 'user')}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2"
          >
            <MoonIcon className="w-4 h-4" />
            Dark
          </button>
          <button
            onClick={() => setTheme(
              window.matchMedia('(prefers-color-scheme: dark)').matches,
              'system'
            )}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2"
          >
            <LaptopIcon className="w-4 h-4" />
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;