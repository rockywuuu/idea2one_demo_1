'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { User } from '@/mocks/users';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, registeredUsers } = useAppStore();

  const [form, setForm] = useState({
    nickname: '',
    preferred_category: '',
    abv_tolerance: '',
    mood_today: '',
  });

  const remainingSpots = 5 - registeredUsers.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (registeredUsers.length >= 5) {
      router.push('/full');
      return;
    }

    const newUser: User = {
      user_id: `U00${registeredUsers.length + 1}`,
      nickname: form.nickname,
      avatar_id: `avatar${Math.floor(Math.random() * 5) + 1}`,
      preferred_categories: [form.preferred_category as 'beer' | 'cocktail' | 'wine'],
      abv_tolerance: form.abv_tolerance as 'low' | 'medium' | 'high',
      mood_today: form.mood_today,
      availability_tonight: 'available', // mock default
      location_mock: { district: '未知區', distance_to_me_km: 0 } // mock default
    };

    registerUser(newUser);
    router.push('/discover');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold">建立個人資料</h1>
          <p className="text-sm text-gray-500 mt-1">剩餘名額：{remainingSpots}/5</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            required
            label="暱稱" 
            placeholder="請輸入暱稱"
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          />
          
          <Select
            required
            label="喜歡的酒類"
            value={form.preferred_category}
            onChange={(e) => setForm({ ...form, preferred_category: e.target.value })}
            options={[
              { value: 'beer', label: '精釀啤酒' },
              { value: 'cocktail', label: '調酒' },
              { value: 'wine', label: '葡萄酒' },
            ]}
          />

          <Select
            required
            label="可接受烈度"
            value={form.abv_tolerance}
            onChange={(e) => setForm({ ...form, abv_tolerance: e.target.value })}
            options={[
              { value: 'low', label: '低 (輕鬆喝)' },
              { value: 'medium', label: '中 (微醺)' },
              { value: 'high', label: '高 (想喝醉)' },
            ]}
          />

          <Select
            required
            label="今晚狀態"
            value={form.mood_today}
            onChange={(e) => setForm({ ...form, mood_today: e.target.value })}
            options={[
              { value: 'chill', label: '想找人喝' },
              { value: 'lonely', label: '只想自己喝但想找酒' },
              { value: 'not', label: '不確定' },
            ]}
          />

          <Button type="submit" fullWidth className="mt-6">
            完成登記
          </Button>
        </form>
      </Card>
    </div>
  );
}
