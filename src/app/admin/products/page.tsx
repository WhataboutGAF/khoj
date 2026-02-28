"use client"

import { useState } from 'react'
import { Package, Plus, Trash2, Edit2, Search, ExternalLink, Image as ImageIcon, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PRODUCTS } from '@/lib/mock-data'
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

export default function AdminProducts() {
  const [products, setProducts] = useState(PRODUCTS)

  return (
    <div className="min-h-screen bg-[#0B0D12] p-16 md:p-32 space-y-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-24">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-12 tracking-tighter">
            <Package className="w-8 h-8 text-accent" /> Catalog Manager
          </h1>
          <p className="text-muted text-sm font-medium">Manage your inventory, prices, and visual content.</p>
        </div>
        <Button className="bg-accent text-background h-12 px-24 rounded-xl flex items-center gap-8 font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-accent/20 hover:scale-[1.02] transition-all">
          <Plus className="w-4 h-4" /> Add New Piece
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-16">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-16 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input 
            placeholder="Search catalog ID or name..." 
            className="pl-44 bg-card/50 border-white/5 h-12 rounded-xl text-sm focus-visible:ring-accent" 
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
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-white/5 transition-colors border-white/5 group">
                  <TableCell className="py-16">
                    <div className="flex items-center gap-16">
                      <div className="relative w-56 h-56 rounded-lg overflow-hidden bg-secondary border border-white/10 shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="space-y-4">
                        <p className="font-bold text-sm text-foreground">{product.name}</p>
                        <p className="text-[9px] text-muted font-bold uppercase tracking-widest flex items-center gap-4">
                          <ImageIcon className="w-3 h-3" /> {product.images.length} Assets • {product.sizes.length} Sizing
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
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-muted hover:text-accent hover:bg-accent/10">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-muted hover:text-destructive hover:bg-destructive/10">
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
        Showing {products.length} of {products.length} catalog items
      </p>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
