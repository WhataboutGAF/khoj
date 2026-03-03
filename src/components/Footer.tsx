
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/justvibing')

  if (isAdminRoute) return null

  return (
    <footer className="bg-[#0B0D12] py-96 border-t border-white/5">
      <div className="container mx-auto px-16 grid grid-cols-2 md:grid-cols-4 gap-48">
        <div className="col-span-2 md:col-span-1 space-y-24">
          <h3 className="text-lg font-bold tracking-tighter uppercase">KHOJ</h3>
          <p className="text-sm text-muted leading-relaxed">
            Redefining modern staples through technical precision and minimal form.
          </p>
        </div>
        
        <div className="space-y-16">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Navigate</h4>
          <ul className="space-y-12 text-sm">
            <li><Link href="/shop" className="text-muted hover:text-accent transition-colors">Catalogue</Link></li>
            <li><Link href="/collections" className="text-muted hover:text-accent transition-colors">Archives</Link></li>
            <li><Link href="/journal" className="text-muted hover:text-accent transition-colors">Journal</Link></li>
            <li><Link href="/justvibing" className="text-muted/40 hover:text-accent transition-colors text-[10px] uppercase tracking-widest">Staff Access</Link></li>
          </ul>
        </div>

        <div className="space-y-16">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Legal</h4>
          <ul className="space-y-12 text-sm">
            <li><Link href="/terms" className="text-muted hover:text-accent transition-colors">Terms</Link></li>
            <li><Link href="/privacy" className="text-muted hover:text-accent transition-colors">Privacy</Link></li>
          </ul>
        </div>

        <div className="space-y-16">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Connect</h4>
          <ul className="space-y-12 text-sm">
            <li>
              <a 
                href="https://www.instagram.com/khoj_82" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted hover:text-accent transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-muted hover:text-accent transition-colors"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-16 mt-64 pt-32 border-t border-white/5 text-[10px] uppercase tracking-widest text-muted/60">
        © {new Date().getFullYear()} KHOJ STUDIO. ALL RIGHTS RESERVED.
      </div>
    </footer>
  )
}
