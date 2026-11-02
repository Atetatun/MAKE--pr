import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'
import { Button } from './Button'

/**
 * Modal / Dialog Component
 *
 * Design spec (design-system.md Section 4 - Modal / Dialog):
 *   - Max width: 500px default, 700px large
 *   - Padding: 32px
 *   - Border Radius: 12px
 *   - Overlay: rgba(0,0,0,0.5), optional blur
 *   - Click outside closes
 *   - Fade in + scale 200ms ease-out
 *   - Title: 24pt semi-bold Navy
 *   - Close: X button top-right
 *   - Buttons: bottom-right (Primary + Secondary)
 */
export function Modal({
  isOpen,
  onClose,
  title,
  size = 'default',
  closeOnOverlay = true,
  children,
  footer,
  className,
}) {
  const overlayRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === overlayRef.current) {
      onClose?.()
    }
  }

  const maxWidth = {
    default: 'max-w-modal',
    lg: 'max-w-modal-lg',
  }[size] ?? 'max-w-modal'

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div
        className={clsx(
          'bg-white rounded-xl p-8 relative w-full mx-auto',
          maxWidth,
          'shadow-modal',
          className
        )}
        style={{
          animation: 'modalIn 200ms ease-out forwards',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-100 transition-colors duration-150"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            className="text-subtitle font-semibold text-navy mb-6 pr-8 font-heading"
          >
            {title}
          </h2>
        )}

        {/* Content */}
        <div className="text-base text-text-primary">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="mt-6 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
