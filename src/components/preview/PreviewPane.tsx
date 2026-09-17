import React, { useRef, useState, useEffect } from 'react';
import { ResumeData, TemplateId, FontSize, MarginSize } from '../../types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { PageBudgetMeter } from './PageBudgetMeter';
import { ZoomIn, ZoomOut, RotateCcw, Eye, Layout, Maximize2 } from 'lucide-react';

interface PreviewPaneProps {
  resume: ResumeData;
  onChangeSettings: (settings: ResumeData['settings']) => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ resume, onChangeSettings }) => {
  const paperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPageMarker, setShowPageMarker] = useState<boolean>(true);

  // Auto-calculate zoom for mobile screens
  const calculateFitZoom = () => {
    if (typeof window === 'undefined') return 0.95;
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
    const availableWidth = containerWidth - 32; // 16px padding on each side
    if (availableWidth <= 0) return 0.95;
    const fitZoom = Math.min(1.1, Math.max(0.35, availableWidth / 830));
    return parseFloat(fitZoom.toFixed(2));
  };

  const [zoom, setZoom] = useState<number>(0.95);

  // On mount and resize, auto-adjust on mobile/tablets
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setZoom(calculateFitZoom());
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { settings } = resume;

  const marginPaddingClass =
    settings.marginSize === 'compact' ? 'p-6 sm:p-8' :
    settings.marginSize === 'relaxed' ? 'p-10 sm:p-14' :
    'p-8 sm:p-10';

  const renderTemplate = () => {
    switch (settings.template) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'compact':
        return <CompactTemplate resume={resume} />;
      case 'classic':
      default:
        return <ClassicTemplate resume={resume} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/80">
      {/* Top Preview Control Bar */}
      <div className="p-2.5 sm:p-3 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <PageBudgetMeter contentRef={paperRef} />

          {/* Quick Template Switcher Dropdown */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs">
            <Layout size={13} className="text-blue-400 mr-1.5 shrink-0" />
            <select
              value={settings.template}
              onChange={(e) => onChangeSettings({ ...settings, template: e.target.value as TemplateId })}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="classic">Classic Ivy (LaTeX)</option>
              <option value="modern">Modern Tech</option>
              <option value="compact">Compact Exec</option>
            </select>
          </div>
        </div>

        {/* View & Density Controls */}
        <div className="flex items-center gap-1.5">
          {/* Font Size quick-adjust */}
          <div className="hidden sm:flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[11px]">
            <span className="text-slate-500 px-1.5">Size:</span>
            {(['compact', 'standard', 'relaxed'] as FontSize[]).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => onChangeSettings({ ...settings, fontSize: sz })}
                className={`px-1.5 py-0.5 rounded capitalize ${
                  settings.fontSize === sz ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {sz === 'compact' ? '9.5pt' : sz === 'standard' ? '10pt' : '11pt'}
              </button>
            ))}
          </div>

          {/* Margins quick-adjust */}
          <div className="hidden md:flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[11px]">
            <span className="text-slate-500 px-1.5">Margins:</span>
            {(['compact', 'standard', 'relaxed'] as MarginSize[]).map((mg) => (
              <button
                key={mg}
                type="button"
                onClick={() => onChangeSettings({ ...settings, marginSize: mg })}
                className={`px-1.5 py-0.5 rounded capitalize ${
                  settings.marginSize === mg ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mg}
              </button>
            ))}
          </div>

          {/* Toggle 1-Page Line */}
          <button
            type="button"
            onClick={() => setShowPageMarker(!showPageMarker)}
            title="Toggle 1-page boundary line"
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
              showPageMarker ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Eye size={12} />
            <span className="hidden lg:inline">Page Line</span>
          </button>

          {/* Fit to Width Button (Mobile friendly) */}
          <button
            type="button"
            onClick={() => setZoom(calculateFitZoom())}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Fit resume to screen width"
          >
            <Maximize2 size={12} />
            <span className="hidden sm:inline">Fit</span>
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-800 border border-slate-700/80 rounded-lg p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setZoom(Math.max(0.3, parseFloat((zoom - 0.1).toFixed(2))))}
              className="p-1 text-slate-300 hover:text-white rounded"
              title="Zoom out"
            >
              <ZoomOut size={13} />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-slate-300 select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom(Math.min(1.5, parseFloat((zoom + 0.1).toFixed(2))))}
              className="p-1 text-slate-300 hover:text-white rounded"
              title="Zoom in"
            >
              <ZoomIn size={13} />
            </button>
            <button
              type="button"
              onClick={() => setZoom(0.95)}
              className="p-1 text-slate-400 hover:text-white rounded border-l border-slate-700 ml-0.5"
              title="Reset 100%"
            >
              <RotateCcw size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Scroll Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-3 sm:p-6 flex justify-center items-start"
      >
        {/* Scaled Wrapper Box: prevents overflow dead-space on mobile */}
        <div
          style={{
            width: `${816 * zoom}px`,
            minHeight: `${1056 * zoom}px`,
            position: 'relative',
          }}
          className="transition-all duration-150 ease-out"
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              width: '816px',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {/* Printable US Letter Paper Simulation (8.5in x 11in) */}
            <div
              id="printable-resume"
              ref={paperRef}
              className={`relative bg-white text-black shadow-2xl rounded-sm w-[816px] min-h-[1056px] box-border ${marginPaddingClass}`}
            >
              {/* 1-Page Cutoff Line Overlay (Hidden in print) */}
              {showPageMarker && (
                <div
                  className="absolute left-0 right-0 border-b-2 border-dashed border-rose-500/70 pointer-events-none print:hidden z-20 flex justify-end pr-2"
                  style={{ top: '1056px' }}
                >
                  <span className="text-[10px] bg-rose-600 text-white font-mono px-1.5 py-0.5 rounded-b font-medium shadow-sm">
                    1-PAGE CUTOFF (Page 2 Begins Below)
                  </span>
                </div>
              )}

              {/* Template Content */}
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
