import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { offers } from '../data/offers';

const ITEMS_PER_PAGE = 6; // 3 صفوف × صورتين = 6 عناصر في الصفحة الواحدة

export default function OffersPage() {
  const { lang } = useLang();
  const [currentPage, setCurrentPage] = useState(0);

  // حساب عدد الصفحات بناءً على البيانات القادمة
  const totalPages = Math.ceil(offers.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentOffers = offers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDotClick = (index) => {
    setCurrentPage(index);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen pb-16">

      {/* ── Hero Banner ── */}
      {/* <div
        className="relative w-full flex items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: 120,
          background: 'linear-gradient(135deg, #5a2d00 0%, #3d1f00 50%, #1a0d00 100%)',
        }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 select-none"
          style={{ fontSize: 80, fontWeight: 900, color: '#E8C200', lineHeight: 1 }}>
          %
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 select-none"
          style={{ fontSize: 80, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
          %
        </div>
        <h1
          className="relative z-10 text-white font-bold px-8"
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 'clamp(18px, 3vw, 32px)',
            direction: 'rtl',
          }}
        >
          {lang === 'ar'
            ? 'خصومات لا تُضاهى على الإطارات في المملكة العربية السعودية'
            : 'Unbeatable Tyre Deals in Saudi Arabia'}
        </h1>
      </div> */}
      {/* ── Hero Banner ── */}
      <div
        className="relative w-full flex items-center justify-center text-center overflow-hidden py-10 my-4 rounded-2xl shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2200 50%, #1a1a1a 100%)',
          border: '1px solid rgba(232, 194, 0, 0.3)',
        }}
      >
        {/* خلفية جمالية لامعة */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8C200_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* رمز النسبة المئوية بتصميم شيك */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 select-none"
          style={{ fontSize: 70, fontWeight: 900, color: '#E8C200', lineHeight: 1 }}>
          %
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 select-none"
          style={{ fontSize: 70, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
          %
        </div>

        <div className="relative z-10 px-6">
          <span className="inline-block px-3 py-1 mb-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E8C200] text-black">
            {lang === 'ar' ? 'عروض حصرية' : 'Exclusive Offers'}
          </span>
          <h1
            className="text-white font-bold"
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 'clamp(20px, 3vw, 30px)',
              direction: 'rtl',
            }}
          >
            {lang === 'ar'
              ? 'خصومات لا تُضاهى على الإطارات في المملكة العربية السعودية'
              : 'Unbeatable Tyre Deals in Saudi Arabia'}
          </h1>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div
        className="bg-[#f0f0f0] border-b border-[#ddd] px-4 md:px-[clamp(16px,6%,88px)] py-2.5 text-[12px] text-[#666]"
        style={{ fontFamily: 'system-ui', direction: 'rtl', textAlign: 'right' }}
      >
        <Link to="/" className="text-[#666] no-underline hover:text-[#1a1a1a] transition-colors">
          {lang === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
        </Link>
        <span className="mx-2">›</span>
        <span className="font-semibold text-[#1a1a1a]">
          {lang === 'ar' ? 'عروض خاصة' : 'Special Offers'}
        </span>
      </div>

      {/* ── Offers Grid Section ── */}
      <div
        className="mx-auto px-4 md:px-[clamp(16px,6%,88px)] pt-10"
        style={{ maxWidth: 1100 }}
      >
        {offers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{ background: '#F5F3EF' }}
            >
              <span style={{ fontSize: 36 }}>🏷️</span>
            </div>
            <p
              className="text-[20px] font-semibold text-[#1a1a1a] m-0 mb-2"
              style={{ fontFamily: 'system-ui', direction: 'rtl' }}
            >
              {lang === 'ar' ? 'لا توجد عروض حالياً' : 'No offers available right now'}
            </p>
          </div>
        ) : (
          <>
            {/* شبكة مكونة من صورتين في كل صف (3 صفوف = 6 صور كحد أقصى في الصفحة) */}
            <div className="grid grid-cols-2 gap-5">
              {currentOffers.map(offer => (
                <Link
                  key={offer.id}
                  to={offer.link || '/shop'}
                  className="block rounded-2xl overflow-hidden no-underline group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white border border-[#e8e8e8]"
                >
                  <div className="w-full overflow-hidden relative aspect-[16/9] bg-[#f9f9f9]">
                    <img
                      src={offer.img}
                      alt={offer.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = '#f5f3ef';
                        e.target.parentElement.style.display = 'flex';
                        e.target.parentElement.style.alignItems = 'center';
                        e.target.parentElement.style.justifyContent = 'center';
                        const span = document.createElement('span');
                        span.textContent = offer.alt;
                        span.style.cssText = 'color:#aaa;font-size:13px;font-family:system-ui;padding:16px;text-align:center;direction:rtl';
                        e.target.parentElement.appendChild(span);
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* ── أشرطة التمرير الأفقية (Dash Pagination) مثل الصورة ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to page ${index + 1}`}
                    className="transition-all duration-300 cursor-pointer border-none rounded-full"
                    style={{
                      width: currentPage === index ? '48px' : '28px',
                      height: '6px',
                      backgroundColor: currentPage === index ? '#E8C200' : '#d1d5db',
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── SEO Content ── */}
        <div
          className="mt-16 pb-8 border-t border-[#ece8e2] pt-10"
          style={{ fontFamily: 'system-ui', direction: 'rtl', textAlign: 'right' }}
        >
          <h2 className="text-[22px] font-bold text-[#1a1a1a] m-0 mb-4">
            {lang === 'ar'
              ? 'أفضل عروض الإطارات في السعودية: جودة عالية بقيمة أفضل'
              : 'Best Tyre Deals in Saudi Arabia: High Quality, Better Value'}
          </h2>
          <p className="text-[14px] text-[#555] leading-relaxed m-0 mb-5">
            {lang === 'ar'
              ? 'نقدم لك أفضل عروض الإطارات في المملكة العربية السعودية، مع خصومات محدودة الوقت وأسعار مميزة على أشهر العلامات التجارية.'
              : 'We bring you the best tyre deals in Saudi Arabia, with limited-time discounts and special prices on top brands.'}
          </p>

          <h3 className="text-[17px] font-bold text-[#1a1a1a] m-0 mb-3">
            {lang === 'ar' ? 'أنواع عروض الإطارات المتاحة' : 'Types of Available Tyre Deals'}
          </h3>
          <ul className="text-[14px] text-[#555] leading-relaxed m-0 mb-5 pr-5" style={{ listStyleType: 'disc' }}>
            <li className="mb-2">
              {lang === 'ar'
                ? 'خصومات موسمية على الإطارات خلال شهر رمضان والأعياد الوطنية'
                : 'Seasonal tyre discounts during Ramadan and national holidays'}
            </li>
            <li className="mb-2">
              {lang === 'ar'
                ? 'عروض خاصة من علامات تجارية محددة كـ Pirelli و Continental و Kumho'
                : 'Brand-specific deals from Pirelli, Continental, Kumho and more'}
            </li>
            <li className="mb-2">
              {lang === 'ar'
                ? 'عروض حصرية عبر الإنترنت لتوفير أكبر قدر من المال'
                : 'Exclusive online deals to save you more'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
