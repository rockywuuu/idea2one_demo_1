'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav = () => {
  const pathname = usePathname();

  // Hide nav on certain pages
  const hiddenRoutes = ['/age-gate', '/denied', '/register', '/full'];
  if (hiddenRoutes.includes(pathname) || pathname.startsWith('/staff')) {
    return null;
  }

  const navItems = [
    { label: '找酒', path: '/discover', icon: '🍷' },
    { label: '找酒友', path: '/buddies', icon: '🤝' },
    { label: '邀請', path: '/inbox', icon: '📬' },
    { label: '我的', path: '/me', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
