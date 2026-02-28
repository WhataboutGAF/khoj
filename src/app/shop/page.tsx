"use client"

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS, COLLECTIONS } from '@/lib/mock-data'
import { SlidersHorizontal, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [activeTab, setActiveTab] = useState('all')

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeTab === 'all' || p.category === activeTab
      const matchesSearch = !query || 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      const isPublic = p.isVisible && ['jeans', 'shorts', 'pants'].includes(p.category.toLowerCase())
      
      return matchesCategory && matchesSearch && isPublic
    })
  }, [activeTab, query])

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-16 py-[128px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-16 mb-48">
          <div>
            <h1 className="text-4xl font-bold mb-8">
              {query ? `Search: ${query}` : 'Catalogue'}
            </h1>
            <p className="text-muted text-sm font-medium">Explore our curated range of minimalist essentials.</p>
          </div>
          
          <div className="flex items-center gap-16">
            {/* Custom Premium Tabs */}
            <div className="bg-secondary border border-white/10 p-4 rounded-[12px] flex items-center overflow-x-auto no-scrollbar">
              {COLLECTIONS.map(col => (
                <button
                  key={col.slug}
                  onClick={() => setActiveTab(col.slug)}
                  className={cn(
                    "relative px-16 py-8 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 whitespace-nowrap",
                    activeTab === col.slug 
                      ? "text-foreground" 
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {col.name}
                  {activeTab === col.slug && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-accent" />
                  )}
                </button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 px-16 rounded-[12px] gap-8 border-white/10 bg-secondary hover:bg-secondary/80">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl h-[60vh] premium-blur border-white/10">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl font-bold">Refine Results</SheetTitle>
                  <SheetDescription>Adjust filters to find exactly what you are looking for.</SheetDescription>
                </SheetHeader>
                <div className="py-24 space-y-24">
                  <div className="space-y-16">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Sort By</h4>
                    <div className="flex flex-wrap gap-8">
                      {['Latest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                        <Button key={s} variant="secondary" className="rounded-full text-[10px] h-9 px-16 bg-white/5 hover:bg-white/10">
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-16">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Availability</h4>
                    <div className="flex gap-8">
                      <Button variant="outline" className="rounded-full text-[10px] h-9 px-16 border-white/10">In Stock</Button>
                      <Button variant="outline" className="rounded-full text-[10px] h-9 px-16 opacity-30 border-white/10">Sold Out</Button>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-16 left-16 right-16">
                  <Button className="w-full h-12 rounded-[12px] bg-accent text-[#0B0D12] font-bold uppercase text-[10px] tracking-widest">
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-24 gap-y-48">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-[128px] space-y-24 border border-dashed border-white/10 rounded-3xl">
            <div className="w-64 h-64 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <SearchX className="w-32 h-32 text-muted" />
            </div>
            <div className="space-y-8">
              <h3 className="text-xl font-bold">No matches.</h3>
              <p className="text-muted text-sm max-w-xs mx-auto">Try a softer search or explore other categories.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
