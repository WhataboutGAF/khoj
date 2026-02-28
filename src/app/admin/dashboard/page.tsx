"use client"

import Link from 'next/link'
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
  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col p-24 hidden md:flex">
        <div className="mb-48">
          <h2 className="text-2xl font-bold tracking-tighter">KHOJ <span className="text-xs bg-white/20 px-8 py-2 rounded ml-8">ADMIN</span></h2>
        </div>
        
        <nav className="flex-1 space-y-8">
          <Link href="/admin/dashboard" className="flex items-center gap-12 px-12 py-8 bg-white/10 rounded-lg font-medium">
            <BarChart3 className="w-5 h-5" /> Overview
          </Link>
          <Link href="/admin/products" className="flex items-center gap-12 px-12 py-8 hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-12 px-12 py-8 hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Tag className="w-5 h-5" /> Coupons
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-12 px-12 py-8 hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" /> Customers
          </Link>
        </nav>

        <div className="pt-24 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white hover:bg-white/5 gap-12">
            <LogOut className="w-5 h-5" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-32 space-y-32">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted">Welcome back. Here is what is happening today.</p>
          </div>
          <div className="flex gap-12">
            <Button className="bg-accent text-white rounded-lg px-24 h-11 flex items-center gap-8">
              <Plus className="w-4 h-4" /> New Product
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-24">
          <Card className="border-none shadow-subtle">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <CardTitle className="text-sm font-medium text-muted uppercase">Total Revenue</CardTitle>
              <BarChart3 className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,24,500</div>
              <p className="text-xs text-green-500 font-medium">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-subtle">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <CardTitle className="text-sm font-medium text-muted uppercase">Active Products</CardTitle>
              <Package className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted">6 out of stock</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-subtle">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <CardTitle className="text-sm font-medium text-muted uppercase">Orders Pending</CardTitle>
              <Users className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-orange-500 font-medium">Attention required</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Actions */}
        <div className="grid md:grid-cols-2 gap-32">
          <Card className="border-none shadow-subtle">
            <CardHeader className="border-b border-border">
              <CardTitle>Recent Products</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-16 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-12">
                      <div className="w-48 h-48 bg-secondary rounded-lg"></div>
                      <div>
                        <p className="text-sm font-bold">Premium Tee - V{i}</p>
                        <p className="text-xs text-muted">Apparel • ₹4,500</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted" />
                  </div>
                ))}
              </div>
              <div className="p-12 border-t border-border">
                <Button variant="ghost" className="w-full text-xs font-bold text-accent">View All Products</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-subtle">
            <CardHeader className="border-b border-border">
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="py-16 space-y-12">
              <Button asChild variant="outline" className="w-full justify-start gap-12 border-border h-12">
                <Link href="/admin/products"><Package className="w-4 h-4" /> Manage Inventory</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-12 border-border h-12">
                <Link href="/admin/coupons"><Tag className="w-4 h-4" /> Coupon Management</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-12 border-border h-12">
                <Link href="/admin/settings"><Settings className="w-4 h-4" /> Store Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}