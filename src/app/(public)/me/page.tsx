'use client';

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MePage() {
  const { currentUser, clearState } = useAppStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const handleDemoReset = () => {
    if (window.confirm("這將清除所有測試資料（包含使用者與配對紀錄），是否確認？")) {
      clearState();
      router.replace("/age-gate");
    }
  };

  if (!mounted || !currentUser) return <div className="p-6">載入中...</div>;

  return (
    <div className="flex flex-col min-h-full pb-20">
      <div className="bg-white p-6 shadow-sm mb-4">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          👤 我的主頁
        </h1>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
            {currentUser.nickname.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{currentUser.nickname}</h2>
            <p className="text-gray-500 text-sm">目前的偏好設定</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-2 flex flex-col gap-2">
        <div className="bg-white p-4 shadow-sm border-y border-gray-100 space-y-3">
          <h3 className="font-bold border-b pb-2">偏好摘要</h3>
          <p className="text-sm"><span className="text-gray-500 w-24 inline-block">喜歡的酒類：</span>{currentUser.preferred_categories.join(', ')}</p>
          <p className="text-sm"><span className="text-gray-500 w-24 inline-block">可接受烈度：</span>{currentUser.abv_tolerance === 'low' ? '低' : currentUser.abv_tolerance === 'medium' ? '中' : '高'}</p>
          <p className="text-sm"><span className="text-gray-500 w-24 inline-block">今晚狀態：</span>{currentUser.availability_tonight === 'available' ? '想找人喝' : currentUser.availability_tonight === 'maybe' ? '只想自己喝但想找酒' : '不確定'}</p>
        </div>

        <div className="bg-white shadow-sm border-y border-gray-100 overflow-hidden">
          <Link href="/safety" className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b">
            <span className="text-xl">🛡️</span>
            <span className="flex-1 font-medium">安全提醒與社群規範</span>
          </Link>
          <button 
            onClick={handleDemoReset}
            className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors text-red-600"
          >
            <span className="text-xl">🚪</span>
            <span className="flex-1 text-left font-medium">Demo Reset (清除所有資料)</span>
          </button>
        </div>
      </div>

      <div className="p-6 text-center mt-auto">
        <Link 
          href="/staff/login" 
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          工作人員入口
        </Link>
        <p className="text-xs text-gray-300 mt-2">v1.0.0-demo - This is a prototype demo</p>
      </div>
    </div>
  );
}
