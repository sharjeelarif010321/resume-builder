import React from 'react';
import { ResumeData, SectionType } from '../../../types/resume';

interface TemplateProps {
  resume: ResumeData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { basics, settings } = resume;

  // Font family mapping
  const fontClass = 
    settings.fontFamily === 'serif' ? 'font-serif' : 
    settings.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  // Font size mapping
  const fontSizeClass =
    settings.fontSize === 'compact' ? 'text-[9.5pt] leading-[1.25]' :
    settings.fontSize === 'relaxed' ? 'text-[11pt] leading-[1.45]' :
    'text-[10pt] leading-[1.35]';

  // Render individual sections based on order
  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case 'summary':
        if (!basics.showSummary || !basics.summary) return null;
        return (
          <div key="summary" className="mb-3.5 resume-section">
            <h3 className="text-xs uppercase tracking-wider font-bold border-b border-black pb-0.5 mb-1.5 text-black">
              Professional Summary
            </h3>
            <p className="text-justify text-neutral-800">{basics.summary}</p>
          </div>
        );

      case 'experience': {
        const visibleExp = resume.experience.filter(e => e.visible);
        if (visibleExp.length === 0) return null;
        return (
          <div key="experience" className="mb-3.5 resume-section">
            <h3 className="text-xs uppercase tracking-wider font-bold border-b border-black pb-0.5 mb-1.5 text-black">
              Experience
            </h3>
            <div className="space-y-2.5">
              {visibleExp.map((exp) => {
                const visibleBullets = exp.bullets.filter(b => b.visible);
                return (
                  <div key={exp.id} className="break-inside-avoid">
                    {/* Role Header */}
                    <div className="flex justify-between items-baseline font-bold text-black">
                      <span>{exp.position}</span>
                      <span className="font-normal text-[0.9em]">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="flex justify-between items-baseline italic text-neutral-800 text-[0.95em]">
                      <span>{exp.company}</span>
                      <span className="not-italic text-[0.9em]">{exp.location}</span>
                    </div>

                    {/* Bullets */}
                    {visibleBullets.length > 0 && (
                      <ul className="list-disc ml-4 mt-1 space-y-0.5 text-neutral-900">
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
            <h3 className="text-xs uppercase tracking-wider font-bold border-b border-black pb-0.5 mb-1.5 text-black">
              Projects
            </h3>
            <div className="space-y-2">
              {visibleProjects.map((proj) => {
                const visibleBullets = proj.bullets.filter(b => b.visible);
                return (
                  <div key={proj.id} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline text-black">
                      <div className="font-bold">
                        <span>{proj.name}</span>
                        {proj.technologies.length > 0 && (
                          <span className="font-normal text-[0.9em] text-neutral-700 ml-1.5">
                            | <em>{proj.technologies.join(', ')}</em>
                          </span>
                        )}
                      </div>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[0.85em] text-neutral-600 underline font-normal"
                        >
                          {proj.url.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>

                    {visibleBullets.length > 0 && (
                      <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-neutral-900">
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
            <h3 className="text-xs uppercase tracking-wider font-bold border-b border-black pb-0.5 mb-1.5 text-black">
              Education
            </h3>
            <div className="space-y-1.5">
              {visibleEdu.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>{edu.institution}</span>
                    <span className="font-normal text-[0.9em]">{edu.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-neutral-800 text-[0.95em]">
                    <span className="italic">
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                      {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                    </span>
                    <span className="text-[0.9em]">{edu.startDate} – {edu.endDate}</span>
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
            <h3 className="text-xs uppercase tracking-wider font-bold border-b border-black pb-0.5 mb-1.5 text-black">
              Technical Skills
            </h3>
            <div className="space-y-1 text-neutral-900">
              {visibleSkills.map((cat) => (
                <div key={cat.id} className="text-[0.95em]">
                  <strong className="font-bold text-black">{cat.name}: </strong>
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
            <h3 className="text-xs uppercase tracking-wider font-bold border-b border-black pb-0.5 mb-1.5 text-black">
              Certifications
            </h3>
            <div className="space-y-1 text-neutral-900">
              {visibleCerts.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-[0.95em]">
                  <div>
                    <span className="font-semibold text-black">{cert.name}</span>
                    {cert.issuer && <span className="text-neutral-700"> — {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="text-[0.9em] text-neutral-600">{cert.date}</span>}
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
    <div className={`text-black ${fontClass} ${fontSizeClass}`}>
      {/* Header */}
      <div className="text-center pb-2 mb-3 border-b border-neutral-300">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-1">
          {basics.fullName || 'Your Name'}
        </h1>
        {basics.headline && (
          <p className="text-xs font-medium text-neutral-700 mb-1.5">
            {basics.headline}
          </p>
        )}

        {/* Contact info links line */}
        <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-[0.85em] text-neutral-800">
          {basics.phone && <span>{basics.phone}</span>}
          {basics.email && (
            <>
              {basics.phone && <span>•</span>}
              <a href={`mailto:${basics.email}`} className="text-black hover:underline">
                {basics.email}
              </a>
            </>
          )}
          {basics.location && (
            <>
              <span>•</span>
              <span>{basics.location}</span>
            </>
          )}
          {basics.linkedin && (
            <>
              <span>•</span>
              <a href={basics.linkedin} target="_blank" rel="noreferrer" className="text-black hover:underline">
                {basics.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </>
          )}
          {basics.github && (
            <>
              <span>•</span>
              <a href={basics.github} target="_blank" rel="noreferrer" className="text-black hover:underline">
                {basics.github.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </>
          )}
          {basics.website && (
            <>
              <span>•</span>
              <a href={basics.website} target="_blank" rel="noreferrer" className="text-black hover:underline">
                {basics.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </>
          )}
        </div>
      </div>

      {/* Render sections in user-defined order */}
      {resume.sectionOrder
        .filter((s) => s.enabled)
        .map((s) => renderSection(s.id))}
    </div>
  );
};
