'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SafetyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10 flex items-center">
        <button onClick={() => router.back()} className="text-gray-500 mr-4">
          ← 返回
        </button>
        <h1 className="text-xl font-bold text-gray-900">安全與責任提醒</h1>
      </div>

      <div className="p-6 space-y-6">
        <Card className="border-l-4 border-l-red-500">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
            <span className="mr-2">🔞</span> 未成年請勿飲酒
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            依據臺灣法規，兒童及少年不得飲酒，且任何人不得供應酒品予兒童及少年。本服務嚴禁 18 歲以下使用者使用。
          </p>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
            <span className="mr-2">🤝</span> 初次見面安全須知
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>請務必約在<strong>公共場所</strong>（如酒吧、餐廳），切勿在私人場所會面。</li>
            <li>出發前請<strong>告知親友</strong>您的去向與預計返家時間。</li>
            <li>不要輕易透露個人敏感資訊，如住家地址或財務資料。</li>
            <li>若感到任何不適或不對勁，請立刻離開現場，並尋求協助。</li>
          </ul>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
            <span className="mr-2">🍷</span> 適量飲酒，理性享受
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>我們鼓勵您品味酒的風味，而非追求醉酒。</li>
            <li>請隨時注意自己的酒量，適時補充水分。</li>
            <li><strong>酒後不開車，安全有保障。</strong>請多加利用大眾運輸或代駕服務。</li>
            <li>請勿勉強他人拼酒或過量飲酒。</li>
          </ul>
        </Card>
        
        <div className="pt-4 text-center">
          <p className="text-xs text-gray-400 mb-4">
            [Prototype 標示]<br/>此為 UIUX 雛形展示範圍，無真實配對、檢舉或封鎖機制。正式上線時將具備完整安全中心查核管道。
          </p>
          <Button variant="secondary" onClick={() => router.back()}>
            我了解了，回上一頁
          </Button>
        </div>
      </div>
    </div>
  );
}
