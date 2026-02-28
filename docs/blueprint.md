# **App Name**: KHOJ

## Core Features:

- Product Showcase & Navigation: Display visible products from Supabase with detailed pages, navigated via a 'Shop' page that includes 'Collections' tabs and 'All Products' view. Features large imagery, premium layouts, and mobile-first bottom sheet filters. Includes a sticky bottom CTA on product pages showing price and an action (Select Size / Order) that appears on scroll for improved mobile conversion.
- Configurable Product Ordering: Allow users to select product size and optional color. Enforce a 'Size Gate' by visually deemphasizing the 'Order via WhatsApp' button (e.g., 60% opacity) and displaying a subtle helper text 'Select a size to continue' until a size is chosen. Upon selection, the button becomes fully solid. Generates a professionally structured WhatsApp deep link for order submission, including product name, size, color, final price, coupon, and product URL.
- Dynamic Pricing with Coupons: Provide a 'Add Coupon' text link that smoothly expands to reveal an input field. Validates coupon codes against the Supabase `coupons` table (checking for activity and expiry) and dynamically updates the final price with a soft animation. Displays subtle inline feedback: 'Coupon [CODE] applied.' for success, and 'Code not recognized.' for invalid entries, avoiding harsh error messages.
- Admin Authentication & Access Control: Secure the admin dashboard with Supabase Authentication, restricting access only to whitelisted or role-based admin users as defined in Supabase. This leverages RLS policies in Supabase for robust security.
- Product Inventory Management: Admin interface to perform CRUD operations (add, edit, delete) on products in Supabase, toggle product visibility, modify attributes like price and description, and manage image uploads to Supabase Storage. Security is enforced via Supabase RLS.
- Coupon Code Management: Admin panel for creating, updating, and removing coupons in the Supabase `coupons` table, including specifying code, type (percent/flat), value, activity status, and expiry date. Access and modifications are secured by Supabase RLS.

## Style Guidelines:

- #36363D for primary buttons and core branding elements, conveying sophistication.
- An extremely light off-white with a subtle blue hint (#F9F9FA) for a clean, airy feel that highlights content without being stark.
- A modern, slightly vibrant sky blue (#54A9E0) specifically for active states, applied coupon success, and focus states, maintaining rarity for a premium aesthetic.
- #1C1C1E for main headings and body text, ensuring excellent contrast and readability.
- #6E6E73, an Apple-style muted grey, for supplementary information and less prominent text.
- #E5E5E7 for subtle visual separation and clean layout.
- 'Inter' (sans-serif) for its clean, neutral, and highly readable characteristics, aligning with an Apple-inspired modern and minimalistic design philosophy.
- Employ minimalist line-art or subtly filled icons throughout the application to complement the clean UI and avoid visual clutter.
- Implement a mobile-first responsive design utilizing an 8px spacing system (8, 16, 24, 32, 48) for generous whitespace. Features large, high-quality imagery, clear content hierarchy, and mobile filters that slide up as a bottom sheet. Elements will have a maximum border radius of 12px, very subtle shadows (e.g., 0 2px 8px rgba(0,0,0,0.04)), no heavy gradients, and no thick borders.
- Incorporate subtle and smooth transition animations for navigations, state changes (e.g., coupon input expansion, price updates), and other interactive elements, typically with durations of 200-300ms, enhancing user interaction without distracting from the premium aesthetic.