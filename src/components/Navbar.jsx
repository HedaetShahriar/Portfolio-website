"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react'; // Import useSession and signOut

const Navbar = () => {
  const { data: session } = useSession(); // Get session data
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('header')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold text-white truncate">
            Md. Hedaet Shahriar Himon
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.href} className="list-none">
              <a href={link.href} className="text-gray-400 hover:text-white font-medium transition duration-300">{link.label}</a>
            </li>
          ))}
          {/* Conditional Login/Dashboard Button */}
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
          {/* Mobile Menu - Positioned relative to the hamburger button */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl z-50">
              <div className="p-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    className="block py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors text-sm" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                {/* Mobile Menu Login/Dashboard Button */}
                <div className="pt-3 border-t border-gray-700 mt-3">
                  {session ? (
                      <Link 
                        href="/admin/dashboard" 
                        className="block text-center w-full bg-indigo-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                          Dashboard
                      </Link>
                  ) : (
                      <Link 
                        href="/login" 
                        className="block text-center w-full bg-gray-700 text-white font-bold py-2 px-3 rounded-lg hover:bg-gray-600 transition-colors text-sm"
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