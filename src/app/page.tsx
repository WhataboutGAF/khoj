"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShopHeader } from '@/components/ShopHeader'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/mock-data'

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4)

  return (
    <div className="min-h-screen">
      <ShopHeader />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <Image
            src="https://picsum.photos/seed/khoj1/1200/800"
            alt="Hero"
            fill
            className="object-cover -z-10 brightness-95"
            priority
            data-ai-hint="minimal lifestyle"
          />
          <div className="container mx-auto px-16">
            <div className="max-w-2xl space-y-24">
              <span className="text-sm font-semibold tracking-widest text-white/80 uppercase">
                Summer 2024 Collection
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Simplicity as a <br /> Lifestyle.
              </h1>
              <p className="text-lg text-white/80 max-w-md">
                Carefully curated essentials designed with longevity and minimalist aesthetics in mind.
              </p>
              <div className="flex gap-16">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 border-none px-32 h-12 rounded-lg">
                  <Link href="/shop">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10 px-32 h-12 rounded-lg">
                  <Link href="/journal">Explore More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-48 container mx-auto px-16">
          <div className="flex items-end justify-between mb-32">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Featured Essentials</h2>
              <p className="text-muted text-sm max-w-sm">
                Our most sought-after pieces, crafted to perfection.
              </p>
            </div>
            <Link href="/shop" className="group flex items-center gap-8 text-sm font-semibold text-accent">
              View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary py-48 border-t border-border">
        <div className="container mx-auto px-16 grid md:grid-cols-4 gap-48">
          <div className="space-y-16">
            <h3 className="text-xl font-bold">KHOJ</h3>
            <p className="text-sm text-muted">Redefining modern essentials with a focus on quality and minimalism.</p>
          </div>
          <div className="space-y-16">
            <h4 className="text-sm font-bold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-8 text-sm text-muted">
              <li><Link href="/shop?collection=all">All Products</Link></li>
              <li><Link href="/shop?collection=apparel">Apparel</Link></li>
              <li><Link href="/shop?collection=home">Home</Link></li>
            </ul>
          </div>
          <div className="space-y-16">
            <h4 className="text-sm font-bold uppercase tracking-wider">Help</h4>
            <ul className="space-y-8 text-sm text-muted">
              <li><Link href="/shipping">Shipping</Link></li>
              <li><Link href="/returns">Returns</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-16">
            <h4 className="text-sm font-bold uppercase tracking-wider">Follow</h4>
            <ul className="space-y-8 text-sm text-muted">
              <li><Link href="#">Instagram</Link></li>
              <li><Link href="#">Twitter</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-16 mt-48 pt-24 border-t border-border/50 text-xs text-muted text-center">
          © {new Date().getFullYear()} KHOJ Studio. All rights reserved.
        </div>
      </footer>
    </div>
  )
}