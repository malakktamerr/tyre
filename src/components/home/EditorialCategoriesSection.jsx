import { Link } from 'react-router-dom';

const categories = [
  {
    eyebrow: 'THE PASSENGER RANGE',
    heading: 'For the everyday drive.',
    linkLabel: 'Shop passenger',
    path: '/categories',
    img: '/car1.jpg', // تأكدي أن الصور موجودة في مجلد public
    bg: '#F8F4EF',
  },
  {
    eyebrow: 'QUIETLY CONSIDERED',
    heading: 'Ease, in every drive.',
    linkLabel: 'Shop SUV',
    path: '/categories',
    img: '/car2.jpg',
    bg: '#F8F4EF',
  },
  {
    eyebrow: 'MADE TO MOVE',
    heading: 'For work. For the road.',
    linkLabel: 'Shop van',
    path: '/categories',
    img: '/car3.jpg',
    bg: '#F8F4EF',
  },
];

export default function EditorialCategoriesSection() {
  return (
    <section
      className="w-full bg-white py-12 px-6 lg:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
        {categories.map((cat) => (
          <div key={cat.eyebrow} className="flex flex-col w-full max-w-[420px] gap-4">

            {/* صندوق الصورة مع الحواف الدائرية المطابقة للصورة */}
            <div
              className="w-full overflow-hidden shadow-sm"
              style={{
                aspectRatio: '463 / 420',
                borderRadius: '16px',
                background: cat.bg,
              }}
            >
              <img
                src={cat.img}
                alt={cat.heading}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* النصوص */}
            <div className="flex flex-col gap-1.5 text-left">
              <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400">
                {cat.eyebrow}
              </p>

              <h3 className="text-[#141619] text-[20px] lg:text-[22px] font-normal font-serif leading-snug">
                {cat.heading}
              </h3>

              <Link
                to={cat.path}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#141619] underline underline-offset-4 hover:opacity-70 mt-1"
                style={{ textDecoration: 'underline' }}
              >
                {cat.linkLabel} →
              </Link>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}