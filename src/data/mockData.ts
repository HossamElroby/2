import { Category, City, Listing, User } from '../types';

export const mockCities: City[] = [
  {
    id: '1',
    name: 'Dubai',
    nameAr: 'دبي',
    country: 'UAE',
    coordinates: { lat: 25.2048, lng: 55.2708 }
  },
  {
    id: '2',
    name: 'Riyadh',
    nameAr: 'الرياض',
    country: 'Saudi Arabia',
    coordinates: { lat: 24.7136, lng: 46.6753 }
  },
  {
    id: '3',
    name: 'Cairo',
    nameAr: 'القاهرة',
    country: 'Egypt',
    coordinates: { lat: 30.0444, lng: 31.2357 }
  },
  {
    id: '4',
    name: 'Amman',
    nameAr: 'عمان',
    country: 'Jordan',
    coordinates: { lat: 31.9454, lng: 35.9284 }
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Cars',
    nameAr: 'السيارات',
    icon: '🚗',
    count: 1250
  },
  {
    id: '2',
    name: 'Real Estate',
    nameAr: 'العقارات',
    icon: '🏠',
    count: 892
  },
  {
    id: '3',
    name: 'Electronics',
    nameAr: 'الإلكترونيات',
    icon: '📱',
    count: 567
  },
  {
    id: '4',
    name: 'Jobs',
    nameAr: 'الوظائف',
    icon: '💼',
    count: 423
  },
  {
    id: '5',
    name: 'Fashion',
    nameAr: 'الأزياء',
    icon: '👗',
    count: 734
  },
  {
    id: '6',
    name: 'Furniture',
    nameAr: 'الأثاث',
    icon: '🪑',
    count: 289
  },
  {
    id: '7',
    name: 'Sports',
    nameAr: 'الرياضة',
    icon: '⚽',
    count: 156
  },
  {
    id: '8',
    name: 'Books',
    nameAr: 'الكتب',
    icon: '📚',
    count: 198
  },
  {
    id: '9',
    name: 'Pets',
    nameAr: 'الحيوانات الأليفة',
    icon: '🐕',
    count: 87
  },
  {
    id: '10',
    name: 'Services',
    nameAr: 'الخدمات',
    icon: '🔧',
    count: 445
  },
  {
    id: '11',
    name: 'Motorcycles',
    nameAr: 'الدراجات النارية',
    icon: '🏍️',
    count: 167
  },
  {
    id: '12',
    name: 'Games',
    nameAr: 'الألعاب',
    icon: '🎮',
    count: 234
  },
  {
    id: '13',
    name: 'Beauty',
    nameAr: 'الجمال',
    icon: '💄',
    count: 123
  },
  {
    id: '14',
    name: 'Kitchen',
    nameAr: 'المطبخ',
    icon: '🍳',
    count: 178
  },
  {
    id: '15',
    name: 'Baby Items',
    nameAr: 'مستلزمات الأطفال',
    icon: '🍼',
    count: 145
  },
  {
    id: '16',
    name: 'Other',
    nameAr: 'أخرى',
    icon: '📦',
    count: 312
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Ahmed Al-Rashid',
  email: 'ahmed@example.com',
  isVerified: true,
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
};

export const mockListings: Listing[] = [
  {
    id: '1',
    title: '2019 Toyota Camry - Excellent Condition',
    titleAr: 'تويوتا كامري 2019 - حالة ممتازة',
    description: 'Well-maintained Toyota Camry with low mileage. Perfect for daily use.',
    descriptionAr: 'تويوتا كامري محافظ عليها مع عدد كيلومترات قليل. مثالية للاستخدام اليومي.',
    price: 65000,
    currency: 'AED',
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: mockCategories[0],
    city: mockCities[0],
    user: mockUser,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    isNegotiable: true,
    isFeatured: true,
    views: 1250
  },
  {
    id: '2',
    title: 'Spacious 3BR Apartment in Downtown',
    titleAr: 'شقة 3 غرف واسعة في وسط المدينة',
    description: 'Modern apartment with city view, fully furnished, ready to move in.',
    descriptionAr: 'شقة حديثة مع إطلالة على المدينة، مفروشة بالكامل، جاهزة للسكن.',
    price: 120000,
    currency: 'AED',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: mockCategories[1],
    city: mockCities[0],
    user: mockUser,
    createdAt: '2024-01-14T15:20:00Z',
    updatedAt: '2024-01-14T15:20:00Z',
    isNegotiable: false,
    isFeatured: false,
    views: 892
  }
];