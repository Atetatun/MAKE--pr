import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Dropdown / Select Component
 *
 * Custom dropdown with accessible keyboard navigation.
 * Follows design-system.md component specs.
 *
 * @param {object} props
 * @param {{ value: string, label: string }[]} props.options
 * @param {string} props.value - selected value
 * @param {function} props.onChange
 * @param {string} [props.placeholder]
 * @param {boolean} [props.disabled]
 * @param {string} [props.error]
 */
export function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  disabled = false,
  error = false,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const selected = options.find((o) => o.value === value)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen((prev) => !prev)
    }
    if (e.key === 'Escape') setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={clsx(
          'w-full h-10 flex items-center justify-between px-3 bg-white border rounded-lg text-base transition-all duration-150 cursor-pointer font-body',
          isOpen
            ? 'border-cyan border-2 ring-2 ring-cyan/20'
            : error
              ? 'border-error border-2'
              : 'border-slate-200 hover:border-slate-300',
          disabled && 'bg-slate-100 text-text-muted cursor-not-allowed'
        )}
      >
        <span className={clsx(selected ? 'text-text-primary' : 'text-text-muted')}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={clsx('text-text-muted transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {/* Options list */}
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-medium overflow-hidden py-1 max-h-60 overflow-y-auto"
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={clsx(
                  'flex items-center justify-between px-3 py-2 text-base cursor-pointer transition-colors duration-100 font-body',
                  isSelected
                    ? 'bg-slate-100 text-navy font-semibold'
                    : 'text-text-primary hover:bg-slate-50'
                )}
              >
                {option.label}
                {isSelected && <Check size={14} className="text-navy shrink-0" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
