# Migration Guide: Moving to shadcn/ui

This guide outlines the process of migrating from the existing UI components to the new shadcn/ui-based components.

## Current Implementation

The current UI package is located at `packages/ui` and provides custom components:
- Button
- Card
- Container
- Footer
- Header
- Layout
- ThemeToggle

## Migration Strategy

We're using an adapter pattern to provide a smooth transition. This means:

1. The existing component APIs remain the same
2. Under the hood, they use the new shadcn/ui implementation
3. You can gradually switch to using the shadcn/ui components directly

## Using Components Directly

### Before (using adapter components):

```tsx
import { Button, Card, CardHeader, CardContent } from '@r-cz/ui';

function MyComponent() {
  return (
    <Card variant="bordered">
      <CardHeader>Card Title</CardHeader>
      <CardContent>
        <p>Card content here</p>
        <Button variant="primary" size="md">Click Me</Button>
      </CardContent>
    </Card>
  );
}
```

### After (using shadcn/ui components directly):

```tsx
import { Button, Card, CardHeader, CardContent } from '@r-cz/shadcn-ui';

function MyComponent() {
  return (
    <Card className="border border-border">
      <CardHeader>Card Title</CardHeader>
      <CardContent>
        <p>Card content here</p>
        <Button variant="default" size="default">Click Me</Button>
      </CardContent>
    </Card>
  );
}
```

## Theme Migration

### Before (using legacy theme):

```tsx
import { ThemeProvider, useTheme } from '@r-cz/theme';

// Inside a component
const [themeState, setThemeState] = useTheme();
const isDarkMode = themeState.isDark;
```

### After (using shadcn/ui theme):

```tsx
import { ThemeProvider, useTheme } from '@r-cz/shadcn-ui';

// Inside a component
const { theme, setTheme } = useTheme();
const isDarkMode = theme === 'dark';
```

## Component Mapping

| Legacy Component | shadcn/ui Component | Property Differences |
|------------------|---------------------|---------------------|
| Button           | Button              | variant: 'primary' → 'default', 'secondary' → 'secondary', 'outline' → 'outline' |
| Card             | Card                | variant props → className approach |
| Container        | Container           | Same API |
| Footer           | Footer              | Same API |
| Header           | Header              | Same API |
| Layout           | Layout              | Same API |
| ThemeToggle      | ThemeToggle         | Different theme context |

## CSS Variables

The new components use CSS variables for theming. These are defined in the globals.css file.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 201 96% 32%;
  /* and more */
}
```

## Steps for Complete Migration

1. Update imports to use `@r-cz/shadcn-ui` instead of `@r-cz/ui`
2. Adjust component props according to the mapping above
3. Replace theme usage with the new theme context
4. Test thoroughly in both light and dark modes