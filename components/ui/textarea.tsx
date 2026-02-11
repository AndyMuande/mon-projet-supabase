import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-500 transition-colors focus:border-blue-500/50 focus:outline-none ${className || ''}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
