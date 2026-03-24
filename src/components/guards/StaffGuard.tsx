'use client';

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const StaffGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { staffAuthenticated } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!staffAuthenticated) {
      router.replace('/staff/login');
    }
  }, [mounted, staffAuthenticated, router]);

  if (!mounted || !staffAuthenticated) {
    return null; // Don't render anything until authenticated
  }

  return <>{children}</>;
};
