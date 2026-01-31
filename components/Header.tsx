import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Minimal Blog
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}