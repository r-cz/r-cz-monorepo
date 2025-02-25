import React from 'react';
import { Card as ShadcnCard, CardHeader as ShadcnCardHeader, CardContent as ShadcnCardContent, CardFooter as ShadcnCardFooter } from '../components/ui/card';
import { cn } from '../lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default' 
}) => {
  const variantClasses = {
    default: 'bg-card',
    bordered: 'bg-card border',
    elevated: 'bg-card shadow-md'
  };
  
  return (
    <ShadcnCard className={cn(variantClasses[variant], className)}>
      {children}
    </ShadcnCard>
  );
};

export const CardHeader: React.FC<{children: React.ReactNode; className?: string}> = ({ 
  children,
  className = ''
}) => {
  return (
    <ShadcnCardHeader className={className}>
      {children}
    </ShadcnCardHeader>
  );
};

export const CardContent: React.FC<{children: React.ReactNode; className?: string}> = ({ 
  children,
  className = ''
}) => {
  return (
    <ShadcnCardContent className={className}>
      {children}
    </ShadcnCardContent>
  );
};

export const CardFooter: React.FC<{children: React.ReactNode; className?: string}> = ({ 
  children,
  className = ''
}) => {
  return (
    <ShadcnCardFooter className={className}>
      {children}
    </ShadcnCardFooter>
  );
};

export default Card;