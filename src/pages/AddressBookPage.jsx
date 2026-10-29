import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ORANGE = '#8B7000';

const MOCK_USER = {
  firstName: 'Salma',
  lastName: 'Hassan',
  email: 'salma.hassan@example.com',
};

const NAV_ITEMS = [
  { label: 'Personal details', path: '/account' },
  { label: 'My orders',        path: '/account/orders' },
  { label: 'Address book',     path: '/account/addresses' },
  { label: 'Saved tyres',      path: '/account/saved' },
  { label: 'Preferences',      path: '/account/preferences' },
];

const INITIAL_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    isDefault: true,
    name: 'Salma Hassan',
    line1: '18 El Nozha Street, Apartment 4, Floor 2',
    line2: 'Heliopolis, Cairo, Egypt',
    phone: '+20 100 123 4567',
  },
  {
    id: 2,
    label: 'Work',
    isDefault: false,
    name: 'Salma Hassan',
    line1: '12 Example Avenue, Office 6',
    line2: 'Maadi, Cairo, Egypt',
    phone: '+20 100 123 4567',
  },
];

const EMPTY_FORM = { label: '', name: '', line1: '', line2: '', phone: '' };

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
            const isActive = item.label === 'Address book';
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
        <button
          type="button" onClick={onSignOut}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: 500 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Sign out
        </button>
        <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888' }}>Need a hand?</span>
        <button type="button" onClick={() => navigate('/help')}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Visit help →</button>
      </div>
    </aside>
  );
}

/* ── Address form modal ───────────────────────────────────────────────── */
function AddressFormModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const change = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.label.trim()) errs.label = 'Required';
    if (!form.name.trim())  errs.name  = 'Required';
    if (!form.line1.trim()) errs.line1 = 'Required';
    if (!form.line2.trim()) errs.line2 = 'Required';
    if (!form.phone.trim()) errs.phone = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  };

  const inputStyle = (err) => ({
    fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a',
    background: '#fff', border: `1px solid ${err ? '#dc2626' : '#dcd6cd'}`,
    borderRadius: 8, padding: '10px 14px', outline: 'none',
    width: '100%', boxSizing: 'border-box',
  });

  const fields = [
    { id: 'label', label: 'Address label (e.g. Home, Work)', field: 'label' },
    { id: 'name',  label: 'Full name',   field: 'name' },
    { id: 'line1', label: 'Address line 1', field: 'line1' },
    { id: 'line2', label: 'City, Country', field: 'line2' },
    { id: 'phone', label: 'Phone number',  field: 'phone' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.45)',
        zIndex: 9999,
        padding: 16,
        boxSizing: 'border-box'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#F9F8F6',
          borderRadius: 16,
          padding: 32,
          width: '100%',
          maxWidth: 460,
          border: '1px solid #f0ece6',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          boxSizing: 'border-box'
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 400, color: '#1a1a1a', margin: '0 0 20px' }}>
          {initial ? 'Edit address' : 'Add an address'}
        </h2>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {fields.map(f => (
            <div key={f.id}>
              <label htmlFor={f.id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: '#3a3a3a', display: 'block', marginBottom: 5 }}>
                {f.label}
              </label>
              <input
                id={f.id} value={form[f.field]} onChange={change(f.field)}
                style={inputStyle(errors[f.field])}
                onFocus={e => { e.target.style.borderColor = '#1a1a1a'; }}
                onBlur={e  => { e.target.style.borderColor = errors[f.field] ? '#dc2626' : '#dcd6cd'; }}
              />
              {errors[f.field] && <p style={{ fontSize: 11, color: '#dc2626', margin: '3px 0 0', fontFamily: 'system-ui,sans-serif' }}>{errors[f.field]}</p>}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              type="submit"
              style={{ flex: 1, background: '#FFCC00', color: '#1a1a1a', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 999, padding: '11px 16px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#e6b800'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFCC00'}
            >
              Save address
            </button>
            <button
              type="button" onClick={onClose}
              style={{ background: '#fff', border: '1px solid #dcd6cd', borderRadius: 999, fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a', padding: '11px 20px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#dcd6cd'}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Address card ─────────────────────────────────────────────────────── */
function AddressCard({ address, onEdit, onRemove, onMakeDefault }) {
  return (
    <div style={{ background: '#F9F8F6', border: '1px solid #f0ece6', borderRadius: 16, padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
      {/* Label + Default badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>
          {address.label}
        </h3>
        {address.isDefault && (
          <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: ORANGE, fontWeight: 500 }}>
            ( Default )
          </span>
        )}
      </div>

      {/* Address lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 16 }}>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a', margin: 0, fontWeight: 500 }}>{address.name}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#444', margin: 0 }}>{address.line1}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#444', margin: 0 }}>{address.line2}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#444', margin: 0 }}>{address.phone}</p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 16, marginBottom: address.isDefault ? 12 : 0 }}>
        <button
          type="button" onClick={onEdit}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Edit address
        </button>
        <button
          type="button" onClick={onRemove}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Remove
        </button>
      </div>

      {/* Default note or Make default button */}
      {address.isDefault ? (
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 11, color: '#777', margin: 0 }}>
          Default address · Used as your first delivery choice.
        </p>
      ) : (
        <button
          type="button" onClick={onMakeDefault}
          style={{
            alignSelf: 'flex-start', background: '#fff', border: '1px solid #dcd6cd',
            borderRadius: 999, fontFamily: 'system-ui,sans-serif', fontSize: 12,
            color: '#1a1a1a', padding: '6px 16px', cursor: 'pointer', marginTop: 4,
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#dcd6cd'}
        >
          Make default
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AddressBookPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function AddressBookPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [modal, setModal] = useState(null); // null | { mode: 'add' } | { mode: 'edit', address }

  const handleSave = (form) => {
    if (modal.mode === 'add') {
      setAddresses(prev => [...prev, { ...form, id: Date.now(), isDefault: prev.length === 0 }]);
    } else {
      setAddresses(prev => prev.map(a => a.id === modal.address.id ? { ...a, ...form } : a));
    }
    setModal(null);
  };

  const handleRemove = (id) => {
    setAddresses(prev => {
      const next = prev.filter(a => a.id !== id);
      if (next.length && !next.some(a => a.isDefault)) next[0].isDefault = true;
      return next;
    });
  };

  const handleMakeDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', boxSizing: 'border-box', paddingBottom: 60 }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px clamp(20px,4%,60px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[{ label: 'Home', path: '/' }, { label: 'My account', path: '/account' }, { label: 'Address book', path: '/account/addresses' }].map((c, i, arr) => (
              <li key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i < arr.length - 1 ? (
                  <>
                    <Link to={c.path} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.color = '#888'}
                    >{c.label}</Link>
                    <span style={{ color: '#ccc', fontSize: 12 }}>/</span>
                  </>
                ) : (
                  <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#1a1a1a' }} aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Page heading */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,4vw,42px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.1 }}>
          Address book
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#555', margin: 0 }}>
          The places your everyday can find you.
        </p>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start', marginTop: 40 }}>

          {/* Sidebar */}
          <Sidebar onSignOut={() => navigate('/')} />

          {/* Right content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Top row: count + Add button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#666', margin: 0 }}>
                {addresses.length} saved address{addresses.length !== 1 ? 'es' : ''}
              </p>
              <button
                type="button"
                onClick={() => setModal({ mode: 'add' })}
                style={{
                  background: '#FFCC00', color: '#1a1a1a',
                  fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600,
                  border: 'none', borderRadius: 999, padding: '10px 22px', cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e6b800'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFCC00'}
              >
                Add an address
              </button>
            </div>

            {/* Address cards grid */}
            {addresses.length === 0 ? (
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#666', padding: '24px 0' }}>
                No saved addresses yet.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20, alignItems: 'stretch' }}>
                {addresses.link === undefined && addresses.map(addr => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={() => setModal({ mode: 'edit', address: addr })}
                    onRemove={() => handleRemove(addr.id)}
                    onMakeDefault={() => handleMakeDefault(addr.id)}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <AddressFormModal
          initial={modal.mode === 'edit' ? modal.address : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}