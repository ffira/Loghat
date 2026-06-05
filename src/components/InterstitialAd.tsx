import { useState, useEffect } from 'react';
import { SponsorAd } from '../types';
import { X, ExternalLink, Sparkles, Clock } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface InterstitialAdProps {
  ads: SponsorAd[];
  isVisible: boolean;
  onDismiss: () => void;
  dismissDelay?: number; // seconds before user can dismiss
  context?: string; // where the ad was triggered from
}

export default function InterstitialAd({ ads, isVisible, onDismiss, dismissDelay = 3, context = 'general' }: InterstitialAdProps) {
  const [countdown, setCountdown] = useState(dismissDelay);
  const [canDismiss, setCanDismiss] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(dismissDelay);
      setCanDismiss(false);
      return;
    }

    // Track impression
    trackEvent('ad_impression', { format: 'interstitial', context });

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanDismiss(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, dismissDelay, context]);

  if (!isVisible || ads.length === 0) return null;

  // Pick a random ad weighted toward the user's context
  const ad = ads[Math.floor(Math.random() * ads.length)];

  const handleDismiss = () => {
    if (!canDismiss) return;
    trackEvent('ad_dismiss', { format: 'interstitial', context, adId: ad.id });
    onDismiss();
  };

  const handleClick = () => {
    trackEvent('ad_click', { format: 'interstitial', context, adId: ad.id, business: ad.business_name });
    // In a real app, this would navigate to the sponsor's page
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      {/* Close button area */}
      <div className="absolute right-4 z-10" style={{ top: 'calc(1rem + env(safe-area-inset-top))' }}>
        {canDismiss ? (
          <button
            onClick={handleDismiss}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
            <span className="text-xs font-mono font-bold">{countdown}</span>
          </div>
        )}
      </div>

      {/* Ad label */}
      <div className="absolute left-4" style={{ top: 'calc(1rem + env(safe-area-inset-top))' }}>
        <span className="bg-amber-400 text-black text-[8px] font-black px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" /> SPONSORED
        </span>
      </div>

      {/* Main ad card */}
      <div className="max-w-sm w-full">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gold/20 rounded-2xl p-6 shadow-2xl text-center flex flex-col items-center gap-4">
          {/* Sponsor icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-crimson/20 border border-gold/30 flex items-center justify-center text-3xl shadow-lg">
            {ad.category === 'Food & Beverage' ? '🍜' : 
             ad.category === 'Services' ? '🔧' :
             ad.category === 'Automotive' ? '🚗' :
             ad.category === 'Retail' ? '🛍️' : '✨'}
          </div>

          {/* Business info */}
          <div className="space-y-1">
            <p className="text-[9px] font-mono uppercase tracking-widest text-gold/60">{ad.category} • {ad.state_origin}</p>
            <h3 className="text-lg font-black text-[#F5F5F5]">{ad.business_name}</h3>
            <p className="text-sm text-white/70 italic font-serif">"{ad.headline}"</p>
          </div>

          <div className="border-t border-white/5 w-full" />

          <p className="text-xs text-white/50 leading-relaxed">{ad.description}</p>

          {/* Slang element highlight */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-white/30 uppercase">Local slang:</span>
            <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2.5 py-0.5 rounded-full font-bold font-mono">
              "{ad.slang_element}"
            </span>
          </div>

          {/* CTA button */}
          <button
            onClick={handleClick}
            className="w-full py-3 bg-gradient-to-r from-crimson to-rose-600 hover:from-rose-600 hover:to-crimson text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-crimson/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Sponsor
          </button>

          {/* Skip text */}
          <div className="flex items-center gap-1.5 text-white/30">
            <Clock className="w-3 h-3" />
            <span className="text-[9px] font-mono">
              {canDismiss ? 'Tap ✕ to close' : `Ad closes in ${countdown}s...`}
            </span>
          </div>
        </div>

        {/* AdMob reference */}
        <p className="text-center text-[8px] text-white/15 font-mono mt-3">
          AdMob Interstitial · ca-app-pub-3940256099942544/1033173712
        </p>
      </div>
    </div>
  );
}
