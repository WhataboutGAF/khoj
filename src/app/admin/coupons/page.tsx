"use client"

import { useState } from 'react'
import { Tag, Plus, Trash2, Edit2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { COUPONS } from '@/lib/mock-data'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState(COUPONS)

  return (
    <div className="min-h-screen bg-secondary p-32 space-y-32">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-12">
            <Tag className="w-8 h-8 text-primary" /> Coupon Management
          </h1>
          <p className="text-muted">Create and manage discount codes for your customers.</p>
        </div>
        <Button className="bg-primary text-white h-11 px-24 rounded-lg flex items-center gap-8 shadow-subtle">
          <Plus className="w-4 h-4" /> Create Coupon
        </Button>
      </div>

      <div className="flex items-center gap-16">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-12 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input placeholder="Search codes..." className="pl-36 bg-white border-none shadow-subtle h-11" />
        </div>
      </div>

      <Card className="border-none shadow-subtle overflow-hidden">
        <Table>
          <TableHeader className="bg-white border-b border-border">
            <TableRow>
              <TableHead className="font-bold uppercase text-xs tracking-wider">Code</TableHead>
              <TableHead className="font-bold uppercase text-xs tracking-wider">Type</TableHead>
              <TableHead className="font-bold uppercase text-xs tracking-wider">Value</TableHead>
              <TableHead className="font-bold uppercase text-xs tracking-wider">Status</TableHead>
              <TableHead className="font-bold uppercase text-xs tracking-wider">Expiry</TableHead>
              <TableHead className="text-right font-bold uppercase text-xs tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {coupons.map((coupon) => (
              <TableRow key={coupon.id} className="hover:bg-secondary/30 transition-colors">
                <TableCell className="font-bold text-primary">{coupon.code}</TableCell>
                <TableCell className="text-xs uppercase text-muted font-semibold">{coupon.type}</TableCell>
                <TableCell className="font-semibold">
                  {coupon.type === 'percent' ? `${coupon.value}%` : `₹${coupon.value}`}
                </TableCell>
                <TableCell>
                  <Badge variant={coupon.isActive ? "secondary" : "destructive"} className="px-12 py-4 rounded-md">
                    {coupon.isActive ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted">{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-8">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted hover:text-primary">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted hover:text-destructive">
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