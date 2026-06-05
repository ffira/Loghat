import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Star, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Check, 
  Send, 
  Info,
  Gift,
  Smile,
  BadgeAlert,
  Lock
} from 'lucide-react';
import { ALL_BADGES } from '../data/dialectData';
import { Badge } from '../types';
import { Language, t } from '../utils/i18n';

interface SettingsTabProps {
  onUpdateUserProfile?: (fields: any) => void;
  userProfile?: any;
  isInsideSimulator?: boolean;
  appLanguage?: Language;
  onOpenWrapped?: () => void;
}

export default function SettingsTab({ onUpdateUserProfile, userProfile, isInsideSimulator, appLanguage = 'manglish', onOpenWrapped }: SettingsTabProps) {
  // Local profile states
  const [displayName, setDisplayName] = useState('');
  const [heritageState, setHeritageState] = useState<'Malay' | 'Other'>('Other');
  const [originState, setOriginState] = useState('Penang');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [badgeCategoryFilter, setBadgeCategoryFilter] = useState<'All' | 'State' | 'Score' | 'Social' | 'Special'>('All');

  // Referral states
  const [myReferralCode, setMyReferralCode] = useState('');
  const [friendCode, setFriendCode] = useState('');
  const [referralBalance, setReferralBalance] = useState(0);
  const [referStatus, setReferStatus] = useState({ type: '', msg: '' });

  // Rating & Feedback states
  const [appRating, setAppRating] = useState<number>(() => {
    return parseInt(localStorage.getItem('loghat_app_rating') || '0', 10);
  });
  const [isRatedSubmitted, setIsRatedSubmitted] = useState(() => {
    return localStorage.getItem('loghat_app_rating_submitted') === 'true';
  });
  
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('loghat_feedbacks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Quiz Stats
  const [bestScore, setBestScore] = useState<number>(0);
  const [bestRank, setBestRank] = useState<string>('Tourist');

  // Load profile & stats on mount
  useEffect(() => {
    // 1. Get Quiz Stats
    const scoreVal = parseInt(localStorage.getItem('loghat_best_score') || '0', 10);
    const rankVal = localStorage.getItem('loghat_best_rank') || 'Tourist';
    setBestScore(scoreVal);
    setBestRank(rankVal);

    // 2. Load Extended Profile details
    try {
      const stored = localStorage.getItem('loghat_user_profile_extended');
      if (stored) {
        const parsed = JSON.parse(stored);
        setDisplayName(parsed.displayName || '');
        setHeritageState(parsed.heritageState || 'Other');
        setOriginState(parsed.originState || 'Penang');
      } else {
        // Fallback or derive from master userProfile
        const namePref = userProfile?.email ? userProfile.email.split('@')[0] : 'Kawan Loghat';
        setDisplayName(namePref);
      }
    } catch {
      setDisplayName('Kawan Loghat');
    }

    // 3. Referral Initialization
    let myCode = userProfile?.referralCode || localStorage.getItem('loghat_referral_code');
    if (!myCode) {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      myCode = `LGT-WAU-${randNum}`;
    }
    setMyReferralCode(myCode);
    localStorage.setItem('loghat_referral_code', myCode);

    const fetchBalanceAndReferral = async () => {
      const token = localStorage.getItem('loghat_jwt_token');
      if (token) {
        try {
          const API_BASE = window.location.origin.startsWith('capacitor://') ? 'https://loghatku.my' : '';
          const res = await fetch(`${API_BASE}/api/wallet/balance`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setReferralBalance(data.balance);
            localStorage.setItem('loghat_referral_balance', data.balance.toString());
          }
        } catch (e) {
          console.warn('Failed to sync wallet balance from server', e);
        }
      } else {
        const balanceVal = parseFloat(localStorage.getItem('loghat_referral_balance') || '0');
        setReferralBalance(balanceVal);
      }
    };

    fetchBalanceAndReferral();

    // Setup listener for external referral trigger (from deep links)
    const handleUrlReferralPreset = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail && customEv.detail.code) {
        setFriendCode(customEv.detail.code);
      }
    };
    window.addEventListener('loghat_preset_referral', handleUrlReferralPreset);
    
    // Check if there is an immediately pending preset code
    const pendingPreset = sessionStorage.getItem('loghat_pending_preset_referral');
    if (pendingPreset) {
      setFriendCode(pendingPreset);
      sessionStorage.removeItem('loghat_pending_preset_referral');
    }

    return () => {
      window.removeEventListener('loghat_preset_referral', handleUrlReferralPreset);
    };
  }, [userProfile]);

  const handleSaveProfile = () => {
    const extendedData = {
      displayName,
      heritageState,
      originState
    };
    localStorage.setItem('loghat_user_profile_extended', JSON.stringify(extendedData));
    
    // Bubble up to master profile if handler exists
    if (onUpdateUserProfile) {
      onUpdateUserProfile({
        displayName,
        heritageState,
        originState
      });
    }

    setIsSavedNotice(true);
    setTimeout(() => {
      setIsSavedNotice(false);
    }, 2500);
  };

  const handleRedeemCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!friendCode.trim()) return;
    const cleanCode = friendCode.trim().toUpperCase();
    if (cleanCode === myReferralCode.toUpperCase()) {
      setReferStatus({ 
        type: 'error', 
        msg: appLanguage === 'bm' ? 'Tidak boleh tebus kod sendiri!' : 'Cannot redeem your own referral code!' 
      });
      return;
    }
    
    const token = localStorage.getItem('loghat_jwt_token');
    if (token) {
      try {
        const API_BASE = window.location.origin.startsWith('capacitor://') ? 'https://loghatku.my' : '';
        const res = await fetch(`${API_BASE}/api/wallet/redeem`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ code: cleanCode })
        });
        const data = await res.json();
        if (res.ok) {
          // Success! Fetch updated balance
          const balanceRes = await fetch(`${API_BASE}/api/wallet/balance`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (balanceRes.ok) {
            const balanceData = await balanceRes.json();
            setReferralBalance(balanceData.balance);
            localStorage.setItem('loghat_referral_balance', balanceData.balance.toString());
          }

          // Unlock Referral Pioneer badge
          const unlockedIds = getUnlockedBadgeIds();
          if (!unlockedIds.includes('referral_pioneer')) {
            const updatedList = [...unlockedIds, 'referral_pioneer'];
            localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(updatedList));
            window.dispatchEvent(new CustomEvent('loghat_badge_unlocked', { detail: { id: 'referral_pioneer' } }));
          }

          setReferStatus({ 
            type: 'success', 
            msg: appLanguage === 'bm' ? '✓ Kod berjaya! RM5 baki dikreditkan & Lencana Perintis dibuka!' : '✓ Success! RM5 credited and Referral Pioneer Badge unlocked!' 
          });
          setFriendCode('');

          // Trigger local push notification simulation
          window.dispatchEvent(new CustomEvent('loghat_push_notification', {
            detail: {
              title: '🎁 Ganjaran Rujukan / Referral Reward!',
              body: appLanguage === 'bm' ? 'Penebusan kod berjaya! RM5 telah dikreditkan ke baki anda.' : 'Referral code redeemed! RM5 has been credited to your balance.'
            }
          }));
        } else {
          setReferStatus({
            type: 'error',
            msg: data.error || 'Referral code redemption failed.'
          });
        }
      } catch (err) {
        setReferStatus({
          type: 'error',
          msg: 'Server connection failed.'
        });
      }
    } else {
      let redeemedList: string[] = [];
      try {
        redeemedList = JSON.parse(localStorage.getItem('loghat_redeemed_codes') || '[]');
      } catch (e) {}

      if (redeemedList.includes(cleanCode)) {
        setReferStatus({ 
          type: 'error', 
          msg: appLanguage === 'bm' ? 'Kod ini telah ditebus sebelum ini!' : 'You have already redeemed this referral code!' 
        });
        return;
      }

      redeemedList.push(cleanCode);
      localStorage.setItem('loghat_redeemed_codes', JSON.stringify(redeemedList));

      const newBalance = referralBalance + 5;
      setReferralBalance(newBalance);
      localStorage.setItem('loghat_referral_balance', newBalance.toString());

      // Unlock Referral Pioneer badge
      const unlockedIds = getUnlockedBadgeIds();
      if (!unlockedIds.includes('referral_pioneer')) {
        const updatedList = [...unlockedIds, 'referral_pioneer'];
        localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(updatedList));
        window.dispatchEvent(new CustomEvent('loghat_badge_unlocked', { detail: { id: 'referral_pioneer' } }));
      }

      setReferStatus({ 
        type: 'success', 
        msg: appLanguage === 'bm' ? '✓ Kod berjaya! RM5 baki dikreditkan & Lencana Perintis dibuka!' : '✓ Success! RM5 credited and Referral Pioneer Badge unlocked!' 
      });
      setFriendCode('');

      // Trigger local push notification simulation
      window.dispatchEvent(new CustomEvent('loghat_push_notification', {
        detail: {
          title: '🎁 Ganjaran Rujukan / Referral Reward!',
          body: appLanguage === 'bm' ? 'Penebusan kod berjaya! RM5 telah dikreditkan ke baki anda.' : 'Referral code redeemed! RM5 has been credited to your balance.'
        }
      }));
    }
  };

  const handleRateApp = (stars: number) => {
    if (isRatedSubmitted) return;
    setAppRating(stars);
  };

  const handleSubmitRatingAndUnlockBadge = () => {
    if (appRating === 0) return;
    
    localStorage.setItem('loghat_app_rating', appRating.toString());
    localStorage.setItem('loghat_app_rating_submitted', 'true');
    setIsRatedSubmitted(true);

    // Deduce legacy badge
    const badgeType = heritageState === 'Malay' ? 'Good Netizen / Netizen Prihatin' : 'Good Samaritan / Wira Penyayang';
    const legacyBadges = getLegacyUnlockedBadges();
    if (!legacyBadges.includes(badgeType)) {
      localStorage.setItem('loghat_unlocked_badges', JSON.stringify([...legacyBadges, badgeType]));
    }

    // Deduce ID badge
    const badgeId = heritageState === 'Malay' ? 'social_netizen' : 'social_samaritan';
    const unlockedIds = getUnlockedBadgeIds();
    if (!unlockedIds.includes(badgeId)) {
      localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify([...unlockedIds, badgeId]));
    }
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const newHistory = [feedbackText, ...feedbackHistory];
    setFeedbackHistory(newHistory);
    localStorage.setItem('loghat_feedbacks', JSON.stringify(newHistory));
    setFeedbackText('');
    setFeedbackSent(true);

    setTimeout(() => {
      setFeedbackSent(false);
    }, 3000);
  };

  const getLegacyUnlockedBadges = (): string[] => {
    try {
      const stored = localStorage.getItem('loghat_unlocked_badges');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const getUnlockedBadgeIds = (): string[] => {
    const list = new Set<string>();

    // 1. Check legacy strings
    try {
      const stored = localStorage.getItem('loghat_unlocked_badges');
      const legacyList: string[] = stored ? JSON.parse(stored) : [];
      legacyList.forEach(name => {
        if (name.includes('Netizen')) list.add('social_netizen');
        else if (name.includes('Samaritan')) list.add('social_samaritan');
        else if (name.includes('Legend')) list.add('score_legend');
        else if (name.includes('Anak Jati')) list.add('score_jati');
      });
    } catch (e) {}

    // 2. Check explicitly stored ID list
    try {
      const storedIds = localStorage.getItem('loghat_unlocked_badge_ids');
      const ids: string[] = storedIds ? JSON.parse(storedIds) : [];
      ids.forEach(id => list.add(id));
    } catch (e) {}

    // 3. Auto-unlock based on quiz rank
    if (bestRank === 'Legend Kampung') {
      list.add('score_tourist');
      list.add('score_city');
      list.add('score_jati');
      list.add('score_legend');
    } else if (bestRank === 'Anak Jati') {
      list.add('score_tourist');
      list.add('score_city');
      list.add('score_jati');
    } else if (bestRank === 'Budak City') {
      list.add('score_tourist');
      list.add('score_city');
    } else if (bestScore > 0) {
      list.add('score_tourist');
    }

    // 4. Auto-unlock state-origin badge
    if (originState) {
      const stateMap: Record<string, string> = {
        'Penang': 'penang_master',
        'Kedah': 'kedah_king',
        'Kelantan': 'kelantan_jati',
        'Terengganu': 'terengganu_specialist',
        'Negeri Sembilan': 'negeri_9_legend',
        'Sabah': 'sabah_aramaitii',
        'Sarawak': 'sarawak_guru',
        'Johor': 'johor_champion',
        'Kuala Lumpur': 'kl_slicker',
        'Perak': 'perak_pioneer',
        'Pahang': 'pahang_jungle',
        'Melaka': 'melaka_nyonya',
        'Perlis': 'perlis_ranger'
      };
      const match = stateMap[originState];
      if (match) {
        list.add(match);
      }
    }

    // 5. Auto-unlock if user has submitted feedback
    if (feedbackHistory.length > 0) {
      list.add('social_helper');
    }

    // 6. Auto-unlock rating badges
    if (isRatedSubmitted) {
      if (heritageState === 'Malay') {
        list.add('social_netizen');
      } else {
        list.add('social_samaritan');
      }
    }

    return Array.from(list);
  };

  const unlockedBadgeIds = getUnlockedBadgeIds();

  const gridLayoutClass = isInsideSimulator 
    ? "grid grid-cols-1 gap-4" 
    : "grid grid-cols-1 md:grid-cols-2 gap-6";

  const badgeGridLayoutClass = isInsideSimulator
    ? "grid grid-cols-1 gap-2"
    : "grid grid-cols-1 sm:grid-cols-2 gap-2";

  return (
    <div className={`flex flex-col gap-6 max-w-4xl mx-auto ${isInsideSimulator ? 'pb-24 px-1' : 'pb-10'}`}>
      
      {/* Title Header Banner */}
      <div className="border border-white/5 bg-gradient-to-r from-card to-interior rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full pointer-events-none" />
        <div className="space-y-1">
          <h2 className="text-sm sm:text-base font-extrabold text-gold flex items-center gap-2">
            <User className="w-5 h-5 text-crimson" />
            {t('profileTitle', appLanguage)}
          </h2>
          <p className="text-[10px] sm:text-2xs text-white/60 leading-relaxed max-w-lg">
            {t('profileSubtitle', appLanguage)}
          </p>
        </div>
      </div>

      <div className={gridLayoutClass}>

        {/* PROFILE INFO & DETAILS */}
        <div className="bg-card border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase text-gold tracking-wide flex items-center gap-1.5 border-b border-white/5 pb-2.5">
            <Smile className="w-4 h-4 text-crimson" />
            {t('profileSection', appLanguage)}
          </h3>

          <div className="space-y-3.5">
            {/* Cloud Sync Status */}
            <div className="bg-[#121212]/70 border border-white/5 rounded-xl p-3.5 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider font-bold">Cloud Account Status</span>
                {localStorage.getItem('loghat_jwt_token') ? (
                  <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                    Connected
                  </span>
                ) : (
                  <span className="bg-amber-500/10 text-amber-400 text-[8px] font-black px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                    Guest Mode
                  </span>
                )}
              </div>
              
              {localStorage.getItem('loghat_jwt_token') ? (
                <div className="space-y-2">
                  <p className="text-[10.5px] text-white/60">
                    Sync active. Your high scores, badges, and payments are backed up in the secure PostgreSQL database.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('loghat_jwt_token');
                      localStorage.removeItem('loghat_first_quiz_completed');
                      if (onUpdateUserProfile) {
                        onUpdateUserProfile({
                          email: null,
                          phone: null,
                          emailVerified: false,
                          phoneVerified: false,
                          locationPermission: 'denied',
                          isPremiumUser: false,
                          premiumTier: 'none'
                        });
                      }
                      window.location.reload();
                    }}
                    className="w-full text-center py-1.5 bg-white/5 hover:bg-white/10 hover:text-rose-400 text-[10px] font-bold rounded-lg border border-white/10 transition cursor-pointer"
                  >
                    Logout & Disconnect Account 🔓
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[10.5px] text-white/50">
                    Offline mode. Verify your profile or log in to lock in your scores and activate premium perks.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('loghat_push_notification', {
                        detail: {
                          title: '🔑 Verification Required',
                          body: 'Connect your email to link progress!'
                        }
                      }));
                      window.location.hash = '#game';
                      window.location.reload();
                    }}
                    className="w-full text-center py-1.5 bg-gold hover:bg-yellow-400 text-black text-[10px] font-black rounded-lg transition cursor-pointer"
                  >
                    Connect / Login to Cloud 🔑
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-white/40 mb-1 font-bold">
                {t('displayNameLabel', appLanguage)}
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={appLanguage === 'bm' ? 'Contoh: Budak Penang, Kawan Sabah...' : 'E.g., Budak Penang, Kawan Sabah...'}
                className="w-full bg-[#121212] border border-white/10 text-white rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-white/40 mb-1 font-bold">
                {t('originStateLabel', appLanguage)}
              </label>
              <select
                value={originState}
                onChange={(e) => setOriginState(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 text-white rounded-lg px-2.5 py-2 text-xs font-semibold focus:outline-none focus:border-gold"
              >
                <option value="Penang">Penang</option>
                <option value="Kedah">Kedah</option>
                <option value="Kelantan">Kelantan</option>
                <option value="Terengganu">Terengganu</option>
                <option value="Negeri Sembilan">Negeri Sembilan</option>
                <option value="Sabah">Sabah</option>
                <option value="Sarawak">Sarawak</option>
                <option value="Johor">Johor</option>
                <option value="Kuala Lumpur">Kuala Lumpur</option>
                <option value="Perak">Perak</option>
                <option value="Pahang">Pahang</option>
                <option value="Melaka">Melaka</option>
                <option value="Perlis">Perlis</option>
              </select>
            </div>

            {/* Malay Heritage Option Toggle */}
            <div className="bg-[#121212]/50 border border-white/5 rounded-xl p-3 flex items-start gap-2.5">
              <input
                id="heritageCheckbox"
                type="checkbox"
                checked={heritageState === 'Malay'}
                onChange={(e) => setHeritageState(e.target.checked ? 'Malay' : 'Other')}
                className="w-4 h-4 rounded border-white/10 text-crimson focus:ring-transparent bg-[#121212] mt-0.5 cursor-pointer accent-crimson"
              />
              <div className="text-left">
                <label htmlFor="heritageCheckbox" className="text-xs font-bold text-[#F5F5F5] cursor-pointer">
                  {t('heritageCheckboxLabel', appLanguage)}
                </label>
                <p className="text-[10px] text-white/45 mt-0.5 leading-normal">
                  {t('heritageCheckboxDesc', appLanguage)}
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
              <span className="text-[10px] text-white/30 font-mono">
                {appLanguage === 'bm' ? 'Status keselamatan: Pratonton Tanpa Nama' : appLanguage === 'manglish' ? 'Security status: Anonymous boss' : 'Security status: Anonymized Preview'}
              </span>
              <button
                onClick={handleSaveProfile}
                className="w-full sm:w-auto px-5 py-2 bg-crimson hover:bg-crimson/90 text-white font-extrabold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                {t('saveProfileBtn', appLanguage)}
              </button>
            </div>

            {isSavedNotice && (
              <p className="text-2xs text-emerald-400 font-mono text-center animate-pulse">
                {t('saveNoticeSuccess', appLanguage)}
              </p>
            )}
          </div>
        </div>

        {/* QUIZ RANK & CULTURAL BADGES */}
        <div className="bg-card border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase text-gold tracking-wide flex items-center gap-1.5 border-b border-white/5 pb-2.5">
            <Award className="w-4 h-4 text-[#FFD700]" />
            {t('rankAndBadgesTitle', appLanguage)}
          </h3>

          {/* Current Highest Rank Card */}
          <div className="bg-gradient-to-br from-gold/5 via-transparent to-crimson/5 border border-gold/15 p-4 rounded-xl grid grid-cols-[1fr_auto] items-center gap-3 text-left">
            <div className="space-y-1 min-w-0">
              <p className="text-[9px] font-mono uppercase tracking-widest text-[#E31C25] font-black">
                {t('highestRankLabel', appLanguage)}
              </p>
              <h4 className="text-base font-black text-white flex items-center gap-1.5 break-words">
                <span>{bestRank === 'Legend Kampung' ? (appLanguage === 'bm' ? '👑 Lagenda Kampung' : appLanguage === 'manglish' ? '👑 Kampung Legend' : '👑 Legend Kampung') : 
                       bestRank === 'Anak Jati' ? (appLanguage === 'bm' ? '🇲🇾 Anak Jati' : appLanguage === 'manglish' ? '🇲🇾 Local Expert' : '🇲🇾 Anak Jati') :
                       bestRank === 'Budak City' ? (appLanguage === 'bm' ? '🏢 Budak Kota' : appLanguage === 'manglish' ? '🏢 City Kid' : '🏢 Budak City') : 
                       (appLanguage === 'bm' ? '🥤 Pelancong' : appLanguage === 'manglish' ? '🥤 Tourist' : '🥤 Pelancong / Tourist')}</span>
              </h4>
              <p className="text-[10px] text-white/60 leading-normal">
                {bestRank === 'Legend Kampung' ? t('rankLegendDesc', appLanguage) : 
                 bestRank === 'Anak Jati' ? t('rankJatiDesc', appLanguage) :
                 bestRank === 'Budak City' ? t('rankCityDesc', appLanguage) :
                 t('rankTouristDesc', appLanguage)}
              </p>
            </div>
            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center text-xl sm:text-2xl">
              {bestRank === 'Legend Kampung' ? '👑' : 
               bestRank === 'Anak Jati' ? '🇲🇾' :
               bestRank === 'Budak City' ? '🏢' : '🥤'}
            </div>
          </div>

          {/* Badges Inventory Section */}
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
              <h4 className="text-[10px] uppercase font-mono tracking-wider text-[#FFD700] font-bold">
                {t('badgesCollectionHeader', appLanguage)} ({unlockedBadgeIds.length} / {ALL_BADGES.length} {appLanguage === 'bm' ? 'Pingat' : 'Badges'})
              </h4>
              
              {/* Category Filter Tabs */}
              <div className="flex gap-1 overflow-x-auto pb-1 scroller-hidden">
                {(['All', 'State', 'Score', 'Social', 'Special'] as const).map((cat) => {
                  const labelMap = {
                    All: t('badgeFilterAll', appLanguage),
                    State: t('badgeFilterState', appLanguage),
                    Score: t('badgeFilterQuiz', appLanguage),
                    Social: t('badgeFilterSocial', appLanguage),
                    Special: t('badgeFilterSpecial', appLanguage),
                  };
                  const isActive = badgeCategoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setBadgeCategoryFilter(cat)}
                      className={`px-2 py-0.5 text-[8px] font-mono font-bold rounded transition-all cursor-pointer whitespace-nowrap border ${
                        isActive
                          ? 'bg-gold/15 text-gold border-gold/45'
                          : 'bg-[#121212] text-white/40 border-white/5 hover:text-white'
                      }`}
                    >
                      {labelMap[cat]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Badges List Container */}
            <div className="max-h-60 overflow-y-auto pr-1 space-y-2 scroller-hidden">
              <div className={badgeGridLayoutClass}>
                {ALL_BADGES.filter(b => {
                  if (badgeCategoryFilter === 'All') return true;
                  if (badgeCategoryFilter === 'Social') return b.category === 'Social' || b.category === 'Activity';
                  return b.category === badgeCategoryFilter;
                }).map((badge) => {
                  const isUnlocked = unlockedBadgeIds.includes(badge.id);
                  let badgeBorder = isUnlocked
                    ? badge.category === 'State'
                      ? 'border-purple-500/30 bg-purple-500/5 text-purple-300'
                      : badge.category === 'Score'
                      ? 'border-crimson/30 bg-crimson/5 text-crimson'
                      : badge.category === 'Social' || badge.category === 'Activity'
                      ? 'border-cyan-500/30 bg-cyan-500/5 text-cyan-300'
                      : 'border-gold/30 bg-gold/5 text-gold'
                    : 'border-white/5 bg-[#121212]/30 text-white/20';

                  return (
                    <div 
                      key={badge.id}
                      className={`p-2 rounded-xl border flex gap-2 items-start text-left transition-all ${
                        isUnlocked ? 'hover:scale-[1.02] hover:border-gold/30 duration-200' : 'opacity-50'
                      } ${badgeBorder}`}
                    >
                      <div className="text-base shrink-0 select-none leading-none pt-0.5">
                        {isUnlocked ? badge.icon : '🔒'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`text-[9px] font-extrabold leading-tight break-words whitespace-normal ${isUnlocked ? 'text-[#F5F5F5]' : 'text-white/45'}`}>
                            {badge.name}
                          </p>
                          <span className={`text-[6px] uppercase font-mono px-1 rounded shrink-0 ${
                            isUnlocked ? 'bg-white/10 text-white/70' : 'bg-white/5 text-white/20'
                          }`}>
                            {badge.category}
                          </span>
                        </div>
                        <p className="text-[8px] text-white/50 leading-snug mt-0.5 whitespace-normal break-words">
                          {badge.description}
                        </p>
                        <p className="text-[7px] text-gold/70 font-mono mt-1 whitespace-normal break-words leading-none">
                          Req: {badge.requirement}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* REFER & WRAPPED PORTALS */}
      <div className={gridLayoutClass}>
        {/* Refer a Friend & Earn */}
        <div className="bg-card border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div className="space-y-2 text-left">
            <h3 className="text-xs font-black uppercase text-gold tracking-wide flex items-center gap-1.5 border-b border-white/5 pb-2.5">
              <Gift className="w-4 h-4 text-crimson" />
              {t('referAndEarn', appLanguage)}
            </h3>
            <p className="text-2xs text-[#F5F5F5]/75 leading-relaxed">
              {appLanguage === 'bm' ? 'Ajak rakan anda memelihara dialek Malaysia! Apabila mereka menyertai, anda dan rakan anda masing-masing mendapat ganjaran RM5 (Simulasi).' : 'Invite your friends to preserve Malaysian dialects! When they join, both of you will receive RM5 simulated store credit.'}
            </p>
          </div>

          <div className="space-y-3.5 text-left">
            {/* Display referral balance */}
            <div className="bg-[#121212]/50 border border-white/5 rounded-xl p-3 flex justify-between items-center">
              <span className="text-xs font-bold text-white/70">{t('referCreditBalance', appLanguage)}</span>
              <span className="text-sm font-black text-gold font-mono">RM {referralBalance.toFixed(2)}</span>
            </div>

            {/* Display my code */}
            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-white/40 mb-1 font-bold">
                {t('referCodeLabel', appLanguage)}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={myReferralCode}
                  className="flex-1 bg-[#121212]/80 border border-white/10 text-white rounded-lg px-3 py-2 text-xs font-mono text-center font-bold focus:outline-none"
                />
                <button
                  onClick={() => {
                    const deepLink = `${window.location.origin}${window.location.pathname}#referral/${myReferralCode}`;
                    navigator.clipboard.writeText(deepLink);
                    
                    window.dispatchEvent(new CustomEvent('loghat_push_notification', {
                      detail: {
                        title: '🔗 Pautan Disalin / Link Copied!',
                        body: appLanguage === 'bm' ? 'Pautan rujukan deep-link disalin ke papan klip!' : 'Referral deep link copied to clipboard!'
                      }
                    }));
                  }}
                  className="px-3.5 bg-interior hover:bg-[#1c2230] border border-white/10 hover:border-gold/30 text-gold text-xs font-bold rounded-lg transition"
                >
                  {appLanguage === 'bm' ? 'Kongsi' : 'Share'}
                </button>
              </div>
            </div>

            {/* Enter friend code */}
            <form onSubmit={handleRedeemCode}>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-white/40 mb-1 font-bold">
                {appLanguage === 'bm' ? 'Tebus Kod Rakan:' : "Enter Friend's Referral Code:"}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={friendCode}
                  onChange={(e) => setFriendCode(e.target.value)}
                  placeholder={t('referInputPlaceholder', appLanguage)}
                  className="flex-1 bg-[#121212] border border-white/10 text-white rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={!friendCode.trim()}
                  className={`px-4 font-extrabold text-xs rounded-lg transition-all border ${
                    friendCode.trim()
                      ? 'bg-crimson hover:bg-crimson/90 border-transparent text-white cursor-pointer'
                      : 'bg-[#121212] border-white/5 text-white/20 cursor-not-allowed'
                  }`}
                >
                  {t('referClaimBtn', appLanguage)}
                </button>
              </div>
            </form>

            {referStatus.msg && (
              <p className={`text-2xs font-semibold text-center ${referStatus.type === 'success' ? 'text-emerald-400' : 'text-crimson'}`}>
                {referStatus.msg}
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Wrapped Card Generation */}
        <div className="bg-card border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div className="space-y-2 text-left">
            <h3 className="text-xs font-black uppercase text-gold tracking-wide flex items-center gap-1.5 border-b border-white/5 pb-2.5">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              {t('wrappedTitle', appLanguage)}
            </h3>
            <p className="text-2xs text-[#F5F5F5]/75 leading-relaxed">
              {appLanguage === 'bm' ? 'Hasilkan grafik profil "Wrapped" tersuai sedia untuk dikongsi ke Stories Instagram/TikTok anda!' : 'Generate a beautiful vertical "Wrapped" graphic displaying your cultural stats, ready to share to your Instagram or TikTok stories!'}
            </p>
          </div>

          <div className="bg-[#121212]/30 border border-white/5 rounded-xl p-4 flex flex-col items-center gap-4 text-center">
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-gold via-crimson to-crimson p-[1.5px] shadow-lg shadow-black/40 overflow-hidden group">
              <img src="/logo.png" alt="Loghat Logo" className="w-full h-full object-cover rounded-[14px]" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              </div>
            </div>

            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-white font-serif">{displayName || 'Kawan Loghat'}</h4>
              <p className="text-[9px] font-mono text-white/50 uppercase tracking-wider">
                {bestRank === 'Legend Kampung' ? (appLanguage === 'bm' ? 'Lagenda Kampung' : 'Kampung Legend') : 
                 bestRank === 'Anak Jati' ? (appLanguage === 'bm' ? 'Anak Jati' : 'Local Expert') : 
                 (appLanguage === 'bm' ? 'Pelancong' : 'Tourist')}
              </p>
            </div>

            <button
              onClick={() => {
                if (onOpenWrapped) onOpenWrapped();
              }}
              className="w-full py-2 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-700 text-black font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-black animate-spin" />
              {t('generateWrapped', appLanguage)}
            </button>
          </div>
        </div>
      </div>

      <div className={gridLayoutClass}>

        {/* INTERACTIVE RATE THE APP */}
        <div className="bg-card border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-gold tracking-wide flex items-center gap-1.5 border-b border-white/5 pb-2.5">
              <Star className="w-4 h-4 text-gold animate-pulse" />
              {t('rateAppTitle', appLanguage)}
            </h3>
            <p className="text-2xs text-[#F5F5F5]/75 leading-relaxed text-left">
              {t('rateAppDesc', appLanguage)}
            </p>
          </div>

          {/* Stars widget */}
          <div className="bg-[#121212]/50 border border-white/5 rounded-xl p-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isSelected = star <= appRating;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRateApp(star)}
                    disabled={isRatedSubmitted}
                    className="p-1 cursor-pointer transition-transform duration-100 hover:scale-125 disabled:cursor-not-allowed"
                  >
                    <Star 
                      className={`w-7 h-7 ${
                        isSelected 
                          ? 'fill-gold text-gold filter drop-shadow-[0_0_4px_rgba(255,215,0,0.4)]' 
                          : 'text-white/20'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>

            {appRating > 0 && (
              <p className="text-[10px] font-semibold text-white/60">
                {appLanguage === 'bm' ? `Anda memilih: ${appRating} daripada 5 Bintang` : appLanguage === 'manglish' ? `You tap: ${appRating} over 5 Stars boss` : `You selected: ${appRating} out of 5 Stars`}
              </p>
            )}

            {!isRatedSubmitted ? (
              <button
                onClick={handleSubmitRatingAndUnlockBadge}
                disabled={appRating === 0}
                className={`px-6 py-2 rounded-lg font-bold text-2xs uppercase tracking-wide border transition-all flex items-center gap-1 shrink-0 ${
                  appRating > 0 
                    ? 'bg-gradient-to-r from-crimson to-rose-600 text-white border-transparent shadow hover:scale-102 cursor-pointer' 
                    : 'bg-[#121212] text-white/20 border-white/5 cursor-not-allowed'
                }`}
              >
                <Gift className="w-3.5 h-3.5 fill-current" />
                {t('submitRateBtn', appLanguage)}
              </button>
            ) : (
              <div className="w-full bg-emerald-500/10 border border-emerald-500/20 py-2.5 px-3 rounded-lg text-center">
                <p className="text-[10px] text-emerald-300 font-bold flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {t('rateSuccessText', appLanguage)}
                </p>
                <p className="text-[11px] font-extrabold text-white mt-1 underline decoration-gold decoration-2">
                  {heritageState === 'Malay' ? '🛡️ Good Netizen / Netizen Prihatin' : '🌟 Good Samaritan / Wira Penyayang'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FEEDBACK TO THE DEVELOPER */}
        <div className="bg-card border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-gold tracking-wide flex items-center gap-1.5 border-b border-white/5 pb-2.5">
              <MessageSquare className="w-4 h-4 text-crimson" />
              {t('feedbackTitle', appLanguage)}
            </h3>
            <p className="text-2xs text-[#F5F5F5]/75 leading-relaxed text-left">
              {t('feedbackDesc', appLanguage)}
            </p>
          </div>

          <form onSubmit={handleSendFeedback} className="space-y-3">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={t('feedbackPlaceholder', appLanguage)}
              rows={3}
              className="w-full bg-[#121212] border border-white/10 text-white rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-gold placeholder:text-white/35 resize-none"
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
              <span className="text-[9px] text-white/30 font-mono">
                {feedbackHistory.length} {t('feedbackLogsSaved', appLanguage)}
              </span>
              <button
                type="submit"
                disabled={!feedbackText.trim()}
                className={`w-full sm:w-auto px-5 py-2 font-black text-2xs uppercase tracking-wider rounded-lg border transition duration-200 flex items-center justify-center gap-1.5 ${
                  feedbackText.trim()
                    ? 'bg-crimson hover:bg-crimson/90 border-transparent text-white cursor-pointer'
                    : 'bg-[#121212] border-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                <Send className="w-3 h-3" />
                {t('sendFeedbackBtn', appLanguage)}
              </button>
            </div>

            {feedbackSent && (
              <p className="text-2xs text-emerald-400 font-mono text-center animate-pulse">
                {t('feedbackSuccessText', appLanguage)}
              </p>
            )}

            {feedbackHistory.length > 0 && (
              <div className="mt-3 border-t border-white/5 pt-3">
                <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1.5 font-mono">{t('feedbackHistoryLabel', appLanguage)}</label>
                <div className="max-h-16 overflow-y-auto space-y-1 bg-[#121212]/40 rounded-lg p-2.5 text-[10px] text-white/60">
                  {feedbackHistory.map((item, idx) => (
                    <div key={idx} className="break-words whitespace-normal border-b border-white/5 last:border-transparent pb-1 mb-1 last:pb-0 last:mb-0">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
}
