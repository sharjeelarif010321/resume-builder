import React, { useState } from 'react';
import { SkillCategory } from '../../types/resume';
import { Plus, Trash2, Eye, EyeOff, Wrench, X } from 'lucide-react';

interface SkillsEditorProps {
  skills: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, onChange }) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleAddCategory = () => {
    const newId = `skill-${Date.now()}`;
    const newCategory: SkillCategory = {
      id: newId,
      name: 'New Category',
      skills: [],
      visible: true,
    };
    onChange([...skills, newCategory]);
  };

  const handleUpdateCategory = (id: string, updates: Partial<SkillCategory>) => {
    onChange(skills.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const handleDeleteCategory = (id: string) => {
    onChange(skills.filter(item => item.id !== id));
  };

  const handleToggleVisible = (id: string) => {
    const item = skills.find(s => s.id === id);
    if (item) {
      handleUpdateCategory(id, { visible: !item.visible });
    }
  };

  const handleAddSkill = (catId: string) => {
    const raw = (inputValues[catId] || '').trim();
    if (!raw) return;
    const cat = skills.find(s => s.id === catId);
    if (!cat) return;

    // Support comma separated pastes: e.g. "Python, Go, Docker"
    const newItems = raw
      .split(/[,;\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !cat.skills.includes(s));

    if (newItems.length > 0) {
      handleUpdateCategory(catId, { skills: [...cat.skills, ...newItems] });
    }
    setInputValues({ ...inputValues, [catId]: '' });
  };

  const handleRemoveSkill = (catId: string, skill: string) => {
    const cat = skills.find(s => s.id === catId);
    if (!cat) return;
    handleUpdateCategory(catId, { skills: cat.skills.filter(s => s !== skill) });
  };

  return (
    <div className="space-y-3.5">
      {skills.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 rounded-lg">
          <p className="text-slate-400 text-sm mb-3">No skill categories added yet.</p>
          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Plus size={14} /> Add Category
          </button>
        </div>
      ) : (
        skills.map((category) => (
          <div
            key={category.id}
            className={`p-3.5 rounded-xl border transition-all ${
              category.visible ? 'bg-slate-900 border-slate-700/80' : 'bg-slate-950/40 border-slate-800 opacity-60'
            }`}
          >
            {/* Header / Category Title */}
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2 flex-1">
                <Wrench size={15} className="text-blue-400 shrink-0" />
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => handleUpdateCategory(category.id, { name: e.target.value })}
                  placeholder="e.g. Languages, Cloud & DevOps, Databases"
                  className="bg-transparent border-b border-transparent hover:border-slate-600 focus:border-blue-500 text-sm font-semibold text-slate-100 px-1 py-0.5 focus:outline-none w-full max-w-xs"
                />
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleVisible(category.id)}
                  title={category.visible ? 'Hide category' : 'Show category'}
                  className={`p-1.5 rounded-lg transition-colors ${
                    category.visible ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-amber-400 bg-amber-500/10'
                  }`}
                >
                  {category.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(category.id)}
                  title="Delete category"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Chips & Input Container */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950 border border-slate-800 rounded-lg min-h-[42px]">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700/80 hover:border-slate-600 transition-colors"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(category.id, skill)}
                    className="text-slate-400 hover:text-rose-400 ml-0.5"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={inputValues[category.id] || ''}
                onChange={(e) => setInputValues({ ...inputValues, [category.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddSkill(category.id);
                  }
                }}
                onBlur={() => handleAddSkill(category.id)}
                placeholder={category.skills.length === 0 ? "Type skill & press Enter (or paste comma-separated list)..." : "Add more..."}
                className="bg-transparent border-none text-xs text-slate-100 placeholder-slate-500 focus:outline-none flex-1 min-w-[140px] px-1"
              />
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={handleAddCategory}
        className="w-full py-2.5 border border-dashed border-slate-700 hover:border-blue-500/80 rounded-xl text-xs font-medium text-slate-300 hover:text-blue-400 bg-slate-900/40 hover:bg-slate-800/40 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={15} /> Add Another Skill Category
      </button>
    </div>
  );
};
