import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const testimonials = [
  { 
    id: 1, 
    text: '"I found the tyre size I needed and could compare the details in one place."', 
    name: 'EXAMPLE FEEDBACK', 
    rating: 5 
  },
  { 
    id: 2, 
    text: '"I found the tyre size I needed and could compare the details in one place."', 
    name: 'EXAMPLE FEEDBACK', 
    rating: 5 
  },
  { 
    id: 3, 
    text: '"I found the tyre size I needed and could compare the details in one place."', 
    name: 'EXAMPLE FEEDBACK', 
    rating: 5 
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-[3px] mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C8922A" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// تم جعل البوردر أوضح وأكثر بروزاً بزيادة السمك وتغميق اللون قليلاً
const dashedBorderStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='none' stroke='%23888580' stroke-width='1.8' stroke-dasharray='10%2C10' stroke-dashoffset='0'/%3E%3C/svg%3E")`,
};

function TestimonialCard({ t }) {
  return (
    <div style={{ ...dashedBorderStyle, padding: 'clamp(20px,3.8vw,51px) clamp(18px,3.8vw,51px) clamp(18px,3vw,40px)', display: 'flex', flexDirection: 'column' }}>
      <Stars count={t.rating} />
      <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 'clamp(15px,1.2vw,20px)', fontWeight: 400, lineHeight: 1.4, color: '#1a1a1a', margin: '0 0 24px', flex: 1 }}>{t.text}</p>
      <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', color: '#777', margin: 0 }}>{t.name}</p>
    </div>
  );
}

export default function RealLifeTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', containScroll: false },
    [Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useState(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  });

  return (
    <section className="w-full bg-white">

      {/* ══ MOBILE — Embla carousel ══ */}
      <div className="block sm:hidden pt-10 pb-8">
        <h2 className="px-4 mb-6 font-normal leading-[1.1] tracking-[-0.02em] text-[#1a1a1a]"
          style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(26px,7vw,34px)' }}>
          Made for real life
        </h2>

        {/* Embla viewport */}
        <div className="overflow-hidden px-4" ref={emblaRef}>
          <div className="flex gap-3">
            {testimonials.map((t) => (
              <div key={t.id} className="shrink-0" style={{ width: '78vw', maxWidth: 300 }}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ DESKTOP — 3-column grid ══ */}
      <div className="hidden sm:block" style={{ padding: 'clamp(48px,6vw,88px) clamp(16px,6%,88px)' }}>
        <h2 style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1a1a1a', margin: '0 0 clamp(28px,3.2vw,48px)' }}>
          Made for real life
        </h2>
        <div className="grid grid-cols-3" style={{ gap: 'clamp(12px,1.8vw,20px)' }}>
          {testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)}
        </div>
      </div>

    </section>
  );
}