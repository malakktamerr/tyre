
import React from 'react';
import { Link } from 'react-router-dom';

export default function LinenEditBanner() {
  // 1. المتغيرات والمصفوفات توضع هنا (خارج الـ return)
  const tyres = [
    {
      id: 1,
      title: 'City Touring',
      spec: '205/55 R16 · 91V',
      price: 'EGP 1,250',
      link: '/product/1',
      imgSrc: '/New.png',
    },
    {
      id: 6,
      title: 'SUV Comfort',
      spec: '215/65 R16 · 98H',
      price: 'EGP 1,380',
      link: '/product/6',
      imgSrc: '/Van.png',
    },
    {
      id: 7,
      title: 'All Road',
      spec: '225/65 R17 · 102H',
      price: 'EGP 1,550',
      link: '/product/7',
      imgSrc: '/SUV.png',
    },
  ];

  // 2. الـ JSX يرجع من دالة return فقط
  return (
    <section
      aria-label="Find your tyres. Own the journey."
      className="relative w-full overflow-hidden bg-[#141619] py-16 px-6 lg:px-16"
      style={{ minHeight: '520px' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* ── الجانب الأيسر: النصوص والزر ── */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <h2
            className="text-white mb-6 tracking-normal"
            style={{
              fontFamily: "'Black Ops One', 'Post No Bills Colombo', sans-serif",
              fontSize: 'clamp(38px, 4.5vw, 62px)',
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            Find your tyres.<br />
            Own the journey.
          </h2>

          <p className="text-[14px] lg:text-[15px] leading-[1.65] text-white/70 mb-8 max-w-md">
            Compare passenger, SUV and van options side-by-side. Find the right size, compare specifications and get practical guidance on tyre care — all in one place.
          </p>

          <Link
            to="/new-arrivals"
            className="inline-flex items-center justify-center bg-white text-[#141619] rounded-full text-[13px] font-bold px-8 py-3.5 transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-lg"
            style={{ textDecoration: 'none' }}
          >
            Explore touring tyres
          </Link>
        </div>

        {/* ── الجانب الأيمن: كروت المنتجات ── */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {tyres.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group relative flex flex-col items-start justify-between bg-[#1d2025] border border-white/10 rounded-2xl p-6 text-left transition-all duration-300 hover:border-white/30 hover:bg-[#23272d] shadow-xl overflow-hidden"
              style={{ textDecoration: 'none' }}
            >
              <div className="w-full h-44 flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="max-h-full object-contain transition-transform duration-500 group-hover:scale-108 group-hover:rotate-2"
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <h3 className="text-white text-[16px] font-normal font-serif leading-snug">
                  {item.title}
                </h3>
                <p className="text-white/50 text-[11px] font-sans">
                  {item.spec}
                </p>
                <p className="text-white text-[15px] font-bold mt-1 font-sans">
                  {item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}