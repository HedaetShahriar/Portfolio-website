"use client";
import { useSession, signOut } from 'next-auth/react';
import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';

const Header = ({ onToggleSidebar }) => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    // Added sticky, top-0, and increased z-index to fix the header
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden text-gray-200 hover:text-white focus:outline-none"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="ml-auto flex items-center">
          <div className="relative">
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsDropdownOpen(prev => !prev)}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <span className="font-semibold">{session?.user?.name || 'Admin'}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => { setIsDropdownOpen(false); signOut({ callbackUrl: '/' }); }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700 hover:text-white rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="ml-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm hidden md:block"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
