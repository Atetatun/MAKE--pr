import { forwardRef } from 'react'
import { clsx } from 'clsx'

/**
 * Card Component - PortoCraft Design System
 *
 * Design Spec (design-system.md Section 4.3):
 *   - Background: #ffffff (default) or #f8fafc (secondary)
 *   - Border: 1px solid #e2e8f0 (border-slate-200)
 *   - Border Radius: 8px (rounded-lg) or 12px (rounded-xl)
 *   - Interactive:
 *       - Hover shadow: shadow-card-hover
 *       - Transform: hover:scale-105
 *       - Transition: 150ms ease
 *       - Full keyboard accessibility (Enter/Space support, focus ring)
 */

export const Card = forwardRef(function Card(
  {
    interactive = false,
    padding = 'default',
    variant = 'default',
    className,
    children,
    onClick,
    tabIndex,
    role,
    ...props
  },
  ref
) {
  const paddingClass = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  }[padding] ?? 'p-6'

  const variantClass = {
    default: 'bg-white border border-slate-200 shadow-light',
    secondary: 'bg-slate-50 border border-slate-200 shadow-none',
    outline: 'bg-transparent border border-slate-300 shadow-none',
    elevated: 'bg-white border border-slate-100 shadow-medium',
  }[variant] ?? 'bg-white border border-slate-200 shadow-light'

  const handleKeyDown = (e) => {
    if (interactive && onClick) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick(e)
      }
    }
  }

  return (
    <div
      ref={ref}
      className={clsx(
        'rounded-lg transition-all duration-150',
        variantClass,
        paddingClass,
        interactive && [
          'cursor-pointer select-none',
          'hover:shadow-card-hover hover:scale-105 active:scale-[1.01]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2',
        ],
        className
      )}
      onClick={onClick}
      role={role ?? (interactive ? 'button' : undefined)}
      tabIndex={tabIndex ?? (interactive ? 0 : undefined)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  )
})

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={clsx('mb-4 pb-4 border-b border-slate-200', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, as: Component = 'h3', ...props }) {
  return (
    <Component
      className={clsx('text-lg sm:text-xl font-bold text-navy font-heading', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={clsx('text-sm text-text-muted font-body mt-1 leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={clsx('', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        'mt-4 pt-4 border-t border-slate-200 flex items-center justify-end gap-3 flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
