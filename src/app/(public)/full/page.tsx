'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function FullPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <h1 className="text-xl font-bold">名額已滿</h1>
          <p className="text-sm text-gray-500">
            本次 prototype 僅開放 5 位測試，目前名額已滿。感謝您的參與！
          </p>
        </div>
        <Button fullWidth onClick={() => router.push('/age-gate')}>
          返回首頁
        </Button>
      </Card>
    </div>
  );
}
