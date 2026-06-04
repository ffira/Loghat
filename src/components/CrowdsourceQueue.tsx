import { Trash2, AlertCircle, Eye, Sparkles, Check } from 'lucide-react';
import { PendingEdit } from '../types';

interface CrowdsourceQueueProps {
  pendingEdits: PendingEdit[];
  onVoteSah: (id: string) => void;
  onRejectEdit: (id: string) => void;
  isInsideSimulator?: boolean;
}

export default function CrowdsourceQueue({
  pendingEdits,
  onVoteSah,
  onRejectEdit,
  isInsideSimulator = false,
}: CrowdsourceQueueProps) {
  return (
    <div className="w-full bg-card border border-white/10 rounded-2xl p-6 shadow-2xl relative flex flex-col gap-5 text-[#F5F5F5]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-black text-gold tracking-tight flex items-center gap-2">
            🚨 Wiki Community Corrections Queue
          </h3>
          <p className="text-xs text-white/50">
            Vote "Sah" (Verify) on crowdsourced edits. Proposals reaching 10 "Sah" votes get pushed to the dictionary!
          </p>
        </div>
        <div className="text-xs bg-crimson/10 text-crimson border border-crimson/20 px-3 py-1.5 rounded-lg font-mono font-bold">
          Pending: {pendingEdits.length} Proposals
        </div>
      </div>

      {pendingEdits.length === 0 ? (
        <div className="bg-[#121212] border border-white/5 p-12 text-center rounded-xl flex flex-col items-center shadow-inner">
          <span className="text-3xl text-white/30 mb-2">🎉</span>
          <h4 className="text-sm font-bold text-[#F5F5F5]">Queue is completely clear!</h4>
          <p className="text-xs text-white/40 mt-1 max-w-sm">
            All submitted slang entries have been processed or successfully verified by community peers. Try proposing a correction in the Loghat-Dex to see it here!
          </p>
        </div>
      ) : (
        <div className={`grid gap-4 ${isInsideSimulator ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {pendingEdits.map((edit) => {
            const votesNeeded = 10 - edit.sah_votes;

            return (
              <div
                key={edit.id}
                id={`pending-edit-${edit.id}`}
                className="bg-[#121212] border border-white/5 hover:border-gold/30 transition p-5 rounded-xl flex flex-col justify-between gap-4 relative overflow-hidden shadow-md"
              >
                {/* Upper row */}
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-base font-bold text-gold flex items-center gap-1.5 flex-wrap">
                        {edit.word_name}
                        <span className="text-[10px] font-mono font-semibold bg-card text-white/50 px-2 py-0.5 rounded border border-white/10">
                          {edit.dialect_type}
                        </span>
                      </h4>
                      <p className="text-[10px] text-white/30 mt-0.5">
                        Proposed by: <span className="text-crimson font-mono">@{edit.submitted_by}</span>
                      </p>
                    </div>

                    <span className="text-2xs font-mono font-bold bg-crimson/10 text-crimson px-2 py-0.5 rounded border border-crimson/20">
                      {edit.state_origin}
                    </span>
                  </div>

                  <div className="border-t border-white/5 my-3" />

                  {/* Corrections details comparison */}
                  <div className="space-y-3.5 text-xs text-white/80">
                    <div>
                      <span className="text-[10px] text-white/40 uppercase tracking-wide font-mono font-bold block leading-relaxed">
                        {edit.word_id ? 'Spelling/Definition Correction:' : 'New Slang Equivalent:'}
                      </span>
                      <div className="flex flex-col gap-2.5 mt-1.5 bg-card p-3 rounded-lg border border-white/5">
                        <div className="space-y-0.5 pb-2 border-b border-white/5">
                          <p className="text-[9px] text-white/35 font-mono uppercase tracking-wider">Standard BM</p>
                          <p className="font-bold text-[#F5F5F5] leading-snug break-words whitespace-normal">{edit.proposed_correction.standard_bm_equivalent}</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] text-white/35 font-mono uppercase tracking-wider">English Meaning</p>
                          <p className="font-bold text-[#F5F5F5] leading-snug break-words whitespace-normal">{edit.proposed_correction.english_equivalent}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-white/40 uppercase tracking-wide font-mono font-bold block mt-1">Proposed Example context:</span>
                      <p className="italic text-white/70 bg-card p-2.5 rounded-lg border border-white/5 mt-1 leading-relaxed break-words">
                        "{edit.proposed_correction.example_sentence}"
                      </p>
                    </div>

                    {/* Simulated visual soundwave for recording submission */}
                    <div className="bg-card/60 p-2.5 border border-white/5 rounded-lg flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                        <span className="text-[10px] text-white/50 font-mono">Audio Clip: Pronunciation_Sample.mp3</span>
                      </div>
                      {/* Audio waveform illustration */}
                      <span className="flex items-end gap-0.5 h-3">
                        <span className="w-[1.5px] h-1.5 bg-crimson/80 rounded animate-bounce delay-100" />
                        <span className="w-[1.5px] h-3 bg-crimson/80 rounded animate-bounce" />
                        <span className="w-[1.5px] h-2 bg-crimson/80 rounded animate-bounce delay-75" />
                        <span className="w-[1.5px] h-1 bg-crimson/80 rounded animate-bounce delay-150" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress and Actions */}
                <div className="mt-2 space-y-3 pt-3 border-t border-white/5">
                  {/* Progress bar to 10 votes */}
                  <div className={`flex justify-between items-start gap-1 pb-1 text-xs ${isInsideSimulator ? 'flex-col' : 'flex-col sm:flex-row sm:items-center'}`}>
                    <span className="text-white/50 leading-normal">
                      Sah status: <b className="text-white">{edit.sah_votes} / 10</b> votes
                    </span>
                    <span className="font-mono text-gold font-bold text-[11px] leading-normal shrink-0">
                      {votesNeeded} more needed
                    </span>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden border border-white/5">
                    <div
                      className="bg-gradient-to-r from-crimson to-gold h-full transition-all duration-300"
                      style={{ width: `${(edit.sah_votes / 10) * 100}%` }}
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="flex justify-between items-center gap-2 pt-1.5">
                    <button
                      onClick={() => onRejectEdit(edit.id)}
                      className="p-2.5 bg-card hover:bg-crimson/15 text-white/40 hover:text-crimson rounded-lg transition flex items-center justify-center border border-white/10 hover:border-crimson/25 cursor-pointer shrink-0"
                      title="Decline/Delete proposal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onVoteSah(edit.id)}
                      disabled={edit.voted_by_user}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition cursor-pointer select-none whitespace-nowrap ${
                        edit.voted_by_user
                          ? 'bg-[#121212] text-crimson border border-crimson/20 cursor-default'
                          : 'bg-crimson hover:bg-[#ff1a1a] text-white shadow-md'
                      }`}
                    >
                      {edit.voted_by_user ? (
                        <>
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span>Already "Sah"</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                          <span>Vote "Sah"</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
