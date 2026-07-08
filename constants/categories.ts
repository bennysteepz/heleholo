export const CATEGORIES = [
  { id: 'scenic',      label: 'Scenic drive',   emoji: '🌅' },
  { id: 'food',        label: 'Food tour',       emoji: '🍜' },
  { id: 'surf',        label: 'Surf culture',    emoji: '🏄' },
  { id: 'history',     label: 'Hawaiian history',emoji: '🏛️'  },
  { id: 'adventure',   label: 'Adventure',       emoji: '🥾' },
  { id: 'hidden_gems', label: 'Hidden gems',     emoji: '💎' },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];
