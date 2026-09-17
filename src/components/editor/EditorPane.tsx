import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { BasicsEditor } from './BasicsEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { SkillsEditor } from './SkillsEditor';
import { CertificationsEditor } from './CertificationsEditor';
import { SectionManager } from './SectionManager';
import { DesignEditor } from './DesignEditor';
import { 
  User, Briefcase, GraduationCap, FolderGit2, Wrench, Award, Layers, Palette
} from 'lucide-react';

interface EditorPaneProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const EditorPane: React.FC<EditorPaneProps> = ({ resume, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>('basics');

  const handleApplyPreset = (preset: 'student' | 'experienced' | 'compact') => {
    let newOrder = [...resume.sectionOrder];
    if (preset === 'student') {
      newOrder = [
        { id: 'education', label: 'Education', enabled: true },
        { id: 'projects', label: 'Projects', enabled: true },
        { id: 'skills', label: 'Technical Skills', enabled: true },
        { id: 'experience', label: 'Work Experience', enabled: true },
        { id: 'certifications', label: 'Certifications', enabled: true },
        { id: 'summary', label: 'Professional Summary', enabled: false },
      ];
    } else if (preset === 'experienced') {
      newOrder = [
        { id: 'experience', label: 'Work Experience', enabled: true },
        { id: 'projects', label: 'Projects', enabled: true },
        { id: 'education', label: 'Education', enabled: true },
        { id: 'skills', label: 'Technical Skills', enabled: true },
        { id: 'certifications', label: 'Certifications', enabled: true },
        { id: 'summary', label: 'Professional Summary', enabled: false },
      ];
    }
    onChange({ ...resume, sectionOrder: newOrder });
  };

  const tabs = [
    { id: 'basics', label: 'Contact', icon: User },
    { id: 'design', label: 'Template & Design', icon: Palette },
    { id: 'structure', label: 'Sections Order', icon: Layers },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: resume.experience.filter(e => e.visible).length },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: resume.projects.filter(p => p.visible).length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: resume.education.filter(e => e.visible).length },
    { id: 'skills', label: 'Skills', icon: Wrench, count: resume.skills.filter(s => s.visible).length },
    { id: 'certifications', label: 'Certs', icon: Award, count: resume.certifications.filter(c => c.visible).length },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900/60 border-r border-slate-800">
      {/* Tab Navigation Pill Bar */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/90 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-700 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {activeTab === 'basics' && (
          <BasicsEditor
            basics={resume.basics}
            onChange={(basics) => onChange({ ...resume, basics })}
          />
        )}

        {activeTab === 'design' && (
          <DesignEditor
            settings={resume.settings}
            onChange={(settings) => onChange({ ...resume, settings })}
          />
        )}

        {activeTab === 'structure' && (
          <SectionManager
            sectionOrder={resume.sectionOrder}
            onChange={(sectionOrder) => onChange({ ...resume, sectionOrder })}
            onApplyPreset={handleApplyPreset}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceEditor
            experience={resume.experience}
            onChange={(experience) => onChange({ ...resume, experience })}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsEditor
            projects={resume.projects}
            onChange={(projects) => onChange({ ...resume, projects })}
          />
        )}

        {activeTab === 'education' && (
          <EducationEditor
            education={resume.education}
            onChange={(education) => onChange({ ...resume, education })}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsEditor
            skills={resume.skills}
            onChange={(skills) => onChange({ ...resume, skills })}
          />
        )}

        {activeTab === 'certifications' && (
          <CertificationsEditor
            certifications={resume.certifications}
            onChange={(certifications) => onChange({ ...resume, certifications })}
          />
        )}
      </div>
    </div>
  );
};
