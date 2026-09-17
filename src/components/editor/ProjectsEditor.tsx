import React, { useState } from 'react';
import { Project, BulletItem } from '../../types/resume';
import { BulletInput } from './BulletInput';
import { Plus, Trash2, Eye, EyeOff, FolderGit2, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (updated: Project[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ projects, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const handleAddProject = () => {
    const newId = `proj-${Date.now()}`;
    const newEntry: Project = {
      id: newId,
      name: '',
      role: '',
      technologies: [],
      url: '',
      githubUrl: '',
      bullets: [
        {
          id: `b-${Date.now()}-1`,
          text: '',
          visible: true,
        },
      ],
      visible: true,
    };
    onChange([newEntry, ...projects]);
    setExpandedId(newId);
  };

  const handleUpdateEntry = (id: string, updates: Partial<Project>) => {
    onChange(projects.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const handleDeleteEntry = (id: string) => {
    onChange(projects.filter(item => item.id !== id));
  };

  const handleToggleEntryVisible = (id: string) => {
    const entry = projects.find(item => item.id === id);
    if (entry) {
      handleUpdateEntry(id, { visible: !entry.visible });
    }
  };

  // Tech tags
  const handleAddTech = (projId: string) => {
    const tech = (techInputs[projId] || '').trim();
    if (!tech) return;
    const entry = projects.find(p => p.id === projId);
    if (!entry) return;
    if (!entry.technologies.includes(tech)) {
      handleUpdateEntry(projId, { technologies: [...entry.technologies, tech] });
    }
    setTechInputs({ ...techInputs, [projId]: '' });
  };

  const handleRemoveTech = (projId: string, tech: string) => {
    const entry = projects.find(p => p.id === projId);
    if (!entry) return;
    handleUpdateEntry(projId, { technologies: entry.technologies.filter(t => t !== tech) });
  };

  // Bullets
  const handleAddBullet = (projId: string) => {
    const entry = projects.find(p => p.id === projId);
    if (!entry) return;
    const newBullet: BulletItem = {
      id: `b-${Date.now()}`,
      text: '',
      visible: true,
    };
    handleUpdateEntry(projId, { bullets: [...entry.bullets, newBullet] });
  };

  const handleUpdateBullet = (projId: string, bulletId: string, text: string) => {
    const entry = projects.find(p => p.id === projId);
    if (!entry) return;
    handleUpdateEntry(projId, {
      bullets: entry.bullets.map(b => b.id === bulletId ? { ...b, text } : b),
    });
  };

  const handleToggleBullet = (projId: string, bulletId: string) => {
    const entry = projects.find(p => p.id === projId);
    if (!entry) return;
    handleUpdateEntry(projId, {
      bullets: entry.bullets.map(b => b.id === bulletId ? { ...b, visible: !b.visible } : b),
    });
  };

  const handleDeleteBullet = (projId: string, bulletId: string) => {
    const entry = projects.find(p => p.id === projId);
    if (!entry) return;
    handleUpdateEntry(projId, {
      bullets: entry.bullets.filter(b => b.id !== bulletId),
    });
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 rounded-lg">
          <p className="text-slate-400 text-sm mb-3">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Plus size={14} /> Add Project
          </button>
        </div>
      ) : (
        projects.map((entry) => {
          const isExpanded = expandedId === entry.id;

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
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <FolderGit2 size={16} />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-slate-100 truncate">
                      {entry.name || 'Untitled Project'}
                      {entry.role && <span className="text-slate-400 font-normal"> ({entry.role})</span>}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      {entry.technologies.length > 0 ? entry.technologies.join(', ') : 'No technologies tagged'}
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
                    title="Delete project"
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

              {/* Form Content */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800 space-y-3.5 bg-slate-900/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Project Name *</label>
                      <input
                        type="text"
                        value={entry.name}
                        onChange={(e) => handleUpdateEntry(entry.id, { name: e.target.value })}
                        placeholder="e.g. Distributed Task Queue"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Your Role / Description</label>
                      <input
                        type="text"
                        value={entry.role || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, { role: e.target.value })}
                        placeholder="e.g. Creator & Maintainer"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Live Demo URL</label>
                      <input
                        type="url"
                        value={entry.url || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, { url: e.target.value })}
                        placeholder="https://myproject.com"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">GitHub / Repo URL</label>
                      <input
                        type="url"
                        value={entry.githubUrl || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, { githubUrl: e.target.value })}
                        placeholder="https://github.com/user/project"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Technologies Used (Type and press Enter)
                    </label>
                    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950 border border-slate-700/80 rounded-lg min-h-[42px]">
                      {entry.technologies.map(tech => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTech(entry.id, tech)}
                            className="hover:text-white"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={techInputs[entry.id] || ''}
                        onChange={(e) => setTechInputs({ ...techInputs, [entry.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault();
                            handleAddTech(entry.id);
                          }
                        }}
                        placeholder={entry.technologies.length === 0 ? "e.g. React, Docker, Go" : "Add more..."}
                        className="bg-transparent border-none text-xs text-slate-100 placeholder-slate-500 focus:outline-none flex-1 min-w-[100px]"
                      />
                    </div>
                  </div>

                  {/* Bullets */}
                  <div className="pt-2 space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      Key Highlights & Accomplishments
                    </label>
                    <div className="space-y-2">
                      {entry.bullets.map((bullet) => (
                        <BulletInput
                          key={bullet.id}
                          id={bullet.id}
                          text={bullet.text}
                          visible={bullet.visible}
                          onChange={(text) => handleUpdateBullet(entry.id, bullet.id, text)}
                          onToggleVisible={() => handleToggleBullet(entry.id, bullet.id)}
                          onDelete={() => handleDeleteBullet(entry.id, bullet.id)}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddBullet(entry.id)}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
                    >
                      <Plus size={13} /> Add Highlight
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
        onClick={handleAddProject}
        className="w-full py-2.5 border border-dashed border-slate-700 hover:border-emerald-500/80 rounded-xl text-xs font-medium text-slate-300 hover:text-emerald-400 bg-slate-900/40 hover:bg-slate-800/40 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={15} /> Add Another Project
      </button>
    </div>
  );
};
