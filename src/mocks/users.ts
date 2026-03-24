export interface User {
  user_id: string;
  nickname: string;
  avatar_id: string;
  preferred_categories: ('beer' | 'cocktail' | 'wine')[];
  abv_tolerance: 'low' | 'medium' | 'high';
  mood_today: string;
  availability_tonight: 'available' | 'maybe' | 'not';
  location_mock: {
    district: string;
    distance_to_me_km: number;
  };
}

export const mockUsers: User[] = [
  {
    user_id: 'U001',
    nickname: '阿滴',
    avatar_id: 'avatar1',
    preferred_categories: ['beer', 'cocktail'],
    abv_tolerance: 'medium',
    mood_today: 'chill',
    availability_tonight: 'available',
    location_mock: { district: '大安區', distance_to_me_km: 0.8 }
  },
  {
    user_id: 'U002',
    nickname: '小九',
    avatar_id: 'avatar2',
    preferred_categories: ['wine'],
    abv_tolerance: 'low',
    mood_today: 'sad',
    availability_tonight: 'maybe',
    location_mock: { district: '信義區', distance_to_me_km: 1.5 }
  },
  {
    user_id: 'U003',
    nickname: '老司機',
    avatar_id: 'avatar3',
    preferred_categories: ['beer', 'wine', 'cocktail'],
    abv_tolerance: 'high',
    mood_today: 'celebrate',
    availability_tonight: 'available',
    location_mock: { district: '中山區', distance_to_me_km: 2.1 }
  },
  {
    user_id: 'U004',
    nickname: '小花',
    avatar_id: 'avatar4',
    preferred_categories: ['cocktail'],
    abv_tolerance: 'low',
    mood_today: 'lonely',
    availability_tonight: 'available',
    location_mock: { district: '松山區', distance_to_me_km: 3.5 }
  },
  {
    user_id: 'U005',
    nickname: '酒空',
    avatar_id: 'avatar5',
    preferred_categories: ['beer'],
    abv_tolerance: 'high',
    mood_today: 'chill',
    availability_tonight: 'not',
    location_mock: { district: '大安區', distance_to_me_km: 0.2 }
  }
];
