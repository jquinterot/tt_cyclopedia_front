export default function NavBar() {
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
          <div className="hidden sm:flex items-center space-x-8">
            <a 
              href="/" 
              className="hover:text-red-100 transition-colors px-3 py-2 rounded-md"
            >
              Home
            </a>
            <a 
              href="/createPost" 
              className="hover:text-red-100 transition-colors px-3 py-2 rounded-md"
            >
              Create Post
            </a>
            <a 
              href="/about" 
              className="hover:text-red-100 transition-colors px-3 py-2 rounded-md"
            >
              About
            </a>
          </div>

          {/* Mobile Menu Button (optional) */}
          <div className="sm:hidden">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}