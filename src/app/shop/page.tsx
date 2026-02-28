"use client"

import { useState, useMemo } from 'react'
import { ShopHeader } from '@/components/ShopHeader'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS, COLLECTIONS } from '@/lib/mock-data'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SlidersHorizontal } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState('all')

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return PRODUCTS
    return PRODUCTS.filter(p => p.category === activeTab)
  }, [activeTab])

  return (
    <div className="min-h-screen">
      <ShopHeader />
      
      <main className="container mx-auto px-16 py-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-16 mb-48">
          <div>
            <h1 className="text-4xl font-bold mb-8">Catalogue</h1>
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
              <SheetContent side="bottom" className="rounded-t-2xl h-[60vh]">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl font-bold">Refine Results</SheetTitle>
                  <SheetDescription>Adjust filters to find exactly what you are looking for.</SheetDescription>
                </SheetHeader>
                <div className="py-24 space-y-24">
                  <div className="space-y-16">
                    <h4 className="text-sm font-bold uppercase tracking-wider">Sort By</h4>
                    <div className="flex flex-wrap gap-8">
                      {['Latest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                        <Button key={s} variant="secondary" className="rounded-full text-xs h-9 px-16">{s}</Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-16">
                    <h4 className="text-sm font-bold uppercase tracking-wider">Availability</h4>
                    <div className="flex gap-8">
                      <Button variant="outline" className="rounded-full text-xs h-9 px-16">In Stock</Button>
                      <Button variant="outline" className="rounded-full text-xs h-9 px-16 opacity-50">Sold Out</Button>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-16 left-16 right-16">
                  <Button className="w-full h-12 rounded-lg bg-primary text-white">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-32">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-64">
            <p className="text-muted">No products found in this collection.</p>
          </div>
        )}
      </main>
    </div>
  )
}