import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-red-700 text-white shadow-lg">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="/" 
              className="text-2xl font-bold hover:text-red-100 transition-colors"
            >
              <span className="hidden sm:inline">TT</span>
              <span className="sm:hidden">TT</span>
              <span className="ml-2">Cyclopedia</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8"
          data-testid="desktop-nav">
            <a href="/" className="hover:text-red-100 transition-colors px-3 py-2 rounded-md">
              Home
            </a>
            <a href="/createPost" className="hover:text-red-100 transition-colors px-3 py-2 rounded-md">
              Create Post
            </a>
            <a href="/about" className="hover:text-red-100 transition-colors px-3 py-2 rounded-md">
              About
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <button 
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-100 focus:outline-none"
              aria-controls="mobile-menu"
              data-testid="mobile-menu-button"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="sm:hidden" id="mobile-menu" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="/" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-100 hover:bg-red-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a 
                href="/createPost" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-100 hover:bg-red-600"
                onClick={() => setIsOpen(false)}
              >
                Create Post
              </a>
              <a 
                href="/about" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-100 hover:bg-red-600"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}