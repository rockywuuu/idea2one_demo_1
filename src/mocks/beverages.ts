export type BeverageCategory = 'beer' | 'cocktail' | 'wine';

export interface BaseBeverage {
  beverage_id: string;
  category: BeverageCategory;
  name_zh: string;
  name_en?: string;
  abv_percent: number;
  flavor_tags: string[];
  recommended_moods: string[];
  description_short: string;
}

export interface Beer extends BaseBeverage {
  category: 'beer';
  beer_style: string;
  bitterness_level: number;
  body_level: number;
  aroma_tags: string[];
}

export interface Cocktail extends BaseBeverage {
  category: 'cocktail';
  base_spirit: 'vodka' | 'gin' | 'rum' | 'tequila' | 'whiskey' | 'brandy';
  ingredients_top3: string[];
  sweetness_level: number;
  sour_level: number;
}

export interface Wine extends BaseBeverage {
  category: 'wine';
  wine_type: 'red' | 'white' | 'rose' | 'sparkling' | 'dessert';
  sweetness_level: number;
  acidity_level: number;
  tannin_level?: number;
  aroma_tags: string[];
}

export type Beverage = Beer | Cocktail | Wine;

// Helper arrays to generate dynamic data
const beerStyles = ['IPA', 'Pilsner', 'Stout', 'Wheat', 'Sour'];
const bases = ['vodka', 'gin', 'rum', 'tequila', 'whiskey', 'brandy'] as const;
const wineTypes = ['red', 'white', 'rose', 'sparkling', 'dessert'] as const;
const moods = ['chill', 'sad', 'celebrate', 'lonely'];

// Generate 50 Beers
export const mockBeers: Beer[] = Array.from({ length: 50 }).map((_, i) => ({
  beverage_id: `BEER_${i + 1}`,
  category: 'beer',
  name_zh: `精釀啤酒 ${i + 1} 號`,
  name_en: `Craft Beer No.${i + 1}`,
  abv_percent: 4 + (i % 6), // 4% to 9%
  flavor_tags: ['烘烤', '果香', '花香', '苦', '甜'].slice(0, 1 + (i % 3)),
  recommended_moods: [moods[i % moods.length]],
  description_short: `這是一款清爽且帶有獨特風味的精釀啤酒。`,
  beer_style: beerStyles[i % beerStyles.length],
  bitterness_level: 1 + (i % 5),
  body_level: 1 + (i % 5),
  aroma_tags: ['柑橘', '焦糖', '麥香'].slice(0, 1 + (i % 2))
}));

// Generate 50 Cocktails
export const mockCocktails: Cocktail[] = Array.from({ length: 50 }).map((_, i) => ({
  beverage_id: `CKTL_${i + 1}`,
  category: 'cocktail',
  name_zh: `經典調酒 ${i + 1} 號`,
  name_en: `Classic Cocktail No.${i + 1}`,
  abv_percent: 10 + (i % 20), // 10% to 29%
  flavor_tags: ['酸', '甜', '清爽', '烈'].slice(0, 1 + (i % 3)),
  recommended_moods: [moods[(i + 1) % moods.length]],
  description_short: `層次豐富的經典調酒組合。`,
  base_spirit: bases[i % bases.length],
  ingredients_top3: ['通寧水', '檸檬汁', '糖漿', '蘇打水'].slice(0, 2),
  sweetness_level: 1 + (i % 5),
  sour_level: 1 + ((i + 1) % 5)
}));

// Generate 30 Wines
export const mockWines: Wine[] = Array.from({ length: 30 }).map((_, i) => ({
  beverage_id: `WINE_${i + 1}`,
  category: 'wine',
  name_zh: `精選葡萄酒 ${i + 1} 號`,
  name_en: `Fine Wine No.${i + 1}`,
  abv_percent: 12 + (i % 4), // 12% to 15%
  flavor_tags: ['單寧', '櫻桃', '黑莓', '木桶'].slice(0, 1 + (i % 3)),
  recommended_moods: [moods[(i + 2) % moods.length]],
  description_short: `香氣優雅、餘韻悠長的葡萄酒。`,
  wine_type: wineTypes[i % wineTypes.length],
  sweetness_level: 1 + (i % 5),
  acidity_level: 1 + (i % 4),
  tannin_level: wineTypes[i % wineTypes.length] === 'red' ? 1 + (i % 5) : undefined,
  aroma_tags: ['Fruit', 'Citrus', 'Berry']
}));

export const mockBeverages: Beverage[] = [...mockBeers, ...mockCocktails, ...mockWines];
