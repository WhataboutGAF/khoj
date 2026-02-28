"use client"

import Link from 'next/link'
import { Search, ShoppingBag, Menu } from 'lucide-react'
import { Button } from './ui/button'

export function ShopHeader() {
  return (
    <header className="sticky top-0 z-50 w-full premium-blur border-b border-border/50">
      <div className="container mx-auto px-16 h-16 flex items-center justify-between">
        <div className="flex items-center gap-24">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
            KHOJ
          </Link>
          <nav className="hidden md:flex items-center gap-24">
            <Link href="/shop" className="text-sm font-medium hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/shop?collection=apparel" className="text-sm font-medium hover:text-accent transition-colors">
              Collections
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
              Journal
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-secondary">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary hover:bg-secondary">
            <ShoppingBag className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-primary">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}