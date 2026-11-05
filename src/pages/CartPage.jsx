import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, ArrowRight, X, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';

function fmt(amount) {
  return `EGP ${Math.round(amount).toLocaleString('en-US')}`;
}

const PROMO_CODES = {
  WELCOME10: { type: 'percent', value: 10, label: '10% off' },
  SAVE200:   { type: 'fixed',   value: 200, label: 'EGP 200 off' },
};

const FREE_DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE            = 80;

function Breadcrumbs({ t }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap text-[11px] text-[#aaa] mb-3">
      <Link to="/" className="text-[#aaa] no-underline hover:text-[#1a1a1a] transition-colors">Home</Link>
      <span className="text-[#d0ccc7]">/</span>
      <span className="text-[#555]">{t('cart_title')}</span>
    </nav>
  );
}

function QuantitySelector({ qty, onDecrement, onIncrement }) {
  return (
    <div role="group" aria-label="Quantity"
      className="flex items-center border border-[#e0dbd4] rounded-full overflow-hidden"
      style={{ height: 34, width: 100 }}>
      <button aria-label="Decrease quantity" onClick={onDecrement} disabled={qty <= 1}
        className="flex-1 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#1a1a1a] disabled:text-[#ccc] disabled:cursor-default hover:bg-[#f5f3f0] transition-colors h-full">
        <Minus size={12} strokeWidth={1.8} />
      </button>
      <span aria-live="polite" className="w-8 text-center text-[13px] font-medium text-[#1a1a1a] select-none shrink-0">{qty}</span>
      <button aria-label="Increase quantity" onClick={onIncrement}
        className="flex-1 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#1a1a1a] hover:bg-[#f5f3f0] transition-colors h-full">
        <Plus size={12} strokeWidth={1.8} />
      </button>
    </div>
  );
}

function CartItem({ item, onUpdateQty, onRemove, t }) {
  return (
    <div className="flex gap-4 py-5">
      <Link to={`/product/${item.id}`} className="shrink-0" aria-label={`View ${item.name}`}>
        <div className="rounded-xl overflow-hidden bg-[#f2eeea]" style={{ width: 110, height: 110, flexShrink: 0 }}>
          <img src={item.img} alt={item.name} className="w-full h-full object-cover object-center block" loading="lazy" />
        </div>
      </Link>
      <div className="flex flex-col flex-1 min-w-0 gap-1.5 justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/product/${item.id}`} className="no-underline">
              <p style={{ fontFamily: 'var(--font-heading)' }}
                className="text-[17px] font-semibold text-[#1a1a1a] m-0 leading-snug hover:underline hover:underline-offset-2 transition-all">
                {item.name}
              </p>
            </Link>
            <p className="text-[12px] font-medium text-[#666] m-0 mt-0.5 leading-relaxed">
              {item.color} · {item.size} · Qty {item.qty}
            </p>
          </div>
          <p className="text-[15px] font-semibold text-[#1a1a1a] m-0 shrink-0 whitespace-nowrap">
            {fmt(item.price * item.qty)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <QuantitySelector qty={item.qty}
            onDecrement={() => onUpdateQty(item.key, item.qty - 1)}
            onIncrement={() => onUpdateQty(item.key, item.qty + 1)} />
          <button aria-label={`Remove ${item.name} from cart`} onClick={() => onRemove(item.key)}
            className="flex items-center gap-1 text-[12px] font-medium text-[#666] bg-transparent border-none cursor-pointer p-0 hover:text-[#C8502A] transition-colors">
            <X size={11} strokeWidth={1.8} />
            {t('cart_remove')}
          </button>
        </div>
      </div>
    </div>
  );
}

function FreeDeliveryProgress({ subtotal, t }) {
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress  = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const unlocked  = remaining === 0;
  return (
    <div className="rounded-xl px-5 py-4 mt-3" style={{ background: '#F5F3EF', border: '1px solid #EAE6E0' }}>
      <p className="m-0 mb-3 leading-snug" style={{ fontSize: 13, fontWeight: 700, color: '#E8C200' }}>
        {unlocked
          ? t('cart_unlocked')
          : <>{fmt(remaining)} {t('cart_free_del')}</>
        }
      </p>
      <div role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}
        className="w-full rounded-full overflow-hidden" style={{ height: 6, background: '#DDD9D3' }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress}%`, background: '#E8C200' }} />
      </div>
      <p className="m-0 mt-2" style={{ fontSize: 11, color: '#888', fontWeight: 500 }}>
        {fmt(subtotal)} {t('cart_of')} {fmt(FREE_DELIVERY_THRESHOLD)} · {t('cart_based')}
      </p>
    </div>
  );
}

function PromoCodeForm({ onApply, appliedCode, t }) {
  const [input,  setInput]  = useState('');
  const [status, setStatus] = useState(null);
  const [msg,    setMsg]    = useState('');

  function handleApply(e) {
    e.preventDefault();
    const code = input.trim().toUpperCase();
    if (!code) { setStatus('error'); setMsg('Please enter a promo code.'); return; }
    if (appliedCode) { setStatus('error'); setMsg('A promo code is already applied.'); return; }
    if (PROMO_CODES[code]) {
      setStatus('success');
      setMsg(`Code applied: ${PROMO_CODES[code].label}`);
      onApply(code, PROMO_CODES[code]);
      setInput('');
    } else {
      setStatus('error');
      setMsg("That code isn't valid. Try WELCOME10 for 10% off.");
    }
  }

  return (
    <div>
      <p className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wider m-0 mb-2" style={{ letterSpacing: '0.08em' }}>
        {t('cart_promo')}
      </p>
      <form onSubmit={handleApply} className="flex gap-2">
        <input type="text" value={input}
          onChange={e => { setInput(e.target.value); setStatus(null); setMsg(''); }}
          placeholder={t('cart_promo_enter')} aria-label="Promo code"
          className="flex-1 min-w-0 h-10 px-3 text-[13px] text-[#1a1a1a] border border-[#1a1a1a] rounded-full bg-white outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]" />
        <button type="submit"
          className="h-10 px-5 text-[13px] font-semibold text-[#1a1a1a] bg-white border border-[#1a1a1a] rounded-full cursor-pointer hover:bg-[#f5f5f5] transition-colors shrink-0">
          {t('cart_promo_apply')}
        </button>
      </form>
      {appliedCode && (
        <div className="flex items-center gap-1.5 mt-2">
          <Tag size={10} color="#5C8A6A" />
          <span className="text-[11px] text-[#5C8A6A] font-medium">{appliedCode} — {PROMO_CODES[appliedCode]?.label}</span>
          <button aria-label="Remove promo code"
            onClick={() => { onApply(null, null); setStatus(null); setMsg(''); }}
            className="ml-auto flex items-center text-[10px] text-[#aaa] bg-transparent border-none cursor-pointer p-0 hover:text-[#C8502A] transition-colors gap-0.5">
            <X size={10} /> {t('cart_remove')}
          </button>
        </div>
      )}
      {!appliedCode && status && (
        <p className={`text-[11px] mt-1.5 m-0 ${status === 'success' ? 'text-[#5C8A6A]' : 'text-[#C8502A]'}`}>{msg}</p>
      )}
      {!appliedCode && !status && (
        <p className="text-[10px] font-medium text-[#888] mt-1 m-0">{t('cart_promo_none')}</p>
      )}
    </div>
  );
}

function OrderSummary({ subtotal, appliedCode, promoDetails, onApplyPromo, cartIsEmpty, onCheckout, t }) {
  let discount = 0;
  if (promoDetails) {
    if (promoDetails.type === 'percent') discount = subtotal * (promoDetails.value / 100);
    if (promoDetails.type === 'fixed')   discount = Math.min(promoDetails.value, subtotal);
  }
  const discountedSubtotal = subtotal - discount;
  const deliveryFree = discountedSubtotal >= FREE_DELIVERY_THRESHOLD;
  const delivery     = deliveryFree ? 0 : (subtotal > 0 ? DELIVERY_FEE : 0);
  const total        = discountedSubtotal + delivery;

  return (
    <div className="rounded-2xl p-8 flex flex-col gap-4" style={{ background: '#F5F5F5', border: 'none' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-[22px] font-semibold text-[#1a1a1a] m-0 tracking-tight">
        {t('cart_order_summary')}
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[13px] font-medium text-[#555]">{t('cart_subtotal')}</span>
          <span className="text-[14px] font-semibold text-[#1a1a1a]">{fmt(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-[13px] font-medium text-[#5C8A6A]">Discount ({appliedCode})</span>
            <span className="text-[14px] font-semibold text-[#5C8A6A]">−{fmt(discount)}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-[13px] font-medium text-[#555]">{t('cart_delivery')}</span>
          <span className="text-[14px] font-semibold text-[#1a1a1a]">
            {subtotal === 0 ? '—' : deliveryFree ? <span className="text-[#5C8A6A]">Free</span> : fmt(DELIVERY_FEE)}
          </span>
        </div>
        <div className="h-px bg-[#EDE9E3] my-1" />
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-bold text-[#1a1a1a]">{t('cart_total')}</span>
          <span className="text-[18px] font-bold text-[#1a1a1a]">{fmt(total)}</span>
        </div>
      </div>
      <div className="h-px bg-[#EDE9E3]" />
      <PromoCodeForm onApply={onApplyPromo} appliedCode={appliedCode} t={t} />
      <button aria-label="Continue to checkout" disabled={cartIsEmpty} onClick={() => { if (!cartIsEmpty) onCheckout(); }}
        className="w-full h-12 rounded-full text-[14px] font-semibold text-[#1a1a1a] flex items-center justify-center gap-2 transition-all cursor-pointer border-none disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: cartIsEmpty ? '#d4a800' : '#E8C200' }}
        onMouseEnter={e => { if (!cartIsEmpty) e.currentTarget.style.background = '#d4a800'; }}
        onMouseLeave={e => { if (!cartIsEmpty) e.currentTarget.style.background = '#E8C200'; }}>
        {t('cart_checkout')}
        <ArrowRight size={14} strokeWidth={2} />
      </button>
      <div className="text-center">
        <p className="text-[11px] font-medium text-[#666] m-0 leading-relaxed">{t('cart_cod')}</p>
        <button className="text-[11px] text-[#777] bg-transparent border-none cursor-pointer p-0 underline underline-offset-2 hover:text-[#1a1a1a] transition-colors mt-0.5"
          onClick={() => alert('Delivery & returns info')}>
          {t('cart_del_returns')}
        </button>
      </div>
    </div>
  );
}

function EmptyCart({ t }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#F5F3EF' }}>
        <ShoppingBag size={28} strokeWidth={1.2} color="#C8C4BE" />
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-heading)' }} className="text-[22px] font-semibold text-[#1a1a1a] m-0 mb-1">
          {t('cart_empty')}
        </p>
        <p className="text-[13px] text-[#999] m-0">{t('cart_empty_msg')}</p>
      </div>
      <Link to="/shop" className="h-11 px-8 rounded-full border border-[#1a1a1a] bg-white text-[13px] font-medium text-[#1a1a1a] no-underline flex items-center gap-2 hover:bg-[#1a1a1a] hover:text-white transition-colors">
        {t('cart_continue')} <ArrowRight size={13} />
      </Link>
    </div>
  );
}

export default function CartPage() {
  const { items, totalItems, merchandiseTotal, removeItem, updateQty } = useCart();
  const { t } = useLang();
  const navigate = useNavigate();

  const [appliedCode,  setAppliedCode]  = useState(null);
  const [promoDetails, setPromoDetails] = useState(null);

  const handleApplyPromo = useCallback((code, details) => {
    setAppliedCode(code);
    setPromoDetails(details);
  }, []);

  const cartIsEmpty = items.length === 0;

  const subtitleKeys = [
    'cart_empty',
    'cart_subtitle_1',
    'cart_subtitle_2',
    'cart_subtitle_3',
  ];
  const subtitle = t(subtitleKeys[Math.min(totalItems, 3)]);

  return (
    <div className="bg-white min-h-screen pb-10">
      <div className="mx-auto px-4 md:px-[clamp(16px,6%,88px)] pt-5" style={{ maxWidth: 1400 }}>
        <Breadcrumbs t={t} />
        <div className="mb-4">
          <h1 style={{ fontFamily: 'var(--font-heading)' }}
            className="text-[clamp(32px,4vw,48px)] font-normal text-[#1a1a1a] m-0 mb-1 leading-tight tracking-tight">
            {t('cart_title')}
          </h1>
          <p className="text-[14px] font-medium text-[#555] m-0">
            {cartIsEmpty ? t('cart_empty') : subtitle}
          </p>
        </div>

        {cartIsEmpty ? (
          <EmptyCart t={t} />
        ) : (
          <div className="flex gap-8 max-[768px]:flex-col items-start">
            <div className="flex-1 min-w-0" style={{ flexBasis: '63%' }}>
              <div className="flex items-center justify-between mb-1 pb-2 border-b border-[#EDE9E3]">
                <p className="text-[12px] font-medium text-[#555] m-0">
                  {totalItems} {totalItems === 1 ? t('cart_item') : t('cart_items')}
                </p>
                <Link to="/shop"
                  className="text-[12px] text-[#555] no-underline hover:text-[#1a1a1a] transition-colors flex items-center gap-1"
                  style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>
                  {t('cart_continue_shop')}
                </Link>
              </div>
              <div className="divide-y divide-[#EDE9E3]">
                {items.map(item => (
                  <CartItem key={item.key} item={item} onUpdateQty={updateQty} onRemove={removeItem} t={t} />
                ))}
              </div>
              <FreeDeliveryProgress subtotal={merchandiseTotal} t={t} />
            </div>
            <div className="shrink-0 max-[768px]:w-full" style={{ width: 'min(380px, 38%)' }}>
              <OrderSummary subtotal={merchandiseTotal} appliedCode={appliedCode} promoDetails={promoDetails}
                onApplyPromo={handleApplyPromo} cartIsEmpty={cartIsEmpty}
                onCheckout={() => navigate('/checkout')} t={t} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
