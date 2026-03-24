import { notFound } from 'next/navigation';
import { mockBeverages } from '@/mocks/beverages';
import Link from 'next/link';

export default function BeverageDetailPage({ params }: { params: { id: string } }) {
  const beverage = mockBeverages.find(b => b.beverage_id === params.id);

  if (!beverage) {
    notFound();
  }

  // Next.js App Router Server Component behavior
  return (
    <div className="p-4 pt-8 pb-32 space-y-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center text-sm mb-4">
        <Link href="/beverages" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
          &larr; 返回酒款庫
        </Link>
        <span className="text-gray-500 capitalize">{beverage.category}</span>
      </div>

      <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-8xl mb-6 shadow-inner">
        {beverage.category === 'beer' ? '🍺' : beverage.category === 'wine' ? '🍷' : '🍸'}
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{beverage.name_zh}</h1>
        {beverage.name_en && <h2 className="text-lg text-gray-500 font-serif">{beverage.name_en}</h2>}
      </div>

      <div className="flex items-center gap-3">
        <div className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 font-bold rounded-lg truncate whitespace-nowrap">
          ABV {beverage.abv_percent}%
        </div>
        <div className="text-sm text-gray-500">
          {beverage.abv_percent < 6 ? '微醺低烈度' : beverage.abv_percent < 12 ? '適中烈度' : '偏烈高酒精'}
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg my-4">
        {beverage.description_short}
      </p>

      <section className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-lg">風味標籤</h3>
        <div className="flex flex-wrap gap-2">
          {beverage.flavor_tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Category Specific Sections */}
      {beverage.category === 'beer' && 'beer_style' in beverage && (
        <section className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-lg">啤酒資訊</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mt-3">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">類型</span>
              <span className="font-medium">{beverage.beer_style}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">苦度</span>
              <span className="font-medium">{'★'.repeat(beverage.bitterness_level)}{'☆'.repeat(5 - beverage.bitterness_level)}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">酒體</span>
              <span className="font-medium">{'★'.repeat(beverage.body_level)}{'☆'.repeat(5 - beverage.body_level)}</span>
            </div>
          </div>
        </section>
      )}

      {beverage.category === 'cocktail' && 'base_spirit' in beverage && (
        <section className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-lg">調酒資訊</h3>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl space-y-1 mb-4">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold block mb-1">主要基酒</span>
            <span className="text-xl capitalize">{beverage.base_spirit}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mt-3">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">甜度</span>
              <span className="font-medium">{'★'.repeat(beverage.sweetness_level)}{'☆'.repeat(5 - beverage.sweetness_level)}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">酸度</span>
              <span className="font-medium">{'★'.repeat(beverage.sour_level)}{'☆'.repeat(5 - beverage.sour_level)}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <h4 className="font-medium text-sm text-gray-500 mb-2">主要成分</h4>
            <div className="flex gap-2">
              {beverage.ingredients_top3.map(ing => (
                <span key={ing} className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {beverage.category === 'wine' && 'wine_type' in beverage && (
        <section className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-lg">葡萄酒資訊</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mt-3">
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">類型</span>
              <span className="font-medium capitalize">{beverage.wine_type}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">酸度</span>
              <span className="font-medium">{'★'.repeat(beverage.acidity_level)}{'☆'.repeat(5 - beverage.acidity_level)}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">甜度</span>
              <span className="font-medium">{'★'.repeat(beverage.sweetness_level)}{'☆'.repeat(5 - beverage.sweetness_level)}</span>
            </div>
            {beverage.tannin_level !== undefined && (
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                <span className="text-gray-500 block mb-1">單寧</span>
                <span className="font-medium">{'★'.repeat(beverage.tannin_level)}{'☆'.repeat(5 - beverage.tannin_level)}</span>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="pt-8 w-full sticky bottom-24 bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black pb-4 z-10 px-1">
        <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-colors">
          加入收藏 (Demo)
        </button>
      </div>

    </div>
  );
}
