import { useState, useEffect, useRef, FormEvent } from 'react';
import { DialectEntry, ContextOfUse, PrimaryLanguage, SponsorAd } from '../types';
import { Search, Volume2, ThumbsUp, Filter, Plus, Edit, CornerDownRight, CheckCircle2, Megaphone, Mic, Trash2, Play, Square } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { Language } from '../utils/i18n';

interface DialectDexProps {
  entries: DialectEntry[];
  selectedState: string | null;
  onUpvoteEntry: (id: string) => void;
  onAddEntry: (entry: Omit<DialectEntry, 'id' | 'upvote_count' | 'verified_status'>, customVoice?: string) => void;
  onEditProposal: (wordId: string, wordName: string, corrections: { standard_bm_equivalent: string; english_equivalent: string; example_sentence: string }, customVoice?: string) => void;
  sponsorAds?: SponsorAd[];
  isInsideSimulator?: boolean;
  appLanguage?: Language;
}

export default function DialectDex({
  entries,
  selectedState,
  onUpvoteEntry,
  onAddEntry,
  onEditProposal,
  sponsorAds = [],
  isInsideSimulator = false,
  appLanguage = 'manglish',
}: DialectDexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialectFilter, setDialectFilter] = useState<string>('All');
  const [useContextFilter, setUseContextFilter] = useState<string>('All');
  const [itemsToShow, setItemsToShow] = useState(20);

  // Reset pagination on filter or search changes
  useEffect(() => {
    setItemsToShow(20);
  }, [searchTerm, dialectFilter, useContextFilter, selectedState]);

  // Listen for deep link word highlighting events
  useEffect(() => {
    const handleHighlightWord = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail && customEv.detail.id) {
        setSearchTerm(customEv.detail.id);
        setDialectFilter('All');
        setUseContextFilter('All');
      }
    };
    window.addEventListener('loghat_highlight_word', handleHighlightWord);
    return () => window.removeEventListener('loghat_highlight_word', handleHighlightWord);
  }, []);

  // Modal / Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<string | null>(null); // holds word ID
  const [playingId, setPlayingId] = useState<string | null>(null);

  // AI Voice & Voice Recording States
  const [voiceNoticeWordId, setVoiceNoticeWordId] = useState<string | null>(null);
  const voiceNoticeTimer = useRef<any>(null);
  const [autoRecordPrompt, setAutoRecordPrompt] = useState(false);

  // Recorder states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recorderInstance, setRecorderInstance] = useState<MediaRecorder | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingIntervalId, setRecordingIntervalId] = useState<any>(null);
  const [tempBase64Voice, setTempBase64Voice] = useState<string | null>(null);

  // Add Form Local State
  const [newWordName, setNewWordName] = useState('');
  const [newDialectType, setNewDialectType] = useState('Logat Utara');
  const [newStateOrigin, setNewStateOrigin] = useState('Kedah');
  const [newLanguage, setNewLanguage] = useState<PrimaryLanguage>('Malay');
  const [newStandardBM, setNewStandardBM] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newContextOfUse, setNewContextOfUse] = useState<ContextOfUse>('Slang');
  const [newExplanation, setNewExplanation] = useState('');
  const [newExampleSentence, setNewExampleSentence] = useState('');

  // Edit Proposal Local State
  const [editStandardBM, setEditStandardBM] = useState('');
  const [editEnglish, setEditEnglish] = useState('');
  const [editExampleSentence, setEditExampleSentence] = useState('');

  // Audio Playback with Web Speech Synthesis or User Recorded Voice
  const playWordAudio = (entry: DialectEntry) => {
    // 1. Check if a custom recorded voice exists in localStorage
    const savedVoice = localStorage.getItem(`loghat_custom_voice_${entry.id}`);
    if (savedVoice) {
      setPlayingId(entry.id);
      try {
        const audio = new Audio(savedVoice);
        audio.onended = () => setPlayingId(null);
        audio.onerror = () => {
          setPlayingId(null);
          playSpeechSynthesisFallback(entry);
        };
        audio.play();
      } catch (err) {
        setPlayingId(null);
        playSpeechSynthesisFallback(entry);
      }
    } else {
      // 2. Play speech synthesis, and pop out the notice!
      playSpeechSynthesisFallback(entry);
    }
  };

  const playSpeechSynthesisFallback = (entry: DialectEntry) => {
    if ('speechSynthesis' in window) {
      setPlayingId(entry.id);
      
      // Stop ongoing voice syntheses
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(entry.word_name);
      // Try to find a Malay or close equivalent voice
      const voices = window.speechSynthesis.getVoices();
      const localizedVoice = voices.find(
        (v) => v.lang.includes('id-ID') || v.lang.includes('ms-MY') || v.lang.includes('en-GB')
      );
      if (localizedVoice) {
        utterance.voice = localizedVoice;
      }
      utterance.rate = 0.85; // slightly slower for clearer dialect study

      utterance.onend = () => {
        setPlayingId(null);
      };
      utterance.onerror = () => {
        setPlayingId(null);
      };

      window.speechSynthesis.speak(utterance);

      // Pop out notice
      setVoiceNoticeWordId(entry.id);
      if (voiceNoticeTimer.current) {
        clearTimeout(voiceNoticeTimer.current);
      }
      voiceNoticeTimer.current = setTimeout(() => {
        setVoiceNoticeWordId(null);
      }, 7000);
    } else {
      // Fallback sound chime simulation
      setPlayingId(entry.id);
      setTimeout(() => setPlayingId(null), 1200);
    }
  };

  // Recording functionality
  const startRecording = async () => {
    try {
      setRecordedAudioUrl(null);
      setRecordedAudioBlob(null);
      setTempBase64Voice(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudioBlob(blob);
        setRecordedAudioUrl(url);
        
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setTempBase64Voice(base64data);
        };
      };

      setRecorderInstance(recorder);
      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      
      const interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
      setRecordingIntervalId(interval);
    } catch (err) {
      console.warn('Microphone access denied or unsupported, using sandbox simulation:', err);
      // Sandbox fallback simulation
      setIsRecording(true);
      setRecordingSeconds(0);
      const interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
      setRecordingIntervalId(interval);
    }
  };

  const stopRecording = () => {
    if (recordingIntervalId) {
      clearInterval(recordingIntervalId);
      setRecordingIntervalId(null);
    }

    if (recorderInstance && recorderInstance.state !== 'inactive') {
      recorderInstance.stop();
      recorderInstance.stream.getTracks().forEach((track) => track.stop());
      setRecorderInstance(null);
      setIsRecording(false);
    } else {
      // Simulation complete
      setIsRecording(false);
      const simulatedBase64 = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA';
      setTempBase64Voice(simulatedBase64);
      setRecordedAudioUrl('simulated-audio');
    }
  };

  const playRecordedPreview = () => {
    if (recordedAudioUrl === 'simulated-audio' && tempBase64Voice) {
      const audio = new Audio(tempBase64Voice);
      audio.play();
    } else if (recordedAudioUrl) {
      const audio = new Audio(recordedAudioUrl);
      audio.play();
    }
  };

  const clearAddForm = () => {
    setNewWordName('');
    setNewStandardBM('');
    setNewEnglish('');
    setNewExplanation('');
    setNewExampleSentence('');
  };

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newWordName || !newStandardBM || !newEnglish) return;
    onAddEntry({
      word_name: newWordName,
      dialect_type: newDialectType,
      state_origin: newStateOrigin,
      primary_language: newLanguage,
      standard_bm_equivalent: newStandardBM,
      english_equivalent: newEnglish,
      context_of_use: newContextOfUse,
      explanation: newExplanation,
      example_sentence: newExampleSentence,
    }, tempBase64Voice || undefined);
    
    // Copy magic link to clipboard
    const cleanWord = encodeURIComponent(newWordName);
    const deepLink = `${window.location.origin}${window.location.pathname}#word/${cleanWord}`;
    navigator.clipboard.writeText(deepLink);

    // Dispatch push event
    window.dispatchEvent(new CustomEvent('loghat_push_notification', {
      detail: {
        title: '✏️ Cadangan Wiki Dihantar / Wiki Proposal Submitted!',
        body: appLanguage === 'bm'
          ? `Perkataan "${newWordName}" telah diserahkan! Pautan ditiru ke clipboard.`
          : `Slang "${newWordName}" has been submitted! Deep link copied to clipboard.`
      }
    }));

    clearAddForm();
    setRecordedAudioUrl(null);
    setRecordedAudioBlob(null);
    setTempBase64Voice(null);
    setAutoRecordPrompt(false);
    setShowAddModal(false);
  };

  const handleOpenEdit = (entry: DialectEntry) => {
    setEditStandardBM(entry.standard_bm_equivalent);
    setEditEnglish(entry.english_equivalent);
    setEditExampleSentence(entry.example_sentence);
    // Clear any previous recorder states
    setRecordedAudioUrl(null);
    setRecordedAudioBlob(null);
    setTempBase64Voice(null);
    setShowEditModal(entry.id);
  };

  const handleEditSubmit = (e: FormEvent, word: DialectEntry) => {
    e.preventDefault();
    onEditProposal(word.id, word.word_name, {
      standard_bm_equivalent: editStandardBM,
      english_equivalent: editEnglish,
      example_sentence: editExampleSentence,
    }, tempBase64Voice || undefined);
    
    setRecordedAudioUrl(null);
    setRecordedAudioBlob(null);
    setTempBase64Voice(null);
    setAutoRecordPrompt(false);
    setShowEditModal(null);
  };

  // Filter Logic
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.word_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.standard_bm_equivalent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.english_equivalent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.explanation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDialect = dialectFilter === 'All' || entry.dialect_type === dialectFilter;
    const matchesContext = useContextFilter === 'All' || entry.context_of_use === useContextFilter;
    const matchesState = !selectedState || entry.state_origin === selectedState;

    return matchesSearch && matchesDialect && matchesContext && matchesState;
  });

  const visibleEntries = filteredEntries.slice(0, itemsToShow);

  const dialectsTypes = ['All', 'Logat Utara', 'Perak', 'Kelantanese', 'Terengganu', 'Negeri Sembilan', 'Sabahan', 'Sarawakian', 'Labuan', 'Manglish', 'Penang Hokkien', 'Johor', 'Perlis', 'Pahang', 'Kuala Lumpur', 'Melaka'];
  const contexts = ['All', 'Slang', 'Formal', 'Insult', 'Endearment'];

  const getContextBadgeColor = (context: ContextOfUse) => {
    switch (context) {
      case 'Slang':
        return 'bg-gold/10 text-gold border-gold/30';
      case 'Formal':
        return 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30';
      case 'Insult':
        return 'bg-crimson/10 text-[#E31C25] border-crimson/30';
      case 'Endearment':
        return 'bg-pink-500/10 text-pink-300 border-pink-500/30';
    }
  };

  return (
    <div className="flex flex-col gap-6" id="loghad-dex-section">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-white/10 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-gold tracking-tight flex items-center gap-2">
            Loghat-Dex Dictionary 📖
          </h3>
          <p className="text-xs text-white/50">
            A dynamic encyclopedia of Malaysian slang. Click a state on the map above to auto-filter!
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 px-4 py-2.5 bg-crimson hover:bg-crimson/95 text-white font-bold rounded-xl text-xs transition duration-200 shadow-md"
        >
          <Plus className="w-4 h-4" />
          Propose Slang Word
        </button>
      </div>

      {/* Filters Bar — compact horizontal row on top */}
      <div className="bg-card border border-white/10 rounded-2xl p-3 flex flex-col gap-2.5">
        {/* Search Row */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search slang, equivalent, meaning..."
            className="w-full bg-interior border border-white/5 placeholder-white/20 text-white pl-8 pr-3 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-gold/40"
          />
        </div>

        {/* Dropdowns row */}
        <div className="flex gap-2">
          <select
            value={dialectFilter}
            onChange={(e) => setDialectFilter(e.target.value)}
            className="flex-1 bg-interior border border-white/5 text-white text-[10px] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold/40 min-w-0"
          >
            {dialectsTypes.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Dialects' : d}
              </option>
            ))}
          </select>
          <select
            value={useContextFilter}
            onChange={(e) => setUseContextFilter(e.target.value)}
            className="flex-1 bg-interior border border-white/5 text-white text-[10px] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold/40 min-w-0"
          >
            {contexts.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Contexts' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Map sync indicator */}
        {selectedState && (
          <div className="bg-crimson/10 text-white/80 px-3 py-2 rounded-xl border border-crimson/25 text-2xs flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3 h-3 text-crimson shrink-0" />
              Map: <b className="text-crimson">{selectedState}</b>
            </span>
            <button
              onClick={() => {
                setDialectFilter('All');
                setUseContextFilter('All');
              }}
              className="text-gold font-bold hover:underline shrink-0 text-[10px]"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Dictionary Word entries */}
      <div className="flex flex-col gap-4">
          {filteredEntries.length === 0 ? (
            <div className="bg-card border border-white/10 p-12 text-center rounded-2xl flex flex-col items-center">
              <span className="text-3xl">😞</span>
              <h4 className="text-base font-bold text-white/80 mt-2">No slang entries found</h4>
              <p className="text-xs text-white/50 max-w-sm mt-1">
                Try widening your search/dialect filters, clearing your map state selector, or add a newly proposed word!
              </p>
            </div>
          ) : (
            <>
              {visibleEntries.map((entry, idx) => (
                <>
                {/* Inline sponsored card every 5th entry */}
                {idx > 0 && idx % 5 === 0 && sponsorAds.length > 0 && (
                  <div key={`ad-${idx}`} className="bg-gradient-to-r from-gold/[0.04] to-crimson/[0.04] border border-gold/15 rounded-2xl p-4 flex items-start gap-3 select-none">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-lg shrink-0">
                      {sponsorAds[idx % sponsorAds.length]?.category === 'Food & Beverage' ? '🍜' : 
                       sponsorAds[idx % sponsorAds.length]?.category === 'Automotive' ? '🚗' : '✨'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-amber-400 text-black text-[7px] font-black px-1.5 py-0.5 rounded uppercase">Sponsored</span>
                        <span className="text-[8px] text-white/30 font-mono">{sponsorAds[idx % sponsorAds.length]?.category}</span>
                      </div>
                      <p className="text-xs font-bold text-[#F5F5F5]/90">{sponsorAds[idx % sponsorAds.length]?.business_name}</p>
                      <p className="text-[10px] text-white/50 italic mt-0.5">"{sponsorAds[idx % sponsorAds.length]?.headline}"</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[8px] font-mono text-white/25">Slang:</span>
                        <span className="text-[9px] bg-card text-gold font-mono font-bold px-1.5 py-0.5 rounded border border-white/5">
                          {sponsorAds[idx % sponsorAds.length]?.slang_element}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  key={entry.id}
                  id={`slang-card-${entry.id}`}
                  className={`bg-card border border-white/10 rounded-2xl hover:border-gold/30 transition duration-200 flex flex-col sm:flex-row justify-between items-start gap-4 shadow-lg group relative overflow-hidden ${
                    isInsideSimulator ? 'p-3' : 'p-5'
                  }`}
                >
                  {/* Visual indicator corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none transform translate-x-8 -translate-y-8 bg-gradient-to-bl from-gold/10 to-transparent rounded-full group-hover:from-gold/20 transition duration-300" />

                  {/* Left pane: core details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-lg md:text-xl font-bold text-[#F5F5F5] flex items-center gap-1.5 tracking-tight group-hover:text-gold transition">
                        {entry.word_name}
                      </h4>

                      <span className="text-2xs font-mono bg-interior px-2.5 py-0.5 rounded text-gold border border-white/5 uppercase font-semibold">
                        {entry.dialect_type}
                      </span>

                      <span className="text-2xs font-mono bg-crimson/10 text-crimson px-2 py-0.5 rounded border border-crimson/20 uppercase font-medium">
                        Origin: {entry.state_origin}
                      </span>

                      <span className={`text-2xs font-mono px-2 py-0.5 rounded border ${getContextBadgeColor(entry.context_of_use)}`}>
                        {entry.context_of_use}
                      </span>
                    </div>

                    {/* Equivalents */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 bg-interior/80 p-3 rounded-xl border border-white/5">
                      <div className="space-y-0.5">
                        <div className="text-[10px] text-white/35 uppercase tracking-widest font-mono">
                          Standard Malay Equivalent
                        </div>
                        <p className="font-semibold text-white/90 mt-0.5 break-words whitespace-normal">{entry.standard_bm_equivalent}</p>
                      </div>
                      <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-white/5 pt-2 sm:pt-0 sm:pl-3">
                        <div className="text-[10px] text-white/35 uppercase tracking-widest font-mono">
                          English Translation
                        </div>
                        <p className="font-semibold text-white/90 mt-0.5 break-words whitespace-normal">{entry.english_equivalent}</p>
                      </div>
                    </div>

                    {/* Explanation of the slang history/meaning */}
                    <p className="text-xs text-white/60 leading-relaxed max-w-3xl pr-4">
                      {entry.explanation}
                    </p>

                    {/* Examples */}
                    <div className="text-xs text-slate-300 flex items-start gap-1.5 pl-1.5 py-1">
                      <CornerDownRight className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className="italic text-slate-300 bg-interior/35 px-2 py-1 rounded max-w-full inline-block">
                        "{entry.example_sentence}"
                      </span>
                    </div>

                    {voiceNoticeWordId === entry.id && (
                      <div className="mt-3 p-3 bg-crimson/5 border border-crimson/20 rounded-xl space-y-2 text-2xs sm:text-xs">
                        <div className="text-crimson font-black uppercase tracking-wider flex items-center gap-1">
                          <span>📢 AI Voice Notice / Makluman Suara AI</span>
                        </div>
                        <p className="text-white/70 leading-normal text-left">
                          {appLanguage === 'bm'
                            ? 'Ini adalah sebutan suara AI untuk slanga ini. Kami tahu sebutannya langsung tidak tepat, harap bersabar! Bantu kami menambah baik dengan menyebut perkataan ini demi manfaat semua!'
                            : appLanguage === 'manglish'
                            ? 'This is AI-generated voice of the slang one. We know it sounds totally off, but bear with it first! Help us improve by sounding the word for everyone\'s benefit lah!'
                            : 'This is an AI-generated voice of the slang. We know it does not sound right at all, but bear with it! Help us improve by sounding the word for the benefit of others!'}
                        </p>
                        <div className="flex gap-2 justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setVoiceNoticeWordId(null);
                              handleOpenEdit(entry);
                              setAutoRecordPrompt(true);
                            }}
                            className="bg-gold hover:bg-yellow-400 text-black font-extrabold text-[9px] sm:text-[10px] px-2.5 py-1.5 rounded-lg transition"
                          >
                            {appLanguage === 'bm' ? '🎤 Sebut Perkataan' : appLanguage === 'manglish' ? '🎤 Sound word boss' : '🎤 Sound this word'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setVoiceNoticeWordId(null)}
                            className="bg-white/5 hover:bg-white/10 text-white/50 text-[9px] sm:text-[10px] px-2.5 py-1.5 rounded-lg transition"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right pane: interactivity keys */}
                  <div className="flex sm:flex-col items-center justify-end gap-2.5 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    {/* Speech synthesize button */}
                    <button
                      onClick={() => playWordAudio(entry)}
                      className={`w-10 h-10 rounded-full flex flex-col items-center justify-center transition-all ${
                        playingId === entry.id
                          ? 'bg-crimson text-white animate-pulse shadow-md shadow-black'
                          : 'bg-interior text-white/80 hover:text-gold border border-white/5 hover:border-gold/30'
                      }`}
                      title="Listen to dialect slang pronunciation"
                    >
                      <Volume2 className="w-5 h-5" />
                      {/* Simulated visual soundwave feedback */}
                      {playingId === entry.id && (
                        <span className="flex gap-0.5 mt-0.5 pointer-events-none">
                          <span className="w-0.5 h-1.5 bg-white animate-ping" />
                          <span className="w-0.5 h-2 bg-white animate-ping delay-75" />
                          <span className="w-0.5 h-1.5 bg-white animate-ping delay-150" />
                        </span>
                      )}
                    </button>

                    <div className="h-px bg-white/5 w-full hidden sm:block my-1" />

                    {/* Upvoting accuracy button */}
                    <button
                      onClick={() => onUpvoteEntry(entry.id)}
                      className="flex sm:flex-col items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-interior hover:bg-card text-white/85 hover:text-gold rounded-xl border border-white/5 hover:border-gold/35 transition text-xs font-mono font-bold w-full sm:w-16"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{entry.upvote_count}</span>
                    </button>

                    {/* Proposal Correction Edit Trigger button */}
                    <button
                      onClick={() => handleOpenEdit(entry)}
                      className="flex sm:flex-col items-center gap-1 py-2 px-3 sm:p-2 hover:bg-interior hover:text-crimson text-white/40 rounded-xl border border-transparent hover:border-white/5 duration-200 text-xs w-full sm:w-16 justify-center"
                      title="Submit a correction wiki style"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span className="sm:text-[9px] uppercase font-mono tracking-tighter">Edit</span>
                    </button>
                  </div>
                </div>
                </>
              ))}

              {filteredEntries.length > itemsToShow && (
                <button
                  onClick={() => setItemsToShow((prev) => prev + 25)}
                  className="w-full mt-2 py-3 bg-interior hover:bg-interior/80 border border-white/10 hover:border-gold/30 rounded-xl text-xs font-bold text-gold cursor-pointer transition duration-200 text-center"
                >
                  Load More Accents & Slangs ({filteredEntries.length - itemsToShow} remaining)
                </button>
              )}
            </>
          )}
        </div>

      {/* Add Slang Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-card border border-gold/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h4 className="text-lg font-black text-gold mb-2 flex items-center gap-1.5">
              💡 Propose New Slang Word entry
            </h4>
            <p className="text-xs text-white/55 mb-5">
              Submit a dialect word that isn't represented yet. Your submission goes into the "Verification Queue" for local communities to vote of its accuracy!
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Word Name (in Dialect)</label>
                  <input
                    type="text"
                    required
                    value={newWordName}
                    onChange={(e) => setNewWordName(e.target.value)}
                    placeholder="e.g. Lengkong, Belon..."
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Primary Language Group</label>
                  <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value as PrimaryLanguage)}
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-gold"
                  >
                    <option value="Malay" className="bg-[#121212]">Malay influence</option>
                    <option value="Chinese" className="bg-[#121212]">Chinese influence</option>
                    <option value="English" className="bg-[#121212]">English / Manglish</option>
                    <option value="Tamil" className="bg-[#121212]">Tamil influence</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Dialect Group</label>
                  <select
                    value={newDialectType}
                    onChange={(e) => setNewDialectType(e.target.value)}
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                  >
                    <option value="Logat Utara" className="bg-[#121212]">Logat Utara (Kedah/Penang/Perlis)</option>
                    <option value="Perak" className="bg-[#121212]">Perak (Logat Perak)</option>
                    <option value="Kelantanese" className="bg-[#121212]">Kelantanese</option>
                    <option value="Terengganu" className="bg-[#121212]">Terengganu</option>
                    <option value="Sarawakian" className="bg-[#121212]">Sarawakian</option>
                    <option value="Sabahan" className="bg-[#121212]">Sabahan (Sabah)</option>
                    <option value="Labuan" className="bg-[#121212]">Labuan (FT Labuan)</option>
                    <option value="Negeri Sembilan" className="bg-[#121212]">Negeri Sembilan</option>
                    <option value="Manglish" className="bg-[#121212]">Manglish (Malaysian Slang)</option>
                    <option value="Penang Hokkien" className="bg-[#121212]">Penang Hokkien</option>
                    <option value="Johor" className="bg-[#121212]">Johor</option>
                    <option value="Perlis" className="bg-[#121212]">Perlis</option>
                    <option value="Pahang" className="bg-[#121212]">Pahang</option>
                    <option value="Kuala Lumpur" className="bg-[#121212]">Kuala Lumpur</option>
                    <option value="Melaka" className="bg-[#121212]">Melaka</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">State Origin</label>
                  <select
                    value={newStateOrigin}
                    onChange={(e) => setNewStateOrigin(e.target.value)}
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white focus:outline-none"
                  >
                    <option value="Kedah" className="bg-[#121212]">Kedah</option>
                    <option value="Penang" className="bg-[#121212]">Penang</option>
                    <option value="Perak" className="bg-[#121212]">Perak</option>
                    <option value="Perlis" className="bg-[#121212]">Perlis</option>
                    <option value="Kelantan" className="bg-[#121212]">Kelantan</option>
                    <option value="Terengganu" className="bg-[#121212]">Terengganu</option>
                    <option value="Selangor" className="bg-[#121212]">Selangor</option>
                    <option value="Kuala Lumpur" className="bg-[#121212]">Kuala Lumpur</option>
                    <option value="Negeri Sembilan" className="bg-[#121212]">Negeri Sembilan</option>
                    <option value="Sarawak" className="bg-[#121212]">Sarawak</option>
                    <option value="Sabah" className="bg-[#121212]">Sabah</option>
                    <option value="Labuan" className="bg-[#121212]">Labuan</option>
                    <option value="Johor" className="bg-[#121212]">Johor</option>
                    <option value="Pahang" className="bg-[#121212]">Pahang</option>
                    <option value="Melaka" className="bg-[#121212]">Melaka</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Standard BM Equivalent</label>
                  <input
                    type="text"
                    required
                    value={newStandardBM}
                    onChange={(e) => setNewStandardBM(e.target.value)}
                    placeholder="e.g. Belon / Belalang"
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">English Equivalent</label>
                  <input
                    type="text"
                    required
                    value={newEnglish}
                    onChange={(e) => setNewEnglish(e.target.value)}
                    placeholder="e.g. Balloon / Dragonfly"
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Context of Use</label>
                <div className="flex gap-2">
                  {(['Slang', 'Formal', 'Insult', 'Endearment'] as ContextOfUse[]).map((ctx) => (
                    <button
                      key={ctx}
                      type="button"
                      onClick={() => setNewContextOfUse(ctx)}
                      className={`px-3 py-1.5 rounded-lg border text-2xs transition font-bold ${
                        newContextOfUse === ctx
                          ? 'bg-gold text-black border-gold'
                          : 'bg-interior border border-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {ctx}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Short History or Explanation</label>
                <textarea
                  required
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Describe where it comes from and what nuances it carries..."
                  className="bg-interior border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Example Sentence</label>
                <input
                  type="text"
                  required
                  value={newExampleSentence}
                  onChange={(e) => setNewExampleSentence(e.target.value)}
                  placeholder="Write a sentence using the dialect word..."
                  className="bg-interior border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-gold"
                />
              </div>

              {/* Voice Pronunciation Recording Field */}
              <div className="p-4 bg-[#141212] border border-white/15 rounded-xl space-y-3">
                <span className="text-[10px] text-white/45 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-gold" />
                  Add Voice Pronunciation (Sangat Digalakkan)
                </span>
                <p className="text-[10.5px] text-white/60 leading-relaxed text-left">
                  Pronounce <b>{newWordName || 'your slang word'}</b> in the native <b>{newStateOrigin}</b> dialect accent so others can learn how to say it!
                </p>
                
                <div className="flex items-center gap-3">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="flex items-center gap-1.5 px-3 py-2 bg-crimson hover:bg-crimson/95 text-white font-bold rounded-lg transition"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Start Recording</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-lg transition animate-pulse"
                    >
                      <Square className="w-3.5 h-3.5 fill-black" />
                      <span>Stop ({recordingSeconds}s)</span>
                    </button>
                  )}

                  {recordedAudioUrl && (
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <button
                        type="button"
                        onClick={playRecordedPreview}
                        className="flex items-center gap-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold rounded-lg transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Play Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRecordedAudioUrl(null);
                          setRecordedAudioBlob(null);
                          setTempBase64Voice(null);
                        }}
                        className="p-2 bg-white/5 hover:bg-white/10 hover:text-rose-500 border border-white/10 rounded-lg transition"
                        title="Delete recording"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {tempBase64Voice && (
                  <p className="text-[9px] text-emerald-400/90 font-mono">
                    ✓ Voice captured successfully! This voice will accompany the word suggestion.
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-interior hover:bg-card text-white/85 rounded-lg font-bold border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-crimson hover:bg-crimson/95 text-white font-bold rounded-lg shadow-md"
                >
                  Submit proposed slang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Correction proposal Modal */}
      {showEditModal && (() => {
        const wordToEdit = entries.find((e) => e.id === showEditModal);
        if (!wordToEdit) return null;

        return (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-card border border-crimson/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
              <h4 className="text-lg font-black text-crimson mb-1 flex items-center gap-1.5">
                ✏️ Wiki Proposed Correction: <i>{wordToEdit.word_name}</i>
              </h4>
              <p className="text-xs text-white/55 mb-4">
                You are proposing a spelling, definition, or translation improvement. Users from <b>{wordToEdit.state_origin}</b> will vote to approve this before the word is edited globally.
              </p>

              <form onSubmit={(e) => handleEditSubmit(e, wordToEdit)} className="space-y-4 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Proposed Standard BM Equivalent</label>
                  <input
                    type="text"
                    required
                    value={editStandardBM}
                    onChange={(e) => setEditStandardBM(e.target.value)}
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Proposed English translation</label>
                  <input
                    type="text"
                    required
                    value={editEnglish}
                    onChange={(e) => setEditEnglish(e.target.value)}
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/45 uppercase tracking-wider font-mono">Proposed Better Example sentence</label>
                  <textarea
                    required
                    rows={2}
                    value={editExampleSentence}
                    onChange={(e) => setEditExampleSentence(e.target.value)}
                    className="bg-interior border border-white/10 rounded-lg p-2 text-white"
                  />
                </div>

                {/* Voice Pronunciation Recording Field */}
                <div className={`p-4 bg-[#141212] border rounded-xl space-y-3 ${autoRecordPrompt ? 'border-gold ring-1 ring-gold/25 animate-fadeIn' : 'border-white/15'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/45 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-gold" />
                      Add Voice Pronunciation (Sangat Digalakkan)
                    </span>
                    {autoRecordPrompt && (
                      <span className="bg-gold text-black text-[8px] font-black px-1.5 py-0.5 rounded animate-bounce">
                        Record Here!
                      </span>
                    )}
                  </div>
                  <p className="text-[10.5px] text-white/60 leading-relaxed text-left">
                    Help us preserve <b>{wordToEdit.word_name}</b> by pronouncing it in the native <b>{wordToEdit.state_origin}</b> dialect accent!
                  </p>
                  
                  <div className="flex items-center gap-3">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="flex items-center gap-1.5 px-3 py-2 bg-crimson hover:bg-crimson/95 text-white font-bold rounded-lg transition"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Start Recording</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-lg transition animate-pulse"
                      >
                        <Square className="w-3.5 h-3.5 fill-black" />
                        <span>Stop ({recordingSeconds}s)</span>
                      </button>
                    )}

                    {recordedAudioUrl && (
                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <button
                          type="button"
                          onClick={playRecordedPreview}
                          className="flex items-center gap-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold rounded-lg transition"
                        >
                          <Play className="w-3.5 h-3.5 fill-black" />
                          <span>Play Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRecordedAudioUrl(null);
                            setRecordedAudioBlob(null);
                            setTempBase64Voice(null);
                          }}
                          className="p-2 bg-white/5 hover:bg-white/10 hover:text-rose-500 border border-white/10 rounded-lg transition"
                          title="Delete recording"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {tempBase64Voice && (
                    <p className="text-[9px] text-emerald-400/90 font-mono">
                      ✓ Voice captured successfully! This will overwrite synthesized AI pronunciation.
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(null)}
                    className="px-4 py-2 bg-interior hover:bg-card text-white/60 rounded-lg font-semibold"
                  >
                    Discard Edit
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-crimson hover:bg-crimson/95 text-white font-bold rounded-lg"
                  >
                    Submit Correction
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
