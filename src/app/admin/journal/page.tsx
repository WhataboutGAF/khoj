
"use client"

import { useState } from 'react'
import { FileText, Plus, Trash2, Edit2, Search, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { Post } from '@/lib/types'
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates'
import { doc } from 'firebase/firestore'
import Link from 'next/link'

export default function AdminJournal() {
  const db = useFirestore()
  const postsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
  }, [db])

  const { data: posts, isLoading } = useCollection<Post>(postsQuery)
  const [search, setSearch] = useState('')

  const filteredPosts = posts?.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (!db || !confirm('Are you sure you want to delete this post?')) return
    deleteDocumentNonBlocking(doc(db, 'posts', id))
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] p-16 md:p-32 space-y-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-24">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-12 tracking-tighter">
            <FileText className="w-8 h-8 text-accent" /> Journal Editor
          </h1>
          <p className="text-muted text-sm font-medium">Draft and publish stories about your process.</p>
        </div>
        <Button asChild className="bg-accent text-background h-12 px-24 rounded-xl flex items-center gap-8 font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-accent/20">
          <Link href="/admin/journal/new">
            <Plus className="w-4 h-4" /> New Entry
          </Link>
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-16 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input 
          placeholder="Search entries..." 
          className="w-full pl-44 h-12 bg-card/50 border border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="border border-white/5 shadow-2xl overflow-hidden bg-card/30 backdrop-blur-xl rounded-2xl">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/5">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Title & Date</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Slug</TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Status</TableHead>
              <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest text-muted/60 py-20">Control</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-64 text-muted">Loading archive...</TableCell></TableRow>
            ) : filteredPosts?.map((post) => (
              <TableRow key={post.id} className="hover:bg-white/5 transition-colors border-white/5 group">
                <TableCell className="py-16">
                  <div className="space-y-4">
                    <p className="font-bold text-sm">{post.title}</p>
                    <p className="text-[9px] text-muted font-bold uppercase tracking-widest">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-mono text-muted">/{post.slug}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-8">
                    {post.published ? (
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-none text-[8px] px-8 py-2">PUBLISHED</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted border-white/10 text-[8px] px-8 py-2">DRAFT</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-4">
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10 text-muted hover:text-accent">
                      <Link href={`/journal/${post.slug}`} target="_blank"><Eye className="w-4 h-4" /></Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10 text-muted hover:text-accent">
                      <Link href={`/admin/journal/${post.id}`}><Edit2 className="w-4 h-4" /></Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 text-muted hover:text-destructive"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
