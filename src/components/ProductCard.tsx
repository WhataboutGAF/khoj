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
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary border border-white/5">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint="denim product"
        />
        {/* Hover overlay for a more premium feel */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="space-y-4 px-4">
        <div className="flex justify-between items-start gap-12">
          <h3 className="text-[11px] font-bold text-foreground/90 uppercase tracking-[0.1em] group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <span className="text-[11px] font-bold text-foreground whitespace-nowrap">
            NPR {product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-[10px] text-muted uppercase tracking-widest font-medium">
          {product.colors.length} {product.colors.length === 1 ? 'Color' : 'Colors'}
        </p>
      </div>
    </Link>
  )
}
