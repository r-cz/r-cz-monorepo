import React from 'react';
import { Header as ShadcnHeader } from '@r-cz/shadcn-ui';

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
    <ShadcnHeader
      title={title}
      logo={logo}
      showThemeToggle={showThemeToggle}
      className={className}
    >
      {children}
    </ShadcnHeader>
  );
};

export default Header;