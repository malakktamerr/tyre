import { Link } from 'react-router-dom';

/* ─── Bottom info bar items ─────────────────────────────────────────────── */
const infoItems = [
  'FREE DELIVERY OVER EGP 2,000',
  'FREE DELIVERY OVER EGP 2,000',
  'DESIGNED FOR EVERY BODY',
  'EASY 14-DAY RETURNS',
  'MADE FOR REAL LIFE',
];

export default function HeroSection() {
  return (
    <section className="flex flex-col bg-white overflow-hidden isolate">

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT  (visible below md)
          Full-screen photo + text overlay
      ═══════════════════════════════════════════════ */}
      <div 
  className="relative w-full flex items-end md:hidden overflow-hidden bg-black"
  style={{ height: 'calc(100svh - 91px)', minHeight: '520px', maxHeight: '780px' }}
>
  {/* Background photo - تم تعديل الـ objectPosition لضبط مكان الكاوتش في الشاشة */}
  <img
    src="/maintyre.png"
    alt="Car tyres in smoke background"
    className="absolute inset-0 w-full h-full object-cover hero-ken-burns"
    style={{ objectPosition: '75% center' }}
  />

  {/* Dark gradient overlay */}
  <div 
    className="absolute inset-0 z-10 pointer-events-none"
    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.2) 100%)' }} 
  />

  {/* Text content */}
  <div className="relative z-20 w-full px-5 pb-9">
    <h1 
      className="hero-text-enter hero-text-d2 font-normal leading-[1.06] tracking-[-0.02em] text-white mb-3.5"
      style={{ fontFamily: "'post no pills combo', sans-serif", fontSize: 'clamp(36px, 10vw, 52px)' }}
    >
      Made for<br />every<br />road.
    </h1>

    <p 
      className="hero-text-enter hero-text-d3 text-[13px] leading-relaxed text-white/80 mb-5"
      style={{ maxWidth: '320px' }}
    >
      Find tyres for your car, your roads and your everyday journeys.
    </p>

    <div className="hero-text-enter hero-text-d4 flex flex-col gap-2.5">
      <Link
        to="/new-arrivals"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-2.5 text-[13px] font-medium text-black no-underline transition-opacity hover:opacity-90 text-center"
        style={{ background: '#FFC700' }}
      >
        Shop new arrivals
      </Link>
      <Link
        to="/shop"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/70 bg-transparent px-7 py-2.5 text-[13px] font-medium text-white no-underline transition-colors hover:bg-white/10 text-center"
      >
        Explore the range
      </Link>
    </div>
  </div>
</div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT  (visible from md and above)
          Matches your uploaded image exactly
      ═══════════════════════════════════════════════ */}
      <div className="hidden md:relative md:flex md:w-full md:items-center md:overflow-hidden"
           style={{ height: 'calc(100vh - 91px)', minHeight: '600px', maxHeight: '850px' }}>

        {/* Background photo */}
        <div
          className="hero-ken-burns absolute inset-0 bg-cover bg-center overflow-hidden"
          role="img"
          aria-label="Car tyres in smoke background"
          style={{ backgroundImage: 'url("/maintyre.png")' }}
        />

        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />

        {/* Desktop Text content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-12 lg:px-16 flex flex-col justify-center">

          <h1 
              className="hero-text-enter hero-text-d2 font-post text-white mb-6"
            style={{ 
             fontFamily: "'post no pills combo', sans-serif", 
             fontSize: 'clamp(45px, 5.5vw, 75px)',
             lineHeight: '0.95',
             letterSpacing: '-0.01em'
            }}
                       >
  Made for<br />
  every<br />
  road.
</h1>

          <p className="hero-text-enter hero-text-d3 text-[15px] lg:text-[16px] leading-relaxed text-white/85 mb-8"
             style={{ maxWidth: '400px' }}>
            Find tyres for your car, your roads and your everyday journeys.
          </p>

          <div className="hero-text-enter hero-text-d4 flex items-center gap-4">
            <Link
              to="/new-arrivals"
              className="inline-flex items-center whitespace-nowrap rounded-full px-8 py-3 text-[14px] font-medium text-black no-underline transition-opacity hover:opacity-90 shadow-lg"
              style={{ background: '#FFC700' }}
            >
              Shop new arrivals
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center whitespace-nowrap rounded-full border border-white/70 bg-transparent px-8 py-3 text-[14px] font-medium text-white no-underline transition-colors hover:bg-white/10"
            >
              Explore the range
            </Link>
          </div>
        </div>
      </div>


      {/* ── Marquee bar — shared ── */}
      <div className="marquee-wrapper overflow-hidden w-full border-t border-[#e5e5e5] py-[11px] shrink-0 "
           style={{ background: '#FFC700' }}>
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {infoItems.map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-[10px] font-medium tracking-[0.10em] text-[#1a1a1a] uppercase whitespace-nowrap px-8">
                    {item}
                  </span>
                  <span className="text-[10px] text-[#1a1a1a] opacity-25" aria-hidden="true">|</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
