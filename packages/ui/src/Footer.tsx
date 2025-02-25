import React from 'react';
import Container from './Container';

export interface FooterProps {
  copyright?: string;
  links?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  children?: React.ReactNode;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  copyright = `© ${new Date().getFullYear()} Ryan Cruz`,
  links = [],
  children,
  className = ''
}) => {
  return (
    <footer className={`bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 ${className}`}>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">{copyright}</p>
          </div>
          
          {links.length > 0 && (
            <div className="flex space-x-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
          
          {children && <div className="mt-4 md:mt-0">{children}</div>}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;