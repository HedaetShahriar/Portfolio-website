"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, PenSquare, Sparkles, GraduationCap, Briefcase, User } from 'lucide-react';

const Sidebar = () => {
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

  return (
    // Added sticky, top-0, and h-screen to fix the sidebar
    <aside className="w-64 bg-gray-800 p-6 hidden md:flex flex-col sticky top-0 h-screen">
      <h2 className="text-2xl font-bold text-white mb-10">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href}
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
  );
};

export default Sidebar;
