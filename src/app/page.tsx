'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { products, categories, getProductsByCategory } from '@/data/products';

/* ─── Hero Carousel ─── */
const heroSlides = [
  { image: '/images/hero1.jpg', alt: 'Premium Furniture Collection' },
  { image: '/images/hero2.jpg', alt: 'Modern Sofas' },
  { image: '/images/hero3.jpg', alt: 'Elegant Wardrobes' },
  { image: '/images/hero4.jpg', alt: 'Comfortable Beds' },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % heroSlides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 hero-slide"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? 'w-8 bg-warm-gold' : 'bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Feature Blocks ─── */
const features = [
  {
    icon: '\u2705',
    title: 'Original Products',
    desc: 'LOVED BY ASPIRE',
  },
  {
    icon: '\uD83C\uDFDB\uFE0F',
    title: 'BUY NOW PAY LATER',
    desc: 'ENJOY BUY NOW PAY LATER',
  },
  {
    icon: '\uD83D\uDE9A',
    title: 'Free Shipping',
    desc: 'Free Delivery in England (Please See Delivery Map In The Picture Gallery)',
  },
  {
    icon: '\u2B50',
    title: 'TRUSTPILOT',
    desc: 'RATED HIGHLY BY YOU',
  },
];

function FeatureBlocks() {
  return (
    <section style={{ backgroundColor: '#2a2a2a', padding: '1rem 0', margin: 0, width: '100%' }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 px-4 md:px-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-center gap-3 md:gap-4 flex-1 w-full py-2 md:py-3 md:px-4 transition-transform hover:-translate-y-1"
          >
            <span className="shrink-0 text-center text-xl md:text-4xl" style={{ minWidth: '1.75rem', lineHeight: 1 }}>{f.icon}</span>
            <div style={{ color: '#ffffff' }}>
              <h3 className="text-xs md:text-base" style={{ fontWeight: 700, marginBottom: '0.15rem', lineHeight: 1.3 }}>
                {f.title}
              </h3>
              <p className="text-[0.65rem] md:text-sm" style={{ margin: 0, color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <span
              className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded"
              style={{ backgroundColor: '#ef3f35' }}
            >
              SALE
            </span>
          )}
        </div>
        <div className="p-4">
          <h3
            className="font-semibold text-sm mb-2 line-clamp-2"
            style={{ color: '#5e3a1c' }}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold" style={{ color: '#8b5a2b' }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span
                className="text-sm line-through"
                style={{ color: '#999999' }}
              >
                {product.originalPrice}
              </span>
            )}
          </div>
          <span
            className="inline-block mt-3 px-4 py-2 text-xs font-bold text-white rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#8b5a2b' }}
          >
            Order Now
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ─── Section Title ─── */
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center" style={{ color: '#5e3a1c' }}>
        {title}
      </h2>
      <div className="section-underline w-32 mx-auto mt-3" />
    </div>
  );
}

/* ─── Customer Ratings ─── */
function CustomerRatings() {
  const stats = [
    { value: '4.9/5', label: 'Customer Rating', icon: 'fa fa-trophy', iconBg: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
    { value: '1000+', label: 'Happy Customers', icon: 'fa fa-heart', iconBg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { value: '98%', label: 'Repeat Buyers', icon: 'fa fa-repeat', iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#5e3a1c' }}>
          Customer Ratings
        </h2>
        <div className="section-underline w-32 mx-auto mt-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md"
              style={{ background: s.iconBg }}
            >
              <i className={`${s.icon} text-2xl text-white`} />
            </div>
            <div className="text-3xl font-bold" style={{ color: '#8b5a2b' }}>
              {s.value}
            </div>
            <div className="text-sm mt-1" style={{ color: '#8b7355' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      {/* Stars */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: '#fef3c7' }}
          >
            <i className="fa fa-star text-xl" style={{ color: '#d4a056', filter: 'drop-shadow(0 1px 2px rgba(212, 160, 86, 0.4))' }} />
          </div>
        ))}
      </div>
      <p className="text-center text-sm mt-3" style={{ color: '#8b7355' }}>
        Based on 1000+ verified reviews on Trustpilot
      </p>
    </div>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <HeroCarousel />

      {/* Features */}
      <FeatureBlocks />

      <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-12">
        {/* About Us */}
        <section id="about" className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#5e3a1c' }}>
              About Us
            </h2>
            <div className="section-underline w-32 mx-auto mt-3" />
          </div>
          <div className="max-w-3xl mx-auto space-y-5 text-sm leading-relaxed" style={{ color: '#333333' }}>
            <p>
              At Aspire Furniture UK, we believe your home should be a reflection of timeless elegance,
              comfort, and personal style.
            </p>
            <p>
              With a commitment to exceptional craftsmanship and refined design, we bring you furniture
              that elevates every space you touch.
            </p>
            <p>
              From luxurious sofas and premium leather sofas to beautifully crafted beds, spacious
              wardrobes, stylish dressing tables, and modern wall panels, every piece in our collection
              is thoughtfully designed to blend sophistication with everyday living.
            </p>
            <div
              className="rounded-lg p-5 text-center"
              style={{ backgroundColor: '#8b5a2b' }}
            >
              <p className="text-base font-semibold" style={{ color: '#ffffff' }}>
                Our mission is simple: to create furniture that not only looks stunning but feels like home.
              </p>
            </div>
            <p>
              With a focus on quality materials, meticulous attention to detail, and designs that balance
              beauty with functionality, Aspire Furniture UK continues to be a trusted destination for
              those who seek comfort, elegance, and lasting value.
            </p>
            <p>
              At Aspire, we don&apos;t just furnish homes — we create spaces that inspire.
            </p>
          </div>
        </section>

        {/* Product Category Sections */}
        {categories.map((cat) => {
          const catProducts = getProductsByCategory(cat.slug);
          if (catProducts.length === 0) return null;
          return (
            <section key={cat.slug} id={cat.slug}>
              <SectionTitle title={cat.name} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {catProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Customer Ratings */}
        <CustomerRatings />
      </div>
    </div>
  );
}
