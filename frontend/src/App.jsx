import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster, ToastProvider } from './components/ui/Toaster'

// Pages
import LandingPage from './pages/LandingPage'
import TemplateGalleryPage from './pages/TemplateGalleryPage'
import CVBuilderPage from './pages/CVBuilderPage'
import DashboardPage from './pages/DashboardPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import ComponentShowcasePage from './pages/ComponentShowcasePage'

// Layout
import MainLayout from './components/layout/MainLayout'

/**
 * App - Root component with routing
 *
 * Routes (from plan.md & issue #7):
 *   /             - Landing page
 *   /templates    - Template gallery
 *   /builder/:id  - CV builder
 *   /dashboard    - My projects
 *   /settings     - Settings
 *   /components   - Component Showcase & WCAG Accessibility Audit
 *   /storybook    - Alias to /components
 */
function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Landing page has its own layout */}
          <Route path="/" element={<LandingPage />} />

          {/* App routes with main layout */}
          <Route element={<MainLayout />}>
            <Route path="/templates" element={<TemplateGalleryPage />} />
            <Route path="/builder/:id" element={<CVBuilderPage />} />
            <Route path="/builder" element={<Navigate to="/templates" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/components" element={<ComponentShowcasePage />} />
            <Route path="/storybook" element={<Navigate to="/components" replace />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
