# @r-cz/theme

Shared theming logic for Ryan Cruz websites.

## Features

- Light/dark mode toggle
- System preference detection
- Local storage persistence
- React hook for easy access

## Usage

Wrap your application with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@r-cz/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

Access theme state in your components:

```tsx
import { useTheme } from '@r-cz/theme';

function MyComponent() {
  const [themeState, setThemeState] = useTheme();
  
  const toggleTheme = () => {
    setThemeState(prev => ({
      isDark: !prev.isDark,
      source: 'user'
    }));
  };
  
  return (
    <div>
      <p>Current theme: {themeState.isDark ? 'Dark' : 'Light'}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Implementation Details

The theme system uses:
- `localStorage` for persistence
- Media queries to detect system preferences
- CSS classes for theme application
