'use client';

import { useAppStore } from '@/lib/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const AgeGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { ageGateAccepted } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Ignore routes that don't need age gate protection
    if (pathname === '/age-gate' || pathname === '/denied') return;
    if (pathname.startsWith('/staff')) return; // staff login handles its own auth

    if (!ageGateAccepted) {
      router.replace('/age-gate');
    }
  }, [mounted, ageGateAccepted, pathname, router]);

  if (!mounted) return null; // prevent hydration mismatch

  if (!ageGateAccepted && pathname !== '/age-gate' && pathname !== '/denied' && !pathname.startsWith('/staff')) {
    return null; // prevent render before redirect
  }

  return <>{children}</>;
};
