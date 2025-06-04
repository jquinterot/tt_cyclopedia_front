import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      setUsername('test'); // Since we're using 'test' as the mock username
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setUsername(null);
    // Don't navigate away, just stay on current page
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/60 border-b border-white/10" data-testid="navbar">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center" data-testid="navbar-logo">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
              data-testid="logo-link"
            >
              <span className="hidden sm:inline">TT</span>
              <span className="sm:hidden">TT</span>
              <span className="ml-2">Cyclopedia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8" data-testid="desktop-nav">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              data-testid="nav-home"
            >
              {t('nav.home')}
            </Link>
            {username && (
              <Link 
                to="/createPost" 
                className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                data-testid="nav-create-post"
              >
                {t('nav.createPost')}
              </Link>
            )}
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              data-testid="nav-about"
            >
              {t('nav.about')}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              data-testid="language-toggle"
            >
              {language.toUpperCase()}
            </button>

            {/* User Profile Section */}
            {username ? (
              <div className="flex items-center space-x-3" data-testid="user-profile">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white/5">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-300">{username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  data-testid="profile-button"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                data-testid="nav-login"
              >
                {t('nav.signIn')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden" data-testid="mobile-menu-button">
            <button 
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-white/5 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              data-testid="mobile-menu-button"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="sm:hidden absolute left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10" id="mobile-menu" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-home"
              >
                {t('nav.home')}
              </Link>
              {username && (
                <Link 
                  to="/createPost" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid="mobile-nav-create-post"
                >
                  {t('nav.createPost')}
                </Link>
              )}
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-about"
              >
                {t('nav.about')}
              </Link>

              {/* Language Toggle */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                data-testid="mobile-language-toggle"
              >
                {language.toUpperCase()}
              </button>

              {username ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-300">{username}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid="mobile-nav-login"
                >
                  {t('nav.signIn')}
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}