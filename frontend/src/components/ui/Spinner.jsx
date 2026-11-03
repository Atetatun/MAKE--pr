import { clsx } from 'clsx'

/**
 * Spinner & Skeleton Loading Components - PortoCraft Design System
 *
 * Design Spec (design-system.md Section 4):
 *   - Spinner Color: Cyan (#0ea5e9) Accent
 *   - Sizes: sm (20px), default (32px), lg (48px)
 *   - WCAG 2.1 AA compliance:
 *       role="status", aria-live="polite", sr-only text
 */

export function Spinner({
  size = 'default',
  color = 'cyan',
  label = 'Loading...',
  className,
}) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    default: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  }[size] ?? 'w-8 h-8 border-[3px]'

  const colorClasses = {
    cyan: 'border-slate-200 border-t-cyan',
    navy: 'border-slate-200 border-t-navy',
    white: 'border-white/30 border-t-white',
    orange: 'border-slate-200 border-t-orange',
  }[color] ?? 'border-slate-200 border-t-cyan'

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        'inline-block rounded-full animate-spin shrink-0 select-none',
        sizeClasses,
        colorClasses,
        className
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}

/**
 * LoadingState - Accessible component for loading screens & section spinners
 */
export function LoadingState({
  text = 'Loading data...',
  size = 'default',
  className,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx('flex flex-col sm:flex-row items-center justify-center gap-3 py-8', className)}
    >
      <Spinner size={size} label={text} />
      <span className="text-sm sm:text-base font-medium text-text-muted font-body">
        {text}
      </span>
    </div>
  )
}

/**
 * FullPageLoader - Fullscreen backdrop with branded spinner
 */
export function FullPageLoader({ text = 'Preparing PortoCraft workspace...' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg-light px-4"
    >
      <Spinner size="lg" color="navy" label={text} />
      <p className="text-base font-medium text-navy font-heading text-center">
        {text}
      </p>
    </div>
  )
}

/**
 * Skeleton - Pulsing accessible placeholder for content loading
 */
export function Skeleton({ className, variant = 'rectangle', ...props }) {
  const variantClass = {
    text: 'h-4 w-full rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
  }[variant] ?? 'rounded-lg'

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'animate-pulse bg-slate-200/80 select-none pointer-events-none',
        variantClass,
        className
      )}
      {...props}
    />
  )
}

export default Spinner
