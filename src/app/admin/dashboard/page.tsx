
"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Package, 
  Tag, 
  BarChart3, 
  LogOut,
  ChevronRight,
  Plus,
  FileText,
  Menu,
  X,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy, limit } from 'firebase/firestore'
import { Product, Post } from '@/lib/types'

export default function AdminDashboard() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const db = useFirestore()

  // Fetch real data for stats and lists
  const productsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  }, [db])
  const { data: products, isLoading: productsLoading } = useCollection<Product>(productsQuery)

  const recentProductsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(3))
  }, [db])
  const { data: recentProducts } = useCollection<Product>(recentProductsQuery)

  const postsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
  }, [db])
  const { data: posts, isLoading: postsLoading } = useCollection<Post>(postsQuery)

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('is_khoj_admin')
    if (!isAdmin) {
      router.push('/justvibing')
    }
  }, [router])

  const handleSignOut = () => {
    sessionStorage.removeItem('is_khoj_admin')
    router.push('/justvibing')
  }

  const links = [
    { name: 'Overview', href: '/admin/dashboard', icon: BarChart3 },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Coupons', href: '/admin/coupons', icon: Tag },
    { name: 'Journal', href: '/admin/journal', icon: FileText },
  ]

  const SidebarContent = () => (
    <>
      <div className="mb-48 px-12">
        <h2 className="text-xl font-bold tracking-tighter text-foreground uppercase flex items-center">
          KHOJ <span className="text-[10px] bg-accent/20 text-accent px-8 py-2 rounded-md ml-8 font-black">ADMIN</span>
        </h2>
      </div>
      
      <nav className="flex-1 space-y-4">
        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "flex items-center gap-12 px-16 py-12 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all",
              pathname === link.href 
                ? "bg-accent text-background shadow-lg shadow-accent/20" 
                : "text-muted hover:text-foreground hover:bg-white/5"
            )}
          >
            <link.icon className="w-4 h-4" /> {link.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-24 border-t border-white/5 px-12">
        <Button 
          onClick={handleSignOut}
          variant="ghost" 
          className="w-full justify-start text-muted hover:text-destructive hover:bg-destructive/5 gap-12 text-[10px] font-bold uppercase tracking-widest p-0"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-16 bg-card border-b border-white/5 sticky top-0 z-50">
        <h2 className="text-lg font-bold tracking-tighter uppercase">KHOJ</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background p-24 flex flex-col pt-64">
          <SidebarContent />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-card border-r border-white/5 flex-col p-24 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-24 md:p-64 space-y-48">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Command Center</h1>
            <p className="text-muted text-sm mt-4 font-medium opacity-60">Manage your high-end storefront operations.</p>
          </div>
          <div className="flex flex-wrap gap-12">
            <Button asChild variant="outline" className="border-white/10 bg-white/5 rounded-xl px-20 h-12 flex items-center gap-8 font-bold uppercase text-[10px] tracking-widest">
              <Link href="/admin/journal/new">
                <Plus className="w-3 h-3" /> New Entry
              </Link>
            </Button>
            <Button asChild className="bg-accent text-background rounded-xl px-24 h-12 flex items-center gap-8 font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-accent/20">
              <Link href="/admin/products/new">
                <Plus className="w-3 h-3" /> Add Piece
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24">
          <Card className="border border-white/5 bg-card/40 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden group">
            <CardHeader className="pb-12">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Total Volume</CardTitle>
                <BarChart3 className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold tracking-tighter">₹1,24,500</div>
              <div className="mt-8 flex items-center gap-8">
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest">+12.5%</span>
                <span className="text-[10px] text-muted/40 font-bold uppercase tracking-widest">Growth</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-white/5 bg-card/40 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden group">
            <CardHeader className="pb-12">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Inventory</CardTitle>
                <Package className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold tracking-tighter">
                {productsLoading ? <Loader2 className="w-6 h-6 animate-spin inline" /> : products?.length || 0}
                <span className="text-sm font-medium text-muted ml-8">SKUs</span>
              </div>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-8">
                {products?.filter(p => !p.isVisible).length || 0} drafts • {products?.filter(p => p.isVisible).length || 0} active
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-white/5 bg-card/40 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden group">
            <CardHeader className="pb-12">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Journal</CardTitle>
                <FileText className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold tracking-tighter">
                {postsLoading ? <Loader2 className="w-6 h-6 animate-spin inline" /> : posts?.length || 0}
                <span className="text-sm font-medium text-muted ml-8">Stories</span>
              </div>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-8">
                {posts?.filter(p => p.published).length || 0} published • {posts?.filter(p => !p.published).length || 0} drafts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Grid */}
        <div className="grid lg:grid-cols-2 gap-32">
          <Card className="border border-white/5 bg-card/30 rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-white/5 py-24 px-32">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Recent Catalog</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {productsLoading ? (
                  <div className="p-32 text-center text-muted">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                  </div>
                ) : recentProducts?.length === 0 ? (
                  <div className="p-32 text-center text-muted uppercase text-[10px] font-bold tracking-widest">
                    No items found
                  </div>
                ) : (
                  recentProducts?.map(product => (
                    <Link key={product.id} href={`/admin/products/${product.id}`} className="flex items-center justify-between p-24 hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-20">
                        <div className="w-48 h-48 bg-background rounded-xl border border-white/10 overflow-hidden relative shrink-0">
                          {product.images?.[0] ? (
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-muted font-bold">NO IMG</div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{product.name}</p>
                          <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-2">
                            {product.category} • NPR {product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent transition-all transform group-hover:translate-x-4" />
                    </Link>
                  ))
                )}
              </div>
              <div className="p-20 bg-white/[0.02]">
                <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-accent hover:bg-accent/10 h-10" asChild>
                  <Link href="/admin/products">Full Catalog</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-24">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8 ml-4">System Controls</h3>
            <div className="grid gap-16">
              {[
                { title: 'Inventory Control', sub: 'Adjust pricing and visibility', icon: Package, href: '/admin/products' },
                { title: 'Journal Archive', sub: 'Draft and edit process stories', icon: FileText, href: '/admin/journal' },
                { title: 'Coupon Manager', sub: 'Manage active discount codes', icon: Tag, href: '/admin/coupons' }
              ].map(item => (
                <Link key={item.title} href={item.href}>
                  <Card className="border border-white/5 bg-card/30 hover:bg-white/5 hover:border-accent/30 transition-all rounded-2xl p-20 flex items-center gap-20 group">
                    <div className="w-40 h-40 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-colors">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">{item.title}</p>
                      <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-2 opacity-50">{item.sub}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
