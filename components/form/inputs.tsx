import { ComponentProps, forwardRef } from 'react'
import { FieldError } from './form'

interface InputProps extends ComponentProps<'input'> {
  label: string;
}

interface SelectProps extends ComponentProps<'select'> {
  label: string;
}

interface TextAreaProps extends ComponentProps<'textarea'> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { label, type = 'text', ...props },
  ref
) => (<div className="mb-2">
    <label className="block text-sm font-medium text-white">{label}</label>
    <input
className="input input-bordered w-full max-w-s" ref={ref} type={type}
      {...props}
    />
    <FieldError name={props.name} />
  </div>))


export const Select = forwardRef<HTMLSelectElement, SelectProps>((
  { label, children, ...props },
  ref
) => (<div className="mb-2">
    <label className="block text-sm font-medium  text-white">{label}</label>
    <select className="select select-bordered w-full max-w-s" ref={ref} {...props}>
      {children}
    </select>
    <FieldError name={props.name} />
  </div>))

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
  { label, ...props },
  ref
) => (<div>
    <label className="block text-sm font-medium text-white">{label}</label>
    <textarea
      className="textarea textarea-bordered w-full max-w-s" placeholder="What news are you interested in" ref={ref}
      {...props}
    />
    <FieldError name={props.name} />
  </div>))
