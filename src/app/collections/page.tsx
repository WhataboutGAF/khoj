export default function CollectionsPage() {
  return (
    <main className="min-h-screen pt-160 flex flex-col items-center justify-center text-center px-16">
      <div className="space-y-24 max-w-xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Coming Soon</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Collections Archive</h1>
        <p className="text-muted text-lg leading-relaxed">
          We are currently archiving our past series and preparing for the next drop. 
          Stay tuned for curated lookbooks and technical breakdowns.
        </p>
      </div>
      
      {/* Background Decorative Element */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(84,169,224,0.05)_0%,transparent_70%)]" />
    </main>
  )
}