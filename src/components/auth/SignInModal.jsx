import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PROMO_IMAGE = '/photto.png';

/* ─── Icons ──────────────────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 170 170" aria-hidden="true" focusable="false" style={{ display: 'block' }}>
      <path fill="#111" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.05-2.5-6.87-7.06-11.47-13.67-6.09-8.73-11.13-18.38-15.13-28.95-4-10.58-6-21.05-6-31.42 0-14.54 3.73-26.68 11.19-36.42 7.46-9.74 16.92-14.67 28.38-14.8 5.11 0 10.51 1.31 16.2 3.93 5.69 2.63 9.4 3.94 11.12 3.94 1.52 0 5.41-1.42 11.66-4.26 6.25-2.84 11.75-4.14 16.51-3.9 14.1 1.09 25.04 6.88 32.82 17.37-12.19 7.41-18.17 17.76-17.95 31.06.22 10.66 4.31 19.57 12.28 26.75 4.31 3.91 9.47 6.64 15.48 8.19-3.48 10.22-7.85 20.2-13.11 29.93zm-27.17-105.7c0 8.05-2.93 15.54-8.8 22.46-5.87 6.93-13.26 10.68-22.18 11.26-.22-1.09-.33-2.18-.33-3.27 0-7.83 3.09-15.34 9.27-22.53 6.18-7.18 13.68-10.98 22.5-11.4 0 .98.04 1.95.04 2.98z"/>
    </svg>
  );
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* ─── Shared styles ──────────────────────────────────────────────────── */
const btnPrimary = (disabled) => ({
  background: disabled ? '#e6b800' : '#FFCC00',
  color: '#000000',
  fontFamily: 'system-ui, sans-serif',
  fontSize: 13,
  fontWeight: 600,
  padding: '12px 16px',
  borderRadius: 5,
  border: 'none',
  cursor: disabled ? 'not-allowed' : 'pointer',
  letterSpacing: '0.02em',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
});

/* ─── Promo card — shared between both steps ─────────────────────────── */
function PromoCard() {
  return (
    <div
      className="hidden sm:flex flex-col"
      style={{ flex: '1 1 0', minWidth: 0, background: '#fff', padding: '12px', borderRadius: 16 }}
    >
      <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 8, overflow: 'hidden', background: '#f0f0f0', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={PROMO_IMAGE}
          alt="Ready for your next journey"
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>
      <h3 
  style={{ 
    fontFamily: "'PostNoBillsColombo', sans-serif", // ✅ بدون مسافات ليقرأه المتصفح صح
    fontSize: 'clamp(32px, 4vw, 44px)', // 👈 تم تكبير الحجم من 28
    fontWeight: 700, 
    color: '#1a1a1a', 
    lineHeight: 1.2, 
    margin: '0 0 8px',
    letterSpacing: '0.03em' // 👈 مسافة بين الحروف لمنع التداخل
  }}
>
  Ready for your next journey.
</h3>
      <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0 }}>
        Find tyres for your car, your roads and your everyday journeys.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SignInModal
   ═══════════════════════════════════════════════════════════════════════ */
export default function SignInModal({ isOpen, onClose, onSendCode, onVerifyCode, onGoogleAuth, onAppleAuth }) {
  const [step,     setStep]     = useState('email');
  const [email,    setEmail]    = useState('');
  const [code,     setCode]     = useState('');
  const [error,    setError]    = useState('');
  const [status,   setStatus]   = useState('idle');
  const [socialMsg, setSocialMsg] = useState('');
  const [resent,   setResent]   = useState(false);

  const emailRef   = useRef(null);
  const codeRef    = useRef(null);
  const overlayRef = useRef(null);
  const navigate   = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => (step === 'email' ? emailRef : codeRef).current?.focus(), 60);
    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const modal = document.getElementById('signin-modal-dialog');
      if (!modal) return;
      const focusables = modal.querySelectorAll('button:not([disabled]),input:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])');
      const first = focusables[0]; const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(t); document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [isOpen, onClose, step]);

  useEffect(() => {
    if (isOpen) { setStep('email'); setEmail(''); setCode(''); setError(''); setStatus('idle'); setSocialMsg(''); setResent(false); }
  }, [isOpen]);

  const handleSend = useCallback(async (e) => {
    e?.preventDefault();
    setError(''); setSocialMsg('');
    if (!isValidEmail(email)) { setError('Please enter a valid email address.'); emailRef.current?.focus(); return; }
    setStatus('loading');
    try {
      if (onSendCode) await onSendCode(email.trim());
      else await new Promise(r => setTimeout(r, 800));
      setStatus('idle');
      setStep('verify');
    } catch (err) {
      setStatus('error');
      setError(err?.message || 'Something went wrong. Please try again.');
    }
  }, [email, onSendCode]);

  const handleVerify = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    if (!code.trim()) { setError('Please enter the verification code.'); codeRef.current?.focus(); return; }
    setStatus('loading');
    try {
      if (onVerifyCode) await onVerifyCode(email.trim(), code.trim());
      else await new Promise(r => setTimeout(r, 800));
      setStatus('success');
      // تم التعديل هنا ليقوم بالدخول على صفحة الحساب الشخصي (Personal details) بعد تسجيل الدخول بنجاح
      setTimeout(() => { onClose(); navigate('/account'); }, 900);
    } catch (err) {
      setStatus('error');
      setError(err?.message || 'Invalid code. Please try again.');
    }
  }, [code, email, onVerifyCode, onClose, navigate]);

  const handleResend = useCallback(async () => {
    setError(''); setResent(false); setStatus('loading');
    try {
      if (onSendCode) await onSendCode(email.trim());
      else await new Promise(r => setTimeout(r, 600));
      setResent(true); setStatus('idle');
    } catch { setStatus('idle'); setError('Failed to resend. Try again.'); }
  }, [email, onSendCode]);

  const handleGoogle = useCallback(() => { if (onGoogleAuth) onGoogleAuth(); else setSocialMsg('Google sign-in is not configured yet.'); }, [onGoogleAuth]);
  const handleApple  = useCallback(() => { if (onAppleAuth)  onAppleAuth();  else setSocialMsg('Apple sign-in is not configured yet.');  }, [onAppleAuth]);
  const handleOverlayClick = useCallback((e) => { if (e.target === overlayRef.current) onClose(); }, [onClose]);

  if (!isOpen) return null;

  const isLoading = status === 'loading';

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.55)', zIndex: 1000 }}
      aria-modal="true" role="dialog" aria-label="Sign in"
      id="signin-modal-overlay"
    >
      <div
        id="signin-modal-dialog"
        className="relative bg-white flex w-full"
        style={{ width: '100%', maxWidth: 860, borderRadius: 12, boxShadow: '0 24px 80px rgba(0,0,0,0.18)', padding: 40, gap: 32, boxSizing: 'border-box', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close sign in modal"
          className="absolute top-4 right-4 p-1 rounded-full transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: '#555', zIndex: 10, outlineColor: '#8B7000' }}
        >
          <X size={18} strokeWidth={1.8} />
        </button>

        {step === 'email' && (
          <div className="flex flex-col justify-center" style={{ flex: '1 1 0', minWidth: 0 }}>

            <span style={{ color: '#8B7000', borderBottom: '1.5px solid #8B7000', paddingBottom: 2, width: 'fit-content', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
              Sign in
            </span>

           <h2 
  style={{ 
    fontFamily: "'PostNoBillsColombo', sans-serif", 
    fontSize: 'clamp(36px, 4.5vw, 48px)', // 👈 تم تكبير الحجم هنا
    fontWeight: 700, 
    color: '#1a1a1a', 
    lineHeight: 1.15, 
    margin: '0 0 10px',
    letterSpacing: '0.03em'
  }}
>
  Good to see you.
</h2>
            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#666', lineHeight: 1.55, margin: '0 0 22px' }}>
              Sign in with your email and continue with a verification code.
            </p>

            <form onSubmit={handleSend} noValidate>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="signin-email" className="sr-only">Email address</label>
                <input
                  id="signin-email" ref={emailRef} type="email" value={email} autoComplete="email"
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Your email address" disabled={isLoading}
                  aria-invalid={!!error} aria-describedby={error ? 'signin-err' : undefined}
                  className="w-full"
                  style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, padding: '11px 14px', border: `1px solid ${error ? '#dc2626' : '#d4d0cb'}`, borderRadius: 5, outline: 'none', color: '#1a1a1a' }}
                  onFocus={e => { e.target.style.borderColor = '#8B7000'; e.target.style.boxShadow = '0 0 0 2px rgba(139,112,0,0.15)'; }}
                  onBlur={e  => { e.target.style.borderColor = error ? '#dc2626' : '#d4d0cb'; e.target.style.boxShadow = 'none'; }}
                />
                {error && <p id="signin-err" role="alert" style={{ color: '#dc2626', fontSize: 12, marginTop: 5, fontFamily: 'system-ui,sans-serif' }}>{error}</p>}
              </div>

              <button type="submit" disabled={isLoading} style={btnPrimary(isLoading)}
                onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = '#e6b800'; }}
                onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = '#FFCC00'; }}
              >
                {isLoading ? <><Spinner />Sending…</> : 'Send verification code'}
              </button>
            </form>

            <Divider />

            <div className="flex gap-3" style={{ marginBottom: 14 }}>
              <SocialBtn onClick={handleGoogle}><GoogleIcon />Google</SocialBtn>
              <SocialBtn onClick={handleApple}><AppleIcon />Apple</SocialBtn>
            </div>

            {socialMsg && <p role="status" aria-live="polite" style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui,sans-serif', marginBottom: 8 }}>{socialMsg}</p>}

            <button type="button" onClick={onClose}
              style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#3a3a3a', textDecoration: 'underline', textUnderlineOffset: 3, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
              onMouseEnter={e => e.currentTarget.style.color = '#000'}
              onMouseLeave={e => e.currentTarget.style.color = '#3a3a3a'}
            >
              Just browsing? Continue as a guest →
            </button>
          </div>
        )}

        {step === 'verify' && (
          <div className="flex flex-col justify-center" style={{ flex: '1 1 0', minWidth: 0 }}>

            <span style={{ color: '#8B7000', borderBottom: '1.5px solid #8B7000', paddingBottom: 2, width: 'fit-content', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
              Verify email
            </span>

            <h2 
  style={{ 
    fontFamily: "'PostNoBillsColombo', sans-serif", 
    fontSize: 'clamp(36px, 4.5vw, 48px)', 
    fontWeight: 700, 
    color: '#1a1a1a', 
    lineHeight: 1.15, 
    margin: '0 0 10px',
    letterSpacing: '0.03em' 
  }}
>
  Good to see you.
</h2>

            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#555', lineHeight: 1.6, margin: '0 0 22px' }}>
              We've sent a verification code to your email. Enter it below to complete your sign-in.
            </p>

            {status === 'success' ? (
              <div role="status" aria-live="polite" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', borderRadius: 6, padding: '12px 14px', fontSize: 13, fontFamily: 'system-ui,sans-serif' }}>
                ✓ Signed in successfully!
              </div>
            ) : (
              <form onSubmit={handleVerify} noValidate>
                <label htmlFor="verify-code" style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 600, color: '#3a3a3a', display: 'block', marginBottom: 6 }}>
                  Verification code
                </label>
                <div style={{ position: 'relative', marginBottom: 10 }}>
                  <input
                    id="verify-code" ref={codeRef} type="text" value={code} autoComplete="one-time-code"
                    onChange={(e) => { setCode(e.target.value); setError(''); }}
                    placeholder="Enter code" disabled={isLoading} maxLength={8}
                    aria-invalid={!!error} aria-describedby={error ? 'verify-err' : undefined}
                    className="w-full"
                    style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, padding: '11px 40px 11px 14px', border: `1px solid ${error ? '#dc2626' : '#d4d0cb'}`, borderRadius: 5, outline: 'none', color: '#1a1a1a' }}
                    onFocus={e => { e.target.style.borderColor = '#8B7000'; e.target.style.boxShadow = '0 0 0 2px rgba(139,112,0,0.15)'; }}
                    onBlur={e  => { e.target.style.borderColor = error ? '#dc2626' : '#d4d0cb'; e.target.style.boxShadow = 'none'; }}
                  />
                  <Lock size={15} strokeWidth={1.6} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }} />
                </div>
                {error && <p id="verify-err" role="alert" style={{ color: '#dc2626', fontSize: 12, marginTop: -4, marginBottom: 8, fontFamily: 'system-ui,sans-serif' }}>{error}</p>}

                <button type="submit" disabled={isLoading} style={btnPrimary(isLoading)}
                  onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = '#e6b800'; }}
                  onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = '#FFCC00'; }}
                >
                  {isLoading ? <><Spinner />Verifying…</> : 'Verify and sign in'}
                </button>
              </form>
            )}

            {status !== 'success' && (
              <>
                <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#999', margin: '10px 0 14px' }}>
                  Use the one-time code from your inbox.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#555', margin: 0 }}>
                    Didn't receive a code?{' '}
                    <button type="button" onClick={handleResend} disabled={isLoading}
                      style={{ color: '#8B7000', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2, padding: 0 }}
                    >
                      Resend code
                    </button>
                    {resent && <span style={{ color: '#16a34a', marginLeft: 6 }}>✓ Sent!</span>}
                  </p>
                  <button type="button" onClick={() => { setStep('email'); setCode(''); setError(''); setStatus('idle'); }}
                    style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#3a3a3a', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', textDecoration: 'underline', textUnderlineOffset: 2 }}
                  >
                    ← Change email address
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <PromoCard />
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── Small helpers ──────────────────────────────────────────────────── */
function Spinner() {
  return <span aria-hidden="true" style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />;
}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
      <span style={{ flex: 1, height: 1, background: '#e5e5e5' }} />
      <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa' }}>Or</span>
      <span style={{ flex: 1, height: 1, background: '#e5e5e5' }} />
    </div>
  );
}

function SocialBtn({ onClick, children }) {
  return (
    <button type="button" onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2"
      style={{ border: '1px solid #d4d0cb', borderRadius: 5, background: '#fff', padding: '10px 12px', fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a', cursor: 'pointer', fontWeight: 500 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#aaa'; e.currentTarget.style.background = '#fafaf9'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4d0cb'; e.currentTarget.style.background = '#fff'; }}
    >
      {children}
    </button>
  );
}