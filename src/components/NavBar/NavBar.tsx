import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

// Logo Section
function LogoSection() {
  return (
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
  );
}

// User Profile Dropdown
function UserProfileDropdown({ username, onLogout, t }: { username: string; onLogout: () => void; t: (key: string) => string }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef} data-testid="user-profile">
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white/5 hover:bg-blue-600/20 transition"
        onClick={() => setOpen((v) => !v)}
        data-testid="user-profile-trigger"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-sm font-medium text-white">{username.charAt(0).toUpperCase()}</span>
        </div>
        <span className="text-sm font-medium text-gray-300">{username}</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-md shadow-lg z-50" data-testid="user-profile-dropdown-menu">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-200 hover:bg-blue-600/20 rounded-t-md transition-colors"
            onClick={() => setOpen(false)}
            data-testid="dropdown-profile-link"
          >
            Profile
          </Link>
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-blue-600/20 rounded-b-md transition-colors"
            data-testid="profile-button"
          >
            {t('nav.logout')}
          </button>
        </div>
      )}
    </div>
  );
}

// Desktop Navigation
function DesktopNav({
  username,
  t,
  language,
  toggleLanguage,
  handleLogout,
}: {
  username: string | null;
  t: (key: string) => string;
  language: string;
  toggleLanguage: () => void;
  handleLogout: () => void;
}) {
  return (
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
      <button
        onClick={toggleLanguage}
        className="text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
        data-testid="language-toggle"
      >
        {language.toUpperCase()}
      </button>
      {username ? (
        <UserProfileDropdown username={username} onLogout={handleLogout} t={t} />
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
  );
}

// Mobile Menu Button
function MobileMenuButton({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Mobile Dropdown Menu
function MobileDropdownMenu({
  isOpen,
  username,
  t,
  language,
  toggleLanguage,
  handleLogout,
  setIsOpen,
}: {
  isOpen: boolean;
  username: string | null;
  t: (key: string) => string;
  language: string;
  toggleLanguage: () => void;
  handleLogout: () => void;
  setIsOpen: (open: boolean) => void;
}) {
  if (!isOpen) return null;
  return (
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
          <div className="mt-2" data-testid="mobile-user-profile-dropdown">
            <span className="block px-4 py-2 text-base text-gray-200 font-medium" data-testid="mobile-username">{username}</span>
            <Link
              to="/profile"
              className="block px-4 py-2 text-base text-gray-200 hover:bg-blue-600/20 rounded-t-md transition-colors"
              onClick={() => setIsOpen(false)}
              data-testid="mobile-dropdown-profile-link"
            >
              Profile
            </Link>
            <button
              onClick={() => { setIsOpen(false); handleLogout(); }}
              className="block w-full text-left px-4 py-2 text-base text-gray-200 hover:bg-blue-600/20 rounded-b-md transition-colors"
              data-testid="mobile-dropdown-logout-button"
            >
              {t('nav.logout')}
            </button>
          </div>
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
  );
}

// Main NavBar
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/60 border-b border-white/10" data-testid="navbar">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <LogoSection />
          <DesktopNav
            username={user?.username || null}
            t={t}
            language={language}
            toggleLanguage={toggleLanguage}
            handleLogout={handleLogout}
          />
          <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <MobileDropdownMenu
          isOpen={isOpen}
          username={user?.username || null}
          t={t}
          language={language}
          toggleLanguage={toggleLanguage}
          handleLogout={handleLogout}
          setIsOpen={setIsOpen}
        />
      </nav>
    </header>
  );
}