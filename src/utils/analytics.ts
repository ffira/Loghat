// Analytics tracker for Loghat — stores user behavior data in localStorage
// This data can be exported for business intelligence and ad targeting

export interface AnalyticsEvent {
  type: 'tab_switch' | 'quiz_complete' | 'quiz_answer' | 'word_search' | 'word_view' | 'ad_impression' | 'ad_click' | 'ad_dismiss' | 'upvote' | 'sponsor_react' | 'premium_prompt' | 'session_start';
  payload: Record<string, any>;
  timestamp: string;
}

export interface AnalyticsStore {
  sessionCount: number;
  totalEvents: number;
  events: AnalyticsEvent[]; // last 500 events
  dialectHeatmap: Record<string, number>; // state -> view count
  dialectSearches: Record<string, number>; // search term -> count
  tabVisits: Record<string, number>; // tab name -> visit count
  adImpressions: number;
  adClicks: number;
  adDismissals: number;
  quizCompletions: number;
  quizTotalScore: number;
  avgTimePerQuizMs: number;
  premiumPromptCount: number;
  lastActiveDate: string;
  firstSeenDate: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

const STORAGE_KEY = 'loghat_analytics';
const MAX_EVENTS = 500;

function getStore(): AnalyticsStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  
  return {
    sessionCount: 0,
    totalEvents: 0,
    events: [],
    dialectHeatmap: {},
    dialectSearches: {},
    tabVisits: {},
    adImpressions: 0,
    adClicks: 0,
    adDismissals: 0,
    quizCompletions: 0,
    quizTotalScore: 0,
    avgTimePerQuizMs: 0,
    premiumPromptCount: 0,
    lastActiveDate: new Date().toISOString(),
    firstSeenDate: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    screenWidth: typeof window !== 'undefined' ? window.screen.width : 0,
    screenHeight: typeof window !== 'undefined' ? window.screen.height : 0,
  };
}

function saveStore(store: AnalyticsStore): void {
  try {
    store.lastActiveDate = new Date().toISOString();
    // Keep only last MAX_EVENTS events to avoid localStorage bloat
    if (store.events.length > MAX_EVENTS) {
      store.events = store.events.slice(-MAX_EVENTS);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

export function trackEvent(type: AnalyticsEvent['type'], payload: Record<string, any> = {}): void {
  const store = getStore();
  store.totalEvents++;
  store.events.push({
    type,
    payload,
    timestamp: new Date().toISOString(),
  });

  // Update aggregate counters
  switch (type) {
    case 'tab_switch':
      store.tabVisits[payload.tab] = (store.tabVisits[payload.tab] || 0) + 1;
      break;
    case 'ad_impression':
      store.adImpressions++;
      break;
    case 'ad_click':
      store.adClicks++;
      break;
    case 'ad_dismiss':
      store.adDismissals++;
      break;
    case 'quiz_complete':
      store.quizCompletions++;
      store.quizTotalScore += (payload.score || 0);
      break;
    case 'word_search':
      if (payload.term) {
        store.dialectSearches[payload.term] = (store.dialectSearches[payload.term] || 0) + 1;
      }
      break;
    case 'word_view':
      if (payload.state) {
        store.dialectHeatmap[payload.state] = (store.dialectHeatmap[payload.state] || 0) + 1;
      }
      break;
    case 'premium_prompt':
      store.premiumPromptCount++;
      break;
    case 'session_start':
      store.sessionCount++;
      store.userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      store.screenWidth = typeof window !== 'undefined' ? window.screen.width : 0;
      store.screenHeight = typeof window !== 'undefined' ? window.screen.height : 0;
      break;
  }

  saveStore(store);
}

export function getAnalytics(): AnalyticsStore {
  return getStore();
}

export function getAdTargetingData(): Record<string, any> {
  const store = getStore();
  // Compute top interests for ad targeting
  const topStates = Object.entries(store.dialectHeatmap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([state]) => state);
  
  const topTabs = Object.entries(store.tabVisits)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([tab]) => tab);

  return {
    userInterests: topStates,
    preferredSections: topTabs,
    engagementLevel: store.totalEvents > 100 ? 'high' : store.totalEvents > 30 ? 'medium' : 'low',
    isPotentialPremium: store.premiumPromptCount >= 2 && store.adDismissals > 5,
    quizEngagement: store.quizCompletions,
    sessionCount: store.sessionCount,
    adResponseRate: store.adImpressions > 0 ? (store.adClicks / store.adImpressions * 100).toFixed(1) + '%' : '0%',
  };
}
