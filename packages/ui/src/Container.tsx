import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  padding?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  'full': 'max-w-full'
};

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  maxWidth = 'xl',
  centered = true,
  padding = true
}) => {
  return (
    <div 
      className={`
        ${maxWidthClasses[maxWidth]} 
        ${centered ? 'mx-auto' : ''} 
        ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;