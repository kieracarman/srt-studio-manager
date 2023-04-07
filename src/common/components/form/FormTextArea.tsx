import get from 'lodash.get'
import { ErrorMessage } from '@hookform/error-message'
import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues
} from 'react-hook-form'

import { TextArea, FormErrorMessage } from '@components/form'
import { TextAreaProps } from '@components/form/TextArea'

type FormTextAreaProps<TFormValues extends FieldValues> = {
  id: string
  name: Path<TFormValues>
  label: string
  className?: string
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<TextAreaProps, 'name'>

const FormTextArea = <TFormValues extends Record<string, unknown>>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  className,
  ...props
}: FormTextAreaProps<TFormValues>) => {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div className={`flex flex-col gap-1 ${className}`} aria-live='assertive'>
      <div className='flex justify-between'>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
        <ErrorMessage
          errors={errors}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name={name as any}
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </div>
      <TextArea
        id={id}
        name={name}
        label={label}
        aria-invalid={hasError}
        variant={hasError ? 'error' : 'default'}
        {...(register && register(name, rules))}
        {...props}
      />
    </div>
  )
}

export default FormTextArea
