'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockUsers, User } from '@/mocks/users';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function BuddyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const buddyId = params.id as string;
  
  const { currentUser, registeredUsers, createInvite, invites } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  // Find the buddy
  const allUsersMap = new Map<string, User>();
  mockUsers.forEach(u => allUsersMap.set(u.user_id, u));
  registeredUsers.forEach(u => allUsersMap.set(u.user_id, u));
  const buddy = allUsersMap.get(buddyId);

  if (!buddy) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold mb-4">找不到該酒友</h1>
        <Button onClick={() => router.back()}>返回列表</Button>
      </div>
    );
  }

  const existingInvite = invites.find(
    i => i.from_user_id === currentUser.user_id &&
         i.to_user_id === buddyId &&
         i.status === 'pending'
  );

  const handleSendInvite = () => {
    createInvite(buddyId);
    setShowConfirmModal(false);
    // Note: Instead of routing immediately, wait for user to go manually or show toast. Let's redirect to inbox.
    router.push('/inbox');
  };

  const getCategoryName = (cat: string) => {
    if (cat === 'beer') return '精釀啤酒 🍺';
    if (cat === 'cocktail') return '調酒 🍸';
    if (cat === 'wine') return '葡萄酒 🍷';
    return cat;
  };

  const statusText = buddy.availability_tonight === 'available' ? '今晚可喝' :
                     buddy.availability_tonight === 'maybe' ? '只想自己喝但想找酒' : '休息中';

  const tolerance = buddy.abv_tolerance === 'low' ? '低' :
                    buddy.abv_tolerance === 'medium' ? '中' : '高';

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10 flex items-center">
        <button onClick={() => router.back()} className="text-gray-500 mr-4">
          ← 返回
        </button>
        <h1 className="text-xl font-bold text-gray-900">酒友檔案</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl mb-4">
            🧑
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{buddy.nickname}</h2>
          <p className="text-gray-500 mt-1">{statusText}</p>
        </div>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">偏好設定</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">喜歡的酒類</p>
              <div className="flex flex-wrap gap-2">
                {buddy.preferred_categories.map(cat => (
                  <span key={cat} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                    {getCategoryName(cat)}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">可接受烈度</p>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tolerance}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">今日心情</p>
              <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">
                {buddy.mood_today}
              </span>
            </div>
          </div>
        </Card>

        <div className="pt-4">
          <Button 
            className="w-full text-lg shadow-md" 
            onClick={() => setShowConfirmModal(true)}
            disabled={!!existingInvite}
          >
            {existingInvite ? '已送出邀請' : '🍷 送出喝酒邀請'}
          </Button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 overflow-hidden shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-center">確認邀請</h3>
            <p className="text-gray-700 text-center mb-2">你要邀請 <strong>{buddy.nickname}</strong> 一起喝酒嗎？</p>
            <p className="text-xs text-orange-600 text-center bg-orange-50 p-2 rounded mb-6">
              建議初次見面選擇公開場所，並告知親友。
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={() => setShowConfirmModal(false)}
              >
                取消
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSendInvite}
              >
                確認送出
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
