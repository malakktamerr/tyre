import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Clear specifications',
    body: 'Compare tyre size, load index and speed rating before you choose.',
  },
  {
    title: 'The right fit',
    body: 'Check your vehicle handbook and tyre sidewall for the correct fitment.',
  },
  {
    title: 'Everyday care',
    body: 'Simple guidance on pressure, tread checks and looking after your tyres.',
  },
];

export default function OurStorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add('story-animate-paused');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('story-animate-paused');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="story-section relative w-full overflow-hidden bg-[#4e5155]">

      {/* Main Container */}
      <div className="relative w-full overflow-hidden flex flex-col justify-between"
           style={{ minHeight: '440px', maxHeight: '500px' }}>

        {/* Background Tyre Image - إظهار الجزء العلوي (قوس الإطار) فقط خلف النصوص */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <img
            src="/bgimg.png"
            alt="Tyre background"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 12%', // يركز على الجزء العلوي من الكاوتش
              opacity: 0.6,
            }}
          />
        </div>

        {/* Smooth Grey Overlay */}
        <div 
          className="absolute inset-0 z-[1]" 
          style={{ 
            background: 'linear-gradient(180deg, rgba(65,68,73,0.85) 0%, rgba(45,48,52,0.75) 50%, rgba(25,27,30,0.92) 100%), radial-gradient(circle at center, rgba(90,93,98,0.3) 0%, rgba(15,17,20,0.8) 100%)' 
          }} 
        />

        {/* ════════════ TOP CONTENT ════════════ */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 pt-12 md:pt-14">
          <h2
            className="mb-3 text-white tracking-normal"
            style={{
              fontFamily: "'post no pills combo', sans-serif",
              fontSize: 'clamp(32px, 4.2vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.08,
            }}
          >
            Every journey starts with the right tyres
          </h2>

          <p
            className="mb-4 text-white/80 max-w-xl"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              lineHeight: 1.5,
            }}
          >
            From city streets to weekends away, find tyres for the way you drive. Compare sizes and choose with care.
          </p>

          <Link
            to="/hero"
            className="inline-flex items-center gap-2 text-[#FFC700] text-[14px] font-medium no-underline hover:opacity-90 transition-opacity"
          >
            <span className="underline underline-offset-4 decoration-[#FFC700]">Read our story</span>
            <span className="no-underline">→</span>
          </Link>
        </div>

        {/* ════════════ BOTTOM FEATURES ROW ════════════ */}
        <div className="relative z-10 w-full pb-10 pt-4">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col gap-1.5">
                <h3
                  className="text-white text-[15px] md:text-[16px] font-normal leading-snug"
                  style={{ fontFamily: 'var(--font-heading), serif' }}
                >
                  {f.title}
                </h3>
                <p className="text-white/65 text-[11px] md:text-[12px] leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}