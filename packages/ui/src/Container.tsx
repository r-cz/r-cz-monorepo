import React from 'react';
import { Container as ShadcnContainer } from '@r-cz/shadcn-ui';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  maxWidth = 'xl',
  centered = true,
  padding = true
}) => {
  return (
    <ShadcnContainer
      className={className}
      maxWidth={maxWidth}
      centered={centered}
      padding={padding}
    >
      {children}
    </ShadcnContainer>
  );
};

export default Container;