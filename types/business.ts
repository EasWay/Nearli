export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface BusinessReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3 | 4;
  currency: string;
  images: string[];
  latitude: number;
  longitude: number;
  distance?: number;
  hours: BusinessHours[];
  features: string[];
  reviews?: BusinessReview[];
}