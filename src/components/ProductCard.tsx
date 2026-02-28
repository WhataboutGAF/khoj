
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
      {/* Product Information - ABOVE the image, large typography */}
      <div className="space-y-8 px-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground uppercase tracking-tight group-hover:text-accent transition-colors leading-[1.1]">
            {product.name}
          </h3>
          <div className="flex items-center gap-12">
            <span className="text-lg md:text-xl font-bold text-accent">
              NPR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted line-through opacity-40">
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <p className="text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] font-bold opacity-70">
          {product.colors.length} {product.colors.length === 1 ? 'Color' : 'Colors'} • {product.category}
        </p>
      </div>

      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary border border-white/5 shadow-2xl shadow-black/40">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint="denim product"
        />
        {/* Hover overlay for a more premium feel */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Link>
  )
}
