export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  isVisible: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'flat';
  value: number;
  isActive: boolean;
  expiryDate: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
}