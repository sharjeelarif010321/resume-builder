import React, { useRef, useState } from 'react';
import { ResumeData, TemplateId, FontFamily } from '../../types/resume';
import { 
  FileDown, Share2, Upload, RefreshCw, Printer, FileText, Check, Gauge
} from 'lucide-react';
import { encodeResumeToUrlHash } from '../../utils/compression';
import { downloadJsonFile } from '../../utils/storage';

interface NavbarProps {
  resume: ResumeData;
  overallScore: number;
  onOpenAudit: () => void;
  onUpdateResume: (updated: ResumeData) => void;
  onResetSample: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  resume,
  overallScore,
  onOpenAudit,
  onUpdateResume,
  onResetSample,
}) => {
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyShareLink = () => {
    const hash = encodeResumeToUrlHash(resume);
    const url = `${window.location.origin}${window.location.pathname}${hash}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.basics) {
          onUpdateResume(json);
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const scoreBadgeColor =
    overallScore >= 85 ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
    overallScore >= 65 ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
    'bg-rose-500/15 text-rose-400 border-rose-500/30';

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-3 shrink-0 z-30 select-none print:hidden">
      {/* Brand & Score Pill */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
            <FileText size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white">ResumeForge</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 font-semibold rounded border border-blue-500/30">
                ATS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Local-First • Zero Accounts • Free</p>
          </div>
        </div>

        {/* Audit Score Pill */}
        <button
          type="button"
          onClick={onOpenAudit}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all hover:scale-105 cursor-pointer ml-1 sm:ml-3 ${scoreBadgeColor}`}
          title="Click to view ATS recommendations & redline feedback"
        >
          <Gauge size={13} />
          <span>Score: {overallScore}/100</span>
        </button>
      </div>

      {/* Center Controls: Templates & Typography */}
      <div className="hidden md:flex items-center gap-2 text-xs">
        {/* Template Selector */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
          <span className="text-slate-400 px-2 text-[11px]">Format:</span>
          {(['classic', 'modern', 'compact'] as TemplateId[]).map((tmpl) => (
            <button
              key={tmpl}
              type="button"
              onClick={() => onUpdateResume({
                ...resume,
                settings: { ...resume.settings, template: tmpl },
              })}
              className={`px-2.5 py-1 rounded text-xs capitalize transition-colors font-medium ${
                resume.settings.template === tmpl
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tmpl === 'classic' ? 'Classic Ivy' : tmpl === 'modern' ? 'Modern Tech' : 'Compact Exec'}
            </button>
          ))}
        </div>

        {/* Font Family */}
        <select
          value={resume.settings.fontFamily}
          onChange={(e) => onUpdateResume({
            ...resume,
            settings: { ...resume.settings, fontFamily: e.target.value as FontFamily },
          })}
          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
        >
          <option value="serif">Computer Modern (LaTeX)</option>
          <option value="sans">Clean Sans (Inter)</option>
          <option value="mono">Developer Mono</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Share Link */}
        <button
          type="button"
          onClick={handleCopyShareLink}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          title="Generate a private shareable link with your resume data encoded in the URL"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
          <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share Link'}</span>
        </button>

        {/* Export JSON */}
        <button
          type="button"
          onClick={() => downloadJsonFile(resume)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          title="Download resume data as a JSON backup"
        >
          <FileDown size={14} />
          <span className="hidden md:inline">Export</span>
        </button>

        {/* Import JSON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          title="Upload an exported resume JSON file"
        >
          <Upload size={14} />
          <span className="hidden md:inline">Import</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportJson}
          className="hidden"
        />

        {/* Reset Sample */}
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset resume to sample template? Your current edits will be overwritten.')) {
              onResetSample();
            }
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Reset to sample data"
        >
          <RefreshCw size={15} />
        </button>

        {/* Print / Save PDF Button */}
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all active:scale-95"
        >
          <Printer size={15} />
          <span>Save PDF</span>
        </button>
      </div>
    </header>
  );
};
