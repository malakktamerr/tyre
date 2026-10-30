// import { useEffect, useRef, useState } from 'react';

// /* ─── Images for sliders ─────────────────────────────────────────────────── */
// const SLIDES = [
//   '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
//   '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
//   '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
//   '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg',
// ];

// const FILM_SLIDES = [
//   '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg',
//   '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
//   '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
//   '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
// ];

// /* ─── Auto-playing crossfade slider ─────────────────────────────────────── */
// function AutoSlider({ borderRadius }) {
//   const [curr, setCurr] = useState(0);
//   const [prev, setPrev] = useState(null);
//   const [fading, setFading] = useState(false);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setPrev(c => c);
//       setCurr(c => {
//         setPrev(c);
//         return (c + 1) % SLIDES.length;
//       });
//       setFading(true);
//       setTimeout(() => setFading(false), 900);
//     }, 3200);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius, overflow: 'hidden' }}>
//       <img
//         key={curr}
//         src={SLIDES[curr]}
//         alt={`slide ${curr + 1}`}
//         style={{
//           position: 'absolute', inset: 0,
//           width: '100%', height: '100%',
//           objectFit: 'cover', objectPosition: 'center top',
//           display: 'block',
//           opacity: fading ? 0 : 1,
//           transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
//           zIndex: 2,
//         }}
//       />
//       {prev !== null && (
//         <img
//           key={`prev-${prev}`}
//           src={SLIDES[prev]}
//           alt={`slide prev ${prev + 1}`}
//           style={{
//             position: 'absolute', inset: 0,
//             width: '100%', height: '100%',
//             objectFit: 'cover', objectPosition: 'center top',
//             display: 'block',
//             opacity: 1,
//             zIndex: 1,
//           }}
//         />
//       )}
//       <span style={{
//         position: 'absolute', top: '10px', right: '12px',
//         background: 'rgba(255,255,255,0.82)',
//         backdropFilter: 'blur(4px)',
//         borderRadius: '999px',
//         fontFamily: 'system-ui, sans-serif',
//         fontSize: '10px', fontWeight: 500, color: '#555',
//         padding: '3px 9px',
//         zIndex: 3,
//       }}>
//         {curr + 1} / {SLIDES.length}
//       </span>
//       <div style={{
//         position: 'absolute', bottom: '12px', left: '50%',
//         transform: 'translateX(-50%)',
//         display: 'flex', gap: '6px', zIndex: 3,
//       }}>
//         {SLIDES.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => { setPrev(curr); setCurr(i); setFading(true); setTimeout(() => setFading(false), 900); }}
//             style={{
//               width: i === curr ? 18 : 6, height: 6,
//               borderRadius: '999px',
//               background: i === curr ? '#fff' : 'rgba(255,255,255,0.5)',
//               border: 'none', cursor: 'pointer', padding: 0,
//               transition: 'width 0.3s, background 0.3s',
//             }}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ─── Film-strip slider ──────────────────────────────────────────────────── */
// function FilmStripSlider({ borderRadius = '16px' }) {
//   const [curr, setCurr] = useState(0);
//   const [sliding, setSliding] = useState(false);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setSliding(true);
//       setTimeout(() => {
//         setCurr(c => (c + 1) % FILM_SLIDES.length);
//         setSliding(false);
//       }, 650);
//     }, 3400);
//     return () => clearInterval(id);
//   }, []);

//   const next = (curr + 1) % FILM_SLIDES.length;

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius, overflow: 'hidden' }}>
//       <img
//         src={FILM_SLIDES[curr]}
//         alt=""
//         style={{
//           position: 'absolute', inset: 0,
//           width: '100%', height: '100%',
//           objectFit: 'cover', objectPosition: 'center',
//           display: 'block',
//           transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
//           transition: sliding ? 'transform 0.65s cubic-bezier(0.77,0,0.18,1)' : 'none',
//           zIndex: 2,
//         }}
//       />
//       <img
//         src={FILM_SLIDES[next]}
//         alt=""
//         style={{
//           position: 'absolute', inset: 0,
//           width: '100%', height: '100%',
//           objectFit: 'cover', objectPosition: 'center',
//           display: 'block',
//           transform: sliding ? 'translateY(0)' : 'translateY(100%)',
//           transition: sliding ? 'transform 0.65s cubic-bezier(0.77,0,0.18,1)' : 'none',
//           zIndex: 1,
//         }}
//       />
//     </div>
//   );
// }

// /* ─── Fade-up on scroll ────────────────────────────────────────────────    */
// function useFadeUp(selector) {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const items = el.querySelectorAll(selector);
//     items.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(32px)'; });
//     const obs = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         items.forEach((c, i) => setTimeout(() => {
//           c.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
//           c.style.opacity = '1'; c.style.transform = 'translateY(0)';
//         }, i * 140));
//         obs.disconnect();
//       }
//     }, { threshold: 0.12 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [selector]);
//   return ref;
// }

// /* ─── Page ───────────────────────────────────────────────────────────────── */
// export default function OurStoryPage() {
//   const sec3Ref = useFadeUp('.s3-anim');
//   const sec4Ref = useFadeUp('.s4-anim');
//   const sec5Ref = useFadeUp('.s5-anim');

//   const details = [
//     {
//       img: '/tyre.png',
//       label: 'THE TREAD',
//       desc: 'The foundation of every drive.',
//     },
//     {
//       img: '/tyre2.png',
//       label: 'THE SIDEWALL',
//       desc: 'Strong, visible, and intentional.',
//     },
//     {
//       img: '/tyre3.png',
//       label: 'THE PROFILE',
//       desc: 'Read the size and ratings on the sidewall.',
//     },
//   ];

//   return (
//     <div style={{ background: '#FAF6EF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>

//       {/* Responsive CSS Overrides for Mobile & Tablet */}
//       <style>{`
//         @media (max-width: 767px) {
//           .os-sec1 { flex-direction: column !important; padding: 32px 20px !important; text-align: center !important; gap: 24px !important; }
//           .os-sec1-text { max-width: 100% !important; }
//           .os-sec1-text h1 { font-size: clamp(28px, 7vw, 40px) !important; }
//           .os-sec1-image { width: 100% !important; max-width: 280px !important; margin: 0 auto !important; }

//           .os-sec2 { min-height: auto !important; padding: 40px 16px !important; }
//           .os-sec2-card { padding: 32px 20px !important; max-width: 100% !important; }
//           .os-sec2-card h2 { font-size: clamp(24px, 6vw, 36px) !important; }
//           .os-stats-grid { grid-template-columns: 1fr !important; gap: 20px !important; }

//           .os-sec3 { padding: 40px 20px !important; gap: 24px !important; }
//           .os-sec3-title h2 { white-space: normal !important; font-size: clamp(28px, 7vw, 42px) !important; }

//           .os-sec4 { padding: 40px 20px !important; }
//           .os-sec4-inner { flex-direction: column !important; gap: 32px !important; }
//           .os-sec4-film { max-width: 100% !important; width: 100% !important; }

//           .os-sec5 { padding: 40px 20px !important; }
//           .os-sec5 div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; gap: 36px !important; }
//         }

//         @media (min-width: 768px) and (max-width: 1100px) {
//           .os-sec1 { padding: 32px 36px !important; }
//           .os-sec2-card { max-width: 90% !important; padding: 40px !important; }
//           .os-sec3 { padding: 48px 36px !important; }
//           .os-sec4 { padding: 48px 36px !important; }
//         }
//       `}</style>

//       {/* ── Section 1: Hero ── */}
//       <section className="os-sec1" style={{
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         gap: '32px', padding: 'clamp(32px,4vw,64px) clamp(40px,6%,100px)', flexWrap: 'wrap',
//         backgroundColor: '#ffffff', position: 'relative', boxSizing: 'border-box', width: '100%'
//       }}>
//         <div className="os-sec1-text" style={{ flex: '1 1 420px', maxWidth: '580px', position: 'relative', zIndex: 2 }}>
//           <h1 
//   style={{ 
//     fontFamily: "var(--font-heading), 'PostNoBillsColombo', sans-serif", 
//     fontSize: 'clamp(36px, 4.5vw, 64px)', 
//     fontWeight: 400, 
//     lineHeight: 1.15, 
//     color: '#1a1a1a', 
//     margin: '0 0 clamp(16px,2vw,24px)', 
//     letterSpacing: '0.03em' // تم تعديلها لتجنب تداخل الحروف مع الحفاظ على مظهر الخط
//   }}
// >
//   Made for the road.<br />
//   Driven by people.
// </h1>
//           <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 'clamp(14px,1.1vw,16px)', fontWeight: 400, lineHeight: 1.6, color: '#444', margin: 0, maxWidth: '480px' }}>
//             nesej is a name that feels at home on the road. It describes how we choose tyres — and how we see every journey.
//           </p>
//         </div>

//         <div className="os-sec1-image" style={{
//           flex: '0 0 auto',
//           width: 'clamp(280px,40vw,480px)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           position: 'relative', flexShrink: 0,
//         }}>
//           <img 
//             src="/twotyres.png" 
//             alt="Two tyres showcase" 
//             style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} 
//           />
//         </div>
//       </section>

//       {/* ── Section 2: Tyres for every road ── */}
//       <section className="os-sec2" style={{ position: 'relative', width: '100%', overflow: 'hidden', minHeight: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
//         <img src="/not.jpg" alt="Tyre background texture"
//           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        
//         <div className="os-sec2-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(245,245,245,0.92) 0%, rgba(235,235,235,0.88) 100%)', zIndex: 1 }} />

//         <div className="os-sec2-card" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '56px 32px', display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left', boxSizing: 'border-box' }}>
          
//           <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 4.8vw, 68px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#1a1a1a', margin: 0 }}>
//             Tyres for every road and every season.
//           </h2>

//           <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.6, color: '#2a2a2a', margin: '0 0 12px 0', maxWidth: '880px' }}>
//             We choose tyres for passenger cars, SUVs and vans. Tyres that feel dependable, but never complicated. Tyres that fit into journeys as they really happen.
//           </p>

//           <div style={{ width: '100%', height: '1px', background: '#d0ccc7', margin: '0 0 4px 0' }} />

//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', width: '100%' }} className="os-stats-grid">
//             {[
//               ['RIM SIZE IN INCHES', 'R13-R17'],
//               ['VEHICLE CATEGORIES', 'Car · SUV · Van'],
//               ['EASY 14-DAY RETURNS', '14 days']
//             ].map(([label, val]) => (
//               <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                 <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7000', margin: 0 }}>
//                   {label}
//                 </p>
//                 <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 500, color: '#1a1a1a', margin: 0, lineHeight: 1.3 }}>
//                   {val}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* ── Section 3: Grip, traction, together ── */}
//       <section ref={sec3Ref} className="os-sec3" style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(32px,6vw,96px)', padding: 'clamp(48px,6vw,88px) clamp(40px,6%,96px)', flexWrap: 'wrap', background: '#ffffff', width: '100%', boxSizing: 'border-box' }}>
//         <div className="os-sec3-title" style={{ flex: '1 1 360px', maxWidth: '540px' }}>
//           <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.2vw, 56px)', fontWeight: 400, lineHeight: 1.12, color: '#1a1a1a', margin: 0, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
//             Grip, traction, together.
//           </h2>
//         </div>
//         <div style={{ flex: '1 1 280px', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
//           {[
//             { t: 'Every tyre is tread meeting road. That is our idea of service too: different journeys, supported together.', c: '#222', s: 'clamp(15px,1.2vw,18px)' },
//             { t: 'Tread and sidewall: details worth understanding.', c: '#555', s: 'clamp(14px,1.1vw,17px)' },
//             { t: 'Road contact: where every journey begins.', c: '#555', s: 'clamp(14px,1.1vw,17px)' },
//           ].map((p, i) => (
//             <p key={i} className="s3-anim" style={{ fontFamily: 'system-ui,sans-serif', fontSize: p.s, lineHeight: 1.65, color: p.c, margin: 0 }}>{p.t}</p>
//           ))}
//         </div>
//       </section>

//       {/* ── Section 4: Clear advice. Considered choices. ── */}
//       <section ref={sec4Ref} className="os-sec4" style={{ background: '#F5EFE6', padding: 'clamp(32px,4vw,64px) clamp(24px,6%,88px)', width: '100%', boxSizing: 'border-box' }}>
        
//         <h2 className="s4-anim" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 400, color: '#8B7000', margin: '0 0 clamp(28px,3.5vw,48px)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
//           Clear advice. Considered choices.
//         </h2>

//         <div className="os-sec4-inner" style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
          
//           <div className="s4-anim os-sec4-film" style={{ flex: '1 1 320px', maxWidth: '420px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <img src="/tyre.png" alt="Tyre showcase" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
//           </div>

//           <div className="os-sec4-text" style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 'clamp(20px,2.5vw,32px)' }}>
//             <h3 className="s4-anim" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 400, color: '#1a1a1a', margin: 0, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
//               These three principles guide every tyre we choose.
//             </h3>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,24px)' }}>
//               {[
//                 { 
//                   svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B7000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, 
//                   title: 'Welcoming', 
//                   desc: 'Options for passenger cars, SUVs and vans.' 
//                 },
//                 { 
//                   svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B7000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, 
//                   title: 'Considered', 
//                   desc: 'Clear size and specification details to help you choose.' 
//                 },
//                 { 
//                   svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B7000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, 
//                   title: 'Practical', 
//                   desc: 'Everyday guidance for looking after your tyres.' 
//                 },
//               ].map((p) => (
//                 <div key={p.title} className="s4-anim" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
//                   <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', border: '1px solid #d4c8b8', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
//                     {p.svg}
//                   </div>
//                   <div>
//                     <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(16px,1.4vw,20px)', fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px', lineHeight: 1.2 }}>
//                       {p.title}
//                     </p>
//                     <p style={{ fontFamily: 'system-ui', fontSize: 'clamp(12px,0.95vw,14px)', color: '#666', margin: 0, lineHeight: 1.5 }}>
//                       {p.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ── Section 5: Details are the luxury. ── */}
//       <section 
//         ref={sec5Ref}
//         className="os-sec5" 
//         style={{ 
//           background: '#ffffff', 
//           padding: 'clamp(48px,6vw,96px) clamp(24px,6%,88px)',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 'clamp(36px,5vw,64px)',
//           width: '100%',
//           boxSizing: 'border-box'
//         }}
//       >
//         <h2 
//   className="s5-anim" 
//   style={{ 
//     fontFamily: "var(--font-heading), 'PostNoBillsColombo', sans-serif", 
//     fontSize: 'clamp(32px, 4.5vw, 64px)', 
//     fontWeight: 400, 
//     color: '#1a1a1a', 
//     margin: 0, 
//     textAlign: 'center',
//     letterSpacing: '0.03em' // تم تعديلها لإعطاء مسافة مريحة بين الحروف
//   }}
// >
//   Details are the luxury.
// </h2>

//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
//           gap: 'clamp(24px,4vw,48px)', 
//           width: '100%', 
//           maxWidth: '1100px' 
//         }}>
//           {details.map((item, index) => (
//             <div 
//               key={index} 
//               className="s5-anim"
//               style={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'flex-start' 
//               }}
//             >
//               <div style={{ 
//                 width: '100%', 
//                 height: 'clamp(200px, 22vw, 280px)', 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center',
//                 marginBottom: '20px'
//               }}>
//                 <img 
//                   src={item.img} 
//                   alt={item.label} 
//                   style={{ 
//                     maxHeight: '100%', 
//                     maxWidth: '100%', 
//                     objectFit: 'contain' 
//                   }} 
//                 />
//               </div>

//               <p style={{ 
//                 fontFamily: 'system-ui, sans-serif', 
//                 fontSize: '10px', 
//                 fontWeight: 700, 
//                 letterSpacing: '0.08em', 
//                 textTransform: 'uppercase', 
//                 color: '#8B7000', 
//                 margin: '0 0 6px 0' 
//               }}>
//                 {item.label}
//               </p>

//               <p style={{ 
//                 fontFamily: 'system-ui, sans-serif', 
//                 fontSize: 'clamp(12px, 0.95vw, 14px)', 
//                 color: '#666', 
//                 margin: 0,
//                 lineHeight: 1.5 
//               }}>
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── Banner — last section with top-to-bottom vertical gradient ── */}
//       <section style={{
//         width: '100%',
//         padding: 'clamp(64px, 8vw, 120px) clamp(20px, 6%, 80px)',
//         background: 'linear-gradient(180deg, #3d3d3d 0%, #1f1f1f 50%, #0a0a0a 100%)',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: 'clamp(20px, 3vw, 28px)',
//         textAlign: 'center',
//         boxSizing: 'border-box',
//       }}>
//         <h2 style={{
//           fontFamily: 'var(--font-heading)',
//           fontSize: 'clamp(24px, 3.8vw, 52px)',
//           fontWeight: 400,
//           color: '#ffffff',
//           margin: 0,
//           lineHeight: 1.15,
//           letterSpacing: '-0.02em',
//         }}>
//           Grip for every road, chosen for real life.
//         </h2>
//         <a
//           href="/shop"
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             background: '#1a1a1a',
//             color: '#ffffff',
//             borderRadius: '999px',
//             fontFamily: 'system-ui, sans-serif',
//             fontSize: 'clamp(12px, 1.1vw, 14px)',
//             fontWeight: 500,
//             letterSpacing: '0.02em',
//             padding: '12px 28px',
//             textDecoration: 'none',
//             border: '1px solid rgba(255,255,255,0.15)',
//             transition: 'background 0.2s, border-color 0.2s',
//           }}
//           onMouseEnter={e => {
//             e.currentTarget.style.background = '#2c2c2c';
//             e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
//           }}
//           onMouseLeave={e => {
//             e.currentTarget.style.background = '#1a1a1a';
//             e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
//           }}
//         >
//           Shop new arrivals
//         </a>
//       </section>

//     </div>
//   );
// }

import { useEffect, useRef, useState } from 'react';

/* ─── Images for sliders ─────────────────────────────────────────────────── */
const SLIDES = [
  '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
  '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
  '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
  '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg',
];

const FILM_SLIDES = [
  '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg',
  '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
  '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
  '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
];

/* ─── Auto-playing crossfade slider ─────────────────────────────────────── */
function AutoSlider({ borderRadius }) {
  const [curr, setCurr] = useState(0);
  const [prev, setPrev] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(c => c);
      setCurr(c => {
        setPrev(c);
        return (c + 1) % SLIDES.length;
      });
      setFading(true);
      setTimeout(() => setFading(false), 900);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius, overflow: 'hidden' }}>
      <img
        key={curr}
        src={SLIDES[curr]}
        alt={`slide ${curr + 1}`}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          display: 'block',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 2,
        }}
      />
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={SLIDES[prev]}
          alt={`slide prev ${prev + 1}`}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
            opacity: 1,
            zIndex: 1,
          }}
        />
      )}
      <span style={{
        position: 'absolute', top: '10px', right: '12px',
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(4px)',
        borderRadius: '999px',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '10px', fontWeight: 500, color: '#555',
        padding: '3px 9px',
        zIndex: 3,
      }}>
        {curr + 1} / {SLIDES.length}
      </span>
      <div style={{
        position: 'absolute', bottom: '12px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '6px', zIndex: 3,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(curr); setCurr(i); setFading(true); setTimeout(() => setFading(false), 900); }}
            style={{
              width: i === curr ? 18 : 6, height: 6,
              borderRadius: '999px',
              background: i === curr ? '#fff' : 'rgba(255,255,255,0.5)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s, background 0.3s',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Film-strip slider ──────────────────────────────────────────────────── */
function FilmStripSlider({ borderRadius = '16px' }) {
  const [curr, setCurr] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSliding(true);
      setTimeout(() => {
        setCurr(c => (c + 1) % FILM_SLIDES.length);
        setSliding(false);
      }, 650);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  const next = (curr + 1) % FILM_SLIDES.length;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius, overflow: 'hidden' }}>
      <img
        src={FILM_SLIDES[curr]}
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
          transition: sliding ? 'transform 0.65s cubic-bezier(0.77,0,0.18,1)' : 'none',
          zIndex: 2,
        }}
      />
      <img
        src={FILM_SLIDES[next]}
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          transform: sliding ? 'translateY(0)' : 'translateY(100%)',
          transition: sliding ? 'transform 0.65s cubic-bezier(0.77,0,0.18,1)' : 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}

/* ─── Fade-up on scroll ────────────────────────────────────────────────    */
function useFadeUp(selector) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(selector);
    items.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(32px)'; });
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((c, i) => setTimeout(() => {
          c.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
          c.style.opacity = '1'; c.style.transform = 'translateY(0)';
        }, i * 140));
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [selector]);
  return ref;
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function OurStoryPage() {
  const sec3Ref = useFadeUp('.s3-anim');
  const sec4Ref = useFadeUp('.s4-anim');
  const sec5Ref = useFadeUp('.s5-anim');

  const details = [
    {
      img: '/tyre.png',
      label: 'THE TREAD',
      desc: 'The foundation of every drive.',
    },
    {
      img: '/tyre2.png',
      label: 'THE SIDEWALL',
      desc: 'Strong, visible, and intentional.',
    },
    {
      img: '/tyre3.png',
      label: 'THE PROFILE',
      desc: 'Read the size and ratings on the sidewall.',
    },
  ];

  return (
    <div style={{ background: '#FAF6EF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>

      {/* Responsive CSS Overrides for Mobile & Tablet */}
      <style>{`
        @media (max-width: 767px) {
          .os-sec1 { flex-direction: column !important; padding: 32px 20px !important; text-align: center !important; gap: 24px !important; }
          .os-sec1-text { max-width: 100% !important; }
          .os-sec1-text h1 { font-size: clamp(28px, 7vw, 40px) !important; }
          .os-sec1-image { width: 100% !important; max-width: 280px !important; margin: 0 auto !important; }

          .os-sec2 { min-height: auto !important; padding: 40px 16px !important; }
          .os-sec2-card { padding: 32px 20px !important; max-width: 100% !important; }
          .os-sec2-card h2 { font-size: clamp(24px, 6vw, 36px) !important; }
          .os-stats-grid { grid-template-columns: 1fr !important; gap: 20px !important; }

          .os-sec3 { padding: 40px 20px !important; gap: 24px !important; }
          .os-sec3-title h2 { white-space: normal !important; font-size: clamp(28px, 7vw, 42px) !important; }

          .os-sec4 { padding: 40px 20px !important; }
          .os-sec4-inner { flex-direction: column !important; gap: 32px !important; }
          .os-sec4-film { max-width: 100% !important; width: 100% !important; }

          .os-sec5 { padding: 40px 20px !important; }
          .os-sec5 div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; gap: 36px !important; }
        }

        @media (min-width: 768px) and (max-width: 1100px) {
          .os-sec1 { padding: 32px 36px !important; }
          .os-sec2-card { max-width: 90% !important; padding: 40px !important; }
          .os-sec3 { padding: 48px 36px !important; }
          .os-sec4 { padding: 48px 36px !important; }
        }
      `}</style>

      {/* ── Section 1: Hero ── */}
      <section className="os-sec1" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '32px', padding: 'clamp(32px,4vw,64px) clamp(40px,6%,100px)', flexWrap: 'wrap',
        backgroundColor: '#ffffff', position: 'relative', boxSizing: 'border-box', width: '100%'
      }}>
        <div className="os-sec1-text" style={{ flex: '1 1 420px', maxWidth: '580px', position: 'relative', zIndex: 2 }}>
          <h1 
            style={{ 
              fontFamily: "'PostNoBillsColombo', sans-serif", 
              fontSize: 'clamp(36px, 4.5vw, 64px)', 
              fontWeight: 400, 
              lineHeight: 1.15, 
              color: '#1a1a1a', 
              margin: '0 0 clamp(16px,2vw,24px)', 
              letterSpacing: '0.03em' 
            }}
          >
            Made for the road.<br />
            Driven by people.
          </h1>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 'clamp(14px,1.1vw,16px)', fontWeight: 400, lineHeight: 1.6, color: '#444', margin: 0, maxWidth: '480px' }}>
            nesej is a name that feels at home on the road. It describes how we choose tyres — and how we see every journey.
          </p>
        </div>

        <div className="os-sec1-image" style={{
          flex: '0 0 auto',
          width: 'clamp(280px,40vw,480px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', flexShrink: 0,
        }}>
          <img 
            src="/twotyres.png" 
            alt="Two tyres showcase" 
            style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} 
          />
        </div>
      </section>

      {/* ── Section 2: Tyres for every road ── */}
      <section className="os-sec2" style={{ position: 'relative', width: '100%', overflow: 'hidden', minHeight: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
        <img src="/not.jpg" alt="Tyre background texture"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        
        <div className="os-sec2-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(245,245,245,0.92) 0%, rgba(235,235,235,0.88) 100%)', zIndex: 1 }} />

        <div className="os-sec2-card" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '56px 32px', display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left', boxSizing: 'border-box' }}>
          
          <h2 style={{ fontFamily: "'PostNoBillsColombo', sans-serif", fontSize: 'clamp(36px, 4.8vw, 68px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '0.03em', color: '#1a1a1a', margin: 0 }}>
            Tyres for every road and every season.
          </h2>

          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.6, color: '#2a2a2a', margin: '0 0 12px 0', maxWidth: '880px' }}>
            We choose tyres for passenger cars, SUVs and vans. Tyres that feel dependable, but never complicated. Tyres that fit into journeys as they really happen.
          </p>

          <div style={{ width: '100%', height: '1px', background: '#d0ccc7', margin: '0 0 4px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', width: '100%' }} className="os-stats-grid">
            {[
              ['RIM SIZE IN INCHES', 'R13-R17'],
              ['VEHICLE CATEGORIES', 'Car · SUV · Van'],
              ['EASY 14-DAY RETURNS', '14 days']
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7000', margin: 0 }}>
                  {label}
                </p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 500, color: '#1a1a1a', margin: 0, lineHeight: 1.3 }}>
                  {val}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Section 3: Grip, traction, together ── */}
      <section ref={sec3Ref} className="os-sec3" style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(32px,6vw,96px)', padding: 'clamp(48px,6vw,88px) clamp(40px,6%,96px)', flexWrap: 'wrap', background: '#ffffff', width: '100%', boxSizing: 'border-box' }}>
        <div className="os-sec3-title" style={{ flex: '1 1 360px', maxWidth: '540px' }}>
          <h2 style={{ fontFamily: "'PostNoBillsColombo', sans-serif", fontSize: 'clamp(32px, 4.2vw, 56px)', fontWeight: 400, lineHeight: 1.12, color: '#1a1a1a', margin: 0, letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
            Grip, traction, together.
          </h2>
        </div>
        <div style={{ flex: '1 1 280px', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { t: 'Every tyre is tread meeting road. That is our idea of service too: different journeys, supported together.', c: '#222', s: 'clamp(15px,1.2vw,18px)' },
            { t: 'Tread and sidewall: details worth understanding.', c: '#555', s: 'clamp(14px,1.1vw,17px)' },
            { t: 'Road contact: where every journey begins.', c: '#555', s: 'clamp(14px,1.1vw,17px)' },
          ].map((p, i) => (
            <p key={i} className="s3-anim" style={{ fontFamily: 'system-ui,sans-serif', fontSize: p.s, lineHeight: 1.65, color: p.c, margin: 0 }}>{p.t}</p>
          ))}
        </div>
      </section>

      {/* ── Section 4: Clear advice. Considered choices. ── */}
      <section ref={sec4Ref} className="os-sec4" style={{ background: '#F5EFE6', padding: 'clamp(32px,4vw,64px) clamp(24px,6%,88px)', width: '100%', boxSizing: 'border-box' }}>
        
        <h2 className="s4-anim" style={{ fontFamily: "'PostNoBillsColombo', sans-serif", fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 400, color: '#8B7000', margin: '0 0 clamp(28px,3.5vw,48px)', letterSpacing: '0.03em', lineHeight: 1.15 }}>
          Clear advice. Considered choices.
        </h2>

        <div className="os-sec4-inner" style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <div className="s4-anim os-sec4-film" style={{ flex: '1 1 320px', maxWidth: '420px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/tyre.png" alt="Tyre showcase" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>

          <div className="os-sec4-text" style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 'clamp(20px,2.5vw,32px)' }}>
            <h3 className="s4-anim" style={{ fontFamily: "'PostNoBillsColombo', sans-serif", fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 400, color: '#1a1a1a', margin: 0, lineHeight: 1.15, letterSpacing: '0.03em' }}>
              These three principles guide every tyre we choose.
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,24px)' }}>
              {[
                { 
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B7000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, 
                  title: 'Welcoming', 
                  desc: 'Options for passenger cars, SUVs and vans.' 
                },
                { 
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B7000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, 
                  title: 'Considered', 
                  desc: 'Clear size and specification details to help you choose.' 
                },
                { 
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B7000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, 
                  title: 'Practical', 
                  desc: 'Everyday guidance for looking after your tyres.' 
                },
              ].map((p) => (
                <div key={p.title} className="s4-anim" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', border: '1px solid #d4c8b8', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                    {p.svg}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(16px,1.4vw,20px)', fontWeight: 500, color: '#1a1a1a', margin: '0 0 2px', lineHeight: 1.2 }}>
                      {p.title}
                    </p>
                    <p style={{ fontFamily: 'system-ui', fontSize: 'clamp(12px,0.95vw,14px)', color: '#666', margin: 0, lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Section 5: Details are the luxury. ── */}
      <section 
        ref={sec5Ref}
        className="os-sec5" 
        style={{ 
          background: '#ffffff', 
          padding: 'clamp(48px,6vw,96px) clamp(24px,6%,88px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(36px,5vw,64px)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <h2 
          className="s5-anim" 
          style={{ 
            fontFamily: "'PostNoBillsColombo', sans-serif", 
            fontSize: 'clamp(32px, 4.5vw, 64px)', 
            fontWeight: 400, 
            color: '#1a1a1a', 
            margin: 0, 
            textAlign: 'center',
            letterSpacing: '0.03em' 
          }}
        >
          Details are the luxury.
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: 'clamp(24px,4vw,48px)', 
          width: '100%', 
          maxWidth: '1100px' 
        }}>
          {details.map((item, index) => (
            <div 
              key={index} 
              className="s5-anim"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start' 
              }}
            >
              <div style={{ 
                width: '100%', 
                height: 'clamp(200px, 22vw, 280px)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <img 
                  src={item.img} 
                  alt={item.label} 
                  style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
              </div>

              <p style={{ 
                fontFamily: 'system-ui, sans-serif', 
                fontSize: '10px', 
                fontWeight: 700, 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase', 
                color: '#8B7000', 
                margin: '0 0 6px 0' 
              }}>
                {item.label}
              </p>

              <p style={{ 
                fontFamily: 'system-ui, sans-serif', 
                fontSize: 'clamp(12px, 0.95vw, 14px)', 
                color: '#666', 
                margin: 0,
                lineHeight: 1.5 
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Banner — last section with top-to-bottom vertical gradient ── */}
      <section style={{
        width: '100%',
        padding: 'clamp(64px, 8vw, 120px) clamp(20px, 6%, 80px)',
        background: 'linear-gradient(180deg, #3d3d3d 0%, #1f1f1f 50%, #0a0a0a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(20px, 3vw, 28px)',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}>
        <h2 style={{
          fontFamily: "'PostNoBillsColombo', sans-serif",
          fontSize: 'clamp(24px, 3.8vw, 52px)',
          fontWeight: 400,
          color: '#ffffff',
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: '0.03em',
        }}>
          Grip for every road, chosen for real life.
        </h2>
        <a
          href="/shop"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a1a',
            color: '#ffffff',
            borderRadius: '999px',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 'clamp(12px, 1.1vw, 14px)',
            fontWeight: 500,
            letterSpacing: '0.02em',
            padding: '12px 28px',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#2c2c2c';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#1a1a1a';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          }}
        >
          Shop new arrivals
        </a>
      </section>

    </div>
  );
}