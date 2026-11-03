import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { clsx } from 'clsx'

/**
 * Button Component - PortoCraft Design System
 *
 * Design Spec (design-system.md Section 4.1):
 *   - Variants:
 *       primary   -> #1e3a8a, hover: #172554, active: #0f172a, text: white
 *       secondary -> transparent, border: 2px #1e3a8a, text: #1e3a8a, hover: #f1f5f9
 *       accent    -> #0ea5e9, hover: #0284c7, active: #0369a1, text: white
 *       danger    -> #ef4444, hover: #dc2626, active: #b91c1c, text: white
 *       ghost     -> transparent, text: #1e3a8a, hover: #f1f5f9, active: #e2e8f0
 *       outline   -> transparent, border: 1px #cbd5e1, text: #0f172a, hover: #f8fafc
 *   - Sizes:
 *       sm        -> height 32px (h-8), px-3, text-xs sm:text-sm, radius 6px
 *       default   -> height 40px (h-10), px-4, text-sm sm:text-base, radius 8px
 *       lg        -> height 48px (h-12), px-6, text-base sm:text-lg, radius 8px
 *   - Focus: 2px Cyan outline, 2px offset (WCAG 2.4.7 Focus Visible)
 *   - Transition: 150ms ease-out
 *   - Loading & Disabled states with ARIA support (aria-busy, disabled)
 */

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer font-heading select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-navy text-white hover:bg-navy-dark active:bg-slate-900 shadow-sm hover:shadow-md border border-transparent',
        secondary:
          'bg-transparent border-2 border-navy text-navy hover:bg-slate-50 active:bg-slate-100',
        accent:
          'bg-cyan text-white hover:bg-cyan-dark active:bg-[#0369a1] shadow-sm hover:shadow-md border border-transparent',
        danger:
          'bg-error text-white hover:bg-red-600 active:bg-red-700 shadow-sm border border-transparent',
        ghost:
          'bg-transparent text-navy hover:bg-slate-100 active:bg-slate-200 border border-transparent',
        outline:
          'bg-white border border-slate-300 text-text-primary hover:bg-slate-50 active:bg-slate-100 shadow-sm',
      },
      size: {
        sm: 'h-8 px-3 text-xs sm:text-sm rounded-md gap-1.5',
        default: 'h-10 px-4 text-sm sm:text-base rounded-lg gap-2',
        lg: 'h-12 px-6 text-base sm:text-lg rounded-lg gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
    },
  }
)

/**
 * @typedef {object} ButtonProps
 * @property {'primary'|'secondary'|'accent'|'danger'|'ghost'|'outline'} [variant]
 * @property {'sm'|'default'|'lg'} [size]
 * @property {boolean} [loading]
 * @property {string} [loadingText]
 * @property {boolean} [disabled]
 * @property {boolean} [fullWidth]
 * @property {React.ReactNode} [leftIcon]
 * @property {React.ReactNode} [rightIcon]
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 */

export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'default',
    loading = false,
    loadingText,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={isDisabled}
      aria-busy={loading ? 'true' : undefined}
      aria-disabled={isDisabled ? 'true' : undefined}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <span>{children}</span>
          {rightIcon && (
            <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  )
})

export default Button
