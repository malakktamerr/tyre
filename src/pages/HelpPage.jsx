import { useState } from 'react';

const YELLOW = '#FFD700';
const GOLD   = '#8B7000';

const TYRE_TABLE = [
  { size: 'R13', width: 155, profile: 70, rim: 13 },
  { size: 'R14', width: 175, profile: 65, rim: 14 },
  { size: 'R15', width: 195, profile: 65, rim: 15 },
  { size: 'R16', width: 205, profile: 55, rim: 16 },
  { size: 'R17', width: 225, profile: 65, rim: 17 },
];

const TOPICS = [
  'Tyre size & fitment',
  'Delivery & returns',
  'Tyre care',
  'Order & account',
  'Other',
];

/* ── Tab button ── */
function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-full text-[13px] font-normal cursor-pointer transition-all border"
      style={{
        fontFamily: 'system-ui,sans-serif',
        background: active ? '#fff' : '#fff',
        color: '#1a1a1a',
        borderColor: active ? '#1a1a1a' : '#d0ccc7',
      }}
    >
      {label}
    </button>
  );
}

/* ── Field ── */
function Field({ id, label, placeholder, value, onChange, type = 'text', half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`flex flex-col gap-1.5 ${half ? '' : 'w-full'}`} style={{ flex: half ? '1 1 calc(50% - 10px)' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} className="text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: 'system-ui' }}>{label}</label>
      <input
        id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-[13px] text-[#1a1a1a] bg-white outline-none transition-all"
        style={{
          border: `1px solid ${focused ? '#1a1a1a' : '#d0ccc7'}`,
          fontFamily: 'system-ui',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

/* ── SelectField ── */
function SelectField({ id, label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5" style={{ flex: '1 1 calc(50% - 10px)', minWidth: 0 }}>
      <label htmlFor={id} className="text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: 'system-ui' }}>{label}</label>
      <select
        id={id} value={value} onChange={onChange}
        className="w-full rounded-xl px-4 py-3 text-[13px] text-[#1a1a1a] bg-white outline-none cursor-pointer"
        style={{
          border: `1px solid ${focused ? '#1a1a1a' : '#d0ccc7'}`,
          fontFamily: 'system-ui',
          appearance: 'auto',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HelpPage
═══════════════════════════════════════════════════════ */
export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('Tyre size guide');
  const [form, setForm] = useState({ name: '', email: '', topic: 'Tyre size & fitment', orderRef: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const ch = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    setSent(true);
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="mx-auto px-4 md:px-[clamp(16px,6%,88px)] pt-5" style={{ maxWidth: 1400 }}>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-[#888] mb-6" style={{ fontFamily: 'system-ui' }}>
          <span>Home</span>
          <span>/</span>
          <span className="text-[#1a1a1a]">Help</span>
        </nav>

        {/* Heading (محدثة لتكون Bold) */}
        <h1
          className="text-[clamp(32px,4vw,48px)] font-bold text-[#1a1a1a] m-0 mb-3 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          A little help, thoughtfully.
        </h1>
        <p className="text-[15px] text-[#444] m-0 mb-8 font-normal" style={{ fontFamily: 'system-ui' }}>
          Understand tyre sizes, delivery and your next step.
        </p>

        {/* Tabs */}
        <div className="flex gap-3 mb-12 flex-wrap">
          <TabBtn label="Tyre size guide" active={activeTab === 'Tyre size guide'} onClick={() => setActiveTab('Tyre size guide')} />
          <TabBtn label="Contact"         active={activeTab === 'Contact'}         onClick={() => setActiveTab('Contact')} />
        </div>

        {/* ══ Tyre size guide section ══ */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-24">

          {/* Left — table */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[28px] font-bold text-[#1a1a1a] m-0 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Tyre size guide
            </h2>
            <p className="text-[14px] text-[#444] m-0 mb-6 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              Read the size on your tyre sidewall. These examples explain the format, not compatibility.<br />
              Check your vehicle handbook before ordering.
            </p>

            {/* الجدول بحدود واضحة ومستديرة */}
            <div className="overflow-hidden rounded-2xl border border-[#d0ccc7]" style={{ background: '#fff' }}>
              <table className="w-full border-collapse text-[14px]" style={{ fontFamily: 'system-ui' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #d0ccc7', background: '#faf9f6' }}>
                    {['Size', 'Width (mm)', 'Profile (%)', 'Rim (in)'].map(h => (
                      <th key={h} className="text-left py-4 px-5 text-[12px] font-semibold text-[#1a1a1a]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TYRE_TABLE.map((row, i) => (
                    <tr key={row.size} style={{ borderBottom: i < TYRE_TABLE.length - 1 ? '1px solid #e5e2dc' : 'none', background: '#fff' }}>
                      <td className="py-4 px-5 font-normal text-[#1a1a1a]">{row.size}</td>
                      <td className="py-4 px-5 text-[#444]">{row.width}</td>
                      <td className="py-4 px-5 text-[#444]">{row.profile}</td>
                      <td className="py-4 px-5 text-[#444]">{row.rim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[12px] text-[#777] m-0 mt-4 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              Do not substitute sizes based on this guide alone. Match the approved size, load index and speed rating for your vehicle.
            </p>
          </div>

          {/* Right — sidewall explainer */}
          <div className="lg:w-[360px] shrink-0 w-full rounded-3xl p-8" style={{ background: '#F8F6F2' }}>
            <h3 className="text-[22px] font-bold text-[#1a1a1a] m-0 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Read your tyre sidewall
            </h3>

            {/* Tyre image */}
            <div className="flex justify-center mb-8">
              <img src="/tyre.png" alt="Tyre sidewall" className="w-36 h-36 object-contain" />
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[14px] font-semibold text-[#1a1a1a] m-0 mb-1" style={{ fontFamily: 'system-ui' }}>Width (mm)</p>
                <p className="text-[13px] text-[#555] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                  The first number gives the tyre width in millimetres.
                </p>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#1a1a1a] m-0 mb-1" style={{ fontFamily: 'system-ui' }}>Profile (%)</p>
                <p className="text-[13px] text-[#555] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                  The second number is sidewall height as a percentage of width.
                </p>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#1a1a1a] m-0 mb-1" style={{ fontFamily: 'system-ui' }}>Rim (in)</p>
                <p className="text-[13px] text-[#555] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                  The number after R gives the wheel diameter in inches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Contact / Need a hand section ══ */}
        <div className="flex flex-col lg:flex-row gap-16 items-start border-t border-[#e5e2dc] pt-16">

          {/* Left — text */}
          <div className="lg:w-[320px] shrink-0 w-full">
            <h2 className="text-[clamp(28px,3vw,36px)] font-bold text-[#1a1a1a] m-0 mb-3 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Need a hand?
            </h2>
            <p className="text-[14px] text-[#444] m-0 mb-4 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              Ask about tyre fitment, delivery or a return. Include your order reference if you have one.
            </p>
            <p className="text-[12px] text-[#777] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              Illustrative contact form. Submission routing and response times are not established brand policies. No brand phone number or email address is assumed.
            </p>
          </div>

          {/* Right — form */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="flex flex-wrap gap-5">
                <Field id="h-name"  label="Your name"     placeholder="Full name"        value={form.name}  onChange={ch('name')}  half />
                <Field id="h-email" label="Email address" placeholder="Your email address" value={form.email} onChange={ch('email')} type="email" half />
              </div>

              <div className="flex flex-wrap gap-5">
                <SelectField id="h-topic" label="What can we help with?" value={form.topic} onChange={ch('topic')} options={TOPICS} />
                <Field id="h-ref" label="Order number (optional)" placeholder="Enter order number" value={form.orderRef} onChange={ch('orderRef')} half />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="h-msg" className="text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: 'system-ui' }}>Your message</label>
                <textarea
                  id="h-msg" value={form.message} onChange={ch('message')} rows={6}
                  placeholder="Tell us a little more about your question..."
                  className="w-full rounded-2xl px-4 py-3 text-[13px] text-[#1a1a1a] bg-white outline-none resize-y"
                  style={{ border: '1px solid #d0ccc7', fontFamily: 'system-ui' }}
                  onFocus={e => e.target.style.borderColor = '#1a1a1a'}
                  onBlur={e  => e.target.style.borderColor = '#d0ccc7'}
                />
              </div>

              <button
                type="submit" disabled={sending}
                className="w-full rounded-full py-4 text-[15px] font-semibold text-[#1a1a1a] border-none cursor-pointer transition-colors shadow-sm"
                style={{ background: YELLOW, fontFamily: 'system-ui' }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#e6c200'; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = YELLOW; }}
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>

              {sent && (
                <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-[13px]"
                  style={{ background: '#FFFBE6', border: `1px solid ${YELLOW}`, color: GOLD, fontFamily: 'system-ui' }}>
                  <span>✓</span>
                  <span>Message received — Illustrative submitted-message feedback. Nothing has been sent from this static form.</span>
                </div>
              )}

              <p className="text-[12px] text-[#777] m-0" style={{ fontFamily: 'system-ui' }}>
                Please do not include payment card details or verification codes in your message.
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}