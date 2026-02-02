import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-ct-navy mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:border-ct-teal focus:ring-2 focus:ring-ct-teal focus:ring-opacity-20 outline-none transition-all duration-200 min-h-[44px] ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-ct-navy mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:border-ct-teal focus:ring-2 focus:ring-ct-teal focus:ring-opacity-20 outline-none transition-all duration-200 resize-y min-h-[120px] ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
