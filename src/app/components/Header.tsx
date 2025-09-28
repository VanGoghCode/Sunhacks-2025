import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-black">
            Loop IT
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-black hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link href="/impact" className="text-black hover:text-green-600 transition-colors">
            Impact
          </Link>
          <Link href="/analytics" className="text-black hover:text-green-600 transition-colors">
            Analytics
          </Link>
          <Link href="/contact" className="text-black hover:text-green-600 transition-colors">
            Contact Us
          </Link>
          <Link href="/login" className="text-black hover:text-green-600 transition-colors">
            Login
          </Link>
          <Link 
            href="/signup" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
