'use client';

import { StaffGuard } from '@/components/guards/StaffGuard';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function StaffDashboardPage() {
  const { registeredUsers, invites, setStaffAuthenticated } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    setStaffAuthenticated(false);
    router.replace('/staff/login');
  };

  const pendingInvites = invites.filter(i => i.status === 'pending');
  const acceptedInvites = invites.filter(i => i.status === 'accepted');

  return (
    <StaffGuard>
      <div className="min-h-screen bg-gray-50 pb-safe">
        <header className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold">工作人員 Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 transition"
            aria-label="登出"
          >
            <span className="text-xl">🚪</span>
          </button>
        </header>

        <div className="p-4 space-y-6">
          {/* KPI Section */}
          <section className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
              <div className="text-2xl mb-2">👥</div>
              <p className="text-2xl font-bold">{registeredUsers.length}<span className="text-sm font-normal text-gray-400">/5</span></p>
              <p className="text-xs text-gray-500">已登記</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
              <div className="text-2xl mb-2">📬</div>
              <p className="text-2xl font-bold">{pendingInvites.length}</p>
              <p className="text-xs text-gray-500">待回覆</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
              <div className="text-2xl mb-2">✅</div>
              <p className="text-2xl font-bold">{acceptedInvites.length}</p>
              <p className="text-xs text-gray-500">配對成功</p>
            </div>
          </section>

          {/* Users List */}
          <section className="space-y-3">
            <h2 className="font-bold text-gray-700 flex items-center gap-2">
              使用者列表 <span className="text-xs font-normal bg-gray-200 px-2 py-0.5 rounded-full">{registeredUsers.length}</span>
            </h2>
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {registeredUsers.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">尚無使用者</div>
              ) : (
                registeredUsers.map(user => (
                  <div key={user.user_id} className="p-3 flex items-center gap-3">
                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
                      {user.nickname.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{user.nickname}</p>
                      <p className="text-xs text-gray-500 truncate">{user.user_id} | {user.preferred_categories.join(',')}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Matches List */}
          <section className="space-y-3">
            <h2 className="font-bold text-gray-700 flex items-center gap-2">
              配對成功清單 <span className="text-xs font-normal bg-gray-200 px-2 py-0.5 rounded-full">{acceptedInvites.length}</span>
            </h2>
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {acceptedInvites.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">尚無成功紀錄</div>
              ) : (
                acceptedInvites.map(invite => {
                  const fromU = registeredUsers.find(u => u.user_id === invite.from_user_id);
                  const toU = registeredUsers.find(u => u.user_id === invite.to_user_id);
                  return (
                    <div key={invite.invite_id} className="p-3 text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-green-600">已配對</span>
                        <span className="text-xs text-gray-400">{new Date(invite.updated_at).toLocaleTimeString()}</span>
                      </div>
                      <p>{fromU?.nickname || invite.from_user_id} 🤝 {toU?.nickname || invite.to_user_id}</p>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Pending Invites */}
          <section className="space-y-3">
            <h2 className="font-bold text-gray-700 flex items-center gap-2">
              待回覆邀請 <span className="text-xs font-normal bg-gray-200 px-2 py-0.5 rounded-full">{pendingInvites.length}</span>
            </h2>
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {pendingInvites.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">尚無待處理邀請</div>
              ) : (
                pendingInvites.map(invite => {
                  const fromU = registeredUsers.find(u => u.user_id === invite.from_user_id);
                  const toU = registeredUsers.find(u => u.user_id === invite.to_user_id);
                  return (
                    <div key={invite.invite_id} className="p-3 text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-orange-600">等待中</span>
                        <span className="text-xs text-gray-400">{new Date(invite.created_at).toLocaleTimeString()}</span>
                      </div>
                      <p>{fromU?.nickname || invite.from_user_id} ➡️ {toU?.nickname || invite.to_user_id}</p>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </StaffGuard>
  );
}
