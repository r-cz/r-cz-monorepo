import { useTheme } from '@r-cz/theme';
import { Sun, Moon, Laptop } from 'lucide-react';
import { 
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@r-cz/shadcn-ui';

const ThemeToggle = () => {
  const [themeState, setThemeState] = useTheme();

  const setTheme = (
    isDark: boolean,
    source: 'user' | 'system' | 'localStorage'
  ) => {
    setThemeState({
      isDark,
      source,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Theme settings">
          {themeState.source === 'system' ? (
            <Laptop className="h-[1.2rem] w-[1.2rem]" />
          ) : themeState.isDark ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(false, 'user')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(true, 'user')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme(
            window.matchMedia('(prefers-color-scheme: dark)').matches,
            'system'
          )}
        >
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;