import Link from 'next/link'
import React, { forwardRef, ReactNode } from 'react'
import { cls } from '../../utils/helpers'

const classes = {
  base: 'transition ease-in-out duration-200 border w-full justify-center rounded-md font-medium shadow-sm sm:w-auto focus:ring-offset-2 focus:ring-2 focus:outline-none',
  disabled: 'opacity-50 cursor-not-allowed',
  size: {
    small: 'px-2 py-1 text-xs',
    default: 'px-4 py-2 text-sm',
    large: 'px-8 py-3 text-md'
  },
  variant: {
    primary:
      'border-transparent bg-black text-white hover:opacity-75 focus:ring-indigo-500',
    secondary:
      'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
    danger:
      'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost:
      'border-transparent bg-transparent shadow-none hover:bg-gray-200 focus:ring-indigo-500'
  }
}

type ButtonProps = {
  children?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  size?: keyof typeof classes.size
  variant?: keyof typeof classes.variant
  disabled?: boolean
  onClick?: () => void
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = 'button',
      className,
      variant = 'primary',
      size = 'default',
      disabled = false,
      href,
      ...props
    },
    ref
  ) =>
    href ? (
      <Link href={href}>
        <a
          className={cls(`
            ${classes.base}
            ${classes.size[size]}
            ${classes.variant[variant]}
            ${className}
          `)}
          {...props}
        >
          {children}
        </a>
      </Link>
    ) : (
      <button
        ref={ref}
        disabled={disabled}
        type={type}
        className={cls(`
      ${classes.base}
      ${classes.size[size]}
      ${classes.variant[variant]}
      ${disabled && classes.disabled}
      ${className}
    `)}
        {...props}
      >
        {children}
      </button>
    )
)

Button.displayName = 'Button'

export default Button
