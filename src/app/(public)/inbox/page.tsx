'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockUsers, User } from '@/mocks/users';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BottomNav } from '@/components/nav/BottomNav';

type Tab = 'received' | 'sent';

export default function InboxPage() {
  const router = useRouter();
  const { currentUser, registeredUsers, invites, updateInviteStatus } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('received');
  
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

  const allUsersMap = new Map<string, User>();
  mockUsers.forEach(u => allUsersMap.set(u.user_id, u));
  registeredUsers.forEach(u => allUsersMap.set(u.user_id, u));

  // Filter invites
  const receivedInvites = invites.filter(i => i.to_user_id === currentUser.user_id)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  
  const sentInvites = invites.filter(i => i.from_user_id === currentUser.user_id)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const handleAccept = (inviteId: string) => {
    updateInviteStatus(inviteId, 'accepted');
    router.push(`/match/${inviteId}`);
  };

  const handleReject = (inviteId: string) => {
    updateInviteStatus(inviteId, 'rejected');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待回覆';
      case 'accepted': return '已接受';
      case 'rejected': return '已拒絕';
      case 'expired': return '已過期';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentList = activeTab === 'received' ? receivedInvites : sentInvites;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 text-center">邀請匣</h1>
      </div>

      {/* Segmented Control */}
      <div className="p-4">
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'received' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('received')}
          >
            我收到的
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'sent' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('sent')}
          >
            我送出的
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {currentList.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            目前沒有{activeTab === 'received' ? '收到' : '送出'}的邀請
          </div>
        ) : (
          currentList.map(invite => {
            const targetUserId = activeTab === 'received' ? invite.from_user_id : invite.to_user_id;
            const targetUser = allUsersMap.get(targetUserId);
            
            if (!targetUser) return null; // Safe guard

            return (
              <Card key={invite.invite_id} className="p-4">
                <div 
                  className="flex items-center space-x-4 mb-4 cursor-pointer"
                  onClick={() => router.push(`/buddies/${targetUser.user_id}`)}
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl">
                    🧑
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{targetUser.nickname}</h3>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(invite.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(invite.status)}`}>
                      {getStatusText(invite.status)}
                    </span>
                  </div>
                </div>

                {activeTab === 'received' && invite.status === 'pending' && (
                  <div className="flex space-x-3 mt-4 border-t pt-4">
                    <Button 
                      variant="secondary" 
                      className="flex-1 py-2 text-sm"
                      onClick={() => handleReject(invite.invite_id)}
                    >
                      拒絕
                    </Button>
                    <Button 
                      variant="primary" 
                      className="flex-1 py-2 text-sm"
                      onClick={() => handleAccept(invite.invite_id)}
                    >
                      接受
                    </Button>
                  </div>
                )}
                
                {activeTab === 'sent' && invite.status === 'accepted' && (
                  <div className="mt-4 border-t pt-4">
                    <Button 
                      variant="primary" 
                      className="w-full py-2 text-sm"
                      onClick={() => router.push(`/match/${invite.invite_id}`)}
                    >
                      查看配對結果
                    </Button>
                  </div>
                )}
                
                {activeTab === 'received' && invite.status === 'accepted' && (
                  <div className="mt-4 border-t pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full py-2 text-sm"
                      onClick={() => router.push(`/match/${invite.invite_id}`)}
                    >
                      查看配對結果
                    </Button>
                  </div>
                )}

              </Card>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
}
