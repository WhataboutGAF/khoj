
"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { Post } from '@/lib/types'
import { Loader2 } from 'lucide-react'

export default function JournalPage() {
  const db = useFirestore()
  
  const postsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    )
  }, [db])

  const { data: posts, isLoading } = useCollection<Post>(postsQuery)

  return (
    <main className="min-h-screen pt-160 pb-96 px-16 bg-background">
      <div className="container mx-auto max-w-5xl space-y-64">
        <header className="space-y-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Journal</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Process & Detail</h1>
          <p className="text-muted text-lg leading-relaxed max-w-xl mx-auto">
            Behind the seams. Stories of manufacturing, material selection, and 
            the philosophy of minimalist construction.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-64">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-48 lg:gap-64">
            {posts.map((post) => (
              <Link key={post.id} href={`/journal/${post.slug}`} className="group space-y-24">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary border border-white/5">
                  {post.coverImage ? (
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted font-bold text-[10px] uppercase tracking-widest">
                      No Image
                    </div>
                  )}
                </div>
                <div className="space-y-12">
                  <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-widest text-muted">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    {post.tags?.[0] && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-accent">{post.tags[0]}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-96 border border-dashed border-white/10 rounded-3xl">
            <p className="text-muted text-sm font-bold uppercase tracking-widest">No entries yet</p>
          </div>
        )}
      </div>
    </main>
  )
}
