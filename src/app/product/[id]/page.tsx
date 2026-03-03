"use client"

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Check, Info, Plus, Loader2, Instagram, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useFirestore, useDoc, useMemoFirebase, useUser } from '@/firebase'
import { doc, collection, query, where, getDocs } from 'firebase/firestore'
import { Product, Coupon } from '@/lib/types'

const DUMMY_JEANS: Product = {
  id: 'demo-jeans',
  name: 'Archival Raw Denim',
  description: 'A test piece crafted for functionality testing. Heavy-weight 14oz Japanese selvedge denim with a structured straight-leg silhouette.',
  price: 4800,
  originalPrice: 6200,
  images: [
    'https://picsum.photos/seed/denim1/800/1000',
    'https://picsum.photos/seed/denim2/800/1000',
    'https://picsum.photos/seed/denim3/800/1000'
  ],
  sizes: ['30', '32', '34', '36'],
  colors: ['Indigo', 'Midnight Black'],
  category: 'jeans',
  isVisible: true,
  createdAt: new Date().toISOString(),
}

export default function ProductDetail() {
  const { id } = useParams()
  const db = useFirestore()
  const { toast } = useToast()
  const { isUserLoading } = useUser()

  const productRef = useMemoFirebase(() => {
    if (!db || !id || id === 'demo-jeans') return null
    return doc(db, 'products', id as string)
  }, [db, id])

  const { data: firestoreProduct, isLoading: productLoading } = useDoc<Product>(productRef)
  const product = id === 'demo-jeans' ? DUMMY_JEANS : firestoreProduct

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0])
    }
  }, [product])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const finalPrice = useMemo(() => {
    if (!product) return 0
    if (!appliedCoupon) return product.price
    return product.price - appliedCoupon.discount
  }, [product, appliedCoupon])

  const showLoading = (productLoading && id !== 'demo-jeans') || isUserLoading

  if (showLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-accent" /></div>
  if (!product) return <div className="min-h-screen flex items-center justify-center text-muted">Product not found</div>

  const handleApplyCoupon = async () => {
    if (!db) return
    try {
      const q = query(collection(db, 'coupons'), where('code', '==', couponCode.toUpperCase()), where('isActive', '==', true))
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        const coupon = snapshot.docs[0].data() as Coupon
        let discount = 0
        if (coupon.type === 'percent') {
          discount = (product.price * coupon.value) / 100
        } else {
          discount = coupon.value
        }
        setAppliedCoupon({ code: coupon.code, discount })
        toast({ title: "Coupon Applied", description: `Successfully applied code ${coupon.code}` })
      } else {
        toast({ variant: "destructive", title: "Invalid Coupon", description: "Code not recognized or expired." })
      }
    } catch (err) {
      console.error(err)
      toast({ variant: "destructive", title: "Error", description: "Failed to validate coupon." })
    }
  }

  const generateOrderMessage = () => {
    return `Order for ${product.name}\nSize: ${selectedSize}\nColor: ${selectedColor}\nPrice: NPR ${finalPrice.toLocaleString()}\nCoupon: ${appliedCoupon?.code || 'None'}\nURL: ${window.location.href}`
  }

  const handleOrderWhatsApp = () => {
    if (!selectedSize) return
    const message = generateOrderMessage()
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/9779800000000?text=${encodedMessage}`, '_blank')
  }

  const handleOrderInstagram = () => {
    if (!selectedSize) return
    const message = generateOrderMessage()
    navigator.clipboard.writeText(message).then(() => {
      toast({ title: "Order Details Copied", description: "Details copied. Paste them in our Instagram DM." })
      window.open(`https://instagram.com/khoj_82`, '_blank')
    }).catch(() => {
      toast({ variant: "destructive", title: "Copy Failed", description: "Please copy the details manually." })
    })
  }

  return (
    <div className="min-h-screen pb-64">
      <main className="container mx-auto px-16 py-96 md:py-160">
        <div className="grid md:grid-cols-2 gap-32 lg:gap-64">
          {/* Visuals Section */}
          <div className="space-y-16">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary border border-white/5 shadow-2xl">
              <Image 
                src={product.images[activeImageIndex] || product.images[0]} 
                alt={product.name} 
                fill 
                className="object-cover transition-all duration-700"
                priority
              />
              {id === 'demo-jeans' && (
                <div className="absolute top-16 left-16 bg-accent text-background px-12 py-4 rounded-full text-[8px] font-black uppercase tracking-widest">
                  Demo Piece
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-8 md:gap-12">
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={cn(
                    "relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary border cursor-pointer transition-all duration-300",
                    activeImageIndex === i ? "border-accent scale-[0.98] ring-1 ring-accent" : "border-white/5 opacity-40 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-16">
            <div className="space-y-4">
              <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                <span>Khoj Studio</span>
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                <span className="text-muted">{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">{product.name}</h1>
              <div className="flex items-baseline gap-12">
                <p className="text-3xl font-bold text-accent">NPR {finalPrice.toLocaleString()}</p>
                {product.originalPrice && (
                  <p className="text-lg text-muted line-through opacity-20">NPR {product.originalPrice.toLocaleString()}</p>
                )}
              </div>
              <p className="text-muted text-sm md:text-base leading-relaxed max-w-lg opacity-70">{product.description}</p>
            </div>

            <div className="space-y-6 pt-16 border-t border-white/5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Dimension</label>
                  <a 
                    href="https://jeans.com/pages/womens-jeans-size-chart?srsltid=AfmBOorCsIj1rICyNYjVY6lDFaQpG9WVa5lA6eJoycUS6l1alFgL0bN6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] text-accent font-bold uppercase tracking-widest underline underline-offset-4 opacity-40 hover:opacity-100 transition-opacity"
                  >
                    Sizing Guide
                  </a>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-10 min-w-[3.5rem] px-10 flex items-center justify-center rounded-xl border text-[11px] font-bold transition-all",
                        selectedSize === size 
                          ? "border-accent bg-accent text-background shadow-lg shadow-accent/20" 
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Palette</label>
                <div className="flex flex-wrap gap-4">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-10 py-4 rounded-lg border text-[9px] font-bold uppercase tracking-[0.1em] transition-all",
                        selectedColor === color 
                          ? "border-accent bg-accent/10 text-accent" 
                          : "border-white/10 hover:border-white/30 bg-white/5 text-muted"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="py-2 border-t border-white/5 pt-16">
                {!showCouponInput ? (
                  <button 
                    onClick={() => setShowCouponInput(true)}
                    className="text-[10px] font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-8 uppercase tracking-[0.3em] opacity-40 hover:opacity-100"
                  >
                    <Plus className="w-3 h-3" /> Add Coupon
                  </button>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 max-w-xs">
                    <div className="flex gap-8">
                      <Input 
                        placeholder="COUPON CODE" 
                        className="h-10 bg-white/5 border-white/10 text-center text-[10px] font-bold tracking-[0.2em] focus-visible:ring-accent rounded-xl" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      />
                      <Button 
                        className="bg-accent text-background font-bold uppercase text-[9px] tracking-[0.2em] px-16 h-10 rounded-xl shadow-lg shadow-accent/10"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                    {appliedCoupon && (
                      <p className="text-[9px] font-bold text-accent flex items-center gap-6 uppercase tracking-[0.2em]">
                        <Check className="w-3 h-3" /> Code {appliedCoupon.code} confirmed.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {!selectedSize ? (
                  <div className="flex items-center gap-12 p-10 bg-accent/5 rounded-xl text-[9px] text-accent uppercase tracking-[0.2em] font-bold border border-accent/10">
                    <Info className="w-3 h-3" />
                    <span>Choose a dimension to reveal order options.</span>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <p className="text-[8px] font-bold text-muted uppercase tracking-[0.3em] text-center opacity-40">These buttons are for placing orders</p>
                      <div className="grid grid-cols-2 gap-12">
                        <Button 
                          onClick={handleOrderWhatsApp}
                          className="h-14 rounded-2xl bg-[#25D366] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#128C7E] flex items-center justify-center gap-8 shadow-xl shadow-[#25D366]/10"
                        >
                          <Send className="w-4 h-4" /> WhatsApp
                        </Button>
                        <Button 
                          onClick={handleOrderInstagram}
                          variant="outline"
                          className="h-14 rounded-2xl border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-8"
                        >
                          <Instagram className="w-4 h-4" /> Instagram
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Bar for Mobile/Scroll */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 premium-blur border-t border-white/5 p-16 transition-all duration-500 transform",
        isScrolled ? "translate-y-0 opacity-100 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]" : "translate-y-full opacity-0"
      )}>
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-16">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-muted uppercase tracking-[0.2em]">Price Total</span>
            <span className="text-2xl font-bold text-accent">NPR {finalPrice.toLocaleString()}</span>
          </div>
          <Button 
            onClick={handleOrderWhatsApp}
            className={cn(
              "px-32 h-14 rounded-2xl bg-primary text-background font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-xl",
              !selectedSize && "opacity-40"
            )}
          >
            {selectedSize ? "Order Now" : "Select Size"}
          </Button>
        </div>
      </div>
    </div>
  )
}
