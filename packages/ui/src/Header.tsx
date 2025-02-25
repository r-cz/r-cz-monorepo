import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import Container from './Container';

export interface HeaderProps {
  title?: string;
  logo?: React.ReactNode;
  showThemeToggle?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  logo,
  showThemeToggle = true,
  children,
  className = ''
}) => {
  return (
    <header className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 ${className}`}>
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {logo && <div>{logo}</div>}
            {title && <h1 className="text-xl font-semibold">{title}</h1>}
            {children && <div className="ml-6">{children}</div>}
          </div>
          
          {showThemeToggle && <ThemeToggle />}
        </div>
      </Container>
    </header>
  );
};

export default Header;