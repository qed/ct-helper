import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 active:scale-95 touch-manipulation inline-flex items-center justify-center'

  const variants = {
    primary: 'bg-ct-navy text-white hover:bg-opacity-90',
    secondary: 'bg-ct-teal text-white hover:bg-opacity-90',
    accent: 'bg-ct-gold text-ct-navy hover:bg-opacity-90',
    outline: 'border-2 border-ct-navy text-ct-navy hover:bg-ct-navy hover:text-white',
    ghost: 'text-ct-navy hover:bg-ct-navy hover:bg-opacity-10',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
