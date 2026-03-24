'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockBeverages } from '@/mocks/beverages';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function RecommendationsPage() {
  const router = useRouter();
  const quizResult = useAppStore((state) => state.quizResult);
  
  const recommendations = useMemo(() => {
    if (!quizResult) return [];
    const preferredCategory = quizResult.preferredCategory || 'beer';
    const categoryMatches = mockBeverages.filter(b => b.category === preferredCategory);
    return categoryMatches.slice(0, 3);
  }, [quizResult]);

  if (!quizResult) {
    return (
      <div className="p-6 pt-16 text-center space-y-4">
        <h2 className="text-xl font-bold">尚無測驗結果</h2>
        <p className="text-gray-500">請先完成心理測驗，讓我們為您推薦最適合的酒款！</p>
        <Button onClick={() => router.push('/quiz')} className="mt-4">
          前往測驗
        </Button>
      </div>
    );
  }

  const categoryName = quizResult.preferredCategory === 'beer' ? '精釀啤酒' : 
                       quizResult.preferredCategory === 'cocktail' ? '調酒' : '葡萄酒';

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col h-full">
      <div className="bg-white px-4 py-8 shadow-sm mb-4">
        <h1 className="text-2xl font-bold">為您推薦的 Top 3</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          根據測驗結果，您的偏好傾向於 <span className="font-bold text-indigo-600 dark:text-indigo-400">{categoryName}</span>。
          以下是為您精選的酒款：
        </p>
      </div>

      <div className="px-4 space-y-4 flex-1">

      <div className="space-y-4">
        {recommendations.map((beverage) => (
          <Card key={beverage.beverage_id} className="overflow-hidden hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => router.push(`/beverages/${beverage.beverage_id}`)}>
            <CardContent className="p-4 flex gap-4">
              <div className="w-20 h-24 bg-gray-100 dark:bg-gray-800 rounded-md flex-shrink-0 flex justify-center items-center text-3xl">
                {beverage.category === 'beer' ? '🍺' : beverage.category === 'wine' ? '🍷' : '🍸'}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg leading-tight">{beverage.name_zh}</h3>
                  <span className="text-sm font-semibold px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300">
                    ABV {beverage.abv_percent}%
                  </span>
                </div>
                
                {beverage.category === 'cocktail' && 'base_spirit' in beverage && (
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">基酒：{beverage.base_spirit}</p>
                )}
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {beverage.flavor_tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-6 space-y-3">
        <Button className="w-full" onClick={() => router.push('/beverages')}>
          逛逛更多酒款庫
        </Button>
        <Button variant="outline" className="w-full" onClick={() => router.push('/quiz')}>
          重新測驗
        </Button>
      </div>
      </div>
    </div>
  );
}
