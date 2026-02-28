export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-160 flex flex-col items-center justify-center text-center px-16">
      <div className="space-y-24 max-w-xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Privacy</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Data Integrity</h1>
        <p className="text-muted text-lg leading-relaxed">
          Your privacy is built into the architecture of our platform. We prioritize your 
          anonymity and the security of your information above all else.
        </p>
        <div className="pt-32">
          <div className="inline-block px-24 py-12 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-muted">
            Secure Infrastructure
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(84,169,224,0.05)_0%,transparent_70%)]" />
    </main>
  )
}
