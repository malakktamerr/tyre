import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';

/* ─── Fade-up on scroll ────────────────────────────────────────────────   */
function useFadeUp(selector) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(selector);
    items.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(32px)'; });
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((c, i) => setTimeout(() => {
          c.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
          c.style.opacity = '1'; c.style.transform = 'translateY(0)';
        }, i * 140));
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [selector]);
  return ref;
}

export default function OurStoryPage() {
  const { lang, t } = useLang();
  const sec3Ref = useFadeUp('.s3-anim');
  const [formData, setFormData] = useState({ name: '', phone: '', vehicle: '', size: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const details = [
    {
      img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
      label: t('feat_1_label'),
      desc: t('feat_1_desc'),
    },
    {
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      label: t('feat_2_label'),
      desc: t('feat_2_desc'),
    },
    {
      img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
      label: t('feat_3_label'),
      desc: t('feat_3_desc'),
    },
    {
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      label: t('feat_4_label'),
      desc: t('feat_4_desc'),
    },
  ];

  const isRtl = lang === 'ar';

  return (
    <div style={{ background: '#FAF6EF', minHeight: '100vh', width: '100%', overflowX: 'hidden', direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>

      <style>{`
        @media (max-width: 768px) {
          .os-sec1 { flex-direction: column !important; padding: 24px 16px !important; text-align: center !important; }
          .os-sec3 { flex-direction: column !important; padding: 32px 16px !important; }
          .os-contact-section { flex-direction: column !important; }
        }
        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 32px rgba(232, 194, 0, 0.25) !important;
          background-color: #222222 !important;
        }
      `}</style>

      {/* Top Banner */}
      <div style={{ position: 'relative', width: '100%', height: '220px', backgroundImage: `url('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        <h1 style={{ position: 'relative', zIndex: 2, color: '#fff', fontSize: '36px', fontWeight: 700, margin: 0 }}>
          {t('story_title')}
        </h1>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: '#e9e9e9', padding: '10px 24px', fontSize: '12px', color: '#666' }}>
        {t('home_breadcrumb')} ‹ {t('story_title')}
      </div>

      {/* Section 1 */}
      <section className="os-sec1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', padding: '48px 6%', background: '#ffffff', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 450px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#E8C200', margin: '0 0 16px', lineHeight: 1.3 }}>
            {t('story_hero_title')}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#444', margin: '0 0 16px' }}>
            {t('story_hero_desc1')}
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#444', margin: 0 }}>
            {t('story_hero_desc2')}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', background: '#fff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', width: 'fit-content' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>4.9</span>
            <div style={{ color: '#E8C200' }}>★★★★★</div>
            <span style={{ fontSize: '12px', color: '#666' }}>Google Reviews</span>
          </div>
        </div>

        <div style={{ flex: '1 1 400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80" alt="Car on road" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

      {/* Section 2 */}
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', padding: '48px 6%', background: '#FAF6EF', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" alt="Riyadh skyline" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <div style={{ flex: '1 1 450px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#E8C200', margin: '0 0 16px', lineHeight: 1.3 }}>
            {t('story_sec2_title')}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#444', margin: '0 0 24px' }}>
            {t('story_sec2_desc')}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{ background: '#E8C200', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t('story_sbc')}
            </button>
            <button style={{ background: '#E8C200', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t('story_vat')}
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section ref={sec3Ref} style={{ padding: '64px 6%', background: '#ffffff', textAlign: 'center' }}>
        <h2 className="s3-anim" style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a1a', marginBottom: '40px' }}>
          {t('story_why_us')}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {details.map((item, index) => (
            <div 
              key={index} 
              className="s3-anim feature-card" 
              style={{ background: '#1a1a1a', color: '#fff', padding: '32px 20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: isRtl ? 'right' : 'left', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', cursor: 'pointer' }}
            >
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', overflow: 'hidden', padding: '5px' }}>
                <img src={item.img} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#E8C200', margin: '0 0 12px', textAlign: 'center' }}>
                {item.label}
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#ccc', margin: 0, textAlign: 'center' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Contact Form */}
      <section style={{ padding: '64px 6%', background: '#FAF6EF' }}>
        <div className="os-contact-section" style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1 1 500px', background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #e5e5e5' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>{t('form_name')}</label>
                <input 
                  type="text" 
                  placeholder={t('form_name_ph')} 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d0ccc7', outline: 'none', fontSize: '13px' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>{t('form_phone')}</label>
                <input 
                  type="text" 
                  placeholder=""
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d0ccc7', outline: 'none', fontSize: '13px' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>{t('form_vehicle')}</label>
                  <input 
                    type="text" 
                    placeholder={t('form_vehicle_ph')} 
                    value={formData.vehicle}
                    onChange={e => setFormData({...formData, vehicle: e.target.value})}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d0ccc7', outline: 'none', fontSize: '13px' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>{t('form_size')}</label>
                  <input 
                    type="text" 
                    placeholder={t('form_size_ph')} 
                    value={formData.size}
                    onChange={e => setFormData({...formData, size: e.target.value})}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d0ccc7', outline: 'none', fontSize: '13px' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>{t('form_message')}</label>
                <textarea 
                  rows="4" 
                  placeholder={t('form_message_ph')}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d0ccc7', outline: 'none', fontSize: '13px', resize: 'vertical' }} 
                />
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', background: '#E8C200', color: '#000', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' }}
              >
                {submitted ? t('form_submitted') : t('form_submit')}
              </button>
            </form>
          </div>

          <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#E8C200', marginBottom: '12px' }}>
                {t('contact_title')}
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>
                {t('contact_desc')}
              </p>
            </div>

            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#fff' }}>
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" alt="Tire close up" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
              
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', borderTop: '1px solid #eee' }}>
                <div style={{ background: '#002855', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textAlign: 'center' }}>
                  <div>ضريبة</div>
                  <div>القيمة المضافة</div>
                  <div style={{ background: '#fff', color: '#002855', marginTop: '2px', borderRadius: '2px' }}>VAT</div>
                </div>
                <div style={{ fontSize: '13px', color: '#333' }}>
                  <div style={{ fontWeight: 700, marginBottom: '2px' }}>+966 9200 16 275 📞</div>
                  <div style={{ color: '#666' }}>customercare@powertire.sa ✉️</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
