import Link from 'next/link'

export default function TermsPage() {
  const sections = [
    {
      title: "1. Overview",
      content: "Khoj is an online fashion platform offering curated denim and apparel pieces. Orders are initiated through WhatsApp following product selection on our website.\n\nBy using this site, you confirm that you are at least 18 years old or using it under supervision of a legal guardian."
    },
    {
      title: "2. Product Information",
      content: "We strive to ensure all product descriptions, images, pricing, and availability are accurate. However:\n\n• Colors may vary slightly due to display differences.\n• Product measurements may have minor variations.\n• We reserve the right to correct errors in pricing or descriptions at any time.\n• Products are subject to availability."
    },
    {
      title: "3. Ordering Process",
      content: "Orders are placed via WhatsApp using the structured message generated on the product page.\n\nBefore ordering:\n• A size must be selected (“Size Gate” requirement).\n• If applicable, a color must be selected.\n• Coupon codes (if used) must be valid and active.\n\nAn order is considered confirmed only after direct communication and confirmation via WhatsApp. Khoj reserves the right to decline or cancel any order at its discretion."
    },
    {
      title: "4. Pricing & Payment",
      content: "All prices are listed in NPR (Nepalese Rupees). Prices may change without prior notice.\n\nCoupons:\n• Must be valid and active.\n• Cannot be combined unless explicitly stated.\n• May be withdrawn at any time.\n\nPayment terms will be communicated during WhatsApp order confirmation."
    },
    {
      title: "5. Shipping & Delivery",
      content: "Shipping timelines will be communicated after order confirmation. Khoj is not responsible for delays caused by courier services or incorrect address information provided by the customer. Risk transfers to the customer upon dispatch unless otherwise agreed."
    },
    {
      title: "6. Returns & Exchanges",
      content: "Return and exchange policies (if applicable) will be outlined separately. Items may be eligible for return only if unworn, unwashed, in original condition, and returned within the specified timeframe. Final sale items may not be eligible for return."
    },
    {
      title: "7. Intellectual Property",
      content: "All content on this website — including images, logos, designs, text, and branding — is the property of Khoj. You may not reproduce, distribute, or use our content without written permission."
    },
    {
      title: "8. Limitation of Liability",
      content: "Khoj shall not be liable for indirect or incidental damages, loss of data, loss of profits, or issues arising from third-party services (e.g., WhatsApp, payment providers). Use of this website is at your own risk."
    },
    {
      title: "9. User Conduct",
      content: "You agree not to use the site for unlawful purposes, attempt to breach security, submit false information, or interfere with site functionality. We reserve the right to restrict access if misuse is detected."
    },
    {
      title: "10. Privacy",
      content: "Your personal information is handled according to our Privacy Policy. We do not sell customer data. Communication for order processing may occur via WhatsApp or email."
    },
    {
      title: "11. Changes to Terms",
      content: "Khoj may update these Terms at any time. Continued use of the website after changes indicates acceptance of the revised terms."
    }
  ]

  return (
    <main className="min-h-screen pt-128 pb-96 px-16 bg-background">
      <div className="container mx-auto max-w-3xl space-y-48">
        <header className="space-y-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Terms of Service</h1>
          <div className="flex flex-col text-[10px] font-bold uppercase tracking-[0.2em] text-muted space-y-4">
            <span>Effective Date: February 28, 2026</span>
            <span>Last Updated: February 28, 2026</span>
          </div>
        </header>

        <div className="space-y-48">
          <p className="text-lg text-muted leading-relaxed">
            Welcome to Khoj. By accessing or using our website, you agree to the following Terms of Service. Please read them carefully.
          </p>

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
            <h2 className="text-xl font-bold tracking-tight">12. Contact</h2>
            <p className="text-muted leading-relaxed text-sm md:text-base">
              For any questions regarding these Terms, please contact:
            </p>
            <a 
              href="mailto:khoj2026@gmail.com" 
              className="inline-block text-accent font-bold hover:opacity-80 transition-opacity"
            >
              khoj2026@gmail.com
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
