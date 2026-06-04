import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Send, 
  Share2, 
  Award, 
  Sparkles, 
  Plus, 
  User, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Flame,
  ThumbsUp,
  Smile
} from 'lucide-react';
import { ALL_BADGES } from '../data/dialectData';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  isUltra?: boolean;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  rank: string;
  badge?: string;
  text: string;
  likes: number;
  comments: Comment[];
  isLikedByUser?: boolean;
  type?: 'general' | 'challenge' | 'slang_share';
  challengeDetails?: {
    challengerScore: number;
    stateFocus: string;
    challengerName: string;
  };
  timestamp: string;
  isUltra?: boolean;
}

import { Language, t } from '../utils/i18n';

interface SocialFeedProps {
  isInsideSimulator?: boolean;
  onAcceptChallenge?: (stateFocus: string) => void;
  userProfile?: {
    displayName?: string;
    originState?: string;
    heritageState?: string;
    premiumTier?: 'none' | 'adfree' | 'ultra';
  };
  appLanguage?: Language;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: 'Otai Kedah 🌾',
    avatar: '🌾',
    rank: 'Legend Kampung',
    badge: '👑 Legend Kampung',
    text: 'Awat hangpa ketegaq sangat ni? Baru je score 90% dekat Dialect IQ Quiz Kedah. Sapa berani cabar ambo? Let\'s go! ⚡',
    likes: 42,
    isLikedByUser: false,
    type: 'challenge',
    challengeDetails: {
      challengerScore: 90,
      stateFocus: 'Kedah',
      challengerName: 'Otai Kedah'
    },
    comments: [
      {
        id: 'c-1',
        author: 'Budak City KL 🏢',
        avatar: '🏢',
        text: 'Laju sangat kuiz dia bang, keliru dengan slang utara yang lain haha.',
        timestamp: '10m ago'
      },
      {
        id: 'c-2',
        author: 'Kak Ros Nyonya 🎭',
        avatar: '🎭',
        text: 'Nanti saya try cabar! Tunggu saya habis lunch roti canai lu.',
        timestamp: '5m ago'
      }
    ],
    timestamp: '25m ago'
  },
  {
    id: 'post-2',
    author: 'Preservationist Bot 🤖',
    avatar: '🤖',
    rank: 'Loghat System',
    badge: '🛡️ Preserver',
    text: '📢 WIKI UPDATE: Perkataan "Loqlaq" (Sloppy/Unruly) telah disahkan secara rasmi dalam Loghat-Dex dengan 15 upvote daripada komuniti Utara. Terima kasih para penyumbang! 🎨',
    likes: 89,
    isLikedByUser: false,
    type: 'slang_share',
    comments: [],
    timestamp: '1h ago'
  },
  {
    id: 'post-3',
    author: 'Sumandak Sabah ⛰️',
    avatar: '⛰️',
    rank: 'Anak Jati',
    badge: '⛰️ Sabah Aramaitii',
    text: 'Kawan-kawan, tau kah kamurang beza slang Sabah "Aramaitii" dengan Sarawak "Oha"? Dua-dua pun cheers tapi vibes lain-lain! Dusun vs Iban. Menarik betul kan bahasa kita! 🇲🇾',
    likes: 56,
    isLikedByUser: false,
    type: 'general',
    comments: [
      {
        id: 'c-3',
        author: 'Hornbill King 🐦',
        avatar: '🐦',
        text: 'Betul ya! Oha itu sinonim dengan perpaduan dan semangat Sarawak. Mun kitak datang Kuching kelak kamek tunjuk beza dia!',
        timestamp: '45m ago'
      }
    ],
    timestamp: '2h ago'
  },
  {
    id: 'post-4',
    author: 'Budak Kelate Jati 👑',
    avatar: '👑',
    rank: 'Legend Kampung',
    badge: '👑 Kelantan Jati',
    text: 'Sapo nak lawan Dialect IQ kelate dengan ambo? Cabar ambo sekarang! Ambo bagi diskaun 3 soalan salah pun bulih menang lagi nih. 😂 Koya molek demo!',
    likes: 24,
    isLikedByUser: false,
    type: 'challenge',
    challengeDetails: {
      challengerScore: 100,
      stateFocus: 'Kelantan',
      challengerName: 'Budak Kelate Jati'
    },
    comments: [
      {
        id: 'c-4',
        author: 'Amoi Penang 🍜',
        avatar: '🍜',
        text: 'Susah la kelate slang. Paling susah nak tangkap bunyi suku kata belakang tu haha.',
        timestamp: '1h ago'
      }
    ],
    timestamp: '4h ago'
  }
];

export default function SocialFeed({ isInsideSimulator, onAcceptChallenge, userProfile, appLanguage = 'manglish' }: SocialFeedProps) {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const stored = localStorage.getItem('loghat_social_posts');
      return stored ? JSON.parse(stored) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [newPostText, setNewPostText] = useState('');
  const [postType, setPostType] = useState<'general' | 'challenge'>('general');
  const [challengeState, setChallengeState] = useState('Penang');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<'all' | 'challenge' | 'slang'>('all');

  const [pulseIndex, setPulseIndex] = useState(0);
  const pulseMessages = [
    appLanguage === 'bm' ? "🔥 Ali baru sahaja mendapat skor 100% dalam Kuiz Kedah!" : "🔥 Ali just scored 100% in the Kedah Quiz!",
    appLanguage === 'bm' ? "💡 Budak Johor mencadangkan perkataan 'Kememeh' untuk verifikasi." : "💡 Budak Johor proposed the word 'Kememeh' for verification.",
    appLanguage === 'bm' ? "🎉 Rakan rujukan LGT-WAU-4819 baru sahaja menebus RM5!" : "🎉 Referral friend LGT-WAU-4819 just redeemed RM5!",
    appLanguage === 'bm' ? "👑 Kawan Sabah menaik taraf ke Ultra Premium! Tahniah!" : "👑 Kawan Sabah upgraded to Ultra Premium! Congratulations!",
    appLanguage === 'bm' ? "📈 14 pengguna baru sedang meneroka kamus di Melaka hotspot." : "📈 14 new users are exploring dictionary slangs in Melaka hotspots.",
    appLanguage === 'bm' ? "🧠 Cabaran baru: Lagenda Kampung menanti pencabar di arena Kelantan!" : "🧠 New Challenge: Kampung Legend is waiting for challengers in the Kelantan arena!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % pulseMessages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [pulseMessages.length]);

  // Load level and rank
  const bestScore = parseInt(localStorage.getItem('loghat_best_score') || '0', 10);
  const bestRank = localStorage.getItem('loghat_best_rank') || 'Tourist';

  // Load local profile coordinates dynamically to keep in sync
  const [userExtProfile, setUserExtProfile] = useState({
    displayName: 'Kawan Loghat',
    originState: 'Penang',
    heritageState: 'Other'
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('loghat_user_profile_extended');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserExtProfile({
          displayName: parsed.displayName || 'Kawan Loghat',
          originState: parsed.originState || 'Penang',
          heritageState: parsed.heritageState || 'Other'
        });
      }
    } catch (e) {}
  }, [userProfile]); // refresh if parent updates

  useEffect(() => {
    localStorage.setItem('loghat_social_posts', JSON.stringify(posts));
  }, [posts]);

  // Track likes count to unlock like badges
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const nextLiked = !post.isLikedByUser;
        
        // Handle badge unlock for likes
        if (nextLiked) {
          const currentLikesCount = parseInt(localStorage.getItem('loghat_stats_feed_likes') || '0', 10) + 1;
          localStorage.setItem('loghat_stats_feed_likes', currentLikesCount.toString());
          
          if (currentLikesCount >= 5) {
            unlockBadgeId('social_liker');
          }
        }

        return {
          ...post,
          isLikedByUser: nextLiked,
          likes: nextLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const authorName = userExtProfile.displayName;
    const authorAvatar = userExtProfile.heritageState === 'Malay' ? '🇲🇾' : '🥤';

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: authorName,
      avatar: authorAvatar,
      text: commentText,
      timestamp: 'Just now',
      isUltra: userProfile?.premiumTier === 'ultra'
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({
      ...prev,
      [postId]: ''
    }));

    // Unlock comment badge
    unlockBadgeId('social_talkative');
  };

  // Create Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const authorName = userExtProfile.displayName;
    const authorAvatar = userExtProfile.heritageState === 'Malay' ? '🇲🇾' : '🥤';
    
    // Auto-badge based on selected origin state
    const stateBadgeMap: Record<string, string> = {
      'Penang': '🍜 Penang Boss',
      'Kedah': '🌾 Kedah Royalty',
      'Kelantan': '👑 Kelantan Jati',
      'Terengganu': '🐢 Pakar Ganu',
      'Negeri Sembilan': '🐃 Den Alih Kito',
      'Sabah': '⛰️ Sabah Aramaitii',
      'Sarawak': '🐦 Otai Sarawak',
      'Johor': '🐅 Budak Johor',
      'Kuala Lumpur': '🏢 KL Slicker',
      'Perak': '🪙 Perak Pioneer',
      'Pahang': '🐘 Otai Pahang',
      'Melaka': '🏰 Melaka Otai',
      'Perlis': '🥭 Budak Perlis'
    };
    
    const origin = userExtProfile.originState || 'Penang';
    const stateBadge = stateBadgeMap[origin] || '🌱 Loghat Novice';

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: authorName,
      avatar: authorAvatar,
      rank: bestRank,
      badge: userProfile?.premiumTier === 'ultra' ? '👑 Ultra Premium' : stateBadge,
      text: newPostText,
      likes: 0,
      isLikedByUser: false,
      type: postType,
      timestamp: 'Just now',
      comments: [],
      isUltra: userProfile?.premiumTier === 'ultra'
    };

    if (postType === 'challenge') {
      newPost.challengeDetails = {
        challengerScore: bestScore > 0 ? bestScore : 70,
        stateFocus: challengeState,
        challengerName: authorName
      };
    }

    setPosts(prev => [newPost, ...prev]);
    setNewPostText('');
    setPostType('general');

    // Unlock poster badge
    unlockBadgeId('social_poster');
  };

  const unlockBadgeId = (badgeId: string) => {
    try {
      const stored = localStorage.getItem('loghat_unlocked_badge_ids');
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (!list.includes(badgeId)) {
        list.push(badgeId);
        localStorage.setItem('loghat_unlocked_badge_ids', JSON.stringify(list));
      }
    } catch {}
  };

  const handleAcceptChallengeClick = (stateFocus: string) => {
    if (onAcceptChallenge) {
      // Unlock challenge accepted badge
      unlockBadgeId('social_challenger');
      onAcceptChallenge(stateFocus);
    }
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'challenge') return post.type === 'challenge';
    if (filter === 'slang') return post.type === 'slang_share';
    return true;
  });

  return (
    <div className={`flex flex-col gap-5 bg-[#07090e] border border-cyan-500/10 p-5 rounded-3xl shadow-2xl relative w-full ${isInsideSimulator ? 'max-w-2xl mx-auto pb-24 px-2' : 'pb-10'}`}>
      
      {/* Header Banner */}
      <div className="border border-cyan-500/10 bg-gradient-to-r from-[#0c1424] to-[#080d15] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 relative overflow-hidden shadow-lg shadow-cyan-950/10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none" />
        <div className="space-y-1 text-left">
          <h2 className="text-sm sm:text-base font-extrabold text-cyan-400 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400 animate-pulse" />
            {t('socialFeedTitle', appLanguage)}
          </h2>
          <p className="text-[10px] sm:text-2xs text-white/60 leading-relaxed">
            {t('socialFeedSubtitle', appLanguage)}
          </p>
        </div>
        <div className="shrink-0 h-10 w-10 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/20">
          <Flame className="w-5 h-5 text-crimson" />
        </div>
      </div>

      {/* Community Activity Pulse Ticker */}
      <div className="bg-[#0b101b] border border-cyan-500/15 rounded-xl p-2.5 flex items-center gap-2 overflow-hidden shadow-inner text-left animate-slideDown">
        <span className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[9px] font-bold text-white/40 uppercase font-mono tracking-wider shrink-0 select-none">PULSE:</span>
        <div className="flex-1 min-w-0 transition-all duration-500 transform translate-y-0">
          <p className="text-[10px] font-bold text-emerald-400 truncate animate-pulse">
            {pulseMessages[pulseIndex]}
          </p>
        </div>
      </div>

      {/* COMPOSER / POST CREATOR */}
      <form onSubmit={handleCreatePost} className="bg-[#0b101b] border border-cyan-500/15 rounded-2xl p-4 flex flex-col gap-3 hover:border-cyan-500/30 transition-all duration-300">
        <div className="flex gap-2.5 items-start">
          <div className="h-8 w-8 rounded-full bg-[#060910] border border-white/10 flex items-center justify-center text-sm shrink-0">
            {userExtProfile.heritageState === 'Malay' ? '🇲🇾' : '🥤'}
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder={appLanguage === 'bm' ? 'Kongsi slang menarik atau cabar komuniti...' : appLanguage === 'manglish' ? 'Share slangs or challenge friends lah...' : 'Share interesting slangs or challenge the community...'}
              rows={isInsideSimulator ? 2 : 3}
              className="w-full bg-[#060910] border border-white/5 text-white placeholder:text-white/35 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 border-t border-white/5 pt-3">
          {/* Post category settings */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPostType('general')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition ${
                postType === 'general'
                  ? 'bg-crimson/10 text-crimson border-crimson/25'
                  : 'bg-[#121212] text-white/40 border-white/5'
              }`}
            >
              {t('statusGeneralBtn', appLanguage)}
            </button>
            <button
              type="button"
              onClick={() => setPostType('challenge')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border transition ${
                postType === 'challenge'
                  ? 'bg-gold/10 text-gold border-gold/25'
                  : 'bg-[#121212] text-white/40 border-white/5'
              }`}
            >
              {t('challengeQuizBtn', appLanguage)}
            </button>
          </div>

          {/* If challenge type selected, show state selector */}
          {postType === 'challenge' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono text-white/40 uppercase">{t('stateFocusLabel', appLanguage)}</span>
              <select
                value={challengeState}
                onChange={(e) => setChallengeState(e.target.value)}
                className="bg-[#121212] border border-white/10 rounded-lg text-[9px] font-bold text-white px-2 py-1 focus:outline-none focus:border-gold"
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
          )}

          <button
            type="submit"
            disabled={!newPostText.trim()}
            className={`px-4 py-2 font-black text-2xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 ${
              newPostText.trim()
                ? 'bg-crimson hover:bg-crimson/90 text-white cursor-pointer'
                : 'bg-[#121212] text-white/20 border border-white/5 cursor-not-allowed'
            }`}
          >
            <Plus className="w-3 h-3" />
            {t('postBtn', appLanguage)}
          </button>
        </div>
      </form>

      {/* FILTER NAV TABS */}
      <div className="flex gap-2 justify-start border-b border-white/5 pb-1">
        {(['all', 'challenge', 'slang'] as const).map((f) => {
          const labels = {
            all: appLanguage === 'bm' ? 'Semua Sembang' : appLanguage === 'manglish' ? 'All Chats' : 'All Chats',
            challenge: appLanguage === 'bm' ? '🔥 Cabaran IQ' : appLanguage === 'manglish' ? '🔥 IQ Tests' : '🔥 IQ Challenges',
            slang: appLanguage === 'bm' ? '📚 Kamus Baru' : appLanguage === 'manglish' ? '📚 Dictionary' : '📚 Wiki Updates'
          };
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-[10px] font-bold border-b-2 transition ${
                isActive 
                  ? 'border-gold text-gold font-extrabold'
                  : 'border-transparent text-white/45 hover:text-white'
              }`}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      {/* POSTS LIST */}
      <div className="space-y-4 text-left">
        {filteredPosts.length === 0 ? (
          <div className="py-10 border border-dashed border-white/10 rounded-2xl text-center bg-card">
            <p className="text-xs text-white/45">{appLanguage === 'bm' ? 'Tiada post ditemui untuk penapis ini.' : appLanguage === 'manglish' ? 'No posts found under this filter boss.' : 'No posts found in this filter.'}</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isChallengerType = post.type === 'challenge';
            const isSlangShare = post.type === 'slang_share';

            return (
              <div 
                key={post.id} 
                className={`bg-[#182030] border rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 border-cyan-500/10 hover:border-cyan-500/30 hover:bg-[#1d273a] shadow-md ${
                  isChallengerType ? 'shadow-[0_0_15px_rgba(255,215,0,0.08)] bg-gradient-to-b from-[#241f17] to-[#182030] hover:from-[#2a241a] hover:to-[#1d273a]' : ''
                }`}
              >
                {/* Author Info header */}
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center text-sm shrink-0">
                      {post.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-black truncate flex items-center gap-0.5 ${
                          post.isUltra 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-gold font-extrabold drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]' 
                            : 'text-white'
                        }`}>
                          {post.author} {post.isUltra && '👑'}
                        </span>
                        {post.badge && (
                          <span className={`text-[7px] font-mono tracking-tight font-extrabold px-1 rounded flex items-center gap-0.5 whitespace-nowrap shrink-0 border ${
                            post.isUltra 
                              ? 'bg-gold text-black border-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]' 
                              : 'bg-gold/10 text-gold border-gold/15'
                          }`}>
                            {post.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[8px] text-white/45 font-mono">
                        <span>{post.rank === 'Legend Kampung' ? (appLanguage === 'bm' ? 'Lagenda Kampung' : appLanguage === 'manglish' ? 'Kampung Legend' : 'Legend Kampung') : 
                               post.rank === 'Anak Jati' ? (appLanguage === 'bm' ? 'Anak Jati' : appLanguage === 'manglish' ? 'Local Expert' : 'Anak Jati') :
                               post.rank === 'Budak City' ? (appLanguage === 'bm' ? 'Budak Kota' : appLanguage === 'manglish' ? 'City Kid' : 'Budak City') :
                               (appLanguage === 'bm' ? 'Pelancong' : appLanguage === 'manglish' ? 'Tourist' : 'Tourist')}</span>
                        <span>•</span>
                        <Clock className="w-2.5 h-2.5" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[7px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                    isChallengerType 
                      ? 'bg-gold/10 text-gold border border-gold/20' 
                      : isSlangShare 
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-white/5 text-white/50'
                  }`}>
                    {post.type === 'challenge' ? (appLanguage === 'bm' ? 'CABARAN' : appLanguage === 'manglish' ? 'CHALLENGE' : 'CHALLENGE') :
                     post.type === 'slang_share' ? (appLanguage === 'bm' ? 'KONGSI SLANG' : appLanguage === 'manglish' ? 'SLANG SHARE' : 'SLANG SHARE') :
                     (appLanguage === 'bm' ? 'UMUM' : appLanguage === 'manglish' ? 'TALK' : 'GENERAL')}
                  </span>
                </div>

                {/* Text Content */}
                <p className="text-xs text-white/95 leading-relaxed whitespace-pre-wrap">
                  {post.text}
                </p>

                {/* Challenge specific card block */}
                {isChallengerType && post.challengeDetails && (
                  <div className="bg-gradient-to-br from-gold/5 to-crimson/5 border border-gold/15 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-0.5">
                      <p className="text-[8px] uppercase tracking-widest font-bold font-mono text-[#E31C25]">{appLanguage === 'bm' ? 'Perlawanan Dialek Interaktif' : appLanguage === 'manglish' ? 'Interactive Dialect Match' : 'Interactive Dialect Match'}</p>
                      <h4 className="text-xs font-black text-white flex items-center gap-1">
                        🏆 {appLanguage === 'bm' ? 'Negeri Cabaran:' : appLanguage === 'manglish' ? 'Challenge State:' : 'Challenge State:'} <span className="text-gold font-mono">{post.challengeDetails.stateFocus}</span>
                      </h4>
                      <p className="text-[10px] text-white/60">
                        {appLanguage === 'bm' ? 'Sasaran Pencabar:' : appLanguage === 'manglish' ? 'Challenger Target:' : 'Challenger Target:'} <b className="text-white font-mono">{post.challengeDetails.challengerScore}%</b> {appLanguage === 'bm' ? 'skor' : 'score'}.
                      </p>
                    </div>
                    <button
                      onClick={() => handleAcceptChallengeClick(post.challengeDetails!.stateFocus)}
                      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-700 text-black font-extrabold text-2xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 shadow cursor-pointer"
                    >
                      <span>{t('playMatchBtn', appLanguage)}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Actions Row */}
                <div className="flex gap-4 border-t border-white/5 pt-2 text-[10px] font-bold text-white/45">
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1 hover:text-[#E31C25] transition cursor-pointer ${
                      post.isLikedByUser ? 'text-crimson' : ''
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.isLikedByUser ? 'fill-current text-crimson' : ''}`} />
                    <span>{post.likes} {appLanguage === 'bm' ? 'Suka' : 'Likes'}</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.comments.length} {appLanguage === 'bm' ? 'Komen' : 'Comments'}</span>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="bg-[#0d121c]/80 border border-cyan-500/10 rounded-xl p-3 space-y-2.5">
                  {post.comments.length > 0 && (
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-2 items-start text-xs border-b border-white/5 last:border-transparent pb-1.5 last:pb-0">
                          <div className="h-5 w-5 bg-card border border-white/10 rounded-full flex items-center justify-center text-[10px] shrink-0">
                            {comment.avatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`font-extrabold text-[10px] leading-none flex items-center gap-0.5 ${
                                comment.isUltra 
                                  ? 'text-gold drop-shadow-[0_0_4px_rgba(212,175,55,0.3)]' 
                                  : 'text-white'
                              }`}>
                                {comment.author} {comment.isUltra && '👑'}
                              </span>
                              <span className="text-[7px] text-white/30 font-mono leading-none">{comment.timestamp}</span>
                            </div>
                            <p className="text-[10px] text-white/70 leading-normal mt-0.5 whitespace-normal break-words">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment Form */}
                  <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={appLanguage === 'bm' ? 'Tulis komen...' : appLanguage === 'manglish' ? 'Write reply...' : 'Add a comment...'}
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      className="flex-1 bg-[#05080e] border border-cyan-500/10 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      disabled={!commentInputs[post.id]?.trim()}
                      className={`p-1.5 rounded-lg border transition ${
                        commentInputs[post.id]?.trim()
                          ? 'bg-crimson border-transparent text-white hover:bg-crimson/95 cursor-pointer'
                          : 'bg-[#121212] border-white/5 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
