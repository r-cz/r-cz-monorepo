# @r-cz/ui

Shared UI components for Ryan Cruz websites.

## Components

- `Button` - Standard button component with variants
- `Card` - Card layout with header, content, and footer
- `Container` - Container with responsive width options
- `Footer` - Standardized footer with configurable links
- `Header` - Standardized header with theme toggle
- `Layout` - Page layout with header and footer
- `ThemeToggle` - Light/dark mode toggle component

## Usage

```tsx
import { Button, Card, CardContent, Layout } from '@r-cz/ui';

function MyComponent() {
  return (
    <Layout
      header={{ title: 'My Site' }}
      footer={{ copyright: '© 2025 My Site' }}
    >
      <Card>
        <CardContent>
          <h1>Hello World</h1>
          <Button variant="primary">Click Me</Button>
        </CardContent>
      </Card>
    </Layout>
  );
}
```
