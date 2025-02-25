import React from 'react';
import { Header, HeaderProps } from './Header';
import { Footer, FooterProps } from './Footer';
import { Container } from './Container';

export interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  header?: HeaderProps;
  footer?: FooterProps;
  skipHeader?: boolean;
  skipFooter?: boolean;
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
  header = {},
  footer = {},
  skipHeader = false,
  skipFooter = false
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {!skipHeader && <Header {...header} />}
      
      <main className="flex-grow py-8">
        <Container maxWidth={maxWidth}>
          {children}
        </Container>
      </main>
      
      {!skipFooter && <Footer {...footer} />}
    </div>
  );
};

export default Layout;