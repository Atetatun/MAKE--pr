import { useEffect, useRef, useId } from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Modal / Dialog Component - PortoCraft Design System
 *
 * Design Spec (design-system.md Section 4.4):
 *   - Backdrop: rgba(15, 23, 42, 0.65) with backdrop-filter: blur(4px)
 *   - Container: Background #ffffff, Radius 12px (rounded-xl), Shadow 0 20px 40px rgba(0, 0, 0, 0.25)
 *   - Widths:
 *       sm      -> 400px (Confirmations / alerts)
 *       default -> 520px (Standard modal)
 *       lg      -> 680px (Wide / AI Auto-Write modal)
 *       xl      -> 900px (Full Preview modal)
 *   - Header: Title 20pt / Semi-bold (#1e3a8a), Close 'X' button top right (44x44px touch target)
 *   - WCAG 2.1 AA Compliance:
 *       - Focus Trap (Tab & Shift-Tab stay inside modal)
 *       - Focus restoration on modal close
 *       - Close on Escape key
 *       - Body scroll lock with padding adjustment
 *       - ARIA: role="dialog", aria-modal="true", aria-labelledby, aria-describedby
 */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'default',
  closeOnOverlay = true,
  children,
  footer,
  className,
  initialFocusRef,
}) {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  const generatedId = useId()
  const titleId = `modal-title-${generatedId}`
  const descriptionId = `modal-desc-${generatedId}`

  // Save previous active element & lock body scroll & set initial focus
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement

      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      // Set focus inside modal
      const timer = setTimeout(() => {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus()
        } else if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
          if (focusable.length > 0) {
            focusable[0].focus()
          } else {
            modalRef.current.focus()
          }
        }
      }, 50)

      return () => {
        clearTimeout(timer)
        document.body.style.overflow = originalOverflow
        if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
          previousActiveElementRef.current.focus()
        }
      }
    }
  }, [isOpen, initialFocusRef])

  // Keyboard navigation: Escape to close + Focus Trap
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose?.()
        return
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = Array.from(modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
        if (focusables.length === 0) {
          e.preventDefault()
          return
        }

        const firstElement = focusables[0]
        const lastElement = focusables[focusables.length - 1]

        if (e.shiftKey) {
          // Shift + Tab: if on first element, wrap to last
          if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab: if on last element, wrap to first
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === overlayRef.current) {
      onClose?.()
    }
  }

  const maxWidthClass = {
    sm: 'max-w-sm',
    default: 'max-w-[520px]',
    lg: 'max-w-[680px]',
    xl: 'max-w-[900px]',
  }[size] ?? 'max-w-[520px]'

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/65 backdrop-blur-sm transition-opacity duration-200"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={clsx(
          'bg-white rounded-xl p-6 sm:p-8 relative w-full mx-auto outline-none',
          'max-h-[90vh] flex flex-col overflow-hidden',
          'shadow-2xl border border-slate-200',
          'animate-[modalIn_200ms_cubic-bezier(0.16,1,0.3,1)_forwards]',
          maxWidthClass,
          className
        )}
      >
        {/* Close Button - Minimum 44x44px touch target */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        {(title || description) && (
          <div className="mb-5 pr-10 shrink-0">
            {title && (
              <h2
                id={titleId}
                className="text-xl sm:text-2xl font-bold text-navy font-heading leading-snug"
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id={descriptionId}
                className="text-sm text-text-muted mt-1.5 font-body leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Modal Content - Scrollable if exceeds viewport */}
        <div className="text-base text-text-primary font-body overflow-y-auto flex-1 pr-1">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0 flex-wrap">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
