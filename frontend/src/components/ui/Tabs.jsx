import { clsx } from 'clsx'

/**
 * Tabs Component
 *
 * Design spec (design-system.md Section 4 - Tabs):
 *   - Horizontal, left-aligned
 *   - Border-bottom on row: 1px light gray
 *   - Active: Navy text, Cyan underline 3px
 *   - Hover: Navy text, light gray bg
 *   - Transition: 200ms
 *   - Animated indicator to new tab on click
 */
export function Tabs({ tabs, activeTab, onChange, className }) {
  return (
    <div
      className={clsx('flex border-b border-slate-200', className)}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            className={clsx(
              'relative px-4 py-4 text-sm font-semibold transition-all duration-200 cursor-pointer bg-transparent border-0 font-heading',
              isActive
                ? 'text-navy'
                : 'text-text-muted hover:text-navy hover:bg-slate-50'
            )}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'ml-2 inline-flex items-center justify-center w-5 h-5 text-caption rounded-full',
                  isActive ? 'bg-navy text-white' : 'bg-slate-200 text-text-muted'
                )}
              >
                {tab.count}
              </span>
            )}
            {/* Active indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-cyan rounded-t-sm" />
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
  if (id !== activeTab) return null
  return (
    <div
      id={`tabpanel-${id}`}
      role="tabpanel"
      aria-labelledby={id}
      className={className}
    >
      {children}
    </div>
  )
}

export default Tabs
