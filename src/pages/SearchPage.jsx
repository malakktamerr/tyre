import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { allProducts } from '../data/products.js';
import { useCart } from '../context/CartContext';

/* ── quick suggestions shown before typing ── */
const SUGGESTIONS = [
  '205/55 R16', '175/65 R15', 'SUV tyres', 'Touring tyres',
  'Van tyres', 'City tyres', 'All-terrain tyres',
];

function fmt(n) {
  return `EGP ${Math.round(n).toLocaleString('en-US')}`;
}

/* ── single product card (same style as ShopAllPage) ── */
function ProductCard({ p }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const btnRef = useRef(null);
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    const rect = btnRef.current?.getBoundingClientRect();
    addToCart(p, p.colors[0].label, p.sizes[0], rect);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <Link to={`/product/${p.id}`} className="group flex flex-col gap-2 no-underline">
      <div className="relative w-full aspect-[3/4] bg-[#f2eeea] rounded-lg overflow-hidden">
        <img
          src={p.img} alt={p.name}
          className="w-full h-full object-cover object-center block transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {p.isNew && (
          <span className="absolute top-2.5 left-2.5 bg-white border border-[#C8502A] text-[#C8502A] text-[10px] font-semibold rounded-full px-2.5 py-0.5">
            New
          </span>
        )}
        <button
          ref={btnRef}
          onClick={handleAdd}
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold whitespace-nowrap shadow-md transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 ${added ? 'bg-[#1a1a1a] text-white' : 'bg-white/95 text-[#1a1a1a]'}`}
          aria-label={`Add ${p.name} to bag`}
        >
          {added ? '✓ Added' : '+ Add to bag'}
        </button>
      </div>
      <div className="flex flex-col gap-0.5 px-0.5">
        <p className="text-[13px] font-semibold text-[#1a1a1a] m-0 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
          {p.name}
        </p>
        <p className="text-[11px] text-[#aaa] m-0">{p.color} · {p.sizes.join(' · ')}</p>
        <p className="text-[13px] font-bold text-[#1a1a1a] m-0">{fmt(p.price)}</p>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════
   SearchPage
══════════════════════════════════════════════════════════ */
export default function SearchPage() {
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();

  const results = trimmed.length > 0
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.fabric.toLowerCase().includes(trimmed) ||
        p.color.toLowerCase().includes(trimmed) ||
        p.colors.some(c => c.label.toLowerCase().includes(trimmed))
      )
    : [];

  const featured = allProducts.slice(0, 3).map((p, i) => ({
    ...p,
    img: i === 0 ? '/tyre.png' : i === 1 ? '/tyre2.png' : '/tyre3.png',
  }));

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="mx-auto px-4 md:px-[clamp(16px,6%,88px)] pt-5" style={{ maxWidth: 1400 }}>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] text-[#aaa] mb-4">
          <Link to="/" className="text-[#aaa] no-underline hover:text-[#1a1a1a] transition-colors">Home</Link>
          <span className="text-[#d0ccc7]">/</span>
          <span className="text-[#555]">Search</span>
        </nav>

        {/* Heading */}
        <h1
          className="text-[clamp(28px,4vw,42px)] font-normal text-[#1a1a1a] m-0 mb-2 leading-tight tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Find your next tyres.
        </h1>
        <p className="text-[14px] font-medium text-[#555] m-0 mb-6">
          Search by tyre size, product name or vehicle category.
        </p>

        {/* Search input */}
        <div className="relative mb-2" style={{ maxWidth: 680 }}>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Try "205/55 R16", "touring" or "SUV"'
            autoFocus
            className="w-full h-12 pl-4 pr-12 text-[14px] text-[#1a1a1a] border border-[#d4d0cb] rounded-lg bg-white outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
            style={{ fontFamily: 'system-ui,sans-serif' }}
          />
          <button
            aria-label="Search"
            className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center rounded-r-lg bg-[#E8C200] hover:bg-[#d4a800] transition-colors"
          >
            <Search size={16} strokeWidth={2} color="#1a1a1a" />
          </button>
        </div>

        {/* Suggestions chips */}
        {trimmed.length === 0 && (
          <div className="mb-10" style={{ maxWidth: 680 }}>
            <p className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-2">
              Search Discovery
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="text-[12px] font-medium text-[#555] bg-[#f5f5f5] hover:bg-[#ebebeb] border-none rounded-full px-3 py-1.5 cursor-pointer transition-colors"
                  style={{ fontFamily: 'system-ui,sans-serif' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search results */}
        {trimmed.length > 0 && (
          <div className="mb-12">
            {results.length > 0 ? (
              <>
                <p className="text-[12px] font-medium text-[#888] mb-5">
                  {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query.trim()}&rdquo;
                </p>
                <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                  {results.map(p => <ProductCard key={p.id} p={p} />)}
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-[16px] font-semibold text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  No results for &ldquo;{query.trim()}&rdquo;
                </p>
                <p className="text-[13px] text-[#888]">
                  Try a different tyre size, category, or product name.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Featured products section — always shown */}
        {trimmed.length === 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  className="text-[clamp(20px,2.5vw,28px)] font-normal text-[#1a1a1a] m-0 mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  A good place to start.
                </h2>
                <p className="text-[13px] text-[#888] m-0">
                  Browse everyday tyres while you find the right size for your vehicle.
                </p>
              </div>
              <Link
                to="/shop"
                className="text-[12px] font-medium text-[#C8502A] no-underline hover:underline hover:underline-offset-2 whitespace-nowrap ml-4 shrink-0"
              >
                Show all →
              </Link>
            </div>

            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {featured.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
