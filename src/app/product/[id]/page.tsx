"use client"

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { PRODUCTS, COUPONS } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Check, Info, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

export default function ProductDetail() {
  const { id } = useParams()
  const product = PRODUCTS.find(p => p.id === id)
  const { toast } = useToast()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || '')
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

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

  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>

  const handleApplyCoupon = () => {
    const coupon = COUPONS.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive)
    if (coupon) {
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
        description: "Code not recognized.",
      })
    }
  }

  const handleOrder = () => {
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

  return (
    <div className="min-h-screen pb-32">
      <main className="container mx-auto px-16 py-128">
        <div className="grid md:grid-cols-2 gap-48 lg:gap-64">
          {/* Image Gallery */}
          <div className="space-y-16">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
                data-ai-hint="fashion clothes"
              />
            </div>
            <div className="grid grid-cols-4 gap-16">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary border border-white/5 cursor-pointer hover:border-accent transition-colors">
                  <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-32">
            <div className="space-y-16">
              <div className="flex items-center gap-16">
                <Badge variant="secondary" className="bg-white/10 text-primary font-bold px-12 py-4 rounded-md">NEW</Badge>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{product.category}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-16">
                <p className="text-2xl font-bold text-accent transition-all duration-300">
                  NPR {finalPrice.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-lg text-muted line-through opacity-50">NPR {product.originalPrice.toLocaleString()}</p>
                )}
              </div>
              <p className="text-muted leading-relaxed max-w-lg">{product.description}</p>
            </div>

            {/* Selection */}
            <div className="space-y-24">
              <div className="space-y-12">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Select Size</label>
                  <button className="text-[10px] text-accent font-bold uppercase tracking-widest underline underline-offset-4">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-8">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-16 h-12 flex items-center justify-center rounded-lg border text-xs font-bold transition-all",
                        selectedSize === size 
                          ? "border-accent bg-accent text-background" 
                          : "border-white/10 hover:border-muted-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Select Color</label>
                <div className="flex flex-wrap gap-12">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-16 py-8 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all",
                        selectedColor === color 
                          ? "border-accent bg-accent text-background shadow-subtle" 
                          : "border-white/10 hover:border-muted-foreground"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Coupons */}
            <div className="space-y-16 pt-16 border-t border-white/5">
              {!showCouponInput ? (
                <button 
                  onClick={() => setShowCouponInput(true)}
                  className="text-[10px] font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-8 uppercase tracking-widest"
                >
                  <Plus className="w-4 h-4" /> Add Coupon
                </button>
              ) : (
                <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex gap-8">
                    <Input 
                      placeholder="Enter code" 
                      className="h-10 border-white/10 bg-secondary focus-visible:ring-accent" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button 
                      className="bg-accent text-background font-bold uppercase text-[10px] tracking-widest px-24 h-10 rounded-lg"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-[10px] font-bold text-accent flex items-center gap-4 uppercase tracking-widest">
                      <Check className="w-3 h-3" /> Coupon {appliedCoupon.code} applied.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Action */}
            <div className="hidden md:block pt-32 space-y-16">
              {!selectedSize && (
                <div className="flex items-center gap-8 p-12 bg-white/5 rounded-lg text-[10px] text-muted uppercase tracking-widest font-bold">
                  <Info className="w-4 h-4 text-accent" />
                  <span>Select a size to continue</span>
                </div>
              )}
              <Button 
                onClick={handleOrder}
                disabled={!selectedSize}
                className={cn(
                  "w-full h-14 rounded-lg bg-primary text-background text-sm font-bold uppercase tracking-widest transition-all duration-300",
                  !selectedSize ? "opacity-40 grayscale" : "hover:scale-[1.01] active:scale-[0.98] shadow-2xl shadow-accent/20"
                )}
              >
                Order via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile/Desktop CTA */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 premium-blur border-t border-white/5 p-16 transition-all duration-500 transform",
        isScrolled ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-16">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Price</span>
            <span className="text-xl font-bold text-accent">NPR {finalPrice.toLocaleString()}</span>
          </div>
          <Button 
            onClick={handleOrder}
            className={cn(
              "px-32 h-12 rounded-lg bg-primary text-background font-bold uppercase tracking-widest text-[10px] transition-all",
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
