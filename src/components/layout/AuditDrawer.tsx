import React from 'react';
import { ResumeAuditResult } from '../../engine/linter';
import { 
  X, CheckCircle2, Sparkles, Trash2, PlusCircle, Gauge
} from 'lucide-react';

interface AuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  audit: ResumeAuditResult;
}

export const AuditDrawer: React.FC<AuditDrawerProps> = ({
  isOpen,
  onClose,
  audit,
}) => {
  if (!isOpen) return null;

  const removeItems = audit.actionItems.filter(i => i.type === 'remove');
  const addItems = audit.actionItems.filter(i => i.type === 'add');
  const fixItems = audit.actionItems.filter(i => i.type === 'fix');

  // Score color
  const scoreColor =
    audit.overallScore >= 85 ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' :
    audit.overallScore >= 65 ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' :
    'text-rose-400 border-rose-500/40 bg-rose-500/10';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Gauge className="text-blue-400" size={20} />
            <div>
              <h3 className="text-sm font-bold text-slate-100">Resume Health Audit</h3>
              <p className="text-[11px] text-slate-400">Rule-based ATS analysis & editorial feedback</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Score & Health Stats Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center shrink-0 ${scoreColor}`}>
              <span className="text-xl font-bold font-mono">{audit.overallScore}</span>
              <span className="text-[9px] uppercase tracking-wider font-semibold">/ 100</span>
            </div>

            <div className="flex-1">
              <h4 className="text-xs font-semibold text-slate-200 mb-1">
                {audit.overallScore >= 85 ? 'Strong ATS Readiness' :
                 audit.overallScore >= 65 ? 'Good — Minor Polishing Needed' :
                 'Needs Content Optimization'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {audit.actionItems.length === 0 
                  ? 'All checks passed! No red flags or weak openers detected.' 
                  : `${audit.actionItems.length} recommendations to maximize interview callbacks.`}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-center">
              <div className="text-xs text-slate-400 mb-0.5">Metrics Ratio</div>
              <div className={`text-base font-bold font-mono ${audit.metricPercentage >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {audit.metricPercentage}%
              </div>
              <div className="text-[10px] text-slate-500">{audit.bulletsWithMetrics} of {audit.totalBullets} bullets</div>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-center">
              <div className="text-xs text-slate-400 mb-0.5">Fluff Words</div>
              <div className={`text-base font-bold font-mono ${audit.buzzwordCount === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {audit.buzzwordCount}
              </div>
              <div className="text-[10px] text-slate-500">clichés found</div>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-center">
              <div className="text-xs text-slate-400 mb-0.5">Weak Verbs</div>
              <div className={`text-base font-bold font-mono ${audit.weakVerbCount === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {audit.weakVerbCount}
              </div>
              <div className="text-[10px] text-slate-500">passive openers</div>
            </div>
          </div>

          {/* Action Items Sections */}
          {/* 1. What to Remove */}
          {removeItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <Trash2 size={13} />
                <span>What to Remove ({removeItems.length})</span>
              </div>
              <div className="space-y-2">
                {removeItems.map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
                    <div className="font-semibold text-rose-300 mb-0.5">{item.title}</div>
                    <div className="text-slate-300 text-[11px] leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. What to Add */}
          {addItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <PlusCircle size={13} />
                <span>What to Add ({addItems.length})</span>
              </div>
              <div className="space-y-2">
                {addItems.map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs">
                    <div className="font-semibold text-blue-300 mb-0.5">{item.title}</div>
                    <div className="text-slate-300 text-[11px] leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Openers & Phrasing to Fix */}
          {fixItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Weak Openers to Fix ({fixItems.length})</span>
              </div>
              <div className="space-y-2">
                {fixItems.map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                    <div className="font-semibold text-amber-300 mb-0.5">{item.title}</div>
                    <div className="text-slate-300 text-[11px] leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {audit.actionItems.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              <CheckCircle2 size={36} className="mx-auto text-emerald-400 mb-2" />
              <p className="font-semibold text-slate-200">No Action Items Found</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Your resume demonstrates strong metrics, active voice, and clean ATS formatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
