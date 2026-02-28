"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Lock } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'admin@khoj.com' && password === 'admin123') {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-16">
      <Card className="w-full max-w-md border-none shadow-subtle rounded-xl overflow-hidden bg-card">
        <CardHeader className="bg-card border-b border-border py-32 text-center">
          <div className="w-48 h-48 bg-secondary rounded-full flex items-center justify-center mx-auto mb-16">
            <Lock className="w-24 h-24 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription>Secure access for authenticated staff only.</CardDescription>
        </CardHeader>
        <CardContent className="bg-card py-32 space-y-24">
          <form onSubmit={handleLogin} className="space-y-16">
            <div className="space-y-8">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Email Address</label>
              <Input 
                type="email" 
                placeholder="staff@khoj.com" 
                className="h-11 border-border bg-background" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-8">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-11 border-border bg-background" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-11 bg-primary text-white font-bold rounded-lg mt-8">
              Authenticate
            </Button>
          </form>
          <p className="text-center text-xs text-muted pt-16 border-t border-border">
            By proceeding, you agree to our security protocols.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}