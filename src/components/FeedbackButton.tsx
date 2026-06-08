import React, { useState } from 'react';
import { MessageSquarePlus, Send, X, CheckCircle2 } from 'lucide-react';
import { Language } from '../utils/i18n';

const API_BASE = window.location.origin.startsWith('capacitor://')
  ? 'https://loghatku.my'
  : '';

interface FeedbackButtonProps {
  appLanguage?: Language;
}

const L = (lang: Language) => {
  const bm = lang === 'bm';
  const mg = lang === 'manglish';
  return {
    fab: bm ? 'Maklum Balas' : 'Feedback',
    title: bm ? 'Hantar Maklum Balas' : mg ? 'Send Feedback lah' : 'Send us Feedback',
    subtitle: bm
      ? 'Ada idea, pepijat, atau slang nak dikongsi? Kami dengar!'
      : mg ? 'Got idea, bug, or slang to share? We hear you!'
      : 'Have an idea, bug, or slang to share? We are listening!',
    placeholder: bm ? 'Tulis maklum balas anda di sini...' : mg ? 'Type your feedback here ah...' : 'Type your feedback here...',
    emailLabel: bm ? 'E-mel (pilihan)' : 'Email (optional)',
    send: bm ? 'Hantar' : 'Send',
    sending: bm ? 'Menghantar...' : 'Sending...',
    thanks: bm ? 'Terima kasih! Maklum balas anda diterima. 🙏' : mg ? 'Thank you! Got your feedback already. 🙏' : 'Thank you! Your feedback was received. 🙏',
    close: bm ? 'Tutup' : 'Close',
  };
};

export default function FeedbackButton({ appLanguage = 'manglish' }: FeedbackButtonProps) {
  const t = L(appLanguage);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);

    const payload = {
      message: text.trim(),
      email: email.trim() || null,
      page: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      at: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem('loghat_jwt_token');
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('non-ok');
    } catch {
      // Graceful fallback when no backend: keep a local copy so nothing is lost.
      try {
        const stored = JSON.parse(localStorage.getItem('loghat_feedback_outbox') || '[]');
        stored.push(payload);
        localStorage.setItem('loghat_feedback_outbox', JSON.stringify(stored));
      } catch {}
    } finally {
      setSending(false);
      setSent(true);
      setText('');
      setEmail('');
      setTimeout(() => { setOpen(false); setSent(false); }, 2200);
    }
  };

  return (
    <>
      {/* Floating action button — sits above the mobile bottom nav, bottom-right on desktop */}
      <button
        onClick={() => setOpen(true)}
        aria-label={t.fab}
        className="fixed z-[60] right-3 md:right-5 bottom-[74px] md:bottom-5 flex items-center gap-2 px-4 py-3 rounded-full bg-crimson hover:bg-crimson/90 text-white font-extrabold text-xs shadow-lg shadow-crimson/30 transition active:scale-95 cursor-pointer animate-float"
      >
        <MessageSquarePlus className="w-4.5 h-4.5" />
        <span className="hidden sm:inline">{t.fab}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fadeIn"
          onClick={() => !sending && setOpen(false)}
        >
          <div
            className="bg-card border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-5 relative animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !sending && setOpen(false)}
              aria-label={t.close}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {sent ? (
              <div className="py-10 flex flex-col items-center text-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <p className="text-sm font-bold text-white/90">{t.thanks}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-crimson/10 border border-crimson/20 flex items-center justify-center shrink-0">
                    <MessageSquarePlus className="w-4.5 h-4.5 text-crimson" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black text-white leading-tight">{t.title}</h3>
                    <p className="text-[10px] text-white/55 leading-snug">{t.subtitle}</p>
                  </div>
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t.placeholder}
                  rows={4}
                  autoFocus
                  className="w-full bg-interior border border-white/10 text-white placeholder:text-white/35 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-crimson resize-none"
                />

                <div>
                  <label className="text-[9px] text-white/45 font-mono uppercase tracking-wider block mb-1">{t.emailLabel}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@anda.com"
                    className="w-full bg-interior border border-white/10 text-white placeholder:text-white/30 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-crimson"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!text.trim() || sending}
                  className={`w-full py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                    text.trim() && !sending
                      ? 'bg-crimson hover:bg-crimson/90 text-white cursor-pointer'
                      : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  {sending ? t.sending : t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
