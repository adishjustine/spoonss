export type PageRoute = 'home' | 'specials' | 'biriyani' | 'mains' | 'rice-noodles';

export type DietType = 'veg' | 'non-veg' | 'seafood' | 'egg';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  category: string;
  page: 'specials' | 'biriyani' | 'mains' | 'rice-noodles';
  diet: DietType;
  description?: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle?: string;
  page: 'specials' | 'biriyani' | 'mains' | 'rice-noodles';
  iconName?: string;
  items: MenuItem[];
}

export interface SectionInfo {
  id: PageRoute;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  categories: string[];
  bannerSubtitle: string;
  bgAccent: string;
  image: string;
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}
