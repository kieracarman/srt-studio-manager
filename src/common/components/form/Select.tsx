import { forwardRef, ReactNode } from 'react'

import { cls } from '@utils/helpers'

const classes = {
  base: 'block w-full flex-1 rounded-md shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
  disabled: 'opacity-50 border-gray-200 bg-gray-100 cursor-not-allowed',
  size: {
    small: '',
    default: 'px-4 py-2 text-sm',
    large: ''
  },
  variant: {
    default: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
    valid: '',
    error: 'border-red-600 focus:border-red-600 focus:ring-red-600'
  }
}

export type SelectProps = {
  id: string
  name: string
  label: string
  children: ReactNode
  className?: string
  size?: keyof typeof classes.size
  variant?: keyof typeof classes.variant
  disabled?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      children,
      className = '',
      size = 'default',
      variant = 'default',
      disabled = false,
      ...props
    },
    ref
  ) => (
    <select
      id={id}
      ref={ref}
      name={name}
      defaultValue=''
      aria-label={label}
      disabled={disabled}
      className={cls(`
        ${classes.base}
        ${classes.size[size]}
        ${classes.variant[variant]}
        ${disabled && classes.disabled}
        ${className}
      `)}
      {...props}
    >
      <option value='' disabled>
        Select...
      </option>
      {children}
    </select>
  )
)

Select.displayName = 'Select'

export default Select
