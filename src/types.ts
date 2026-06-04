export type PrimaryLanguage = 'Malay' | 'Chinese' | 'English' | 'Tamil';

export type ContextOfUse = 'Slang' | 'Formal' | 'Insult' | 'Endearment';

export interface DialectEntry {
  id: string;
  word_name: string;
  primary_language: PrimaryLanguage;
  dialect_type: string; // e.g., 'Logat Utara', 'Kelantanese', 'Sabahan', 'Sarawakian', 'Manglish', 'Penang Hokkien', 'Negeri Sembilan'
  state_origin: string; // e.g., 'Kedah', 'Kelantan', 'Terengganu', 'Sabah', 'Sarawak', 'Penang', 'Negeri Sembilan', 'Federal Territory', 'Johor', 'Selangor'
  standard_bm_equivalent: string;
  english_equivalent: string;
  context_of_use: ContextOfUse;
  explanation: string;
  example_sentence: string;
  verified_status: boolean;
  upvote_count: number;
  audio_url?: string; // or simulated synthetic audio helper
}

export interface QuizQuestion {
  id: string;
  category: 'Malay Dialect' | 'Manglish' | 'Chinese-influenced Slang' | 'Wildcard';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export type QuizRank = 'Tourist' | 'Budak City' | 'Anak Jati' | 'Legend Kampung';

export interface PendingEdit {
  id: string;
  word_id?: string; // if it's editing an existing word, otherwise it's a new word suggestion
  word_name: string;
  dialect_type: string;
  state_origin: string;
  primary_language: PrimaryLanguage;
  proposed_correction: {
    standard_bm_equivalent: string;
    english_equivalent: string;
    example_sentence: string;
  };
  submitted_by: string;
  timestamp: string;
  sah_votes: number;
  voted_by_user: boolean;
}

export interface SurvivalPhrase {
  id: string;
  phrase: string;
  pronunciation: string;
  english_meaning: string;
  context: 'Mamak' | 'Transport' | 'Shopping' | 'Social';
  tips: string;
}

export interface SponsorAd {
  id: string;
  business_name: string;
  headline: string;
  description: string;
  category: 'Food & Beverage' | 'Services' | 'Automotive' | 'Retail' | 'Lifestyle';
  state_origin: string;
  slang_element: string;
  reaction_counts: {
    sah: number;
    gostan: number;
    fuyoo: number;
  };
  submitted_by?: string;
  is_approved: boolean;
}

export interface Badge {
  id: string;
  name: string;
  category: 'State' | 'Score' | 'Social' | 'Activity' | 'Special';
  description: string;
  requirement: string;
  icon: string;
}
