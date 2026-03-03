
"use client"

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Check, Info, Plus, Loader2, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useFirestore, useDoc, useMemoFirebase, useUser } from '@/firebase'
import { doc, collection, query, where, getDocs } from 'firebase/firestore'
import { Product, Coupon } from '@/lib/types'

// Dummy product for testing purposes
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

  // Use dummy product if ID matches
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

  const generateOrderMessage = () => {
    return `Order for ${product.name}
Size: ${selectedSize}
Color: ${selectedColor}
Price: NPR ${finalPrice.toLocaleString()}
Coupon: ${appliedCoupon?.code || 'None'}
URL: ${window.location.href}`
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
      toast({
        title: "Order Copied",
        description: "Details copied to clipboard. Paste them in our Instagram DM.",
      })
      window.open(`https://instagram.com/khoj_82`, '_blank')
    }).catch(() => {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Please copy the details manually.",
      })
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
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary border border-white/5 shadow-2xl">
              <Image 
                src={product.images[activeImageIndex] || product.images[0]} 
                alt={product.name} 
                fill 
                className="object-cover transition-all duration-700"
                priority
              />
              {id === 'demo-jeans' && (
                <div className="absolute top-16 left-16 bg-accent text-background px-12 py-4 rounded-full text-[8px] font-black uppercase tracking-widest">
                  Test Piece
                </div>
              )}
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

          <div className="space-y-24">
            <div className="space-y-12">
              <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                <span>Khoj Originals</span>
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                <span className="text-muted">{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">{product.name}</h1>
              <div className="flex items-baseline gap-12">
                <p className="text-3xl font-bold text-accent">NPR {finalPrice.toLocaleString()}</p>
                {product.originalPrice && (
                  <p className="text-lg text-muted line-through opacity-30">NPR {product.originalPrice.toLocaleString()}</p>
                )}
              </div>
              <p className="text-muted text-base leading-relaxed max-w-lg opacity-80">{product.description}</p>
            </div>

            <div className="space-y-24 pt-24 border-t border-white/5">
              <div className="space-y-12">
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
                        "h-10 min-w-[3rem] px-8 flex items-center justify-center rounded-lg border text-[11px] font-bold transition-all",
                        selectedSize === size 
                          ? "border-accent bg-accent text-background" 
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Palette</label>
                <div className="flex flex-wrap gap-6">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={cn(
                        "px-8 py-4 rounded-md border text-[8px] font-black uppercase tracking-[0.15em] transition-all",
                        selectedColor === color 
                          ? "border-accent bg-accent text-background" 
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-16">
              {!showCouponInput ? (
                <button 
                  onClick={() => setShowCouponInput(true)}
                  className="text-[10px] font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-8 uppercase tracking-[0.3em] opacity-60 hover:opacity-100"
                >
                  <Plus className="w-3 h-3" /> Apply Coupon
                </button>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex gap-8">
                    <Input 
                      placeholder="ENTER CODE" 
                      className="h-10 bg-white/5 border-white/10 text-center text-xs font-bold tracking-[0.2em] focus-visible:ring-accent rounded-lg" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button 
                      className="bg-accent text-background font-bold uppercase text-[9px] tracking-[0.2em] px-16 h-10 rounded-lg"
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

            <div className="pt-16 space-y-16">
              {!selectedSize && (
                <div className="flex items-center gap-12 p-12 bg-white/5 rounded-lg text-[9px] text-muted uppercase tracking-[0.2em] font-bold border border-dashed border-white/10">
                  <Info className="w-3 h-3 text-accent" />
                  <span>Please choose a dimension to proceed.</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-12">
                <Button 
                  onClick={handleOrderWhatsApp}
                  disabled={!selectedSize}
                  className={cn(
                    "w-full h-14 rounded-xl bg-[#25D366] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#128C7E]",
                    !selectedSize && "opacity-30 grayscale cursor-not-allowed"
                  )}
                >
                  WhatsApp
                </Button>
                <Button 
                  onClick={handleOrderInstagram}
                  disabled={!selectedSize}
                  variant="outline"
                  className={cn(
                    "w-full h-14 rounded-xl border-white/10 bg-transparent text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-8",
                    !selectedSize && "opacity-30 grayscale cursor-not-allowed"
                  )}
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 premium-blur border-t border-white/5 p-12 transition-all duration-500 transform",
        isScrolled ? "translate-y-0 opacity-100 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]" : "translate-y-full opacity-0"
      )}>
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-16">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-muted uppercase tracking-[0.2em]">Settlement</span>
            <span className="text-2xl font-bold text-accent">NPR {finalPrice.toLocaleString()}</span>
          </div>
          <Button 
            onClick={handleOrderWhatsApp}
            className={cn(
              "px-32 h-14 rounded-xl bg-primary text-background font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300",
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
