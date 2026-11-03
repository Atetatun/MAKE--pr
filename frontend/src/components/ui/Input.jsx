import { forwardRef, cloneElement, isValidElement, useId } from 'react'
import { clsx } from 'clsx'

/**
 * Input Component - PortoCraft Design System
 *
 * Design Spec (design-system.md Section 4.2):
 *   - Height: 40px default (h-10), 48px large (h-12), 32px small (h-8)
 *   - Radius: 8px (rounded-lg)
 *   - Default: Border 1px #cbd5e1, bg white
 *   - Focus: Border 2px #0ea5e9 (Cyan), glow ring 3px rgba(14, 165, 233, 0.2)
 *   - Error: Border 2px #ef4444 (Error), red glow ring, aria-invalid="true"
 *   - Disabled: bg #f1f5f9, text #94a3b8, cursor not-allowed
 *   - Transition: 150ms ease
 */

export const Input = forwardRef(function Input(
  {
    className,
    size = 'default',
    error = false,
    disabled = false,
    leftIcon,
    rightIcon,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: 'h-8 text-xs sm:text-sm px-2.5 py-1',
    default: 'h-10 text-sm sm:text-base px-3.5 py-2.5',
    lg: 'h-12 text-base sm:text-lg px-4 py-3',
  }[size] ?? 'h-10 text-sm sm:text-base px-3.5 py-2.5'

  const inputElement = (
    <input
      ref={ref}
      id={id}
      disabled={disabled}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={ariaDescribedBy}
      className={clsx(
        'w-full bg-white border rounded-lg text-text-primary transition-all duration-150 font-body placeholder:text-text-muted',
        'focus:outline-none focus:border-cyan focus:border-2 focus:ring-2 focus:ring-cyan/20',
        'disabled:bg-slate-100 disabled:text-text-muted disabled:cursor-not-allowed disabled:border-slate-200',
        sizeClasses,
        error
          ? 'border-error border-2 focus:border-error focus:ring-error/20'
          : 'border-slate-300 hover:border-slate-400',
        leftIcon && 'pl-10',
        rightIcon && 'pr-10',
        className
      )}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) {
    return inputElement
  }

  return (
    <div className="relative flex items-center w-full">
      {leftIcon && (
        <span
          className="absolute left-3 flex items-center pointer-events-none text-text-muted"
          aria-hidden="true"
        >
          {leftIcon}
        </span>
      )}
      {inputElement}
      {rightIcon && (
        <span
          className="absolute right-3 flex items-center text-text-muted"
          aria-hidden="true"
        >
          {rightIcon}
        </span>
      )}
    </div>
  )
})

/**
 * Textarea Component
 */
export const Textarea = forwardRef(function Textarea(
  {
    className,
    error = false,
    disabled = false,
    id,
    rows = 4,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      disabled={disabled}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={ariaDescribedBy}
      className={clsx(
        'w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm sm:text-base text-text-primary transition-all duration-150 font-body resize-y min-h-[100px] placeholder:text-text-muted',
        'focus:outline-none focus:border-cyan focus:border-2 focus:ring-2 focus:ring-cyan/20',
        'disabled:bg-slate-100 disabled:text-text-muted disabled:cursor-not-allowed disabled:border-slate-200',
        error
          ? 'border-error border-2 focus:border-error focus:ring-error/20'
          : 'border-slate-300 hover:border-slate-400',
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
  {
    className,
    error = false,
    disabled = false,
    id,
    children,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        id={id}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={ariaDescribedBy}
        className={clsx(
          'w-full bg-white border rounded-lg px-3.5 py-2.5 pr-10 h-10 text-sm sm:text-base text-text-primary transition-all duration-150 font-body cursor-pointer appearance-none',
          'focus:outline-none focus:border-cyan focus:border-2 focus:ring-2 focus:ring-cyan/20',
          'disabled:bg-slate-100 disabled:text-text-muted disabled:cursor-not-allowed disabled:border-slate-200',
          error
            ? 'border-error border-2 focus:border-error focus:ring-error/20'
            : 'border-slate-300 hover:border-slate-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
})

/**
 * FormField - Label + Input + Error message wrapper
 *
 * Implements WCAG 2.1 AA Requirements:
 *   - 1.3.1 Info and Relationships (explicit label association)
 *   - 3.3.1 Error Identification (role="alert", aria-describedby)
 *   - 3.3.2 Labels or Instructions (visible required indicator, hint text)
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
  const generatedId = useId()
  const fieldId = htmlFor || `field-${generatedId}`
  const errorId = `${fieldId}-error`
  const hintId = `${fieldId}-hint`

  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={clsx('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-semibold text-text-primary font-heading flex items-center justify-between"
        >
          <span>
            {label}
            {required && (
              <span className="text-error ml-1 font-bold" aria-hidden="true">
                *
              </span>
            )}
          </span>
          {required && (
            <span className="sr-only">(required)</span>
          )}
        </label>
      )}

      {/* Clone children to inject id, aria-describedby, and error state */}
      {isValidElement(children)
        ? cloneElement(children, {
            id: children.props.id || fieldId,
            error: children.props.error ?? Boolean(error),
            'aria-describedby':
              [children.props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined,
          })
        : children}

      {hint && !error && (
        <p id={hintId} className="text-caption text-text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" aria-live="polite" className="text-caption text-error font-medium flex items-center gap-1">
          <span aria-hidden="true">⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

/**
 * Checkbox
 */
export const Checkbox = forwardRef(function Checkbox(
  { label, checked, onChange, disabled = false, error = false, id, className, ...props },
  ref
) {
  const generatedId = useId()
  const checkboxId = id || `checkbox-${generatedId}`

  return (
    <div className={clsx('inline-flex items-center min-h-[44px]', className)}>
      <label
        htmlFor={checkboxId}
        className={clsx(
          'inline-flex items-center gap-2.5 cursor-pointer select-none text-sm font-body text-text-primary',
          disabled && 'opacity-60 cursor-not-allowed text-text-muted'
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          className={clsx(
            'w-5 h-5 rounded border text-navy transition-all duration-150 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:bg-slate-100',
            error ? 'border-error' : 'border-slate-300 hover:border-slate-400'
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    </div>
  )
})

/**
 * Toggle Switch
 */
export function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
  id,
  className,
}) {
  const generatedId = useId()
  const toggleId = id || `toggle-${generatedId}`

  const handleKeyDown = (e) => {
    if (disabled) return
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onChange?.(!checked)
    }
  }

  return (
    <div className={clsx('inline-flex items-center min-h-[44px]', className)}>
      <label
        htmlFor={toggleId}
        className={clsx(
          'inline-flex items-center gap-3 cursor-pointer select-none',
          disabled && 'opacity-60 cursor-not-allowed'
        )}
      >
        <button
          type="button"
          id={toggleId}
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange?.(!checked)}
          onKeyDown={handleKeyDown}
          className={clsx(
            'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2',
            checked ? 'bg-navy' : 'bg-slate-300',
            disabled && 'cursor-not-allowed opacity-60'
          )}
        >
          <span
            aria-hidden="true"
            className={clsx(
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out',
              checked ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </button>
        {label && (
          <span className="text-sm font-medium text-text-primary font-heading">
            {label}
          </span>
        )}
      </label>
    </div>
  )
}

export default Input
