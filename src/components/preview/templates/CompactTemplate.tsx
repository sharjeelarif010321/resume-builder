import React from 'react';
import { ResumeData, SectionType } from '../../../types/resume';

interface TemplateProps {
  resume: ResumeData;
}

export const CompactTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics } = resume;

  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case 'summary':
        if (!basics.showSummary || !basics.summary) return null;
        return (
          <div key="summary" className="mb-2 resume-section">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-0.5 mb-1">
              Summary
            </h3>
            <p className="text-[9pt] leading-tight text-neutral-800">{basics.summary}</p>
          </div>
        );

      case 'experience': {
        const visibleExp = resume.experience.filter(e => e.visible);
        if (visibleExp.length === 0) return null;
        return (
          <div key="experience" className="mb-2 resume-section">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-0.5 mb-1">
              Work Experience
            </h3>
            <div className="space-y-1.5">
              {visibleExp.map((exp) => {
                const visibleBullets = exp.bullets.filter(b => b.visible);
                return (
                  <div key={exp.id} className="break-inside-avoid text-[9pt]">
                    <div className="flex justify-between font-bold text-black">
                      <span>{exp.position}, <span className="font-medium text-neutral-700">{exp.company}</span></span>
                      <span className="font-normal text-[8.5pt]">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>

                    {visibleBullets.length > 0 && (
                      <ul className="list-disc ml-3.5 mt-0.5 space-y-0.5 text-neutral-900 leading-snug">
                        {visibleBullets.map((b) => (
                          <li key={b.id}>{b.text}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'projects': {
        const visibleProjects = resume.projects.filter(p => p.visible);
        if (visibleProjects.length === 0) return null;
        return (
          <div key="projects" className="mb-2 resume-section">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-0.5 mb-1">
              Projects
            </h3>
            <div className="space-y-1.5 text-[9pt]">
              {visibleProjects.map((proj) => {
                const visibleBullets = proj.bullets.filter(b => b.visible);
                return (
                  <div key={proj.id} className="break-inside-avoid">
                    <div className="flex justify-between font-bold text-black">
                      <span>{proj.name} {proj.technologies.length > 0 && <span className="font-normal text-[8.5pt] text-neutral-600">({proj.technologies.join(', ')})</span>}</span>
                      {proj.url && <span className="font-normal text-[8.5pt]">{proj.url.replace(/^https?:\/\//, '')}</span>}
                    </div>

                    {visibleBullets.length > 0 && (
                      <ul className="list-disc ml-3.5 mt-0.5 space-y-0.5 text-neutral-900 leading-snug">
                        {visibleBullets.map((b) => (
                          <li key={b.id}>{b.text}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'education': {
        const visibleEdu = resume.education.filter(e => e.visible);
        if (visibleEdu.length === 0) return null;
        return (
          <div key="education" className="mb-2 resume-section">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-0.5 mb-1">
              Education
            </h3>
            <div className="space-y-1 text-[9pt]">
              {visibleEdu.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                  <div>
                    <strong className="font-bold text-black">{edu.institution}</strong>
                    <span className="text-neutral-700"> — {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</span>
                    {edu.gpa && <span className="text-neutral-600 text-[8.5pt]"> (GPA: {edu.gpa})</span>}
                  </div>
                  <span className="text-[8.5pt] text-neutral-600">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'skills': {
        const visibleSkills = resume.skills.filter(s => s.visible && s.skills.length > 0);
        if (visibleSkills.length === 0) return null;
        return (
          <div key="skills" className="mb-2 resume-section">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-0.5 mb-1">
              Technical Skills
            </h3>
            <div className="space-y-0.5 text-[8.5pt] leading-tight">
              {visibleSkills.map((cat) => (
                <div key={cat.id}>
                  <span className="font-bold text-black">{cat.name}: </span>
                  <span className="text-neutral-800">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'certifications': {
        const visibleCerts = resume.certifications.filter(c => c.visible);
        if (visibleCerts.length === 0) return null;
        return (
          <div key="certifications" className="mb-2 resume-section">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-0.5 mb-1">
              Certifications
            </h3>
            <div className="space-y-0.5 text-[8.5pt]">
              {visibleCerts.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span><strong>{cert.name}</strong> ({cert.issuer})</span>
                  <span>{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="text-black font-sans leading-snug">
      {/* Header */}
      <div className="text-center pb-1.5 mb-2 border-b border-slate-400">
        <h1 className="text-xl font-bold tracking-tight text-black">
          {basics.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[8.5pt] text-neutral-700 mt-0.5">
          {basics.phone && <span>{basics.phone}</span>}
          {basics.email && <span>• {basics.email}</span>}
          {basics.location && <span>• {basics.location}</span>}
          {basics.linkedin && <span>• {basics.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {basics.github && <span>• {basics.github.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {basics.website && <span>• {basics.website.replace(/^https?:\/\/(www\.)?/, '')}</span>}
        </div>
      </div>

      {resume.sectionOrder
        .filter((s) => s.enabled)
        .map((s) => renderSection(s.id))}
    </div>
  );
};
