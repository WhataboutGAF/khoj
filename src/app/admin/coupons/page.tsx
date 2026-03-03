"use client"

import { useState } from 'react'
import { Tag, Plus, Trash2, Edit2, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy, doc } from 'firebase/firestore'
import { Coupon } from '@/lib/types'
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates'

export default function AdminCoupons() {
  const db = useFirestore()
  const couponsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, 'coupons'), orderBy('isActive', 'desc'))
  }, [db])

  const { data: coupons, isLoading } = useCollection<Coupon>(couponsQuery)
  const [search, setSearch] = useState('')

  const filteredCoupons = coupons?.filter(c => 
    c.code.toLowerCase().includes(search.toLowerCase())
  ) || []

  const handleDelete = (id: string) => {
    if (!db || !confirm('Are you sure you want to remove this coupon?')) return
    deleteDocumentNonBlocking(doc(db, 'coupons', id))
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] p-16 md:p-32 space-y-32">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-12 tracking-tighter">
            <Tag className="w-8 h-8 text-accent" /> Coupon Manager
          </h1>
          <p className="text-muted text-sm font-medium">Create and manage discount codes for your customers.</p>
        </div>
        <Button className="bg-accent text-background h-12 px-24 rounded-xl flex items-center gap-8 font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-accent/20">
          <Plus className="w-4 h-4" /> Create Coupon
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-16 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <Input 
          placeholder="Search codes..." 
          className="pl-44 bg-card/50 border-white/5 h-12 rounded-xl text-sm focus-visible:ring-accent" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="border border-white/5 shadow-2xl overflow-hidden bg-card/30 backdrop-blur-xl rounded-2xl">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/5">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Code</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Type</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Value</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Status</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Expiry</TableHead>
              <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Control</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-64 text-muted"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></TableCell></TableRow>
            ) : filteredCoupons.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-64 text-muted">No coupons found.</TableCell></TableRow>
            ) : filteredCoupons.map((coupon) => (
              <TableRow key={coupon.id} className="hover:bg-white/5 transition-colors border-white/5">
                <TableCell className="font-bold text-accent tracking-widest">{coupon.code}</TableCell>
                <TableCell className="text-[10px] font-bold uppercase text-muted tracking-widest">{coupon.type}</TableCell>
                <TableCell className="font-bold">
                  {coupon.type === 'percent' ? `${coupon.value}%` : `₹${coupon.value}`}
                </TableCell>
                <TableCell>
                  <Badge variant={coupon.isActive ? "secondary" : "destructive"} className={cn(
                    "px-8 py-2 rounded-md text-[8px] font-black uppercase tracking-widest",
                    coupon.isActive ? "bg-accent/10 text-accent border-none" : ""
                  )}>
                    {coupon.isActive ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </TableCell>
                <TableCell className="text-[10px] text-muted font-bold uppercase tracking-widest">{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-4">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted hover:text-accent">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 text-muted hover:text-destructive"
                      onClick={() => handleDelete(coupon.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}