import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Cosmic Blog
          </Link>
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-8">
              <Link 
                href="/" 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Categories
              </Link>
              <Link 
                href="/authors" 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Authors
              </Link>
            </nav>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}