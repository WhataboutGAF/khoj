"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShopHeader } from '@/components/ShopHeader'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/mock-data'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4)
  const heroImage = PlaceHolderImages.find(img => img.id === 'model-denim')?.imageUrl || ''

  return (
    <div className="min-h-screen bg-background">
      <ShopHeader />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <Image
            src={heroImage}
            alt="Denim Collection"
            fill
            className="object-cover -z-10 brightness-[0.7]"
            priority
            data-ai-hint="denim fashion"
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent -z-10" />
          
          <div className="container mx-auto px-16">
            <div className="max-w-xl space-y-32">
              <div className="space-y-12">
                <span className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                  KHOJ / Collection
                </span>
                <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-[1.1] tracking-tighter">
                  Denim, <br /> simplified.
                </h1>
                <p className="text-lg text-muted max-w-sm leading-relaxed">
                  Structured fits in black and indigo. Designed for the modern silhouette.
                </p>
              </div>
              
              <div className="flex items-center gap-24 pt-8">
                <Button asChild className="bg-accent text-background hover:bg-accent/90 px-32 h-12 rounded-xl font-bold transition-all hover:scale-[1.02]">
                  <Link href="/shop">Shop</Link>
                </Button>
                <Link href="/collections" className="group flex items-center gap-8 text-sm font-bold text-foreground hover:text-accent transition-colors">
                  View collections <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Collection Grid */}
        <section className="py-64 container mx-auto px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-48 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">Structured Series</h2>
              <p className="text-muted text-sm max-w-xs">
                Premium weights and archival washes.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-background py-64 border-t border-white/5">
        <div className="container mx-auto px-16 grid md:grid-cols-4 gap-48">
          <div className="space-y-24">
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