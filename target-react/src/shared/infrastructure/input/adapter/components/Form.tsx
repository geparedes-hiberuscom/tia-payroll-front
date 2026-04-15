import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface FormProps<TFieldValues extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  methods: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
}

export const Form = <TFieldValues extends FieldValues>({
  methods,
  onSubmit,
  children,
  ...formProps
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-4' {...formProps}>
        {children}
      </form>
    </FormProvider>
  );
};