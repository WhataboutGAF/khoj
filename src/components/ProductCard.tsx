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
    <Link href={`/product/${product.id}`} className="group block space-y-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint="fashion product"
        />
        {hasDiscount && (
          <Badge className="absolute top-16 left-16 bg-accent text-white border-none shadow-subtle">
            SALE
          </Badge>
        )}
      </div>
      <div className="space-y-4">
        <h3 className="text-base font-medium text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-8">
          <span className="text-sm font-semibold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted line-through decoration-muted/50">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}