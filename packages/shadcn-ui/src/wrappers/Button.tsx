import React, { forwardRef } from 'react';
import { Button as ShadcnButton } from '../components/ui/button';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  asChild?: boolean;
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  asChild = false,
  ...props
}, ref) => {
  return (
    <ShadcnButton
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variantMapping[variant]}
      size={sizeMapping[size]}
      className={className}
      asChild={asChild}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
});

Button.displayName = 'Button';

export default Button;