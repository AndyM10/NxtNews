import { ComponentProps, forwardRef } from 'react';
import { FieldError } from './form';

interface InputProps extends ComponentProps<'input'> {
  label: string;
}

interface SelectProps extends ComponentProps<'select'> {
  label: string;
}

interface TextAreaProps extends ComponentProps<'textarea'> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = 'text', ...props },
  ref
) {
  return (
    <div>
      <label className='block text-sm font-medium text-white'>{label}</label>
      <input type={type} ref={ref} className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md' {...props} />
      <FieldError name={props.name} />
    </div>
  );
});


export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, children, ...props },
  ref
) {
  return (
    <div>
      <label className='block text-sm font-medium leading-6 text-white'>{label}</label>
      <select className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ' ref={ref} {...props}>
        {children}
      </select>
      <FieldError name={props.name} />
    </div>
  );
})

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, ...props },
  ref
) {
  return (
    <div>
      <label className='block text-sm font-medium leading-6 text-white'>{label}</label>
      <textarea className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ' ref={ref} {...props} />
      <p className="mt-3 text-sm leading-6 text-white">What news are you interested in</p>
      <FieldError name={props.name} />
    </div>
  );
})
