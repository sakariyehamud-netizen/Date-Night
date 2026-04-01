export interface DateIdea {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  category: string;
  tags: string[];
}

export type Category = 'All' | 'Indoor' | 'Outdoor' | 'Active' | 'Relaxing' | 'Cozy Dinners' | 'Adventure' | 'Stay-at-Home' | 'Budget Friendly';
