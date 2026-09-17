import React, { useEffect, useState } from 'react';
import { ResumeData } from './types/resume';
import { loadInitialResume, saveResume } from './utils/storage';
import { SAMPLE_RESUME } from './utils/sampleData';
import { auditResume } from './engine/linter';
import { Navbar } from './components/layout/Navbar';
import { EditorPane } from './components/editor/EditorPane';
import { PreviewPane } from './components/preview/PreviewPane';
import { AuditDrawer } from './components/layout/AuditDrawer';
import { Edit3, Eye } from 'lucide-react';

export const App: React.FC = () => {
  const [resume, setResume] = useState<ResumeData>(() => loadInitialResume());
  const [isAuditOpen, setIsAuditOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

  // Auto-save on every state modification
  useEffect(() => {
    saveResume(resume);
  }, [resume]);

  // Real-time deterministic ATS audit
  const auditResult = auditResume(resume);

  const handleResetSample = () => {
    setResume(SAMPLE_RESUME);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Top Navigation Bar */}
      <Navbar
        resume={resume}
        overallScore={auditResult.overallScore}
        onOpenAudit={() => setIsAuditOpen(true)}
        onUpdateResume={setResume}
        onResetSample={handleResetSample}
      />

      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden border-b border-slate-800 bg-slate-900 shrink-0 print:hidden">
        <button
          type="button"
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 ${
            mobileTab === 'edit'
              ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-800/40'
              : 'text-slate-400'
          }`}
        >
          <Edit3 size={14} /> Edit Resume
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 ${
            mobileTab === 'preview'
              ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-800/40'
              : 'text-slate-400'
          }`}
        >
          <Eye size={14} /> Preview & PDF
        </button>
      </div>

      {/* Main Split-Pane Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Modular Editor Pane */}
        <div className={`w-full md:w-1/2 lg:w-5/12 h-full flex flex-col ${
          mobileTab === 'edit' ? 'block' : 'hidden md:block'
        }`}>
          <EditorPane
            resume={resume}
            onChange={setResume}
          />
        </div>

        {/* Right Side: Real-Time ATS Paper Preview */}
        <div className={`w-full md:w-1/2 lg:w-7/12 h-full flex flex-col ${
          mobileTab === 'preview' ? 'block' : 'hidden md:block'
        }`}>
          <PreviewPane
            resume={resume}
            onChangeSettings={(settings) => setResume({ ...resume, settings })}
          />
        </div>
      </main>

      {/* Slide-Over Audit Drawer */}
      <AuditDrawer
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        audit={auditResult}
      />
    </div>
  );
};

export default App;
