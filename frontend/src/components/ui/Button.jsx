import { cva } from 'class-variance-authority'
import { clsx } from 'clsx'

/**
 * Button Component
 *
 * Variants: primary | secondary | danger | ghost
 * Sizes: sm | default | lg
 *
 * Design spec (design-system.md Section 4 - Component System - Button):
 *   - Border Radius: 8px
 *   - Font Weight: Semi-bold (600)
 *   - Focus: Cyan outline 3px, 2px offset
 *   - Transition: 200ms
 */

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer border-0 font-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-navy text-white hover:bg-navy-dark active:bg-navy-dark shadow-sm hover:shadow-md',
        secondary:
          'border-2 border-navy text-navy bg-transparent hover:bg-slate-50 active:bg-slate-100',
        danger:
          'bg-error text-white hover:bg-red-600 active:bg-red-700',
        ghost:
          'bg-transparent text-navy hover:bg-slate-100 active:bg-slate-200',
      },
      size: {
        sm:      'text-sm px-3 py-2',
        default: 'text-base px-4 py-3',
        lg:      'text-lg px-6 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

/**
 * @param {object} props
 * @param {'primary'|'secondary'|'danger'|'ghost'} [props.variant]
 * @param {'sm'|'default'|'lg'} [props.size]
 * @param {boolean} [props.loading]
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} props.children
 */
export function Button({
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span
          className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}

export default Button
