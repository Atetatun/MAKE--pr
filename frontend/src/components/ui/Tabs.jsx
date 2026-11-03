import { useRef } from 'react'
import { clsx } from 'clsx'

/**
 * Tabs Component - PortoCraft Design System
 *
 * Implements WAI-ARIA 1.2 Tabs Pattern:
 *   - role="tablist", role="tab", role="tabpanel"
 *   - aria-selected, aria-controls, aria-labelledby
 *   - Roving tabindex (active tab has tabIndex=0, inactive tabs have tabIndex=-1)
 *   - Keyboard navigation:
 *       ArrowRight / ArrowLeft -> Move focus between tabs (with wrapping)
 *       Home / End              -> Jump to first / last tab
 *       Enter / Space           -> Activate focused tab
 *   - Underline indicator: h-0.5 (2px) Cyan Accent
 *   - Mobile friendly: horizontal overflow with momentum scrolling
 */

export function Tabs({ tabs = [], activeTab, onChange, className, 'aria-label': ariaLabel = 'Content tabs' }) {
  const tabsRef = useRef([])

  const handleKeyDown = (e, currentIndex) => {
    const total = tabs.length
    if (total === 0) return

    let nextIndex = currentIndex

    switch (e.key) {
      case 'ArrowRight': {
        e.preventDefault()
        nextIndex = (currentIndex + 1) % total
        break
      }
      case 'ArrowLeft': {
        e.preventDefault()
        nextIndex = (currentIndex - 1 + total) % total
        break
      }
      case 'Home': {
        e.preventDefault()
        nextIndex = 0
        break
      }
      case 'End': {
        e.preventDefault()
        nextIndex = total - 1
        break
      }
      case 'Enter':
      case ' ': {
        e.preventDefault()
        onChange?.(tabs[currentIndex].id)
        return
      }
      default:
        return
    }

    if (nextIndex !== currentIndex) {
      const nextTab = tabs[nextIndex]
      onChange?.(nextTab.id)
      tabsRef.current[nextIndex]?.focus()
    }
  }

  return (
    <div
      className={clsx(
        'flex border-b border-slate-200 overflow-x-auto no-scrollbar scroll-smooth',
        className
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab
        const tabElementId = `tab-${tab.id}`
        const panelElementId = `tabpanel-${tab.id}`

        return (
          <button
            key={tab.id}
            ref={(el) => (tabsRef.current[index] = el)}
            id={tabElementId}
            role="tab"
            aria-selected={isActive}
            aria-controls={panelElementId}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange?.(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={clsx(
              'relative px-4 py-3 text-sm font-semibold transition-all duration-150 cursor-pointer bg-transparent border-0 font-heading whitespace-nowrap select-none shrink-0',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 rounded-t-md',
              isActive
                ? 'text-navy'
                : 'text-text-muted hover:text-navy hover:bg-slate-50',
              tab.disabled && 'opacity-50 cursor-not-allowed text-text-muted'
            )}
          >
            <span className="flex items-center gap-2">
              {tab.icon && (
                <span className="shrink-0" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={clsx(
                    'inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full',
                    isActive ? 'bg-navy text-white' : 'bg-slate-200 text-text-muted'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>

            {/* Active indicator: h-0.5 Cyan bar */}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan rounded-t-sm"
                aria-hidden="true"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

/**
 * TabPanel - Content area for a tab
 */
export function TabPanel({ id, activeTab, children, className }) {
  const isSelected = id === activeTab
  if (!isSelected) return null

  return (
    <div
      id={`tabpanel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      className={clsx('focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-lg py-4', className)}
    >
      {children}
    </div>
  )
}

export default Tabs
