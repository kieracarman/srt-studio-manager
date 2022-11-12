import { forwardRef } from 'react'

import { cls } from '@utils/helpers'

const classes = {
  base: 'rounded-md shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
  disabled: 'opacity-50 border-gray-200 bg-gray-100 cursor-not-allowed',
  size: {
    small: '',
    default: 'px-4 py-2 text-sm',
    large: ''
  },
  variant: {
    default: 'border-black focus:border-black focus:ring-indigo-500',
    valid: '',
    error: 'border-red-600 focus:border-red-600 focus:ring-red-600'
  }
}

export type TextAreaProps = {
  id: string
  name: string
  label: string
  className?: string
  size?: keyof typeof classes.size
  variant?: keyof typeof classes.variant
  disabled?: boolean
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      label,
      className = '',
      size = 'default',
      variant = 'default',
      disabled = false,
      ...props
    },
    ref
  ) => (
    <textarea
      id={id}
      ref={ref}
      name={name}
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
    />
  )
)

TextArea.displayName = 'TextArea'

export default TextArea
