'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { products } from '@/data/products';

const tickerItems = [
  'Free and Fast delivery all UK',
  'Premium Quality Furniture at Budget Prices',
  'Cash on Delivery - No Risk',
  'Trusted by hundreds across the UK',
];

const navItems = [
  { label: 'HOME', href: '/', id: '' },
  { label: 'WARDROBES', href: '/#wardrobes', id: 'wardrobes' },
  { label: 'SOFAS', href: '/#sofas', id: 'sofas' },
  { label: 'LEATHER SOFAS', href: '/#leather-sofas', id: 'leather-sofas' },
  { label: 'BEDS', href: '/#beds', id: 'beds' },
  { label: 'WALL PANELS', href: '/#wall-panels', id: 'wall-panels' },
  { label: 'DRESSING TABLES', href: '/#dressing-tables', id: 'dressing-tables' },
  { label: 'CONTACT', href: '/#footer', id: 'footer' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q)
      );
    }
    return [];
  }, [searchQuery]);

  const showSearch = searchQuery.trim().length > 1;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [dismissDesktopSearch, setDismissDesktopSearch] = useState(false);
  const [dismissMobileSearch, setDismissMobileSearch] = useState(false);

  useEffect(() => {
    setDismissDesktopSearch(false);
    setDismissMobileSearch(false);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target as Node)
      ) {
        setDismissDesktopSearch(true);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target as Node)
      ) {
        setDismissMobileSearch(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDesktopSearchVisible = showSearch && !dismissDesktopSearch && searchResults.length > 0;
  const isMobileSearchVisible = showSearch && !dismissMobileSearch && searchResults.length > 0;

  const prevOverflowRef = useRef('');

  useEffect(() => {
    if (mobileMenuOpen) {
      prevOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflowRef.current;
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.includes('#') && href.includes('/')) {
      const id = href.split('#')[1];
      if (id) {
        if (pathname === '/') {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  return (
    <>
      {/* Ticker Bar */}
      <div className="bg-warm-dark text-white overflow-hidden py-1.5 text-sm">
        <div className="animate-ticker whitespace-nowrap inline-flex">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-2">
              <i className="fa fa-star text-warm-gold text-xs" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header
        data-header
        className={`sticky top-0 z-50 transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img src="/images/logo.svg" alt="Aspire Furniture" className="h-10 w-auto" />
              <div>
                <h1
                  className="text-base sm:text-lg font-bold leading-tight"
                  style={{ color: '#8b5a2b' }}
                >
                  Aspire Furniture UK
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="px-3 py-2 text-xs font-bold uppercase tracking-wide hover:text-[#c47d3a] transition-colors rounded-md hover:bg-[#f5f1e9]"
                  style={{ color: '#5e3a1c' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-xs relative" ref={desktopSearchRef}>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                  style={{
                    borderColor: '#d4c4a8',
                    backgroundColor: '#f5f1e9',
                    color: '#5e3a1c',
                  }}
                />
                <button
                  className="px-4 py-2 text-white rounded-r-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#8b5a2b' }}
                >
                  <i className="fa fa-search" />
                </button>
              </div>
              {isDesktopSearchVisible && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-80 overflow-y-auto custom-scrollbar"
                  style={{ borderColor: '#d4c4a8' }}
                >
                  {searchResults.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#f5f1e9] transition-colors border-b last:border-b-0"
                      style={{ borderColor: '#e8e2d6' }}
                      onClick={() => {
                        setDismissDesktopSearch(true);
                        setSearchQuery('');
                      }}
                    >
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#5e3a1c' }}>
                          {product.name}
                        </p>
                        <p className="text-xs" style={{ color: '#8b7355' }}>
                          {product.category} - {product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[#f5f1e9] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} style={{ color: '#8b5a2b' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#e8e2d6' }}>
          <h2 className="text-lg font-bold" style={{ color: '#8b5a2b' }}>
            Menu
          </h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-[#f5f1e9] rounded-lg"
            aria-label="Close menu"
          >
            <i className="fa fa-times text-lg" style={{ color: '#8b5a2b' }} />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b relative" style={{ borderColor: '#e8e2d6' }}>
          <div className="flex" ref={mobileSearchRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
              style={{
                borderColor: '#d4c4a8',
                backgroundColor: '#f5f1e9',
                color: '#5e3a1c',
              }}
            />
            <button
              className="px-4 py-2 text-white rounded-r-lg"
              style={{ backgroundColor: '#ef3f35' }}
            >
              <i className="fa fa-search" />
            </button>
          </div>
          {isMobileSearchVisible && (
            <div className="mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-60 overflow-y-auto custom-scrollbar" style={{ borderColor: '#d4c4a8' }}>
              {searchResults.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#f5f1e9] transition-colors border-b last:border-b-0"
                  style={{ borderColor: '#e8e2d6' }}
                  onClick={() => {
                    setDismissMobileSearch(true);
                    setSearchQuery('');
                    setMobileMenuOpen(false);
                  }}
                >
                  <img src={product.mainImage} alt={product.name} className="w-10 h-10 object-cover rounded" />
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#5e3a1c' }}>{product.name}</p>
                    <p className="text-xs" style={{ color: '#8b7355' }}>{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Nav Links */}
        <nav className="py-2 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 160px)' }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block px-6 py-3 text-sm font-semibold hover:bg-[#f5f1e9] transition-colors"
              style={{ color: '#5e3a1c' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
