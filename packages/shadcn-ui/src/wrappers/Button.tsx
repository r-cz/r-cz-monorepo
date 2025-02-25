import React from 'react';
import { Button as ShadcnButton } from '../components/ui/button';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

// Map our variants to shadcn variants
const variantMapping = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
} as const;

// Map our sizes to shadcn sizes
const sizeMapping = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variantMapping[variant]}
      size={sizeMapping[size]}
      className={className}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;