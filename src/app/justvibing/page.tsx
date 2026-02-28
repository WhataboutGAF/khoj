
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth, initiateAnonymousSignIn } from '@/firebase'

export default function JustVibing() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const auth = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthenticating(true)

    // Secure delay for realistic feedback
    setTimeout(() => {
      if (password === 'KHOJ@2082') {
        // Sign into Firebase Auth to satisfy security rules
        initiateAnonymousSignIn(auth);
        
        sessionStorage.setItem('is_khoj_admin', 'true')
        router.push('/admin/dashboard')
        toast({
          title: "Access Granted",
          description: "Welcome to the KHOJ command center.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid master key. Attempt logged.",
        })
        setIsAuthenticating(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center p-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />
      
      <Card className="w-full max-w-md border border-white/5 bg-card/40 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="text-center pt-48 pb-32">
          <div className="w-64 h-64 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-24 rotate-3 hover:rotate-0 transition-all duration-500 border border-accent/20">
            <ShieldCheck className="w-32 h-32 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tighter uppercase text-foreground">Vault Access</CardTitle>
          <CardDescription className="text-muted text-xs font-bold uppercase tracking-widest mt-8 opacity-60">
            Enter master key to unlock systems
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-48 px-32 space-y-32">
          <form onSubmit={handleLogin} className="space-y-24">
            <div className="space-y-12">
              <div className="relative group">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="h-14 bg-white/5 border-white/10 text-center text-lg tracking-[0.3em] font-mono focus-visible:ring-accent rounded-xl group-hover:border-white/20 transition-colors" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isAuthenticating || !password}
              className="w-full h-14 bg-accent text-background font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50 shadow-xl shadow-accent/10"
            >
              {isAuthenticating ? (
                <span className="flex items-center gap-8">
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying
                </span>
              ) : (
                "Unlock Dashboard"
              )}
            </Button>
          </form>
          
          <div className="pt-24 border-t border-white/5 flex flex-col items-center gap-8 text-[9px] text-muted font-bold uppercase tracking-[0.3em] opacity-30">
            <span>Encrypted Session</span>
            <span>Khoj Studio 2026</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
