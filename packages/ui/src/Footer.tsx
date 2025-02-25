import React from 'react';
import { Footer as ShadcnFooter } from '@r-cz/shadcn-ui';

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
    <ShadcnFooter
      copyright={copyright}
      links={links}
      className={className}
    >
      {children}
    </ShadcnFooter>
  );
};

export default Footer;