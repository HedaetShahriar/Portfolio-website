"use client";

import { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ThemeContext } from '@/components/Providers';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, toggle } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('header')) setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isMenuOpen) return;
      if (e.key === 'Escape') { setIsMenuOpen(false); buttonRef.current?.focus(); }
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll('a, button');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold text-white truncate">
          Md. Hedaet Shahriar Himon
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <li key={link.href} className="list-none">
              <a href={link.href} className="text-gray-400 hover:text-white font-medium transition duration-300">
                {link.label}
              </a>
            </li>
          ))}
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white h-9 w-9 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {theme === 'dark' ? (<Sun className="h-5 w-5" />) : (<Moon className="h-5 w-5" />)}
            <span className="sr-only">Toggle theme</span>
          </button>
          {session ? (
            <Link href="/admin/dashboard" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
              Login
            </Link>
          )}
        </div>
        <div className="md:hidden relative">
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          {isMenuOpen && (
            <div
              id="mobile-menu"
              ref={menuRef}
              role="menu"
              aria-label="Mobile navigation"
              className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl z-50"
            >
              <div className="p-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className="block py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 flex gap-2 border-t border-gray-700 mt-3">
                  <button
                    onClick={() => { toggle(); buttonRef.current?.focus(); }}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    className="flex-1 inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white h-9 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    {theme === 'dark' ? (<Moon className="h-5 w-5" />) : (<Sun className="h-5 w-5" />)}
                    <span className="sr-only">Toggle theme</span>
                  </button>
                  {session ? (
                    <Link
                      href="/admin/dashboard"
                      className="block text-center flex-1 bg-indigo-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="block text-center flex-1 bg-gray-700 text-white font-bold py-2 px-3 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
