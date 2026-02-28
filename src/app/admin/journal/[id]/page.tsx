"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FileText, ArrowLeft, Save, Trash2, Globe, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase'
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates'
import { doc, collection } from 'firebase/firestore'
import Link from 'next/link'

export default function PostForm() {
  const { id } = useParams()
  const router = useRouter()
  const db = useFirestore()
  const isNew = id === 'new'

  // Properly memoize the document reference to avoid hydration/render loop issues
  const postRef = useMemoFirebase(() => {
    if (!db || isNew || !id) return null
    return doc(db, 'posts', id as string)
  }, [db, isNew, id])

  const { data: postData, isLoading } = useDoc(postRef)

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
    published: false,
    metaTitle: '',
    metaDescription: ''
  })

  useEffect(() => {
    if (postData) {
      setForm({
        title: postData.title || '',
        slug: postData.slug || '',
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        coverImage: postData.coverImage || '',
        tags: postData.tags?.join(', ') || '',
        published: postData.published || false,
        metaTitle: postData.metaTitle || '',
        metaDescription: postData.metaDescription || ''
      })
    }
  }, [postData])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setForm(prev => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug
    }))
  }

  const handleSave = () => {
    if (!db) return
    
    // Create reference for existing post or generate a new one
    const targetId = isNew ? doc(collection(db, 'posts')).id : id as string
    const docRef = doc(db, 'posts', targetId)
    
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: postData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setDocumentNonBlocking(docRef, payload, { merge: true })
    router.push('/admin/journal')
  }

  if (!isNew && isLoading) return <div className="p-32 text-muted">Loading entry...</div>

  return (
    <div className="min-h-screen bg-[#0B0D12] p-16 md:p-32 space-y-32">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/journal" 
          className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Archive
        </Link>
        <div className="flex gap-16">
          <Button 
            className="bg-accent text-background h-10 px-24 rounded-lg font-bold uppercase text-[10px] tracking-widest"
            onClick={handleSave}
          >
            <Save className="w-4 h-4" /> Save Entry
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-32">
        <div className="lg:col-span-8 space-y-32">
          <Card className="p-24 bg-card/30 border-white/5 space-y-24">
            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Title</Label>
              <Input 
                value={form.title} 
                onChange={handleTitleChange}
                className="bg-background border-white/10 h-12 text-lg font-bold"
                placeholder="The Architecture of Denim"
              />
            </div>

            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Slug</Label>
              <div className="flex gap-8">
                <Input 
                  value={form.slug} 
                  onChange={(e) => setForm({...form, slug: generateSlug(e.target.value)})}
                  className="bg-background border-white/10 h-10 text-xs font-mono"
                  placeholder="architecture-of-denim"
                />
              </div>
            </div>

            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Excerpt</Label>
              <Textarea 
                value={form.excerpt}
                onChange={(e) => setForm({...form, excerpt: e.target.value})}
                className="bg-background border-white/10 min-h-[100px] text-sm"
                placeholder="A short summary for the archive list..."
              />
            </div>

            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Content (HTML)</Label>
              <Textarea 
                value={form.content}
                onChange={(e) => setForm({...form, content: e.target.value})}
                className="bg-background border-white/10 min-h-[400px] font-mono text-sm leading-relaxed"
                placeholder="<p>Write your story here...</p>"
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-32">
          <Card className="p-24 bg-card/30 border-white/5 space-y-24">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Published</Label>
              <Switch 
                checked={form.published}
                onCheckedChange={(val) => setForm({...form, published: val})}
              />
            </div>

            <div className="space-y-8 pt-16 border-t border-white/5">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Cover Image URL</Label>
              <Input 
                value={form.coverImage}
                onChange={(e) => setForm({...form, coverImage: e.target.value})}
                className="bg-background border-white/10 h-10 text-xs"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Tags (comma separated)</Label>
              <Input 
                value={form.tags}
                onChange={(e) => setForm({...form, tags: e.target.value})}
                className="bg-background border-white/10 h-10 text-xs"
                placeholder="Process, Denim, Technical"
              />
            </div>
          </Card>

          <Card className="p-24 bg-card/30 border-white/5 space-y-24">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted border-b border-white/5 pb-8">SEO Metadata</h3>
            
            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Meta Title</Label>
              <Input 
                value={form.metaTitle}
                onChange={(e) => setForm({...form, metaTitle: e.target.value})}
                className="bg-background border-white/10 h-10 text-xs"
              />
            </div>

            <div className="space-y-8">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted">Meta Description</Label>
              <Textarea 
                value={form.metaDescription}
                onChange={(e) => setForm({...form, metaDescription: e.target.value})}
                className="bg-background border-white/10 text-xs min-h-[80px]"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
