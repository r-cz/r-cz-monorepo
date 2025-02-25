import React from 'react';
import { ThemeToggle } from './ThemeToggle';

export interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showThemeToggle?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  'full': 'max-w-full'
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  maxWidth = 'xl',
  showThemeToggle = true
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 py-8`}>
        {showThemeToggle && (
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
        )}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;