import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ORANGE = '#8B7000';

const MOCK_USER = {
  firstName: 'Salma', lastName: 'Hassan', email: 'salma.hassan@example.com',
};

const NAV_ITEMS = [
  { label: 'Personal details', path: '/account' },
  { label: 'My orders',        path: '/account/orders' },
  { label: 'Address book',     path: '/account/addresses' },
  { label: 'Saved tyres',      path: '/account/saved' },
  { label: 'Preferences',      path: '/account/preferences' },
];

const INITIAL_SAVED = [
  { id: 1, name: 'Daily Grip',     variant: '195/65 R15 · 91H',       price: 'EGP 1,100', isNew: false, image: '/tyre.png' },
  { id: 2, name: 'Urban Touring',  variant: '205/60 R16 · 92H',       price: 'EGP 1,320', isNew: false, image: '/tyre2.png' },
  { id: 3, name: 'SUV Comfort',    variant: '215/65 R16 · 98H',       price: 'EGP 1,380', isNew: true,  image: '/tyre3.png' },
  { id: 4, name: 'Daily Grip',     variant: '195/65 R15 · 91H',       price: 'EGP 1,100', isNew: false, image: '/tyre.png' },
  { id: 5, name: 'Urban Touring',  variant: '205/60 R16 · 92H',       price: 'EGP 1,320', isNew: false, image: '/tyre2.png' },
  { id: 6, name: 'SUV Comfort',    variant: '215/65 R16 · 98H',       price: 'EGP 1,380', isNew: true,  image: '/tyre3.png' },
];

/* ── Sidebar ──────────────────────────────────────────────────────────── */
function Sidebar({ onSignOut }) {
  const navigate = useNavigate();
  return (
    <aside style={{ width: 180, flexShrink: 0 }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#1a1a1a', margin: '0 0 3px' }}>
          {MOCK_USER.firstName} {MOCK_USER.lastName}
        </p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', margin: 0, wordBreak: 'break-all' }}>
          {MOCK_USER.email}
        </p>
      </div>
      <nav aria-label="Account navigation">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.label === 'Saved tyres';
            return (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    fontFamily: 'system-ui,sans-serif', fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? ORANGE : '#3a3a3a',
                    background: isActive ? '#FDF5F0' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? `3px solid ${ORANGE}` : '3px solid transparent',
                    padding: '8px 10px', cursor: 'pointer',
                    borderRadius: '0 6px 6px 0', transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#fafaf8'; e.currentTarget.style.color = '#1a1a1a'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3a3a3a'; }}}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div style={{ height: 1, background: '#ece8e2', margin: '16px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888' }}>Need a hand?</span>
        <button
          type="button" onClick={onSignOut}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: 500 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Sign out</button>
      </div>
    </aside>
  );
}

/* ── Product card ─────────────────────────────────────────────────────── */
function SavedCard({ item, onUnsave }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', background: '#F9F8F6', border: '1px solid #f0ece6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '75%', height: '75%', objectFit: 'contain', display: 'block', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          onError={e => { e.target.style.display = 'none'; }}
        />

        {item.isNew && (
          <span style={{ position: 'absolute', top: 12, left: 12, background: '#fff', border: '1px solid #dcd6cd', borderRadius: 999, fontFamily: 'system-ui,sans-serif', fontSize: 10, fontWeight: 500, color: '#1a1a1a', padding: '2px 10px' }}>
            New
          </span>
        )}

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onUnsave(item.id); }}
          aria-label={`Remove ${item.name} from saved tyres`}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #f0ece6', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={ORANGE} stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 2 }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>{item.name}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#666', margin: 0 }}>{item.variant}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a', margin: '4px 0 0' }}>{item.price}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SavedPiecesPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function SavedPiecesPage() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(INITIAL_SAVED);

  const handleUnsave = (id) => setSaved(prev => prev.filter(p => p.id !== id));

  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', boxSizing: 'border-box', paddingBottom: 60 }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px clamp(20px,4%,60px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[{ label: 'Home', path: '/' }, { label: 'My account', path: '/account' }, { label: 'Saved for another day.', path: '/account/saved' }].map((c, i, arr) => (
              <li key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i < arr.length - 1 ? (
                  <><Link to={c.path} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >{c.label}</Link><span style={{ color: '#ccc', fontSize: 12 }}>/</span></>
                ) : (
                  <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#1a1a1a' }} aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Heading */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,4vw,42px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.1 }}>
          Saved for another day.
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#555', margin: 0 }}>
          Your saved tyres, ready to compare another day.
        </p>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start', marginTop: 40 }}>

          {/* Sidebar */}
          <Sidebar onSignOut={() => navigate('/')} />

          {/* Right content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#666', margin: 0 }}>
                {saved.length} saved tyre{saved.length !== 1 ? 's' : ''}
              </p>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Continue shopping →
              </button>
            </div>

            {saved.length === 0 ? (
              <div style={{ padding: '48px 0', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: '#666', margin: '0 0 12px' }}>Nothing saved yet.</p>
                <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#777', margin: '0 0 20px' }}>
                  Hit the heart on any tyre to save it here.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  style={{ background: '#FFCC00', color: '#1a1a1a', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 999, padding: '11px 26px', cursor: 'pointer' }}
                >
                  Shop all tyres
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="saved-grid">
                {saved.map(item => (
                  <SavedCard key={item.id} item={item} onUnsave={handleUnsave} />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .saved-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .saved-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}