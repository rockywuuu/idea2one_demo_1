'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function DeniedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl">
            🚫
          </div>
          <h1 className="text-xl font-bold">無法進入</h1>
          <p className="text-sm text-gray-500">
            抱歉，依據法規限制，未成年不得飲酒與使用本服務。
          </p>
        </div>
        <Button fullWidth onClick={() => router.push('/age-gate')}>
          返回確認頁
        </Button>
      </Card>
    </div>
  );
}
