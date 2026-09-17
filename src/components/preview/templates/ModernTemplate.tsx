import React from 'react';
import { ResumeData, SectionType } from '../../../types/resume';

interface TemplateProps {
  resume: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, settings } = resume;

  const fontClass = 
    settings.fontFamily === 'serif' ? 'font-serif' : 
    settings.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  const fontSizeClass =
    settings.fontSize === 'compact' ? 'text-[9.5pt] leading-[1.25]' :
    settings.fontSize === 'relaxed' ? 'text-[11pt] leading-[1.45]' :
    'text-[10pt] leading-[1.35]';

  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case 'summary':
        if (!basics.showSummary || !basics.summary) return null;
        return (
          <div key="summary" className="mb-3.5 resume-section">
            <h3 className="text-xs uppercase font-bold tracking-wider text-blue-900 border-b border-blue-200 pb-0.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              About Me
            </h3>
            <p className="text-justify text-neutral-800">{basics.summary}</p>
          </div>
        );

      case 'experience': {
        const visibleExp = resume.experience.filter(e => e.visible);
        if (visibleExp.length === 0) return null;
        return (
          <div key="experience" className="mb-3.5 resume-section">
            <h3 className="text-xs uppercase font-bold tracking-wider text-blue-900 border-b border-blue-200 pb-0.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Experience
            </h3>
            <div className="space-y-3">
              {visibleExp.map((exp) => {
                const visibleBullets = exp.bullets.filter(b => b.visible);
                return (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{exp.position}</span>
                      <span className="text-[0.85em] text-slate-600 font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[0.9em] text-blue-800 font-medium">
                      <span>{exp.company}</span>
                      <span className="text-slate-500 font-normal">{exp.location}</span>
                    </div>

                    {visibleBullets.length > 0 && (
                      <ul className="list-disc ml-4 mt-1 space-y-0.5 text-neutral-800">
                        {visibleBullets.map((b) => (
                          <li key={b.id} className="pl-0.5">
                            {b.text}
                          </li>
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
          <div key="projects" className="mb-3.5 resume-section">
            <h3 className="text-xs uppercase font-bold tracking-wider text-blue-900 border-b border-blue-200 pb-0.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Projects
            </h3>
            <div className="space-y-2">
              {visibleProjects.map((proj) => {
                const visibleBullets = proj.bullets.filter(b => b.visible);
                return (
                  <div key={proj.id} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <div className="font-bold text-slate-900">
                        <span>{proj.name}</span>
                        {proj.technologies.length > 0 && (
                          <span className="font-normal text-[0.85em] text-slate-600 ml-1.5">
                            [{proj.technologies.join(', ')}]
                          </span>
                        )}
                      </div>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[0.85em] text-blue-700 hover:underline font-medium"
                        >
                          {proj.url.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>

                    {visibleBullets.length > 0 && (
                      <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-neutral-800">
                        {visibleBullets.map((b) => (
                          <li key={b.id} className="pl-0.5">
                            {b.text}
                          </li>
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
          <div key="education" className="mb-3.5 resume-section">
            <h3 className="text-xs uppercase font-bold tracking-wider text-blue-900 border-b border-blue-200 pb-0.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Education
            </h3>
            <div className="space-y-1.5">
              {visibleEdu.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{edu.institution}</span>
                    <span className="text-[0.85em] font-medium text-slate-600">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[0.9em] text-slate-700">
                    <span>
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                      {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                    </span>
                    <span className="text-slate-500">{edu.location}</span>
                  </div>
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
          <div key="skills" className="mb-3.5 resume-section">
            <h3 className="text-xs uppercase font-bold tracking-wider text-blue-900 border-b border-blue-200 pb-0.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Technical Skills
            </h3>
            <div className="space-y-1 text-neutral-800">
              {visibleSkills.map((cat) => (
                <div key={cat.id} className="text-[0.95em]">
                  <strong className="font-semibold text-slate-900">{cat.name}: </strong>
                  <span>{cat.skills.join(', ')}</span>
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
          <div key="certifications" className="mb-3.5 resume-section">
            <h3 className="text-xs uppercase font-bold tracking-wider text-blue-900 border-b border-blue-200 pb-0.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Certifications
            </h3>
            <div className="space-y-1 text-neutral-800">
              {visibleCerts.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-[0.95em]">
                  <div>
                    <span className="font-semibold text-slate-900">{cert.name}</span>
                    {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="text-[0.85em] text-slate-500">{cert.date}</span>}
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
    <div className={`text-slate-900 ${fontClass} ${fontSizeClass}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-blue-600 pb-3 mb-3 gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {basics.fullName || 'Your Name'}
          </h1>
          {basics.headline && (
            <p className="text-xs font-semibold text-blue-700 mt-0.5">
              {basics.headline}
            </p>
          )}
        </div>

        <div className="text-right text-[0.82em] text-slate-600 space-y-0.5 self-end sm:self-auto">
          <div>{basics.phone} {basics.phone && basics.email && '•'} {basics.email}</div>
          <div>{basics.location}</div>
          <div className="space-x-1.5 text-blue-800 font-medium">
            {basics.linkedin && (
              <a href={basics.linkedin} target="_blank" rel="noreferrer">
                {basics.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {basics.github && (
              <a href={basics.github} target="_blank" rel="noreferrer">
                {basics.github.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {basics.website && (
              <a href={basics.website} target="_blank" rel="noreferrer">
                {basics.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
          </div>
        </div>
      </div>

      {resume.sectionOrder
        .filter((s) => s.enabled)
        .map((s) => renderSection(s.id))}
    </div>
  );
};
