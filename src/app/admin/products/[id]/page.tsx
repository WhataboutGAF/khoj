"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Package, ArrowLeft, Save, Image as ImageIcon, Plus, Trash2, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase'
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates'
import { doc, collection } from 'firebase/firestore'
import Link from 'next/link'
import { Product } from '@/lib/types'

export default function ProductForm() {
  const { id } = useParams()
  const router = useRouter()
  const db = useFirestore()
  const isNew = id === 'new'

  const productRef = useMemoFirebase(() => {
    if (!db || isNew || !id) return null
    return doc(db, 'products', id as string)
  }, [db, isNew, id])

  const { data: productData, isLoading } = useDoc<Product>(productRef)

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: 'jeans',
    isVisible: true,
    images: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
  })

  // State for comma-separated inputs
  const [imagesInput, setImagesInput] = useState('')
  const [sizesInput, setSizesInput] = useState('')
  const [colorsInput, setColorsInput] = useState('')

  useEffect(() => {
    if (productData) {
      setForm({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price || 0,
        originalPrice: productData.originalPrice || 0,
        category: productData.category || 'jeans',
        isVisible: productData.isVisible ?? true,
        images: productData.images || [],
        sizes: productData.sizes || [],
        colors: productData.colors || [],
      })
      setImagesInput(productData.images?.join(', ') || '')
      setSizesInput(productData.sizes?.join(', ') || '')
      setColorsInput(productData.colors?.join(', ') || '')
    }
  }, [productData])

  const handleSave = () => {
    if (!db) return
    
    const targetId = isNew ? doc(collection(db, 'products')).id : id as string
    const docRef = doc(db, 'products', targetId)
    
    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      images: imagesInput.split(',').map(i => i.trim()).filter(Boolean),
      sizes: sizesInput.split(',').map(s => s.trim()).filter(Boolean),
      colors: colorsInput.split(',').map(c => c.trim()).filter(Boolean),
      createdAt: productData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setDocumentNonBlocking(docRef, payload, { merge: true })
    router.push('/admin/products')
  }

  if (!isNew && isLoading) return <div className="p-32 text-muted uppercase text-[10px] font-bold tracking-widest">Retrieving piece...</div>

  return (
    <div className="min-h-screen bg-[#0B0D12] p-16 md:p-32 space-y-32">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/products" 
          className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Catalog
        </Link>
        <Button 
          className="bg-accent text-background h-10 px-24 rounded-lg font-bold uppercase text-[10px] tracking-widest"
          onClick={handleSave}
        >
          <Save className="w-4 h-4" /> Save Piece
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-32">
        <div className="lg:col-span-8 space-y-32">
          <Card className="p-24 bg-card/30 border-white/5 space-y-32">
            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Piece Name</Label>
              <Input 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="bg-background border-white/10 h-14 text-xl font-bold tracking-tight"
                placeholder="e.g. Archival Straight Denim"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-24">
              <div className="space-y-8">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Category</Label>
                <Input 
                  value={form.category} 
                  onChange={(e) => setForm({...form, category: e.target.value.toLowerCase()})}
                  className="bg-background border-white/10 h-12"
                  placeholder="jeans, shorts, or pants"
                />
              </div>
              <div className="space-y-8">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Price (NPR)</Label>
                <Input 
                  type="number"
                  value={form.price} 
                  onChange={(e) => setForm({...form, price: Number(e.target.value)})}
                  className="bg-background border-white/10 h-12 font-mono"
                />
              </div>
            </div>

            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Description</Label>
              <Textarea 
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                className="bg-background border-white/10 min-h-[160px] text-sm leading-relaxed"
                placeholder="Describe the silhouette, fabric weight, and construction details..."
              />
            </div>
          </Card>

          <Card className="p-24 bg-card/30 border-white/5 space-y-24">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-8">
              <ImageIcon className="w-4 h-4" /> Visual Assets
            </h3>
            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Image URLs (comma separated)</Label>
              <Textarea 
                value={imagesInput}
                onChange={(e) => setImagesInput(e.target.value)}
                className="bg-background border-white/10 min-h-[100px] text-xs font-mono"
                placeholder="https://images.unsplash.com/photo-1..., https://images.unsplash.com/photo-2..."
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-32">
          <Card className="p-24 bg-card/30 border-white/5 space-y-24">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Visibility</Label>
              <Switch 
                checked={form.isVisible}
                onCheckedChange={(val) => setForm({...form, isVisible: val})}
              />
            </div>

            <div className="space-y-8 pt-16 border-t border-white/5">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Original Price (For Sales)</Label>
              <Input 
                type="number"
                value={form.originalPrice}
                onChange={(e) => setForm({...form, originalPrice: Number(e.target.value)})}
                className="bg-background border-white/10 h-10 text-sm font-mono"
                placeholder="0"
              />
            </div>
          </Card>

          <Card className="p-24 bg-card/30 border-white/5 space-y-24">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted border-b border-white/5 pb-8">Specifications</h3>
            
            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Dimensions (Sizes)</Label>
              <Input 
                value={sizesInput}
                onChange={(e) => setSizesInput(e.target.value)}
                className="bg-background border-white/10 h-10 text-xs"
                placeholder="30, 32, 34, 36"
              />
            </div>

            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Palette (Colors)</Label>
              <Input 
                value={colorsInput}
                onChange={(e) => setColorsInput(e.target.value)}
                className="bg-background border-white/10 h-10 text-xs"
                placeholder="Indigo, Midnight Black, Raw Wash"
              />
            </div>
          </Card>
          
          <div className="p-16 bg-accent/5 rounded-2xl border border-accent/10 flex flex-col gap-8">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-accent/60">System Log</p>
            <p className="text-[10px] font-bold text-muted leading-tight">
              Changes will propagate to the public catalog immediately upon saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
