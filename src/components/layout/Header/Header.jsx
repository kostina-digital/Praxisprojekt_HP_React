import { Link } from 'react-router-dom'
import { useState } from 'react'
import LogoContainer from './LogoContainer.jsx'
import Navbar from '../Navigation/Navbar.jsx'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between border-b-2 border-gray-200 p-2 md:p-4 relative">
      <LogoContainer />
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-[#0B1C2D] hover:text-[#646cff] transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b-2 border-gray-200 shadow-lg z-50 md:hidden">
          <Navbar isMobile={true} onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}

