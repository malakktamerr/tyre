
import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

/* ─── Filter tabs matching the image ─────────────────────── */
const tabs = ['All', 'Passenger', 'SUV', 'Van', 'Tyre care', 'New'];

function filterProducts(tab, products) {
  if (tab === 'All') return products;
  if (tab === 'New') return products.filter((p) => p.isNew);
  if (tab === 'Tyre care') return products.filter((p) => p.category === 'Tyre care' || p.tags?.includes('Tyre care'));
  return products.filter((p) => p.category === tab);
}

/* ─── Product Card ────────────────────────────────────── */
function ProductCard({ product, mobile = false }) {
  const sizesStr = product.sizes ? product.sizes.join(' · ') : '';
  const priceStr = typeof product.price === 'number' ? `EGP ${product.price.toLocaleString()}` : product.price;
  const { addToCart } = useCart();
  const btnRef = useRef(null);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    const fromRect = btnRef.current?.getBoundingClientRect() ?? null;
    const defaultColor = product.colors?.[0]?.label ?? product.color ?? '';
    const defaultSize  = product.sizes?.[0] ?? '';
    addToCart(product, defaultColor, defaultSize, 1, fromRect);
  }

  return (
    <Link
      to={`/product/${product.id}`}
      aria-label={product.name}
      className={`flex flex-col gap-2.5 ${mobile ? '' : ''}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {/* Image Container with yellow/warm background style */}
      <div className={`relative overflow-hidden rounded-2xl bg-[#F7C631] ${mobile ? 'aspect-[4/3]' : 'aspect-square'} group`}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-white text-[#1a1a1a] text-[11px] font-medium rounded-full px-3 py-1 shadow-sm">
            New
          </span>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-1 px-1">
        <p className="font-serif text-[16px] text-[#1a1a1a] font-normal leading-snug m-0" style={{ fontFamily: 'var(--font-heading), serif' }}>
          {product.name}
        </p>
        <p className="text-[#777] text-[12px] m-0 leading-normal">
          {product.color ? `${product.color} · ` : ''}{sizesStr}
        </p>
        <p className="font-bold text-[14px] text-[#1a1a1a] m-0 mt-0.5">
          {priceStr}
        </p>
      </div>
    </Link>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('All');
  const filtered = filterProducts(activeTab, allProducts);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: false },
    [Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  return (
    <section aria-labelledby="na-heading" className="py-12 bg-white">

      {/* ══ MOBILE — Embla carousel ══ */}
      <div className="block md:hidden">
        <div className="flex items-baseline justify-between px-4 mb-4">
          <h2 id="na-heading-m" className="text-[26px] font-normal text-[#1a1a1a]" style={{ fontFamily: "'post no pills combo', var(--font-heading), sans-serif" }}>
            Find your next set
          </h2>
          <Link to="/new-arrivals" className="text-[12px] text-[#1a1a1a] font-medium underline underline-offset-4">
            Shop all →
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 px-4 mb-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
                activeTab === tab 
                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' 
                  : 'bg-white text-[#3a3a3a] border-[#dcd6ce]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Embla carousel */}
        <div className="overflow-hidden px-4" ref={emblaRef}>
          <div className="flex gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="shrink-0" style={{ width: '70vw', maxWidth: 260 }}>
                <ProductCard product={p} mobile={true} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ DESKTOP — Grid matching the screenshot ══ */}
      <div className="hidden md:block max-w-7xl mx-auto px-8 lg:px-16">
        
        {/* Header with title and shop link */}
        <div className="flex items-end justify-between mb-6">
          <h2 
            id="na-heading-d" 
            className="text-[#1a1a1a]" 
            style={{ 
              fontFamily: "'post no pills combo', sans-serif",
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Find your next set
          </h2>
          <Link 
            to="/new-arrivals" 
            className="text-[14px] text-[#1a1a1a] font-medium inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ textDecoration: 'none' }}
          >
            Shop all new arrivals →
          </Link>
        </div>

        {/* Tabs Row */}
        <div className="flex items-center gap-2.5 mb-10" role="group" aria-label="Filter by category">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all border ${
                activeTab === tab 
                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' 
                  : 'bg-white text-[#4a4a4a] border-[#d8d2cb] hover:border-[#1a1a1a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Grid - 4 columns exact match */}
        <div className="grid grid-cols-4 gap-x-8 gap-y-12">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} mobile={false} />
          ))}
        </div>

      </div>

    </section>
  );
}