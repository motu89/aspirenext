'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductBySlug, type ProductColor } from '@/data/products';

/* ─── Color swatch map ─── */
const colorSwatchMap: Record<string, string> = {
  white: '#ffffff',
  black: '#222222',
  grey: '#999999',
  oak: '#c8a96e',
  brown: '#8b5a2b',
  'light-grey': '#cccccc',
  'dark-grey': '#666666',
  'off-white': '#f5f0e1',
  pink: '#f0b0c0',
};

/* ─── Reviews data ─── */
const reviews = [
  {
    name: 'Sarah M.',
    rating: 5,
    date: '2024-11-15',
    text: 'Absolutely love this product! The quality is outstanding for the price. Delivery was fast and the team kept me updated throughout. Would highly recommend to anyone looking for quality furniture on a budget.',
  },
  {
    name: 'James T.',
    rating: 5,
    date: '2024-11-10',
    text: 'Great quality and looks amazing in my bedroom. The assembly was straightforward and all parts were included. Customer service was very helpful when I had questions about sizes.',
  },
  {
    name: 'Amina K.',
    rating: 4,
    date: '2024-10-28',
    text: 'Very happy with my purchase. The only reason for 4 stars instead of 5 is that delivery took a day longer than expected. But the product itself is perfect. Great value for money!',
  },
  {
    name: 'David P.',
    rating: 5,
    date: '2024-10-20',
    text: 'Second time ordering from Aspire Furniture and once again they delivered! The quality is consistently good. Cash on delivery gave me confidence to order. Will definitely be back.',
  },
  {
    name: 'Fatima R.',
    rating: 5,
    date: '2024-10-15',
    text: 'Stunning piece of furniture. My friends keep asking where I got it from. The build quality is solid and it looks much more expensive than what I paid. Highly recommended!',
  },
];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const initialColor = product?.colors?.[0] || null;
  const initialMainImage = initialColor?.image || product?.mainImage || '';
  const initialSize = product?.variants?.[0]?.size || null;
  const initialPrice = product?.variants?.[0]?.price || parseInt(product?.price.replace(/[^0-9]/g, '') || '0');

  const [mainImage, setMainImage] = useState(initialMainImage);
  const [activeMediaType, setActiveMediaType] = useState<'image' | 'video'>('image');
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string | null>(initialSize);
  const [selectedPrice, setSelectedPrice] = useState<number>(initialPrice);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    postcode: '',
    whatsapp: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<{ success: boolean; orderId?: string; message?: string } | null>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause video when switching away from video view
  useEffect(() => {
    if (activeMediaType !== 'video' && videoRef.current) {
      videoRef.current.pause();
    }
  }, [activeMediaType]);

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <i className="fa fa-exclamation-circle text-5xl mb-4" style={{ color: '#ef3f35' }} />
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#5e3a1c' }}>
          Product Not Found
        </h1>
        <p className="mb-6" style={{ color: '#8b7355' }}>
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#8b5a2b' }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.image) {
      setMainImage(color.image);
      setActiveMediaType('image');
      setActiveVideoSrc(null);
    }
  };

  const handleSizeChange = (size: string, price: number) => {
    setSelectedSize(size);
    setSelectedPrice(price);
  };

  const handleImageClick = (img: string) => {
    setMainImage(img);
    setActiveMediaType('image');
    setActiveVideoSrc(null);
  };

  const handleVideoClick = (videoSrc: string) => {
    setActiveMediaType('video');
    setActiveVideoSrc(videoSrc);
  };

  const getTotalPrice = () => {
    if (product.hasQuantityOption) {
      return selectedPrice * quantity;
    }
    return selectedPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setOrderResult(null);
    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          product: product.title,
          selectedSize: selectedSize || '',
          color: selectedColor?.label || '',
          quantity: product.hasQuantityOption ? String(quantity) : '',
          price: `\u00A3${selectedPrice}`,
          totalPrice: `\u00A3${getTotalPrice()}`,
          name: formData.name,
          customer: formData.name,
          address: formData.address,
          postcode: formData.postcode,
          whatsapp: formData.whatsapp,
          selectedImage: mainImage,
          paymentMethod: 'Cash on Delivery',
          unit: product.unit || '',
        }),
      });
      const data = await res.json();
      setOrderResult(data);
    } catch {
      setOrderResult({ success: false, message: 'Something went wrong. Please try again.' });
    }
    setSubmitting(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className="w-6 h-6 rounded-md flex items-center justify-center"
        style={{
          backgroundColor: i < rating ? '#fef3c7' : '#f3f0eb',
        }}
      >
        <i
          className={`fa ${i < rating ? 'fa-star' : 'fa-star-o'} text-xs`}
          style={{
            color: i < rating ? '#d4a056' : '#c4b89a',
            filter: i < rating ? 'drop-shadow(0 1px 1px rgba(212, 160, 86, 0.3))' : 'none',
          }}
        />
      </div>
    ));
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in: ${product.name}${selectedSize ? ` (${selectedSize})` : ''}${selectedColor ? ` - ${selectedColor.label}` : ''}. Price: \u00A3${getTotalPrice()}`
  );

  const hasVideos = product.videos && product.videos.length > 0;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6" style={{ color: '#8b7355' }}>
        <Link href="/" className="hover:text-warm-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/#${product.categorySlug}`} className="hover:text-warm-accent">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span style={{ color: '#5e3a1c' }}>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image Gallery */}
        <div>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-3">
            {activeMediaType === 'video' && activeVideoSrc ? (
              <div className="relative" style={{ aspectRatio: '1/1' }}>
                <video
                  ref={videoRef}
                  key={activeVideoSrc}
                  src={activeVideoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  poster={product.videos?.find(v => v.src === activeVideoSrc)?.thumbnail}
                />
              </div>
            ) : (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full object-cover"
                style={{ aspectRatio: '1/1' }}
              />
            )}
          </div>
          {/* Thumbnails */}
          <div
            ref={thumbnailRef}
            className={`flex gap-2 overflow-x-auto custom-scrollbar pb-2 ${
              (product.images.length + (product.videos?.length || 0)) > 4 ? 'justify-start' : 'justify-center'
            }`}
          >
            {/* Image thumbnails */}
            {product.images.map((img, i) => (
              <button
                key={`img-${i}`}
                onClick={() => handleImageClick(img)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all hover:opacity-80 ${
                  activeMediaType === 'image' && mainImage === img ? 'border-warm-accent shadow-md' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
            {/* Video thumbnails */}
            {product.videos?.map((video, i) => (
              <button
                key={`vid-${i}`}
                onClick={() => handleVideoClick(video.src)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all hover:opacity-80 relative ${
                  activeMediaType === 'video' && activeVideoSrc === video.src ? 'border-warm-accent shadow-md' : 'border-transparent'
                }`}
              >
                <img src={video.thumbnail} alt={`${product.name} video ${i + 1}`} className="w-full h-full object-cover" />
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                    <i className="fa fa-play text-xs" style={{ color: '#ef3f35', marginLeft: '2px' }} />
                  </div>
                </div>
                {/* Video label */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] text-center py-0.5 font-semibold">
                  VIDEO
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#5e3a1c' }}>
            {product.title}
          </h1>

          {/* Sales info */}
          <div className="space-y-1 mb-4">
            <p className="text-sm font-medium" style={{ color: '#ef3f35' }}>
              🔥 {product.salesText}
            </p>
            <p className="text-sm" style={{ color: '#8b7355' }}>
              👁️ {product.viewersText}
            </p>
            <p className="text-sm font-semibold" style={{ color: '#ef3f35' }}>
              ⚡ {product.stockText}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl font-bold" style={{ color: '#8b5a2b' }}>
              £{getTotalPrice()}
            </span>
            {product.originalPrice && (
              <span className="text-lg line-through" style={{ color: '#999999' }}>
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.hasColorOptions && product.colors && (
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2" style={{ color: '#5e3a1c' }}>
                Colour: <span>{selectedColor?.label}</span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    className={`w-10 h-10 rounded-full border-3 transition-all hover:scale-110 ${
                      selectedColor?.name === color.name ? 'ring-2 ring-offset-2 ring-warm-accent' : ''
                    }`}
                    style={{
                      backgroundColor: colorSwatchMap[color.name] || '#cccccc',
                      border: '2px solid #d4c4a8',
                    }}
                    title={color.label}
                    aria-label={`Select ${color.label}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Options */}
          {product.hasSizeOptions && product.variants && (
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2" style={{ color: '#5e3a1c' }}>
                Size: <span>{selectedSize}</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => handleSizeChange(v.size, v.price)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                      selectedSize === v.size
                        ? 'border-warm-accent text-white'
                        : 'border-warm-border hover:border-warm-accent'
                    }`}
                    style={
                      selectedSize === v.size
                        ? { backgroundColor: '#8b5a2b', borderColor: '#8b5a2b', color: '#fff' }
                        : { backgroundColor: '#f5f1e9', color: '#5e3a1c', borderColor: '#d4c4a8' }
                    }
                  >
                    {v.size}
                    <span className="block text-xs mt-0.5 opacity-80">£{v.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Option */}
          {product.hasQuantityOption && (
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2" style={{ color: '#5e3a1c' }}>
                Quantity ({product.unit || 'per pack'})
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 flex items-center justify-center hover:border-warm-accent transition-colors"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
                >
                  <i className="fa fa-minus" />
                </button>
                <span className="text-lg font-bold w-10 text-center" style={{ color: '#5e3a1c' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 flex items-center justify-center hover:border-warm-accent transition-colors"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
                >
                  <i className="fa fa-plus" />
                </button>
              </div>
              <p className="text-xs mt-1" style={{ color: '#8b7355' }}>
                Unit price: £{selectedPrice} per {product.unit || 'pack'}
              </p>
            </div>
          )}

          {/* Payment Method */}
          <div className="mb-5 p-3 rounded-lg" style={{ backgroundColor: '#f5f1e9' }}>
            <p className="text-sm font-semibold flex items-center gap-2" style={{ color: '#5e3a1c' }}>
              <i className="fa fa-money" style={{ color: '#25D366' }} />
              Payment Method: Cash on Delivery
            </p>
            <p className="text-xs mt-1" style={{ color: '#8b7355' }}>
              Pay when you receive your order. No risk!
            </p>
          </div>

          {/* Order Form */}
          {orderResult?.success ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <i className="fa fa-check-circle text-4xl mb-3" style={{ color: '#25D366' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: '#5e3a1c' }}>
                Order Placed Successfully!
              </h3>
              <p className="text-sm mb-1" style={{ color: '#8b7355' }}>
                Order ID: <strong>{orderResult.orderId}</strong>
              </p>
              <p className="text-sm mb-4" style={{ color: '#8b7355' }}>
                We&apos;ll contact you on WhatsApp to confirm your order.
              </p>
              <a
                href={`https://wa.me/447897060826?text=${encodeURIComponent(
                  `Hi, I just placed order ${orderResult.orderId} for ${product.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#25D366' }}
              >
                <i className="fa fa-whatsapp mr-2" />
                Confirm on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {orderResult?.success === false && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm" style={{ color: '#ef3f35' }}>
                  {orderResult.message}
                </div>
              )}
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
              />
              <input
                type="text"
                placeholder="Full Address *"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
              />
              <input
                type="text"
                placeholder="Postcode *"
                required
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
              />
              <input
                type="tel"
                placeholder="WhatsApp Number *"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
              />

              {/* Order Preview */}
              <div className="p-3 rounded-lg border" style={{ borderColor: '#d4c4a8', backgroundColor: '#faf8f4' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#8b7355' }}>ORDER SUMMARY</p>
                <div className="space-y-1 text-sm" style={{ color: '#5e3a1c' }}>
                  <p><strong>Product:</strong> {product.name}</p>
                  {selectedSize && <p><strong>Size:</strong> {selectedSize}</p>}
                  {selectedColor && <p><strong>Colour:</strong> {selectedColor.label}</p>}
                  {product.hasQuantityOption && <p><strong>Quantity:</strong> {quantity}</p>}
                  <p className="font-bold text-lg pt-1" style={{ color: '#8b5a2b' }}>
                    Total: £{getTotalPrice()}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: '#8b5a2b' }}
              >
                {submitting ? (
                  <i className="fa fa-spinner fa-spin mr-2" />
                ) : (
                  <i className="fa fa-shopping-cart mr-2" />
                )}
                {submitting ? 'Placing Order...' : 'Place Order - Cash on Delivery'}
              </button>
            </form>
          )}

          {/* Book via WhatsApp */}
          <div className="mt-6 p-4 rounded-xl text-center" style={{ backgroundColor: '#e8f5e9' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: '#5e3a1c' }}>
              Prefer to order via WhatsApp?
            </p>
            <a
              href={`https://wa.me/447897060826?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
              style={{ backgroundColor: '#25D366' }}
            >
              <i className="fa fa-whatsapp text-lg" />
              Book via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#5e3a1c' }}>
            Customer Reviews
          </h2>
          <div className="section-underline w-32 mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="p-5 rounded-xl border" style={{ borderColor: '#e8e2d6', backgroundColor: '#faf8f4' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
                    style={{ background: i % 2 === 0 ? 'linear-gradient(135deg, #8b5a2b 0%, #c8956c 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    <i className="fa fa-user" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#5e3a1c' }}>{review.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <i className="fa fa-calendar-check text-[10px]" style={{ color: '#c4b89a' }} />
                      <p className="text-xs" style={{ color: '#8b7355' }}>{review.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5">{renderStars(review.rating)}</div>
              </div>
              <div className="flex items-start gap-2">
                <i className="fa fa-quote-left text-xs mt-1 shrink-0" style={{ color: '#d4c4a8' }} />
                <p className="text-sm leading-relaxed" style={{ color: '#553b0a' }}>{review.text}</p>
              </div>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t" style={{ borderColor: '#e8e2d6' }}>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#e8f5e9', color: '#065f46' }}>
                  <i className="fa fa-check mr-1" /> Verified Purchase
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                  <i className="fa fa-thumbs-up mr-1" /> Recommended
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
