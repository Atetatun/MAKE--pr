import { clsx } from 'clsx'

/**
 * Badge / Status Indicator Component - PortoCraft Design System
 *
 * Design Spec (design-system.md Section 4):
 *   - Used for ATS Score Pills, Tags, Statuses, and Filters
 *   - WCAG AA verified color contrast
 *   - Variants:
 *       primary -> Navy badge
 *       cyan    -> Cyan accent badge
 *       orange  -> Orange accent badge
 *       success -> ATS Score high (>85) / Saved status
 *       warning -> ATS Score medium (70-84) / Warning
 *       error   -> ATS critical (<70) / Validation issue
 *       neutral -> Subtle slate tag
 */

export function Badge({
  variant = 'neutral',
  size = 'default',
  dot = false,
  icon,
  className,
  children,
  ...props
}) {
  const variantClasses = {
    primary: 'bg-navy/10 text-navy border-navy/20',
    cyan:    'bg-sky-50 text-sky-800 border-sky-200',
    orange:  'bg-amber-50 text-amber-900 border-amber-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error:   'bg-red-50 text-red-800 border-red-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  }[variant] ?? 'bg-slate-100 text-slate-700 border-slate-200'

  const dotClasses = {
    primary: 'bg-navy',
    cyan:    'bg-cyan',
    orange:  'bg-orange',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error:   'bg-red-500',
    neutral: 'bg-slate-400',
  }[variant] ?? 'bg-slate-400'

  const sizeClasses = {
    sm:      'text-xs px-2 py-0.5 gap-1 font-medium',
    default: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5 font-semibold',
    lg:      'text-sm sm:text-base px-3 py-1.5 gap-2 font-semibold',
  }[size] ?? 'text-xs sm:text-sm px-2.5 py-1 gap-1.5 font-semibold'

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full border font-body select-none transition-colors duration-150',
        variantClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotClasses)}
          aria-hidden="true"
        />
      )}
      {icon && (
        <span className="shrink-0 flex items-center justify-center" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  )
}

export default Badge
