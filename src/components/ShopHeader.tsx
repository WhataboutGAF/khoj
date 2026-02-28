"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export function ShopHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "premium-blur border-b border-white/5 py-12" : "bg-transparent py-24"
    )}>
      <div className="container mx-auto px-16 flex items-center justify-between">
        <div className="flex items-center gap-48">
          <Link href="/" className="text-xl font-bold tracking-tighter text-foreground uppercase">
            KHOJ
          </Link>
          <nav className="hidden md:flex items-center gap-32">
            <Link href="/shop" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-widest">
              Shop
            </Link>
            <Link href="/collections" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-widest">
              Collections
            </Link>
            <Link href="/journal" className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-widest">
              Journal
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-muted hover:text-foreground hover:bg-white/5 transition-colors">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}