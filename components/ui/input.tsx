import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-500 transition-colors focus:border-blue-500/50 focus:outline-none ${className || ''}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
