'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function StaffLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const { setStaffAuthenticated } = useAppStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0123') {
      setStaffAuthenticated(true);
      router.replace('/staff/dashboard');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl mb-4">
            🔒
          </div>
          <h1 className="text-2xl font-bold">工作人員入口</h1>
          <p className="text-gray-500 text-sm mt-2 text-center">請輸入通關密語</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="密語"
              className={`w-full p-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl tracking-widest ${
                error ? 'border-red-500 bg-red-50' : 'border-gray-200'
              }`}
              maxLength={4}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">密碼錯誤，請重試</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            登入 Dashboard
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          * This is a prototype demo *
        </p>
      </div>
    </div>
  );
}
