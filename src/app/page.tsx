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
        <section className="relative h-[75vh] min-h-[600px] flex items-start overflow-hidden pt-[128px] md:pt-[160px] bg-[#0B0D12]">
          {/* Background Radial Gradient behind model */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(17,21,34,1)_0%,rgba(11,13,18,1)_100%)] -z-10" />
          
          <div className="container mx-auto px-16 h-full relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-24 h-full">
              {/* Left Content: 6 Columns */}
              <div className="col-span-1 md:col-span-6 space-y-32">
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
                  <Button asChild className="bg-accent text-[#0B0D12] hover:bg-accent/90 px-32 h-12 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-xl shadow-accent/10">
                    <Link href="/shop">Shop</Link>
                  </Button>
                  <Link href="/collections" className="group flex items-center gap-8 text-sm font-bold text-foreground hover:text-accent transition-colors">
                    View collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-4" />
                  </Link>
                </div>
              </div>

              {/* Right Content: 6 Columns (Model Image) */}
              <div className="hidden md:block col-span-6 relative h-full">
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
        <section className="py-[96px] container mx-auto px-16 relative z-10">
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
      
      <footer className="bg-[#0B0D12] py-[96px] border-t border-white/5">
        <div className="container mx-auto px-16 grid grid-cols-2 md:grid-cols-4 gap-48">
          <div className="col-span-2 md:col-span-1 space-y-24">
            <h3 className="text-lg font-bold tracking-tighter uppercase">KHOJ</h3>
            <p className="text-sm text-muted leading-relaxed">Redefining modern staples through technical precision and minimal form.</p>
          </div>
          <div className="space-y-16">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Navigate</h4>
            <ul className="space-y-12 text-sm">
              <li><Link href="/shop" className="hover:text-accent transition-colors">Catalogue</Link></li>
              <li><Link href="/collections" className="hover:text-accent transition-colors">Archives</Link></li>
              <li><Link href="/journal" className="hover:text-accent transition-colors">Journal</Link></li>
            </ul>
          </div>
          <div className="space-y-16">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Legal</h4>
            <ul className="space-y-12 text-sm">
              <li><Link href="/shipping" className="hover:text-accent transition-colors">Terms</Link></li>
              <li><Link href="/returns" className="hover:text-accent transition-colors">Privacy</Link></li>
            </ul>
          </div>
          <div className="space-y-16">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Connect</h4>
            <ul className="space-y-12 text-sm">
              <li><Link href="#" className="hover:text-accent transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Twitter</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-16 mt-64 pt-32 border-t border-white/5 text-[10px] uppercase tracking-widest text-muted/60">
          © {new Date().getFullYear()} KHOJ STUDIO. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  )
}