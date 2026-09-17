import React, { useState } from 'react';
import { Eye, EyeOff, Trash2, ArrowUp, ArrowDown, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { lintBullet } from '../../engine/linter';

interface BulletInputProps {
  id: string;
  text: string;
  visible: boolean;
  onChange: (text: string) => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  placeholder?: string;
}

export const BulletInput: React.FC<BulletInputProps> = ({
  text,
  visible,
  onChange,
  onToggleVisible,
  onDelete,
  onMoveUp,
  onMoveDown,
  placeholder = 'Action verb + task + measurable metric...',
}) => {
  const [showVerbSuggestions, setShowVerbSuggestions] = useState(false);
  const lint = lintBullet(text);

  const handleApplyVerb = (strongVerb: string) => {
    if (!lint.weakVerb) return;
    // Replace weak opener verb with strong verb
    const regex = new RegExp(`^\\s*${lint.weakVerb}\\b`, 'i');
    const updated = text.replace(regex, strongVerb);
    onChange(updated);
    setShowVerbSuggestions(false);
  };

  return (
    <div className={`p-3 rounded-lg border transition-all ${visible ? 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600' : 'bg-slate-900/50 border-slate-800 opacity-60'}`}>
      <div className="flex items-start gap-2">
        {/* Bullet point indicator */}
        <span className="text-slate-500 font-mono text-sm pt-2 select-none">•</span>

        {/* Text Area */}
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="w-full bg-slate-950/60 text-slate-100 placeholder-slate-500 rounded-md p-2 text-sm border border-slate-700/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
          />

          {/* Real-time Inline Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
            {/* Metric Status */}
            {lint.hasMetric ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                <CheckCircle2 size={12} />
                Metric: {lint.metricMatches[0]}
              </span>
            ) : (
              text.trim().length > 15 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400/90 border border-amber-500/20">
                  <AlertTriangle size={12} />
                  Needs metric (%, $, numbers)
                </span>
              )
            )}

            {/* Weak Verb Status */}
            {lint.isWeakVerb && lint.weakVerb && (
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setShowVerbSuggestions(!showVerbSuggestions)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors cursor-pointer"
                >
                  <Sparkles size={12} />
                  Weak opener: "{lint.weakVerb}" (Replace)
                </button>

                {showVerbSuggestions && lint.suggestedVerbs && (
                  <div className="absolute left-0 top-full mt-1.5 z-30 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2.5">
                    <div className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Replace with strong verb:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lint.suggestedVerbs.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => handleApplyVerb(v)}
                          className="px-2 py-1 text-xs bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded border border-blue-500/30 transition-all font-medium"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Buzzword Warnings */}
            {lint.buzzwords.map((bw) => (
              <span
                key={bw.word}
                title={bw.advice}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                <AlertTriangle size={12} />
                Fluff: "{bw.word}"
              </span>
            ))}

            {/* Length Warnings */}
            {lint.isTooLong && (
              <span className="text-amber-400/80 text-[11px]">
                ⚠️ Long ({text.length} chars) — consider tightening
              </span>
            )}

            {/* Character count subtle */}
            <span className="text-slate-500 text-[11px] ml-auto">
              {text.length} chars
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col items-center gap-1 pt-1">
          {/* Toggle visibility */}
          <button
            type="button"
            onClick={onToggleVisible}
            title={visible ? 'Hide from printed resume' : 'Include in printed resume'}
            className={`p-1.5 rounded transition-colors ${
              visible
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                : 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
            }`}
          >
            {visible ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>

          {/* Move buttons */}
          {onMoveUp && (
            <button
              type="button"
              onClick={onMoveUp}
              title="Move bullet up"
              className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-700"
            >
              <ArrowUp size={13} />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              onClick={onMoveDown}
              title="Move bullet down"
              className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-700"
            >
              <ArrowDown size={13} />
            </button>
          )}

          {/* Delete button */}
          <button
            type="button"
            onClick={onDelete}
            title="Delete bullet"
            className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
