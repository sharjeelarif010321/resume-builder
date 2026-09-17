import React from 'react';
import { Basics } from '../../types/resume';
import { AlertCircle, User, Mail, Phone, MapPin, Globe, Linkedin, Github, FileText } from 'lucide-react';
import { findBuzzwords } from '../../engine/buzzwords';

interface BasicsEditorProps {
  basics: Basics;
  onChange: (updated: Basics) => void;
}

export const BasicsEditor: React.FC<BasicsEditorProps> = ({ basics, onChange }) => {
  const handleChange = (field: keyof Basics, value: any) => {
    onChange({ ...basics, [field]: value });
  };

  const streetAddressRegex = /\d+\s+[A-Za-z0-9\s,]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Way|Lane|Ln|Court|Ct)\b/i;
  const hasStreetAddress = basics.location && streetAddressRegex.test(basics.location);

  const summaryBuzzwords = basics.showSummary && basics.summary ? findBuzzwords(basics.summary) : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <User size={13} className="text-blue-400" />
            Full Name *
          </label>
          <input
            type="text"
            value={basics.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. Sharjeel Arif"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Professional Headline */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <FileText size={13} className="text-blue-400" />
            Professional Headline
          </label>
          <input
            type="text"
            value={basics.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            placeholder="e.g. Software Engineer & Systems Architect"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <Mail size={13} className="text-blue-400" />
            Email Address *
          </label>
          <input
            type="email"
            value={basics.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="e.g. yourname@gmail.com"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <Phone size={13} className="text-blue-400" />
            Phone Number *
          </label>
          <input
            type="tel"
            value={basics.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="e.g. +1 (306) 555-0199"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <MapPin size={13} className="text-blue-400" />
            Location (City, State/Province)
          </label>
          <input
            type="text"
            value={basics.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g. Regina, SK, Canada"
            className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
              hasStreetAddress ? 'border-amber-500 focus:border-amber-500 focus:ring-amber-500' : 'border-slate-700/80 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {hasStreetAddress && (
            <div className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-400 bg-amber-500/10 p-2 rounded-md border border-amber-500/20">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>
                <strong>Remove full street address:</strong> Modern ATS only requires "City, Province/State" or "City, Country". Full street numbers consume space and leak unnecessary personal info.
              </span>
            </div>
          )}
        </div>

        {/* Website / Portfolio */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <Globe size={13} className="text-blue-400" />
            Website / Portfolio
          </label>
          <input
            type="url"
            value={basics.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://sharjeelarif.com"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <Linkedin size={13} className="text-blue-400" />
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={basics.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/sharjeelarif"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* GitHub */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <Github size={13} className="text-blue-400" />
            GitHub URL
          </label>
          <input
            type="url"
            value={basics.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/sharjeelarif"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Summary Toggle & Field */}
      <div className="pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={basics.showSummary}
              onChange={(e) => handleChange('showSummary', e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500"
            />
            Include Professional Summary Section
          </label>
          <span className="text-[11px] text-slate-500">
            {basics.showSummary ? 'Visible on resume' : 'Hidden (Recommended for 1-page technical resumes)'}
          </span>
        </div>

        {basics.showSummary && (
          <div>
            <textarea
              value={basics.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Keep it concise (2-3 lines max): Seniority, core tech stack, and primary domain impact. Avoid vague descriptors like 'hard worker'."
              rows={3}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {summaryBuzzwords.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 p-2 rounded-md border border-rose-500/20">
                <AlertCircle size={14} className="shrink-0" />
                <span>
                  <strong>Fluff alert in summary:</strong> Remove {summaryBuzzwords.map(b => `"${b.word}"`).join(', ')}. Replace with specific achievements and specialties.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
