import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
      outline: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
