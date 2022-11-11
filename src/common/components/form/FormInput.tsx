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

import { Input, FormErrorMessage } from '@components/form'
import { InputProps } from '@components/form/Input'
import { cls } from '@utils/helpers'

type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<InputProps, 'name'>

const FormInput = <TFormValues extends Record<string, unknown>>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>) => {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div
      className={cls(`flex flex-col gap-1 ${className}`)}
      aria-live='assertive'
    >
      <div className='flex justify-between'>
        <label htmlFor={id}>{label}</label>
        <ErrorMessage
          errors={errors}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name={name as any}
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </div>
      <Input
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

export default FormInput
