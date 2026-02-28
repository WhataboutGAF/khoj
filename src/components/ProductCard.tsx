
"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block space-y-16">
      {/* Product Information - Stacked for better readability and avoidance of overlap */}
      <div className="space-y-4 px-4">
        <h3 className="text-xl md:text-3xl font-bold text-foreground uppercase tracking-tighter group-hover:text-accent transition-colors leading-none">
          {product.name}
        </h3>
        <div className="flex items-center gap-12">
          <span className="text-lg md:text-2xl font-bold text-accent">
            NPR {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through opacity-30">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <p className="text-[10px] md:text-[11px] text-muted uppercase tracking-[0.3em] font-black opacity-50 mt-8">
          {product.category} • {product.colors.length} Variants
        </p>
      </div>

      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Hover overlay for a more premium feel */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </Link>
  )
}
