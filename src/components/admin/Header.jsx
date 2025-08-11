"use client";
import { useSession, signOut } from 'next-auth/react';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const { data: session } = useSession();

  return (
    // Added sticky, top-0, and z-10 to fix the header
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-end items-center">
        <div className="relative">
          <button className="flex items-center space-x-2">
            <span className="font-semibold">{session?.user?.name || 'Admin'}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {/* Dropdown can be added here */}
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="ml-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
