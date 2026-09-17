import LZString from 'lz-string';
import { ResumeData } from '../types/resume';

export function encodeResumeToUrlHash(resume: ResumeData): string {
  try {
    const json = JSON.stringify(resume);
    const compressed = LZString.compressToEncodedURIComponent(json);
    return `#data=${compressed}`;
  } catch (err) {
    console.error('Failed to encode resume to URL:', err);
    return '';
  }
}

export function decodeResumeFromUrlHash(hash: string): ResumeData | null {
  try {
    if (!hash || !hash.includes('#data=')) return null;
    const compressed = hash.split('#data=')[1];
    if (!compressed) return null;
    const json = LZString.decompressFromEncodedURIComponent(compressed);
    if (!json) return null;
    return JSON.parse(json) as ResumeData;
  } catch (err) {
    console.error('Failed to decode resume from URL:', err);
    return null;
  }
}
