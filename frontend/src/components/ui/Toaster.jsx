import { useEffect, useState, createContext, useContext, useCallback } from 'react'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Toast / Notification System
 *
 * Design spec (design-system.md Section 4 - Toast / Notification):
 *   - Position: Bottom right
 *   - Margin: 16px from edge
 *   - Width: 320px max
 *   - Padding: 16px
 *   - Border Radius: 8px
 *   - Auto-dismiss: 4s
 *   - Slide in from right: 200ms ease-out
 *   - Variants: success (green), error (red), warning (orange), info (cyan)
 */

const ToastContext = createContext(null)

let toastCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, variant = 'info', duration = 4000) => {
    const id = ++toastCounter
    setToasts((prev) => [...prev, { id, message, variant, duration }])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Expose helpers
  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error:   (msg, dur) => addToast(msg, 'error',   dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info:    (msg, dur) => addToast(msg, 'info',    dur),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 items-end"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ id, message, variant, duration, onRemove }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!duration) return
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => onRemove(id), 200)
      return () => clearTimeout(timer)
    }
  }, [visible, id, onRemove])

  const styles = {
    success: { bg: 'bg-success',             Icon: CheckCircle2 },
    error:   { bg: 'bg-error',               Icon: AlertCircle  },
    warning: { bg: 'bg-orange',              Icon: AlertTriangle },
    info:    { bg: 'bg-cyan',                Icon: Info          },
  }[variant] ?? { bg: 'bg-cyan', Icon: Info }

  const { bg, Icon } = styles

  return (
    <div
      role="status"
      aria-live="assertive"
      className={clsx(
        'max-w-toast w-full rounded-lg p-4 text-white flex items-start gap-3',
        bg,
        'shadow-medium',
        visible
          ? 'animate-[slideInRight_200ms_ease-out_forwards]'
          : 'animate-[slideOutRight_200ms_ease-in_forwards]'
      )}
    >
      <Icon size={20} className="shrink-0 mt-0.5" />
      <p className="text-sm flex-1 font-body">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 p-1 rounded hover:bg-white/20 transition-colors duration-150"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}

/**
 * Toaster - Drop this in App root (or near it) to mount the toast container
 */
export function Toaster() {
  // This is a placeholder - wrap App in ToastProvider instead for full usage
  return null
}

/**
 * useToast - Hook for triggering toasts anywhere in the tree
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

export default ToastProvider
