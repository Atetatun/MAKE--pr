import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, FileText } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Header / Navigation Component
 *
 * Design spec (design-system.md Section 4 - Navigation (Header)):
 *   - Fixed position, height 64px
 *   - White bg with light bottom shadow
 *   - Padding: 0 40px horizontal
 *   - Logo: Navy semi-bold 20pt, left side
 *   - Menu items: 32px gap, 16pt Regular
 *   - Hover: Navy + cyan underline
 *   - Active: Persistent cyan underline
 *   - Mobile (<640px): Hamburger menu
 */
const NAV_LINKS = [
  { to: '/templates', label: 'Templates' },
  { to: '/dashboard', label: 'My Projects' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div className="flex items-center justify-between h-16 px-10 sm:px-6 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-navy font-semibold text-xl font-heading no-underline hover:no-underline hover:text-navy"
        >
          <FileText size={24} className="text-cyan" />
          PortoCraft
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'relative text-base font-body text-text-primary transition-colors duration-150 no-underline hover:text-navy',
                  'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-t-sm',
                  isActive
                    ? 'text-navy font-semibold after:bg-cyan'
                    : 'after:bg-transparent hover:after:bg-cyan/50'
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
            className="inline-flex items-center justify-center px-4 py-2 bg-navy text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-navy-dark no-underline hover:no-underline"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-text-primary hover:bg-slate-100 transition-colors duration-150"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t border-slate-200 shadow-medium">
          <nav className="flex flex-col py-4 px-6 gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'px-4 py-3 rounded-lg text-base font-body transition-colors duration-150 no-underline',
                    isActive
                      ? 'bg-slate-100 text-navy font-semibold'
                      : 'text-text-primary hover:bg-slate-50 hover:text-navy'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-200">
              <Link
                to="/templates"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3 bg-navy text-white font-semibold text-sm rounded-lg no-underline hover:no-underline hover:bg-navy-dark transition-colors duration-200"
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
