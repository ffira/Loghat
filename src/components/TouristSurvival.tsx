import { useState } from 'react';
import { SURVIVAL_PHRASES } from '../data/dialectData';
import { Coffee, RotateCcw, Volume2, Utensils, HelpCircle, Flame, HeartHandshake } from 'lucide-react';

interface TouristSurvivalProps {
  isTouristMode: boolean;
  onToggleMode: (val: boolean) => void;
  isInsideSimulator?: boolean;
}

export default function TouristSurvival({ isTouristMode, onToggleMode, isInsideSimulator = false }: TouristSurvivalProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Mamak' | 'Transport' | 'Shopping' | 'Social'>('All');
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  // Mamak Order Builder States
  const [selectedDrink, setSelectedDrink] = useState('Teh O Ais Limau');
  const [selectedFood, setSelectedFood] = useState('Roti Canai garing');
  const [sweetness, setSweetness] = useState('Kurang Manis'); // Less sweet
  const [customRequest, setCustomRequest] = useState('Kuah Banjir'); // Flooded with curry
  const [serverReply, setServerReply] = useState<string | null>(null);
  const [isOrdering, setIsOrdering] = useState(false);

  // Survival Phrases filtered list
  const filteredPhrases = SURVIVAL_PHRASES.filter(
    (p) => activeCategory === 'All' || p.context === activeCategory
  );

  const speakPhrase = (phraseText: string, id: string) => {
    if ('speechSynthesis' in window) {
      setPlayingPhraseId(id);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phraseText);
      utterance.rate = 0.85;
      utterance.onend = () => {
        setPlayingPhraseId(null);
      };
      utterance.onerror = () => {
        setPlayingPhraseId(null);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingPhraseId(id);
      setTimeout(() => setPlayingPhraseId(null), 1000);
    }
  };

  // Compile local order slang
  const getCompiledOrderSlang = () => {
    let order = 'Boss! ';
    if (selectedFood) {
      order += `${selectedFood} satu`;
      if (customRequest) {
        order += `, ${customRequest.toLowerCase()}`;
      }
      order += '! ';
    }
    if (selectedDrink) {
      order += `${selectedDrink} satu`;
      if (sweetness) {
        order += `, ${sweetness.toLowerCase()}`;
      }
      order += '!';
    }
    return order;
  };

  const handleOrderSubmit = () => {
    setIsOrdering(true);
    // Play speech synthesis of the compiled slang
    const compiled = getCompiledOrderSlang();
    speakPhrase(compiled, 'mamak-compiled-order');

    // Simulate authentic Mamak Server response
    const replies = [
      '“Beres Boss! Siap cepat, no problem!” (Alright boss, coming up fast!)',
      '“Boleh Boss! Roti banjir roti garing berendam banjir dhal, siap!” (Can do boss! Extra crispy flooded flatbread, coming up!)',
      '“Kasi siap kaw-kaw boss! Sila tunggu kejap ah!” (Making it super strong boss! Please wait a moment!)',
      '“Teh o ais limau kurang manis, roti canai garing satu. Cantik boss!” (Less sweet iced lemon tea, one crispy flatbread. Smart order, Boss!)'
    ];

    setTimeout(() => {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setServerReply(randomReply);
      setIsOrdering(false);
    }, 1500);
  };

  const resetOrderBuilder = () => {
    setSelectedDrink('Teh O Ais Limau');
    setSelectedFood('Roti Canai garing');
    setSweetness('Kurang Manis');
    setCustomRequest('Kuah Banjir');
    setServerReply(null);
  };

  const getLiteralTranslation = () => {
    let translation = 'Ordering: ';
    if (selectedFood) {
      translation += `One ${selectedFood}`;
      if (customRequest === 'Kuah Banjir') translation += ' (flooded with rich mixed curries)';
      translation += '. ';
    }
    if (selectedDrink) {
      translation += `One ${selectedDrink === 'Teh O Ais Limau' ? 'Iced Lemon Tea' : selectedDrink === 'Teh Tarik' ? 'Frothy Pulled Milk Tea' : selectedDrink}`;
      if (sweetness === 'Kurang Manis') translation += ' (less sweet to stay healthy)';
      else if (sweetness === 'Kaw-Kaw') translation += ' (extra thick and strong)';
      translation += '.';
    }
    return translation;
  };

  return (
    <div className="w-full bg-[#0d0909] border border-crimson/15 rounded-2xl p-6 shadow-2xl relative flex flex-col gap-6 animate-fadeIn text-[#F5F5F5] shadow-crimson/5">
      {/* Upper Mode Banner */}
      <div className={`flex flex-col justify-between items-start p-4 bg-[#121212] rounded-xl border border-white/5 gap-4 ${isInsideSimulator ? '' : 'sm:flex-row sm:items-center'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center border border-crimson/20">
            <HeartHandshake className="w-5 h-5 text-crimson animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F5F5F5] flex items-center gap-1.5 leading-snug">
              Toggle Mode: {isTouristMode ? '🎒 Tourist Survival View' : '🏢 Urbanite Deep Slang View'}
            </h4>
            <p className="text-2xs text-white/50 mt-0.5">
              Switch views to get practical survival guides or extreme local terminology!
            </p>
          </div>
        </div>

        {/* Dynamic Mode Switcher */}
        <div className={`flex bg-interior border border-white/5 rounded-lg p-1.5 w-full shrink-0 justify-around ${isInsideSimulator ? 'self-stretch' : 'sm:w-auto sm:self-auto sm:justify-start'}`}>
          <button
            onClick={() => onToggleMode(false)}
            className={`px-3 py-1.5 rounded text-xs font-bold transition cursor-pointer ${
              !isTouristMode
                ? 'bg-crimson text-white shadow shadow-black/25 font-extrabold'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Urbanite Slang
          </button>
          <button
            onClick={() => onToggleMode(true)}
            className={`px-3 py-1.5 rounded text-xs font-bold transition cursor-pointer ${
              isTouristMode
                ? 'bg-gold text-black shadow shadow-black/25 font-extrabold'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Tourist Survival
          </button>
        </div>
      </div>

      {isTouristMode ? (
        /* TOURIST SURVIVAL PANEL */
        <div className={`grid grid-cols-1 gap-6 ${isInsideSimulator ? '' : 'lg:grid-cols-2'}`}>
          {/* Column Left: Order Builder */}
          <div className="bg-[#121212] border border-white/5 p-5 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-extrabold text-gold uppercase tracking-wider flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-crimson" />
                Mamak Order Builder 🍳
              </h4>
              <button
                onClick={resetOrderBuilder}
                className="text-white/30 hover:text-white/60 text-[10px] uppercase font-mono flex items-center gap-1 cursor-pointer"
                title="Reset order"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <p className="text-2xs text-white/40 leading-normal">
              Instead of typing a 50-word English greeting, local servers appreciate highly condensed, efficient codes. Build your breakfast code below!
            </p>

            <div className="border-t border-white/5 my-1" />

            {/* Drink Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-2xs font-bold text-white/40 uppercase font-mono">1. Choose a Drink</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  { value: 'Teh O Ais Limau', label: 'Teh O Ais Limau', desc: 'Iced Lemon Tea' },
                  { value: 'Teh Tarik', label: 'Teh Tarik', desc: 'Pulled Milk Tea' },
                  { value: 'Kopi Ais', label: 'Kopi Ais', desc: 'Iced Milk Coffee' }
                ].map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDrink(d.value)}
                    className={`p-2 rounded-xl border text-left text-2xs transition flex flex-col cursor-pointer ${
                      selectedDrink === d.value
                        ? 'border-gold bg-gold/5 text-gold font-bold'
                        : 'border-white/10 bg-interior/60 text-white/40 hover:border-gold/30'
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className="text-[9px] text-white/30 mt-0.5">{d.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Sweetness */}
            <div className="flex flex-col gap-1.5">
              <label className="text-2xs font-bold text-white/40 uppercase font-mono">2. Adjust Sweetness Modifier</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {['Kurang Manis', 'Kaw-Kaw', 'Standard Sugar'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSweetness(s)}
                    className={`py-1.5 px-2 rounded-lg border text-center text-2xs transition font-semibold cursor-pointer ${
                      sweetness === s
                        ? 'border-crimson bg-crimson/10 text-crimson font-bold'
                        : 'border-white/10 bg-[#121212]/40 text-white/40 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-2xs font-bold text-white/40 uppercase font-mono">3. Select Mamak Food staple</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  { value: 'Roti Canai garing', label: 'Roti Canai', desc: 'Crispy Flatbread' },
                  { value: 'Roti Telur', label: 'Roti Telur', desc: 'Egg Flatbread' },
                  { value: 'Maggi Goreng', label: 'Maggi Goreng', desc: 'Fried Instant Noodles' }
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSelectedFood(f.value)}
                    className={`p-2 rounded-xl border text-left text-2xs transition flex flex-col cursor-pointer ${
                      selectedFood === f.value
                        ? 'border-gold bg-gold/5 text-gold font-bold'
                        : 'border-white/10 bg-interior/60 text-white/40 hover:border-gold/30'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className="text-[9px] text-white/35 mt-0.5">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Curry/Sauce Request */}
            <div className="flex flex-col gap-1.5">
              <label className="text-2xs font-bold text-white/40 uppercase font-mono">4. Curry/Sauce Request</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {['Kuah Banjir', 'Kuah Asing', 'Dry/No Gravy'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setCustomRequest(opt)}
                    className={`py-1.5 px-2 rounded-lg border text-center text-2xs transition font-semibold cursor-pointer ${
                      customRequest === opt
                        ? 'border-crimson bg-crimson/10 text-crimson font-bold'
                        : 'border-white/10 bg-[#121212]/40 text-white/40 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Compiled Slang Order Container */}
            <div className="mt-2 bg-card p-4 border border-gold/35 rounded-xl relative flex flex-col gap-2 shadow-inner">
              <span className="text-[9px] bg-gold text-black font-extrabold font-mono px-2 py-0.5 rounded uppercase self-start">
                Local Slang Formula Generated:
              </span>
              <p className="text-sm md:text-base font-extrabold text-white italic pr-9 leading-relaxed">
                "{getCompiledOrderSlang()}"
              </p>
              <p className="text-[10px] text-white/50 leading-normal">
                <b>English breakdown:</b> {getLiteralTranslation()}
              </p>

              <button
                onClick={handleOrderSubmit}
                disabled={isOrdering}
                className="mt-2 w-full flex items-center justify-center gap-1.5 bg-crimson hover:bg-crimson/95 font-bold text-white p-2.5 rounded-lg text-xs transition duration-200 cursor-pointer shadow-md"
              >
                <Volume2 className="w-4 h-4 text-white" />
                {isOrdering ? 'Yelling Order to Server...' : 'Yell Slang Order to Server'}
              </button>
            </div>

            {/* Server visual reply */}
            {serverReply && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl animate-fadeIn text-xs text-emerald-100 flex items-start gap-2">
                <Utensils className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <b className="text-emerald-400 uppercase tracking-widest font-mono text-[10px] block mb-0.5">
                    Mamak Server (Anneh) Replies:
                  </b>
                  {serverReply}
                </div>
              </div>
            )}
          </div>

          {/* Column Right: Actionable Tourist phrases list */}
          <div className="flex flex-col bg-[#121212] border border-white/5 p-5 rounded-xl gap-4">
            <h4 className="text-sm font-extrabold text-gold uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-crimson" />
              Essential Tourist phrases
            </h4>

            {/* Quick pill categories */}
            <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-3">
              {(['All', 'Mamak', 'Transport', 'Shopping', 'Social'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded text-2xs transition-all font-bold cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-crimson text-white font-extrabold shadow-sm'
                      : 'bg-card border border-white/5 text-white/40 hover:text-white hover:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Survival Phrases scroll stack */}
            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
              {filteredPhrases.map((phrase) => (
                <div
                  key={phrase.id}
                  className="bg-card border border-white/10 p-3.5 rounded-xl hover:border-gold/30 transition flex justify-between items-start gap-3 shadow-md"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white tracking-tight leading-relaxed">
                      "{phrase.phrase}"
                    </p>
                    <p className="text-[10px] text-gold font-mono italic font-semibold">
                      Pronounce: "{phrase.pronunciation}"
                    </p>
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-2xs text-white/80">
                        <b>Meaning:</b> {phrase.english_meaning}
                      </span>
                      <span className="text-[10px] text-white/35 leading-normal">
                        💡 <b>Mamak Tip:</b> {phrase.tips}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => speakPhrase(phrase.phrase, phrase.id)}
                    className={`p-2 rounded-full border transition cursor-pointer ${
                      playingPhraseId === phrase.id
                        ? 'bg-crimson border-crimson/50 text-white animate-pulse'
                        : 'bg-[#121212] border-white/5 text-white/40 hover:text-gold hover:border-gold/30'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* URBANITE MODE ADVICE */
        <div className="bg-[#121212] rounded-xl p-6 border border-white/5 text-center animate-fadeIn flex flex-col items-center">
          <div className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center text-xl mb-3 text-crimson border border-crimson/25 animate-pulse">
            <Flame className="w-6 h-6 text-crimson" />
          </div>
          <h4 className="text-sm font-bold text-gold">Urbanite Slang Mode is Active ⚡</h4>
          <p className="text-xs text-white/50 max-w-lg mt-2 leading-relaxed">
            You are currently exploring high-accuracy vernacular slang inside the dictionary. Use the dictionary list to search, upvote, and study local dialects from diverse state origins like Logat Utara or Kelantanese!
          </p>
          <button
            onClick={() => onToggleMode(true)}
            className="mt-4 px-5 py-2 bg-card hover:bg-[#121212] border border-white/10 hover:border-gold text-gold text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Launch Tourist Survival Guide instead
          </button>
        </div>
      )}
    </div>
  );
}
