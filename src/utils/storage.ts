import { ResumeData } from '../types/resume';
import { SAMPLE_RESUME } from './sampleData';
import { decodeResumeFromUrlHash } from './compression';

const STORAGE_KEY = 'resumeforge_data_v1';

export function loadInitialResume(): ResumeData {
  // 1. Check URL Hash first (shareable review link)
  if (typeof window !== 'undefined' && window.location.hash) {
    const fromUrl = decodeResumeFromUrlHash(window.location.hash);
    if (fromUrl) {
      return fromUrl;
    }
  }

  // 2. Check localStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure structure matches
        return {
          ...SAMPLE_RESUME,
          ...parsed,
          basics: { ...SAMPLE_RESUME.basics, ...(parsed.basics || {}) },
          settings: { ...SAMPLE_RESUME.settings, ...(parsed.settings || {}) },
        };
      }
    } catch (err) {
      console.warn('Failed to load resume from localStorage:', err);
    }
  }

  // 3. Fallback to high-quality sample
  return SAMPLE_RESUME;
}

export function saveResume(resume: ResumeData): void {
  if (typeof window === 'undefined') return;
  try {
    const updated = { ...resume, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save resume to localStorage:', err);
  }
}

export function downloadJsonFile(resume: ResumeData): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  const filename = `${resume.basics.fullName.toLowerCase().replace(/\s+/g, '_')}_resume.json`;
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
