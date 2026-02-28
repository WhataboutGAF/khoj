import { Product, Coupon, Collection } from './types';

export const COLLECTIONS: Collection[] = [
  { id: '1', name: 'All', slug: 'all' },
  { id: '2', name: 'Jeans', slug: 'jeans' },
  { id: '3', name: 'Shorts', slug: 'shorts' },
  { id: '4', name: 'Pants', slug: 'pants' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Straight Leg Denim',
    description: 'A refined essential crafted from heavy-weight organic denim for a perfect drape and longevity.',
    price: 4500,
    originalPrice: 5500,
    images: ['https://picsum.photos/seed/khoj2/800/1000'],
    sizes: ['30', '32', '34', '36'],
    colors: ['Midnight Black', 'Slate Grey'],
    category: 'jeans',
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Archival Relaxed Fit',
    description: 'Vintage-inspired relaxed fit denim with reinforced stitching and custom hardware.',
    price: 6800,
    images: ['https://picsum.photos/seed/khoj5/800/1000'],
    sizes: ['30', '32', '34'],
    colors: ['Indigo', 'Raw Wash'],
    category: 'jeans',
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Technical Chino Pant',
    description: 'Structured cotton-twill pants designed for the modern silhouette.',
    price: 5200,
    images: ['https://picsum.photos/seed/khoj4/800/1000'],
    sizes: ['30', '32', '34'],
    colors: ['Onyx', 'Bone'],
    category: 'pants',
    isVisible: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Structured Denim Short',
    description: 'Heavyweight denim shorts with a precise knee-length cut.',
    price: 3800,
    images: ['https://picsum.photos/seed/khoj3/800/1000'],
    sizes: ['30', '32', '34'],
    colors: ['Washed Black', 'Vintage Blue'],
    category: 'shorts',
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
