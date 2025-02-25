# @r-cz/shadcn-ui

A collection of reusable UI components based on shadcn/ui for ryancruz.com projects.

## Components

The package provides the following components:

### Layout Components
- `Container`: A responsive container with max-width options
- `Header`: A consistent header component with theme toggle
- `Footer`: A footer component with customizable links
- `Layout`: A page layout with main content area and footer

### Basic UI Components
- `Button`: Versatile button component with various styles
- `Card`: Card component with header, content, and footer sections
- `Input`: Styled input component
- `Textarea`: Styled textarea component
- `Label`: Accessible label component
- `Badge`: Badges for highlighting status or information
- `Alert`: Alert component for displaying messages

### Theme Components
- `ThemeProvider`: Provider for theme context
- `ThemeToggle`: Toggle component for switching between light and dark themes

## Usage

```tsx
import { 
  ThemeProvider, 
  Button, 
  Card, 
  CardHeader, 
  CardContent 
} from '@r-cz/shadcn-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Card>
        <CardHeader>
          <h2>Example Card</h2>
        </CardHeader>
        <CardContent>
          <p>Some content here</p>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

## Theme Customization

The component library uses CSS variables for theming. These can be customized in your application's CSS:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 201 96% 32%;
  --primary-foreground: 0 0% 98%;
  /* Add more custom colors as needed */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 201 96% 32%;
  --primary-foreground: 0 0% 98%;
  /* Add more custom colors as needed */
}
```