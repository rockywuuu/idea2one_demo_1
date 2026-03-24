'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AgeGatePage() {
  const router = useRouter();
  const { setAgeGateAccepted } = useAppStore();
  const [isChecked, setIsChecked] = useState(false);

  const handleEnter = () => {
    if (isChecked) {
      setAgeGateAccepted(true);
      router.push('/register'); // the AuthGuard will handle if user is already registered and redirect to discover
    }
  };

  const handleLeave = () => {
    router.push('/denied');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">CheersBuddy</h1>
          <p className="text-sm text-gray-500">本 App 僅限 18 歲以上使用</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg text-sm text-gray-700 leading-relaxed">
          依台灣法規：兒童及少年不得飲酒，且任何人不得供應酒品予兒童及少年。本平台禁止鼓勵未成年人飲酒或過量飲酒。
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="age-check"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <label htmlFor="age-check" className="text-sm font-medium text-gray-700">
            我已滿 18 歲
          </label>
        </div>

        <div className="space-y-3 pt-2">
          <Button 
            fullWidth 
            onClick={handleEnter} 
            disabled={!isChecked}
          >
            進入 App
          </Button>
          <Button 
            fullWidth 
            variant="secondary" 
            onClick={handleLeave}
          >
            離開
          </Button>
        </div>
      </Card>
    </div>
  );
}
