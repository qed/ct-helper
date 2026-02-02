import React from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'business'
    | 'politician'
    | 'media'
    | 'partner'
    | 'donor'
  size?: 'sm' | 'md'
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    outline: 'text-text-primary border border-gray-300 bg-transparent',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    // Contact types
    business: 'bg-blue-100 text-blue-800 border-blue-200',
    politician: 'bg-purple-100 text-purple-800 border-purple-200',
    media: 'bg-pink-100 text-pink-800 border-pink-200',
    partner: 'bg-orange-100 text-orange-800 border-orange-200',
    donor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-semibold transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}

export default Badge
