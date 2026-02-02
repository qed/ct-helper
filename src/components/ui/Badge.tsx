import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-ct-moss bg-opacity-20 text-ct-moss',
    warning: 'bg-ct-gold bg-opacity-20 text-ct-clay',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-ct-teal bg-opacity-20 text-ct-teal',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  )
}
