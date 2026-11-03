import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, FileText } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Header / Navigation Component - PortoCraft Design System
 *
 * Design Spec (design-system.md Section 4):
 *   - Height 64px sticky
 *   - Logo: Deep Navy #1e3a8a
 *   - Nav Links: Inter 16px, Hover #0ea5e9, Active #1e3a8a with persistent Cyan underline
 *   - Mobile (<640px): Accessible slide-down menu with touch-friendly 44px targets
 */

const NAV_LINKS = [
  { to: '/templates', label: 'Templates' },
  { to: '/dashboard', label: 'My Projects' },
  { to: '/components', label: 'Components' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-navy font-bold text-xl font-heading no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-md px-1"
        >
          <FileText size={24} className="text-cyan shrink-0" aria-hidden="true" />
          <span>PortoCraft</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'relative py-2 text-sm font-semibold font-body transition-colors duration-150 no-underline',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-md px-2',
                  'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-t-sm',
                  isActive
                    ? 'text-navy after:bg-cyan'
                    : 'text-text-muted hover:text-navy after:bg-transparent hover:after:bg-cyan/50'
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            to="/templates"
            className="inline-flex items-center justify-center px-4 py-2 bg-navy text-white font-semibold text-sm rounded-lg transition-all duration-150 hover:bg-navy-dark no-underline shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="sm:hidden w-11 h-11 flex items-center justify-center rounded-lg text-text-primary hover:bg-slate-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 shadow-xl animate-[fadeIn_150ms_ease-out]">
          <nav className="flex flex-col py-3 px-4 gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'px-4 py-3 rounded-lg text-base font-body font-medium transition-colors duration-150 no-underline flex items-center',
                    isActive
                      ? 'bg-slate-100 text-navy font-bold border-l-4 border-cyan'
                      : 'text-text-primary hover:bg-slate-50 hover:text-navy'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-2 pt-2 border-t border-slate-100">
              <Link
                to="/templates"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 bg-navy text-white font-semibold text-sm rounded-lg no-underline hover:bg-navy-dark transition-colors duration-150 shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
