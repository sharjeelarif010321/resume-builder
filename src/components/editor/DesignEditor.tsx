import React from 'react';
import { ResumeSettings, TemplateId, FontFamily, FontSize, MarginSize } from '../../types/resume';
import { Layout, Type, MoveVertical, Check } from 'lucide-react';

interface DesignEditorProps {
  settings: ResumeSettings;
  onChange: (updated: ResumeSettings) => void;
}

export const DesignEditor: React.FC<DesignEditorProps> = ({ settings, onChange }) => {
  const templates: { id: TemplateId; name: string; desc: string; previewClass: string }[] = [
    {
      id: 'classic',
      name: 'Classic Ivy (LaTeX Style)',
      desc: 'Proven single-column engineering standard. High density, horizontal divider rules, clean serif or sans typography.',
      previewClass: 'font-serif border-t-2 border-black',
    },
    {
      id: 'modern',
      name: 'Modern Tech',
      desc: 'Contemporary tech format with subtle pill accents, prominent links, and bold role headers.',
      previewClass: 'font-sans border-l-4 border-blue-600',
    },
    {
      id: 'compact',
      name: 'Compact Exec',
      desc: 'Ultra-dense 9.5pt single-page format for mid to senior professionals with extensive histories.',
      previewClass: 'font-sans text-[10px] leading-tight',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Template Chooser Cards */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Layout size={14} className="text-blue-400" />
          Choose Resume Template
        </label>
        <div className="grid grid-cols-1 gap-3">
          {templates.map((tmpl) => {
            const isSelected = settings.template === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => onChange({ ...settings, template: tmpl.id })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-600/10 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-100">{tmpl.name}</h4>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-semibold">
                          <Check size={10} /> Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tmpl.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Type size={14} className="text-blue-400" />
          Typography & Font Family
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'serif', label: 'Computer Modern', sub: 'LaTeX Classic' },
            { id: 'sans', label: 'Clean Sans', sub: 'Inter' },
            { id: 'mono', label: 'Monospace', sub: 'Developer' },
          ].map((font) => (
            <button
              key={font.id}
              type="button"
              onClick={() => onChange({ ...settings, fontFamily: font.id as FontFamily })}
              className={`p-3 rounded-lg border text-left transition-all ${
                settings.fontFamily === font.id
                  ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-semibold text-slate-200">{font.label}</div>
              <div className="text-[10px] text-slate-500">{font.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Spacing & Page Budget Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Font Size */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <MoveVertical size={14} className="text-blue-400" />
            Base Font Size
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['compact', 'standard', 'relaxed'] as FontSize[]).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => onChange({ ...settings, fontSize: sz })}
                className={`py-1.5 rounded text-xs capitalize transition-colors font-medium ${
                  settings.fontSize === sz ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {sz === 'compact' ? '9.5pt' : sz === 'standard' ? '10pt' : '11pt'}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Choose 9.5pt if overflowing past 1 page</span>
        </div>

        {/* Margins */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Layout size={14} className="text-blue-400" />
            Page Margins
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['compact', 'standard', 'relaxed'] as MarginSize[]).map((mg) => (
              <button
                key={mg}
                type="button"
                onClick={() => onChange({ ...settings, marginSize: mg })}
                className={`py-1.5 rounded text-xs capitalize transition-colors font-medium ${
                  settings.marginSize === mg ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mg}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Adjust edge padding to optimize fit</span>
        </div>
      </div>
    </div>
  );
};
