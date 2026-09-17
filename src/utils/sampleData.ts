import { ResumeData } from '../types/resume';

export const SAMPLE_RESUME: ResumeData = {
  id: 'default-resume',
  title: 'Software Engineer',
  updatedAt: new Date().toISOString(),
  basics: {
    fullName: 'Sharjeel Arif',
    headline: 'Software Engineer & Systems Architect',
    email: 'sharjeelarif010321@gmail.com',
    phone: '+1 (306) 807-3545',
    location: 'Regina, SK, Canada',
    website: 'https://www.sharjeelarif.com',
    linkedin: 'https://linkedin.com/in/sharjeelarif',
    github: 'https://github.com/sharjeelarif',
    summary: 'Full-Stack Software Engineer specializing in distributed web applications, automated cloud infrastructure, and low-latency microservices with React, TypeScript, and Docker.',
    showSummary: false,
  },
  experience: [
    {
      id: 'exp-1',
      company: 'High-Growth Tech Inc.',
      position: 'Senior Software Engineer',
      location: 'Regina, SK',
      startDate: 'Jan 2024',
      endDate: 'Present',
      current: true,
      visible: true,
      bullets: [
        {
          id: 'b-101',
          text: 'Architected distributed event-driven microservices handling 25,000+ daily requests with 99.98% uptime using Node.js, Docker, and PostgreSQL.',
          visible: true,
        },
        {
          id: 'b-102',
          text: 'Engineered automated CI/CD deployment pipelines on Cloudflare Workers, slashing frontend build and release cycles by 45%.',
          visible: true,
        },
        {
          id: 'b-103',
          text: 'Optimized database indexing and caching strategies in Redis, reducing P95 query latency from 320ms down to 18ms across 10M+ rows.',
          visible: true,
        },
        {
          id: 'b-104',
          text: 'Mentored 4 junior engineers on clean architecture patterns, code quality, and test-driven development.',
          visible: true,
        },
      ],
    },
    {
      id: 'exp-2',
      company: 'Innovate Solutions',
      position: 'Software Developer',
      location: 'Saskatoon, SK',
      startDate: 'May 2022',
      endDate: 'Dec 2023',
      current: false,
      visible: true,
      bullets: [
        {
          id: 'b-201',
          text: 'Developed responsive web applications in React and TypeScript serving 12,000+ active monthly enterprise users.',
          visible: true,
        },
        {
          id: 'b-202',
          text: 'Automated document ingestion and OCR workflows, cutting manual document processing time by 60%.',
          visible: true,
        },
        {
          id: 'b-203',
          text: 'Integrated secure REST and GraphQL API gateways with zero security regressions during quarterly audits.',
          visible: true,
        },
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of Regina',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      location: 'Regina, SK',
      startDate: '2018',
      endDate: '2022',
      gpa: '3.8 / 4.0',
      visible: true,
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'ResumeForge - ATS Linter & Builder',
      role: 'Creator & Lead Architect',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      url: 'https://resume.sharjeelarif.com',
      githubUrl: 'https://github.com/sharjeelarif/resume-builder',
      bullets: [
        {
          id: 'b-301',
          text: 'Engineered a client-side ATS resume linter with real-time heuristic analysis evaluating action verbs, metrics, and overused buzzwords.',
          visible: true,
        },
        {
          id: 'b-302',
          text: 'Implemented zero-backend URL hash compression enabling instant sharing of complete resume states with sub-50ms render latency.',
          visible: true,
        },
      ],
      visible: true,
    },
    {
      id: 'proj-2',
      name: 'Self-Hosted Cloud Infrastructure',
      role: 'Homelab Architect',
      technologies: ['Docker', 'Cloudflare Tunnels', 'Debian', 'Prometheus'],
      bullets: [
        {
          id: 'b-303',
          text: 'Orchestrated 15+ containerized production services behind Cloudflare Zero Trust tunnels with automated metrics collection in Grafana.',
          visible: true,
        },
      ],
      visible: true,
    },
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML5/CSS3', 'Bash'],
      visible: true,
    },
    {
      id: 'skill-2',
      name: 'Frameworks & Libraries',
      skills: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Vite'],
      visible: true,
    },
    {
      id: 'skill-3',
      name: 'Tools & DevOps',
      skills: ['Docker', 'Git', 'Cloudflare Workers', 'PostgreSQL', 'Redis', 'Linux (Debian)'],
      visible: true,
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      visible: true,
    },
  ],
  customSections: [],
  sectionOrder: [
    { id: 'summary', label: 'Professional Summary', enabled: false },
    { id: 'experience', label: 'Work Experience', enabled: true },
    { id: 'projects', label: 'Projects', enabled: true },
    { id: 'education', label: 'Education', enabled: true },
    { id: 'skills', label: 'Technical Skills', enabled: true },
    { id: 'certifications', label: 'Certifications', enabled: true },
  ],
  settings: {
    template: 'classic',
    fontFamily: 'serif',
    fontSize: 'standard',
    marginSize: 'standard',
    accentColor: '#1e293b',
  },
};
