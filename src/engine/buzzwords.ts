export interface BuzzwordViolation {
  word: string;
  advice: string;
  category: 'fluff' | 'cliche' | 'outdated';
}

export const BUZZWORDS_DATABASE: BuzzwordViolation[] = [
  { word: 'hard worker', advice: 'Subjective claim. Demonstrate diligence through volume or complexity of delivered results.', category: 'fluff' },
  { word: 'hard-working', advice: 'Subjective claim. Cut and prove with impact.', category: 'fluff' },
  { word: 'team player', advice: 'Overused cliché. Show cross-functional collaboration instead.', category: 'cliche' },
  { word: 'results-driven', advice: 'Filler phrase. Let actual metrics prove your results.', category: 'fluff' },
  { word: 'results oriented', advice: 'Filler phrase. State the specific outcome instead.', category: 'fluff' },
  { word: 'results-oriented', advice: 'Filler phrase. State the specific outcome instead.', category: 'fluff' },
  { word: 'self-starter', advice: 'Buzzword. Describe a project or initiative you launched independently.', category: 'cliche' },
  { word: 'detail-oriented', advice: 'Empty assertion. Demonstrate by citing zero-defect deployments or high uptime.', category: 'fluff' },
  { word: 'go-getter', advice: 'Informal cliché. Remove.', category: 'cliche' },
  { word: 'synergy', advice: 'Corporate jargon. Specify exact integration or alignment.', category: 'cliche' },
  { word: 'think outside the box', advice: 'Overused idiom. Describe your actual innovative solution.', category: 'cliche' },
  { word: 'fast learner', advice: 'Implies junior skillset. Highlight how quickly you mastered and delivered a tool instead.', category: 'fluff' },
  { word: 'references available upon request', advice: 'Wastes valuable vertical space. Recruiters assume references are available.', category: 'outdated' },
  { word: 'references available', advice: 'Remove completely. Modern resumes never include reference notes.', category: 'outdated' },
  { word: 'duties included', advice: 'Weak responsibility language. Replace with action-oriented achievements.', category: 'cliche' },
  { word: 'responsible for', advice: 'Passive language. Replace with Spearheaded, Engineered, or Orchestrated.', category: 'cliche' },
  { word: 'good communication skills', advice: 'Generic claim. Mention presentations, documentation, or stakeholder leadership.', category: 'fluff' },
  { word: 'guru', advice: 'Unprofessional title. Use Senior, Specialist, or Lead.', category: 'cliche' },
  { word: 'ninja', advice: 'Unprofessional title. Use Engineer, Architect, or Developer.', category: 'cliche' },
  { word: 'rockstar', advice: 'Unprofessional title. Cut.', category: 'cliche' },
  { word: 'passionate', advice: 'Overused emotional descriptor. Demonstrate enthusiasm through side projects and certifications.', category: 'fluff' },
  { word: 'dynamic', advice: 'Vague buzzword. Cut.', category: 'fluff' },
  { word: 'strategic thinker', advice: 'Show strategic impact through cost reduction or roadmap planning.', category: 'cliche' },
];

export function findBuzzwords(text: string): BuzzwordViolation[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  return BUZZWORDS_DATABASE.filter(item => {
    const regex = new RegExp(`\\b${item.word.replace('-', '[-\\s]')}\\b`, 'i');
    return regex.test(lower);
  });
}
