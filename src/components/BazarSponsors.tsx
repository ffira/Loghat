import { useState, FormEvent } from 'react';
import { SponsorAd } from '../types';
import { Megaphone, Plus, Sparkles, Filter, Check, Heart, Shield, Landmark } from 'lucide-react';

interface BazarSponsorsProps {
  ads: SponsorAd[];
  onAddAd: (newAd: SponsorAd) => void;
  onReactAd: (id: string, reactionType: 'sah' | 'gostan' | 'fuyoo') => void;
  isInsideSimulator?: boolean;
}

const CATEGORIES = ['Food & Beverage', 'Services', 'Automotive', 'Retail', 'Lifestyle'] as const;

export default function BazarSponsors({ ads, onAddAd, onReactAd, isInsideSimulator = false }: BazarSponsorsProps) {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [businessName, setBusinessName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SponsorAd['category']>('Food & Beverage');
  const [stateOrigin, setStateOrigin] = useState('Kuala Lumpur');
  const [slangElement, setSlangElement] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!businessName || !headline || !description || !slangElement) {
      setFormError('Sila isi semua ruangan / Please fill in all fields!');
      return;
    }

    const newAd: SponsorAd = {
      id: `ad-${Date.now()}`,
      business_name: businessName,
      headline: headline,
      description: description,
      category,
      state_origin: stateOrigin,
      slang_element: slangElement,
      reaction_counts: { sah: 1, gostan: 0, fuyoo: 1 },
      submitted_by: 'MamakGuestAdvertiser',
      is_approved: true,
    };

    onAddAd(newAd);

    // Reset Form
    setBusinessName('');
    setHeadline('');
    setDescription('');
    setSlangElement('');
    setFormError('');
    setIsFormOpen(false);
  };

  const filteredAds = ads.filter(
    (ad) => filterCategory === 'All' || ad.category === filterCategory
  );

  return (
    <div className="w-full bg-[#0d0a07] border border-amber-500/15 rounded-2xl p-6 shadow-2xl relative flex flex-col gap-6 animate-fadeIn text-[#F5F5F5]">
      {/* Header */}
      <div className={`flex flex-col gap-4 border-b border-white/5 pb-5 ${isInsideSimulator ? 'items-start' : 'sm:flex-row justify-between sm:items-center'}`}>
        <div>
          <h3 className="text-xl font-black text-gold tracking-tight flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-crimson animate-pulse" />
            Sapot Lokal Sponsor Hub 🛍️
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Browse funny, culture-accurate advertisements from local sponsors, or attach your own business card!
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-1.5 px-4 py-2.5 bg-crimson hover:bg-crimson/95 font-bold text-white rounded-xl text-xs transition duration-200 cursor-pointer shadow-md ${isInsideSimulator ? 'w-full' : 'w-full sm:w-auto'}`}
        >
          <Plus className="w-4 h-4 text-white" />
          {isFormOpen ? 'Close Ad Builder' : 'Attach Your Ad Card'}
        </button>
      </div>

      {/* Ad Builder / Attachment Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#121212] border border-white/10 p-5 rounded-xl flex flex-col gap-4 animate-slideDown"
        >
          <div className="flex items-center gap-2 text-gold">
            <Sparkles className="w-4 h-4 text-crimson" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider font-mono">Create Your Local Sponsor Card</h4>
          </div>

          <p className="text-2xs text-white/45 leading-normal">
            Promote your mock or real cafe, vehicle reverse shop, or durian services using local slang to appeal to dialect lovers!
          </p>

          {formError && (
            <div className="text-2xs font-mono font-bold text-crimson bg-crimson/5 border border-crimson/25 p-2 rounded-lg">
              {formError}
            </div>
          )}

          <div className={`grid grid-cols-1 gap-4 ${isInsideSimulator ? '' : 'md:grid-cols-2'}`}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase font-mono">Business or Shop Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Nasi Lemak Gelenya Kak Ros"
                className="bg-card border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase font-mono">Slogan / Catchy Headline *</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g., Flooded with standard sambal and spicy attitude"
                className="bg-card border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase font-mono">Industry Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SponsorAd['category'])}
                className="bg-card border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#121212]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase font-mono">State Origin</label>
              <select
                value={stateOrigin}
                onChange={(e) => setStateOrigin(e.target.value)}
                className="bg-card border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
              >
                {['Kuala Lumpur', 'Penang', 'Kedah', 'Perak', 'Kelantan', 'Terengganu', 'Sabah', 'Sarawak', 'Labuan', 'Johor', 'Selangor', 'Negeri Sembilan', 'Pahang', 'Melaka', 'Perlis'].map((st) => (
                  <option key={st} value={st} className="bg-[#121212]">
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-white/40 uppercase font-mono">Local Slang Integrated *</label>
              <input
                type="text"
                value={slangElement}
                onChange={(e) => setSlangElement(e.target.value)}
                placeholder="e.g., Gelenya (Flirtatious), Tapau (Takeaway), Gostan (Reverse)"
                className="bg-card border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-white/40 uppercase font-mono">Description / Promotional pitch * (Max 150 characters)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 150))}
                placeholder="e.g., We serve extra-large portions of Nasi Lemak with highly aromatic sambal. No bo-chup service here!"
                rows={3}
                className="bg-card border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 mt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-transparent text-white/50 hover:text-white text-xs font-bold font-mono transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gold hover:bg-gold/90 text-black text-xs font-black rounded-lg transition"
            >
              Publish Ad onto Board 🚀
            </button>
          </div>
        </form>
      )}

      {/* Category Pills Filters */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-4 items-center gap-y-3">
        <span className="text-[10px] uppercase font-mono font-bold text-white/40 flex items-center gap-1.5 mr-1.5">
          <Filter className="w-3.5 h-3.5 text-crimson" /> Filter:
        </span>
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-2xs transition-all font-bold cursor-pointer ${
              filterCategory === cat
                ? 'bg-crimson text-white shadow'
                : 'bg-interior border border-white/5 text-white/40 hover:text-white hover:border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid List of Sponsor cards */}
      <div className={`grid grid-cols-1 gap-5 ${isInsideSimulator ? '' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredAds.map((ad) => (
          <div
            key={ad.id}
            className="group bg-[#14120f]/90 border border-amber-500/10 hover:border-gold/40 transition-all duration-300 p-5 rounded-2xl flex flex-col justify-between gap-4 relative overflow-hidden shadow-lg hover:shadow-gold/10 hover:scale-[1.01] hover:-rotate-1 cursor-default"
          >
            {/* Visual Sticky Tape Overlay to look like a posted flyer */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-white/10 backdrop-blur-[1px] border border-white/5 shadow-sm rotate-1 z-10 pointer-events-none" />
            {/* Visual Sponsor Ribbon */}
            <div className="absolute top-0 right-0 bg-gold/10 text-gold text-[8px] font-mono font-bold px-3 py-1 rounded-bl-xl border-l border-b border-gold/20 flex items-center gap-1 uppercase">
              <Landmark className="w-2.5 h-2.5 shrink-0" /> Sponsor
            </div>

            <div>
              {/* Category & Origin */}
              <div className="flex items-center gap-2 text-white/35 font-mono text-[9px] mb-1 font-semibold uppercase">
                <span>{ad.category}</span>
                <span>•</span>
                <span className="text-crimson">{ad.state_origin}</span>
              </div>

              {/* Business Name */}
              <h4 className="text-base font-black text-[#F5F5F5] group-hover:text-gold transition-colors duration-200">
                {ad.business_name}
              </h4>

              {/* Slogan */}
              <p className="text-2xs text-[#F5F5F5]/80 font-serif italic mt-1 font-medium leading-normal pr-12">
                "{ad.headline}"
              </p>

              <div className="border-t border-white/5 my-2.5" />

              {/* Ad text content */}
              <p className="text-xs text-white/50 leading-relaxed pr-2">
                {ad.description}
              </p>

              {/* Slang Element Tag */}
              <div className="mt-3 flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-bold">Slang used:</span>
                <span className="text-[10px] bg-card border border-white/10 text-gold font-mono font-bold px-2 py-0.5 rounded">
                  {ad.slang_element}
                </span>
              </div>
            </div>

            {/* Reactions Summary */}
            <div className="border-t border-white/5 pt-3.5 flex items-center justify-between gap-2">
              <span className="text-[9px] font-mono text-white/30 uppercase font-black flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" /> Comfort Rating: Perfect
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onReactAd(ad.id, 'sah')}
                  className="px-2 py-1 bg-card hover:bg-[#121212] hover:text-emerald-400 text-white/40 text-[10px] font-mono rounded border border-white/5 hover:border-emerald-500/20 transition cursor-pointer flex items-center gap-1"
                  title="Mark as Sah (Legitimate)"
                >
                  👍 <span className="font-extrabold text-[#F5F5F5] font-mono">{ad.reaction_counts.sah}</span>
                </button>
                <button
                  onClick={() => onReactAd(ad.id, 'fuyoo')}
                  className="px-2 py-1 bg-card hover:bg-[#121212] hover:text-gold text-white/40 text-[10px] font-mono rounded border border-white/5 hover:border-gold/20 transition cursor-pointer flex items-center gap-1"
                  title="Awesome! (Fuyoo)"
                >
                  ✨ <span className="font-extrabold text-[#F5F5F5] font-mono">{ad.reaction_counts.fuyoo}</span>
                </button>
                <button
                  onClick={() => onReactAd(ad.id, 'gostan')}
                  className="px-2 py-1 bg-card hover:bg-crimson/10 hover:text-crimson text-white/40 text-[10px] font-mono rounded border border-white/5 hover:border-crimson/20 transition cursor-pointer flex items-center gap-1"
                  title="Gostan! (Reverse/Uninspired)"
                >
                  ↩️ <span className="font-extrabold text-[#F5F5F5] font-mono">{ad.reaction_counts.gostan}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
