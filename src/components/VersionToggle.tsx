import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon, X, Star, Send } from 'lucide-react';
import { Language } from '../utils/i18n';

const API_BASE = window.location.origin.startsWith('capacitor://') ? 'https://loghatku.my' : '';

type Theme = 'light' | 'dark';

const getTheme = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';

interface VersionToggleProps {
  appLanguage?: Language;
}

export default function VersionToggle({ appLanguage = 'manglish' }: VersionToggleProps) {
  const bm = appLanguage === 'bm';
  const [theme, setTheme] = useState<Theme>(getTheme);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [sent, setSent] = useState(false);
  const promptedRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);

  // Clean up any pending timer
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const applyTheme = (t: Theme) => {
    const el = document.documentElement;
    el.classList.remove('theme-light', 'theme-dark');
    el.classList.add(t === 'dark' ? 'theme-dark' : 'theme-light');
    try { localStorage.setItem('loghat_theme', t); } catch {}
    setTheme(t);
  };

  const toggle = () => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
    // Ask for a rating ~1 minute after the user tries the other version (once per session).
    if (!promptedRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (!promptedRef.current) { promptedRef.current = true; setShowRating(true); }
      }, 60000);
    }
  };

  const submitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating == null) return;
    const payload = {
      type: 'version_rating',
      rating,                                   // 1 = prefer Classic … 10 = prefer New
      currentVersion: theme === 'dark' ? 'classic' : 'new',
      feedback: feedback.trim() || null,
      page: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '',
      at: new Date().toISOString(),
    };
    try {
      const token = localStorage.getItem('loghat_jwt_token');
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('non-ok');
    } catch {
      try {
        const out = JSON.parse(localStorage.getItem('loghat_feedback_outbox') || '[]');
        out.push(payload);
        localStorage.setItem('loghat_feedback_outbox', JSON.stringify(out));
      } catch {}
    } finally {
      setSent(true);
      setTimeout(() => setShowRating(false), 1900);
    }
  };

  const isLight = theme === 'light';

  return (
    <>
      {/* Floating, non-intrusive version switch (bottom-left, opposite the feedback button) */}
      <button
        onClick={toggle}
        title={bm ? 'Tukar rupa UI' : 'Switch UI version'}
        className="fixed z-[60] left-3 md:left-5 bottom-[74px] md:bottom-5 flex items-center gap-1.5 pl-2.5 pr-3 py-2 rounded-full bg-card/90 backdrop-blur border border-white/15 text-xs font-bold shadow-lg hover:shadow-xl transition active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
      >
        {isLight ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
        <span className="hidden sm:inline">
          {isLight ? (bm ? 'Rupa Klasik' : 'Classic look') : (bm ? 'Rupa Baharu' : 'New look')}
        </span>
      </button>

      {showRating && (
        <div className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-5 relative animate-slideDown">
            <button
              onClick={() => setShowRating(false)}
              aria-label={bm ? 'Tutup' : 'Close'}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {sent ? (
              <div className="py-10 flex flex-col items-center text-center gap-3">
                <Star className="w-12 h-12 text-gold fill-gold" />
                <p className="text-sm font-bold text-white/90">{bm ? 'Terima kasih atas penilaian anda! 🙏' : 'Thanks for the rating! 🙏'}</p>
              </div>
            ) : (
              <form onSubmit={submitRating} className="space-y-4">
                <div className="text-left pr-6">
                  <h3 className="text-sm font-black text-white leading-tight flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-gold" />
                    {bm ? 'Mana satu lebih baik?' : 'Which look do you prefer?'}
                  </h3>
                  <p className="text-[10px] text-white/55 leading-snug mt-0.5">
                    {bm
                      ? 'Anda baru sahaja mencuba rupa yang satu lagi. Nilaikan dari 1 (Klasik lebih baik) hingga 10 (Baharu lebih baik).'
                      : 'You just tried the other look. Rate from 1 (Classic is better) to 10 (New is better).'}
                  </p>
                </div>

                {/* 1–10 scale */}
                <div>
                  <div className="grid grid-cols-10 gap-1">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        className={`aspect-square rounded-lg text-[11px] font-extrabold border transition ${
                          rating === n
                            ? 'bg-crimson text-white border-crimson scale-110'
                            : 'bg-interior text-white/70 border-white/10 hover:border-crimson/40'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-[8.5px] font-mono uppercase tracking-wide text-white/40">
                    <span>{bm ? '◀ Klasik' : '◀ Classic'}</span>
                    <span>{bm ? 'Baharu ▶' : 'New ▶'}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-white/45 font-mono uppercase tracking-wider block mb-1">
                    {bm ? 'Apa boleh diperbaiki? (pilihan)' : 'What could be improved? (optional)'}
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    placeholder={bm ? 'Tulis cadangan anda...' : 'Share your suggestions...'}
                    className="w-full bg-interior border border-white/10 text-white placeholder:text-white/35 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-crimson resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRating(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
                  >
                    {bm ? 'Nanti' : 'Later'}
                  </button>
                  <button
                    type="submit"
                    disabled={rating == null}
                    className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                      rating != null
                        ? 'bg-crimson hover:bg-crimson/90 text-white cursor-pointer'
                        : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {bm ? 'Hantar Penilaian' : 'Submit Rating'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
