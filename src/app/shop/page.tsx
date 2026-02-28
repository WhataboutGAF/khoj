
"use client"

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShopHeader } from '@/components/ShopHeader'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS, COLLECTIONS } from '@/lib/mock-data'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SlidersHorizontal, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
      <ShopHeader />
      
      <main className="container mx-auto px-16 py-[128px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-16 mb-48">
          <div>
            <h1 className="text-4xl font-bold mb-8">
              {query ? `Search: ${query}` : 'Catalogue'}
            </h1>
            <p className="text-muted text-sm">Explore our curated range of minimalist essentials.</p>
          </div>
          
          <div className="flex items-center gap-16">
            <Tabs defaultValue="all" className="w-full md:w-auto overflow-x-auto no-scrollbar" onValueChange={setActiveTab}>
              <TabsList className="bg-transparent border border-border h-11 p-4 rounded-lg">
                {COLLECTIONS.map(col => (
                  <TabsTrigger 
                    key={col.slug} 
                    value={col.slug}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-16 h-8 text-xs font-semibold"
                  >
                    {col.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 px-16 rounded-lg gap-8 border-border">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl h-[60vh] premium-blur">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl font-bold">Refine Results</SheetTitle>
                  <SheetDescription>Adjust filters to find exactly what you are looking for.</SheetDescription>
                </SheetHeader>
                <div className="py-24 space-y-24">
                  <div className="space-y-16">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted">Sort By</h4>
                    <div className="flex flex-wrap gap-8">
                      {['Latest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                        <Button key={s} variant="secondary" className="rounded-full text-xs h-9 px-16 bg-white/5">{s}</Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-16">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted">Availability</h4>
                    <div className="flex gap-8">
                      <Button variant="outline" className="rounded-full text-xs h-9 px-16">In Stock</Button>
                      <Button variant="outline" className="rounded-full text-xs h-9 px-16 opacity-50">Sold Out</Button>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-16 left-16 right-16">
                  <Button className="w-full h-12 rounded-lg bg-accent text-primary font-bold">Apply Filters</Button>
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
          <div className="text-center py-[128px] space-y-24 border border-dashed border-white/5 rounded-3xl">
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
