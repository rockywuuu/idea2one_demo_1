'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function DiscoverPage() {
  const router = useRouter();
  const { currentUser, quizResult } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col h-full">
      <div className="bg-white px-4 py-6 shadow-sm mb-4">
        <h1 className="text-2xl font-bold">哈囉，{currentUser?.nickname || '酒友'}！</h1>
        <p className="text-gray-500 text-sm">今晚想來點什麼？</p>
      </div>

      <div className="px-4 space-y-6 flex-1">

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">找酒組合</h2>
        <Card className="bg-indigo-50 border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-100">不知道喝什麼？</h3>
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              透過簡單的 7 個問題，幫你找出今晚最適合你的那一杯。
            </p>
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
              onClick={() => router.push('/quiz')}
            >
              開始心理測驗
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold">探索酒款庫</h3>
              <p className="text-sm text-gray-500">瀏覽 100+ 精選酒款</p>
            </div>
            <Button variant="outline" onClick={() => router.push('/beverages')}>
              去逛逛
            </Button>
          </CardContent>
        </Card>
      </section>

      {quizResult && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">最近推薦</h2>
          <Card>
            <CardContent className="p-5 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                你上次的測驗結果偏好： {quizResult.preferredCategory === 'beer' ? '精釀啤酒' : quizResult.preferredCategory === 'cocktail' ? '調酒' : '葡萄酒'}
              </p>
              <Button variant="secondary" className="w-full" onClick={() => router.push('/recommendations')}>
                查看上次推薦結果
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* 找酒友預留入口，Week 4 實作 */}
      <section className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold">找酒友</h2>
        <Card className="opacity-80">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-bold">今晚不想一個人喝？</h3>
            <p className="text-sm text-gray-500">尋找附近同樣想喝一杯的酒友。</p>
            <Button variant="outline" className="w-full" onClick={() => router.push('/buddies')}>
              尋找附近酒友
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  </div>
  );
}
