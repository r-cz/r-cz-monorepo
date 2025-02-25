import shadcnConfig from '@r-cz/config/tailwind.shadcn.config';

export default {
  ...shadcnConfig,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/shadcn-ui/src/**/*.{js,ts,jsx,tsx}'
  ]
};