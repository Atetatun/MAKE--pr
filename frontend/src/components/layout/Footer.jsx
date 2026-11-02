import { Link } from 'react-router-dom'
import { FileText, Github, Twitter, Linkedin } from 'lucide-react'

/**
 * Footer Component
 *
 * Design spec: 64px height (min), White bg, Navy text, Cyan links
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-page mx-auto px-10 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-navy font-semibold text-lg font-heading no-underline mb-3">
              <FileText size={20} className="text-cyan" />
              PortoCraft
            </Link>
            <p className="text-body-sm text-text-muted font-body">
              AI-powered CV & Portfolio Builder. Create professional resumes in minutes.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-body-sm font-semibold text-text-primary font-heading mb-3">Product</h4>
            <ul className="space-y-2">
              {[
                { to: '/templates', label: 'Templates' },
                { to: '/dashboard', label: 'My Projects' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-body-sm text-text-muted hover:text-navy font-body no-underline transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-body-sm font-semibold text-text-primary font-heading mb-3">Features</h4>
            <ul className="space-y-2">
              {['AI Auto-Write', 'ATS Checker', 'PDF Export', 'Template Gallery'].map((f) => (
                <li key={f}>
                  <span className="text-body-sm text-text-muted font-body">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h4 className="text-body-sm font-semibold text-text-primary font-heading mb-3">Team</h4>
            <ul className="space-y-2">
              {['Anggrea (Design)', 'Cici (Frontend)', 'Faiz (Pages)', 'Fahri (Integration)', 'Riski (Backend)'].map((m) => (
                <li key={m}>
                  <span className="text-body-sm text-text-muted font-body">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-text-muted font-body">
            &copy; {currentYear} PortoCraft. MVP v1.0 – Target Launch Q1 2027.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-navy transition-colors duration-150" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
