import React from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

/**
 * Card container component
 * @param title - Optional card title
 * @param subtitle - Optional card subtitle/description
 * @param children - Card content
 * @param className - Additional CSS classes
 * @param actions - Optional action buttons/elements in header
 */
const Card: React.FC<CardProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = '',
  actions
}) => {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || actions) && (
        <div className="flex justify-between items-start mb-4">
          <div>
            {title && <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>}
            {subtitle && <p className="text-sm text-muted dark:text-gray-400 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
