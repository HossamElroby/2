// Core application types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  isVerified: boolean;
}

export interface City {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  count: number;
  subcategories?: Category[];
}

export interface Listing {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  currency: string;
  images: string[];
  category: Category;
  city: City;
  user: User;
  createdAt: string;
  updatedAt: string;
  isNegotiable: boolean;
  isFeatured: boolean;
  views: number;
}

export interface SearchFilters {
  keyword: string;
  categoryId?: string;
  cityId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'relevance';
}

export interface AppState {
  user: User | null;
  language: 'ar' | 'en';
  selectedCity: City;
  searchFilters: SearchFilters;
  listings: Listing[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LANGUAGE'; payload: 'ar' | 'en' }
  | { type: 'SET_CITY'; payload: City }
  | { type: 'SET_SEARCH_FILTERS'; payload: Partial<SearchFilters> }
  | { type: 'SET_LISTINGS'; payload: Listing[] }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };