import { ComponentProps } from 'react'
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn, UseFormProps as UseHookFormProps, useFormContext, useForm as useHookForm } from 'react-hook-form'
import { TypeOf, ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// We provide additional option that would be our zod schema.
interface UseFormProps<T extends ZodSchema<any>>
  extends UseHookFormProps<TypeOf<T>> {
  schema: T;
}

export const useForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseFormProps<T>) => useHookForm({
    ...formConfig,
    resolver: zodResolver(schema)
  })
interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export function Form<T extends FieldValues>({ form, onSubmit, children, ...props }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
      </form>
    </FormProvider>
  )
}
export function FieldError({ name }: { name?: string }) {
  // The useFormContext hook returns the current state of hook form.
  const {
    formState: { errors }
  } = useFormContext()

  if (!name) {
    return null
  }

  const error = errors[name]

  if (!error) {
    return null
  }

  return <span>{error.message?.toString()}</span>
}
