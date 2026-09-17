import React from 'react';
import { Education } from '../../types/resume';
import { Plus, Trash2, Eye, EyeOff, GraduationCap, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface EducationEditorProps {
  education: Education[];
  onChange: (updated: Education[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({ education, onChange }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(education[0]?.id || null);

  const hasPostSecondary = education.some(edu =>
    edu.visible && /(bachelor|master|phd|associate|degree|b\.s\.|m\.s\.|b\.eng|diploma|university|college)/i.test(edu.degree + ' ' + edu.institution)
  );

  const handleAddEducation = () => {
    const newId = `edu-${Date.now()}`;
    const newEntry: Education = {
      id: newId,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      visible: true,
    };
    onChange([newEntry, ...education]);
    setExpandedId(newId);
  };

  const handleUpdateEntry = (id: string, updates: Partial<Education>) => {
    onChange(education.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const handleDeleteEntry = (id: string) => {
    onChange(education.filter(item => item.id !== id));
  };

  const handleToggleEntryVisible = (id: string) => {
    const entry = education.find(item => item.id === id);
    if (entry) {
      handleUpdateEntry(id, { visible: !entry.visible });
    }
  };

  return (
    <div className="space-y-4">
      {education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 rounded-lg">
          <p className="text-slate-400 text-sm mb-3">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAddEducation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Plus size={14} /> Add Education
          </button>
        </div>
      ) : (
        education.map((entry) => {
          const isExpanded = expandedId === entry.id;
          const isHighSchool = /(high\s*school|secondary\s*school)/i.test(entry.institution + ' ' + entry.degree);

          return (
            <div
              key={entry.id}
              className={`border rounded-xl transition-all overflow-hidden ${
                entry.visible ? 'bg-slate-900 border-slate-700/80' : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              {/* Header Bar */}
              <div
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors select-none"
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <GraduationCap size={16} />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-slate-100 truncate">
                      {entry.degree ? `${entry.degree}${entry.fieldOfStudy ? ` in ${entry.fieldOfStudy}` : ''}` : 'Untitled Degree'}
                      {entry.institution && <span className="text-slate-400 font-normal"> at {entry.institution}</span>}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {entry.startDate || 'Start'} – {entry.endDate || 'Graduation'}
                      {entry.location && ` • ${entry.location}`}
                      {entry.gpa && ` • GPA: ${entry.gpa}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => handleToggleEntryVisible(entry.id)}
                    title={entry.visible ? 'Hide from resume' : 'Show on resume'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      entry.visible ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-amber-400 bg-amber-500/10'
                    }`}
                  >
                    {entry.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(entry.id)}
                    title="Delete entry"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* High School Warning */}
              {isHighSchool && hasPostSecondary && entry.visible && (
                <div className="px-4 py-2 bg-amber-500/10 border-t border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle size={14} className="shrink-0" />
                    <strong>Redundant Element:</strong> High school is unnecessary once you have post-secondary education.
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleEntryVisible(entry.id)}
                    className="underline text-amber-200 hover:text-white shrink-0 ml-2"
                  >
                    Hide High School
                  </button>
                </div>
              )}

              {/* Form Content */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">University / College *</label>
                      <input
                        type="text"
                        value={entry.institution}
                        onChange={(e) => handleUpdateEntry(entry.id, { institution: e.target.value })}
                        placeholder="e.g. University of Regina"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Degree Type *</label>
                      <input
                        type="text"
                        value={entry.degree}
                        onChange={(e) => handleUpdateEntry(entry.id, { degree: e.target.value })}
                        placeholder="e.g. Bachelor of Science"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Major / Field of Study</label>
                      <input
                        type="text"
                        value={entry.fieldOfStudy}
                        onChange={(e) => handleUpdateEntry(entry.id, { fieldOfStudy: e.target.value })}
                        placeholder="e.g. Computer Science"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={entry.location}
                        onChange={(e) => handleUpdateEntry(entry.id, { location: e.target.value })}
                        placeholder="e.g. Regina, SK"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Start Year</label>
                        <input
                          type="text"
                          value={entry.startDate}
                          onChange={(e) => handleUpdateEntry(entry.id, { startDate: e.target.value })}
                          placeholder="e.g. 2018"
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Graduation Year</label>
                        <input
                          type="text"
                          value={entry.endDate}
                          onChange={(e) => handleUpdateEntry(entry.id, { endDate: e.target.value })}
                          placeholder="e.g. 2022"
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">GPA (Optional)</label>
                      <input
                        type="text"
                        value={entry.gpa || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, { gpa: e.target.value })}
                        placeholder="e.g. 3.8 / 4.0 (Leave blank if < 3.5)"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      <button
        type="button"
        onClick={handleAddEducation}
        className="w-full py-2.5 border border-dashed border-slate-700 hover:border-indigo-500/80 rounded-xl text-xs font-medium text-slate-300 hover:text-indigo-400 bg-slate-900/40 hover:bg-slate-800/40 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={15} /> Add Another Education
      </button>
    </div>
  );
};
