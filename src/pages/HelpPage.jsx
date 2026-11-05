import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const TYRE_TABLE = [
  { size: 'R13', width: 155, profile: 70, rim: 13 },
  { size: 'R14', width: 175, profile: 65, rim: 14 },
  { size: 'R15', width: 195, profile: 65, rim: 15 },
  { size: 'R16', width: 205, profile: 55, rim: 16 },
  { size: 'R17', width: 225, profile: 65, rim: 17 },
];

function TabBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className="px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-all border"
      style={{ fontFamily: 'system-ui,sans-serif', background: active ? '#1a1a1a' : '#fff', color: active ? '#fff' : '#1a1a1a', border: '1px solid #1a1a1a' }}>
      {label}
    </button>
  );
}

function Field({ id, label, placeholder, value, onChange, type = 'text', half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5" style={{ flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} className="text-[12px] font-medium text-[#555]" style={{ fontFamily: 'system-ui' }}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-lg px-3.5 py-[10px] text-[13px] text-[#1a1a1a] bg-white outline-none transition-all"
        style={{ border: `1px solid ${focused ? '#1a1a1a' : '#ddd8d0'}`, fontFamily: 'system-ui' }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
    </div>
  );
}

function SelectField({ id, label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5" style={{ flex: '1 1 calc(50% - 8px)', minWidth: 0 }}>
      <label htmlFor={id} className="text-[12px] font-medium text-[#555]" style={{ fontFamily: 'system-ui' }}>{label}</label>
      <select id={id} value={value} onChange={onChange}
        className="w-full rounded-lg px-3.5 py-[10px] text-[13px] text-[#1a1a1a] bg-white outline-none cursor-pointer"
        style={{ border: `1px solid ${focused ? '#1a1a1a' : '#ddd8d0'}`, fontFamily: 'system-ui', appearance: 'auto' }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function HelpPage() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState('guide');
  const [form, setForm] = useState({ name: '', email: '', topic: '', orderRef: '', message: '' });
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

  const TOPICS = lang === 'ar'
    ? ['مطابقة الإطارات', 'التوصيل والإرجاع', 'العناية بالإطارات', 'الطلب والحساب', 'أخرى']
    : ['Tyre size & fitment', 'Delivery & returns', 'Tyre care', 'Order & account', 'Other'];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="mx-auto px-4 md:px-[clamp(16px,6%,88px)] pt-5" style={{ maxWidth: 1400 }}>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] text-[#aaa] mb-4" style={{ fontFamily: 'system-ui' }}>
          <span>Home</span>
          <span className="text-[#d0ccc7]">/</span>
          <span className="text-[#555]">Help</span>
        </nav>

        <h1 className="text-[clamp(28px,4vw,44px)] font-normal text-[#1a1a1a] m-0 mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}>
          {t('help_title')}
        </h1>
        <p className="text-[14px] text-[#666] m-0 mb-6" style={{ fontFamily: 'system-ui' }}>
          {t('help_subtitle')}
        </p>

        <div className="flex gap-2 mb-10 flex-wrap">
          <TabBtn label={t('help_tyre_guide')} active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} />
          <TabBtn label={t('help_contact')}    active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
        </div>

        {/* Tyre size guide */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          <div className="flex-1 min-w-0">
            <h2 className="text-[22px] font-semibold text-[#1a1a1a] m-0 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('help_guide_title')}
            </h2>
            <p className="text-[13px] text-[#555] m-0 mb-5 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              {t('help_guide_sub')}
            </p>
            <table className="w-full border-collapse text-[13px]" style={{ fontFamily: 'system-ui' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e0dbd4' }}>
                  {[t('help_size'), t('help_width'), t('help_profile'), t('help_rim')].map(h => (
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
              {t('help_guide_note')}
            </p>
          </div>

          <div className="lg:w-[300px] shrink-0 w-full rounded-2xl p-6" style={{ background: '#F5F5F5' }}>
            <h3 className="text-[16px] font-semibold text-[#1a1a1a] m-0 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('help_sidewall')}
            </h3>
            <div className="flex justify-center mb-5">
              <img src="/tyre.png" alt="Tyre sidewall" className="w-28 h-28 object-contain" />
            </div>
            <div className="flex flex-col gap-4">
              {[
                { title: t('help_width_title'),   desc: t('help_width_desc') },
                { title: t('help_profile_title'), desc: t('help_profile_desc') },
                { title: t('help_rim_title'),     desc: t('help_rim_desc') },
              ].map(item => (
                <div key={item.title}>
                  <p className="text-[13px] font-bold text-[#1a1a1a] m-0 mb-1" style={{ fontFamily: 'system-ui' }}>{item.title}</p>
                  <p className="text-[12px] text-[#666] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start border-t border-[#ece8e2] pt-12">
          <div className="lg:w-[260px] shrink-0 w-full">
            <h2 className="text-[clamp(22px,3vw,32px)] font-normal text-[#1a1a1a] m-0 mb-3 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('help_need_hand')}
            </h2>
            <p className="text-[13px] text-[#555] m-0 mb-3 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              {t('help_need_sub')}
            </p>
            <p className="text-[11px] text-[#aaa] m-0 leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              {t('help_illustrative')}
            </p>
          </div>

          <div className="flex-1 min-w-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <Field id="h-name"  label={t('help_your_name')} placeholder={t('help_name_ph')}  value={form.name}  onChange={ch('name')}  half />
                <Field id="h-email" label={t('help_email')}     placeholder={t('help_email_ph')} value={form.email} onChange={ch('email')} type="email" half />
              </div>
              <div className="flex flex-wrap gap-4">
                <SelectField id="h-topic" label={t('help_what_help')} value={form.topic} onChange={ch('topic')} options={TOPICS} />
                <Field id="h-ref" label={t('help_order_num')} placeholder={t('help_order_ph')} value={form.orderRef} onChange={ch('orderRef')} half />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="h-msg" className="text-[12px] font-medium text-[#555]" style={{ fontFamily: 'system-ui' }}>{t('help_message')}</label>
                <textarea id="h-msg" value={form.message} onChange={ch('message')} rows={5}
                  placeholder={t('help_msg_ph')}
                  className="w-full rounded-lg px-3.5 py-3 text-[13px] text-[#1a1a1a] bg-white outline-none resize-y"
                  style={{ border: '1px solid #ddd8d0', fontFamily: 'system-ui' }}
                  onFocus={e => e.target.style.borderColor = '#1a1a1a'}
                  onBlur={e  => e.target.style.borderColor = '#ddd8d0'} />
              </div>
              <button type="submit" disabled={sending}
                className="w-full rounded-full py-3.5 text-[14px] font-bold text-[#1a1a1a] border-none cursor-pointer transition-colors"
                style={{ background: sending ? '#d4a800' : '#E8C200', fontFamily: 'system-ui' }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#d4a800'; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = '#E8C200'; }}>
                {sending ? '...' : t('help_send')}
              </button>
              {sent && (
                <div className="flex items-center gap-2 rounded-lg px-4 py-3 text-[13px]"
                  style={{ background: '#FFFBE6', border: '1px solid #E8C200', color: '#8B7000', fontFamily: 'system-ui' }}>
                  <span>✓</span>
                  <span>Message received.</span>
                </div>
              )}
              <p className="text-[11px] text-[#aaa] m-0" style={{ fontFamily: 'system-ui' }}>
                {t('help_no_card')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
