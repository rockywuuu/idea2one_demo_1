'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { mockBeverages, BeverageCategory } from '@/mocks/beverages';
import { Card, CardContent } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';

type AbvFilter = 'all' | 'low' | 'medium' | 'high';

export default function BeveragesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BeverageCategory>('beer');
  const [abvFilter, setAbvFilter] = useState<AbvFilter>('all');
  const [flavorFilter, setFlavorFilter] = useState<string>('all');

  const filteredBeverages = useMemo(() => {
    return mockBeverages.filter(b => {
      // Category filter
      if (b.category !== activeTab) return false;

      // ABV filter
      if (abvFilter === 'low' && b.abv_percent >= 6) return false;
      if (abvFilter === 'medium' && (b.abv_percent < 6 || b.abv_percent >= 12)) return false;
      if (abvFilter === 'high' && b.abv_percent < 12) return false;

      // Flavor filter
      if (flavorFilter !== 'all' && !b.flavor_tags.includes(flavorFilter)) return false;

      return true;
    });
  }, [activeTab, abvFilter, flavorFilter]);

  // Extract unique flavors for the current category
  const availableFlavors = useMemo(() => {
    const flavors = new Set<string>();
    mockBeverages
      .filter(b => b.category === activeTab)
      .forEach(b => b.flavor_tags.forEach(f => flavors.add(f)));
    return Array.from(flavors);
  }, [activeTab]);

  const handleTabChange = (tab: BeverageCategory) => {
    setActiveTab(tab);
    setFlavorFilter('all'); // reset flavor filter when changing category
  };

  return (
    <div className="p-4 pt-8 pb-32 space-y-6 flex flex-col h-full min-h-screen">
      <header className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">酒款庫</h1>
          <p className="text-sm text-gray-500">探索豐富的精釀啤酒、調酒與葡萄酒</p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {(['beer', 'cocktail', 'wine'] as BeverageCategory[]).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab 
                  ? 'bg-white text-indigo-700 shadow-sm dark:bg-gray-700 dark:text-indigo-300' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'beer' ? '精釀啤酒' : tab === 'cocktail' ? '調酒' : '葡萄酒'}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Select 
            value={abvFilter} 
            onChange={(e) => setAbvFilter(e.target.value as AbvFilter)}
            className="flex-1"
            options={[
              { value: 'all', label: '所有烈度' },
              { value: 'low', label: '微醺 (低烈度)' },
              { value: 'medium', label: '適中 (中烈度)' },
              { value: 'high', label: '偏烈 (高烈度)' },
            ]}
          />

          <Select 
            value={flavorFilter} 
            onChange={(e) => setFlavorFilter(e.target.value)}
            className="flex-1"
            options={[
              { value: 'all', label: '所有風味' },
              ...availableFlavors.map(f => ({ value: f, label: f }))
            ]}
          />
        </div>
      </header>

      <div className="flex-1 space-y-4">
        <p className="text-sm text-gray-500">找到 {filteredBeverages.length} 款酒</p>
        
        {filteredBeverages.length === 0 ? (
          <div className="py-12 text-center text-gray-500 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-800">
            找不到符合條件的酒款
            <br />
            請嘗試調整篩選條件
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBeverages.map(beverage => (
              <Card 
                key={beverage.beverage_id} 
                className="overflow-hidden cursor-pointer hover:border-indigo-300 transition-colors"
                onClick={() => router.push(`/beverages/${beverage.beverage_id}`)}
              >
                <CardContent className="p-4 flex gap-4">
                  <div className="w-20 h-24 bg-gray-100 dark:bg-gray-800 rounded-md flex-shrink-0 flex justify-center items-center text-3xl">
                    {beverage.category === 'beer' ? '🍺' : beverage.category === 'wine' ? '🍷' : '🍸'}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg leading-tight">{beverage.name_zh}</h3>
                      <span className="text-sm font-semibold px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        ABV {beverage.abv_percent}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{beverage.description_short}</p>
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
        )}
      </div>
    </div>
  );
}
