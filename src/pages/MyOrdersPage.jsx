import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const ORANGE = '#8B7000';

const MOCK_USER = {
  firstName: 'Salma',
  lastName: 'Hassan',
  email: 'salma.hassan@example.com',
};

const MOCK_ORDERS = [
  {
    id: 'NESEJ-DEMO-2030',
    date: '08 October 2026',
    status: 'Delivered',
    items: [
      { name: 'City Touring - 205/55 R16', detail: 'EGP 1,250' },
      { name: 'City Compact - 175/65 R14', detail: 'EGP 720' },
    ],
    itemsCount: '2 tyres',
    total: 'EGP 2,030',
  },
  {
    id: 'NESEJ-DEMO-1650',
    date: '02 September 2026',
    status: 'Cancelled',
    items: [
      { name: 'Road Comfort - 215/60 R16 - 95H', detail: '' },
    ],
    itemsCount: '1 tyre',
    total: 'EGP 1,710',
    priceNote: 'Merchandise EGP 1,650\nIllustrative delivery EGP 60',
    totalStrike: true,
  },
];

const NAV_ITEMS = [
  { label: 'Personal details', path: '/account' },
  { label: 'My orders',        path: '/account/orders' },
  { label: 'Address book',     path: '/account/addresses' },
  { label: 'Saved tyres',      path: '/account/saved' },
  { label: 'Preferences',      path: '/account/preferences' },
];

const STATUS_FILTERS = ['All orders (2)', 'Delivered (1)', 'Cancelled (1)'];

/* ── Status badge ── */
function StatusBadge({ status }) {
  const isDelivered = status === 'Delivered';
  return (
    <span style={{ 
      fontFamily: 'system-ui,sans-serif', 
      fontSize: 13, 
      fontWeight: 500, 
      color: isDelivered ? '#8B7000' : '#666', 
      background: 'transparent', 
      padding: 0,
      whiteSpace: 'nowrap' 
    }}>
      {status}
    </span>
  );
}

/* ── Sidebar ── */
function Sidebar({ activeItem, onSignOut }) {
  const navigate = useNavigate();
  return (
    <aside className="account-sidebar" style={{ width: 180, flexShrink: 0 }}>
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
            const isActive = item.label === activeItem;
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
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MyOrdersPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All orders (2)');

  const filteredOrders = MOCK_ORDERS.filter(o => {
    if (activeFilter.startsWith('All')) return true;
    return activeFilter.startsWith(o.status);
  });

  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', boxSizing: 'border-box', paddingBottom: 60 }}>
      
      <style>{`
        @media (max-width: 900px) {
          .account-content-layout { flex-direction: column !important; gap: 32px !important; }
          .account-sidebar { width: 100% !important; }
          .orders-table-container { overflow-x: auto !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px clamp(20px,4%,60px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[{ label: 'Home', path: '/' }, { label: 'My account', path: '/account' }, { label: 'My orders', path: '/account/orders' }].map((c, i, arr) => (
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

        {/* Page heading */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.1 }}>
          My orders
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#555', margin: 0 }}>
          The tyres you chose, and their delivery journeys.
        </p>

        {/* Main Layout (Sidebar + Content) */}
        <div className="account-content-layout" style={{ display: 'flex', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'flex-start', marginTop: 40 }}>

          {/* Sidebar */}
          <Sidebar activeItem="My orders" onSignOut={() => navigate('/')} />

          {/* Right: Filters & Orders Table */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 28, marginBottom: 24, alignItems: 'center' }}>
              {STATUS_FILTERS.map(f => {
                const isActive = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      fontFamily: 'system-ui,sans-serif', fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#1a1a1a' : '#666',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: 0, whiteSpace: 'nowrap',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#1a1a1a'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#666'; }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Table wrapper container */}
            <div className="orders-table-container" style={{ background: '#F9F8F6', borderRadius: 16, padding: '8px 0', border: '1px solid #f0ece6' }}>
              
              <div style={{ width: '100%', minWidth: '700px' }}>
                
                {/* Table Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '160px 130px 100px 1fr 110px 130px', gap: 16, padding: '16px 24px', alignItems: 'center' }}>
                  {['Order #', 'Date', 'Status', 'Items', 'Total', 'Actions'].map(h => (
                    <span key={h} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: '#333', letterSpacing: '-0.01em' }}>
                      {h}
                    </span>
                  ))}
                </div>

                {/* Order rows */}
                {filteredOrders.length === 0 ? (
                  <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#666', padding: '24px 24px' }}>No orders found.</p>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '160px 130px 100px 1fr 110px 130px',
                        gap: 16,
                        padding: '20px 24px',
                        alignItems: 'flex-start',
                      }}
                    >
                      {/* Order # */}
                      <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#1a1a1a', paddingTop: 2 }}>
                        {order.id}
                      </span>

                      {/* Date */}
                      <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#444', paddingTop: 2 }}>
                        {order.date}
                      </span>

                      {/* Status */}
                      <div><StatusBadge status={order.status} /></div>

                      {/* Items */}
                      <div>
                        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a', margin: '0 0 4px', fontWeight: 400 }}>
                          {order.itemsCount}
                        </p>
                        {order.items.map((it, j) => (
                          <div key={j} style={{ marginBottom: 2 }}>
                            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#444', margin: 0 }}>{it.name}</p>
                            {it.detail && <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 11, color: '#777', margin: 0 }}>{it.detail}</p>}
                          </div>
                        ))}
                        {order.priceNote && (
                          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 11, color: '#555', margin: '6px 0 0', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
                            {order.priceNote}
                          </p>
                        )}
                      </div>

                      {/* Total */}
                      <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a', textDecoration: order.totalStrike ? 'line-through' : 'none', paddingTop: 2 }}>
                        {order.total}
                      </span>

                      {/* Actions */}
                      <div>
                        <button
                          type="button"
                          onClick={() => navigate(`/account/orders/${order.id}`)}
                          style={{
                            fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 400,
                            color: '#1a1a1a', background: '#fff',
                            border: '1px solid #dcd6cd', borderRadius: 999,
                            padding: '6px 16px', cursor: 'pointer', whiteSpace: 'nowrap',
                            transition: 'border-color 0.15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = '#dcd6cd'}
                        >
                          View order details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Help link below table */}
            <div style={{ marginTop: 24 }}>
              <button
                type="button"
                style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Need help with an order?
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}