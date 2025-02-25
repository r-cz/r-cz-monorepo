import React from 'react';
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from '@r-cz/shadcn-ui';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

// Map old variants to new variants
const variantMap = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline'
};

// Map old sizes to new sizes
const sizeMap = {
  sm: 'sm',
  md: 'default',
  lg: 'lg'
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const shadcnVariant = variantMap[variant] as ShadcnButtonProps['variant'];
  const shadcnSize = sizeMap[size] as ShadcnButtonProps['size'];
  
  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={shadcnVariant}
      size={shadcnSize}
      className={className}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;