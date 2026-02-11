import React from 'react';
import { Controller, FormProvider, useFormContext, ControllerRenderProps, ControllerFieldState, UseFormStateReturn, FieldValues } from 'react-hook-form';

export const Form = FormProvider;

export function FormField({
  name,
  control,
  render,
}: {
  name: string;
  control: any;
  render: (props: { field: ControllerRenderProps<FieldValues, string>; fieldState: ControllerFieldState; formState: UseFormStateReturn<FieldValues> }) => React.ReactElement;
}) {
  return <Controller name={name} control={control} render={render} />;
}

export function FormItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

export function FormLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <label className={`block text-sm font-medium text-slate-300 ${className}`}>{children}</label>;
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function FormDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs text-slate-500 ${className}`}>{children}</p>;
}

export function FormMessage({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  const { formState } = useFormContext();
  if (!children && !formState.errors) return null;
  
  return <p className={`text-xs text-red-400 ${className}`}>{children}</p>;
}
