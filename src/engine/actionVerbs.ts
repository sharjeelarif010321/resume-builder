export interface VerbCategory {
  name: string;
  verbs: string[];
}

export const STRONG_ACTION_VERBS: VerbCategory[] = [
  {
    name: 'Engineering & Architecture',
    verbs: [
      'Architected', 'Engineered', 'Developed', 'Constructed', 'Designed',
      'Configured', 'Automated', 'Deployed', 'Refactored', 'Standardized',
      'Containerized', 'Implemented', 'Integrated', 'Built', 'Orchestrated'
    ],
  },
  {
    name: 'Optimization & Performance',
    verbs: [
      'Optimized', 'Accelerated', 'Streamlined', 'Scaled', 'Enhanced',
      'Boosted', 'Reduced', 'Minimized', 'Maximized', 'Consolidated',
      'Eliminated', 'Upgraded', 'Overhauled', 'Expedited', 'Strengthened'
    ],
  },
  {
    name: 'Leadership & Execution',
    verbs: [
      'Spearheaded', 'Led', 'Directed', 'Pioneered', 'Delivered',
      'Mobilized', 'Guided', 'Championed', 'Mentored', 'Delegated',
      'Organized', 'Coordinated', 'Established', 'Founded', 'Instituted'
    ],
  },
  {
    name: 'Problem Solving & Quality',
    verbs: [
      'Diagnosed', 'Resolved', 'Troubleshot', 'Audited', 'Identified',
      'Remediated', 'Mitigated', 'Overcame', 'Validated', 'Tested',
      'Debugged', 'Enforced', 'Corrected', 'Prevented', 'Secured'
    ],
  },
  {
    name: 'Research & Innovation',
    verbs: [
      'Discovered', 'Devised', 'Formulated', 'Analyzed', 'Calculated',
      'Benchmarked', 'Evaluated', 'Synthesized', 'Investigated', 'Quantified'
    ],
  },
];

// Weak verbs mapped to strong alternatives
export const WEAK_VERB_REPLACEMENTS: Record<string, string[]> = {
  helped: ['Facilitated', 'Collaborated', 'Supported', 'Empowered', 'Spearheaded'],
  assisted: ['Coordinated', 'Facilitated', 'Engineered alongside', 'Contributed to'],
  'worked on': ['Engineered', 'Built', 'Developed', 'Maintained', 'Delivered'],
  'was responsible for': ['Spearheaded', 'Directed', 'Managed', 'Engineered', 'Executed'],
  'responsible for': ['Spearheaded', 'Directed', 'Managed', 'Engineered', 'Executed'],
  handled: ['Managed', 'Administered', 'Resolved', 'Operated', 'Orchestrated'],
  did: ['Executed', 'Conducted', 'Engineered', 'Implemented'],
  tried: ['Pioneered', 'Initiated', 'Investigated', 'Explored'],
  made: ['Constructed', 'Built', 'Produced', 'Formulated', 'Devised'],
  utilized: ['Leveraged', 'Applied', 'Implemented', 'Employed'],
  used: ['Leveraged', 'Implemented', 'Deployed', 'Applied'],
  participated: ['Collaborated with', 'Contributed to', 'Co-authored', 'Engaged in'],
  involved: ['Collaborated on', 'Engineered', 'Contributed to'],
  looked: ['Inspected', 'Analyzed', 'Evaluated', 'Audited'],
  talked: ['Presented', 'Negotiated', 'Communicated', 'Consulted with'],
  managed: ['Orchestrated', 'Guided', 'Steered', 'Coordinated', 'Oversaw'],
};

export function checkActionVerb(text: string): { isWeak: boolean; verb?: string; suggestions?: string[] } {
  if (!text || text.trim().length === 0) return { isWeak: false };

  const clean = text.trim().toLowerCase();
  
  // Check multi-word weak openers first
  for (const [weakPhrase, suggestions] of Object.entries(WEAK_VERB_REPLACEMENTS)) {
    if (clean.startsWith(weakPhrase + ' ') || clean === weakPhrase) {
      return { isWeak: true, verb: weakPhrase, suggestions };
    }
  }

  // Check single-word openers
  const firstWord = clean.split(/\s+/)[0]?.replace(/[^a-z]/g, '');
  if (firstWord && WEAK_VERB_REPLACEMENTS[firstWord]) {
    return { isWeak: true, verb: firstWord, suggestions: WEAK_VERB_REPLACEMENTS[firstWord] };
  }

  return { isWeak: false };
}
