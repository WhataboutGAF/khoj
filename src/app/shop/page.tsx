
"use client"

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { COLLECTIONS } from '@/lib/mock-data'
import { SlidersHorizontal, SearchX, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { Product } from '@/lib/types'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function ShopContent() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const [activeTab, setActiveTab] = useState('all')
  
  const [sortBy, setSortBy] = useState('Latest')
  const [availability, setAvailability] = useState<'all' | 'in-stock'>('all')
  const [isOpen, setIsOpen] = useState(false)

  const db = useFirestore()
  const { isUserLoading } = useUser()

  const productsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  }, [db])

  const { data: products, isLoading } = useCollection<Product>(productsQuery)

  const filteredProducts = useMemo(() => {
    if (!products) return []

    let result = products.filter(p => {
      const matchesCategory = activeTab === 'all' || p.category.toLowerCase() === activeTab.toLowerCase()
      const matchesSearch = !queryParam || 
        p.name.toLowerCase().includes(queryParam.toLowerCase()) || 
        p.description.toLowerCase().includes(queryParam.toLowerCase())
      
      const isPublic = p.isVisible
      const matchesAvailability = availability === 'all' || p.isVisible

      return matchesCategory && matchesSearch && isPublic && matchesAvailability
    })

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, activeTab, queryParam, sortBy, availability])

  const showLoading = isUserLoading || isLoading

  return (
    <main className="container mx-auto px-16 py-[128px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-16 mb-48">
        <div>
          <h1 className="text-4xl font-bold mb-8">
            {queryParam ? `Search: ${queryParam}` : 'Catalogue'}
          </h1>
          <p className="text-muted text-sm font-medium">Explore our curated range of minimalist essentials.</p>
        </div>
        
        <div className="flex items-center gap-16">
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

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-11 px-16 rounded-[12px] gap-8 border-white/10 bg-secondary hover:bg-secondary/80">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl h-[65vh] premium-blur border-white/10 p-24">
              <SheetHeader className="text-left mb-32">
                <SheetTitle className="text-xl font-bold">Refine Results</SheetTitle>
                <SheetDescription className="text-muted">Adjust filters to find exactly what you are looking for.</SheetDescription>
              </SheetHeader>
              
              <div className="space-y-32">
                <div className="space-y-16">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Sort By</h4>
                  <div className="flex flex-wrap gap-8">
                    {['Latest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                      <Button 
                        key={s} 
                        variant={sortBy === s ? "default" : "secondary"} 
                        onClick={() => setSortBy(s)}
                        className={cn(
                          "rounded-full text-[10px] h-9 px-16 transition-all",
                          sortBy === s ? "bg-accent text-[#0B0D12]" : "bg-white/5 hover:bg-white/10"
                        )}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-16">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Availability</h4>
                  <div className="flex gap-8">
                    <Button 
                      variant={availability === 'in-stock' ? "default" : "outline"} 
                      onClick={() => setAvailability(availability === 'in-stock' ? 'all' : 'in-stock')}
                      className={cn(
                        "rounded-full text-[10px] h-9 px-16 transition-all",
                        availability === 'in-stock' ? "bg-accent text-[#0B0D12]" : "border-white/10"
                      )}
                    >
                      In Stock Only
                    </Button>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 left-16 right-16">
                <Button 
                  onClick={() => setIsOpen(false)}
                  className="w-full h-12 rounded-[12px] bg-accent text-[#0B0D12] font-bold uppercase text-[10px] tracking-widest hover:bg-accent/90"
                >
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {showLoading ? (
        <div className="flex justify-center py-[128px]">
          <Loader2 className="w-12 h-12 animate-spin text-accent" />
        </div>
      ) : filteredProducts.length > 0 ? (
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
  )
}

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-accent" /></div>}>
        <ShopContent />
      </Suspense>
    </div>
  )
}
