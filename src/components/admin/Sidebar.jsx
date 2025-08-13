"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, PenSquare, Sparkles, GraduationCap, Briefcase, User, X } from 'lucide-react';
import { useEffect } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/projects", label: "Projects", icon: FileText },
    { href: "/admin/blogs", label: "Blogs", icon: PenSquare },
    { href: "/admin/skills", label: "Skills", icon: Sparkles },
    { href: "/admin/education", label: "Education", icon: GraduationCap },
    { href: "/admin/experience", label: "Experience", icon: Briefcase },
    { href: "/admin/profile", label: "Profile", icon: User },
  ];

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Handle tab for focus trapping in the sidebar
      if (e.key === 'Tab') {
        const sidebarElement = document.getElementById('admin-sidebar');
        if (!sidebarElement) return;
        
        const focusableElements = sidebarElement.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="admin-sidebar"
        className={`fixed top-0 left-0 h-full w-64 md:w-64 bg-gray-800 p-6 z-20 md:static md:z-10 md:h-screen transition-all duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:flex md:flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <button 
            className="text-gray-400 hover:text-white md:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => {
                  // On mobile, close the sidebar after clicking a link
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
