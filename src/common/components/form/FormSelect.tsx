import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import get from 'lodash.get'

import { Select, FormErrorMessage } from '@components/form'
import { SelectProps } from '@components/form/Select'
import { cls } from '@utils/helpers'

type FormSelectProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<SelectProps, 'name'>

const FormSelect = <TFormValues extends Record<string, unknown>>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  className,
  ...props
}: FormSelectProps<TFormValues>) => {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div
      className={cls(`flex flex-col gap-1 ${className}`)}
      aria-live='assertive'
    >
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
      <Select
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

export default FormSelect
