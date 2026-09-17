export type TemplateId = 'classic' | 'modern' | 'compact';
export type FontFamily = 'serif' | 'sans' | 'mono';
export type FontSize = 'compact' | 'standard' | 'relaxed';
export type MarginSize = 'compact' | 'standard' | 'relaxed';

export interface BulletItem {
  id: string;
  text: string;
  visible: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: BulletItem[];
  visible: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  visible: boolean;
}

export interface Project {
  id: string;
  name: string;
  role?: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  bullets: BulletItem[];
  visible: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
  visible: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  visible: boolean;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  bullets: BulletItem[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
  visible: boolean;
}

export interface Basics {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  showSummary: boolean;
}

export type SectionType = 
  | 'summary'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'custom';

export interface SectionMeta {
  id: SectionType;
  label: string;
  enabled: boolean;
}

export interface ResumeSettings {
  template: TemplateId;
  fontFamily: FontFamily;
  fontSize: FontSize;
  marginSize: MarginSize;
  accentColor: string;
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  basics: Basics;
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  customSections: CustomSection[];
  sectionOrder: SectionMeta[];
  settings: ResumeSettings;
}
