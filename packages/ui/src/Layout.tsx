import React from 'react';
import { Layout as ShadcnLayout } from '@r-cz/shadcn-ui';

export interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  maxWidth = 'xl'
}) => {
  return (
    <ShadcnLayout maxWidth={maxWidth}>
      {children}
    </ShadcnLayout>
  );
};

export default Layout;