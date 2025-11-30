import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  children: React.ReactNode
}

/**
 * Button component with different variants
 * @param variant - Button style variant (primary, ghost, danger)
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param props - Standard button HTML attributes
 */
const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'btn-danger'
  }

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
