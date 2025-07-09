export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'restaurants', name: 'Restaurants', icon: 'utensils' },
  { id: 'cafes', name: 'Cafes', icon: 'coffee' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag' },
  { id: 'health', name: 'Health', icon: 'heart' },
  { id: 'beauty', name: 'Beauty', icon: 'scissors' },
  { id: 'fitness', name: 'Fitness', icon: 'dumbbell' },
  { id: 'services', name: 'Services', icon: 'briefcase' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film' },
];