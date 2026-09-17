import { ResumeData } from '../types/resume';
import { checkActionVerb } from './actionVerbs';
import { findBuzzwords, BuzzwordViolation } from './buzzwords';

export interface BulletLintResult {
  hasMetric: boolean;
  metricMatches: string[];
  isWeakVerb: boolean;
  weakVerb?: string;
  suggestedVerbs?: string[];
  buzzwords: BuzzwordViolation[];
  isTooShort: boolean;
  isTooLong: boolean;
  score: number; // 0-100
}

export interface ActionItem {
  id: string;
  type: 'remove' | 'add' | 'fix';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  section?: string;
  itemId?: string;
}

export interface ResumeAuditResult {
  overallScore: number; // 0-100
  totalBullets: number;
  bulletsWithMetrics: number;
  metricPercentage: number;
  weakVerbCount: number;
  buzzwordCount: number;
  actionItems: ActionItem[];
  bulletLints: Record<string, BulletLintResult>;
}

// Regex to detect quantifiable impact: numbers, %, $, multipliers (2x, 10x), time units, volume
export const METRIC_REGEX = /\b(\d+(?:\.\d+)?%|\$[\d,]+(?:\.\d+)?[kmb]?|\d+x|\d+\s*(?:k|m|b)\b|\d+\+?\s*(?:users|clients|customers|servers|endpoints|nodes|queries|requests|qps|rps|ms|seconds|minutes|hours|days|weeks|months|years|tb|gb|mb|teams|engineers|developers|dollars))\b|\b\d{2,}\b/i;

export function lintBullet(text: string): BulletLintResult {
  const clean = text.trim();
  if (!clean) {
    return {
      hasMetric: false,
      metricMatches: [],
      isWeakVerb: false,
      buzzwords: [],
      isTooShort: false,
      isTooLong: false,
      score: 0,
    };
  }

  // 1. Metric check
  const metricMatches = clean.match(new RegExp(METRIC_REGEX.source, 'gi')) || [];
  const hasMetric = metricMatches.length > 0;

  // 2. Action verb check
  const verbCheck = checkActionVerb(clean);

  // 3. Buzzwords
  const buzzwords = findBuzzwords(clean);

  // 4. Length checks
  const isTooShort = clean.length < 35;
  const isTooLong = clean.length > 195;

  // Score calculation
  let score = 100;
  if (!hasMetric) score -= 30;
  if (verbCheck.isWeak) score -= 25;
  if (buzzwords.length > 0) score -= 15 * buzzwords.length;
  if (isTooShort) score -= 15;
  if (isTooLong) score -= 10;
  score = Math.max(0, Math.min(100, score));

  return {
    hasMetric,
    metricMatches,
    isWeakVerb: verbCheck.isWeak,
    weakVerb: verbCheck.verb,
    suggestedVerbs: verbCheck.suggestions,
    buzzwords,
    isTooShort,
    isTooLong,
    score,
  };
}

export function auditResume(resume: ResumeData): ResumeAuditResult {
  const actionItems: ActionItem[] = [];
  const bulletLints: Record<string, BulletLintResult> = {};

  let totalBullets = 0;
  let bulletsWithMetrics = 0;
  let weakVerbCount = 0;
  let buzzwordCount = 0;

  // 1. Audit Contact & Basics
  const { basics } = resume;
  if (!basics.email || !basics.email.includes('@')) {
    actionItems.push({
      id: 'missing-email',
      type: 'add',
      priority: 'high',
      title: 'Add a professional email address',
      description: 'A clear, reachable email address is required for recruiters to contact you.',
      section: 'Basics',
    });
  }

  if (!basics.phone) {
    actionItems.push({
      id: 'missing-phone',
      type: 'add',
      priority: 'high',
      title: 'Add a phone number',
      description: 'Include a direct phone number formatted cleanly with country code.',
      section: 'Basics',
    });
  }

  // Check for full street address
  const STREET_ADDRESS_REGEX = /\d+\s+[A-Za-z0-9\s,]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Way|Lane|Ln|Court|Ct)\b/i;
  if (basics.location && STREET_ADDRESS_REGEX.test(basics.location)) {
    actionItems.push({
      id: 'remove-full-address',
      type: 'remove',
      priority: 'medium',
      title: 'Remove full street address',
      description: 'Modern ATS standards require only "City, Province/State" or "City, Country". Full street addresses consume space and pose privacy risks.',
      section: 'Basics',
    });
  }

  // Check for GitHub / LinkedIn
  if (!basics.linkedin) {
    actionItems.push({
      id: 'add-linkedin',
      type: 'add',
      priority: 'medium',
      title: 'Add LinkedIn profile link',
      description: 'Recruiters check LinkedIn profiles to verify background and connections.',
      section: 'Basics',
    });
  }

  if (!basics.github && !basics.website) {
    actionItems.push({
      id: 'add-portfolio',
      type: 'add',
      priority: 'medium',
      title: 'Add GitHub or portfolio website',
      description: 'Showcasing real code repositories or live projects dramatically boosts recruiter interest.',
      section: 'Basics',
    });
  }

  // Check for summary fluff
  if (basics.showSummary && basics.summary) {
    const summaryBuzzwords = findBuzzwords(basics.summary);
    if (summaryBuzzwords.length > 0) {
      actionItems.push({
        id: 'summary-buzzwords',
        type: 'remove',
        priority: 'high',
        title: `Remove clichés from summary: ${summaryBuzzwords.map(b => `"${b.word}"`).join(', ')}`,
        description: 'Replace subjective self-descriptions with concrete years of experience and core technical specialties.',
        section: 'Summary',
      });
      buzzwordCount += summaryBuzzwords.length;
    }
  }

  // 2. Audit Work Experience
  resume.experience.forEach(exp => {
    if (!exp.visible) return;

    // Check if role has bullets
    const visibleBullets = exp.bullets.filter(b => b.visible);
    if (visibleBullets.length === 0) {
      actionItems.push({
        id: `empty-exp-${exp.id}`,
        type: 'add',
        priority: 'high',
        title: `Add achievements for ${exp.position || 'role'} at ${exp.company || 'company'}`,
        description: 'Aim for 3 to 5 impact-driven bullet points per role.',
        section: 'Experience',
        itemId: exp.id,
      });
    }

    exp.bullets.forEach(bullet => {
      if (!bullet.visible) return;
      totalBullets++;
      const lint = lintBullet(bullet.text);
      bulletLints[bullet.id] = lint;

      if (lint.hasMetric) bulletsWithMetrics++;
      if (lint.isWeakVerb) weakVerbCount++;
      if (lint.buzzwords.length > 0) buzzwordCount += lint.buzzwords.length;

      // Generate action item for weak verb
      if (lint.isWeakVerb && lint.weakVerb) {
        actionItems.push({
          id: `weak-verb-${bullet.id}`,
          type: 'fix',
          priority: 'medium',
          title: `Replace weak opener "${lint.weakVerb}" in ${exp.company}`,
          description: `Replace with a strong action verb such as ${lint.suggestedVerbs?.slice(0, 3).join(', ')}.`,
          section: 'Experience',
          itemId: bullet.id,
        });
      }

      // Generate action item for buzzwords
      lint.buzzwords.forEach(bw => {
        actionItems.push({
          id: `buzzword-${bullet.id}-${bw.word}`,
          type: 'remove',
          priority: 'high',
          title: `Cut fluff word "${bw.word}" in ${exp.company}`,
          description: bw.advice,
          section: 'Experience',
          itemId: bullet.id,
        });
      });
    });
  });

  // 3. Audit Projects
  resume.projects.forEach(proj => {
    if (!proj.visible) return;
    if (proj.technologies.length === 0) {
      actionItems.push({
        id: `project-tech-${proj.id}`,
        type: 'add',
        priority: 'medium',
        title: `Add tech stack tags to project: ${proj.name || 'Untitled Project'}`,
        description: 'List key languages, libraries, and infrastructure used (e.g. React, Docker, Postgres).',
        section: 'Projects',
        itemId: proj.id,
      });
    }

    proj.bullets.forEach(bullet => {
      if (!bullet.visible) return;
      totalBullets++;
      const lint = lintBullet(bullet.text);
      bulletLints[bullet.id] = lint;

      if (lint.hasMetric) bulletsWithMetrics++;
      if (lint.isWeakVerb) weakVerbCount++;
      if (lint.buzzwords.length > 0) buzzwordCount += lint.buzzwords.length;
    });
  });

  // 4. Audit Education & High School Redundancy
  const hasPostSecondary = resume.education.some(edu => 
    edu.visible && 
    /(bachelor|master|phd|associate|degree|b\.s\.|m\.s\.|b\.eng|diploma|university|college)/i.test(edu.degree + ' ' + edu.institution)
  );

  const hasHighSchool = resume.education.some(edu =>
    edu.visible && /(high\s*school|secondary\s*school|prep\s*school)/i.test(edu.degree + ' ' + edu.institution)
  );

  if (hasPostSecondary && hasHighSchool) {
    actionItems.push({
      id: 'remove-high-school',
      type: 'remove',
      priority: 'high',
      title: 'Remove High School entry',
      description: 'You have post-secondary university/college education listed. Including high school consumes valuable lines and signals a junior resume.',
      section: 'Education',
    });
  }

  // 5. Audit Skills Section
  const visibleSkillCategories = resume.skills.filter(s => s.visible && s.skills.length > 0);
  if (visibleSkillCategories.length === 0) {
    actionItems.push({
      id: 'missing-skills',
      type: 'add',
      priority: 'high',
      title: 'Add Skills categories',
      description: 'Categorized technical skills (Languages, Frameworks, Cloud/DevOps) are critical for ATS keyword matching.',
      section: 'Skills',
    });
  }

  // 6. Overall Metrics Assessment
  const metricPercentage = totalBullets > 0 ? Math.round((bulletsWithMetrics / totalBullets) * 100) : 0;
  if (totalBullets >= 3 && metricPercentage < 50) {
    actionItems.push({
      id: 'low-metrics',
      type: 'add',
      priority: 'high',
      title: `Increase quantifiable metrics (Currently ${metricPercentage}%)`,
      description: 'Aim for at least 50–70% of bullets to have numbers (%, $, latency, user count, team size). Example: "Reduced build times by 45% using Docker layer caching".',
      section: 'Experience',
    });
  }

  // Calculate Overall Score (0 to 100)
  let score = 100;
  
  // Deduct for missing essentials
  if (!basics.email) score -= 15;
  if (!basics.phone) score -= 10;
  if (!basics.linkedin) score -= 5;
  if (visibleSkillCategories.length === 0) score -= 15;
  if (totalBullets === 0) score -= 25;

  // Deduct for low metric percentage
  if (totalBullets > 0 && metricPercentage < 50) {
    score -= Math.round((50 - metricPercentage) * 0.4);
  }

  // Deduct for weak verbs and buzzwords
  score -= Math.min(20, weakVerbCount * 4);
  score -= Math.min(25, buzzwordCount * 6);
  if (hasPostSecondary && hasHighSchool) score -= 10;

  const overallScore = Math.max(10, Math.min(100, Math.round(score)));

  return {
    overallScore,
    totalBullets,
    bulletsWithMetrics,
    metricPercentage,
    weakVerbCount,
    buzzwordCount,
    actionItems,
    bulletLints,
  };
}
