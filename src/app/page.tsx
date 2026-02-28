
"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/mock-data'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export default function Home() {
  // Enforce denim-only categories for public UI
  const denimProducts = PRODUCTS.filter(p => 
    ['jeans', 'shorts', 'pants'].includes(p.category.toLowerCase()) && p.isVisible
  ).slice(0, 4)
  
  const modelImage = PlaceHolderImages.find(img => img.id === 'model-denim')?.imageUrl || ''

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[75vh] flex items-start overflow-hidden pt-128 md:pt-160 pb-96 bg-[#0B0D12]">
          {/* Background Radial Gradient behind model */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(17,21,34,1)_0%,rgba(11,13,18,1)_100%)] -z-10" />
          
          <div className="container mx-auto px-16 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-24 h-full">
              {/* Left Content: 6 Columns - Elevated z-index to prevent clipping */}
              <div className="col-span-1 md:col-span-6 space-y-32 relative z-30">
                <div className="space-y-12">
                  <span className="text-xs font-semibold tracking-[0.2em] text-muted uppercase block">
                    KHOJ / Collection
                  </span>
                  <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-[1.05] tracking-tighter">
                    Denim, <br /> simplified.
                  </h1>
                  <p className="text-lg text-muted max-w-sm leading-relaxed">
                    Structured fits in black and indigo. Designed for the modern silhouette.
                  </p>
                </div>
                
                <div className="flex items-center gap-24 pt-8">
                  <Button asChild className="bg-accent text-[#0B0D12] hover:bg-accent/90 px-32 h-12 min-w-[120px] rounded-xl font-bold transition-all hover:scale-[1.02] shadow-xl shadow-accent/10">
                    <Link href="/shop">Shop</Link>
                  </Button>
                  <Link href="/collections" className="group flex items-center gap-8 text-sm font-bold text-foreground hover:text-accent transition-colors">
                    View collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-4" />
                  </Link>
                </div>
              </div>

              {/* Right Content: 6 Columns (Model Image) */}
              <div className="hidden md:block col-span-6 relative z-10">
                <div className="absolute top-0 right-0 w-[110%] h-[120%] -mr-48">
                  <Image
                    src={modelImage}
                    alt="KHOJ Denim Model"
                    fill
                    className="object-contain object-top select-none"
                    priority
                    data-ai-hint="denim fashion"
                  />
                  {/* Subtle Grounding Shadow */}
                  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-1/2 h-48 bg-black/40 blur-[120px] rounded-full -z-10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-96 container mx-auto px-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-48 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">Structured Series</h2>
              <p className="text-muted text-sm max-w-xs">
                Premium weights and archival washes.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
            {denimProducts.length > 0 ? (
              denimProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-64 text-center border border-dashed border-white/10 rounded-xl">
                <h3 className="text-xl font-bold mb-4">New pieces soon.</h3>
                <p className="text-muted text-sm">We’re preparing the next drop.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
