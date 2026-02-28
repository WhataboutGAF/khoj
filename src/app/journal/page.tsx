export default function JournalPage() {
  return (
    <main className="min-h-screen pt-160 flex flex-col items-center justify-center text-center px-16">
      <div className="space-y-24 max-w-xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Journal</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Process & Detail</h1>
        <p className="text-muted text-lg leading-relaxed">
          Behind the seams. Stories of manufacturing, material selection, and 
          the philosophy of minimalist construction.
        </p>
        <div className="pt-32">
          <div className="inline-block px-24 py-12 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-muted">
            Launching Soon
          </div>
        </div>
      </div>

      {/* Global Grain Overlay effect is already in layout/globals.css */}
    </main>
  )
}