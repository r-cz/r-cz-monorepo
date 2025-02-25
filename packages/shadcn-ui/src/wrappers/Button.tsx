import React from 'react';
import { Button as ShadcnButton } from '../components/ui/button';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

// Map variants to shadcn variants
const variantMapping = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
} as const;

// Map sizes to shadcn sizes
const sizeMapping = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', asChild, className, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        variant={variantMapping[variant]}
        size={sizeMapping[size]}
        className={className}
        asChild={asChild}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;