import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ui/ThemeToggle'

interface LayoutProps {
  children: React.ReactNode
}

interface NavItem {
  name: string
  href: string
  key: string
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [location])

  const navigation: NavItem[] = [
    { name: 'Inicio', href: '/', key: 'dashboard' },
    { name: 'Recursos', href: '/resources', key: 'resources' },
    { name: 'Registros', href: '/register', key: 'register' },
    { name: 'Reportes', href: '/reports', key: 'reports' },
    { name: 'Costos', href: '/costs', key: 'costs' },
    { name: 'Recetas', href: '/recipes', key: 'recipes' },
    { name: 'Ayuda', href: '/help', key: 'help' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-b from-accent to-accent-strong flex items-center justify-center text-white font-bold text-lg">
              GK
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Gestok</div>
              <div className="text-sm text-muted dark:text-gray-400">Gestión eficiente de recursos</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle visible solo en desktop */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
              aria-label="Abrir menú"
            >
              {isDrawerOpen ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 ${
          isDrawerOpen ? 'block' : 'hidden'
        } lg:hidden`}
      >
        <div 
          className="fixed inset-0 bg-black bg-opacity-25" 
          onClick={() => setIsDrawerOpen(false)} 
        />
        <nav className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 rounded-b-xl shadow-lg p-4 z-50">
          <div className="space-y-2">
            {/* Theme Toggle dentro del drawer móvil */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tema
              </span>
              <ThemeToggle />
            </div>

            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                  location.pathname === item.href
                    ? 'bg-accent text-white'
                    : 'text-accent-strong dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className="max-w-5xl mx-auto px-4">
        <nav className="hidden lg:flex bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2 mt-4 mb-6">
          <div className="flex space-x-1 w-full">
            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex-1 text-center ${
                  location.pathname === item.href
                    ? 'bg-accent text-white'
                    : 'text-accent-strong dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 pb-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center text-muted dark:text-gray-400 py-6 mt-8 text-sm">
        © 2025 Gestok
      </footer>
    </div>
  )
}

export default Layout