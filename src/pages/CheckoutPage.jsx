import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const YELLOW = '#E8C200';
const ORANGE = '#C9573A';

function fmt(n) {
  return `EGP ${Math.round(n).toLocaleString('en-US')}`;
}

const FREE_DELIVERY = 2000;
const DELIVERY_FEE  = 60;

/* ─── Payment methods ───────────────────────────────────────────────────── */
const PAYMENT_METHODS = [
  { id: 'instapay',      label: 'InstaPay',      logo: null },
  { id: 'vodafone',      label: 'Vodafone Cash', logo: null },
  { id: 'orange',        label: 'Orange Cash',   logo: null },
  { id: 'etisalat',      label: 'Etisalat Cash', logo: null },
];

/* ─── Stepper ───────────────────────────────────────────────────────────── */
const STEPS = ['Contact & delivery', 'Payment & review', 'Confirmation'];

function Stepper({ current }) {
  return (
    <nav aria-label="Checkout steps" className="co-stepper">
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={label} className="co-stepper-step">
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
              <span className="co-stepper-num" style={{
                background: active ? '#8B7000' : done ? '#8B7000' : '#f3f4f6',
                color: active ? '#fff' : done ? '#fff' : '#6b7280',
              }}>
                {done ? '✓' : i + 1}
              </span>
              <span className="co-stepper-label" style={{
                fontWeight: 700,
                color: active ? '#8B7000' : done ? '#8B7000' : '#1a1a1a',
              }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="co-stepper-line" style={{ background: done ? '#1a1a1a' : '#e5e0da' }} />
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ─── Deliver-to card ───────────────────────────────────────────────────── */
function DeliverToCard({ form, onEdit }) {
  return (
    <div className="co-card" style={{background: '#d5d2d291', marginBottom: 20 }}>
      <div className="co-card-header">
        <span className="co-card-title">Deliver to</span>
        <button type="button" className="co-edit-btn" onClick={onEdit}>Edit</button>
      </div>
      <p className="co-addr-name">{form.firstName} {form.lastName}</p>
      <p className="co-addr-line">{form.address}{form.apartment ? `, ${form.apartment}` : ''}</p>
      <p className="co-addr-line">{form.area ? `${form.area}, ` : ''}{form.city}, Egypt</p>
      {form.phone && <p className="co-addr-line" style={{ marginTop: 6 }}>{form.phone} · <span style={{ color: '#aaa' }}>Sample delivery address</span></p>}
      {form.email && <p className="co-addr-line" style={{ marginTop: 4 }}>Contact: {form.email}</p>}
      <p className="co-addr-line" style={{ marginTop: 6 }}>
        Standard delivery · {fmt(DELIVERY_FEE)} · <span style={{ color: '#aaa' }}>Sample customer details</span>
      </p>
    </div>
  );
}

/* ─── Payment option row ────────────────────────────────────────────────── */
function PaymentRow({ id, label, selected, onSelect }) {
  return (
    <label
      className="co-pay-row"
      style={{
        border: `1.5px solid ${selected ? ORANGE : '#d4d0cb'}`,
      }}
    >
      {/* Logo placeholder */}
      <span className="co-pay-logo" />
      <span className="co-pay-label">{label}</span>
      <input
        type="radio" name="payment" value={id}
        checked={selected} onChange={() => onSelect(id)}
        style={{ marginLeft: 'auto', accentColor: ORANGE, cursor: 'pointer' }}
      />
    </label>
  );
}

/* ─── Order summary ─────────────────────────────────────────────────────── */
function OrderSummary({ items, merchandiseTotal }) {
  const deliveryFree = merchandiseTotal >= FREE_DELIVERY;
  const delivery     = deliveryFree ? 0 : DELIVERY_FEE;
  const total        = merchandiseTotal + delivery;

  return (
    <aside className="co-summary" style={{ backgroundColor: '#d5d2d291', border: 'none', boxShadow: 'none' }}>
      <h2 className="co-summary-title">Order summary</h2>
      <p className="co-summary-meta">{items.length} items · All prices in EGP</p>

      <div className="co-summary-items">
        {items.map(item => (
          <div key={item.key} className="co-summary-item">
            <div className="co-summary-img-wrap">
              <img
                src={item.img} alt={item.name}
                className="co-summary-img"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="co-summary-item-name">{item.name}</p>
              <p className="co-summary-item-meta">{item.color} · Size {item.size} · Qty {item.qty}</p>
              <p className="co-summary-item-price">{fmt(item.price * item.qty)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="co-summary-divider" />

      <div className="co-summary-totals">
        <div className="co-summary-row">
          <span>Subtotal</span>
          <span>{fmt(merchandiseTotal)}</span>
        </div>
        <div className="co-summary-row">
          <span>Delivery</span>
          <span style={{ color: deliveryFree ? '#3D7A52' : undefined }}>
            {deliveryFree ? 'Free' : fmt(DELIVERY_FEE)}
          </span>
        </div>
        <div className="co-summary-divider" style={{ margin: '4px 0' }} />
        <div className="co-summary-row co-summary-total">
          <span>Total</span>
          <span>{fmt(total)}</span>
        </div>
      </div>

      <p className="co-summary-note">Easy 14-day returns. Cash on delivery available.</p>
    </aside>
  );
}

/* ─── Field ─────────────────────────────────────────────────────────────── */
function Field({ label, id, type = 'text', value, onChange, placeholder, required, half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: '#3a3a3a' }}>
        {label}{required && <span style={{ color: ORANGE }}> *</span>}
      </label>
      <input
        id={id} type={type} value={value} onChange={onChange}
        placeholder={placeholder} autoComplete={id}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 13, padding: '10px 13px',
          border: `1px solid ${focused ? '#1a1a1a' : '#d4d0cb'}`,
          boxShadow: focused ? `0 0 0 2px rgba(0,0,0,0.08)` : 'none',
          borderRadius: 7, outline: 'none', color: '#1a1a1a', background: '#fff',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function SelectField({ label, id, value, onChange, options, half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: '#3a3a3a' }}>
        {label}
      </label>
      <select
        id={id} value={value} onChange={onChange}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 13, padding: '10px 13px',
          border: `1px solid ${focused ? '#1a1a1a' : '#d4d0cb'}`,
          boxShadow: focused ? `0 0 0 2px rgba(0,0,0,0.08)` : 'none',
          borderRadius: 7, outline: 'none', color: value ? '#1a1a1a' : '#aaa',
          background: '#fff', cursor: 'pointer', appearance: 'auto',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CheckoutPage — two steps: 0 = contact/delivery, 1 = payment/review
═══════════════════════════════════════════════════════════════════════════ */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, merchandiseTotal } = useCart();

  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState('instapay');

  const [form, setForm] = useState({
    firstName: 'Salma', lastName: 'Hassan',
    email: 'salma.hassan@example.com',
    phone: '+20 100 123 4567',
    address: '18 El Nozha Street', apartment: 'Apartment 4, Floor 2',
    area: 'Heliopolis', city: 'Cairo', country: 'Egypt',
    deliveryNote: '',
  });

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const deliveryFee = merchandiseTotal >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
  const total       = merchandiseTotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 15, color: '#888' }}>Your bag is empty.</p>
        <button
          onClick={() => navigate('/shop')}
          style={{ background: ORANGE, color: '#fff', border: 'none', borderRadius: 999, padding: '11px 28px', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Continue shopping
        </button>
      </div>
    );
  }

  /* ── Step 0: Contact & delivery ── */
  function renderStep0() {
    return (
      <form onSubmit={e => { e.preventDefault(); setStep(1); }} style={{ flex: 1, minWidth: 0 }}>
        <h1 className="co-page-title">Contact &amp; delivery</h1>
        <p className="co-page-subtitle">A few details, so your tyres can find their way to you.</p>

        {/* Guest banner */}
        <div className="co-guest-banner" style={{ backgroundColor: '#d5d2d291', border: 'none', boxShadow: 'none', color: '#ffffff' }}>
          <div>
            <p className="co-guest-title" style={{ color: '#0b0b0b' }}>Continue as a guest</p>
            <p className="co-guest-sub" style={{ color: '#080808' }}>No account needed. Already part of nesej?</p>
          </div>
          <button type="button" className="co-guest-signin-btn" onClick={() => {}}>Sign in</button>
        </div>

        {/* Contact */}
        <section style={{ marginBottom: 28 }}>
          <h2 className="co-section-title">Contact details</h2>
          <p className="co-section-hint">Illustrative form with sample customer details.</p>
          <div className="co-fields">
            <Field label="Email address" id="email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required half />
            <Field label="Phone number"  id="phone" type="tel"  value={form.phone} onChange={set('phone')} placeholder="+20 100 123 4567" half />
          </div>
        </section>

        {/* Address */}
        <section style={{ marginBottom: 28 }}>
          <h2 className="co-section-title">Delivery address</h2>
          <div className="co-fields">
            <Field label="First name"    id="firstName"     value={form.firstName}  onChange={set('firstName')}  placeholder="Salma"   required half />
            <Field label="Last name"     id="lastName"      value={form.lastName}   onChange={set('lastName')}   placeholder="Hassan"  required half />
            <Field label="Street address" id="address"      value={form.address}    onChange={set('address')}    placeholder="18 El Nozha Street" required />
            <Field label="Apartment / Floor" id="apartment" value={form.apartment}  onChange={set('apartment')}  placeholder="Apartment 4, Floor 2" half />
            <Field label="Area / District"   id="area"      value={form.area}       onChange={set('area')}       placeholder="Heliopolis" half />
            <SelectField
              label="City / Governorate" id="city" value={form.city} onChange={set('city')} half
              options={[
                { value: 'Cairo',       label: 'Cairo' },
                { value: 'Giza',        label: 'Giza' },
                { value: 'Alexandria',  label: 'Alexandria' },
                { value: 'Qalyubia',    label: 'Qalyubia' },
                { value: 'Other',       label: 'Other' },
              ]}
            />
            <SelectField
              label="Country" id="country" value={form.country} onChange={set('country')} half
              options={[{ value: 'Egypt', label: 'Egypt' }]}
            />
            <Field label="Delivery note (optional)" id="deliveryNote" value={form.deliveryNote} onChange={set('deliveryNote')} placeholder="Building entrance beside the pharmacy." />
          </div>
        </section>

        {/* Delivery method */}
        <div className="co-delivery-method">
          <div className="co-delivery-radio">
            <span className="co-delivery-dot" />
            <span className="co-delivery-label">Standard delivery — {fmt(DELIVERY_FEE)}</span>
          </div>
          <p className="co-delivery-note">
            Free delivery over EGP {FREE_DELIVERY.toLocaleString('en-US')} merchandise subtotal. Delivery timing shown here is illustrative; confirm availability before ordering.
          </p>
        </div>

        {/* Actions */}
        <div className="co-actions">
          <button
  type="submit"
  className="bg-[#FFCC00] hover:bg-[#E6B800] text-black font-semibold py-3 px-7 rounded-full transition-colors"
>
  Continue to payment
</button>
          <Link to="/cart" className="co-back-link text-black font-medium hover:text-gray-800 no-underline">
  ← Return to bag
</Link>
        </div>
      </form>
    );
  }

  /* ── Step 1: Payment & review ── */
  function renderStep1() {
    return (
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Deliver to card */}
        <DeliverToCard form={form} onEdit={() => setStep(0)} />

        {/* Choose how to pay */}
        <div className="co-card">
          <p className="co-card-title" style={{ marginBottom: 14 }}>Choose how to pay</p>
          <div className="co-pay-list">
            {PAYMENT_METHODS.map(m => (
              <PaymentRow
                key={m.id} id={m.id} label={m.label}
                selected={payMethod === m.id}
                onSelect={setPayMethod}
              />
            ))}
          </div>

          {/* Info text */}
          <div className="co-pay-info">
            <p className="co-pay-info-title">Payment gateway handoff</p>
            <p className="co-pay-info-body">
              You will be redirected to a secure external payment gateway to complete your order. No card details are entered on this site.
            </p>
            <p className="co-pay-info-body" style={{ marginTop: 8 }}>
              Once you continue, you will choose your preferred payment method and authorize the payment on the gateway page.
            </p>
            <p className="co-pay-info-body" style={{ marginTop: 8 }}>
              Your order will not be placed until payment is confirmed on the gateway.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="co-actions" style={{ marginTop: 28 }}>
          <button
            type="button"
            className="co-btn-primary"
            onClick={() => setStep(2)}
          >
            Continue to payment gateway — {fmt(total)}
          </button>
          <button type="button" className="co-back-link" onClick={() => setStep(0)}>
            ← Back to delivery
          </button>
        </div>
      </div>
    );
  }

  /* ── Step 2: Confirmation ── */
  function renderStep2() {
    const orderNum = 'NESEJ-DEMO-2030';
    return (
      <>
        {/* Top: full-width thank you hero */}
        <div style={{
          textAlign: 'center', padding: '40px 24px',
          marginBottom: 32,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#e8e8e8', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 20px', position: 'relative',
          }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {/* sparkles */}
            <span style={{ position:'absolute', top:-8, right:-4, fontSize:16 }}>✦</span>
            <span style={{ position:'absolute', bottom:-6, left:-6, fontSize:11 }}>✦</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 10px' }}>
            Thank you, {form.firstName}.
          </h1>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#666', margin: '0 0 14px' }}>
            Your next journey starts here. Your order overview is below.
          </p>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
            Sample order number: {orderNum}
          </p>
        </div>

        {/* Bottom: two columns — left content + right order summary */}
        <div className="co-layout">
          {/* Left */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 8px' }}>
              A little care, on its way.
            </h2>
            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#666', margin: '0 0 20px' }}>
              Two tyres chosen by you. Keep this sample order number to find your order status.
            </p>

            <DeliverToCard form={form} onEdit={() => setStep(0)} />

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', margin: '20px 0 12px' }}>
              <button className="co-btn-secondary" onClick={() => {}}>
                View order status
              </button>
              <button className="co-btn-primary" onClick={() => navigate('/shop')}>
                Continue shopping →
              </button>
            </div>
            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', margin: 0 }}>
              Need a hand?{' '}
              <Link to="/help" style={{ color: '#888', textDecoration: 'underline', textUnderlineOffset: 2 }}>Visit help</Link>
            </p>
          </div>

          {/* Right: Order summary */}
          <OrderSummary items={items} merchandiseTotal={merchandiseTotal} />
        </div>
      </>
    );
  }

  return (
    <div className="co-root">
      <div className="co-inner">

        {/* Breadcrumb — step 0 only */}
        {step === 0 && (
          <nav aria-label="Breadcrumb" className="co-nav-breadcrumb">
            <Link to="/cart" className="co-nav-link">Your bag</Link>
            <span>/</span>
            <span style={{ color: '#555' }}>Checkout</span>
          </nav>
        )}

        {/* Stepper */}
        <Stepper current={step} />

        {/* Page header — shown above the two-column grid */}
        {step === 1 && (
          <div style={{ marginBottom: 24 }}>
            <p className="co-breadcrumb">Your bag / Checkout</p>
            <h1 className="co-page-title" style={{ marginTop: 4 }}>Payment &amp; review</h1>
            <p className="co-page-subtitle">One last look. Make sure everything feels right.</p>
          </div>
        )}

        {/* Main grid: form left + summary right */}
        {step === 2 ? renderStep2() : (
          <div className="co-layout">
            {step === 0 ? renderStep0() : renderStep1()}

            {/* Order summary — always visible on steps 0 & 1 */}
            <OrderSummary items={items} merchandiseTotal={merchandiseTotal} />
          </div>
        )}
      </div>
    </div>
  );
}
