import { useState, useEffect } from 'react';
import { SponsorAd } from '../types';
import { Gift, Play, Check, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface RewardedAdProps {
  ads: SponsorAd[];
  isVisible: boolean;
  onComplete: () => void; // Called when user finishes watching, grants the reward
  onSkip: () => void; // Called when user skips without watching
  rewardLabel?: string; // What the user gets, e.g. "Reveal the correct answer"
}

export default function RewardedAd({ ads, isVisible, onComplete, onSkip, rewardLabel = 'Reveal the hint' }: RewardedAdProps) {
  const [phase, setPhase] = useState<'prompt' | 'watching' | 'complete'>('prompt');
  const [watchCountdown, setWatchCountdown] = useState(5);

  useEffect(() => {
    if (!isVisible) {
      setPhase('prompt');
      setWatchCountdown(5);
      return;
    }
  }, [isVisible]);

  useEffect(() => {
    if (phase !== 'watching') return;

    trackEvent('ad_impression', { format: 'rewarded', rewardLabel });

    const timer = setInterval(() => {
      setWatchCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('complete');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, rewardLabel]);

  if (!isVisible || ads.length === 0) return null;

  const ad = ads[Math.floor(Math.random() * ads.length)];

  const handleStartWatching = () => {
    trackEvent('ad_click', { format: 'rewarded', adId: ad.id, business: ad.business_name });
    setPhase('watching');
  };

  const handleClaimReward = () => {
    trackEvent('ad_click', { format: 'rewarded_complete', adId: ad.id });
    onComplete();
  };

  const handleSkip = () => {
    trackEvent('ad_dismiss', { format: 'rewarded', adId: ad.id });
    onSkip();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-sm w-full">
        {phase === 'prompt' && (
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] border border-gold/25 rounded-2xl p-6 shadow-2xl text-center flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-lg">
              <Gift className="w-7 h-7 text-black" />
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-black text-gold">Watch a Short Ad</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Watch a 5-second sponsor message to unlock your reward!
              </p>
            </div>

            {/* Reward preview */}
            <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wide">Your Reward</p>
                <p className="text-xs text-white/80 font-semibold">{rewardLabel}</p>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={handleSkip}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                No Thanks
              </button>
              <button
                onClick={handleStartWatching}
                className="flex-1 py-2.5 bg-gradient-to-r from-gold to-amber-500 text-black text-xs font-black rounded-xl transition shadow-lg shadow-gold/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Watch Ad
              </button>
            </div>
          </div>
        )}

        {phase === 'watching' && (
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 rounded-2xl p-6 shadow-2xl text-center flex flex-col items-center gap-4">
            {/* Watching indicator */}
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-gold to-crimson h-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - watchCountdown) / 5) * 100}%` }}
              />
            </div>

            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl">
              {ad.category === 'Food & Beverage' ? '🍜' : 
               ad.category === 'Services' ? '🔧' :
               ad.category === 'Automotive' ? '🚗' :
               ad.category === 'Retail' ? '🛍️' : '✨'}
            </div>

            <div className="space-y-1">
              <p className="text-[9px] font-mono uppercase tracking-widest text-gold/50">{ad.category}</p>
              <h4 className="text-sm font-black text-[#F5F5F5]">{ad.business_name}</h4>
              <p className="text-xs text-white/60 italic">"{ad.headline}"</p>
            </div>

            <p className="text-2xs text-white/40 leading-relaxed">{ad.description}</p>

            <div className="text-[10px] font-mono text-white/30 flex items-center gap-1.5">
              <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              Reward unlocking in {watchCountdown}s...
            </div>
          </div>
        )}

        {phase === 'complete' && (
          <div className="bg-gradient-to-br from-emerald-950/50 to-[#1a1a2e] border border-emerald-500/25 rounded-2xl p-6 shadow-2xl text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Check className="w-7 h-7 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-black text-emerald-300">Reward Unlocked! 🎉</h3>
              <p className="text-xs text-white/60">Thank you for supporting our sponsors.</p>
            </div>

            <button
              onClick={handleClaimReward}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {rewardLabel}
            </button>
          </div>
        )}

        <p className="text-center text-[8px] text-white/15 font-mono mt-3">
          AdMob Rewarded · ca-app-pub-3940256099942544/5224354917
        </p>
      </div>
    </div>
  );
}
