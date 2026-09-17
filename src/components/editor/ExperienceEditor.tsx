import React from 'react';
import { WorkExperience, BulletItem } from '../../types/resume';
import { BulletInput } from './BulletInput';
import { Plus, Trash2, Eye, EyeOff, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceEditorProps {
  experience: WorkExperience[];
  onChange: (updated: WorkExperience[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ experience, onChange }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(experience[0]?.id || null);

  const handleAddExperience = () => {
    const newId = `exp-${Date.now()}`;
    const newEntry: WorkExperience = {
      id: newId,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      visible: true,
      bullets: [
        {
          id: `b-${Date.now()}-1`,
          text: '',
          visible: true,
        },
      ],
    };
    onChange([newEntry, ...experience]);
    setExpandedId(newId);
  };

  const handleUpdateEntry = (id: string, updates: Partial<WorkExperience>) => {
    onChange(experience.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const handleDeleteEntry = (id: string) => {
    onChange(experience.filter(item => item.id !== id));
  };

  const handleToggleEntryVisible = (id: string) => {
    const entry = experience.find(item => item.id === id);
    if (entry) {
      handleUpdateEntry(id, { visible: !entry.visible });
    }
  };

  // Bullet Point helpers
  const handleAddBullet = (expId: string) => {
    const entry = experience.find(item => item.id === expId);
    if (!entry) return;
    const newBullet: BulletItem = {
      id: `b-${Date.now()}`,
      text: '',
      visible: true,
    };
    handleUpdateEntry(expId, { bullets: [...entry.bullets, newBullet] });
  };

  const handleUpdateBullet = (expId: string, bulletId: string, text: string) => {
    const entry = experience.find(item => item.id === expId);
    if (!entry) return;
    const updatedBullets = entry.bullets.map(b => b.id === bulletId ? { ...b, text } : b);
    handleUpdateEntry(expId, { bullets: updatedBullets });
  };

  const handleToggleBullet = (expId: string, bulletId: string) => {
    const entry = experience.find(item => item.id === expId);
    if (!entry) return;
    const updatedBullets = entry.bullets.map(b => b.id === bulletId ? { ...b, visible: !b.visible } : b);
    handleUpdateEntry(expId, { bullets: updatedBullets });
  };

  const handleDeleteBullet = (expId: string, bulletId: string) => {
    const entry = experience.find(item => item.id === expId);
    if (!entry) return;
    handleUpdateEntry(expId, { bullets: entry.bullets.filter(b => b.id !== bulletId) });
  };

  return (
    <div className="space-y-4">
      {experience.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 rounded-lg">
          <p className="text-slate-400 text-sm mb-3">No work experience entries added yet.</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Plus size={14} /> Add Role
          </button>
        </div>
      ) : (
        experience.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <div
              key={entry.id}
              className={`border rounded-xl transition-all overflow-hidden ${
                entry.visible ? 'bg-slate-900 border-slate-700/80' : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              {/* Header Accordion Bar */}
              <div
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors select-none"
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Briefcase size={16} />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-slate-100 truncate">
                      {entry.position || 'Untitled Position'}
                      {entry.company && <span className="text-slate-400 font-normal"> at {entry.company}</span>}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {entry.startDate || 'Start'} – {entry.current ? 'Present' : entry.endDate || 'End'}
                      {entry.location && ` • ${entry.location}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Eye visibility toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleEntryVisible(entry.id)}
                    title={entry.visible ? 'Hide role from resume' : 'Show role on resume'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      entry.visible ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-amber-400 bg-amber-500/10'
                    }`}
                  >
                    {entry.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  {/* Delete role */}
                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(entry.id)}
                    title="Delete entry"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Accordion toggle */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Form Content */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800 space-y-4 bg-slate-900/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        value={entry.company}
                        onChange={(e) => handleUpdateEntry(entry.id, { company: e.target.value })}
                        placeholder="e.g. Google or Tech Inc."
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Job Title / Role *</label>
                      <input
                        type="text"
                        value={entry.position}
                        onChange={(e) => handleUpdateEntry(entry.id, { position: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={entry.location}
                        onChange={(e) => handleUpdateEntry(entry.id, { location: e.target.value })}
                        placeholder="e.g. Regina, SK (or Remote)"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Start Date</label>
                        <input
                          type="text"
                          value={entry.startDate}
                          onChange={(e) => handleUpdateEntry(entry.id, { startDate: e.target.value })}
                          placeholder="e.g. Jan 2023"
                          className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">End Date</label>
                        <input
                          type="text"
                          disabled={entry.current}
                          value={entry.current ? 'Present' : entry.endDate}
                          onChange={(e) => handleUpdateEntry(entry.id, { endDate: e.target.value })}
                          placeholder="e.g. Dec 2024"
                          className={`w-full border rounded-lg px-2.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none ${
                            entry.current ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-slate-950 border-slate-700/80 focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={entry.current}
                          onChange={(e) => handleUpdateEntry(entry.id, { current: e.target.checked })}
                          className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500"
                        />
                        I currently work here
                      </label>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Achievement Bullet Points (Google X-Y-Z formula)
                      </label>
                      <span className="text-[11px] text-slate-500">
                        {entry.bullets.filter(b => b.visible).length} visible on resume
                      </span>
                    </div>

                    <div className="space-y-2">
                      {entry.bullets.map((bullet, idx) => (
                        <BulletInput
                          key={bullet.id}
                          id={bullet.id}
                          text={bullet.text}
                          visible={bullet.visible}
                          onChange={(text) => handleUpdateBullet(entry.id, bullet.id, text)}
                          onToggleVisible={() => handleToggleBullet(entry.id, bullet.id)}
                          onDelete={() => handleDeleteBullet(entry.id, bullet.id)}
                          onMoveUp={idx > 0 ? () => {
                            const newBullets = [...entry.bullets];
                            [newBullets[idx - 1], newBullets[idx]] = [newBullets[idx], newBullets[idx - 1]];
                            handleUpdateEntry(entry.id, { bullets: newBullets });
                          } : undefined}
                          onMoveDown={idx < entry.bullets.length - 1 ? () => {
                            const newBullets = [...entry.bullets];
                            [newBullets[idx], newBullets[idx + 1]] = [newBullets[idx + 1], newBullets[idx]];
                            handleUpdateEntry(entry.id, { bullets: newBullets });
                          } : undefined}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddBullet(entry.id)}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
                    >
                      <Plus size={13} /> Add Bullet Point
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      <button
        type="button"
        onClick={handleAddExperience}
        className="w-full py-2.5 border border-dashed border-slate-700 hover:border-blue-500/80 rounded-xl text-xs font-medium text-slate-300 hover:text-blue-400 bg-slate-900/40 hover:bg-slate-800/40 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={15} /> Add Another Experience
      </button>
    </div>
  );
};
