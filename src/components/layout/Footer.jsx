import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

/* ── Mobile accordion column ── */
function AccordionCol({ heading, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
          {heading}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-4' : 'max-h-0'}`}>
        <ul className="flex flex-col gap-3">
          {links.map(l => (
            <li key={l.label}>
              <Link to={l.path} className="text-[15px] text-white no-underline hover:text-white/70 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Footer ── */
export default function Footer() {
  const { t } = useLang();

  const columns = [
    {
      heading: t('footer_shop'),
      links: [
        { label: t('footer_passenger'),    path: '/shop' },
        { label: t('footer_suv'),          path: '/shop' },
        { label: t('footer_van'),          path: '/shop' },
        { label: t('footer_new_arrivals'), path: '/new-arrivals' },
      ],
    },
    {
      heading: t('footer_help'),
      links: [
        { label: t('footer_your_bag'),   path: '/cart' },
        { label: t('footer_delivery'),   path: '/help' },
        { label: t('footer_tyre_guide'), path: '/help' },
      ],
    },
    {
      heading: t('footer_brand'),
      links: [
        { label: t('footer_our_story'), path: '/our-story' },
        { label: t('footer_tyre_care'), path: '/our-story' },
        { label: t('footer_contact'),   path: '/help' },
      ],
    },
  ];

  return (
    <footer className="bg-[#1a1a18] text-white">

      {/* MOBILE layout */}
      <div className="md:hidden px-5 pt-8 pb-4">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center border border-white/35 rounded-[6px] px-4 py-1.5 text-[11px] font-bold tracking-[0.08em] text-white mb-4">
            LOGO
          </div>
          <h3 className="text-white font-semibold leading-[1.2] mb-2" style={{ fontSize: 'clamp(20px,5vw,26px)' }}>
            {t('footer_tagline')}
          </h3>
          <p className="text-[13px] text-white/75 leading-relaxed">
            {t('footer_subtitle')}
          </p>
        </div>

        {columns.map(col => (
          <AccordionCol key={col.heading} heading={col.heading} links={col.links} />
        ))}

        <p className="text-[11px] text-white/30 mt-6 pb-6">
          {t('footer_copyright')}
        </p>
      </div>

      {/* DESKTOP layout */}
      <div
        className="hidden md:grid items-start"
        style={{
          padding: 'clamp(40px,5vw,64px) clamp(16px,6%,88px)',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
          gap: 'clamp(28px,3vw,48px)',
        }}
      >
        {/* Brand col */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center justify-center border border-white/40 rounded-[6px] px-4 py-1.5 w-fit text-[11px] font-bold tracking-[0.08em] text-white">
            LOGO
          </div>
          <h3 className="text-white font-semibold leading-[1.25] m-0" style={{ fontSize: 'clamp(18px,1.8vw,24px)' }}>
            {t('footer_tagline')}
          </h3>
          <p className="text-[14px] text-white/70 leading-[1.65] m-0">
            {t('footer_subtitle')}
          </p>
        </div>

        {/* Nav columns */}
        {columns.map(col => (
          <div key={col.heading}>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40 m-0 mb-4">
              {col.heading}
            </p>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {col.links.map(l => (
                <li key={l.label}>
                  <Link to={l.path} className="text-[14px] text-white/80 no-underline transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop bottom bar */}
      <div
        className="hidden md:block border-t border-white/10"
        style={{ padding: 'clamp(14px,1.8vw,20px) clamp(16px,6%,88px)' }}
      >
        <p className="text-[11px] text-white/40 m-0">
          {t('footer_copyright')}
        </p>
      </div>

    </footer>
  );
}
