'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar } from './ui/Avatar';
import { logoutAction } from '@/app/actions/auth';
import { useState } from 'react';

interface NavbarProps {
  user: {
    name: string;
    email: string;
  };
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Certificates', href: '/dashboard/certificates' },
  ];

  return (
    <header className="bg-white border-b border-dark-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                SF
              </div>
              <span className="text-lg font-bold text-dark-900 hidden md:block">
                StartFriday<span className="font-light">Asia</span>
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-dark-600 hover:text-dark-900 hover:bg-dark-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-dark-900">{user.name}</p>
                <p className="text-xs text-dark-500">Intern</p>
              </div>
              <Avatar name={user.name} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-dark-100 py-1 z-50">
                <div className="px-4 py-2 border-b border-dark-100 sm:hidden">
                  <p className="text-sm font-medium text-dark-900">{user.name}</p>
                  <p className="text-xs text-dark-500">{user.email}</p>
                </div>
                <Link 
                  href="/dashboard/profile" 
                  className="block px-4 py-2 text-sm text-dark-700 hover:bg-dark-50"
                  onClick={() => setIsProfileOpen(false)}
                >
                  My Profile
                </Link>
                <form action={logoutAction}>
                  <button 
                    type="submit"
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
