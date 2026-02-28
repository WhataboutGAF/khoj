
"use client"

import { useState } from 'react'
import { Package, Plus, Trash2, Edit2, Search, ExternalLink, Image as ImageIcon, Filter, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
import Image from 'next/image'
import Link from 'next/link'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy, doc } from 'firebase/firestore'
import { Product } from '@/lib/types'
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates'
import { cn } from '@/lib/utils'

export default function AdminProducts() {
  const db = useFirestore()
  const productsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  }, [db])

  const { data: products, isLoading } = useCollection<Product>(productsQuery)
  const [search, setSearch] = useState('')

  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (!db || !confirm('Are you sure you want to delete this piece?')) return
    deleteDocumentNonBlocking(doc(db, 'products', id))
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] p-16 md:p-32 space-y-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-24">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-12 tracking-tighter">
            <Package className="w-8 h-8 text-accent" /> Catalog Manager
          </h1>
          <p className="text-muted text-sm font-medium">Manage your inventory, prices, and visual content.</p>
        </div>
        <Button asChild className="bg-accent text-background h-12 px-24 rounded-xl flex items-center gap-8 font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-accent/20 hover:scale-[1.02] transition-all">
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4" /> Add New Piece
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-16">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-16 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input 
            placeholder="Search catalog ID or name..." 
            className="pl-44 bg-card/50 border-white/5 h-12 rounded-xl text-sm focus-visible:ring-accent" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto h-12 rounded-xl border-white/5 bg-card/50 px-16 gap-8 text-[10px] font-bold uppercase tracking-widest">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      <Card className="border border-white/5 shadow-2xl overflow-hidden bg-card/30 backdrop-blur-xl rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/5">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Product & Detail</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Category</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Price (NPR)</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Status</TableHead>
                <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-64 text-muted"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-8" /> Loading catalog...</TableCell></TableRow>
              ) : filteredProducts?.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-64 text-muted">No pieces found.</TableCell></TableRow>
              ) : filteredProducts?.map((product) => (
                <TableRow key={product.id} className="hover:bg-white/5 transition-colors border-white/5 group">
                  <TableCell className="py-16">
                    <div className="flex items-center gap-16">
                      <div className="relative w-56 h-56 rounded-lg overflow-hidden bg-secondary border border-white/10 shrink-0">
                        {product.images?.[0] ? (
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[8px] text-muted">NO IMG</div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <p className="font-bold text-sm text-foreground">{product.name}</p>
                        <p className="text-[9px] text-muted font-bold uppercase tracking-widest flex items-center gap-4">
                          <ImageIcon className="w-3 h-3" /> {product.images?.length || 0} Assets • {product.sizes?.length || 0} Sizing
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-[0.15em] border-white/10 px-10 py-4">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-accent text-sm">
                    {product.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-8">
                      <div className={cn(
                        "w-6 h-6 rounded-full animate-pulse",
                        product.isVisible ? "bg-accent" : "bg-destructive"
                      )} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        {product.isVisible ? "Published" : "Draft"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-4">
                      <Button asChild variant="ghost" size="icon" className="h-10 w-10 text-muted hover:text-accent hover:bg-accent/10">
                        <Link href={`/product/${product.id}`} target="_blank"><ExternalLink className="w-4 h-4" /></Link>
                      </Button>
                      <Button asChild variant="ghost" size="icon" className="h-10 w-10 text-muted hover:text-accent hover:bg-accent/10">
                        <Link href={`/admin/products/${product.id}`}><Edit2 className="w-4 h-4" /></Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 text-muted hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <p className="text-center text-[10px] text-muted font-bold uppercase tracking-[0.2em] opacity-40">
        Showing {filteredProducts?.length || 0} catalog items
      </p>
    </div>
  )
}
