
"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'

export function ShopHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className={cn(
        "fixed top-0 z-[60] w-full transition-all duration-300",
        isScrolled || isSearchOpen ? "premium-blur border-b border-white/5 py-12" : "bg-transparent py-24"
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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-muted hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search Overlay */}
        <div className={cn(
          "absolute top-full left-0 w-full bg-background border-b border-white/5 transition-all duration-300 overflow-hidden",
          isSearchOpen ? "h-64 opacity-100" : "h-0 opacity-0"
        )}>
          <div className="container mx-auto px-16 h-full flex items-center">
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <Input 
                autoFocus={isSearchOpen}
                placeholder="Search products..." 
                className="w-full bg-transparent border-none text-xl md:text-2xl h-16 pl-32 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </header>

      {/* Search Overlay Backdrop */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </>
  )
}
