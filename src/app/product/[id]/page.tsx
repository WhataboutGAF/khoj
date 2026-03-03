"use client"

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Check, Info, Plus, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase'
import { doc, collection, query, where, getDocs } from 'firebase/firestore'
import { Product, Coupon } from '@/lib/types'

export default function ProductDetail() {
  const { id } = useParams()
  const db = useFirestore()
  const { toast } = useToast()

  const productRef = useMemoFirebase(() => {
    if (!db || !id) return null
    return doc(db, 'products', id as string)
  }, [db, id])

  const { data: product, isLoading: productLoading } = useDoc<Product>(productRef)

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

  if (productLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-accent" /></div>
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
        toast({
          title: "Coupon Applied",
          description: `Successfully applied code ${coupon.code}`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Coupon",
          description: "Code not recognized or expired.",
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to validate coupon.",
      })
    }
  }

  const handleOrderWhatsApp = () => {
    if (!selectedSize) return

    const message = `Order for ${product.name}
Size: ${selectedSize}
Color: ${selectedColor}
Price: NPR ${finalPrice.toLocaleString()}
Coupon: ${appliedCoupon?.code || 'None'}
URL: ${window.location.href}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/9779800000000?text=${encodedMessage}`, '_blank')
  }

  const handleOrderInstagram = () => {
    if (!selectedSize) return

    const message = `Order for ${product.name}
Size: ${selectedSize}
Color: ${selectedColor}
Price: NPR ${finalPrice.toLocaleString()}
Coupon: ${appliedCoupon?.code || 'None'}
URL: ${window.location.href}`

    navigator.clipboard.writeText(message).then(() => {
      toast({
        title: "Order Copied",
        description: "Message copied. Paste it into Instagram DM.",
      })
      window.open(`https://instagram.com/khoj_82`, '_blank')
    })
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    const colorIndex = product.colors.indexOf(color)
    if (product.images[colorIndex]) {
      setActiveImageIndex(colorIndex)
    }
  }

  return (
    <div className="min-h-screen pb-32">
      <main className="container mx-auto px-16 py-128">
        <div className="grid md:grid-cols-2 gap-48 lg:gap-64">
          <div className="space-y-16">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary border border-white/5">
              <Image 
                src={product.images[activeImageIndex] || product.images[0]} 
                alt={product.name} 
                fill 
                className="object-cover transition-all duration-700"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-12 md:gap-16">
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={cn(
                    "relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary border cursor-pointer transition-all duration-300",
                    activeImageIndex === i ? "border-accent scale-[0.98] ring-1 ring-accent" : "border-white/5 opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-32">
            <div className="space-y-16">
              <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                <span>Khoj Originals</span>
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                <span className="text-muted">{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1]">{product.name}</h1>
              <div className="flex items-baseline gap-16">
                <p className="text-4xl font-bold text-accent">NPR {finalPrice.toLocaleString()}</p>
                {product.originalPrice && (
                  <p className="text-xl text-muted line-through opacity-30">NPR {product.originalPrice.toLocaleString()}</p>
                )}
              </div>
              <p className="text-muted text-lg leading-relaxed max-w-lg font-medium opacity-80">{product.description}</p>
            </div>

            <div className="space-y-40 pt-40 border-t border-white/5">
              <div className="space-y-20">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Dimensions</label>
                  <button className="text-[10px] text-accent font-bold uppercase tracking-widest underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity">Sizing Chart</button>
                </div>
                <div className="flex flex-wrap gap-8">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-12 min-w-[3.5rem] px-12 flex items-center justify-center rounded-xl border text-[11px] font-bold transition-all",
                        selectedSize === size 
                          ? "border-accent bg-accent text-background shadow-xl shadow-accent/20" 
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-20">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Palette</label>
                <div className="flex flex-wrap gap-6">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={cn(
                        "px-10 py-5 rounded-lg border text-[8px] font-black uppercase tracking-[0.15em] transition-all",
                        selectedColor === color 
                          ? "border-accent bg-accent text-background shadow-lg shadow-accent/10" 
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-20">
              {!showCouponInput ? (
                <button 
                  onClick={() => setShowCouponInput(true)}
                  className="text-[10px] font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-8 uppercase tracking-[0.3em] opacity-60 hover:opacity-100"
                >
                  <Plus className="w-3 h-3" /> Insert Code
                </button>
              ) : (
                <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex gap-8">
                    <Input 
                      placeholder="ENTER CODE" 
                      className="h-14 bg-white/5 border-white/10 text-center text-sm font-bold tracking-[0.2em] focus-visible:ring-accent rounded-xl" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button 
                      className="bg-accent text-background font-bold uppercase text-[10px] tracking-[0.2em] px-24 h-14 rounded-xl shadow-xl shadow-accent/10"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-[10px] font-bold text-accent flex items-center gap-8 uppercase tracking-[0.2em]">
                      <Check className="w-4 h-4" /> Code {appliedCoupon.code} confirmed.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-32 space-y-24">
              {!selectedSize && (
                <div className="flex items-center gap-12 p-16 bg-white/5 rounded-xl text-[10px] text-muted uppercase tracking-[0.2em] font-bold border border-dashed border-white/10">
                  <Info className="w-4 h-4 text-accent" />
                  <span>Please choose a dimension to proceed.</span>
                </div>
              )}
              <div className="grid gap-16">
                <Button 
                  onClick={handleOrderWhatsApp}
                  disabled={!selectedSize}
                  className={cn(
                    "w-full h-16 rounded-2xl bg-[#25D366] text-white text-sm font-black uppercase tracking-[0.3em] transition-all duration-500 hover:bg-[#128C7E]",
                    !selectedSize && "opacity-30 grayscale cursor-not-allowed"
                  )}
                >
                  Order via WhatsApp
                </Button>
                <Button 
                  onClick={handleOrderInstagram}
                  disabled={!selectedSize}
                  variant="outline"
                  className={cn(
                    "w-full h-16 rounded-2xl border-white/10 bg-transparent text-sm font-black uppercase tracking-[0.3em] transition-all duration-500 hover:bg-white/5",
                    !selectedSize && "opacity-30 grayscale cursor-not-allowed"
                  )}
                >
                  Order via Instagram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 premium-blur border-t border-white/5 p-16 transition-all duration-700 transform",
        isScrolled ? "translate-y-0 opacity-100 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]" : "translate-y-full opacity-0"
      )}>
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-24">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Settlement</span>
            <span className="text-3xl font-bold text-accent">NPR {finalPrice.toLocaleString()}</span>
          </div>
          <Button 
            onClick={handleOrderWhatsApp}
            className={cn(
              "px-40 h-16 rounded-2xl bg-primary text-background font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500",
              !selectedSize && "opacity-40"
            )}
          >
            {selectedSize ? "Confirm Order" : "Select Dimension"}
          </Button>
        </div>
      </div>
    </div>
  )
}