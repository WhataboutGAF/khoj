
"use client"

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Search, X, Menu } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/justvibing')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isSearchOpen])

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

  if (isAdminRoute) return null

  const navLinks = [
    { name: 'Shop', href: '/shop', activeMatch: ['/shop', '/product'] },
    { name: 'Collections', href: '/collections', activeMatch: ['/collections'] },
  ]

  const isActive = (link: typeof navLinks[0]) => {
    return link.activeMatch.some(match => pathname.startsWith(match))
  }

  return (
    <>
      <header className={cn(
        "fixed top-0 z-[60] w-full transition-all duration-300",
        isScrolled || isSearchOpen 
          ? "premium-blur border-b border-white/5 py-12" 
          : "bg-transparent py-24"
      )}>
        <div className="container mx-auto px-16 flex items-center justify-between">
          <div className="flex items-center gap-48">
            <Link href="/" className="text-xl font-bold tracking-tighter text-foreground uppercase hover:opacity-80 transition-opacity">
              KHOJ
            </Link>
            <nav className="hidden md:flex items-center gap-32">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive(link) ? 'page' : undefined}
                  className={cn(
                    "relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200",
                    isActive(link) 
                      ? "text-foreground" 
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {link.name}
                  {isActive(link) && (
                    <span className="absolute -bottom-4 left-0 w-full h-[1px] bg-accent/40" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-muted hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full bg-background border-l border-white/5 p-32 flex flex-col pt-64">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-32">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <Link
                          href={link.href}
                          className={cn(
                            "text-2xl font-bold tracking-tight",
                            isActive(link) ? "text-accent" : "text-foreground"
                          )}
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto pt-32 border-t border-white/5">
                    <p className="text-xs text-muted uppercase tracking-widest">Khoj Studio</p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
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
                ref={searchInputRef}
                placeholder="Search products..." 
                className="w-full bg-transparent border-none text-xl md:text-2xl h-16 pl-32 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted/30 text-foreground"
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
