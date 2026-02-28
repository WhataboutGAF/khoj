
"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Package, 
  Tag, 
  Settings, 
  BarChart3, 
  Users, 
  LogOut,
  ChevronRight,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AdminDashboard() {
  const router = useRouter()

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

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-white/5 flex flex-col p-24">
        <div className="mb-48">
          <h2 className="text-xl font-bold tracking-tighter text-foreground uppercase">
            KHOJ <span className="text-[8px] bg-accent/10 text-accent px-6 py-2 rounded ml-4 font-bold">ADMIN</span>
          </h2>
        </div>
        
        <nav className="flex-1 space-y-4">
          <Link href="/admin/dashboard" className="flex items-center gap-12 px-12 py-10 bg-accent/10 text-accent rounded-lg text-xs font-bold uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" /> Overview
          </Link>
          <Link href="/admin/products" className="flex items-center gap-12 px-12 py-10 text-muted hover:text-foreground hover:bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
            <Package className="w-4 h-4" /> Products
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-12 px-12 py-10 text-muted hover:text-foreground hover:bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
            <Tag className="w-4 h-4" /> Coupons
          </Link>
          <Link href="#" className="flex items-center gap-12 px-12 py-10 text-muted hover:text-foreground hover:bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
            <Users className="w-4 h-4" /> Customers
          </Link>
        </nav>

        <div className="pt-24 border-t border-white/5">
          <Button 
            onClick={handleSignOut}
            variant="ghost" 
            className="w-full justify-start text-muted hover:text-destructive hover:bg-destructive/5 gap-12 text-xs font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-24 md:p-48 space-y-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-16">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted text-sm mt-4">Command center for your storefront operations.</p>
          </div>
          <Button asChild className="bg-accent text-background rounded-xl px-24 h-12 flex items-center gap-8 font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-accent/10">
            <Link href="/admin/products">
              <Plus className="w-4 h-4" /> New Piece
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24">
          <Card className="border border-white/5 bg-card/50 shadow-2xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-12">
              <CardTitle className="text-[10px] font-bold text-muted uppercase tracking-widest">Total Revenue</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹1,24,500</div>
              <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-8 flex items-center gap-4">
                +12.5% <span className="text-muted/40 text-[8px]">vs last month</span>
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-white/5 bg-card/50 shadow-2xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-12">
              <CardTitle className="text-[10px] font-bold text-muted uppercase tracking-widest">Active Pieces</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Package className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">48</div>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-8">
                6 items require restock
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-white/5 bg-card/50 shadow-2xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-12">
              <CardTitle className="text-[10px] font-bold text-muted uppercase tracking-widest">Pending Orders</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-[10px] text-destructive font-bold uppercase tracking-widest mt-8 animate-pulse">
                Attention Required
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Actions */}
        <div className="grid lg:grid-cols-2 gap-32">
          <Card className="border border-white/5 bg-card/50 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-white/5 py-20">
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Recent Inventory</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-16 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-16">
                      <div className="w-40 h-40 bg-background rounded-lg border border-white/5"></div>
                      <div>
                        <p className="text-sm font-bold">Premium Piece - V{i}</p>
                        <p className="text-[9px] text-muted font-bold uppercase tracking-widest">Apparel • ₹4,500</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                  </div>
                ))}
              </div>
              <div className="p-12 border-t border-white/5 bg-white/5">
                <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-accent hover:bg-accent/10" asChild>
                  <Link href="/admin/products">View Full Catalog</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/5 bg-card/50 shadow-2xl rounded-2xl">
            <CardHeader className="border-b border-white/5 py-20">
              <CardTitle className="text-sm font-bold uppercase tracking-widest">System Shortcuts</CardTitle>
            </CardHeader>
            <CardContent className="py-24 space-y-16">
              <Button asChild variant="outline" className="w-full justify-start gap-12 border-white/10 bg-white/5 h-14 rounded-xl hover:border-accent/40 transition-all">
                <Link href="/admin/products" className="flex items-center gap-12 w-full">
                  <Package className="w-4 h-4 text-accent" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest">Manage Inventory</p>
                    <p className="text-[8px] text-muted">Update prices and visibility</p>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-12 border-white/10 bg-white/5 h-14 rounded-xl hover:border-accent/40 transition-all">
                <Link href="/admin/coupons" className="flex items-center gap-12 w-full">
                  <Tag className="w-4 h-4 text-accent" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest">Coupon Control</p>
                    <p className="text-[8px] text-muted">Active and expired codes</p>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-12 border-white/10 bg-white/5 h-14 rounded-xl hover:border-accent/40 transition-all">
                <Link href="#" className="flex items-center gap-12 w-full">
                  <Settings className="w-4 h-4 text-accent" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest">Store Settings</p>
                    <p className="text-[8px] text-muted">Business and API keys</p>
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
