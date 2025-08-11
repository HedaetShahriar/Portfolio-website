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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-300">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden glass-effect mx-4 rounded-lg">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block py-3 px-4 text-gray-300 hover:bg-gray-700/50" onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          {/* Mobile Menu Login/Dashboard Button */}
          <div className="p-4">
            {session ? (
                <Link href="/admin/dashboard" className="block text-center w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Dashboard
                </Link>
            ) : (
                <Link href="/login" className="block text-center w-full bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    Login
                </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;