"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { Badge } from './ui/badge'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  return (
    <Link href={`/product/${product.id}`} className="group block space-y-12">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface border border-white/5">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint="denim product"
        />
        {hasDiscount && (
          <Badge className="absolute top-12 left-12 bg-accent text-background border-none text-[10px] font-bold tracking-widest uppercase">
            Sale
          </Badge>
        )}
      </div>
      <div className="space-y-4 px-4">
        <h3 className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors uppercase tracking-tight">
          {product.name}
        </h3>
        <div className="flex items-center gap-8">
          <span className="text-sm font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}