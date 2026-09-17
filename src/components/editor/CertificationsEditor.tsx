import React from 'react';
import { Certification } from '../../types/resume';
import { Plus, Trash2, Eye, EyeOff, Award } from 'lucide-react';

interface CertificationsEditorProps {
  certifications: Certification[];
  onChange: (updated: Certification[]) => void;
}

export const CertificationsEditor: React.FC<CertificationsEditorProps> = ({ certifications, onChange }) => {
  const handleAdd = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      url: '',
      visible: true,
    };
    onChange([...certifications, newCert]);
  };

  const handleUpdate = (id: string, updates: Partial<Certification>) => {
    onChange(certifications.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleDelete = (id: string) => {
    onChange(certifications.filter(c => c.id !== id));
  };

  const handleToggle = (id: string) => {
    const cert = certifications.find(c => c.id === id);
    if (cert) handleUpdate(id, { visible: !cert.visible });
  };

  return (
    <div className="space-y-3">
      {certifications.map(cert => (
        <div
          key={cert.id}
          className={`p-3.5 rounded-xl border transition-all ${
            cert.visible ? 'bg-slate-900 border-slate-700/80' : 'bg-slate-950/40 border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <Award size={16} className="text-amber-400" />
              <span className="text-xs font-semibold text-slate-200">
                {cert.name || 'Untitled Certification'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleToggle(cert.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  cert.visible ? 'text-slate-400 hover:text-slate-200' : 'text-amber-400 bg-amber-500/10'
                }`}
              >
                {cert.visible ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(cert.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <div className="md:col-span-2">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleUpdate(cert.id, { name: e.target.value })}
                placeholder="Certification Name (e.g. AWS Solutions Architect)"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => handleUpdate(cert.id, { issuer: e.target.value })}
                placeholder="Issuer (e.g. AWS, Linux Foundation)"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                value={cert.date}
                onChange={(e) => handleUpdate(cert.id, { date: e.target.value })}
                placeholder="Date / Year (e.g. 2024)"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <input
                type="url"
                value={cert.url || ''}
                onChange={(e) => handleUpdate(cert.id, { url: e.target.value })}
                placeholder="Verification Link (Optional)"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-2.5 border border-dashed border-slate-700 hover:border-amber-500/80 rounded-xl text-xs font-medium text-slate-300 hover:text-amber-400 bg-slate-900/40 hover:bg-slate-800/40 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={15} /> Add Certification
      </button>
    </div>
  );
};
