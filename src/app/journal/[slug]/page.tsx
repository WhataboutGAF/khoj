
"use client"

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, where, limit } from 'firebase/firestore'
import { Post } from '@/lib/types'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PostDetailPage() {
  const { slug } = useParams()
  const db = useFirestore()

  const postQuery = useMemoFirebase(() => {
    if (!db || !slug) return null
    return query(
      collection(db, 'posts'),
      where('slug', '==', slug),
      limit(1)
    )
  }, [db, slug])

  const { data: posts, isLoading } = useCollection<Post>(postQuery)
  const post = posts?.[0]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-24">
        <h1 className="text-3xl font-bold">Entry not found</h1>
        <Button asChild variant="outline">
          <Link href="/journal">Back to Journal</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-128 pb-160 px-16 bg-background">
      <article className="container mx-auto max-w-[720px] space-y-64">
        <header className="space-y-32">
          <Link 
            href="/journal" 
            className="inline-flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Journal
          </Link>
          <div className="space-y-16">
            <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-widest text-muted">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              {post.tags?.map(tag => (
                <span key={tag} className="text-accent">#{tag}</span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
              {post.title}
            </h1>
            <p className="text-xl text-muted leading-relaxed font-medium italic">
              {post.excerpt}
            </p>
          </div>
        </header>

        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/5">
            <Image 
              src={post.coverImage} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority 
            />
          </div>
        )}

        <div 
          className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed space-y-24"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="pt-64 border-t border-white/5">
          <div className="flex flex-col items-center text-center space-y-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Khoj Studio Journal</span>
            <p className="text-xs text-muted/60">Copyright © {new Date().getFullYear()} Khoj Studio. All rights reserved.</p>
          </div>
        </footer>
      </article>
      
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(84,169,224,0.03)_0%,transparent_70%)]" />
    </main>
  )
}

function Button({ asChild, variant, children, className }: any) {
  return (
    <button className={className}>
      {children}
    </button>
  )
}
