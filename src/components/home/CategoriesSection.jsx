// import { Link } from 'react-router-dom';

// const categories = [
//   {
//     name: 'Passenger',
//     path: '/categories/passenger',
//     img: '/Passenger.png', // أو رابط الصورة المناسب عندك
//   },
//   {
//     name: 'SUV',
//     path: '/categories/suv',
//     img: '/SUV.png',
//   },
//   {
//     name: 'Van',
//     path: '/categories/van',
//     img: '/Van.png',
//   },
//   {
//     name: 'New tyres',
//     path: '/new-arrivals',
//     img: '/New.png',
//   },
//   {
//     name: 'Everyday tyres',
//     path: '/featured-products',
//     img: '/Everyday.png',
//   },
// ];

// export default function CategoriesSection() {
//   /* duplicate list for seamless infinite loop */
//   const items = [...categories, ...categories];

//   return (
//     <section style={{ background: '#ffffff', padding: '56px 0 64px', overflow: 'hidden' }}>

//       {/* ── Track wrapper — clips overflow, pauses on hover ── */}
//       <div
//         className="cat-carousel-wrapper"
//         style={{ overflow: 'hidden', width: '100%' }}
//       >
//         <div
//           className="cat-carousel-track"
//           style={{
//             display: 'flex',
//             gap: '48px',
//             width: 'max-content',
//           }}
//         >
//           {items.map((cat, idx) => (
//             <Link
//               key={idx}
//               to={cat.path}
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: '16px',
//                 textDecoration: 'none',
//                 flexShrink: 0,
//               }}
//               className="cat-item"
//             >
//               {/* Card / Image Container */}
//               <div
//                 className="cat-circle"
//                 style={{
//                   width: 'clamp(120px, 13vw, 180px)',
//                   height: 'clamp(150px, 16vw, 220px)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   overflow: 'hidden',
//                   background: 'transparent',
//                   flexShrink: 0,
//                   transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
//                 }}
//               >
//                 <img
//                   src={cat.img}
//                   alt={cat.name}
//                   className="cat-photo"
//                   style={{
//                     maxHeight: '100%',
//                     maxWidth: '100%',
//                     objectFit: 'contain',
//                     display: 'block',
//                     transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
//                   }}
//                   loading="lazy"
//                 />
//               </div>

//               {/* Label */}
//               <span style={{
//                 fontFamily: 'var(--font-heading), sans-serif',
//                 fontSize: '17px',
//                 fontWeight: 400,
//                 lineHeight: '100%',
//                 textAlign: 'center',
//                 color: '#1a1a1a',
//               }}>
//                 {cat.name}
//               </span>
//             </Link>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         /* ── Scroll animation ── */
//         @keyframes cat-scroll {
//           0%   { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }

//         .cat-carousel-track {
//           animation: cat-scroll 25s linear infinite;
//         }

//         /* pause on hover */
//         @media (hover: hover) {
//           .cat-carousel-wrapper:hover .cat-carousel-track {
//             animation-play-state: paused;
//           }
//         }

//         /* respect reduced motion */
//         @media (prefers-reduced-motion: reduce) {
//           .cat-carousel-track {
//             animation: none;
//           }
//         }

//         /* hover lift on each item */
//         .cat-item:hover .cat-circle {
//           transform: translateY(-6px);
//         }
//         .cat-item:hover .cat-photo {
//           transform: scale(1.06);
//         }
//       `}</style>
//     </section>
//   );
// }

import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Passenger',
    path: '/shop?category=passenger', // يوديك لصفحة الشوب مع فلترة الـ Passenger
    img: '/Passenger.png',
  },
  {
    name: 'SUV',
    path: '/shop?category=suv', // يوديك لصفحة الشوب مع فلترة الـ SUV
    img: '/SUV.png',
  },
  {
    name: 'Van',
    path: '/shop?category=van', // يوديك لصفحة الشوب مع فلترة الـ Van
    img: '/Van.png',
  },
  {
    name: 'New tyres',
    path: '/shop?category=new-tyres', // يوديك لصفحة الشوب مع فلترة الإطارات الجديدة
    img: '/New.png',
  },
  {
    name: 'Everyday tyres',
    path: '/shop?category=everyday', // يوديك لصفحة الشوب مع فلترة الإطارات اليومية
    img: '/Everyday.png',
  },
];

export default function CategoriesSection() {
  /* duplicate list for seamless infinite loop */
  const items = [...categories, ...categories];

  return (
    <section style={{ background: '#ffffff', padding: '56px 0 64px', overflow: 'hidden' }}>

      {/* ── Track wrapper — clips overflow, pauses on hover ── */}
      <div
        className="cat-carousel-wrapper"
        style={{ overflow: 'hidden', width: '100%' }}
      >
        <div
          className="cat-carousel-track"
          style={{
            display: 'flex',
            gap: '48px',
            width: 'max-content',
          }}
        >
          {items.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                textDecoration: 'none',
                flexShrink: 0,
              }}
              className="cat-item"
            >
              {/* Card / Image Container */}
              <div
                className="cat-circle"
                style={{
                  width: 'clamp(120px, 13vw, 180px)',
                  height: 'clamp(150px, 16vw, 220px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  background: 'transparent',
                  flexShrink: 0,
                  transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="cat-photo"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Label */}
              <span style={{
                fontFamily: 'var(--font-heading), sans-serif',
                fontSize: '17px',
                fontWeight: 400,
                lineHeight: '100%',
                textAlign: 'center',
                color: '#1a1a1a',
              }}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Scroll animation ── */
        @keyframes cat-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .cat-carousel-track {
          animation: cat-scroll 25s linear infinite;
        }

        /* pause on hover */
        @media (hover: hover) {
          .cat-carousel-wrapper:hover .cat-carousel-track {
            animation-path-state: paused;
            animation-play-state: paused;
          }
        }

        /* respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .cat-carousel-track {
            animation: none;
          }
        }

        /* hover lift on each item */
        .cat-item:hover .cat-circle {
          transform: translateY(-6px);
        }
        .cat-item:hover .cat-photo {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}