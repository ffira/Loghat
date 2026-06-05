import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { DialectEntry, PendingEdit, PrimaryLanguage, SponsorAd } from './types';
import { INITIAL_DIALECT_ENTRIES, INITIAL_PENDING_EDITS, INITIAL_SPONSOR_ADS } from './data/dialectData';

// Components
import MalaysiaMap from './components/MalaysiaMap';
import DialectDex from './components/DialectDex';
import DialectIQGame from './components/DialectIQGame';
import TouristSurvival from './components/TouristSurvival';
import CrowdsourceQueue from './components/CrowdsourceQueue';
import BazarSponsors from './components/BazarSponsors';
import SettingsTab from './components/SettingsTab';
import InterstitialAd from './components/InterstitialAd';
import SocialFeed from './components/SocialFeed';
import { Language, t } from './utils/i18n';

// Audio feedback helper
import { playIosTap, playIosChime, playIosError } from './utils/audioHelper';

// Analytics
import { trackEvent } from './utils/analytics';

// Icons
import {
  BookOpen,
  Award,
  Coffee,
  Sparkles,
  CheckCircle,
  Info,
  Megaphone,
  Settings,
  Shield,
  MessageSquare
} from 'lucide-react';

// Detect if running inside a Capacitor native iOS wrapper
const API_BASE = window.location.origin.startsWith('capacitor://')
  ? 'https://loghatku.my'
  : '';

export default function App() {
  const [entries, setEntries] = useState<DialectEntry[]>([]);
  const [pendingEdits, setPendingEdits] = useState<PendingEdit[]>([]);
  const [ads, setAds] = useState<SponsorAd[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isTouristMode, setIsTouristMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'game' | 'survival' | 'moderation' | 'ads' | 'settings' | 'social'>('game');
  
  // First free quiz onboarding states
  const [firstQuizCompleted, setFirstQuizCompleted] = useState<boolean>(() => {
    return localStorage.getItem('loghat_first_quiz_completed') === 'true';
  });
  const [showFirstQuizCompleteModal, setShowFirstQuizCompleteModal] = useState(false);
  const [justFinishedFirstQuizScore, setJustFinishedFirstQuizScore] = useState<number | null>(null);
  const [forcedOnboarding, setForcedOnboarding] = useState(false);
  const [appLanguage, setAppLanguage] = useState<Language>(() => {
    return (localStorage.getItem('loghat_app_language') as Language) || 'manglish';
  });

  const changeLanguage = (lang: Language) => {
    setAppLanguage(lang);
    localStorage.setItem('loghat_app_language', lang);
    if (isIosSoundActive) playIosTap();
  };

  // Monetization: Interstitial ad state
  const [showInterstitial, setShowInterstitial] = useState(false);
  const tabSwitchCount = useRef(0);
  const pendingTab = useRef<typeof activeTab | null>(null);

  // Onboarding, GDPR, Data Consent & Premium Status
  const [isPrivacyConsented, setIsPrivacyConsented] = useState<boolean>(() => {
    return localStorage.getItem('loghat_privacy_consented') === 'true';
  });
  const [optInTelemetry, setOptInTelemetry] = useState<boolean>(() => {
    return localStorage.getItem('loghat_opt_in_telemetry') !== 'false'; // default true
  });
  const [userProfile, setUserProfile] = useState<{
    email: string | null;
    phone: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    locationPermission: 'prompt' | 'granted' | 'denied';
    isPremiumUser: boolean;
    premiumTier: 'none' | 'adfree' | 'ultra';
    referralCode: string | null;
    balance: number;
  }>(() => {
    const defaultProfile = {
      email: null,
      phone: null,
      emailVerified: false,
      phoneVerified: false,
      locationPermission: 'prompt' as const,
      isPremiumUser: false,
      premiumTier: 'none' as const,
      referralCode: null,
      balance: 0,
    };
    try {
      const stored = localStorage.getItem('loghat_user_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Backwards compatibility for previous premium status
        if (parsed.isPremiumUser && !parsed.premiumTier) {
          parsed.premiumTier = 'adfree';
        } else if (!parsed.premiumTier) {
          parsed.premiumTier = 'none';
        }
        return { ...defaultProfile, ...parsed };
      }
      return defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [activeOnboardingStep, setActiveOnboardingStep] = useState<'email' | 'phone' | 'location'>('email');
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showMockLocationPrompt, setShowMockLocationPrompt] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Real authentication input states
  const [showAuthTab, setShowAuthTab] = useState<'onboarding' | 'login'>('onboarding');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [onboardingPassword, setOnboardingPassword] = useState('');

  // Verification Input States
  const [emailInput, setEmailInput] = useState('');
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false);
  const [emailOtpInput, setEmailOtpInput] = useState('');
  const [emailPreviewUrl, setEmailPreviewUrl] = useState<string | null>(null);
  
  const [countryCode, setCountryCode] = useState('+60');
  const [phoneInput, setPhoneInput] = useState('');
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false);
  const [phoneOtpInput, setPhoneOtpInput] = useState('');

  // Viral Mechanics States
  const [isPushBannerVisible, setIsPushBannerVisible] = useState(false);
  const [pushNotification, setPushNotification] = useState({ title: '', body: '' });
  const [showWrappedModal, setShowWrappedModal] = useState(false);
  const [wrappedStats, setWrappedStats] = useState<{
    displayName: string;
    rank: string;
    quizzesCompleted: number;
    highestScore: number;
    badgesCount: number;
    topState: string;
  } | null>(null);

  // Audio feedback toggle
  const [isIosSoundActive, setIsIosSoundActive] = useState(true);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  // Initialize Data
  useEffect(() => {
    const storedEntries = localStorage.getItem('loghat_entries');
    const storedEdits = localStorage.getItem('loghat_pending_edits');
    const storedAds = localStorage.getItem('loghat_sponsor_ads');

    if (storedEntries) {
      try {
        const parsed = JSON.parse(storedEntries);
        if (Array.isArray(parsed) && parsed.length >= 2000) {
          setEntries(parsed);
        } else {
          setEntries(INITIAL_DIALECT_ENTRIES);
          localStorage.setItem('loghat_entries', JSON.stringify(INITIAL_DIALECT_ENTRIES));
        }
      } catch {
        setEntries(INITIAL_DIALECT_ENTRIES);
        localStorage.setItem('loghat_entries', JSON.stringify(INITIAL_DIALECT_ENTRIES));
      }
    } else {
      setEntries(INITIAL_DIALECT_ENTRIES);
      localStorage.setItem('loghat_entries', JSON.stringify(INITIAL_DIALECT_ENTRIES));
    }

    if (storedEdits) {
      setPendingEdits(JSON.parse(storedEdits));
    } else {
      setPendingEdits(INITIAL_PENDING_EDITS);
      localStorage.setItem('loghat_pending_edits', JSON.stringify(INITIAL_PENDING_EDITS));
    }

    if (storedAds) {
      setAds(JSON.parse(storedAds));
    } else {
      setAds(INITIAL_SPONSOR_ADS);
      localStorage.setItem('loghat_sponsor_ads', JSON.stringify(INITIAL_SPONSOR_ADS));
    }

    // Sync session on mount
    syncSession().catch(console.error);

    // Track session start for analytics
    trackEvent('session_start', { viewport: `${window.innerWidth}x${window.innerHeight}` });
  }, []);

  // Hash Routing Deep Links Parser
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      if (hash.startsWith('#referral/')) {
        const code = hash.split('#referral/')[1];
        if (code) {
          sessionStorage.setItem('loghat_pending_preset_referral', code);
          setActiveTab('settings');
          triggerToast(`Referral code ${code} detected! Preset filled in settings.`, 'info');
          window.dispatchEvent(new CustomEvent('loghat_preset_referral', { detail: { code } }));
        }
      } else if (hash.startsWith('#challenge/')) {
        const rawState = hash.split('#challenge/')[1];
        if (rawState) {
          const stateKey = decodeURIComponent(rawState);
          setSelectedState(stateKey);
          setActiveTab('game');
          triggerToast(`Loading community challenge for ${stateKey}!`, 'info');
        }
      } else if (hash.startsWith('#word/')) {
        const rawWordId = hash.split('#word/')[1];
        if (rawWordId) {
          const wordId = decodeURIComponent(rawWordId);
          setActiveTab('explore');
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('loghat_highlight_word', { detail: { id: wordId } }));
          }, 300);
        }
      } else if (hash.startsWith('#wrapped/')) {
        const rawStats = hash.split('#wrapped/')[1];
        if (rawStats) {
          try {
            const parsed = JSON.parse(decodeURIComponent(rawStats));
            setWrappedStats(parsed);
            setShowWrappedModal(true);
          } catch (e) {
            console.error('Error parsing wrapped deep link', e);
          }
        }
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Listen for simulated push notification events from components
  useEffect(() => {
    const handlePushEvent = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail && customEv.detail.title) {
        setPushNotification({
          title: customEv.detail.title,
          body: customEv.detail.body || ''
        });
        setIsPushBannerVisible(true);
        if (isIosSoundActive) {
          playIosChime();
        }
      }
    };

    window.addEventListener('loghat_push_notification', handlePushEvent);
    return () => window.removeEventListener('loghat_push_notification', handlePushEvent);
  }, [isIosSoundActive]);

  // Push banner auto dismiss loop
  useEffect(() => {
    if (isPushBannerVisible) {
      const timer = setTimeout(() => {
        setIsPushBannerVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isPushBannerVisible]);

  // Auto-set the active onboarding step based on current profile completion status
  useEffect(() => {
    if (!userProfile.emailVerified) {
      setActiveOnboardingStep('email');
    } else if (!userProfile.phoneVerified) {
      setActiveOnboardingStep('phone');
    } else {
      setActiveOnboardingStep('location');
    }
  }, [userProfile.emailVerified, userProfile.phoneVerified, userProfile.locationPermission]);

  // Custom Toast with sound trigger
  const triggerToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);

    if (isIosSoundActive) {
      playIosChime();
    }

    // Dismiss toast
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Periodic background telemetry daemon
  const sendTelemetry = async (actionName: string, metadata: any) => {
    if (!optInTelemetry) {
      console.log(`[Telemetry Service] Bypassed action '${actionName}' due to GDPR/CCPA Opt-Out.`);
      return;
    }
    const payload = {
      action: actionName,
      metadata,
      timestamp: new Date().toISOString(),
      locale: 'ms-MY',
      platform: 'Web'
    };
    console.log('[Telemetry Service] Triggered telemetry backup:', payload);

    try {
      await fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {
      // safe server fallback
    }
  };

  const syncProfileToBackend = async (updatedFields: Partial<typeof userProfile>) => {
    const token = localStorage.getItem('loghat_jwt_token');
    if (!token) return;

    try {
      const payload = {
        nickname: updatedFields.nickname ?? userProfile.nickname,
        originState: updatedFields.originState ?? userProfile.originState,
        premiumTier: updatedFields.premiumTier ?? userProfile.premiumTier,
        bestScore: updatedFields.bestScore ?? userProfile.bestScore,
        bestRank: updatedFields.bestRank ?? userProfile.bestRank,
        unlockedBadgeIds: getUnlockedBadgeIds(),
        referralCode: updatedFields.referralCode ?? userProfile.referralCode,
        phone: updatedFields.phone ?? userProfile.phone,
        phoneVerified: updatedFields.phoneVerified ?? userProfile.phoneVerified
      };

      await fetch(`${API_BASE}/api/users/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('Backend sync failed:', e);
    }
  };

  const syncSession = async () => {
    const token = localStorage.getItem('loghat_jwt_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const dbUser = data.user;
          setUserProfile({
            email: dbUser.email,
            phone: dbUser.phone || null,
            nickname: dbUser.nickname,
            originState: dbUser.origin_state,
            heritageState: dbUser.heritage_state || 'Other',
            bestScore: dbUser.best_score || 0,
            bestRank: dbUser.best_rank || 'Tourist',
            emailVerified: dbUser.email_verified,
            phoneVerified: dbUser.phone_verified,
            locationPermission: dbUser.location_permission as any,
            isPremiumUser: dbUser.premium_tier !== 'none',
            premiumTier: dbUser.premium_tier as any,
            referralCode: dbUser.referral_code || null,
            balance: parseFloat(dbUser.balance || '0')
          });
          
          if (dbUser.unlocked_badge_ids) {
            try {
              const badges = JSON.parse(dbUser.unlocked_badge_ids);
              localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(badges));
            } catch {}
          }
        }
      } else if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('loghat_jwt_token');
      }
    } catch (e) {
      console.warn('Failed to sync session with production API backend:', e);
    }
  };

  const handleSendEmailCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.trim() || !emailRegex.test(emailInput.trim())) {
      if (isIosSoundActive) playIosError();
      alert('⚠️ Invalid Coordinates:\nPlease enter a valid email format before dispatching codes.');
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/api/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setIsEmailCodeSent(true);
        setEmailPreviewUrl(data.previewUrl || null);
        triggerToast('✨ Verification code sent! Please check your email inbox.', 'success');
      } else {
        alert(`Verification Error:\n${data.error || 'Failed to dispatch verification code.'}`);
      }
    } catch (err) {
      alert('Server Connection Error:\nCould not reach the production database API.');
    }
  };

  const handleVerifyEmailCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onboardingPassword.trim().length < 6) {
      if (isIosSoundActive) playIosError();
      alert('Password Too Short:\nPlease choose a password containing at least 6 characters.');
      return;
    }
    if (!emailOtpInput.trim()) {
      if (isIosSoundActive) playIosError();
      alert('Verification Error:\nPlease enter the passcode sent to your email.');
      return;
    }

    // Register on Backend database!
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.trim(),
          password: onboardingPassword,
          nickname: 'Budak Loghat',
          originState: 'Kuala Lumpur',
          code: emailOtpInput.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        if (data.token) {
          localStorage.setItem('loghat_jwt_token', data.token);
          triggerToast('🎉 Email verified & production profile registered!', 'success');
          updateProfile({
            email: emailInput.trim(),
            emailVerified: true,
            referralCode: data.user.referral_code,
            balance: parseFloat(data.user.balance || '0')
          });
          setActiveOnboardingStep('phone');
        }
      } else {
        alert(`Registration Mismatch:\n${data.error || 'Failed to register account'}`);
      }
    } catch (err) {
      alert('Server Connection Error:\nCould not reach the production database API.');
    }
  };

  const handleSendPhoneCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phoneInput.trim() || phoneInput.length < 7) {
      if (isIosSoundActive) playIosError();
      alert('⚠️ Contact Invalid:\nPlease enter a valid mobile number.');
      return;
    }
    setIsPhoneCodeSent(true);
    triggerToast('⚡ SMS OTP code generated!', 'success');
  };

  const handleVerifyPhoneCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (phoneOtpInput.trim() === '8153') {
      triggerToast('🎉 Phone number verified and saved to your profile!', 'success');
      updateProfile({
        phone: `${countryCode}${phoneInput}`,
        phoneVerified: true
      });
      setActiveOnboardingStep('location');
    } else {
      if (isIosSoundActive) playIosError();
      alert('✕ OTP Mismatch:\nThe passcode is incorrect (Hint: enter "8153")');
    }
  };

  const handleBackendLogin = async (e?: any) => {
    if (e) e.preventDefault();
    if (!loginEmail || !loginPassword) {
      triggerToast('Please enter both email and password', 'info');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('loghat_jwt_token', data.token);
          localStorage.setItem('loghat_first_quiz_completed', 'true');
          const dbUser = data.user;
          setUserProfile({
            email: dbUser.email,
            phone: dbUser.phone || null,
            nickname: dbUser.nickname,
            originState: dbUser.origin_state,
            heritageState: dbUser.heritage_state || 'Other',
            bestScore: dbUser.best_score || 0,
            bestRank: dbUser.best_rank || 'Tourist',
            emailVerified: dbUser.email_verified,
            phoneVerified: dbUser.phone_verified,
            locationPermission: dbUser.location_permission as any,
            isPremiumUser: dbUser.premium_tier !== 'none',
            premiumTier: dbUser.premium_tier as any,
            referralCode: dbUser.referral_code || null,
            balance: parseFloat(dbUser.balance || '0')
          });
          
          if (dbUser.unlocked_badge_ids) {
            try {
              const badges = JSON.parse(dbUser.unlocked_badge_ids);
              localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(badges));
            } catch {}
          }

          setFirstQuizCompleted(true);
          setForcedOnboarding(false);
          triggerToast('Welcome back! Login successful.', 'success');
        }
      } else {
        const errData = await res.json();
        triggerToast(`Login Error: ${errData.error || 'Authentication failed'}`, 'info');
      }
    } catch (err) {
      triggerToast('Server connection failed.', 'info');
    }
  };

  const handleBackendOAuth = async (provider: 'google' | 'apple', mockEmail: string, mockName: string) => {
    try {
      const endpoint = provider === 'google' ? '/api/auth/verify-google' : '/api/auth/verify-apple';
      const bodyPayload = provider === 'google' 
        ? { googleId: `g-oauth-${Date.now()}`, email: mockEmail, nickname: mockName }
        : { appleId: `a-oauth-${Date.now()}`, email: mockEmail, nickname: mockName };

      const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('loghat_jwt_token', data.token);
          localStorage.setItem('loghat_first_quiz_completed', 'true');
          const dbUser = data.user;
          setUserProfile({
            email: dbUser.email,
            phone: dbUser.phone || null,
            nickname: dbUser.nickname,
            originState: dbUser.origin_state,
            heritageState: dbUser.heritage_state || 'Other',
            bestScore: dbUser.best_score || 0,
            bestRank: dbUser.best_rank || 'Tourist',
            emailVerified: dbUser.email_verified,
            phoneVerified: dbUser.phone_verified,
            locationPermission: dbUser.location_permission as any,
            isPremiumUser: dbUser.premium_tier !== 'none',
            premiumTier: dbUser.premium_tier as any,
            referralCode: dbUser.referral_code || null,
            balance: parseFloat(dbUser.balance || '0')
          });
          setFirstQuizCompleted(true);
          setForcedOnboarding(false);
          triggerToast(`Logged in successfully via ${provider === 'google' ? 'Google' : 'Apple'}!`, 'success');
        }
      } else {
        triggerToast('OAuth linking failed on backend.', 'info');
      }
    } catch (e) {
      triggerToast('OAuth connection failed.', 'info');
    }
  };

  const updateProfile = (updatedFields: Partial<typeof userProfile>) => {
    setUserProfile((prev) => {
      const newProfile = { ...prev, ...updatedFields };
      localStorage.setItem('loghat_user_profile', JSON.stringify(newProfile));
      return newProfile;
    });

    // Fire telemetry event on account updates
    sendTelemetry('update_user_profile', {
      emailVerified: updatedFields.emailVerified ?? userProfile.emailVerified,
      phoneVerified: updatedFields.phoneVerified ?? userProfile.phoneVerified,
      locationPermission: updatedFields.locationPermission ?? userProfile.locationPermission,
      isPremiumUser: updatedFields.isPremiumUser ?? userProfile.isPremiumUser
    });

    // Sync to PostgreSQL DB if session is active
    syncProfileToBackend(updatedFields).catch(console.error);
  };

  const handleOpenWrapped = () => {
    let nickname = 'Kawan Loghat';
    try {
      const stored = localStorage.getItem('loghat_user_profile_extended');
      if (stored) {
        nickname = JSON.parse(stored).displayName || 'Kawan Loghat';
      }
    } catch {}
      
    const scoreVal = parseInt(localStorage.getItem('loghat_best_score') || '0', 10);
    const rankVal = localStorage.getItem('loghat_best_rank') || 'Tourist';
    
    let unlockedBadgeCount = 0;
    try {
      const storedIds = localStorage.getItem('loghat_unlocked_badge_ids');
      unlockedBadgeCount = storedIds ? JSON.parse(storedIds).length : 0;
    } catch {}
    if (unlockedBadgeCount === 0) unlockedBadgeCount = 1; // Default fallback
    
    // Track stats
    const quizzesCount = parseInt(localStorage.getItem('loghat_stats_quizzes_played') || '8', 10);
    
    let topStateVal = 'Penang';
    try {
      const stored = localStorage.getItem('loghat_user_profile_extended');
      if (stored) {
        topStateVal = JSON.parse(stored).originState || 'Penang';
      }
    } catch {}

    setWrappedStats({
      displayName: nickname,
      rank: rankVal,
      quizzesCompleted: quizzesCount,
      highestScore: scoreVal > 0 ? scoreVal : 80,
      badgesCount: unlockedBadgeCount,
      topState: topStateVal
    });
    
    setShowWrappedModal(true);
  };

  const getUnlockedBadgeIds = (): string[] => {
    try {
      const storedIds = localStorage.getItem('loghat_unlocked_badge_ids');
      return storedIds ? JSON.parse(storedIds) : [];
    } catch {
      return [];
    }
  };

  const selectPremiumTier = async (tier: 'none' | 'adfree' | 'ultra') => {
    const isPremium = tier !== 'none';
    
    const token = localStorage.getItem('loghat_jwt_token');
    
    if (isPremium && token) {
      triggerToast('Redirecting to secure Stripe checkout portal...', 'info');
      try {
        const res = await fetch(`${API_BASE}/api/payment/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ planTier: tier })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            window.location.href = data.url; // Redirect to Stripe checkout page
            return;
          }
        } else {
          const errData = await res.json();
          triggerToast(`Stripe Error: ${errData.error || 'Checkout failed'}`, 'info');
        }
      } catch (e) {
        console.error(e);
        triggerToast('Failed to initiate checkout via Stripe.', 'info');
      }
    }

    if (isPremium && !token) {
      triggerToast('Please register or log in first to purchase a subscription!', 'info');
      setForcedOnboarding(true);
      setActiveTab('game');
      return;
    }

    updateProfile({
      premiumTier: tier,
      isPremiumUser: isPremium
    });

    // Auto unlock/lock premium badges
    const unlockedIds = getUnlockedBadgeIds();
    let newBadges = [...unlockedIds];
    if (tier === 'ultra') {
      if (!newBadges.includes('ultra_legend')) newBadges.push('ultra_legend');
      if (!newBadges.includes('social_ultra')) newBadges.push('social_ultra');
      localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(newBadges));
      triggerToast('👑 Ultra Premium Active: Exclusive perks & badges unlocked!', 'success');
    } else if (tier === 'adfree') {
      newBadges = newBadges.filter(id => id !== 'ultra_legend' && id !== 'social_ultra');
      localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(newBadges));
      triggerToast('🚫 Lifetime Ad-Free Active: All advertisements hidden!', 'success');
    } else {
      newBadges = newBadges.filter(id => id !== 'ultra_legend' && id !== 'social_ultra');
      localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(newBadges));
      triggerToast('Downgraded to Standard Free tier.', 'info');
    }

    if (tier !== 'none') {
      window.dispatchEvent(new CustomEvent('loghat_push_notification', {
        detail: {
          title: tier === 'ultra' ? '👑 Premium Unlocked!' : '🚫 Ad-Free Unlocked!',
          body: appLanguage === 'bm'
            ? `Tahniah! Anda telah menaik taraf ke ${tier === 'ultra' ? 'Ultra Premium' : 'Lifetime Ad-Free'}. Pautan rujukan anda dikreditkan!`
            : `Congratulations! You have upgraded to ${tier === 'ultra' ? 'Ultra Premium' : 'Lifetime Ad-Free'}. Referral unlocked!`
        }
      }));
    }
  };

  const handleAcceptPrivacyAndConsent = (monetizeConsent: boolean) => {
    setIsPrivacyConsented(true);
    localStorage.setItem('loghat_privacy_consented', 'true');
    setOptInTelemetry(monetizeConsent);
    localStorage.setItem('loghat_opt_in_telemetry', monetizeConsent ? 'true' : 'false');
    
    updateProfile({
      isPremiumUser: false
    });

    triggerToast('Privacy policy consented. Telemetry preferences locked!', 'success');
  };

  // 2. Upvote slang entry
  const handleUpvoteEntry = (id: string) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, upvote_count: entry.upvote_count + 1 };
      }
      return entry;
    });
    setEntries(updated);
    localStorage.setItem('loghat_entries', JSON.stringify(updated));
    triggerToast('Consensus verified! Upvoted local dialect accuracy.', 'success');
    sendTelemetry('upvote_slang', { wordId: id });
  };

  // 3. User Proposes a Fresh App Slang
  const handleAddEntryProposal = (newWord: Omit<DialectEntry, 'id' | 'upvote_count' | 'verified_status'>, customVoice?: string) => {
    const proposalId = `custom-proposal-${Date.now()}`;
    const newEditItem: PendingEdit = {
      id: proposalId,
      word_name: newWord.word_name,
      dialect_type: newWord.dialect_type,
      state_origin: newWord.state_origin,
      primary_language: newWord.primary_language,
      proposed_correction: {
        standard_bm_equivalent: newWord.standard_bm_equivalent,
        english_equivalent: newWord.english_equivalent,
        example_sentence: newWord.example_sentence,
      },
      submitted_by: 'MamakGuest_23',
      timestamp: new Date().toISOString(),
      sah_votes: 1,
      voted_by_user: true,
    };

    const updatedQueue = [newEditItem, ...pendingEdits];
    setPendingEdits(updatedQueue);
    localStorage.setItem('loghat_pending_edits', JSON.stringify(updatedQueue));

    if (customVoice) {
      localStorage.setItem(`loghat_custom_voice_${proposalId}`, customVoice);
    }

    triggerToast(`"${newWord.word_name}" queued for moderator consensus voting!`, 'info');
    setActiveTab('moderation');
  };

  // 4. Propose Wiki Correction to an Existing Word
  const handleCorrectionProposal = (
    wordId: string,
    wordName: string,
    corrections: { standard_bm_equivalent: string; english_equivalent: string; example_sentence: string },
    customVoice?: string
  ) => {
    const original = entries.find((e) => e.id === wordId);
    if (!original) return;

    const proposalId = `custom-correction-${Date.now()}`;
    const newEditItem: PendingEdit = {
      id: proposalId,
      word_id: wordId,
      word_name: wordName,
      dialect_type: original.dialect_type,
      state_origin: original.state_origin,
      primary_language: original.primary_language,
      proposed_correction: corrections,
      submitted_by: 'WikiProGuest',
      timestamp: new Date().toISOString(),
      sah_votes: 1,
      voted_by_user: true,
    };

    const updatedQueue = [newEditItem, ...pendingEdits];
    setPendingEdits(updatedQueue);
    localStorage.setItem('loghat_pending_edits', JSON.stringify(updatedQueue));

    if (customVoice) {
      localStorage.setItem(`loghat_custom_voice_${wordId}`, customVoice);
    }

    triggerToast(`Suggested wiki modifications for "${wordName}" sent to moderator queue!`, 'info');
    setActiveTab('moderation');
  };

  // 5. Vote "Sah" (Confirm) on queue items
  const handleVoteSah = (id: string) => {
    const targetEdit = pendingEdits.find((e) => e.id === id);
    if (!targetEdit || targetEdit.voted_by_user) return;

    const updatedVotes = targetEdit.sah_votes + 1;

    if (updatedVotes >= 10) {
      if (targetEdit.word_id) {
        const updatedEntries = entries.map((entry) => {
          if (entry.id === targetEdit.word_id) {
            return {
              ...entry,
              standard_bm_equivalent: targetEdit.proposed_correction.standard_bm_equivalent,
              english_equivalent: targetEdit.proposed_correction.english_equivalent,
              example_sentence: targetEdit.proposed_correction.example_sentence,
              upvote_count: entry.upvote_count + 10,
              verified_status: true,
            };
          }
          return entry;
        });
        setEntries(updatedEntries);
        localStorage.setItem('loghat_entries', JSON.stringify(updatedEntries));
      } else {
        const brandNewEntry: DialectEntry = {
          id: `slang-${Date.now()}`,
          word_name: targetEdit.word_name,
          primary_language: targetEdit.primary_language,
          dialect_type: targetEdit.dialect_type,
          state_origin: targetEdit.state_origin,
          standard_bm_equivalent: targetEdit.proposed_correction.standard_bm_equivalent,
          english_equivalent: targetEdit.proposed_correction.english_equivalent,
          context_of_use: 'Slang',
          explanation: `A popular crowdsourced slang verified with high consensus from ${targetEdit.state_origin}.`,
          example_sentence: targetEdit.proposed_correction.example_sentence,
          verified_status: true,
          upvote_count: 10,
        };
        const updatedEntries = [brandNewEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('loghat_entries', JSON.stringify(updatedEntries));
      }

      // Remove from pending
      const filteredQueue = pendingEdits.filter((e) => e.id !== id);
      setPendingEdits(filteredQueue);
      localStorage.setItem('loghat_pending_edits', JSON.stringify(filteredQueue));

      triggerToast(`🎉 Pro-consensus! "${targetEdit.word_name}" is now globally verified!`, 'success');
    } else {
      const updatedQueue = pendingEdits.map((e) => {
        if (e.id === id) {
          return { ...e, sah_votes: updatedVotes, voted_by_user: true };
        }
        return e;
      });
      setPendingEdits(updatedQueue);
      localStorage.setItem('loghat_pending_edits', JSON.stringify(updatedQueue));
      triggerToast('Thank you! "Sah" (consensus) vote registered.', 'success');
    }
  };

  // 6. Delete / Reject proposal
  const handleRejectEdit = (id: string) => {
    const filteredQueue = pendingEdits.filter((e) => e.id !== id);
    setPendingEdits(filteredQueue);
    localStorage.setItem('loghat_pending_edits', JSON.stringify(filteredQueue));
    triggerToast('Proposal discarded.', 'info');
  };

  // 7. Add Sponsor Ad
  const handleAddAd = (newAd: SponsorAd) => {
    const updated = [newAd, ...ads];
    setAds(updated);
    localStorage.setItem('loghat_sponsor_ads', JSON.stringify(updated));
    triggerToast(`"${newAd.business_name}" is attached to Sapot Lokal board!`, 'success');
  };

  // 8. Add Reaction to Sponsor Ad
  const handleReactAd = (id: string, reactionType: 'sah' | 'gostan' | 'fuyoo') => {
    const updated = ads.map((ad) => {
      if (ad.id === id) {
        const counts = { ...ad.reaction_counts };
        counts[reactionType] = counts[reactionType] + 1;
        return { ...ad, reaction_counts: counts };
      }
      return ad;
    });
    setAds(updated);
    localStorage.setItem('loghat_sponsor_ads', JSON.stringify(updated));
    triggerToast('Ad reaction submitted!', 'success');
  };

  // Handle Tab changes with acoustic tap feedback + interstitial ad every 4th switch
  const changeTab = (tab: typeof activeTab) => {
    trackEvent('tab_switch', { tab, from: activeTab });
    if (isIosSoundActive) {
      playIosTap();
    }
    sendTelemetry('navigate_tab', { tabName: tab });

    tabSwitchCount.current++;
    // Show interstitial every 4th tab switch (skip if premium)
    if (tabSwitchCount.current % 4 === 0 && !userProfile.isPremiumUser) {
      pendingTab.current = tab;
      setShowInterstitial(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleInterstitialDismiss = () => {
    setShowInterstitial(false);
    if (pendingTab.current) {
      setActiveTab(pendingTab.current);
      pendingTab.current = null;
    }
  };


  // Active stat indicators
  const entryCountsByState: Record<string, number> = {};
  entries.forEach((e) => {
    entryCountsByState[e.state_origin] = (entryCountsByState[e.state_origin] || 0) + 1;
  });

  // Render bottom AdMob standard sticky banner placeholder
  const renderBottomAdmobBanner = () => {
    if (userProfile.isPremiumUser) return null;
    return (
      <div id="admob-sticky-bottom-banner" className="bg-[#12141c] border-t border-white/10 px-2 py-1 flex items-center justify-between shrink-0 select-none text-2xs font-mono h-[38px] w-full z-35 relative">
        <div className="flex items-center gap-1.5 overflow-hidden min-w-0 flex-1 mr-1.5 text-left">
          <span className="bg-amber-400 text-black text-[7px] font-black leading-none px-1 py-0.5 rounded uppercase tracking-wider shrink-0">AD</span>
          <p className="font-sans font-bold hover:text-gold transition truncate text-[9px] text-[#F5F5F5]/90 min-w-0 flex-1">
            👑 Go Premium (RM4.90) • No Ads + Exclusive Badges!
          </p>
        </div>
        <button
          onClick={() => {
            trackEvent('premium_prompt', { source: 'banner' });
            setShowSubscriptionModal(true);
          }}
          className="px-2 py-1 bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-black rounded text-[8px] font-black uppercase transition cursor-pointer leading-none shrink-0"
        >
          RM4.90
        </button>
      </div>
    );
  };

  // Render play screen specific top banner placeholder
  const renderTopAdmobBanner = () => {
    if (userProfile.isPremiumUser) return null;
    return (
      <div id="admob-adaptive-top-banner" className="bg-gradient-to-r from-indigo-950/20 via-violet-950/20 to-indigo-950/20 border border-white/10 rounded-xl p-3 select-none text-2xs font-mono relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="absolute top-0 right-0 w-16 h-16 opacity-10 font-black text-6xl pointer-events-none select-none text-white/10">AD</div>
        <div className="flex items-center gap-3 w-full sm:w-auto text-left">
          <div className="bg-[#121212] border border-white/10 w-9 h-9 rounded-lg flex items-center justify-center text-lg select-none shrink-0 shadow">💡</div>
          <div className="leading-normal">
            <span className="bg-rose-500 text-white text-[7px] font-black px-1.5 py-0.2 rounded uppercase mr-1.5">Sponsor Ad</span>
            <span className="font-sans font-bold text-white/90 text-[10px]">Stuck on the Penang Hokkien Quiz?</span>
            <p className="text-[9px] text-white/50">"Teh Tarik Kaw-Kaw" coupon at Syed Mamak Bintang. Use code: MAMAKIQ</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-[8px] text-white/30 hidden md:inline">AdMob 320x50 Smart-Adaptive</span>
          <button
            onClick={() => {
              setShowSubscriptionModal(true);
            }}
            className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded hover:text-white transition text-[8.5px] font-bold shrink-0 cursor-pointer"
          >
            Mute Ads
          </button>
        </div>
      </div>
    );
  };

  // ——————————————— SMART AD SYSTEM (Local Ad Cards > Third-Party Fallback) ———————————————
  // Rotates through approved local Ad Cards. Falls back to generic third-party placeholder if none exist.
  const adRotationRef = useRef(0);

  const getApprovedLocalAds = () => ads.filter(a => a.is_approved);

  const getNextLocalAd = () => {
    const approved = getApprovedLocalAds();
    if (approved.length === 0) return null;
    const ad = approved[adRotationRef.current % approved.length];
    adRotationRef.current++;
    return ad;
  };

  const categoryIcons: Record<string, string> = {
    'Food & Beverage': '🍜',
    'Services': '🔧',
    'Automotive': '🚗',
    'Retail': '🛍️',
    'Lifestyle': '✨',
  };

  // Third-party placeholder ads (simulated network ads)
  const thirdPartyAds = [
    { headline: 'Grab Your GrabFood Promo', desc: 'RM5 off your next order • Use code LOGHAT5', icon: '🛵', sponsor: 'GrabFood' },
    { headline: 'Shopee 7.7 Sale is LIVE', desc: 'Up to 77% off electronics, fashion & more', icon: '🛒', sponsor: 'Shopee Malaysia' },
    { headline: 'Touch \'n Go eWallet', desc: 'Cashback up to RM10 on your next reload', icon: '💳', sponsor: 'TnG Digital' },
    { headline: 'Boost — Shake & Win!', desc: 'Win RM888 daily with Boost Shake rewards', icon: '📱', sponsor: 'Boost App' },
    { headline: 'Lazada Flash Sale ⚡', desc: 'Free shipping on orders over RM15', icon: '📦', sponsor: 'Lazada Malaysia' },
  ];
  const thirdPartyRef = useRef(0);

  const getNextThirdPartyAd = () => {
    const ad = thirdPartyAds[thirdPartyRef.current % thirdPartyAds.length];
    thirdPartyRef.current++;
    return ad;
  };

  // Render a smart ad banner — local Ad Card first, third-party fallback
  const renderSmartAdBanner = (variant: 'inline' | 'sidebar' | 'mid', key?: string) => {
    if (userProfile.isPremiumUser) return null;

    const localAd = getNextLocalAd();

    if (localAd) {
      // LOCAL AD CARD — Sapot Lokal
      return (
        <div key={key} className={`bg-gradient-to-r from-gold/5 to-emerald-900/10 border border-gold/15 rounded-xl select-none transition-all ${
          variant === 'sidebar' ? 'p-3.5 flex flex-col gap-2.5' : variant === 'mid' ? 'p-2.5 flex items-center gap-3' : 'p-2.5 flex items-center gap-3'
        }`}>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="bg-emerald-500 text-white text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider leading-none">Sapot Lokal</span>
            {variant === 'sidebar' && <span className="text-[8px] text-white/30 font-mono">Ad Card</span>}
          </div>
          <div className={`min-w-0 flex-1 ${variant === 'sidebar' ? 'space-y-1' : ''}`}>
            <p className={`font-bold text-[#F5F5F5]/90 truncate ${variant === 'sidebar' ? 'text-xs' : 'text-[10px]'}`}>
              {categoryIcons[localAd.category] || '📢'} {localAd.business_name} — {localAd.headline}
            </p>
            {variant === 'sidebar' && (
              <p className="text-[9px] text-white/50 line-clamp-2 leading-relaxed">{localAd.description}</p>
            )}
            <p className={`text-white/40 font-mono ${variant === 'sidebar' ? 'text-[8px]' : 'text-[7px]'}`}>
              Slang: "{localAd.slang_element}" • {localAd.state_origin}
            </p>
          </div>
          {variant === 'sidebar' && (
            <div className="flex gap-2 text-[9px] font-bold text-white/50">
              <span>👍 {localAd.reaction_counts.sah}</span>
              <span>✨ {localAd.reaction_counts.fuyoo}</span>
            </div>
          )}
        </div>
      );
    }

    // THIRD-PARTY FALLBACK
    const tp = getNextThirdPartyAd();
    return (
      <div key={key} className={`bg-gradient-to-r from-indigo-950/20 to-violet-950/20 border border-white/10 rounded-xl select-none transition-all ${
        variant === 'sidebar' ? 'p-3.5 flex flex-col gap-2' : variant === 'mid' ? 'p-2.5 flex items-center gap-3' : 'p-2.5 flex items-center gap-3'
      }`}>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="bg-amber-400 text-black text-[6px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider leading-none">AD</span>
          {variant === 'sidebar' && <span className="text-[8px] text-white/30 font-mono">{tp.sponsor}</span>}
        </div>
        <div className={`min-w-0 flex-1 ${variant === 'sidebar' ? 'space-y-0.5' : ''}`}>
          <p className={`font-bold text-[#F5F5F5]/90 truncate ${variant === 'sidebar' ? 'text-xs' : 'text-[10px]'}`}>
            {tp.icon} {tp.headline}
          </p>
          <p className={`text-white/45 ${variant === 'sidebar' ? 'text-[9px]' : 'text-[8px]'}`}>{tp.desc}</p>
        </div>
      </div>
    );
  };



  // Render initial Privacy Consent Gate Screen
  const renderPrivacyConsentScreen = (isSimulatorLayout: boolean) => {
    return (
      <div className={`bg-card border border-white/10 rounded-2xl flex flex-col text-left max-w-xl mx-auto my-4 text-xs ${
        isSimulatorLayout ? 'p-4 gap-4 text-[10.5px]' : 'p-6 gap-5'
      }`}>
        <div className={`space-y-1 bg-gradient-to-r from-gold/10 to-transparent rounded-xl border border-gold/15 ${
          isSimulatorLayout ? 'p-2.5' : 'p-3'
        }`}>
          <h3 className={`font-black text-gold font-sans tracking-tight flex items-center gap-1.5 uppercase ${
            isSimulatorLayout ? 'text-xs' : 'text-base'
          }`}>
            <Shield className="w-4 h-4 text-crimson animate-pulse shrink-0" /> Safeguards & Consent Gate
          </h3>
          <p className={`text-white/70 leading-normal ${isSimulatorLayout ? 'text-[9.5px]' : 'text-[11px]'}`}>
            Loghat operates under strict Malaysian cultural preservation charters. To proceed to the IQ Quiz challenges, please review our privacy agreements and secure verification criteria.
          </p>
        </div>

        {/* Scrollable Mini-Summary of policy */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono tracking-widest text-[#777] uppercase font-bold">Policy Summary</span>
          <div className={`bg-black/30 rounded-xl border border-white/5 max-h-24 overflow-y-auto leading-normal text-white/65 ${
            isSimulatorLayout ? 'p-2.5 text-[9.5px]' : 'p-3 text-[10.5px]'
          }`}>
            By enabling Loghat services, we process coordinate indexes (when location permission is approved) to assign local slang databases, and display standard Google AdMob banner ads. This is fully anonymized and complies with safety standards.
          </div>
        </div>

        {/* Dynamic switches */}
        <div className="space-y-3.5 border-t border-white/5 pt-4 whitespace-normal break-words">
          <div className="space-y-3.5 whitespace-normal break-words">
            <div className="space-y-3.5 whitespace-normal break-words">
              {/* Option 1 */}
              <div className="grid grid-cols-[auto_1fr] items-start gap-2.5 cursor-pointer min-w-0 whitespace-normal break-words">
                <input
                  type="checkbox"
                  id="agree-to-rules"
                  defaultChecked={isPrivacyConsented}
                  className="mt-0.5 w-4 h-4 rounded border-white/25 accent-crimson cursor-pointer shrink-0 col-start-1 row-span-2"
                  onChange={() => {
                    if (isIosSoundActive) playIosTap();
                  }}
                />
                <p className={`font-bold text-white/95 col-start-2 leading-tight whitespace-normal break-words ${
                  isSimulatorLayout ? 'text-[10px]' : 'text-[11.5px]'
                }`}>
                  I agree to the Terms of Service & Privacy Policy *
                </p>
                <p className={`col-start-2 leading-tight text-white/45 whitespace-normal break-words ${
                  isSimulatorLayout ? 'text-[10px]' : 'text-xs'
                }`}>
                  Mandatory to join dialect quiz ranks and consensus queues.
                </p>
              </div>

              {/* Option 2 */}
              <div className="grid grid-cols-[auto_1fr] items-start gap-2.5 cursor-pointer min-w-0 border-t border-white/5 pt-3.5 whitespace-normal break-words">
                <input
                  type="checkbox"
                  id="agree-to-telemetry"
                  className="mt-0.5 w-4 h-4 rounded border-white/25 accent-emerald-500 cursor-pointer shrink-0 col-start-1 row-span-2"
                  defaultChecked={optInTelemetry}
                  onChange={() => {
                    if (isIosSoundActive) playIosTap();
                  }}
                />
                <p className={`font-bold text-[#f2f2f2] col-start-2 leading-tight whitespace-normal break-words ${
                  isSimulatorLayout ? 'text-[10px]' : 'text-[11.5px]'
                }`}>
                  Allow Loghat to share anonymized usage trends
                </p>
                <p className={`col-start-2 leading-tight text-white/45 whitespace-normal break-words ${
                  isSimulatorLayout ? 'text-[10px]' : 'text-xs'
                }`}>
                  Optional but highly recommended to help optimize region-specific slang mappings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Consent Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => {
              const termsChecked = (document.getElementById('agree-to-rules') as HTMLInputElement)?.checked;
              const telemetryChecked = (document.getElementById('agree-to-telemetry') as HTMLInputElement)?.checked;
              
              if (!termsChecked) {
                if (isIosSoundActive) playIosError();
                alert("Consensus Needed:\nYou must explicitly check the 'I agree' checkbox before proceeding to the Loghat App.");
                return;
              }

              handleAcceptPrivacyAndConsent(!!telemetryChecked);
            }}
            className={`w-full text-center bg-crimson hover:bg-crimson/95 text-white font-sans font-black rounded-xl shadow-lg transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
              isSimulatorLayout ? 'px-3 py-2 text-[10px]' : 'px-4 py-3 text-xs'
            }`}
          >
            Agree & Proceed to Onboarding ➔
          </button>
          
          <button
            onClick={() => {
              setShowPrivacyPolicyModal(true);
              if (isIosSoundActive) playIosTap();
            }}
            className={`w-full bg-white/5 hover:bg-white/10 text-white/70 font-mono border border-white/10 rounded-xl transition uppercase font-black text-center ${
              isSimulatorLayout ? 'py-1.5 text-[9px]' : 'py-2 text-[10.5px]'
            }`}
          >
            📄 Read Detailed Legal Text
          </button>
        </div>
      </div>
    );
  };

  // Render onboarding multi-step verification sequence
  const renderMultiStepOnboarding = (isSimulatorLayout: boolean) => {
    if (showAuthTab === 'login') {
      return (
        <div className={`bg-card border border-white/10 rounded-2xl flex flex-col text-left max-w-xl mx-auto my-4 font-sans ${
          isSimulatorLayout ? 'p-3.5 gap-4 text-[10px]' : 'p-5 gap-5 text-xs'
        }`}>
          <div className="space-y-1 text-left">
            <span className="text-[8.5px] uppercase tracking-widest font-mono text-crimson font-black block">Loghat Production Account</span>
            <h4 className="text-xs sm:text-sm font-black text-white leading-snug">Sign In to Cloud Sync</h4>
            <p className="text-[9.5px] text-white/60 leading-normal">
              Enter your email and password to log in and sync your high scores across Web and iOS.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleBackendLogin(); }} className="space-y-3.5" noValidate>
            <div>
              <label className="text-[9px] text-[#888] font-mono uppercase tracking-wider block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="nama@anda.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-black border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-[9px] text-[#888] font-mono uppercase tracking-wider block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-black border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-crimson hover:bg-crimson/95 text-white font-extrabold text-xs uppercase rounded-xl transition cursor-pointer"
              >
                Sign In 🔑
              </button>
            </div>
          </form>

          {/* Third-Party Authentication Options */}
          <div className="border-t border-white/5 pt-4 space-y-2.5">
            <span className="text-[8.5px] text-white/30 uppercase font-mono tracking-widest block text-center">Or authenticate via secure provider</span>
            
            {/* iOS Mandatory: Apple Sign In */}
            <button
              onClick={() => handleBackendOAuth('apple', 'apple.user@icloud.com', 'Apple Specialist')}
              className="w-full py-2.5 bg-[#121212] hover:bg-[#1b1b1b] border border-white/10 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span></span>
              <span>Sign in with Apple (Mandatory iOS)</span>
            </button>

            {/* General Provider: Google Login */}
            <button
              onClick={() => handleBackendOAuth('google', 'google.user@gmail.com', 'Rakyat Google')}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gold font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-rose-500 font-black">G</span>
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="border-t border-white/5 pt-3 text-center">
            <button
              onClick={() => setShowAuthTab('onboarding')}
              className="text-gold hover:underline text-[10px] cursor-pointer"
            >
              Don't have an account? Start Stepper Registration Wizard 🎒
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`bg-card border border-white/10 rounded-2xl flex flex-col text-left max-w-xl mx-auto my-4 font-sans ${
        isSimulatorLayout ? 'p-3.5 gap-4 text-[10px]' : 'p-5 gap-5 text-xs'
      }`}>
        
        {/* Toggle sign in link */}
        <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2">
          <span className="text-white/40">Register profile to lock in achievements</span>
          <button
            onClick={() => setShowAuthTab('login')}
            className="text-gold font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Already registered? Log In 🔑</span>
          </button>
        </div>

        {/* Stepper Wizard Indicator */}
        <div className={`flex justify-between items-center bg-[#151821] border border-white/5 rounded-xl text-center ${
          isSimulatorLayout ? 'p-2' : 'p-3'
        }`}>
          <div className="flex items-center gap-1.5 flex-1 justify-center min-w-0">
            <span className={`rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
              isSimulatorLayout ? 'w-4.5 h-4.5' : 'w-5 h-5'
            } ${
              userProfile.emailVerified 
                ? 'bg-emerald-500 text-black' 
                : activeOnboardingStep === 'email' ? 'bg-crimson text-white ring-2 ring-crimson/30' : 'bg-[#222] text-[#666]'
            }`}>
              {userProfile.emailVerified ? '✓' : '1'}
            </span>
            <span className={`font-black truncate ${
              isSimulatorLayout ? 'text-[8.5px]' : 'text-[9.5px]'
            } ${activeOnboardingStep === 'email' ? 'text-gold' : 'text-white/40'}`}>Email</span>
          </div>

          <div className="w-4 h-[1px] bg-white/10 shrink-0" />

          <div className="flex items-center gap-1.5 flex-1 justify-center min-w-0">
            <span className={`rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
              isSimulatorLayout ? 'w-4.5 h-4.5' : 'w-5 h-5'
            } ${
              userProfile.phoneVerified 
                ? 'bg-emerald-500 text-black' 
                : activeOnboardingStep === 'phone' ? 'bg-crimson text-white ring-2 ring-crimson/30' : 'bg-[#222] text-[#666]'
            }`}>
              {userProfile.phoneVerified ? '✓' : '2'}
            </span>
            <span className={`font-black truncate ${
              isSimulatorLayout ? 'text-[8.5px]' : 'text-[9.5px]'
            } ${activeOnboardingStep === 'phone' ? 'text-gold' : 'text-white/40'}`}>Phone</span>
          </div>

          <div className="w-4 h-[1px] bg-white/10 shrink-0" />

          <div className="flex items-center gap-1.5 flex-1 justify-center min-w-0">
            <span className={`rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
              isSimulatorLayout ? 'w-4.5 h-4.5' : 'w-5 h-5'
            } ${
              userProfile.locationPermission === 'granted' 
                ? 'bg-emerald-500 text-black' 
                : activeOnboardingStep === 'location' ? 'bg-crimson text-white ring-2 ring-crimson/30' : 'bg-[#222] text-[#666]'
            }`}>
              {userProfile.locationPermission === 'granted' ? '✓' : '3'}
            </span>
            <span className={`font-black truncate ${
              isSimulatorLayout ? 'text-[8.5px]' : 'text-[9.5px]'
            } ${activeOnboardingStep === 'location' ? 'text-gold' : 'text-white/40'}`}>Maps</span>
          </div>
        </div>

        {/* STEP 1: EMAIL VERIFICATION */}
        {activeOnboardingStep === 'email' && (
          <div className="space-y-4 text-[#F5F5F5]">
            <div className="space-y-1 text-left">
              <span className="text-[8.5px] uppercase tracking-widest font-mono text-crimson font-black block">Level 1: Secure Email Verification</span>
              <h4 className="text-xs sm:text-sm font-black text-white leading-snug">Secure User Profile Registration</h4>
              <p className="text-[9.5px] text-white/60 text-left leading-normal">
                Please enter your email to verify and register your account. We will send a secure one-time passcode directly to your inbox.
              </p>
            </div>

            <div className="space-y-3.5">
              <form onSubmit={handleSendEmailCode} noValidate>
                <label className="text-[9px] text-[#888] font-mono uppercase tracking-wider block mb-1">Email Coordinates *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="nama@anda.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={isEmailCodeSent && userProfile.emailVerified}
                    className="flex-1 bg-black border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-crimson"
                  />
                  <button
                    type="button"
                    onClick={handleSendEmailCode}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gold text-2xs font-extrabold uppercase rounded-xl transition cursor-pointer"
                  >
                    {isEmailCodeSent ? 'Re-send' : 'Send Code'}
                  </button>
                </div>
              </form>

              {isEmailCodeSent && (
                <form onSubmit={handleVerifyEmailCode} className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-3 animate-slideDown text-left" noValidate>
                  <div className="space-y-1">
                    <label className="text-[9.5px] text-[#aaa] font-bold block">Choose Password (min 6 chars) *</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={onboardingPassword}
                      onChange={(e) => setOnboardingPassword(e.target.value)}
                      className="w-full bg-black border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  
                  <label className="text-[9.5px] text-[#aaa] font-bold block">Enter the passcode sent to your email:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Passcode (e.g. 123456)"
                      value={emailOtpInput}
                      onChange={(e) => setEmailOtpInput(e.target.value)}
                      className="flex-1 bg-black border border-white/15 rounded-xl px-3 py-2 text-xs tracking-widest text-center text-white focus:outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyEmailCode}
                      className="px-4 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-black uppercase rounded-xl transition cursor-pointer"
                    >
                      Verify
                    </button>
                  </div>
                  {emailPreviewUrl && (
                    <a 
                      href={emailPreviewUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[10px] text-cyan-400 underline block mt-2 text-center font-bold"
                    >
                      🔗 Ethereal Sandbox: Click to View Mock Email Inbox ✉️
                    </a>
                  )}
                </form>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: PHONE VERIFICATION */}
        {activeOnboardingStep === 'phone' && (
          <div className="space-y-4 text-[#F5F5F5]">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest font-mono text-crimson font-black block">Level 2: SMS Authentication</span>
              <h4 className="text-sm font-black text-white leading-snug">Verified Mobile Dialect Registry</h4>
              <p className="text-[10px] text-white/60 leading-normal text-left">
                Provide your mobile phone number to log your home registration. We will verify your profile via SMS One-Time Passcode (OTP).
              </p>
            </div>

            <div className="space-y-3.5">
              <form onSubmit={handleSendPhoneCode} noValidate>
                <label className="text-[9px] text-[#888] font-mono uppercase tracking-wider block mb-1">Mobile Contact *</label>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-black border border-white/15 rounded-xl px-2 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+1">🇺🇸 +1</option>
                  </select>
                  <input
                    type="text"
                    placeholder="123456789"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="flex-1 bg-black border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-crimson"
                  />
                  <button
                    type="button"
                    onClick={handleSendPhoneCode}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gold text-2xs font-extrabold uppercase rounded-xl transition cursor-pointer"
                  >
                    {isPhoneCodeSent ? 'Re-send' : 'Verify via SMS'}
                  </button>
                </div>
              </form>

              {isPhoneCodeSent && (
                <form onSubmit={handleVerifyPhoneCode} className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-3 animate-slideDown text-left" noValidate>
                  <label className="text-[9.5px] text-[#aaa] font-bold block">We dispatched our mock SMS OTP passcodes. Please key in OTP:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="SMS OTP (8153)"
                      value={phoneOtpInput}
                      onChange={(e) => setPhoneOtpInput(e.target.value)}
                      className="flex-1 bg-black border border-white/15 rounded-xl px-3 py-2 text-xs tracking-widest text-center text-white focus:outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyPhoneCode}
                      className="px-4 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-black uppercase rounded-xl transition cursor-pointer"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION PERMISSIONS */}
        {activeOnboardingStep === 'location' && (
          <div className="space-y-4 text-[#F5F5F5]">
            <div className="space-y-1 text-left">
              <span className="text-[9px] uppercase tracking-widest font-mono text-crimson font-black block">Level 3: Location Authorization</span>
              <h4 className="text-sm font-black text-white leading-snug">Precise Coordinate Grid Target</h4>
              <p className="text-[10px] text-white/60 leading-normal text-left">
                Loghat triggers standard browser mapping coordinates to determine which home state vocabulary to pre-cache first, and load respective upvote consensus metrics.
              </p>
            </div>

            {userProfile.locationPermission === 'denied' ? (
              <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-3 text-left">
                <span className="text-[10px] uppercase font-mono font-bold text-rose-450 block">📍 Geolocation Permission Blocked</span>
                <p className="text-[9.5px] text-white/70 leading-normal">
                  Loghat requires approximate location to provide regional dialect features. Since permission was denied, you can either enable location manually in your Control Center's <b>Data Preferences</b> panel, or use the Settings override trigger below to resolve the gate!
                </p>
                
                <div className="pt-1 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      updateProfile({ locationPermission: 'granted' });
                      triggerToast('📍 Precise Location Authorized! Sandbox gate passed.', 'success');
                    }}
                    className="w-full text-center py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-[10px] font-black uppercase rounded-lg transition"
                  >
                    Enable Location Manually (App Settings Override) ⚙️
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowMockLocationPrompt(true);
                    if (isIosSoundActive) playIosChime();
                  }}
                  className="w-full text-center py-3 bg-crimson hover:bg-crimson/95 text-white text-xs font-black rounded-xl shadow transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Authorize Precise Coordinates 📍
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mock Location iOS dialog */}
        {showMockLocationPrompt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <div className="bg-[#1f1f1f] w-full max-w-[280px] rounded-2xl overflow-hidden shadow-2xl p-4.5 text-[#F5F5F5] text-center space-y-4">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-xl text-blue-400">📍</div>
                <h3 className="font-extrabold text-sm font-sans text-center">Allow "Loghat" to access your location?</h3>
                <p className="text-[10px] text-white/50 leading-normal text-center">
                  Your coordinates are processed on server routes to resolve regional slangs, and display trending local upvote activities.
                </p>
              </div>

              <div className="flex flex-col gap-1 text-[11px] font-bold border-t border-white/10 pt-3">
                <button
                  onClick={() => {
                    setShowMockLocationPrompt(false);
                    updateProfile({ locationPermission: 'granted' });
                    triggerToast('📍 Location Authorized! Locked to Kuala Lumpur grid grids.', 'success');
                  }}
                  className="w-full text-center py-2.5 text-blue-400 font-black cursor-pointer"
                >
                  Allow while Using App
                </button>
                <div className="h-[1px] bg-white/5" />
                <button
                  onClick={() => {
                    setShowMockLocationPrompt(false);
                    updateProfile({ locationPermission: 'denied' });
                    triggerToast('✕ Location permission rejected locally.', 'info');
                  }}
                  className="w-full text-center py-2 text-rose-400 font-bold cursor-pointer"
                >
                  Don't Allow
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  // Unified gatekeeper router for game screen
  const renderGameTabContent = (isSimulatorLayout: boolean) => {
    const isProfileVerified = userProfile.emailVerified && userProfile.phoneVerified && userProfile.locationPermission === 'granted';

    // If profile is NOT verified AND they have completed the 1st quiz (or are forced into onboarding), show onboarding wizard.
    if (!isProfileVerified && (firstQuizCompleted || forcedOnboarding)) {
      return (
        <div className="space-y-4">
          {/* Show privacy consent at the top of onboarding if not yet accepted */}
          {!isPrivacyConsented && renderPrivacyConsentScreen(isSimulatorLayout)}

          {isPrivacyConsented && (
            <>
              <div className="bg-[#12141c]/90 border border-crimson/30 rounded-xl p-3.5 text-center text-xs space-y-1">
                <span className="text-crimson font-black uppercase tracking-wider text-[10px] block">🔒 Verification Required</span>
                <p className="text-white/70">
                  {appLanguage === 'bm' 
                    ? 'Sila lengkapkan pengesahan profil untuk menyimpan markah anda dan membuka lebih banyak kuiz!'
                    : 'Please complete your profile verification to save your score and unlock more quizzes!'}
                </p>
              </div>
              {renderMultiStepOnboarding(isSimulatorLayout)}
            </>
          )}
        </div>
      );
    }

    // User is verified OR they are playing their first free quiz — NO gates, NO banners!
    return (
      <div className="space-y-4 text-left">
        {/* Play-screen Specific Top Ad Banner Placeholder */}
        {!userProfile.isPremiumUser && renderTopAdmobBanner()}

        <DialectIQGame 
          ads={ads} 
          isSimulatorLayout={isSimulatorLayout} 
          appLanguage={appLanguage}
          premiumTier={userProfile.premiumTier}
          onOpenSubscriptionModal={() => setShowSubscriptionModal(true)}
          onChallengeFriend={(score, state) => {
            changeTab('social');
            if (isIosSoundActive) playIosTap();
          }}
          onQuizComplete={(score) => {
            if (!isProfileVerified) {
              // Mark the 1st quiz as completed!
              localStorage.setItem('loghat_first_quiz_completed', 'true');
              setFirstQuizCompleted(true);
              setJustFinishedFirstQuizScore(score);
              setShowFirstQuizCompleteModal(true);
              if (isIosSoundActive) playIosChime();
            }
          }}
        />
      </div>
    );
  };

  const renderFirstQuizCompleteModal = () => {
    if (!showFirstQuizCompleteModal) return null;
    const score = justFinishedFirstQuizScore ?? 0;
    
    // Calculate Rank
    let rankTitle = 'Tourist';
    let rankBadge = '🎒';
    if (score >= 76) {
      rankTitle = 'Legend Kampung';
      rankBadge = '👑';
    } else if (score >= 51) {
      rankTitle = 'Anak Jati';
      rankBadge = '🏡';
    } else if (score >= 26) {
      rankTitle = 'Budak City';
      rankBadge = '🏙️';
    }

    const shareText = appLanguage === 'bm'
      ? `Saya baru mendapat markah ${score}% dalam Kuiz Dialek Malaysia Loghat! Pangkat saya ialah [${rankTitle}] ${rankBadge}. Boleh tak anda kalahkan saya? Jom main!`
      : appLanguage === 'manglish'
      ? `I just scored ${score}% on Loghat Malaysian Dialect Quiz! I get [${rankTitle}] rank ${rankBadge}. Can beat me or not? Play here boss!`
      : `I just scored ${score}% on the Loghat Malaysian Dialect Quiz! I am ranked as a [${rankTitle}] ${rankBadge}. Can you beat me? Play the challenge here!`;

    const handleWhatsAppShare = () => {
      const text = encodeURIComponent(shareText);
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      triggerToast('Shared to WhatsApp! 📢', 'success');
    };

    const handleCopyText = () => {
      navigator.clipboard.writeText(shareText);
      triggerToast('Achievement copied to clipboard! 📋', 'success');
    };

    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[120] flex items-center justify-center p-4 text-[#F5F5F5] animate-fadeIn text-left">
        <div className="bg-[#11141d] border border-gold/30 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-6 text-center space-y-5 relative">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/15 to-transparent rounded-full pointer-events-none" />
          
          {/* Header */}
          <div className="space-y-1.5">
            <span className="text-4xl animate-bounce block">🏆</span>
            <h3 className="text-lg font-black text-gold uppercase tracking-wider font-mono">
              {appLanguage === 'bm' ? 'Kuiz Pertama Selesai!' : '1st Quiz Completed!'}
            </h3>
            <p className="text-2xs text-white/50">
              {appLanguage === 'bm' ? 'Pencapaian anda sedia untuk disimpan' : 'Your dialect skills are registered!'}
            </p>
          </div>

          {/* Score card */}
          <div className="bg-[#191d29] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/40 font-mono uppercase tracking-wider">Score</span>
              <span className="text-white/40 font-mono uppercase tracking-wider">Rank</span>
            </div>
            <div className="flex justify-between items-center text-left">
              <span className="text-2xl font-black text-[#F5F5F5] font-mono">{score}%</span>
              <span className="text-xs bg-gold/10 text-gold px-2.5 py-1 rounded-full font-mono font-black border border-gold/25">
                {rankBadge} {rankTitle}
              </span>
            </div>
          </div>

          {/* Share Section */}
          <div className="space-y-2.5">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono font-bold">
              📢 {appLanguage === 'bm' ? 'Kongsi Pencapaian Anda' : 'Share Your Achievement'}
            </p>
            <div className="grid grid-cols-2 gap-3.5">
              <button
                onClick={handleWhatsAppShare}
                className="bg-[#25D366] hover:bg-[#20ba56] text-black text-2xs font-extrabold py-2.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyText}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-2xs font-bold py-2.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Copy Link</span>
              </button>
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-4 border-t border-white/5 space-y-2.5">
            <button
              onClick={() => {
                setShowFirstQuizCompleteModal(false);
                setForcedOnboarding(true);
              }}
              className="w-full py-3 bg-gradient-to-r from-gold via-crimson to-crimson hover:opacity-95 text-white font-extrabold rounded-xl text-xs tracking-wider uppercase shadow-lg transition active:scale-95 cursor-pointer"
            >
              🔐 {appLanguage === 'bm' ? 'Daftar & Simpan Markah' : 'Verify & Lock in Score'}
            </button>
            <button
              onClick={() => {
                setShowFirstQuizCompleteModal(false);
              }}
              className="w-full py-2 bg-interior hover:bg-card text-white/50 hover:text-white rounded-lg text-2xs transition cursor-pointer"
            >
              {appLanguage === 'bm' ? 'Lihat Keputusan Dahulu' : 'View Results First'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSubscriptionModal = () => {
    if (!showSubscriptionModal) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 text-[#F5F5F5]">
        <div className="bg-[#11141d] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-[#F5F5F5]">
          {/* Header */}
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/25">
            <div className="flex items-center gap-2">
              <span className="text-xl">👑</span>
              <div className="text-left">
                <h3 className="text-base font-black text-gold uppercase tracking-wider font-mono">Select subscription plan</h3>
                <p className="text-[10px] text-white/50">Preserve Malaysian Loghats & get exclusive privileges</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowSubscriptionModal(false);
                if (isIosSoundActive) playIosTap();
              }}
              className="text-white/40 hover:text-white text-xs font-bold font-mono bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 transition cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          {/* Plan Options Grid */}
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* PLAN 1: STANDARD FREE */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between gap-4 transition bg-[#12141c]/50 ${userProfile.premiumTier === 'none' ? 'border-white/20 ring-1 ring-white/10' : 'border-white/5 opacity-85'}`}>
                <div className="text-left space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-mono font-bold text-white/40">Basic Tier</span>
                    {userProfile.premiumTier === 'none' && <span className="bg-white/10 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Active</span>}
                  </div>
                  <h4 className="font-extrabold text-sm text-white">Standard Free</h4>
                  <div className="text-lg font-black text-white/90">RM0.00 <span className="text-[9px] font-normal text-white/45">/ forever</span></div>
                  <ul className="text-[10px] text-white/50 space-y-1.5 list-disc pl-4 leading-normal">
                    <li>Ad-supported layout</li>
                    <li>Limit: 3 quizzes daily</li>
                    <li>Basic community access</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    selectPremiumTier('none');
                    if (isIosSoundActive) playIosTap();
                  }}
                  disabled={userProfile.premiumTier === 'none'}
                  className={`w-full py-1.5 rounded text-[10px] font-black uppercase transition cursor-pointer ${
                    userProfile.premiumTier === 'none' 
                      ? 'bg-white/5 text-white/30 border border-white/5 cursor-default' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  {userProfile.premiumTier === 'none' ? 'Current Plan' : 'Select Free'}
                </button>
              </div>

              {/* PLAN 2: LIFETIME AD-FREE */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between gap-4 transition bg-[#12141c]/70 ${userProfile.premiumTier === 'adfree' ? 'border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'border-white/5'}`}>
                <div className="text-left space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-mono font-bold text-emerald-450">Lifetime</span>
                    {userProfile.premiumTier === 'adfree' && <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/20">Active</span>}
                  </div>
                  <h4 className="font-extrabold text-sm text-[#F5F5F5] flex items-center gap-1">Ad-Free 🚫</h4>
                  <div className="text-lg font-black text-emerald-405">RM4.90 <span className="text-[9px] font-normal text-white/45">/ lifetime</span></div>
                  <ul className="text-[10px] text-white/60 space-y-1.5 list-disc pl-4 leading-normal">
                    <li>🚫 <b>Zero ads</b> across all tabs</li>
                    <li>No AdMob banner placeholders</li>
                    <li>Limit: 50 quizzes daily</li>
                    <li>Help keep servers online!</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    selectPremiumTier('adfree');
                    if (isIosSoundActive) playIosTap();
                  }}
                  disabled={userProfile.premiumTier === 'adfree'}
                  className={`w-full py-1.5 rounded text-[10px] font-black uppercase transition cursor-pointer ${
                    userProfile.premiumTier === 'adfree' 
                      ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 cursor-default' 
                      : 'bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold shadow shadow-emerald-950/25'
                  }`}
                >
                  {userProfile.premiumTier === 'adfree' ? 'Current Plan' : 'Buy RM4.90'}
                </button>
              </div>

              {/* PLAN 3: ULTRA PREMIUM (GOLD GLOW) */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between gap-4 transition bg-gradient-to-b from-[#1c160b] to-[#12141c] relative overflow-hidden ${userProfile.premiumTier === 'ultra' ? 'border-gold ring-1 ring-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]' : 'border-gold/20 hover:border-gold/45'}`}>
                {/* Popular Pill */}
                <div className="absolute top-0 right-0 bg-gold text-black text-[7px] font-extrabold px-3 py-1 rounded-bl-lg uppercase tracking-widest font-mono">Best Value</div>
                <div className="text-left space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-mono font-bold text-gold">Elite Tier</span>
                    {userProfile.premiumTier === 'ultra' && <span className="bg-gold/20 text-gold text-[8px] font-bold px-1.5 py-0.5 rounded border border-gold/20">Active</span>}
                  </div>
                  <h4 className="font-extrabold text-sm text-gold flex items-center gap-1">Ultra Premium 👑</h4>
                  <div className="text-lg font-black text-gold">RM9.90 <span className="text-[9px] font-normal text-white/45">/ lifetime</span></div>
                  <ul className="text-[10px] text-[#F5F5F5]/80 space-y-1.5 list-disc pl-4 leading-normal">
                    <li>🚫 <b>Zero ads</b> across all pages</li>
                    <li>♾️ <b>Unlimited Quizzes</b> (no daily limit)</li>
                    <li>👑 Exclusive <b>Loghat Legend</b> Badge</li>
                    <li>✨ Custom <b>Golden Glow Name Tag</b> in Social Feed</li>
                    <li>🎨 Special <b>"Golden Horizon"</b> Wallpaper</li>
                    <li>⚖️ <b>Double-weight voting power</b> in crowdsource audits!</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    selectPremiumTier('ultra');
                    if (isIosSoundActive) playIosTap();
                  }}
                  disabled={userProfile.premiumTier === 'ultra'}
                  className={`w-full py-1.5 rounded text-[10px] font-black uppercase transition cursor-pointer ${
                    userProfile.premiumTier === 'ultra' 
                      ? 'bg-gold/10 text-gold border border-gold/20 cursor-default' 
                      : 'bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-black font-extrabold shadow shadow-gold/25'
                  }`}
                >
                  {userProfile.premiumTier === 'ultra' ? 'Current Plan' : 'Buy RM9.90'}
                </button>
              </div>

            </div>

            {/* Payment Notice */}
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-2xs text-white/60 leading-normal text-left">
              💡 <b>Secure Payment:</b> Subscription payments are processed securely via Stripe. Your purchase will unlock premium features instantly.
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render modal center for preferences and complete text
  const renderGlobalPrivacyModal = () => {
    if (!showPrivacyPolicyModal) return null;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 text-[#F5F5F5]">
        <div className="bg-[#11141d] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden overflow-x-hidden shadow-2xl flex flex-col max-h-[85vh] text-[#F5F5F5] whitespace-normal break-words text-[9px] md:text-[10px] tracking-tight">
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-white/10 flex justify-between items-center bg-[#151926]">
            <div className="flex items-center gap-2 text-gold min-w-0 flex-1 mr-2">
              <Settings className="w-4 h-4 animate-spin text-crimson shrink-0" />
              <h3 className="font-black text-[9px] md:text-[10px] tracking-tight uppercase tracking-tight font-mono truncate leading-tight">Security & Compliance Consent Center</h3>
            </div>
            <button
              onClick={() => {
                setShowPrivacyPolicyModal(false);
                if (isIosSoundActive) playIosTap();
              }}
              className="text-white/50 hover:text-white text-base font-bold p-1 cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left text-[9px] md:text-[10px] tracking-tight">
            
            {/* Quick Interactive Preferences Panel */}
            <div className="bg-white/5 border border-white/15 p-4 rounded-xl space-y-4">
              <h4 className="text-[9px] md:text-[10px] tracking-tight font-mono uppercase tracking-widest text-gold font-bold">Interactive GDPR/CCPA Preferences</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {/* Telemetry trigger */}
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col justify-between gap-2.5">
                  <div className="space-y-1">
                    <span className="font-bold text-white/95 text-[9px] md:text-[10px] tracking-tight block text-left leading-tight">Anonymized Insights sharing</span>
                    <p className="whitespace-normal break-words text-[9px] md:text-[10px] tracking-tight text-white/50 leading-normal text-left">Allow Loghat to analyze regional search trends and preserve Southeast Asian slangs.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newVal = !optInTelemetry;
                      setOptInTelemetry(newVal);
                      localStorage.setItem('loghat_opt_in_telemetry', newVal ? 'true' : 'false');
                      triggerToast(newVal ? '📊 Shared analytics opted IN.' : '🔒 GDPR Opt-Out: Telemetry deactivated.', 'info');
                    }}
                    className={`w-full py-1.5 rounded text-[9px] md:text-[10px] tracking-tight font-black border transition ${
                      optInTelemetry ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-white/45 border-white/10'
                    }`}
                  >
                    {optInTelemetry ? 'OPT-IN ACTIVE (ON) 🟢' : 'OPT-OUT MUTED (OFF) ✕'}
                  </button>
                </div>

                {/* Location Manual Override */}
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col justify-between gap-2.5">
                  <div className="space-y-1">
                    <span className="font-bold text-white/95 text-[9px] md:text-[10px] tracking-tight block text-left">Precise Location permission</span>
                    <p className="whitespace-normal break-words text-[9px] md:text-[10px] tracking-tight text-white/50 leading-normal text-left">Used to automatically identify your home state origin and map hotspot trends.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newStatus = userProfile.locationPermission === 'granted' ? 'denied' : 'granted';
                      updateProfile({ locationPermission: newStatus });
                      triggerToast(newStatus === 'granted' ? '📍 Location permission granted!' : '✕ Location permission revoked.', 'info');
                    }}
                    className={`w-full py-1.5 rounded text-[9px] md:text-[10px] tracking-tight font-black border transition ${
                      userProfile.locationPermission === 'granted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-450 border-rose-500/30'
                    }`}
                  >
                    {userProfile.locationPermission === 'granted' ? 'STATUS: GRANTED 📍' : 'STATUS: REVOKED ✕'}
                  </button>
                </div>

                {/* Premium Switch */}
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col justify-between gap-2 border-gold/20 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1 text-left">
                      <span className="font-bold text-white/95 text-[9px] md:text-[10px] tracking-tight block flex items-center gap-1">
                        👑 Plan: {userProfile.premiumTier === 'ultra' ? 'Ultra Premium (RM9.90)' : userProfile.premiumTier === 'adfree' ? 'Ad-Free Lifetime (RM4.90)' : 'Standard Free'}
                      </span>
                      <p className="whitespace-normal break-words text-[9px] md:text-[10px] tracking-tight text-white/50 text-left leading-normal">
                        {userProfile.premiumTier === 'ultra' 
                          ? 'Ads hidden + Unlimited Quizzes + Golden feed glow + Exclusive Badges active!' 
                          : userProfile.premiumTier === 'adfree' 
                          ? 'All standard AdMob top and bottom banners hidden for life.' 
                          : 'Ad-supported. Upgrade to remove advertisements or get unlimited quizzes and badges.'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowSubscriptionModal(true);
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-black rounded text-[9px] md:text-[10px] tracking-tight font-black transition cursor-pointer shrink-0"
                    >
                      Manage Plan ➔
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Privacy Policy Section */}
            <div className="space-y-3.5 text-left">
              <h4 className="text-[9px] md:text-[10px] tracking-tight font-mono uppercase tracking-widest text-[#999] font-bold">Privacy Policy Agreements</h4>
              
              <div className="bg-black p-4 rounded-xl border border-white/5 max-h-48 overflow-y-auto space-y-3 text-white/70 font-sans whitespace-pre-wrap select-text leading-normal text-[9px] md:text-[10px] tracking-tight">
{`LOGHAT DIALECT REGISTRY PRIVACY POLICY
Last Updated: June 2026

1. DATA COLLECTION & MONETIZATION DISCLOSURE
The Loghat Project collects anonymized language interests, dialect search terms, usage intervals, and general coordinate sectors. This statistics profile is analyzed globally to customize localized slangs databases and keep ethnic dialects preservation accessible.

2. MONETIZATION AND THIRD-PARTY ADVERTISING
To ensure access remains 100% free and open, this sandbox integrates Google AdMob SDK structures. AdMob may utilize anonymous identifier tokens to serve standard or personalized viewport banner ads matching CCPA-GDPR standards.

3. GEOLOCATION DETAILS AND PERSISTENCE
With active coordinates approval, Loghat matches your coordinates sector. This allows the local map triggers to dynamically pre-load Kedah, Sarawakian, or Kelantanese profiles. Location telemetry is logged using anonymized mask hashing.

4. USER RIGHTS & GENERAL OPT-OUT STATUTE
Under standard GDPR Article 7 and CCPA sections, you hold total sovereignty:
- Disable anonymous insights tracking immediately in Settings -> Consent Panel at any turn.
- Revoke coordinates permission locally in virtual Settings overrides.
- Terminate custom profile inputs instantly. Thanks for supporting Malaysian cultural conservation.`}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex justify-end gap-2 shrink-0">
            <button
              onClick={() => {
                setShowPrivacyPolicyModal(false);
                if (isIosSoundActive) playIosTap();
              }}
              className="px-5 py-2 bg-crimson hover:bg-crimson/95 text-white font-black text-xs rounded-xl transition cursor-pointer font-sans"
            >
              Done & Save Toggles ➔
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderLanguageToggleWidget = (size: 'sm' | 'md' = 'sm') => {
    const isSm = size === 'sm';
    return (
      <div className={`flex gap-0.5 bg-[#121212]/80 backdrop-blur-md p-0.5 rounded-lg border border-white/10 shrink-0 select-none ${isSm ? '' : 'p-1 rounded-xl'}`}>
        {(['en', 'bm', 'manglish'] as const).map((lang) => {
          const isActive = appLanguage === lang;
          return (
            <button
              key={lang}
              type="button"
              onClick={() => changeLanguage(lang)}
              className={`font-bold rounded transition-all cursor-pointer uppercase ${
                isSm 
                  ? 'px-1.5 py-0.5 text-[8px]' 
                  : 'px-3 py-1.5 text-[11px] rounded-lg'
              } ${
                isActive
                  ? 'bg-gold text-black font-extrabold shadow'
                  : 'text-white/45 hover:text-white'
              }`}
            >
              {lang === 'manglish' ? 'MG' : lang}
            </button>
          );
        })}
      </div>
    );
  };



  const renderPushNotificationBanner = () => {
    if (!isPushBannerVisible) return null;
    return (
      <div 
        className="fixed left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-card/95 border border-gold/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-2xl p-3.5 flex items-start gap-3 z-[1000] animate-slideDown select-none cursor-pointer"
        style={{ top: 'calc(1rem + env(safe-area-inset-top))' }}
        onClick={() => {
          setIsPushBannerVisible(false);
          if (pushNotification.title.includes('Referral') || pushNotification.title.includes('Ganjaran')) {
            setActiveTab('settings');
          } else if (pushNotification.title.includes('Cabaran') || pushNotification.title.includes('Kumpulan')) {
            setActiveTab('game');
          }
        }}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold via-crimson to-crimson p-[1px] shrink-0 overflow-hidden">
          <img src="/logo.png" alt="Loghat Logo" className="w-full h-full object-cover rounded-[7px]" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <h4 className="text-xs font-black text-gold tracking-tight">{pushNotification.title}</h4>
          <p className="text-[11px] text-white/85 leading-snug mt-0.5 break-words whitespace-normal font-sans font-medium">{pushNotification.body}</p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsPushBannerVisible(false);
          }}
          className="text-white/40 hover:text-white text-xs shrink-0 self-start p-1"
        >
          ✕
        </button>
      </div>
    );
  };

  const renderWrappedModal = () => {
    if (!showWrappedModal || !wrappedStats) return null;
    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[1000] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none">
        <div className="relative w-full max-w-sm bg-[#090b10] border border-gold/25 rounded-3xl p-6 flex flex-col gap-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] text-center">
          
          <div className="relative w-full aspect-[9/16] bg-gradient-to-b from-[#111624] via-[#090b10] to-[#040609] border border-gold/20 rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-inner select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-gold/5 via-crimson/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-4 right-4 w-32 h-32 opacity-[0.03] pointer-events-none text-gold">
              <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
                <path d="M50,15 C45,35 25,45 50,55 C75,45 55,35 50,15 Z" />
              </svg>
            </div>

            <div className="flex justify-between items-center z-10 border-b border-white/5 pb-3">
              <div className="flex items-center gap-1.5 flex-row">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-crimson p-[1px] overflow-hidden">
                  <img src="/logo.png" alt="Loghat Logo" className="w-full h-full object-cover rounded-[7px]" />
                </div>
                <h1 className="text-sm font-black text-white italic tracking-tight">LOGHAT 🇲🇾</h1>
              </div>
              <span className="text-[7.5px] uppercase font-mono font-black text-gold border border-gold/30 px-2 py-0.5 rounded bg-gold/5 tracking-wider">Wrapped 2026</span>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-6 z-10 py-4">
              <div className="space-y-1">
                <p className="text-[8px] uppercase tracking-widest font-mono text-[#E31C25] font-black">{t('wrappedSubtitle', appLanguage)}</p>
                <h2 className="text-xl font-black text-[#F5F5F5] font-serif tracking-tight">{wrappedStats.displayName}</h2>
                <div className="inline-block px-3 py-1 bg-gold/15 border border-gold/30 text-gold rounded-full text-[9px] font-mono font-black uppercase tracking-wider mt-1.5">
                  🏆 {wrappedStats.rank === 'Legend Kampung' ? (appLanguage === 'bm' ? 'Lagenda Kampung' : 'Kampung Legend') : 
                      wrappedStats.rank === 'Anak Jati' ? (appLanguage === 'bm' ? 'Anak Jati' : 'Local Expert') : 
                      (appLanguage === 'bm' ? 'Pelancong' : 'Tourist')}
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-2.5">
                <div className="bg-[#121622]/60 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-lg font-black text-[#F5F5F5] font-mono">{wrappedStats.quizzesCompleted}</span>
                  <span className="text-[7.5px] uppercase tracking-wider text-white/40 mt-1 font-bold">{appLanguage === 'bm' ? 'Kuiz Selesai' : 'Quizzes Played'}</span>
                </div>
                <div className="bg-[#121622]/60 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-lg font-black text-[#F5F5F5] font-mono">{wrappedStats.highestScore}%</span>
                  <span className="text-[7.5px] uppercase tracking-wider text-white/40 mt-1 font-bold">{appLanguage === 'bm' ? 'Markah Tertinggi' : 'Highest Score'}</span>
                </div>
                <div className="bg-[#121622]/60 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-lg font-black text-[#F5F5F5] font-mono">{wrappedStats.badgesCount}</span>
                  <span className="text-[7.5px] uppercase tracking-wider text-white/40 mt-1 font-bold">{appLanguage === 'bm' ? 'Lencana Dibuka' : 'Badges Unlocked'}</span>
                </div>
                <div className="bg-[#121622]/60 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-lg font-black text-[#F5F5F5] font-mono truncate max-w-full">{wrappedStats.topState}</span>
                  <span className="text-[7.5px] uppercase tracking-wider text-white/40 mt-1 font-bold">{appLanguage === 'bm' ? 'Negeri Asal' : 'Top Territory'}</span>
                </div>
              </div>

              <p className="text-[9px] text-white/60 leading-normal max-w-[220px] font-sans">
                {appLanguage === 'bm' 
                  ? 'Saya komited memelihara dialek unik Malaysia dari Kedah ke Sabah bersama Loghat App! 📚🇲🇾' 
                  : 'I am actively preserving Malaysia\'s rich regional slangs and dialects with the Loghat App! 📚🇲🇾'}
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-white/5 pt-3 z-10 text-left flex-row">
              <div>
                <p className="text-[9px] font-bold text-white">{appLanguage === 'bm' ? 'Pelihara Warisan Kita' : 'Preserve Our Heritage'}</p>
                <p className="text-[7.5px] font-mono text-white/30 uppercase mt-0.5 tracking-wider">Download Loghat App</p>
              </div>
              
              <div className="w-9 h-9 bg-white p-0.5 rounded flex items-center justify-center shrink-0 shadow">
                <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="1" y="1" width="6" height="6" />
                  <rect x="2" y="2" width="4" height="4" fill="white" />
                  <rect x="1" y="17" width="6" height="6" />
                  <rect x="2" y="18" width="4" height="4" fill="white" />
                  <rect x="17" y="1" width="6" height="6" />
                  <rect x="2" y="18" width="4" height="4" fill="white" />
                  <rect x="9" y="3" width="2" height="2" />
                  <rect x="13" y="1" width="2" height="3" />
                  <rect x="9" y="8" width="3" height="2" />
                  <rect x="14" y="6" width="2" height="4" />
                  <rect x="3" y="10" width="4" height="2" />
                  <rect x="1" y="14" width="2" height="1" />
                  <rect x="9" y="13" width="2" height="3" />
                  <rect x="13" y="17" width="4" height="2" />
                  <rect x="9" y="21" width="3" height="2" />
                  <rect x="18" y="10" width="3" height="3" />
                  <rect x="21" y="15" width="2" height="4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('loghat_push_notification', {
                  detail: {
                    title: '📸 Image Saved!',
                    body: appLanguage === 'bm' ? 'Pratonton grafik Wrapped telah disimpan ke peranti anda!' : 'Wrapped story graphic has been saved to your device!'
                  }
                }));
              }}
              className="py-2.5 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-700 text-black font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-black animate-bounce" />
              {appLanguage === 'bm' ? 'Kongsi ke Instagram Stories' : 'Share to Instagram Stories'}
            </button>

            <button
              onClick={() => {
                const statsString = encodeURIComponent(JSON.stringify(wrappedStats));
                const deepLink = `${window.location.origin}${window.location.pathname}#wrapped/${statsString}`;
                navigator.clipboard.writeText(deepLink);
                triggerToast(appLanguage === 'bm' ? 'Pautan Wrapped disalin ke papan klip!' : 'Wrapped profile link copied to clipboard!');
              }}
              className="py-2 bg-interior hover:bg-[#1a2334] text-gold border border-white/10 hover:border-gold/30 font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 cursor-pointer shadow"
            >
              {appLanguage === 'bm' ? 'Salin Pautan Profil' : 'Copy Profile Link'}
            </button>

            <button
              onClick={() => {
                setShowWrappedModal(false);
                setWrappedStats(null);
              }}
              className="py-2 text-white/50 hover:text-white text-xs transition uppercase font-bold tracking-wider mt-1"
            >
              {appLanguage === 'bm' ? 'Tutup' : 'Close'}
            </button>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0d1015] text-[#F5F5F5] flex flex-col font-sans selection:bg-gold selection:text-black">
      
      {/* Dynamic Announcement toast for Web fallback or general alert */}
      {toastMessage && (
        <div className="fixed left-1/2 transform -translate-x-1/2 z-50 animate-bounce" style={{ top: 'calc(1.25rem + env(safe-area-inset-top))' }}>
          <div className={`px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border text-xs md:text-sm font-bold ${
            toastType === 'success' 
              ? 'bg-emerald-950 border-emerald-500 text-emerald-300' 
              : 'bg-indigo-950 border-indigo-500 text-indigo-300'
          }`}>
            <CheckCircle className="w-5 h-5 shrink-0" />
            {toastMessage}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CASE A: MOBILE LAYOUT WITH FIXED BOTTOM NAVIGATION            */}
      {/* ------------------------------------------------------------- */}
      <div className="flex md:hidden flex-col min-h-screen text-[#F5F5F5] select-none text-left relative bg-[#06080c] pb-[64px]">
        {/* Slimmed iOS App Header */}
        <header className="px-4 pb-2.5 border-b border-white/5 bg-card/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between shrink-0" style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-gold to-crimson p-[1px] overflow-hidden">
              <img src="/logo.png" alt="Loghat Logo" className="w-full h-full object-cover rounded-[5px]" />
            </div>
            <h1 className="text-xs font-brand tracking-wide text-white">
              LOGHAT <span className="text-[6px] bg-gold text-black px-1.5 py-[1px] rounded-full font-mono font-black tracking-normal uppercase">NATIVE</span>
            </h1>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {renderLanguageToggleWidget('sm')}
            <span className="text-[7px] uppercase tracking-wider font-mono font-bold bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white/40">
              {t(activeTab === 'survival' || activeTab === 'moderation' || activeTab === 'settings' ? 'more' : activeTab as any, appLanguage).toUpperCase()}
            </span>
          </div>
        </header>

        {/* Scrollable Main Content Port */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin">
          
          {/* Nested Sub-navigation for settings/survival/moderation under the "More" button in mobile */}
          {(activeTab === 'settings' || activeTab === 'survival' || activeTab === 'moderation') && (
            <div className="flex gap-1 p-1 bg-[#121212] border border-white/5 rounded-xl mb-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  changeTab('settings');
                }}
                className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-crimson text-white shadow font-extrabold'
                    : 'text-white/45 hover:text-white'
                }`}
              >
                {appLanguage === 'bm' ? '👤 Profil' : '👤 Profile'}
              </button>
              <button
                type="button"
                onClick={() => {
                  changeTab('survival');
                }}
                className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'survival'
                    ? 'bg-crimson text-white shadow font-extrabold'
                    : 'text-white/45 hover:text-white'
                }`}
              >
                {appLanguage === 'bm' ? '🎒 Panduan' : '🎒 Survival'}
              </button>
              <button
                type="button"
                onClick={() => {
                  changeTab('moderation');
                }}
                className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg transition-all cursor-pointer relative ${
                  activeTab === 'moderation'
                    ? 'bg-crimson text-white shadow font-extrabold'
                    : 'text-white/45 hover:text-white'
                }`}
              >
                {appLanguage === 'bm' ? '⚖️ Senarai' : '⚖️ Queue'}
                {pendingEdits.length > 0 && (
                  <span className="absolute -top-1.5 -right-1 bg-gold text-black text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {pendingEdits.length}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* ACTIVE PORTAL TAB VIEWS */}
          {activeTab === 'explore' && (
            <div className="space-y-4">
              {/* Interactive map display */}
              <div className="bg-card/40 border border-white/5 rounded-xl p-1.5">
                <MalaysiaMap
                  onSelectState={(st) => {
                    setSelectedState(st);
                    trackEvent('word_view', { state: st });
                  }}
                  selectedState={selectedState}
                  entryCountsByState={entryCountsByState}
                />
              </div>

              {/* General Loghat dictionary */}
              <DialectDex
                entries={entries}
                selectedState={selectedState}
                onUpvoteEntry={handleUpvoteEntry}
                onAddEntry={handleAddEntryProposal}
                onEditProposal={handleCorrectionProposal}
                appLanguage={appLanguage}
              />
            </div>
          )}

          {activeTab === 'game' && (
            <div className="transition-all">
              {renderGameTabContent(false)}
            </div>
          )}

          {activeTab === 'social' && (
            <div className="animate-fadeIn">
              <SocialFeed
                isInsideSimulator={false}
                userProfile={userProfile}
                appLanguage={appLanguage}
                onAcceptChallenge={(stateFocus) => {
                  setSelectedState(stateFocus);
                  changeTab('game');
                }}
              />
            </div>
          )}

          {activeTab === 'survival' && (
            <div>
              <TouristSurvival
                isTouristMode={isTouristMode}
                onToggleMode={setIsTouristMode}
              />
            </div>
          )}

          {activeTab === 'moderation' && (
            <div>
              <CrowdsourceQueue
                pendingEdits={pendingEdits}
                onVoteSah={handleVoteSah}
                onRejectEdit={handleRejectEdit}
                isInsideSimulator={false}
              />
            </div>
          )}

          {activeTab === 'ads' && (
            <div>
              <BazarSponsors
                ads={ads}
                onAddAd={handleAddAd}
                onReactAd={handleReactAd}
                isInsideSimulator={false}
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fadeIn">
              <SettingsTab
                userProfile={userProfile}
                onUpdateUserProfile={updateProfile}
                isInsideSimulator={false}
                appLanguage={appLanguage}
                onOpenWrapped={handleOpenWrapped}
              />
            </div>
          )}
        </div>

        {/* NATIVE iOS BOTTOM UITABBAR — 5 tabs for native mobile navigation */}
        <nav className="bg-card/95 border-t border-white/10 backdrop-blur-xl h-[62px] pt-1.5 pb-4.5 fixed bottom-0 inset-x-0 z-30 px-1 flex justify-around items-center shrink-0">
          <button
            onClick={() => changeTab('explore')}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition ${
              activeTab === 'explore' ? 'text-gold font-extrabold' : 'text-white/45'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span className="text-[7.5px] tracking-tight">{t('explore', appLanguage)}</span>
          </button>

          <button
            onClick={() => changeTab('game')}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition ${
              activeTab === 'game' ? 'text-gold font-extrabold' : 'text-white/45'
            }`}
          >
            <Award className="w-4 h-4 mb-0.5" />
            <span className="text-[7.5px] tracking-tight">{t('quiz', appLanguage)}</span>
          </button>

          <button
            onClick={() => changeTab('social')}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition ${
              activeTab === 'social' ? 'text-gold font-extrabold' : 'text-white/45'
            }`}
          >
            <MessageSquare className="w-4 h-4 mb-0.5 text-cyan-400" />
            <span className="text-[7.5px] tracking-tight">{t('social', appLanguage)}</span>
          </button>

          <button
            onClick={() => changeTab('ads')}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition relative ${
              activeTab === 'ads' ? 'text-gold font-extrabold' : 'text-white/45'
            }`}
          >
            <Megaphone className="w-4 h-4 mb-0.5 text-crimson" />
            <span className="text-[7.5px] tracking-tight">{t('sponsors', appLanguage)}</span>
            <span className="absolute top-1.5 right-6 bg-crimson w-1.5 h-1.5 rounded-full" />
          </button>

          <button
            onClick={() => {
              if (activeTab !== 'settings' && activeTab !== 'survival' && activeTab !== 'moderation') {
                changeTab('settings');
              }
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full py-0.5 transition ${
              (activeTab === 'settings' || activeTab === 'survival' || activeTab === 'moderation') ? 'text-gold font-extrabold' : 'text-white/45'
            }`}
          >
            <Settings className="w-4 h-4 mb-0.5" />
            <span className="text-[7.5px] tracking-tight">{t('more', appLanguage)}</span>
          </button>
        </nav>
      </div>

      {/* CASE B: NORMAL HIGH-CONTRAST FULL-SCREEN WEBSITE VIEWPORT */}
      <div className="hidden md:flex flex-1 flex-col justify-between">
          {/* Modern Malaysia "Batik Tech" Aesthetic Top Header Banner */}
          <header className="relative w-full border-b border-white/10 bg-card/85 backdrop-blur-md pt-6 pb-6 px-4 md:px-10 overflow-hidden shrink-0 select-none">
            {/* Abstract vector flowers simulating traditional malaysian hibiscus patterns */}
            <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.04] pointer-events-none text-crimson">
              <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
                <path d="M50,15 C45,35 25,45 50,55 C75,45 55,35 50,15 Z" />
                <path d="M15,50 C35,45 45,25 55,50 C45,75 35,55 15,50 Z" />
                <circle cx="50" cy="50" r="10" fill="currentColor" />
              </svg>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Elegant App Logo */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold via-crimson to-crimson p-[1.5px] shadow-lg shadow-black/40 overflow-hidden">
                  <img src="/logo.png" alt="Loghat Logo" className="w-full h-full object-cover rounded-[14px]" />
                </div>
                <div>
                  <h1 id="app-title-literal" className="text-2xl font-brand text-[#F5F5F5] tracking-wide flex items-center gap-2">
                    LOGHAT <span className="text-[10px] bg-gold text-black px-2.5 py-0.5 rounded-full font-mono font-black uppercase tracking-wider">Beta</span>
                  </h1>
                  <p className="text-xs text-white/50 uppercase tracking-[0.08em] font-medium">
                    {t('appSubtitle', appLanguage)}
                  </p>
                </div>
              </div>

              {/* Quick Dashboard Stat Counters + Language Toggle */}
              <div className="flex items-center gap-4 select-none">
                {renderLanguageToggleWidget('md')}
                <div className="flex gap-4 text-[11px] bg-interior p-2.5 border border-white/5 rounded-xl">
                  <div className="px-3 border-r border-[#333] text-center">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-mono block">{t('statSlangs', appLanguage)}</span>
                    <span className="font-extrabold text-gold font-mono text-xs">{entries.length}</span>
                  </div>
                  <div className="px-3 border-r border-[#333] text-center">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-mono block">{t('statPending', appLanguage)}</span>
                    <span className="font-extrabold text-crimson font-mono text-xs">{pendingEdits.length}</span>
                  </div>
                  <div className="px-3 text-center">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-mono block">{t('statAccord', appLanguage)}</span>
                    <span className="font-extrabold text-emerald-400 font-mono text-xs">96%</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Tab/Navigation Selector Segment */}
          <nav className="w-full bg-card/60 backdrop-blur border-b border-white/5 py-4 px-4 md:px-10 shrink-0">
            <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto scroller-hidden">
              <button
                onClick={() => changeTab('explore')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap border ${
                  activeTab === 'explore'
                    ? 'bg-crimson/10 text-crimson border-crimson/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                {t('navDictionary', appLanguage)}
              </button>

              <button
                onClick={() => changeTab('game')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap border ${
                  activeTab === 'game'
                    ? 'bg-crimson/10 text-crimson border-crimson/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Award className="w-4 h-4" />
                {t('navQuiz', appLanguage)}
              </button>

              <button
                onClick={() => changeTab('survival')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap border ${
                  activeTab === 'survival'
                    ? 'bg-crimson/10 text-crimson border-crimson/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Coffee className="w-4 h-4" />
                {t('navSurvival', appLanguage)}
              </button>

              <button
                onClick={() => changeTab('ads')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap border ${
                  activeTab === 'ads'
                    ? 'bg-crimson/10 text-crimson border-crimson/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Megaphone className="w-full sm:w-4 sm:h-4 text-gold animate-bounce" />
                {t('navSponsors', appLanguage)}
              </button>

              <button
                onClick={() => changeTab('social')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap border ${
                  activeTab === 'social'
                    ? 'bg-crimson/10 text-crimson border-crimson/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                {t('navSocial', appLanguage)}
              </button>

              <button
                onClick={() => changeTab('moderation')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition relative whitespace-nowrap border ${
                  activeTab === 'moderation'
                    ? 'bg-crimson/10 text-crimson border-crimson/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                {t('navModeration', appLanguage)}
                {pendingEdits.length > 0 && (
                  <span className="ml-1.5 bg-gold text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {pendingEdits.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => changeTab('settings')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition relative whitespace-nowrap border ${
                  activeTab === 'settings'
                    ? 'bg-crimson/10 text-crimson border-crimson/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Settings className="w-4 h-4 text-blue-400" />
                {t('navSettings', appLanguage)}
              </button>
            </div>
          </nav>

          {/* Main Body Layout with Side Ad Panels */}
          <div className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 flex gap-6">
            
            {/* LEFT SIDEBAR ADS (Web Desktop Only) */}
            {!userProfile.isPremiumUser && (
              <aside className="hidden lg:flex flex-col gap-3 w-[200px] xl:w-[230px] shrink-0 sticky top-4 self-start">
                <div className="bg-card border border-white/10 rounded-xl p-2.5 text-center">
                  <p className="text-[7px] uppercase tracking-[0.25em] font-mono text-white/25 font-bold">Sponsored</p>
                </div>
                {renderSmartAdBanner('sidebar', 'web-left-1')}
                {renderSmartAdBanner('sidebar', 'web-left-2')}
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="bg-gold/5 border border-gold/15 rounded-xl p-2.5 text-center hover:border-gold/30 transition cursor-pointer"
                >
                  <p className="text-[8px] font-black text-gold uppercase tracking-wide">👑 Go Ad-Free</p>
                  <p className="text-[7px] text-white/35 mt-0.5">RM4.90 lifetime</p>
                </button>
              </aside>
            )}

            {/* CENTER: Main Content */}
            <main className="flex-1 flex flex-col gap-8 min-w-0">
            
              {/* Cultural Welcome Greeting block for first-arrival users */}
              {activeTab === 'explore' && !selectedState && (
                <div className="bg-gradient-to-r from-card to-interior border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
                  <div className="space-y-1 z-10 text-left">
                    <h2 className="text-base font-extrabold text-gold flex items-center gap-1.5 leading-snug">
                      <Info className="w-5 h-5 text-crimson" />
                      {t('welcomeTitle', appLanguage)}
                    </h2>
                    <p className="text-xs text-white/75 max-w-xl leading-normal">
                      {t('welcomeSubtitle', appLanguage)}
                    </p>
                  </div>
                  <div className="shrink-0 flex gap-2.5 z-10 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setIsTouristMode(true);
                        changeTab('survival');
                      }}
                      className="w-full sm:w-auto px-4 py-2 bg-[#121212] hover:bg-card border border-white/10 hover:border-gold/40 text-gold text-xs font-bold rounded-xl transition duration-200"
                    >
                      {t('mamakSurvivalBtn', appLanguage)}
                    </button>
                    <button
                      onClick={() => changeTab('game')}
                      className="w-full sm:w-auto px-4 py-2 bg-crimson hover:bg-crimson/90 text-white text-xs font-bold rounded-xl transition duration-200 shadow"
                    >
                    {t('playQuizBtn', appLanguage)}
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVE PORTAL TAB VIEWS */}
            {activeTab === 'explore' && (
              <div className="flex flex-col gap-8 animate-fadeIn">
                {/* Interactive map display */}
                <MalaysiaMap
                  onSelectState={setSelectedState}
                  selectedState={selectedState}
                  entryCountsByState={entryCountsByState}
                />

                {/* General Loghat dictionary */}
                <DialectDex
                  entries={entries}
                  selectedState={selectedState}
                  onUpvoteEntry={handleUpvoteEntry}
                  onAddEntry={handleAddEntryProposal}
                  onEditProposal={handleCorrectionProposal}
                  appLanguage={appLanguage}
                />
              </div>
            )}

            {activeTab === 'game' && (
              <div className="animate-fadeIn">
                {renderGameTabContent(false)}
              </div>
            )}

            {activeTab === 'survival' && (
              <div className="animate-fadeIn">
                <TouristSurvival
                  isTouristMode={isTouristMode}
                  onToggleMode={setIsTouristMode}
                />
              </div>
            )}

            {activeTab === 'social' && (
              <div className="animate-fadeIn">
                <SocialFeed
                  isInsideSimulator={false}
                  userProfile={userProfile}
                  appLanguage={appLanguage}
                  onAcceptChallenge={(stateFocus) => {
                    setSelectedState(stateFocus);
                    changeTab('game');
                  }}
                />
              </div>
            )}

            {activeTab === 'moderation' && (
              <div className="animate-fadeIn">
                <CrowdsourceQueue
                  pendingEdits={pendingEdits}
                  onVoteSah={handleVoteSah}
                  onRejectEdit={handleRejectEdit}
                  isInsideSimulator={false}
                />
              </div>
            )}

            {activeTab === 'ads' && (
              <div className="animate-fadeIn">
                <BazarSponsors
                  ads={ads}
                  onAddAd={handleAddAd}
                  onReactAd={handleReactAd}
                  isInsideSimulator={false}
                />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-fadeIn">
                <SettingsTab
                  userProfile={userProfile}
                  onUpdateUserProfile={updateProfile}
                  isInsideSimulator={false}
                  appLanguage={appLanguage}
                  onOpenWrapped={handleOpenWrapped}
                />
              </div>
            )}
            </main>

            {/* RIGHT SIDEBAR ADS (Web Desktop Only) */}
            {!userProfile.isPremiumUser && (
              <aside className="hidden lg:flex flex-col gap-3 w-[200px] xl:w-[230px] shrink-0 sticky top-4 self-start">
                <div className="bg-card border border-white/10 rounded-xl p-2.5 text-center">
                  <p className="text-[7px] uppercase tracking-[0.25em] font-mono text-white/25 font-bold">Sponsored</p>
                </div>
                {renderSmartAdBanner('sidebar', 'web-right-1')}
                {renderSmartAdBanner('sidebar', 'web-right-2')}
                {renderSmartAdBanner('sidebar', 'web-right-3')}
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="bg-gold/5 border border-gold/15 rounded-xl p-2.5 text-center hover:border-gold/30 transition cursor-pointer"
                >
                  <p className="text-[8px] font-black text-gold uppercase tracking-wide">👑 Remove Ads</p>
                  <p className="text-[7px] text-white/35 mt-0.5">From RM4.90</p>
                </button>
              </aside>
            )}
          </div>

          {renderBottomAdmobBanner()}

          {/* Modern Humble Malaysia-theme footer */}
          <footer className="border-t border-white/5 bg-card/65 py-8 px-4 shrink-0 text-center text-white/30 text-2xs font-mono">
            <p>© 2026 LOGHAT PROJECT • KUALA LUMPUR • CRAFTED WITH AUTHENTIC CULTURE</p>
            <p className="mt-1 text-white/20 font-sans flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowPrivacyPolicyModal(true);
                  if (typeof playIosTap === 'function') playIosTap();
                }}
                className="text-gold underline hover:text-white cursor-pointer"
              >
                View Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setShowPrivacyPolicyModal(true);
                  if (typeof playIosTap === 'function') playIosTap();
                }}
                className="text-emerald-400 underline hover:text-white cursor-pointer"
              >
                Data Preferences (CCPA/GDPR/Telemetry)
              </button>
            </p>
            <p className="mt-2 text-white/15">Preserving unique regional vernaculars of Southeast Asia</p>
          </footer>
        </div>

      {renderGlobalPrivacyModal()}
      {renderSubscriptionModal()}
      {renderFirstQuizCompleteModal()}
      {renderPushNotificationBanner()}
      {renderWrappedModal()}

      {/* Interstitial Ad overlay — triggered every 4th tab switch */}
      <InterstitialAd
        ads={ads}
        isVisible={showInterstitial}
        onDismiss={handleInterstitialDismiss}
        dismissDelay={3}
        context="tab_switch"
      />
    </div>
  );
}
