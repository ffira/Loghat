import { useState, useEffect } from 'react';
import { DIALECT_IQ_QUIZ, INITIAL_SPONSOR_ADS } from '../data/dialectData';
import { QuizRank, SponsorAd, QuizQuestion } from '../types';
import { Award, RefreshCw, Send, CheckCircle2, AlertCircle, Share2, Clipboard, ChevronRight, Sparkles, Globe, Map, Trophy, Check, ListFilter, Play, Gift } from 'lucide-react';
import InterstitialAd from './InterstitialAd';
import RewardedAd from './RewardedAd';
import { trackEvent } from '../utils/analytics';
import { Language, t } from '../utils/i18n';

interface DialectIQGameProps {
  ads?: SponsorAd[];
  isSimulatorLayout?: boolean;
  onChallengeFriend?: (score: number, state: string) => void;
  appLanguage?: Language;
  premiumTier?: 'none' | 'adfree' | 'ultra';
  onOpenSubscriptionModal?: () => void;
  onQuizComplete?: (score: number) => void;
}

// Map of questions to states/regions represented
const QUESTION_STATE_MAP: Record<string, string[]> = {
  'q-ml-01': ['Kedah', 'Penang'], // Ketegaq (Northern)
  'q-ml-02': ['Kelantan'], // Bekwoh
  'q-ml-03': ['Negeri Sembilan'], // Nyangko
  'q-ml-04': ['Terengganu'], // Gu
  'q-ml-05': ['Penang'], // Loqlaq
  'q-ml-06': ['Perak', 'Kedah'], // Keleboq
  'q-ml-07': ['Kelantan'], // Tebeng
  'q-ml-08': ['Terengganu'], // Kehek
  'q-ml-09': ['Negeri Sembilan'], // Menselet
  'q-ml-10': ['Kedah'], // Cenonot
  'q-mg-01': ['Kuala Lumpur', 'Selangor', 'Johor', 'Penang', 'Kedah', 'Kelantan', 'Terengganu', 'Negeri Sembilan', 'Sabah', 'Sarawak', 'Perak'],
  'q-mg-02': ['Kuala Lumpur', 'Selangor', 'Johor', 'Penang', 'Kedah', 'Kelantan', 'Terengganun', 'Negeri Sembilan', 'Sabah', 'Sarawak', 'Perak'],
  'q-mg-03': ['Penang', 'Kuala Lumpur', 'Selangor'], // Abuden
  'q-mg-04': ['Johor', 'Kuala Lumpur', 'Selangor'], // Kantang
  'q-mg-05': ['Kuala Lumpur', 'Selangor', 'Sabah'], // Boskur
  'q-ch-01': ['Penang', 'Kuala Lumpur', 'Selangor', 'Johor'], // Kaypoh
  'q-ch-02': ['Penang', 'Johor', 'Kuala Lumpur', 'Selangor'], // Kiasi
  'q-ch-03': ['Penang', 'Johor', 'Kuala Lumpur', 'Selangor'], // Kiasu
  'q-ch-04': ['Penang', 'Kuala Lumpur', 'Selangor'], // Bo-chup
  'q-ch-05': ['Penang', 'Johor', 'Kuala Lumpur', 'Selangor'], // Limteh
  'q-wc-01': ['Sabah'], // Bah
  'q-wc-02': ['Sarawak'], // Polah
  'q-wc-03': ['Sarawak'], // Gerek
  'q-wc-04': ['Sabah'], // Sumandak
  'q-wc-05': ['Sabah'], // Limpar
  'q-ml-11': ['Melaka'], // Hawau (Melaka)
  'q-ml-12': ['Pahang'] // Kome (Pahang)
};

const STATES_LIST = [
  'Penang',
  'Kedah',
  'Kelantan',
  'Terengganu',
  'Negeri Sembilan',
  'Sabah',
  'Sarawak',
  'Johor',
  'Kuala Lumpur',
  'Selangor',
  'Perak',
  'Perlis',
  'Pahang',
  'Melaka',
  'Labuan'
];

export default function DialectIQGame({ ads = INITIAL_SPONSOR_ADS, isSimulatorLayout = false, onChallengeFriend, appLanguage = 'manglish', premiumTier = 'none', onOpenSubscriptionModal, onQuizComplete }: DialectIQGameProps) {
  // Arena Configuration States
  const [quizMode, setQuizMode] = useState<'none' | 'mix' | 'three' | 'single'>('none');
  const [selectedThreeStates, setSelectedThreeStates] = useState<string[]>([]);
  const [singleStateChoice, setSingleStateChoice] = useState<string>('Penang');

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [challengeState, setChallengeState] = useState('Kedah');
  const [copied, setCopied] = useState(false);
  const [isAdVisible, setIsAdVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(4);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const [showLimitNotice, setShowLimitNotice] = useState(false);
  const [rewardType, setRewardType] = useState<'reveal_hint' | 'unlock_quiz'>('reveal_hint');

  // Collaborative Group Goal States
  const [groupScore, setGroupScore] = useState(0);

  useEffect(() => {
    const key = `loghat_group_score_${singleStateChoice}`;
    let val = localStorage.getItem(key);
    if (!val) {
      const seed = Math.floor(450 + Math.random() * 270);
      localStorage.setItem(key, seed.toString());
      val = seed.toString();
    }
    setGroupScore(parseInt(val, 10));
  }, [singleStateChoice]);

  const showShareToast = (msg: string) => {
    setShareToast(msg);
    setTimeout(() => {
      setShareToast(null);
    }, 2500);
  };

  const currentQuestion = questions[currentIdx] || DIALECT_IQ_QUIZ[0];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  useEffect(() => {
    if (!isAnswered || quizComplete || quizMode === 'none') {
      setTimeLeft(4);
      return;
    }

    setTimeLeft(4); // Show "Did You Know" for 4 seconds

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Inline handleNext logic to avoid stale closure
          if (currentIdx < questions.length - 1) {
            setCurrentIdx((prevIdx) => prevIdx + 1);
            setIsAnswered(false);
          } else {
            setQuizComplete(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnswered, currentIdx, quizComplete, quizMode, questions.length]);

  useEffect(() => {
    if (quizComplete) {
      const scoreValue = getScore();
      const rankValue = getRank(scoreValue);
      const prevBestScore = parseInt(localStorage.getItem('loghat_best_score') || '0', 10);
      
      if (scoreValue >= prevBestScore) {
        localStorage.setItem('loghat_best_score', scoreValue.toString());
        localStorage.setItem('loghat_best_rank', rankValue);
      }

      // Add score to collaborative State-wide Group Goal if played in Single State mode
      if (quizMode === 'single') {
        const key = `loghat_group_score_${singleStateChoice}`;
        const currentGroupScore = parseInt(localStorage.getItem(key) || '500', 10);
        const newGroupScore = Math.min(1000, currentGroupScore + scoreValue);
        localStorage.setItem(key, newGroupScore.toString());
        setGroupScore(newGroupScore);

        if (newGroupScore >= 1000 && currentGroupScore < 1000) {
          window.dispatchEvent(new CustomEvent('loghat_push_notification', {
            detail: {
              title: `🎉 Cabaran Kumpulan Selesai / Group Goal Completed!`,
              body: appLanguage === 'bm' 
                ? `Syabas! Negeri ${singleStateChoice} berjaya mencapai matlamat kumpulan 1000 markah!`
                : `Awesome! State ${singleStateChoice} has achieved the collective 1,000 points group goal!`
            }
          }));
        }
      }

      try {
        const stored = localStorage.getItem('loghat_user_profile');
        if (stored) {
          const profile = JSON.parse(stored);
          profile.bestScore = Math.max(profile.bestScore || 0, scoreValue);
          profile.bestRank = scoreValue >= prevBestScore ? rankValue : (profile.bestRank || rankValue);
          localStorage.setItem('loghat_user_profile', JSON.stringify(profile));
        }
      } catch (e) {
        // Safe backend fallback
      }
      onQuizComplete?.(scoreValue);
    }
  }, [quizComplete]);

  const getQuizzesPlayedToday = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    try {
      const stored = localStorage.getItem('loghat_quizzes_played');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === todayStr) {
          return parsed.count || 0;
        }
      }
    } catch {}
    return 0;
  };

  const incrementQuizzesPlayed = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const currentCount = getQuizzesPlayedToday();
    localStorage.setItem('loghat_quizzes_played', JSON.stringify({ date: todayStr, count: currentCount + 1 }));
  };

  const getQuizLimit = () => premiumTier === 'adfree' ? 50 : 3;

  const handleStartChallenge = (mode: 'mix' | 'three' | 'single') => {
    if (premiumTier !== 'ultra') {
      const playedCount = getQuizzesPlayedToday();
      if (playedCount >= getQuizLimit()) {
        setShowLimitNotice(true);
        return;
      }
    }

    let chosenStates: string[] = [];
    if (mode === 'three') {
      if (selectedThreeStates.length !== 3) return;
      chosenStates = selectedThreeStates;
    } else if (mode === 'single') {
      chosenStates = [singleStateChoice];
    }

    // Compile customized questions
    let matched = DIALECT_IQ_QUIZ.filter(q => {
      const qStates = QUESTION_STATE_MAP[q.id] || [];
      if (mode === 'three' || mode === 'single') {
        return qStates.some(s => chosenStates.includes(s));
      }
      return true; // mix
    });

    // Shuffle state-specific ones
    matched = [...matched].sort(() => Math.random() - 0.5);

    // If there are less than 10 questions, fill with universal/common ones as a safeguard
    if (matched.length < 10 && mode !== 'mix') {
      const matchedIds = new Set(matched.map(q => q.id));
      const supplement = DIALECT_IQ_QUIZ.filter(q => !matchedIds.has(q.id))
        .sort(() => Math.random() - 0.5);
      
      matched = [...matched, ...supplement];
    }

    // Capture first 10 questions
    const finalSelection = matched.slice(0, 10);
    setQuestions(finalSelection);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnswered(false);
    setQuizComplete(false);
    setQuizMode(mode);
    setChallengeState(chosenStates[0] || 'Kuala Lumpur');

    // Increment count when successfully starting
    if (premiumTier !== 'ultra') {
      incrementQuizzesPlayed();
    }
  };

  const handleToggleThreeState = (stateName: string) => {
    setSelectedThreeStates(prev => {
      if (prev.includes(stateName)) {
        return prev.filter(s => s !== stateName);
      }
      if (prev.length >= 3) {
        // Replace first element to rotate, or just cap
        return [...prev.slice(1), stateName];
      }
      return [...prev, stateName];
    });
  };

  // Monetization state
  const [showQuizInterstitial, setShowQuizInterstitial] = useState(false);
  const [showRewardedAd, setShowRewardedAd] = useState(false);
  const [rewardedHintUnlocked, setRewardedHintUnlocked] = useState(false);

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    setUserAnswers((prev) => ({ ...prev, [currentIdx]: option }));
    setIsAnswered(true);
    setRewardedHintUnlocked(false);
    trackEvent('quiz_answer', { questionIdx: currentIdx, correct: option === questions[currentIdx]?.correctAnswer });
  };

  const getScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    return Math.round((correctCount / (questions.length || 10)) * 100);
  };

  const getRank = (score: number): QuizRank => {
    if (score <= 30) return 'Tourist';
    if (score <= 60) return 'Budak City';
    if (score <= 80) return 'Anak Jati';
    return 'Legend Kampung';
  };

  const getRankStats = (rank: QuizRank, lang: Language = 'en') => {
    switch (rank) {
      case 'Tourist':
        return {
          title: lang === 'bm' ? 'Pelancong / Tourist' : lang === 'manglish' ? 'Tourist' : 'Pelancong / Tourist',
          desc: lang === 'bm' 
            ? 'Adoi! Anda masih bergelut untuk memesan teh o ais limau tanpa menunjuk jari. Masa untuk meluangkan masa di kedai Mamak!'
            : lang === 'manglish'
            ? 'Adoi! Cannot order teh o ais limau without pointing lah. Go hang out at mamak more boss!'
            : 'Adoi! You still struggle to order teh o ais limau without pointing. Time to hang out more at the local Mamak!',
          color: 'from-blue-500 to-cyan-500',
          badge: '🥤'
        };
      case 'Budak City':
        return {
          title: lang === 'bm' ? 'Budak Kota / City Kid' : lang === 'manglish' ? 'City Kid' : 'Budak City',
          desc: lang === 'bm'
            ? 'Anda tahu apa itu "tapau" dan "gostan", tetapi anda bingung sepenuhnya apabila dialek serantau dari Kedah atau Kelantan masuk sembang. Boleh tahan!'
            : lang === 'manglish'
            ? 'Know "tapau" and "gostan" only, but blur when northern or kelate slangs come in. Quite modern boss!'
            : 'You know what "tapau" and "gostan" are, but you get totally lost when deep regional dialects from Kedah or Kelantan enter the chat. Quite trendy!',
          color: 'from-amber-400 to-orange-500',
          badge: '🏢'
        };
      case 'Anak Jati':
        return {
          title: lang === 'bm' ? 'Anak Jati' : lang === 'manglish' ? 'Local Expert' : 'Anak Jati',
          desc: lang === 'bm'
            ? 'Mengagumkan! Anda adalah penduduk tempatan sejati yang memahami nuansa pelbagai negeri dan boleh berbual dengan mudah di seluruh Malaysia.'
            : lang === 'manglish'
            ? 'Fuyoo! Real local here, know all state slangs. Can talk to anyone easily lah!'
            : 'Impressive! You are a genuine local who understands the nuances of various states and can converse easily with locals around Malaysia.',
          color: 'from-teal-400 to-emerald-600',
          badge: '🇲🇾'
        };
      case 'Legend Kampung':
        return {
          title: lang === 'bm' ? 'Lagenda Kampung' : lang === 'manglish' ? 'Kampung Legend' : 'Legend Kampung',
          desc: lang === 'bm'
            ? 'Fuyoo! Penguasaan mutlak. Anda memahami segala-galanya dari slang utara yang mendalam hingga ganti nama Sarawak. Boleh borak santai di kedai kopi kampung!'
            : lang === 'manglish'
            ? 'Fuyoo! Power sial! Understand everything from northern to Sarawak slangs. Can sit at any kampung coffee shop boss!'
            : 'Fuyoo! Absolute mastery. You understand everything from deep northern slang to Sarawakian pronouns. You can blend in seamlessly at any rural coffee corner!',
          color: 'from-rose-500 to-amber-500',
          badge: '👑'
        };
    }
  };

  const score = getScore();
  const rank = getRank(score);
  const rankInfo = getRankStats(rank, appLanguage);

  const getShareText = () => {
    if (appLanguage === 'bm') {
      return `Saya baru mendapat markah ${score}% dalam Cabaran Loghat Malaysia! Pangkat saya ialah [${rankInfo.title}] ${rankInfo.badge}. Boleh tak anda kalahkan saya di negeri ${challengeState}? Main cabaran di sini!`;
    }
    if (appLanguage === 'manglish') {
      return `I scored ${score}% on Malaysian Loghat Challenge! I get [${rankInfo.title}] rank ${rankInfo.badge}. Can beat me in ${challengeState} or not? Play here boss!`;
    }
    return `I just scored ${score}% on the Malaysian Loghat Challenge! I am ranked as a [${rankInfo.title}] ${rankInfo.badge}. Can you beat me in ${challengeState}? Play the challenge here!`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleChallengeFriendSubmit = () => {
    // 1. Post to local storage
    const stored = localStorage.getItem('loghat_social_posts');
    const posts = stored ? JSON.parse(stored) : [];
    
    let userExt = { displayName: 'Kawan Loghat', originState: 'Penang', heritageState: 'Other' };
    try {
      const p = localStorage.getItem('loghat_user_profile_extended');
      if (p) userExt = JSON.parse(p);
    } catch {}

    const challengePostText = appLanguage === 'bm'
      ? `Cabaran baru! Saya baru sahaja mendapat markah ${score}% dalam Dialect IQ Quiz bagi Negeri ${challengeState}. Siapa berani menentang saya? Jom uji kefasihan anda! 🧠🔥`
      : appLanguage === 'manglish'
      ? `New challenge! Just scored ${score}% on Dialect IQ Quiz for ${challengeState} state. Who wants to fight me? Come test your brain lah! 🧠🔥`
      : `New challenge! I just scored ${score}% on the Dialect IQ Quiz for ${challengeState} state. Who dares to challenge me? Come test your fluency! 🧠🔥`;

    const newPost = {
      id: `post-challenge-${Date.now()}`,
      author: userExt.displayName,
      avatar: userExt.heritageState === 'Malay' ? '🇲🇾' : '🥤',
      rank: rankInfo ? rankInfo.title : 'Pelancong / Tourist',
      badge: '⚔️ Loghat Challenger',
      text: challengePostText,
      likes: 0,
      isLikedByUser: false,
      type: 'challenge' as const,
      challengeDetails: {
        challengerScore: score,
        stateFocus: challengeState,
        challengerName: userExt.displayName
      },
      timestamp: 'Just now',
      comments: []
    };

    localStorage.setItem('loghat_social_posts', JSON.stringify([newPost, ...posts]));

    // Unlock badge
    try {
      const storedBadgeIds = localStorage.getItem('loghat_unlocked_badge_ids');
      const list = storedBadgeIds ? JSON.parse(storedBadgeIds) : [];
      if (!list.includes('social_challenger')) {
        list.push('social_challenger');
        localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(list));
      }
      
      // Increment challenge count
      const challengeCount = parseInt(localStorage.getItem('loghat_stats_challenges_sent') || '0', 10) + 1;
      localStorage.setItem('loghat_stats_challenges_sent', challengeCount.toString());
      if (challengeCount >= 5 && !list.includes('social_challenger_pro')) {
        list.push('social_challenger_pro');
        localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(list));
      }
    } catch (e) {}

    // Call prop callback
    if (onChallengeFriend) {
      onChallengeFriend(score, challengeState);
    } else {
      showShareToast(appLanguage === 'bm' ? 'Cabaran dihantar ke Saluran Sosial Komuniti! ⚔️' : appLanguage === 'manglish' ? 'Challenge posted to social feed boss! ⚔️' : 'Challenge posted to Community Social Feed! ⚔️');
    }
  };

  const handleSocialShare = (platform: string) => {
    // Unlock badge
    try {
      const storedBadgeIds = localStorage.getItem('loghat_unlocked_badge_ids');
      const list = storedBadgeIds ? JSON.parse(storedBadgeIds) : [];
      if (!list.includes('social_connector')) {
        list.push('social_connector');
        localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(list));
      }
    } catch (e) {}

    showShareToast(appLanguage === 'bm' ? `Pautan berjaya dikongsi ke ${platform}! 📢` : appLanguage === 'manglish' ? `Shared to ${platform} already boss! 📢` : `Link shared to ${platform} successfully! 📢`);
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnswered(false);
    setQuizComplete(false);
    setQuizMode('none'); // Back to Arena Setup!
  };

  return (
    <div className="w-full bg-[#0b0a12] border border-purple-500/20 rounded-2xl p-6 shadow-2xl relative shadow-purple-950/5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-gold flex items-center gap-2 tracking-tight">
            <Award className="w-6 h-6 text-purple-400 animate-bounce shrink-0" />
            {t('quiz', appLanguage) === 'Brain Test' ? 'Dialect IQ Challenge 🧠' : appLanguage === 'bm' ? 'Cabaran IQ Dialek 🧠' : 'Dialect IQ Challenge 🧠'}
          </h3>
          <p className="text-xs text-white/50 mt-1">
            {appLanguage === 'bm' ? 'Uji kefahaman anda tentang dialek nadir dan slang Malaysia yang tular!' : appLanguage === 'manglish' ? 'Test your brain with rare slangs lah!' : 'Test your understanding of rare dialects and viral Malaysian slangs!'}
          </p>
        </div>
        {quizMode !== 'none' && !quizComplete && (
          <div className="text-xs font-mono font-bold bg-[#121212] text-gold px-3 py-1.5 rounded-lg border border-white/10">
            Q: {currentIdx + 1} / {questions.length}
          </div>
        )}
      </div>

      {quizMode === 'none' ? (
        /* ARENA / EXTRA CATEGORY CONFIGURATION SELECTOR SCREEN */
        <div className="flex flex-col gap-6 animate-fadeIn">
          {/* Daily Quiz Tracker */}
          {premiumTier !== 'ultra' ? (
            <div className="flex justify-between items-center bg-[#121212] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white/70">
              <div className="flex items-center gap-1.5 text-left">
                <span className="text-gold">♾️</span>
                <span>Daily Quizzes Played: <b>{getQuizzesPlayedToday()} / {getQuizLimit()}</b></span>
              </div>
              <button
                onClick={onOpenSubscriptionModal}
                className="text-[10px] text-gold font-extrabold uppercase hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none"
              >
                👑 Unlock Unlimited Quizzes
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-gold/5 border border-gold/20 rounded-xl px-4 py-2.5 text-xs text-gold/90 font-bold">
              <div className="flex items-center gap-1.5 text-left">
                <span>👑</span>
                <span>Ultra Premium Active: <b>Unlimited Quizzes ♾️</b></span>
              </div>
              <span className="text-[10px] text-gold/60 font-mono">Legend Mode</span>
            </div>
          )}

          {showLimitNotice ? (
            <div className="bg-[#1a0f12] border border-crimson/30 rounded-xl p-6 text-center flex flex-col items-center gap-4 animate-fadeIn">
              <div className="w-12 h-12 bg-crimson/15 rounded-full flex items-center justify-center border border-crimson/25 animate-bounce">
                <AlertCircle className="w-6 h-6 text-crimson" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h4 className="text-sm font-extrabold text-gold uppercase tracking-wider text-center">Daily Quiz Limit Reached ({getQuizLimit()}/{getQuizLimit()}) 🛑</h4>
                <p className="text-2xs text-[#F5F5F5]/60 leading-relaxed text-center">
                  {premiumTier === 'adfree' ? `Ad-Free users are limited to ${getQuizLimit()} quizzes per day.` : `Standard free users are limited to ${getQuizLimit()} quizzes per day.`} Upgrade to Ultra Premium to get unlimited quizzes, gilded profile badges, and special name highlights!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto mt-2">
                <button
                  onClick={onOpenSubscriptionModal}
                  className="px-4 py-2 bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-black rounded-lg text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-gold/15 border-none"
                >
                  👑 Upgrade to Ultra Premium (RM9.90)
                </button>
                <button
                  onClick={() => {
                    setRewardType('unlock_quiz');
                    setShowRewardedAd(true);
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Gift className="w-4 h-4 text-gold animate-pulse" />
                  Watch Ad (+1 Quiz Pass)
                </button>
              </div>
              <button
                onClick={() => setShowLimitNotice(false)}
                className="text-[10px] text-white/40 hover:text-white uppercase font-mono tracking-wider mt-1 cursor-pointer bg-transparent border-none"
              >
                ✕ Cancel and view dashboard
              </button>
            </div>
          ) : (
            <>
              <div className="border border-white/5 bg-interior/40 rounded-xl p-4 text-center">
                <p className="text-xs text-white/70">
                  {appLanguage === 'bm' ? 'Selamat datang ke Arena Loghat! Pilih kategori dialek atau penapis negeri anda di bawah untuk menyesuaikan cabaran anda.' : appLanguage === 'manglish' ? 'Welcome to Arena boss! Choose your slang type or state filter below lah.' : 'Welcome to the Loghat Arena! Select your custom dialect category or state filter below to customize your challenge.'}
                </p>
              </div>

          <div className={isSimulatorLayout ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-3 gap-4"}>
            {/* OPTION 1: MIXED ARENA */}
            <button
              onClick={() => handleStartChallenge('mix')}
              className="group text-left p-5 rounded-xl border border-white/10 hover:border-gold/30 bg-interior/30 hover:bg-interior/60 transition-all duration-200 flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gold/5 to-transparent rounded-bl-full pointer-events-none" />
              <div>
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                  <Globe className="w-4 h-4 text-gold" />
                </div>
                <h4 className="font-bold text-sm text-gold">{appLanguage === 'bm' ? '1. Arena Campuran Klasik' : appLanguage === 'manglish' ? '1. Mixed Arena Boss' : '1. Classic Mixed Arena'}</h4>
                <p className="text-2xs text-[#F5F5F5]/60 mt-1.5 leading-relaxed">
                  {appLanguage === 'bm' ? 'Ujian Malaysia muktamad. Menggabungkan perbendaharaan kata utara, pantai timur, selatan, dan Borneo dalam satu kuiz rawak 10 soalan.' : appLanguage === 'manglish' ? 'Ultimate test. Mix all state slangs in 10 questions boss.' : 'The ultimate Malaysian test. Combines northern, east coast, southern, and Borneo vocabularies in one 10-question random shootout.'}
                </p>
              </div>
              <div className="w-full mt-2 py-2 bg-crimson/10 hover:bg-crimson/25 group-hover:text-white text-gold text-2xs font-extrabold text-center rounded-lg border border-crimson/20 transition-all flex items-center justify-center gap-1.5">
                <Play className="w-3 h-3 fill-current" />
                <span>{appLanguage === 'bm' ? 'Main Campuran Global (Utama)' : appLanguage === 'manglish' ? 'Start Mixed Game' : 'Play Global Mix (Main)'}</span>
              </div>
            </button>

            {/* OPTION 2: MULTI-STATE COMBOD */}
            <div
              className={`p-5 rounded-xl border ${
                selectedThreeStates.length === 3 ? 'border-crimson/50 bg-interior/60' : 'border-white/10 bg-interior/20'
              } flex flex-col gap-3 relative`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-lg bg-crimson/10 flex items-center justify-center">
                    <Map className="w-4 h-4 text-crimson" />
                  </div>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                    selectedThreeStates.length === 3 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-[#121212]/50 text-white/40 border border-white/5'
                  }`}>
                    {appLanguage === 'bm' ? `Dipilih: ${selectedThreeStates.length}/3` : `Selected: ${selectedThreeStates.length}/3`}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-gold mt-3">{appLanguage === 'bm' ? '2. Gabungan Tiga Negeri' : appLanguage === 'manglish' ? '2. 3-State Fusion' : '2. Tri-State Fusion'}</h4>
                <p className="text-2xs text-[#F5F5F5]/60 mt-1 leading-relaxed">
                  {appLanguage === 'bm' ? 'Pilih dan gabungkan tepat 3 negeri di bawah untuk menguji perkataan tempatan.' : appLanguage === 'manglish' ? 'Pick 3 states below to test local words lah.' : 'Mix and match exactly 3 custom states below to test local words.'}
                </p>
              </div>

              {/* State Pills Grid */}
              <div className="grid grid-cols-2 gap-1.5 my-2">
                {STATES_LIST.map(stateName => {
                  const isSelected = selectedThreeStates.includes(stateName);
                  return (
                    <button
                      key={stateName}
                      onClick={() => handleToggleThreeState(stateName)}
                      className={`py-1 px-2 rounded-lg text-left text-[10px] border cursor-pointer transition flex items-center justify-between gap-1 ${
                        isSelected 
                          ? 'bg-crimson/10 border-crimson text-white font-bold' 
                          : 'bg-card/40 border-white/5 text-[#F5F5F5]/70 hover:border-white/20'
                      }`}
                    >
                      <span>{stateName}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-crimson shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handleStartChallenge('three')}
                disabled={selectedThreeStates.length !== 3}
                className={`w-full py-2 text-2xs font-extrabold text-center rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  selectedThreeStates.length === 3 
                    ? 'bg-crimson hover:bg-crimson/90 text-white border-transparent cursor-pointer' 
                    : 'bg-[#121212]/40 text-white/20 border-white/5 cursor-not-allowed'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{appLanguage === 'bm' ? 'Mula Cabaran Tiga Negeri' : appLanguage === 'manglish' ? 'Start Fusion Challenge' : 'Start Tri-State Challenge'}</span>
              </button>
            </div>

            {/* OPTION 3: SINGLE STATE CHAMPION */}
            <div className="p-5 rounded-xl border border-white/10 bg-interior/30 flex flex-col justify-between gap-4">
              <div>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                  <Trophy className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="font-bold text-sm text-gold">{appLanguage === 'bm' ? '3. Pakar Negeri' : appLanguage === 'manglish' ? '3. State Master' : '3. State Specialist'}</h4>
                <p className="text-2xs text-[#F5F5F5]/60 mt-1.5 leading-relaxed">
                  {appLanguage === 'bm' ? 'Fokus sepenuhnya pada satu wilayah di bawah untuk menuntut gelaran pakar tempatan. Kami menyusun soalan khusus mengikut sasaran anda.' : appLanguage === 'manglish' ? 'Focus on 1 state only to get master rank. Purebred questions for you boss.' : 'Focus purely on a single territory below to claim local mastery coordinates. We compile purebred questions corresponding to your target.'}
                </p>

                {/* Single State Selector */}
                <div className="mt-4">
                  <label className="text-[10px] text-white/40 uppercase font-mono font-bold tracking-wider">{t('stateFocusLabel', appLanguage)}</label>
                  <select
                    value={singleStateChoice}
                    onChange={(e) => setSingleStateChoice(e.target.value)}
                    className="w-full bg-card border border-white/10 text-white text-xs rounded-lg px-2.5 py-2 font-bold focus:outline-none focus:border-gold mt-1"
                  >
                    {STATES_LIST.map(st => (
                      <option key={st} value={st} className="bg-[#121212]">{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => handleStartChallenge('single')}
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-2xs font-extrabold text-center rounded-lg border border-purple-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{appLanguage === 'bm' ? `Main Solo ${singleStateChoice}` : appLanguage === 'manglish' ? `Play ${singleStateChoice} Solo Boss` : `Play ${singleStateChoice} Solo`}</span>
              </button>
            </div>
          </div>

          {/* Collaborative Group Goal Banner */}
          <div className="mt-6 bg-[#0f0b18] border border-purple-500/25 rounded-2xl p-5 flex flex-col gap-4 text-left animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-3">
              <div>
                <h4 className="text-xs font-black text-gold flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-purple-400" />
                  {t('groupGoalTitle', appLanguage)}: <span className="text-white font-mono">{singleStateChoice}</span>
                </h4>
                <p className="text-[10px] text-white/50 mt-0.5 leading-normal">
                  {appLanguage === 'bm' 
                    ? `Pemain bekerjasama mengumpul 1000 markah kuiz bagi negeri ${singleStateChoice} untuk membuka Lencana Khas!`
                    : `Players collaborate to score 1,000 points collectively in ${singleStateChoice} quizzes to unlock special rewards!`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const deepLink = `${window.location.origin}${window.location.pathname}#challenge/${singleStateChoice}`;
                  navigator.clipboard.writeText(deepLink);
                  window.dispatchEvent(new CustomEvent('loghat_push_notification', {
                    detail: {
                      title: '🔗 Pautan Disalin / Link Copied!',
                      body: appLanguage === 'bm' ? 'Pautan cabaran kumpulan disalin! Hantar kepada rakan.' : 'Group challenge link copied! Send it to your friends.'
                    }
                  }));
                }}
                className="w-full sm:w-auto px-3.5 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-[9px] font-mono font-black uppercase rounded-lg transition duration-200 cursor-pointer text-center animate-pulse"
              >
                {t('groupGoalInvite', appLanguage)}
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#F5F5F5]/70 font-semibold">{appLanguage === 'bm' ? 'Markah Terkumpul Komuniti:' : 'Community Collective Score:'}</span>
                <span className="text-gold font-extrabold">{groupScore} / 1000 Pts</span>
              </div>
              <div className="w-full bg-[#121212] rounded-full h-3 border border-white/5 overflow-hidden p-[1px]">
                <div
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-gold h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  style={{ width: `${(groupScore / 1000) * 100}%` }}
                />
              </div>
              <p className="text-[9px] font-semibold text-white/40 text-center font-mono">
                {groupScore >= 1000 
                  ? (appLanguage === 'bm' ? '✓ MATLAMAT TERCAPAI! Ganjaran dikongsi dibuka.' : '✓ GOAL COMPLETED! Shared reward unlocked.')
                  : (appLanguage === 'bm' ? `Baki ${1000 - groupScore} mata diperlukan.` : `${1000 - groupScore} more points needed.`)}
              </p>
            </div>
          </div>
          </>
          )}
        </div>
      ) : !quizComplete ? (
        <div className="flex flex-col gap-5">
          {/* Progress bar */}
          <div className="w-full bg-interior rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-crimson to-gold h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question category badge */}
          <div className="flex justify-between items-center text-2xs">
            <span className="px-2.5 py-1 bg-gradient-to-r from-crimson/10 to-gold/10 text-gold rounded-full font-mono font-semibold border border-gold/20">
              {appLanguage === 'bm' ? 'Kategori:' : appLanguage === 'manglish' ? 'Type:' : 'Category:'} {currentQuestion.category}
            </span>
            <span className="text-white/30 font-semibold font-mono">{(100 / questions.length).toFixed(1)}% {appLanguage === 'bm' ? 'daripada jumlah skor' : appLanguage === 'manglish' ? 'of total mark' : 'of total score'}</span>
          </div>

          {/* Question text */}
          <div className="bg-[#06040a] border border-purple-500/20 p-5 rounded-xl shadow-[inset_0_0_15px_rgba(168,85,247,0.03)]">
            <p className="text-sm md:text-base font-semibold text-[#F5F5F5] leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>


          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option) => {
              const isSelected = userAnswers[currentIdx] === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const hasAnsweredCurrent = !!userAnswers[currentIdx];

              let btnClasses = 'border-purple-500/10 hover:border-purple-500/40 hover:bg-purple-500/5 hover:text-purple-300 text-white/90 bg-interior/30';
              let badgeIcon = null;

              if (hasAnsweredCurrent) {
                if (isCorrect) {
                   btnClasses = 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-medium';
                   badgeIcon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
                } else if (isSelected) {
                   btnClasses = 'border-crimson bg-crimson/10 text-crimson font-medium';
                   badgeIcon = <AlertCircle className="w-4 h-4 text-crimson shrink-0" />;
                } else {
                   btnClasses = 'border-transparent bg-[#121212]/30 text-white/30 opacity-60';
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={hasAnsweredCurrent}
                  className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all duration-200 flex items-center justify-between gap-3 ${btnClasses}`}
                >
                  <span className="flex-1">{option}</span>
                  {badgeIcon}
                </button>
              );
            })}
          </div>

          {/* Explanation drawer when answered */}
          {isAnswered && (
            <div className="bg-[#06040a] border border-purple-500/15 rounded-xl p-4 animate-fadeIn shadow-[inset_0_0_10px_rgba(168,85,247,0.02)]">
              <h4 className="text-xs font-bold text-gold flex items-center gap-1.5 uppercase tracking-wide mb-1">
                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                <span>{appLanguage === 'bm' ? 'Tahukah Anda?' : appLanguage === 'manglish' ? 'Fun Fact Boss' : 'Did You Know?'}</span>
              </h4>
              <p className="text-xs text-white/70 leading-relaxed text-left">
                {currentQuestion.explanation}
              </p>

              {/* Rewarded Ad prompt when user got it wrong */}
              {userAnswers[currentIdx] !== currentQuestion.correctAnswer && !rewardedHintUnlocked && (
                <button
                  onClick={() => setShowRewardedAd(true)}
                  className="mt-3 w-full py-2 bg-gradient-to-r from-amber-600/20 to-gold/20 border border-gold/25 rounded-lg text-[10px] font-bold text-gold flex items-center justify-center gap-1.5 cursor-pointer transition hover:bg-gold/30"
                >
                  <Gift className="w-3.5 h-3.5" />
                  {appLanguage === 'bm' ? 'Tonton Iklan untuk Dedahkan Jawapan Betul' : appLanguage === 'manglish' ? 'Watch Ad to Reveal Answer' : 'Watch Ad to Reveal Correct Answer'}
                </button>
              )}
              {rewardedHintUnlocked && userAnswers[currentIdx] !== currentQuestion.correctAnswer && (
                <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5 text-[10px] text-emerald-300">
                  ✅ {appLanguage === 'bm' ? 'Jawapan betul:' : 'Correct answer:'} <b className="text-emerald-200">{currentQuestion.correctAnswer}</b>
                </div>
              )}

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div id="AutoAdvanceIndicator" className="flex items-center gap-1.5 text-[10px] text-white/50 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping inline-block shrink-0" />
                  <span>{appLanguage === 'bm' ? 'Mara automatik dalam' : appLanguage === 'manglish' ? 'Next in' : 'Auto-advancing in'} <b className="text-gold">{timeLeft}s</b>...</span>
                </div>
                <button
                  id="NextSlangButton"
                  onClick={handleNext}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-2 bg-crimson hover:bg-crimson/95 text-white font-bold rounded-lg transition-all text-xs cursor-pointer shadow-md"
                >
                  {currentIdx < questions.length - 1 
                    ? (appLanguage === 'bm' ? 'Slang Seterusnya' : 'Next Slang') 
                    : (appLanguage === 'bm' ? 'Lihat Keputusan' : 'See Results')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results / Score Badge Certificate View */
        <div className="bg-[#121212] rounded-xl p-6 border border-gold/30 text-center flex flex-col items-center animate-fadeIn">
          {/* Certificate Header background */}
          <div className="w-16 h-16 bg-gradient-to-br from-gold to-crimson rounded-xl flex items-center justify-center text-3xl shadow-lg border border-gold/45 mb-4">
            {rankInfo.badge}
          </div>

          <p className="text-[10px] tracking-widest text-crimson font-mono font-black uppercase">
            {appLanguage === 'bm' ? 'Tahap Penguasaan Dialek Malaysia' : appLanguage === 'manglish' ? 'Malaysian Slang Power' : 'Malaysian Dialect Proficiency'}
          </p>
          <h4 className="text-2xl font-black text-[#F5F5F5] mt-1">
            {t('quizScoreLabel', appLanguage)} <span className="text-gold">{score}%</span>
          </h4>

          {/* Badge Display */}
          <div className="my-5 p-4 rounded-xl bg-card border border-white/10 max-w-md w-full">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase bg-[#E31C25] text-white tracking-widest shadow`}>
              {appLanguage === 'bm' ? 'Pangkat:' : appLanguage === 'manglish' ? 'Level:' : 'Rank:'} {rankInfo.title}
            </span>
            <p className="text-xs text-white/75 mt-3 leading-relaxed">
              {rankInfo.desc}
            </p>
          </div>

          {/* Share Block Section */}
          <div className="w-full max-w-md bg-card border border-white/10 p-4 rounded-xl flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-mono shrink-0 font-semibold">
                {appLanguage === 'bm' ? 'Negeri Cabaran / Sasaran:' : appLanguage === 'manglish' ? 'Target State:' : 'Challenge State / Target:'}
              </label>
              <select
                value={challengeState}
                onChange={(e) => setChallengeState(e.target.value)}
                className="bg-interior border border-white/10 text-white text-xs rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:border-gold"
              >
                <option value="Kedah" className="bg-[#121212]">Kedah (Utara)</option>
                <option value="Kelantan" className="bg-[#121212]">Kelantan</option>
                <option value="Kuala Lumpur" className="bg-[#121212]">Kuala Lumpur</option>
                <option value="Penang" className="bg-[#121212]">Penang</option>
                <option value="Sabah" className="bg-[#121212]">Sabah</option>
                <option value="Sarawak" className="bg-[#121212]">Sarawak</option>
                <option value="Johor" className="bg-[#121212]">Johor</option>
              </select>
            </div>

            <div className="border-t border-white/5 my-1" />

            <div className="bg-[#121212] p-3 rounded-lg border border-white/5 text-left relative text-2xs md:text-xs font-mono text-white/50 break-words pr-12">
              "{getShareText()}"
              <button
                onClick={handleCopyText}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-card hover:bg-[#121212] hover:text-gold text-white/80 rounded border border-white/10 transition cursor-pointer"
                title="Copy to clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
              </button>
            </div>

            {copied && (
              <span className="text-[10px] text-emerald-400 font-mono animate-pulse self-center">
                {appLanguage === 'bm' ? 'Berjaya disalin ke papan klip!' : appLanguage === 'manglish' ? 'Copied already boss!' : 'Copied to clipboard successfully!'}
              </span>
            )}

            <div className={isSimulatorLayout ? "grid grid-cols-1 gap-2 mt-1" : "grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1"}>
              <button
                type="button"
                onClick={handleCopyText}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-interior hover:bg-card text-white border border-white/10 text-xs font-bold rounded-lg transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-gold" />
                {t('copyPhraseBtn', appLanguage)}
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition shadow cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {t('whatsappShareBtn', appLanguage)}
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-2 mt-2 border-t border-white/5 pt-3">
              <p className="text-[8px] uppercase font-mono tracking-wider text-white/40">{t('socialShareLabel', appLanguage)}</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {/* Telegram */}
                <button
                  type="button"
                  onClick={() => handleSocialShare('Telegram')}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#229ED9] border border-[#229ED9]/20 text-[9px] font-bold rounded-lg transition cursor-pointer"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                  </svg>
                  <span>Telegram</span>
                </button>

                {/* X */}
                <button
                  type="button"
                  onClick={() => handleSocialShare('X')}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[9px] font-bold rounded-lg transition cursor-pointer"
                >
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X (Twitter)</span>
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  onClick={() => handleSocialShare('Instagram')}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-[9px] font-bold rounded-lg transition hover:opacity-90 cursor-pointer"
                >
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span>Instagram</span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => handleSocialShare('Facebook')}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-[#1877F2] border border-[#1877F2]/20 text-[9px] font-bold rounded-lg transition cursor-pointer"
                >
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>

                {/* Threads */}
                <button
                  type="button"
                  onClick={() => handleSocialShare('Threads')}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#000000] hover:bg-white/5 text-white border border-white/20 text-[9px] font-bold rounded-lg transition cursor-pointer"
                >
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.27 15.688c-.688.625-1.562.937-2.625.937-1.125 0-2.031-.344-2.719-1.031-.688-.688-1.031-1.625-1.031-2.812 0-1.156.344-2.094 1.031-2.812.688-.719 1.594-1.062 2.719-1.062 1.094 0 1.969.313 2.625.938.656.625.984 1.563.984 2.813 0 1.25-.328 2.188-.984 2.83zm-1.844-4.875c0-.688-.125-1.188-.375-1.5-.25-.313-.625-.469-1.125-.469s-.875.156-1.125.469c-.25.313-.375.813-.375 1.5s.125 1.188.375 1.5c.25.313.625.469 1.125.469s.875-.156 1.125-.469c.25-.313.375-.813.375-1.5z"/>
                  </svg>
                  <span>Threads</span>
                </button>
              </div>
            </div>

            {/* Challenge Friend Button */}
            <div className="w-full mt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleChallengeFriendSubmit}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-700 text-black font-extrabold text-2xs uppercase tracking-widest rounded-xl transition shadow hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5" />
                {appLanguage === 'bm' ? 'Siarkan ke Sembang' : appLanguage === 'manglish' ? 'Post to Chats' : 'Post to Social'} ⚔
              </button>
              <button
                type="button"
                onClick={() => {
                  const stateKey = challengeState || 'Penang';
                  const deepLink = `${window.location.origin}${window.location.pathname}#challenge/${stateKey}`;
                  navigator.clipboard.writeText(deepLink);
                  
                  window.dispatchEvent(new CustomEvent('loghat_push_notification', {
                    detail: {
                      title: '🔗 Pautan Disalin / Link Copied!',
                      body: appLanguage === 'bm' ? `Pautan Cabaran ${stateKey} disalin! Hantar kepada rakan.` : `Challenge link for ${stateKey} copied! Send it to a friend.`
                    }
                  }));
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-interior hover:bg-[#1c2230] text-gold border border-white/10 hover:border-gold/30 font-extrabold text-2xs uppercase tracking-widest rounded-xl transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                {appLanguage === 'bm' ? 'Salin Pautan Sihir' : appLanguage === 'manglish' ? 'Copy Magic Link' : 'Copy Magic Link'}
              </button>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-crimson hover:bg-crimson/95 text-white font-bold rounded-xl transition text-xs w-full sm:w-auto shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            {t('playAgainBtn', appLanguage)}
          </button>
        </div>
      )}

      {/* Comfort-approved local advertisement banner */}
      {isAdVisible && ads.length > 0 && (
        <div className={`mt-6 bg-[#121212] border border-white/5 rounded-xl p-3 flex ${
          isSimulatorLayout 
            ? 'flex-nowrap flex-col gap-2.5 items-stretch' 
            : 'flex-col sm:flex-row justify-between items-start sm:items-center gap-3'
        } relative overflow-hidden animate-fadeIn min-w-0`}>
          {/* Soft blinking sponsor bulb to draw eyes gracefully */}
          <div className={`flex ${
            isSimulatorLayout ? 'flex-col items-start gap-1.5' : 'flex-row items-center gap-2.5'
          } select-none min-w-0 flex-1`}>
            <span className="text-[8px] tracking-wider font-mono font-black uppercase bg-gold/10 text-gold px-2 py-0.5 rounded border border-gold/20 shrink-0">
              Sponsor Corner
            </span>
            <div className={`text-left text-[#F5F5F5] font-semibold leading-normal min-w-0 flex-1 whitespace-normal break-words ${
              isSimulatorLayout ? 'text-[10px]' : 'text-xs'
            }`}>
              {ads[currentIdx % ads.length].business_name}
              <span className="text-white/40 font-normal"> — "{ads[currentIdx % ads.length].headline}"</span>
            </div>
          </div>

          <div className={`flex items-center gap-2.5 shrink-0 ${
            isSimulatorLayout ? 'self-start mt-0.5 justify-between w-full' : 'self-end sm:self-auto'
          }`}>
            <span className={`text-[9px] font-mono text-white/30 ${
              isSimulatorLayout ? 'inline' : 'hidden md:inline'
            }`}>
              100% comfort approved.
            </span>
            <button
              onClick={() => setIsAdVisible(false)}
              className="text-[9px] font-mono font-bold text-crimson hover:text-white hover:bg-crimson/90 bg-crimson/10 border border-crimson/25 px-2 py-1 rounded transition duration-200 cursor-pointer uppercase shrink-0"
              title="Hide sponsored advertisement"
            >
              Hide Ad 🙈
            </button>
          </div>
        </div>
      )}

      {/* Quiz Interstitial Ad — every 3rd question */}
      <InterstitialAd
        ads={ads}
        isVisible={showQuizInterstitial}
        onDismiss={() => setShowQuizInterstitial(false)}
        dismissDelay={3}
        context="quiz_between_questions"
      />

      {/* Rewarded Ad — watch to reveal correct answer or unlock quiz pass */}
      <RewardedAd
        ads={ads}
        isVisible={showRewardedAd}
        onComplete={() => {
          setShowRewardedAd(false);
          if (rewardType === 'reveal_hint') {
            setRewardedHintUnlocked(true);
          } else {
            // Unlock quiz by decrementing the count
            localStorage.setItem('loghat_quizzes_played', JSON.stringify({
              date: new Date().toISOString().split('T')[0],
              count: Math.max(0, getQuizzesPlayedToday() - 1)
            }));
            setShowLimitNotice(false);
          }
        }}
        onSkip={() => setShowRewardedAd(false)}
        rewardLabel={rewardType === 'reveal_hint' ? 'Reveal the correct answer' : 'Unlock 1 Quiz Pass'}
      />
    </div>
  );
}

