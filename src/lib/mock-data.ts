import { Product, Coupon, Collection } from './types';

export const COLLECTIONS: Collection[] = [
  { id: '1', name: 'All Products', slug: 'all' },
  { id: '2', name: 'Apparel', slug: 'apparel' },
  { id: '3', name: 'Home', slug: 'home' },
  { id: '4', name: 'Accessories', slug: 'accessories' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton Tee',
    description: 'A refined essential crafted from heavy-weight organic cotton for a perfect drape and longevity.',
    price: 4500,
    originalPrice: 5500,
    images: ['https://picsum.photos/seed/khoj2/800/1000', 'https://picsum.photos/seed/khoj6/800/1000'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Midnight Black', 'Slate Grey', 'Off-White'],
    category: 'apparel',
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Ceramic Essential Set',
    description: 'Hand-crafted matte ceramic set including a carafe and two matching tumblers.',
    price: 8900,
    images: ['https://picsum.photos/seed/khoj3/800/1000'],
    sizes: ['One Size'],
    colors: ['Stone'],
    category: 'home',
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Leather Portfolio Carry',
    description: 'Italian tanned leather portfolio designed for the modern professional.',
    price: 12500,
    originalPrice: 15000,
    images: ['https://picsum.photos/seed/khoj4/800/1000'],
    sizes: ['Standard'],
    colors: ['Tobacco', 'Ebony'],
    category: 'accessories',
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Linen Relaxed Shirt',
    description: 'Breathable European linen shirt with a contemporary relaxed fit.',
    price: 6800,
    images: ['https://picsum.photos/seed/khoj5/800/1000'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Oatmeal', 'Sage'],
    category: 'apparel',
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
];

export const COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percent',
    value: 10,
    isActive: true,
    expiryDate: '2025-12-31',
  },
  {
    id: '2',
    code: 'KHOJFIX',
    type: 'flat',
    value: 500,
    isActive: true,
    expiryDate: '2025-12-31',
  },
];