# @r-cz/config

Shared configuration files for Ryan Cruz websites.

## Contents

- `tailwind.config.ts` - Shared Tailwind CSS configuration
- TypeScript configurations (coming soon)
- ESLint configurations (coming soon)

## Usage

### Tailwind CSS

In your app's `tailwind.config.ts`:

```ts
import baseConfig from '@r-cz/config/tailwind.config';

export default {
  ...baseConfig,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ]
};
```

### Coming Soon

- Shared TypeScript configuration
- Shared ESLint configuration
- Shared Prettier configuration
