import { useState, useEffect, useRef } from 'react';
import { SunIcon, MoonIcon, LaptopIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

// ThemeState type for compatibility
interface ThemeState {
  isDark: boolean;
  source: 'user' | 'system' | 'localStorage';
}

export interface ThemeToggleProps {
  className?: string;
  // For direct use without context
  isDark?: boolean;
  onToggle?: (isDark: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '',
  isDark,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // We'll try to use the useTheme hook if available, but won't fail if it's not
  let themeState: ThemeState | undefined;
  let setThemeState: ((value: ThemeState) => void) | undefined;
  
  try {
    // Only import this dynamically if it's available
    const useThemeModule = require('@r-cz/theme').useTheme;
    if (useThemeModule) {
      [themeState, setThemeState] = useThemeModule();
    }
  } catch (e) {
    // Theme context is not available, we'll use props instead
    themeState = isDark !== undefined ? { 
      isDark, 
      source: 'user' 
    } : undefined;
  }

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

  // Fallback to checking document class if no context or props
  if (!themeState && isDark === undefined) {
    themeState = {
      isDark: document.documentElement.classList.contains('dark'),
      source: 'system'
    };
  }

  // Default to light mode if all else fails
  const currentIsDark = themeState?.isDark ?? isDark ?? false;
  const currentSource = themeState?.source ?? 'user';

  const setTheme = (newIsDark: boolean, source: 'user' | 'system' | 'localStorage') => {
    if (setThemeState) {
      setThemeState({
        isDark: newIsDark,
        source
      });
    } else if (onToggle) {
      onToggle(newIsDark);
    } else {
      // Fallback to manually toggling the class
      if (newIsDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
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
        {currentSource === 'system' ? (
          <LaptopIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : currentIsDark ? (
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
            <span>Light</span>
          </button>
          <button
            onClick={() => setTheme(true, 'user')}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2"
          >
            <MoonIcon className="w-4 h-4" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => setTheme(
              window.matchMedia('(prefers-color-scheme: dark)').matches,
              'system'
            )}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2"
          >
            <LaptopIcon className="w-4 h-4" />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;