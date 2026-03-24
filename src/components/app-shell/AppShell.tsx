'use client';

import { ReactNode, useEffect, useState } from 'react';
import { BottomNav } from '../nav/BottomNav';
import { AgeGuard } from '../guards/AgeGuard';
import { AuthGuard } from '../guards/AuthGuard';

export const AppShell = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  return (
    <AgeGuard>
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
          {mounted ? (
            <main className="flex-1 overflow-y-auto pb-20 relative z-0">
              {children}
            </main>
          ) : (
            <main className="flex-1" /> /* blank placeholder to avoid mismatch */
          )}
          {mounted && <BottomNav />}
        </div>
      </AuthGuard>
    </AgeGuard>
  );
};
