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
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511191988486-103bc3ac80ef?q=80&w=1000&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473963456455-da8843232679?q=80&w=1000&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565084888279-aff1755c944a?q=80&w=1000&auto=format&fit=crop'
    ],
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
