import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = ({ children, ...props }: any) => {
  return <>{children}</>;
};

export interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

export function SelectValue({ placeholder = 'Select...' }: { placeholder?: string }) {
  return <span className="text-slate-500">{placeholder}</span>;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
}

export const SelectContent = React.forwardRef<HTMLSelectElement, SelectContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white transition-colors focus:border-blue-500/50 focus:outline-none ${className || ''}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);

SelectContent.displayName = 'SelectContent';

export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

export const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ children, className, value, ...props }, ref) => {
    return (
      <option ref={ref} value={value} {...props}>
        {children}
      </option>
    );
  }
);

SelectItem.displayName = 'SelectItem';

