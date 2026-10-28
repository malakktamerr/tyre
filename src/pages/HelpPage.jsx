import { useState } from 'react';

const YELLOW = '#E8C200';
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
      className="px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-all border"
      style={{
        fontFamily: 'system-ui,sans-serif',
        background: active ? '#1a1a1a' : '#fff',
        color: active ? '#fff' : '#1a1a1a',
        border: '1px solid #1a1a1a',
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
    <div className={`flex flex-col gap-1.5 ${half ? '' : 'w-full'}`} style={{ flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} className="text-[12px] font-medium text-[#555]" style={{ fontFamily: 'system-ui' }}>{label}</label>
      <input
        id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-lg px-3.5 py-[10px] text-[13px] text-[#1a1a1a] bg-white outline-none transition-all"
        style={{
          border: `1px solid ${focused ? '#1a1a1a' : '#ddd8d0'}`,
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
    <div className="flex flex-col gap-1.5" style={{ flex: '1 1 calc(50% - 8px)', minWidth: 0 }}>
      <label htmlFor={id} className="text-[12px] font-medium text-[#555]" style={{ fontFamily: 'system-ui' }}>{label}</label>
      <select
        id={id} value={value} onChange={onChange}
        className="w-full rounded-lg px-3.5 py-[10px] text-[13px] text-[#1a1a1a] bg-white outline-none cursor-pointer"
        style={{
          border: `1px solid ${focused ? '#1a1a1a' : '#ddd8d0'}`,
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
        <nav className="flex items-center gap-1.5 text-[11px] text-[#aaa] mb-4" style={{ fontFamily: 'system-ui' }}>
          <span className="text-[#aaa]">Home</span>
          <span className="text-[#d0ccc7]">/</span>
          <span className="text-[#555]">Help</span>
        </nav>

        {/* Heading */}
        <h1
          className="text-[clamp(28px,4vw,44px)] font-normal text-[#1a1a1a] m-0 mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          A little help, thoughtfully.
        </h1>
        <p className="text-[14px] text-[#666] m-0 mb-6" style={{ fontFamily: 'system-ui' }}>
          Understand tyre sizes, delivery and your next step.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 flex-wrap">
          <TabBtn label="Tyre size guide" active={activeTab === 'Tyre size guide'} onClick={() => setActiveTab('Tyre size guide')} />
          <TabBtn label="Contact"         active={activeTab === 'Contact'}          onClick={() => setActiveTab('Contact')} />
        </div>

        {/* ══ Tyre size guide section ══ */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">

          {/* Left — table */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[22px] font-semibold text-[#1a1a1a] m-0 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Tyre size guide
            </h2>
            <p className="text-[13px] text-[#555] m-0 mb-5 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              Read the size on your tyre sidewall. These examples explain the format, not compatibility.
              Check your vehicle handbook before ordering.
            </p>

            <table className="w-full border-collapse text-[13px]" style={{ fontFamily: 'system-ui' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e0dbd4' }}>
                  {['Size', 'Width (mm)', 'Profile (%)', 'Rim (in)'].map(h => (
                    <th key={h} className="text-left py-2.5 pr-4 text-[11px] font-semibold text-[#888] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TYRE_TABLE.map((row, i) => (
                  <tr key={row.size} style={{ borderBottom: '1px solid #ece8e2', background: i % 2 === 0 ? '#fff' : '#fafaf8' }}>
                    <td className="py-3 pr-4 font-medium text-[#1a1a1a]">{row.size}</td>
                    <td className="py-3 pr-4 text-[#555]">{row.width}</td>
                    <td className="py-3 pr-4 text-[#555]">{row.profile}</td>
                    <td className="py-3 text-[#555]">{row.rim}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-[11px] text-[#aaa] m-0 mt-4 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              Do not substitute sizes based on this guide alone. Match the approved size, load index and speed rating for your vehicle.
            </p>
          </div>

          {/* Right — sidewall explainer */}
          <div className="lg:w-[300px] shrink-0 w-full rounded-2xl p-6" style={{ background: '#F5F5F5' }}>
            <h3 className="text-[16px] font-semibold text-[#1a1a1a] m-0 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Read your tyre sidewall
            </h3>

            {/* Tyre image */}
            <div className="flex justify-center mb-5">
              <img src="/tyre.png" alt="Tyre sidewall" className="w-28 h-28 object-contain" />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[13px] font-bold text-[#1a1a1a] m-0 mb-1" style={{ fontFamily: 'system-ui' }}>Width (mm)</p>
                <p className="text-[12px] text-[#666] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                  The first number gives the tyre width in millimetres.
                </p>
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#1a1a1a] m-0 mb-1" style={{ fontFamily: 'system-ui' }}>Profile (%)</p>
                <p className="text-[12px] text-[#666] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                  The second number is sidewall height as a percentage of width.
                </p>
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#1a1a1a] m-0 mb-1" style={{ fontFamily: 'system-ui' }}>Rim (in)</p>
                <p className="text-[12px] text-[#666] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
                  The number after R gives the wheel diameter in inches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Contact / Need a hand section ══ */}
        <div className="flex flex-col lg:flex-row gap-12 items-start border-t border-[#ece8e2] pt-12">

          {/* Left — text */}
          <div className="lg:w-[260px] shrink-0 w-full">
            <h2 className="text-[clamp(22px,3vw,32px)] font-normal text-[#1a1a1a] m-0 mb-3 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Need a hand?
            </h2>
            <p className="text-[13px] text-[#555] m-0 mb-3 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              Ask about tyre fitment, delivery or a return. Include your order reference if you have one.
            </p>
            <p className="text-[11px] text-[#aaa] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              Illustrative contact form. Submission routing and response times are not established here.
              No brand phone number or email address is assumed.
            </p>
          </div>

          {/* Right — form */}
          <div className="flex-1 min-w-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="flex flex-wrap gap-4">
                <Field id="h-name"  label="Your name"     placeholder="Full name"        value={form.name}  onChange={ch('name')}  half />
                <Field id="h-email" label="Email address" placeholder="Your email address" value={form.email} onChange={ch('email')} type="email" half />
              </div>

              <div className="flex flex-wrap gap-4">
                <SelectField id="h-topic" label="What can we help with?" value={form.topic} onChange={ch('topic')} options={TOPICS} />
                <Field id="h-ref" label="Order number (optional)" placeholder="Enter order number" value={form.orderRef} onChange={ch('orderRef')} half />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="h-msg" className="text-[12px] font-medium text-[#555]" style={{ fontFamily: 'system-ui' }}>Your message</label>
                <textarea
                  id="h-msg" value={form.message} onChange={ch('message')} rows={5}
                  placeholder="Tell us a little more about your question..."
                  className="w-full rounded-lg px-3.5 py-3 text-[13px] text-[#1a1a1a] bg-white outline-none resize-y"
                  style={{ border: '1px solid #ddd8d0', fontFamily: 'system-ui' }}
                  onFocus={e => e.target.style.borderColor = '#1a1a1a'}
                  onBlur={e  => e.target.style.borderColor = '#ddd8d0'}
                />
              </div>

              <button
                type="submit" disabled={sending}
                className="w-full rounded-full py-3.5 text-[14px] font-bold text-[#1a1a1a] border-none cursor-pointer transition-colors"
                style={{ background: sending ? '#d4a800' : YELLOW, fontFamily: 'system-ui' }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#d4a800'; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = YELLOW; }}
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>

              {sent && (
                <div className="flex items-center gap-2 rounded-lg px-4 py-3 text-[13px]"
                  style={{ background: '#FFFBE6', border: `1px solid ${YELLOW}`, color: GOLD, fontFamily: 'system-ui' }}>
                  <span>✓</span>
                  <span>Message received — Illustrative submitted-message feedback. Nothing has been sent from this static form.</span>
                </div>
              )}

              <p className="text-[11px] text-[#aaa] m-0" style={{ fontFamily: 'system-ui' }}>
                Please do not include payment card details or verification codes in your message.
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
