import Link from 'next/link'

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Introduction",
      content: "Khoj (“we,” “our,” “us”) respects your privacy and is committed to protecting your personal information.\n\nThis Privacy Policy explains how we collect, use, store, and safeguard your information when you use our website or place an order.\n\nBy accessing or using our website, you agree to this Privacy Policy."
    },
    {
      title: "2. Information We Collect",
      content: "A. Information You Provide\nWhen placing an order or contacting us, we may collect:\n• Full name\n• Phone number\n• Delivery address\n• Order details (product, size, color)\n• Payment method selected\n• WhatsApp communication\n\nB. Payment Information\nIf you choose to pay via eSewa, Khalti, or Bank transfer, payment processing is handled by the respective third-party provider. Khoj does not store your card numbers, banking credentials, or wallet passwords. We may receive confirmation details such as payment status, transaction ID, and amount for verification purposes.\n\nC. Website Usage Data\nWhen you visit our website, limited technical information may be automatically collected, including browser type, device type, IP address, and pages viewed. This helps us improve performance and security."
    },
    {
      title: "3. How We Use Your Information",
      content: "Your information is used to:\n• Confirm and process orders\n• Arrange shipping within Nepal\n• Verify payments\n• Communicate via WhatsApp\n• Provide customer support\n• Improve website experience\n\nWe do not sell, rent, or trade personal information."
    },
    {
      title: "4. Third-Party Services",
      content: "We may use trusted third-party providers to operate our business, including WhatsApp (communication), courier services (delivery), eSewa/Khalti (payment), Vercel (hosting), and Supabase/Firebase (database). These services process information necessary to perform their functions under their own privacy policies."
    },
    {
      title: "5. Data Security",
      content: "We implement reasonable safeguards to protect your personal information from unauthorized access, misuse, or disclosure. However, no online transmission or storage system can guarantee absolute security."
    },
    {
      title: "6. Data Retention",
      content: "We retain customer data only as long as necessary to fulfill orders, maintain business records, comply with legal obligations, or resolve disputes. Data no longer required may be securely deleted."
    },
    {
      title: "7. Your Rights",
      content: "You may request access to your personal information, correction of inaccurate data, or deletion of your data (where legally permissible). To request changes, please contact us directly."
    },
    {
      title: "8. Children’s Privacy",
      content: "Khoj does not knowingly collect personal information from individuals under 18 without appropriate consent."
    },
    {
      title: "9. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. Updates will be reflected by revising the “Last Updated” date. Continued use of the website indicates acceptance of the updated policy."
    }
  ]

  return (
    <main className="min-h-screen pt-128 pb-96 px-16 bg-background">
      <div className="container mx-auto max-w-3xl space-y-48">
        <header className="space-y-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Privacy Policy</h1>
          <div className="flex flex-col text-[10px] font-bold uppercase tracking-[0.2em] text-muted space-y-4">
            <span>Business Name: Khoj</span>
            <span>Operating Region: Nepal</span>
            <span>Effective Date: February 28, 2026</span>
            <span>Last Updated: February 28, 2026</span>
          </div>
        </header>

        <div className="space-y-48">
          <div className="space-y-32">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-12 group">
                <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {section.title}
                </h2>
                <div className="text-muted leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-48 border-t border-white/5 space-y-12">
            <h2 className="text-xl font-bold tracking-tight">10. Contact Information</h2>
            <p className="text-muted leading-relaxed text-sm md:text-base">
              If you have questions regarding this Privacy Policy, please contact:
            </p>
            <div className="flex flex-col gap-8">
              <a 
                href="mailto:khoj82@gmail.com" 
                className="text-accent font-bold hover:opacity-80 transition-opacity"
              >
                khoj82@gmail.com
              </a>
              <a 
                href="https://instagram.com/khoj_82" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-bold hover:opacity-80 transition-opacity"
              >
                Instagram: @khoj_82
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(84,169,224,0.05)_0%,transparent_70%)]" />
    </main>
  )
}
