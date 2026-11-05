

// import { useEffect, useRef, useState, useCallback } from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
// import { useCart } from '../../context/CartContext';
// import { useLang } from '../../context/LanguageContext';
// import NavigationDropdown from './NavigationDropdown';
// import SignInModal from '../auth/SignInModal';

// /* ─── Announcement keys ──────────────────────────────────────────────────── */
// const announcementKeys = [
//   'ann_free_delivery',
//   'ann_returns',
//   'ann_returns',
//   'ann_cod',
// ];

// /* ─── Nav link keys ──────────────────────────────────────────────────────── */
// const navLinks = [
//   { key: 'nav_passenger', path: '/shop', hasMega: true },
//   { key: 'nav_suv',      path: '/shop', hasMega: true },
//   { key: 'nav_van',      path: '/shop', hasMega: true },
//   { key: 'nav_shop_all',  path: '/shop',    hasMega: true  },
//   { key: 'nav_offers',    path: '/offers',  hasMega: false },
//   { key: 'About Us', path: '/our-story', hasMega: false },
//   { key: 'nav_contact',   path: '/help',      hasMega: false },
// ];

// /* ─── Dot separator ──────────────────────────────────────────────────────── */
// function Dot() {
//   return <span aria-hidden="true" className="mx-6 select-none text-[#1a1a1a]/40">•</span>;
// }

// /* ─── Scrolling announcement strip ──────────────────────────────────────── */
// function AnnouncementStrip({ t }) {
//   return (
//     <span className="flex items-center whitespace-nowrap">
//       {announcementKeys.map((key, i) => (
//         <span key={i} className="flex items-center">
//           <span className="text-[10px] font-medium text-[#1a1a1a]">{t(key)}</span>
//           {i < announcementKeys.length - 1 && <Dot />}
//         </span>
//       ))}
//       <Dot />
//     </span>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════════════════
//    Navbar
// ═══════════════════════════════════════════════════════════════════════════ */
// export default function Navbar() {
//   const [menuOpen,    setMenuOpen]   = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [signInOpen, setSignInOpen] = useState(false);

//   const timeoutRef = useRef(null);
//   const headerRef  = useRef(null);

//   const navigate              = useNavigate();
//   const location              = useLocation();
//   const { totalItems, cartIconRef } = useCart();
//   const { lang, t, toggleLang }    = useLang();

//   /* ── Mega-menu hover helpers ── */
//   const openMenu     = useCallback((label) => { clearTimeout(timeoutRef.current); setActiveMenu(label); }, []);
//   const scheduleClose = useCallback(() => { timeoutRef.current = setTimeout(() => setActiveMenu(null), 130); }, []);
//   const cancelClose  = useCallback(() => { clearTimeout(timeoutRef.current); }, []);
//   const closeMenu    = useCallback(() => { clearTimeout(timeoutRef.current); setActiveMenu(null); }, []);

//   /* ── Lock body scroll when mobile menu is open ── */
//   useEffect(() => {
//     if (menuOpen) {
//       const scrollY = window.scrollY;
//       document.body.style.position = 'fixed';
//       document.body.style.top      = `-${scrollY}px`;
//       document.body.style.width    = '100%';
//       document.body.style.overflow = 'hidden';
//     } else {
//       const scrollY = document.body.style.top;
//       document.body.style.position = '';
//       document.body.style.top      = '';
//       document.body.style.width    = '';
//       document.body.style.overflow = '';
//       if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1);
//     }
//     return () => {
//       document.body.style.position = '';
//       document.body.style.top      = '';
//       document.body.style.width    = '';
//       document.body.style.overflow = '';
//     };
//   }, [menuOpen]);

//   /* ── Keyboard escape ── */
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'Escape') { closeMenu(); setMenuOpen(false); }
//     };
//     document.addEventListener('keydown', handleKey);
//     return () => document.removeEventListener('keydown', handleKey);
//   }, [closeMenu]);

//   /* ── Close mega on outside click ── */
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (headerRef.current && !headerRef.current.contains(e.target)) closeMenu();
//     };
//     document.addEventListener('mousedown', handleClick);
//     return () => document.removeEventListener('mousedown', handleClick);
//   }, [closeMenu]);

//   return (
//     <>
//       <header ref={headerRef} className="sticky top-0 z-50 bg-white">

//         {/* ── 1. Announcement bar ── */}
//         <div
//           className="marquee-wrapper flex items-center overflow-hidden w-full bg-[#E8C200]"
//           style={{ height: '25px' }}
//           aria-label="Announcements"
//         >
//           <div className="marquee-track flex w-max" aria-hidden="false">
//             <AnnouncementStrip t={t} />
//             <AnnouncementStrip t={t} />
//           </div>
//         </div>

//         {/* ── 2. Main navbar ── */}
//         <nav
//           className="relative flex items-center justify-between border-b border-[#e5e5e5] bg-white"
//           style={{ height: '66px', paddingLeft: 'clamp(12px,3.5%,88px)', paddingRight: 'clamp(12px,3.5%,88px)' }}
//           aria-label="Main navigation"
//         >
//           {/* Right Group: Logo + Desktop Links */}
//           <div className="flex items-center gap-6 lg:gap-8">
//             {/* Logo on the edge */}
//             <NavLink to="/" aria-label="Go to homepage" className="flex items-center no-underline shrink-0">
//               <img src="/tirex.png" alt="TireX Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
//             </NavLink>

//             {/* Desktop nav links */}
//             <div className="hidden md:flex items-center gap-4 lg:gap-7">
//               {navLinks.map((link) => {
//                 const label    = t(link.key);
//                 const isActive = link.path !== '/shop' && location.pathname === link.path;

//                 return link.hasMega ? (
//                   <div key={link.key} onMouseEnter={() => openMenu(label)} onMouseLeave={scheduleClose}>
//                     <NavLink
//                       to={link.path}
//                       className={() =>
//                         `text-[12px] lg:text-[14px] font-[600] no-underline whitespace-nowrap transition-colors hover:underline hover:underline-offset-2 ${
//                           isActive ? 'text-[#8B7000]' : 'text-[#000]'
//                         }`
//                       }
//                       aria-haspopup="true"
//                       aria-expanded={activeMenu === label}
//                       onClick={() => closeMenu()}
//                     >
//                       {label}
//                     </NavLink>
//                   </div>
//                 ) : (
//                   <NavLink
//                     key={link.key}
//                     to={link.path}
//                     className={() =>
//                       `text-[12px] lg:text-[14px] font-[600] no-underline whitespace-nowrap transition-colors hover:underline hover:underline-offset-2 ${
//                         isActive ? 'text-[#8B7000]' : 'text-[#000]'
//                       }`
//                     }
//                     onClick={() => closeMenu()}
//                   >
//                     {label}
//                   </NavLink>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Mobile: hamburger */}
//           <div className="flex md:hidden items-center">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Toggle navigation menu"
//               aria-expanded={menuOpen}
//               className="p-1 text-[#111] transition-opacity hover:opacity-60"
//             >
//               {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
//             </button>
//           </div>

//           {/* Left Group: Icon buttons — Cart → User → Search → Language */}
//           <div className="flex items-center gap-1.5 lg:gap-2">

//             {/* Cart */}
//             <button
//               ref={cartIconRef}
//               aria-label="Shopping bag"
//               onClick={() => navigate('/cart')}
//               className="relative p-1.5 text-[#E8C200] rounded-full transition-colors hover:bg-[#E8C200] hover:text-[#1a1a1a]"
//             >
//               <ShoppingBag size={19} strokeWidth={1.5} />
//               {totalItems > 0 && (
//                 <span className="cart-badge" aria-hidden="true">
//                   {totalItems > 9 ? '9+' : totalItems}
//                 </span>
//               )}
//             </button>

//             {/* User */}
//             <button
//               aria-label="Sign in to your account"
//               onClick={() => setSignInOpen(true)}
//               className="p-1.5 text-[#E8C200] rounded-full transition-colors hover:bg-[#E8C200] hover:text-[#1a1a1a]"
//             >
//               <User size={19} strokeWidth={1.5} />
//             </button>

//             {/* Search */}
//             <button
//               aria-label="Search"
//               onClick={() => navigate('/search')}
//               className="p-1.5 text-[#E8C200] rounded-full transition-colors hover:bg-[#E8C200] hover:text-[#1a1a1a]"
//             >
//               <Search size={19} strokeWidth={1.5} />
//             </button>

//             {/* Language toggle */}
//             <button
//               onClick={toggleLang}
//               aria-label="Toggle language"
//               className="p-1.5 transition-colors text-[12px] font-semibold rounded-full hover:bg-[#E8C200] hover:text-[#1a1a1a]"
//               style={{ fontFamily: 'system-ui', minWidth: 28, color: '#111' }}
//             >
//               {lang === 'ar' ? 'EN' : 'ع'}
//             </button>

//           </div>
//         </nav>

//         {/* ── 3. Mega-dropdown ── */}
//         {activeMenu && (() => {
//           const link = navLinks.find(l => t(l.key) === activeMenu);
//           if (!link?.hasMega) return null;
//           return (
//             <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} className="relative z-[100]">
//               <NavigationDropdown menuKey={activeMenu} onClose={closeMenu} />
//             </div>
//           );
//         })()}

//         {/* ── 4. Mobile drawer ── */}
//         {menuOpen && (
//           <div className="md:hidden fixed inset-0 top-[91px] z-40 bg-white overflow-y-auto border-t border-[#e5e5e5] flex flex-col">
//             <p className="px-5 pt-6 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase text-[#aaa]">
//               {t('nav_shop')}
//             </p>
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.key}
//                 to={link.path}
//                 onClick={() => setMenuOpen(false)}
//                 className={({ isActive }) =>
//                   `px-5 py-3.5 text-[15px] font-medium no-underline border-b border-[#f0ece6] transition-colors ${
//                     isActive ? 'text-[#1a1a1a] font-bold' : 'text-[#3a3a3a]'
//                   }`
//                 }
//               >
//                 {t(link.key)}
//               </NavLink>
//             ))}
//             <p className="px-5 pt-6 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase text-[#aaa]">
//               {t('nav_account')}
//             </p>
//             <button
//               className="px-5 py-3.5 text-left text-[15px] font-medium text-[#3a3a3a] border-b border-[#f0ece6] transition-colors hover:text-[#1a1a1a]"
//               onClick={() => { setMenuOpen(false); setSignInOpen(true); }}
//             >
//               {t('nav_sign_in')}
//             </button>
//             <button
//               className="px-5 py-3.5 text-left text-[15px] font-medium text-[#3a3a3a] border-b border-[#f0ece6] transition-colors hover:text-[#1a1a1a] flex items-center gap-2"
//               onClick={() => { setMenuOpen(false); navigate('/cart'); }}
//             >
//               {t('nav_your_bag')}
//               {totalItems > 0 && (
//                 <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#E8C200] text-[#1a1a1a] text-[10px] font-bold px-1">
//                   {totalItems}
//                 </span>
//               )}
//             </button>
//           </div>
//         )}
//       </header>

//       {/* Sign-in modal */}
//       <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
//     </>
//   );
// }

import { useEffect, useRef, useState, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';
import NavigationDropdown from './NavigationDropdown';
import SignInModal from '../auth/SignInModal';

/* ─── Announcement keys ──────────────────────────────────────────────────── */
const announcementKeys = [
  'ann_free_delivery',
  'ann_returns',
  'ann_returns',
  'ann_cod',
];

/* ─── Nav link keys ──────────────────────────────────────────────────────── */
const navLinks = [
  { key: 'nav_passenger', path: '/shop', hasMega: true },
  { key: 'nav_suv',      path: '/shop', hasMega: true },
  { key: 'nav_van',      path: '/shop', hasMega: true },
  { key: 'nav_shop_all',  path: '/shop',    hasMega: true  },
  { key: 'nav_offers',    path: '/offers',  hasMega: false },
  { key: 'About Us', path: '/our-story', hasMega: false },
  { key: 'nav_contact',   path: '/help',       hasMega: false },
];

/* ─── Dot separator ──────────────────────────────────────────────────────── */
function Dot() {
  return <span aria-hidden="true" className="mx-6 select-none text-[#1a1a1a]/40">•</span>;
}

/* ─── Scrolling announcement strip ──────────────────────────────────────── */
function AnnouncementStrip({ t }) {
  return (
    <span className="flex items-center whitespace-nowrap">
      {announcementKeys.map((key, i) => (
        <span key={i} className="flex items-center">
          <span className="text-[10px] font-medium text-[#1a1a1a]">{t(key)}</span>
          {i < announcementKeys.length - 1 && <Dot />}
        </span>
      ))}
      <Dot />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Navbar
═══════════════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [menuOpen,    setMenuOpen]   = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const timeoutRef = useRef(null);
  const headerRef  = useRef(null);
  const langDropdownRef = useRef(null);

  const navigate              = useNavigate();
  const location              = useLocation();
  const { totalItems, cartIconRef } = useCart();
  
  /* استدعاء الدوال المتاحة من الـ LanguageContext (سواء setLang أو toggleLang) */
  const { lang, t, setLang, toggleLang } = useLang();

  /* دالة موحدة لتغيير اللغة بغض النظر عن طريقة بناء الـ Context لديك */
  const changeLanguage = (targetLang) => {
    if (setLang) {
      setLang(targetLang);
    } else if (lang !== targetLang) {
      toggleLang();
    }
    setLangMenuOpen(false);
  };

  /* ── Mega-menu hover helpers ── */
  const openMenu     = useCallback((label) => { clearTimeout(timeoutRef.current); setActiveMenu(label); }, []);
  const scheduleClose = useCallback(() => { timeoutRef.current = setTimeout(() => setActiveMenu(null), 130); }, []);
  const cancelClose  = useCallback(() => { clearTimeout(timeoutRef.current); }, []);
  const closeMenu    = useCallback(() => { clearTimeout(timeoutRef.current); setActiveMenu(null); }, []);

  /* ── Close language dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top      = `-${scrollY}px`;
      document.body.style.width    = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* ── Keyboard escape ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { closeMenu(); setMenuOpen(false); setLangMenuOpen(false); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [closeMenu]);

  /* ── Close mega on outside click ── */
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [closeMenu]);

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 bg-white">

        {/* ── 1. Announcement bar ── */}
        <div
          className="marquee-wrapper flex items-center overflow-hidden w-full bg-[#E8C200]"
          style={{ height: '25px' }}
          aria-label="Announcements"
        >
          <div className="marquee-track flex w-max" aria-hidden="false">
            <AnnouncementStrip t={t} />
            <AnnouncementStrip t={t} />
          </div>
        </div>

        {/* ── 2. Main navbar ── */}
        <nav
          className="relative flex items-center justify-between border-b border-[#e5e5e5] bg-white"
          style={{ height: '66px', paddingLeft: 'clamp(12px,3.5%,88px)', paddingRight: 'clamp(12px,3.5%,88px)' }}
          aria-label="Main navigation"
        >
          {/* Right Group: Logo + Desktop Links */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Logo on the edge */}
            <NavLink to="/" aria-label="Go to homepage" className="flex items-center no-underline shrink-0">
              <img src="/tirex.png" alt="TireX Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            </NavLink>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-7">
              {navLinks.map((link) => {
                const label    = t(link.key);
                const isActive = link.path !== '/shop' && location.pathname === link.path;

                return link.hasMega ? (
                  <div key={link.key} onMouseEnter={() => openMenu(label)} onMouseLeave={scheduleClose}>
                    <NavLink
                      to={link.path}
                      className={() =>
                        `text-[12px] lg:text-[14px] font-[600] no-underline whitespace-nowrap transition-colors hover:underline hover:underline-offset-2 ${
                          isActive ? 'text-[#8B7000]' : 'text-[#000]'
                        }`
                      }
                      aria-haspopup="true"
                      aria-expanded={activeMenu === label}
                      onClick={() => closeMenu()}
                    >
                      {label}
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    key={link.key}
                    to={link.path}
                    className={() =>
                      `text-[12px] lg:text-[14px] font-[600] no-underline whitespace-nowrap transition-colors hover:underline hover:underline-offset-2 ${
                        isActive ? 'text-[#8B7000]' : 'text-[#000]'
                      }`
                    }
                    onClick={() => closeMenu()}
                  >
                    {label}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Mobile: hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="p-1 text-[#111] transition-opacity hover:opacity-60"
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Left Group: Icon buttons — Cart → User → Search → Language Dropdown (Black Styling) */}
          <div className="flex items-center gap-1.5 lg:gap-2">

            {/* Cart */}
            <button
              ref={cartIconRef}
              aria-label="Shopping bag"
              onClick={() => navigate('/cart')}
              className="relative p-1.5 text-[#E8C200] rounded-full transition-colors hover:bg-[#E8C200] hover:text-[#1a1a1a]"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="cart-badge" aria-hidden="true">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* User */}
            <button
              aria-label="Sign in to your account"
              onClick={() => setSignInOpen(true)}
              className="p-1.5 text-[#E8C200] rounded-full transition-colors hover:bg-[#E8C200] hover:text-[#1a1a1a]"
            >
              <User size={19} strokeWidth={1.5} />
            </button>

            {/* Search */}
            <button
              aria-label="Search"
              onClick={() => navigate('/search')}
              className="p-1.5 text-[#E8C200] rounded-full transition-colors hover:bg-[#E8C200] hover:text-[#1a1a1a]"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            {/* Language Dropdown Menu (Black Theme) */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label="Select language"
                className="flex items-center gap-1.5 px-3 py-1.5 transition-all text-[13px] font-semibold rounded-full bg-[#1a1a1a] text-white hover:bg-black cursor-pointer border border-[#333]"
              >
                <Globe size={15} className="text-[#E8C200]" />
                <span>{lang === 'ar' ? 'العربية' : 'English'}</span>
                <ChevronDown size={13} className={`transition-transform duration-200 text-[#E8C200] ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* القائمة المنسدلة باللون الأسود */}
              {langMenuOpen && (
                <div className="absolute left-0 mt-2 w-32 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-xl py-1.5 z-50 text-[13px]">
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`w-full text-right px-4 py-2 flex items-center justify-between transition-colors cursor-pointer border-none bg-transparent ${
                      lang === 'ar' ? 'bg-[#2a2a2a] font-bold text-[#E8C200]' : 'text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <span>العربية</span>
                    {lang === 'ar' && <span className="text-[#E8C200]">✓</span>}
                  </button>

                  <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full text-left px-4 py-2 flex items-center justify-between transition-colors cursor-pointer border-none bg-transparent ${
                      lang === 'en' ? 'bg-[#2a2a2a] font-bold text-[#E8C200]' : 'text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <span>English</span>
                    {lang === 'en' && <span className="text-[#E8C200]">✓</span>}
                  </button>
                </div>
              )}
            </div>

          </div>
        </nav>

        {/* ── 3. Mega-dropdown ── */}
        {activeMenu && (() => {
          const link = navLinks.find(l => t(l.key) === activeMenu);
          if (!link?.hasMega) return null;
          return (
            <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} className="relative z-[100]">
              <NavigationDropdown menuKey={activeMenu} onClose={closeMenu} />
            </div>
          );
        })()}

        {/* ── 4. Mobile drawer ── */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-[91px] z-40 bg-white overflow-y-auto border-t border-[#e5e5e5] flex flex-col">
            <p className="px-5 pt-6 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase text-[#aaa]">
              {t('nav_shop')}
            </p>
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-5 py-3.5 text-[15px] font-medium no-underline border-b border-[#f0ece6] transition-colors ${
                    isActive ? 'text-[#1a1a1a] font-bold' : 'text-[#3a3a3a]'
                  }`
                }
              >
                {t(link.key)}
              </NavLink>
            ))}
            <p className="px-5 pt-6 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase text-[#aaa]">
              {t('nav_account')}
            </p>
            <button
              className="px-5 py-3.5 text-left text-[15px] font-medium text-[#3a3a3a] border-b border-[#f0ece6] transition-colors hover:text-[#1a1a1a]"
              onClick={() => { setMenuOpen(false); setSignInOpen(true); }}
            >
              {t('nav_sign_in')}
            </button>
            <button
              className="px-5 py-3.5 text-left text-[15px] font-medium text-[#3a3a3a] border-b border-[#f0ece6] transition-colors hover:text-[#1a1a1a] flex items-center gap-2"
              onClick={() => { setMenuOpen(false); navigate('/cart'); }}
            >
              {t('nav_your_bag')}
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#E8C200] text-[#1a1a1a] text-[10px] font-bold px-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        )}
      </header>

      {/* Sign-in modal */}
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}