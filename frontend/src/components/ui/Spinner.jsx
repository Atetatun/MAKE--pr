import { clsx } from 'clsx'

/**
 * Spinner / Loading Component
 *
 * Design spec (design-system.md Section 4 - Loading State):
 *   - Size: 24px small, 40px large
 *   - Color: Cyan (#0ea5e9)
 *   - Animation: Rotate 360° in 1s infinite
 */
export function Spinner({ size = 'default', className, label = 'Loading...' }) {
  const sizeClass = {
    sm: 'w-6 h-6 border-2',
    default: 'w-8 h-8 border-2',
    lg: 'w-10 h-10 border-[3px]',
  }[size] ?? 'w-8 h-8 border-2'

  return (
    <div
      role="status"
      aria-label={label}
      className={clsx('inline-block rounded-full border-slate-200 animate-spin border-t-cyan', sizeClass, className)}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}

/**
 * LoadingState - Full loading state with spinner + text
 */
export function LoadingState({ text = 'Loading...', size = 'default', className }) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <Spinner size={size} label={text} />
      <span className="text-body-sm text-text-muted font-body">{text}</span>
    </div>
  )
}

/**
 * FullPageLoader - Centered loading overlay for page transitions
 */
export function FullPageLoader({ text = 'Loading...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg-light">
      <Spinner size="lg" label={text} />
      <p className="text-body text-text-muted font-body">{text}</p>
    </div>
  )
}

export default Spinner
