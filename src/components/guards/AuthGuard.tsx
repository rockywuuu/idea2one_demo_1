'use client';

import { useAppStore } from '@/lib/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, registeredUsers } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Routes that don't need auth checking
    if (
      pathname === '/age-gate' || 
      pathname === '/denied' || 
      pathname === '/register' || 
      pathname === '/full' ||
      pathname.startsWith('/staff')
    ) {
      // If user is already registered and tries to go to register/age-gate
      if (currentUser && (pathname === '/register' || pathname === '/age-gate')) {
        router.replace('/discover');
      }
      return; 
    }

    if (!currentUser) {
      if (registeredUsers.length >= 5) {
        router.replace('/full');
      } else {
        router.replace('/register');
      }
    }
  }, [mounted, currentUser, pathname, router, registeredUsers.length]);

  if (!mounted) return null; // hydration mismatch avoidance

  if (!currentUser && 
      pathname !== '/age-gate' && 
      pathname !== '/denied' && 
      pathname !== '/register' && 
      pathname !== '/full' && 
      !pathname.startsWith('/staff')) {
    return null; // prevent render before redirect
  }

  return <>{children}</>;
};
