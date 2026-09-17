import React from 'react';
import { SectionMeta } from '../../types/resume';
import { ArrowUp, ArrowDown, Eye, EyeOff, Layers, Sliders } from 'lucide-react';

interface SectionManagerProps {
  sectionOrder: SectionMeta[];
  onChange: (updated: SectionMeta[]) => void;
  onApplyPreset: (presetName: 'student' | 'experienced' | 'compact') => void;
}

export const SectionManager: React.FC<SectionManagerProps> = ({
  sectionOrder,
  onChange,
  onApplyPreset,
}) => {
  const handleToggle = (id: string) => {
    onChange(
      sectionOrder.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sectionOrder.length) return;

    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);
    onChange(newOrder);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
      {/* Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Layers size={16} className="text-blue-400" />
          <span>Resume Structure & Hierarchy</span>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 text-xs">
          <Sliders size={13} className="text-slate-400" />
          <span className="text-slate-400">Presets:</span>
          <button
            type="button"
            onClick={() => onApplyPreset('experienced')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
          >
            Experienced Tech
          </button>
          <button
            type="button"
            onClick={() => onApplyPreset('student')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
          >
            Student / New Grad
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-1.5">
        {sectionOrder.map((section, idx) => (
          <div
            key={section.id}
            className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
              section.enabled
                ? 'bg-slate-950/60 border-slate-800 text-slate-200'
                : 'bg-slate-950/20 border-slate-900 text-slate-500 opacity-60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-mono w-4 text-center">{idx + 1}</span>
              <span className="font-medium">{section.label}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleToggle(section.id)}
                title={section.enabled ? 'Disable section' : 'Enable section'}
                className={`p-1 rounded transition-colors ${
                  section.enabled ? 'text-slate-400 hover:text-white' : 'text-amber-400 bg-amber-500/10'
                }`}
              >
                {section.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>

              <button
                type="button"
                disabled={idx === 0}
                onClick={() => handleMove(idx, 'up')}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
              >
                <ArrowUp size={13} />
              </button>

              <button
                type="button"
                disabled={idx === sectionOrder.length - 1}
                onClick={() => handleMove(idx, 'down')}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
              >
                <ArrowDown size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
