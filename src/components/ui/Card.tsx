import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 transition-shadow ${
        hover ? 'hover:shadow-lg cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return <h3 className={`text-xl font-bold text-ct-navy ${className}`}>{children}</h3>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>
}
