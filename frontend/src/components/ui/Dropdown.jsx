import { useState, useRef, useEffect, useId, useCallback } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Dropdown / Select Component - PortoCraft Design System
 *
 * Implements WAI-ARIA 1.2 Combobox / Listbox Pattern:
 *   - role="combobox" with aria-haspopup="listbox", aria-expanded, aria-controls, aria-activedescendant
 *   - role="listbox" with role="option" and aria-selected
 *   - Keyboard navigation:
 *       ArrowDown / ArrowUp -> Navigate options (with wrap)
 *       Home / End          -> Navigate to first / last option
 *       Enter / Space       -> Open / Select active option
 *       Escape              -> Close dropdown and return focus
 *       Tab                 -> Close dropdown and proceed to next control
 *   - Automatic scroll into view for active option
 *   - WCAG 2.1 AA focus ring & error/disabled states
 */

export function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  disabled = false,
  error = false,
  loading = false,
  className,
  id,
  'aria-describedby': ariaDescribedBy,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const listboxRef = useRef(null)

  const generatedId = useId()
  const dropdownId = id || `dropdown-${generatedId}`
  const listboxId = `${dropdownId}-listbox`

  const selectedIndex = options.findIndex((o) => o.value === value)
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null

  // Keep highlighted index in sync when opening
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0)
    }
  }, [isOpen, selectedIndex])

  // Scroll active option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
      const activeEl = listboxRef.current.children[highlightedIndex]
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [isOpen, highlightedIndex])

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

  const selectOption = useCallback(
    (index) => {
      const option = options[index]
      if (!option || option.disabled) return
      onChange?.(option.value)
      setIsOpen(false)
      triggerRef.current?.focus()
    },
    [options, onChange]
  )

  const findNextEnabled = useCallback(
    (current, step) => {
      if (options.length === 0) return -1
      let next = current + step
      const total = options.length
      for (let i = 0; i < total; i++) {
        const wrappedIndex = (next + total) % total
        if (!options[wrappedIndex].disabled) {
          return wrappedIndex
        }
        next += step
      }
      return current
    },
    [options]
  )

  const handleKeyDown = (e) => {
    if (disabled || loading) return

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex((prev) => findNextEnabled(prev, 1))
        }
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex((prev) => findNextEnabled(prev, -1))
        }
        break
      }
      case 'Home': {
        if (isOpen) {
          e.preventDefault()
          const first = options.findIndex((o) => !o.disabled)
          if (first >= 0) setHighlightedIndex(first)
        }
        break
      }
      case 'End': {
        if (isOpen) {
          e.preventDefault()
          for (let i = options.length - 1; i >= 0; i--) {
            if (!options[i].disabled) {
              setHighlightedIndex(i)
              break
            }
          }
        }
        break
      }
      case 'Enter':
      case ' ': {
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else if (highlightedIndex >= 0) {
          selectOption(highlightedIndex)
        }
        break
      }
      case 'Escape': {
        if (isOpen) {
          e.preventDefault()
          setIsOpen(false)
          triggerRef.current?.focus()
        }
        break
      }
      case 'Tab': {
        if (isOpen) {
          setIsOpen(false)
        }
        break
      }
      default:
        break
    }
  }

  const activeDescendantId =
    isOpen && highlightedIndex >= 0 ? `${listboxId}-opt-${highlightedIndex}` : undefined

  return (
    <div ref={containerRef} className={clsx('relative w-full', className)}>
      {/* Combobox Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        id={dropdownId}
        disabled={disabled || loading}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeDescendantId}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={ariaDescribedBy}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={clsx(
          'w-full h-10 flex items-center justify-between px-3.5 bg-white border rounded-lg text-sm sm:text-base transition-all duration-150 cursor-pointer font-body select-none',
          'focus-visible:outline-none focus-visible:border-cyan focus-visible:border-2 focus-visible:ring-2 focus-visible:ring-cyan/20',
          isOpen
            ? 'border-cyan border-2 ring-2 ring-cyan/20'
            : error
              ? 'border-error border-2 focus:border-error focus:ring-error/20'
              : 'border-slate-300 hover:border-slate-400',
          disabled && 'bg-slate-100 text-text-muted cursor-not-allowed border-slate-200 opacity-60'
        )}
      >
        <span
          className={clsx(
            'truncate',
            selectedOption ? 'text-text-primary font-medium' : 'text-text-muted'
          )}
        >
          {loading ? 'Loading options...' : selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {loading ? (
            <span
              className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-cyan animate-spin"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              size={18}
              className={clsx(
                'text-text-muted transition-transform duration-200',
                isOpen && 'rotate-180 text-cyan'
              )}
              aria-hidden="true"
            />
          )}
        </div>
      </button>

      {/* Dropdown Options Popup */}
      {isOpen && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-label={placeholder}
          className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-lg shadow-xl py-1 max-h-60 overflow-y-auto focus:outline-none animate-[fadeIn_150ms_ease-out_forwards]"
        >
          {options.length === 0 ? (
            <li className="px-3.5 py-2.5 text-sm text-text-muted text-center font-body">
              No options available
            </li>
          ) : (
            options.map((option, index) => {
              const isSelected = option.value === value
              const isHighlighted = index === highlightedIndex
              const isDisabled = option.disabled

              return (
                <li
                  key={option.value}
                  id={`${listboxId}-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  onClick={() => !isDisabled && selectOption(index)}
                  onMouseEnter={() => !isDisabled && setHighlightedIndex(index)}
                  className={clsx(
                    'flex items-center justify-between px-3.5 py-2.5 text-sm sm:text-base transition-colors duration-100 font-body select-none',
                    isDisabled
                      ? 'text-text-muted opacity-50 cursor-not-allowed bg-slate-50'
                      : 'cursor-pointer',
                    isHighlighted && !isDisabled && 'bg-slate-100 text-navy font-semibold',
                    isSelected && 'text-navy font-semibold',
                    !isHighlighted && !isSelected && !isDisabled && 'text-text-primary'
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <Check size={16} className="text-navy shrink-0 ml-2" aria-hidden="true" />
                  )}
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
