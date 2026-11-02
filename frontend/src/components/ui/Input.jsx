import { forwardRef, cloneElement } from 'react'
import { clsx } from 'clsx'

/**
 * Input Component
 *
 * Design spec (design-system.md Section 4 - Input / Form Field):
 *   - Height: 40px default, 48px large
 *   - Border Radius: 8px
 *   - Focus: Cyan border 2px, cyan glow ring
 *   - Error: Red border 2px
 */
export const Input = forwardRef(function Input(
  { className, size = 'default', error = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        'w-full bg-white border border-slate-200 rounded-lg px-3 text-base text-text-primary transition-all duration-150 font-body',
        'focus:outline-none focus:border-cyan focus:border-2 focus:ring-2 focus:ring-cyan/20',
        'disabled:bg-slate-100 disabled:text-text-muted disabled:cursor-not-allowed',
        'placeholder:text-text-muted',
        size === 'lg' ? 'h-12 py-3' : 'h-10 py-2',
        error && 'border-error border-2 focus:border-error focus:ring-error/20',
        className
      )}
      {...props}
    />
  )
})

/**
 * Textarea Component
 */
export const Textarea = forwardRef(function Textarea(
  { className, error = false, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={clsx(
        'w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-base text-text-primary transition-all duration-150 font-body resize-y min-h-[100px]',
        'focus:outline-none focus:border-cyan focus:border-2 focus:ring-2 focus:ring-cyan/20',
        'disabled:bg-slate-100 disabled:text-text-muted disabled:cursor-not-allowed',
        'placeholder:text-text-muted',
        error && 'border-error border-2 focus:border-error focus:ring-error/20',
        className
      )}
      {...props}
    />
  )
})

/**
 * Select Component
 */
export const Select = forwardRef(function Select(
  { className, error = false, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={clsx(
        'w-full bg-white border border-slate-200 rounded-lg px-3 py-2 h-10 text-base text-text-primary transition-all duration-150 font-body cursor-pointer',
        'focus:outline-none focus:border-cyan focus:border-2 focus:ring-2 focus:ring-cyan/20',
        'disabled:bg-slate-100 disabled:text-text-muted disabled:cursor-not-allowed',
        error && 'border-error border-2',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
})

/**
 * FormField - Label + Input + Error message wrapper
 *
 * Handles WCAG accessibility:
 *   - <label for=""> association
 *   - aria-describedby for error
 *   - required attribute + visual marker
 */
export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
  className,
}) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined
  const hintId  = htmlFor ? `${htmlFor}-hint`  : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ')

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={clsx(
            'text-sm font-medium text-text-primary font-heading',
            required && "after:content-['_*'] after:text-error"
          )}
        >
          {label}
        </label>
      )}

      {/* Clone children to inject aria attributes */}
      {children && cloneElement(children, { 'aria-describedby': describedBy || undefined })}

      {hint && !error && (
        <p id={hintId} className="text-caption text-text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-caption text-error">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Checkbox
 */
export function Checkbox({ label, className, ...props }) {
  return (
    <label className={clsx('flex items-center gap-2 cursor-pointer', className)}>
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-slate-300 text-navy focus:ring-cyan focus:ring-2 focus:ring-offset-1"
        {...props}
      />
      {label && (
        <span className="text-body-sm text-text-primary font-body">{label}</span>
      )}
    </label>
  )
}

/**
 * Toggle Switch
 */
export function Toggle({ label, checked, onChange, disabled = false, className }) {
  return (
    <label className={clsx('flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={clsx(
            'w-11 h-6 rounded-full transition-colors duration-200',
            checked ? 'bg-navy' : 'bg-slate-300'
          )}
        />
        <div
          className={clsx(
            'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </div>
      {label && (
        <span className="text-body-sm font-medium text-text-primary font-heading">
          {label}
        </span>
      )}
    </label>
  )
}
