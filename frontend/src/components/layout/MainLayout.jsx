import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

/**
 * MainLayout - App shell for all authenticated/main pages
 * Includes sticky Header and Footer
 */
export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light">
      <Header />
      <main className="flex-1 pt-16" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
