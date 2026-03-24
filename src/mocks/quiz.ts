export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    scoreMapping: {
      beer: number;
      cocktail: number;
      wine: number;
    }
  }[];
}

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: '下班後，你最想去什麼氛圍的地方？',
    options: [
      { id: 'o1', text: '熱鬧的居酒屋', scoreMapping: { beer: 3, cocktail: 1, wine: 0 } },
      { id: 'o2', text: '燈光昏暗的安靜酒吧', scoreMapping: { beer: 0, cocktail: 3, wine: 2 } },
      { id: 'o3', text: '高級餐廳', scoreMapping: { beer: 0, cocktail: 1, wine: 3 } }
    ]
  },
  {
    id: 'q2',
    text: '今晚的心情比較偏向哪一種？',
    options: [
      { id: 'o1', text: '只想慵懶放鬆 (Chill)', scoreMapping: { beer: 1, cocktail: 1, wine: 3 } },
      { id: 'o2', text: '想要熱烈慶祝 (Celebrate)', scoreMapping: { beer: 3, cocktail: 2, wine: 1 } },
      { id: 'o3', text: '有點低落需要慰藉 (Sad/Lonely)', scoreMapping: { beer: 1, cocktail: 3, wine: 2 } }
    ]
  },
  {
    id: 'q3',
    text: '你比較喜歡哪種食物的口味？',
    options: [
      { id: 'o1', text: '重口味（鹹、辣）', scoreMapping: { beer: 3, cocktail: 1, wine: 0 } },
      { id: 'o2', text: '甜點或清淡食物', scoreMapping: { beer: 0, cocktail: 2, wine: 2 } },
      { id: 'o3', text: '酸甜果香', scoreMapping: { beer: 0, cocktail: 3, wine: 1 } }
    ]
  },
  {
    id: 'q4',
    text: '你希望今晚這杯酒的酒精濃度如何？',
    options: [
      { id: 'o1', text: '微醺就好 (低)', scoreMapping: { beer: 2, cocktail: 1, wine: 1 } },
      { id: 'o2', text: '適中有感覺 (中)', scoreMapping: { beer: 1, cocktail: 2, wine: 2 } },
      { id: 'o3', text: '越烈越好 (高)', scoreMapping: { beer: 0, cocktail: 3, wine: 2 } }
    ]
  },
  {
    id: 'q5',
    text: '品嘗飲料時，你最重視什麼？',
    options: [
      { id: 'o1', text: '清涼解渴帶有氣泡感', scoreMapping: { beer: 3, cocktail: 1, wine: 0 } },
      { id: 'o2', text: '香氣與餘韻的層次', scoreMapping: { beer: 0, cocktail: 1, wine: 3 } },
      { id: 'o3', text: '酸甜平衡與視覺', scoreMapping: { beer: 0, cocktail: 3, wine: 0 } }
    ]
  },
  {
    id: 'q6',
    text: '如果選一種水果，你偏好：',
    options: [
      { id: 'o1', text: '熱帶水果 (鳳梨、百香果)', scoreMapping: { beer: 1, cocktail: 3, wine: 0 } },
      { id: 'o2', text: '柑橘類 (檸檬、柚子)', scoreMapping: { beer: 3, cocktail: 2, wine: 1 } },
      { id: 'o3', text: '莓果類 (葡萄、櫻桃)', scoreMapping: { beer: 0, cocktail: 1, wine: 3 } }
    ]
  },
  {
    id: 'q7',
    text: '你通常喝酒的時間長度是？',
    options: [
      { id: 'o1', text: '大口快飲，很快喝完', scoreMapping: { beer: 3, cocktail: 1, wine: 0 } },
      { id: 'o2', text: '慢慢啜飲一兩個小時', scoreMapping: { beer: 0, cocktail: 2, wine: 3 } },
      { id: 'o3', text: '一杯接一杯', scoreMapping: { beer: 2, cocktail: 3, wine: 1 } }
    ]
  }
];
