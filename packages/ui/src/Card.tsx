import React from 'react';
import { 
  Card as ShadcnCard, 
  CardHeader as ShadcnCardHeader, 
  CardContent as ShadcnCardContent,
  CardFooter as ShadcnCardFooter
} from '@r-cz/shadcn-ui';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

// Map variant classes to className props
const getVariantClass = (variant: CardProps['variant']) => {
  switch (variant) {
    case 'bordered':
      return 'border-gray-200 dark:border-gray-700';
    case 'elevated':
      return 'shadow-md';
    default:
      return '';
  }
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default' 
}) => {
  return (
    <ShadcnCard className={`${getVariantClass(variant)} ${className}`}>
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