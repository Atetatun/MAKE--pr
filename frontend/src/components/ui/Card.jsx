import { clsx } from 'clsx'

/**
 * Card Component
 *
 * Design spec (design-system.md Section 4 - Card):
 *   - Padding: 24px / 32px
 *   - Border Radius: 8px
 *   - Border: 1px #e2e8f0
 *   - Shadow light → medium on hover
 *   - Scale 1.02x on hover (interactive cards)
 *   - Transition: 200ms
 */
export function Card({
  interactive = false,
  padding = 'default',
  className,
  children,
  onClick,
  ...props
}) {
  const paddingClass = {
    sm:      'p-4',
    default: 'p-6',
    lg:      'p-8',
  }[padding] ?? 'p-6'

  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-slate-200',
        'shadow-light',
        paddingClass,
        interactive && [
          'cursor-pointer transition-all duration-200',
          'hover:shadow-card-hover hover:scale-[1.02]',
        ],
        className
      )}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive
        ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(e) }
        : undefined
      }
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * CardHeader, CardBody, CardFooter - composable card sections
 */
export function CardHeader({ className, children }) {
  return (
    <div className={clsx('mb-4 pb-4 border-b border-slate-200', className)}>
      {children}
    </div>
  )
}

export function CardBody({ className, children }) {
  return (
    <div className={clsx('', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children }) {
  return (
    <div className={clsx('mt-4 pt-4 border-t border-slate-200 flex items-center justify-end gap-3', className)}>
      {children}
    </div>
  )
}

export default Card
