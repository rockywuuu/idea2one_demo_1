'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockUsers, User } from '@/mocks/users';
import { mockBeverages } from '@/mocks/beverages';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function MatchSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const inviteId = params.id as string;
  
  const { currentUser, registeredUsers, invites } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push('/age-gate');
    }
  }, [currentUser, router]);

  if (!mounted || !currentUser) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  // Find the invite
  const invite = invites.find(i => i.invite_id === inviteId);

  if (!invite || invite.status !== 'accepted') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold mb-4">找不到該配對或尚未配對成功</h1>
        <Button onClick={() => router.push('/inbox')}>回邀請匣</Button>
      </div>
    );
  }

  const allUsersMap = new Map<string, User>();
  mockUsers.forEach(u => allUsersMap.set(u.user_id, u));
  registeredUsers.forEach(u => allUsersMap.set(u.user_id, u));

  // Determine partner ID
  const partnerId = invite.from_user_id === currentUser.user_id ? invite.to_user_id : invite.from_user_id;
  const partner = allUsersMap.get(partnerId);

  if (!partner) return null;

  // Simple mock matching algorithm: Find 2 drinks that match ANY of their joint preferred categories
  const jointCats = Array.from(new Set([...currentUser.preferred_categories, ...partner.preferred_categories]));
  const matchedDrinks = mockBeverages
    .filter(b => jointCats.includes(b.category))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 text-center">🎉 配對成功！</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-indigo-600 text-white rounded-2xl p-6 text-center shadow-lg">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
              🧑
            </div>
            <div className="text-2xl font-bold">❤️</div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
              👱
            </div>
          </div>
          <h2 className="text-xl font-bold">你與 {partner.nickname} 已配對成功</h2>
          <p className="opacity-90 mt-2 text-sm">現在就聯絡對方，今晚一起喝一杯吧！</p>
        </div>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">聯絡方式 (Mock)</h3>
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">📱</span>
            <span className="text-gray-700">Line ID: <span className="font-mono bg-gray-100 px-2 rounded">@mock_line_123</span></span>
          </div>
          <p className="text-xs text-gray-500 mt-4 bg-yellow-50 p-2 rounded">
            ⚠️ 提醒：這只是示範資料。在真實產品中請小心保護您的個人聯繫方式。建議先在公開場合見面。
            <button onClick={() => router.push('/safety')} className="text-indigo-600 underline ml-1">查看安全提醒</button>
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">你們的交集推薦</h3>
          <div className="space-y-4">
            {matchedDrinks.map(drink => (
              <div 
                key={drink.beverage_id}
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => router.push(`/beverages/${drink.beverage_id}`)}
              >
                <div>
                  <h4 className="font-semibold">{drink.name_zh}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {drink.category === 'beer' ? '🍺 精釀啤酒' : drink.category === 'cocktail' ? '🍸 調酒' : '🍷 葡萄酒'}
                    ・{drink.abv_percent}% ABV
                  </p>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col space-y-3 pt-4">
          <Button 
            className="w-full py-3 shadow"
            onClick={() => router.push('/buddies')}
          >
            回找酒友列表
          </Button>
          <Button 
            variant="outline"
            className="w-full py-3"
            onClick={() => router.push('/discover')}
          >
            回首頁去找酒
          </Button>
        </div>
      </div>
    </div>
  );
}
