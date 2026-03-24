'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockUsers, User } from '@/mocks/users';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BottomNav } from '@/components/nav/BottomNav';

export default function BuddiesPage() {
  const router = useRouter();
  const { currentUser, registeredUsers, locationPermission, setLocationPermission } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push('/age-gate'); // Redirect if not logged in
    }
  }, [currentUser, router]);

  if (!mounted || !currentUser) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  // Combine mockUsers and registeredUsers, deduplicate, filter out current user
  const allUsersMap = new Map<string, User>();
  mockUsers.forEach(u => allUsersMap.set(u.user_id, u));
  registeredUsers.forEach(u => allUsersMap.set(u.user_id, u));
  allUsersMap.delete(currentUser.user_id);
  const otherBuddies = Array.from(allUsersMap.values());

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">附近酒友</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {locationPermission === 'prompt' && (
          <Card className="border-indigo-100 bg-indigo-50 mb-6">
            <h2 className="font-semibold text-indigo-900 mb-2">允許存取位置資訊？</h2>
            <p className="text-sm text-indigo-700 mb-4">
              我們需要位置資訊來顯示您與附近酒友的距離。
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="primary" 
                className="flex-1 py-2 text-sm"
                onClick={() => setLocationPermission('granted')}
              >
                允許
              </Button>
              <Button 
                variant="secondary" 
                className="flex-1 py-2 text-sm"
                onClick={() => setLocationPermission('denied')}
              >
                暫不提示
              </Button>
            </div>
          </Card>
        )}

        {otherBuddies.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            目前附近沒有其他酒友
          </div>
        ) : (
          <div className="grid gap-4">
            {otherBuddies.map(buddy => {
              const distance = locationPermission === 'granted' 
                ? `${buddy.location_mock.distance_to_me_km} km` 
                : '未知距離';
              
              const catIcons = buddy.preferred_categories.map(cat => {
                if(cat === 'beer') return '🍺';
                if(cat === 'cocktail') return '🍸';
                if(cat === 'wine') return '🍷';
                return '';
              }).join(' ');

              const statusText = buddy.availability_tonight === 'available' ? '可喝' :
                                 buddy.availability_tonight === 'maybe' ? '想找酒' : '休息中';
              
              const statusColor = buddy.availability_tonight === 'available' ? 'bg-green-100 text-green-800' :
                                  buddy.availability_tonight === 'maybe' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600';

              return (
                <Card 
                  key={buddy.user_id} 
                  className="p-4 cursor-pointer hover:border-indigo-300 transition-colors"
                  onClick={() => router.push(`/buddies/${buddy.user_id}`)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl">
                      🧑
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{buddy.nickname}</h3>
                        <span className="text-xs text-gray-500">{distance}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm">{catIcons}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
                          {statusText}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
