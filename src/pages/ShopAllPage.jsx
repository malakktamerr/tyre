import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';

const CATEGORIES = ['All', 'Passenger', 'SUV', 'Van'];

/* ─── Product Card Component ─────────────────────────────────────────────── */
function ProductCard({ p }) {
  const [selectedQty, setSelectedQty] = useState(4);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { lang } = useLang();

  const pricePerPiece = p.price;
  const oldPricePerPiece = p.oldPrice || Math.round(pricePerPiece * 1.15);
  const totalPrice = pricePerPiece * selectedQty;
  const discountPct = p.discount || Math.round(((oldPricePerPiece - pricePerPiece) / oldPricePerPiece) * 100);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    const color = p.colors?.[0]?.label ?? p.color ?? 'Standard';
    const size = p.sizes?.[0] ?? 'Standard';
    addToCart(p, color, size, selectedQty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const isRtl = lang === 'ar';

  return (
    <div className={`bg-white rounded-xl border border-[#e5e5e5] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`}>
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between px-3 pt-3">
          <label className="flex items-center gap-1.5 text-[12px] text-[#555] cursor-pointer select-none">
            <input type="checkbox" className="w-3.5 h-3.5 accent-[#E8C200] rounded" />
            <span>{lang === 'ar' ? 'مقارنة' : 'Compare'}</span>
          </label>
          <span className="text-[13px] font-black italic tracking-wider text-[#1a1a1a] uppercase">
            {p.brand || 'ARIVO'}
          </span>
        </div>

        {/* Image Container */}
        <Link to={`/product/${p.id}`} className="block relative px-3 pt-2 pb-1 no-underline text-inherit">
          <div className="relative w-full overflow-hidden flex items-center justify-center bg-[#fcfcfc]" style={{ aspectRatio: '1 / 0.85' }}>
            <img
              src={p.img || '/tyre4.jpg'}
              alt={p.name}
              loading="lazy"
              className="h-full object-contain transition-transform duration-300 hover:scale-105"
            />

            <span className="absolute top-1 right-1 bg-[#E8C200] text-black text-[11px] font-bold px-2 py-0.5 rounded-sm">
              -{discountPct}%
            </span>

            <div className="absolute top-1 left-1 bg-[#fff8d6] border border-[#E8C200] text-[#8B7000] text-[9px] font-bold px-1.5 py-0.5 rounded text-center leading-tight">
              {lang === 'ar' ? 'تركيب إكسبرس (الرياض - جدة)' : 'Express Fit (Riyadh-Jeddah)'}
            </div>

            <span className="absolute bottom-1 left-1 text-[11px] font-bold text-[#777]">
              {p.year || '2026'}
            </span>
          </div>

          <div className="bg-[#E8C200] text-black text-[11px] font-bold text-center py-1 mt-1 rounded-sm">
            {lang === 'ar' ? `ضمان لمدة ${p.warranty || 'سنة واحدة'}` : `Warranty: ${p.warranty || '1 Year'}`}
          </div>
        </Link>

        {/* Title & Specs */}
        <div className="px-3 pt-2 text-center">
          <Link to={`/product/${p.id}`} className="no-underline text-inherit">
            <h3 className="text-[14px] font-bold text-[#1a1a1a] m-0 leading-tight hover:text-[#8B7000] transition-colors">
              {p.name}
            </h3>
            <p className="text-[12px] font-semibold text-[#555] m-0 mt-0.5 dir-ltr">
              {p.sizeSpec || '225/40 R18 92W'}
            </p>
          </Link>

          <div className="flex items-center justify-between px-2 my-2 text-[10px] text-[#777] border-y border-[#f0f0f0] py-1.5">
            <span className="flex items-center gap-1 font-semibold uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E8C200]" />
              RUN-FLAT
            </span>
            <span className="flex items-center gap-1">
              🚗 passenger
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1 text-[11px] text-[#777] mb-2">
            <div className="flex text-[#E8C200]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#E8C200" stroke="none" />
              ))}
            </div>
            <span className="font-bold text-[#1a1a1a] mr-1">4.6/5</span>
            <span>({p.reviewsCount || '1895'} {lang === 'ar' ? 'تقييم' : 'reviews'})</span>
          </div>

          {/* Price Breakdown */}
          <div className="bg-[#fafafa] p-2 rounded-lg border border-[#eee] mb-3">
            <p className="text-[11px] text-[#777] m-0">{lang === 'ar' ? 'السعر شامل التركيب لكل قطعة' : 'Price incl. installation per piece'}</p>
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="text-[12px] text-[#aaa] line-through">
                {lang === 'ar' ? 'ر.س' : 'SAR'} {oldPricePerPiece.toLocaleString()}
              </span>
              <span className="text-[16px] font-black text-[#1a1a1a]">
                {lang === 'ar' ? 'ر.س' : 'SAR'} {pricePerPiece.toLocaleString()}
              </span>
            </div>

            <div className="mt-1 pt-1 border-t border-[#eaeaea] flex items-center justify-between text-[12px]">
              <span className="text-[#666]">{lang === 'ar' ? `طقم من ${selectedQty}:` : `Set of ${selectedQty}:`}</span>
              <span className="font-bold text-[#1a1a1a]">{lang === 'ar' ? 'ر.س' : 'SAR'} {totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-[#555]">
              <span>{lang === 'ar' ? 'ادفع بالتقسيط' : 'Pay in installments'}</span>
              <span className="bg-[#d2f1e4] text-[#00a86b] font-bold px-1.5 py-0.5 rounded">tabby</span>
              <span className="bg-[#fce4ec] text-[#e91e63] font-bold px-1.5 py-0.5 rounded">tamara</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button & Qty Selector */}
      <div className={`p-3 pt-0 flex items-center gap-1 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-2.5 px-3 font-bold text-[13px] transition-colors border-none cursor-pointer text-center ${isRtl ? 'rounded-r-lg' : 'rounded-l-lg'} ${
            added ? 'bg-[#1a1a1a] text-white' : 'bg-[#1a1a1a] text-white hover:bg-[#8B7000]'
          }`}
        >
          {added ? (lang === 'ar' ? 'تمت الإضافة ✓' : 'Added ✓') : (lang === 'ar' ? 'أضف إلى السلة' : 'Add to cart')}
        </button>
        <select
          value={selectedQty}
          onChange={e => setSelectedQty(Number(e.target.value))}
          className={`bg-[#E8C200] text-black font-bold h-[39px] px-2 border-none cursor-pointer outline-none text-[13px] ${isRtl ? 'rounded-l-lg' : 'rounded-r-lg'}`}
        >
          {[1, 2, 3, 4, 5, 6, 8].map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ─── Main Shop Page ─────────────────────────────────────────────── */
export default function ShopAllPage() {
  const [searchParams] = useSearchParams();
  const [category, setCategoryState] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const { lang, t } = useLang();

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat) {
      const matched = CATEGORIES.find(c => c.toLowerCase() === paramCat.toLowerCase());
      if (matched) setCategoryState(matched);
    } else {
      setCategoryState('All');
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = allProducts.filter(p => {
      if (category !== 'All' && p.category?.toLowerCase() !== category.toLowerCase()) return false;
      return true;
    });
    if (sortBy === 'Price: Low to High') list = [...list].sort((a,b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [category, sortBy]);

  const isRtl = lang === 'ar';

  return (
    <div className={`bg-[#f7f7f7] min-h-screen ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`}>
      {/* Top Banner */}
      <div 
        className="relative w-full h-[180px] md:h-[220px] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("/ctyre1.jpg")' }}
      >
        <h1 className="text-[24px] md:text-[36px] font-black tracking-wide m-0 px-4">
          {lang === 'ar' ? 'إطارات عالية الجودة مقاومة للثقب في المملكة العربية السعودية' : 'High Quality Puncture Resistant Tyres in Saudi Arabia'}
        </h1>
      </div>

      {/* Breadcrumbs */}
      <div className={`bg-[#e9e9e9] border-b border-[#dddddd] px-4 md:px-12 py-2.5 text-[12px] text-[#666] ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`}>
        <span>{t('home_breadcrumb')}</span>
        <span className="mx-2">‹</span>
        <span className="font-semibold text-[#1a1a1a]">{lang === 'ar' ? 'الإطارات المقاومة للثقب' : 'Puncture Resistant Tyres'}</span>
      </div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        
        {/* Top Control Bar */}
        <div className={`flex items-center justify-between mb-6 flex-wrap gap-4 ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
          <div className="bg-white px-4 py-2 rounded-lg border border-[#e0e0e0] text-[13px] font-semibold text-[#444]">
            {lang === 'ar' ? 'موصى به' : 'Recommended'}
          </div>

          <div className="flex items-center gap-2 text-[13px] text-[#555]">
            <span>{lang === 'ar' ? 'الترتيب حسب:' : 'Sort by:'}</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-[#ccc] rounded-lg px-3 py-1.5 text-[13px] bg-white cursor-pointer outline-none"
            >
              <option value="Featured">{lang === 'ar' ? 'المميز' : 'Featured'}</option>
              <option value="Price: Low to High">{lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="Price: High to Low">{lang === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <main className="w-full">
          {filtered.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-[#e5e5e5] text-[#888]">
              {lang === 'ar' ? 'لا توجد إطارات متوفرة حالياً.' : 'No tyres available right now.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}