import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white px-[5.5%] py-8">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-12 font-sans">
        <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span className="mx-1">/</span>
        <span>Page not found</span>
      </nav>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">

        {/* Left: Text */}
        <div className="flex-1 max-w-md">
          {/* 404 number */}
          <h1
            className="text-[110px] leading-none text-[#8B7000] mb-4 select-none font-sans font-bold tracking-tight"
          >
            404
          </h1>

          {/* Heading — تم إرجاع الخط لنفس شكله وتنسيقه الأصلي */}
          <h2
            className="text-[32px] font-normal text-[#1a1a1a] mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-story)' }}
          >
            A wrong turn.
          </h2>

          {/* Description */}
          <p className="text-[15px] font-normal text-gray-600 leading-relaxed mb-8 font-sans">
            We couldn't find this page. It may have moved, or the address might need
            another look.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#e6c200] text-[#1a1a1a] text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-sm font-sans"
            >
              Return home →
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center text-sm font-semibold text-[#1a1a1a] border border-[#d0ccc7] hover:border-[#1a1a1a] px-6 py-3 rounded-full transition-colors bg-white font-sans"
            >
              Shop all tyres
            </Link>
          </div>

          {/* Footer links */}
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-3 font-sans">
              A few familiar places to find your way.
            </p>
            <div className="flex flex-wrap gap-4 font-sans">
              <Link to="/shop?category=passenger" className="text-xs font-semibold text-[#8B7000] hover:underline underline-offset-2">
                Passenger
              </Link>
              <Link to="/shop?category=suv" className="text-xs font-semibold text-[#8B7000] hover:underline underline-offset-2">
                SUV
              </Link>
              <Link to="/shop?category=van" className="text-xs font-semibold text-[#8B7000] hover:underline underline-offset-2">
                Van
              </Link>
              <Link to="/help" className="text-xs font-semibold text-[#8B7000] hover:underline underline-offset-2">
                Visit help →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block flex-shrink-0 w-[520px]">
          <img
            src="/not.jpg"
            alt="Tyre texture"
            className="w-full h-[400px] object-cover rounded-3xl shadow-sm"
          />
        </div>

      </div>
    </div>
  );
}