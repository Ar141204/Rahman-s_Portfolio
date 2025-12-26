import type { Experience, Project, Skills, Certification, Education } from './types';

type Theme = {
  '--accent-color': string;
  '--secondary-accent-color': string;
  '--hover-bg': string;
  '--shadow-color': string;
}

export const THEMES: Record<string, Theme> = {
    'monokai-pink': {
        '--accent-color': '#F92672',
        '--secondary-accent-color': '#ff5e98',
        '--hover-bg': 'rgba(249, 38, 114, 0.1)',
        '--shadow-color': 'rgba(249, 38, 114, 0.4)'
    },
    'terminal-green': {
        '--accent-color': '#4AF626',
        '--secondary-accent-color': '#71FA52',
        '--hover-bg': 'rgba(74, 246, 38, 0.1)',
        '--shadow-color': 'rgba(74, 246, 38, 0.4)'
    },
    'nordic-night': {
        '--accent-color': '#88C0D0',
        '--secondary-accent-color': '#95c9d8',
        '--hover-bg': 'rgba(136, 192, 208, 0.1)',
        '--shadow-color': 'rgba(136, 192, 208, 0.4)'
    },
    'solarized-amber': {
        '--accent-color': '#FD971F',
        '--secondary-accent-color': '#ffb25d',
        '--hover-bg': 'rgba(253, 151, 31, 0.1)',
        '--shadow-color': 'rgba(253, 151, 31, 0.4)'
    },
    'synthwave-indigo': {
        '--accent-color': '#9370DB',
        '--secondary-accent-color': '#ab8eee',
        '--hover-bg': 'rgba(147, 112, 219, 0.1)',
        '--shadow-color': 'rgba(147, 112, 219, 0.4)'
    },
    'electric-blue': {
        '--accent-color': '#00BFFF',
        '--secondary-accent-color': '#52d3ff',
        '--hover-bg': 'rgba(0, 191, 255, 0.1)',
        '--shadow-color': 'rgba(0, 191, 255, 0.4)'
    },
    'dracula-orchid': {
        '--accent-color': '#BD93F9',
        '--secondary-accent-color': '#d9b6ff',
        '--hover-bg': 'rgba(189, 147, 249, 0.1)',
        '--shadow-color': 'rgba(189, 147, 249, 0.4)'
    },
    'oceanic-teal': {
        '--accent-color': '#00BCD4',
        '--secondary-accent-color': '#55d7e8',
        '--hover-bg': 'rgba(0, 188, 212, 0.1)',
        '--shadow-color': 'rgba(0, 188, 212, 0.4)'
    },
    'crimson-red': {
        '--accent-color': '#F44336',
        '--secondary-accent-color': '#f77166',
        '--hover-bg': 'rgba(244, 67, 54, 0.1)',
        '--shadow-color': 'rgba(244, 67, 54, 0.4)'
    },
};

export type ThemeName = keyof typeof THEMES;

// FIX: Add INTERESTS constant for the AI Assistant component.
export const INTERESTS: string[] = [
    'Artificial Intelligence',
    'Machine Learning',
    'Full-Stack Development',
    'Cybersecurity',
    'Open Source',
];


export const EXPERIENCES: Experience[] = [
    {
    role: 'Artificial Intelligence Intern',
    company: 'Kutty Pixel Inc.',
    period: 'Sept 2025 - Present',
    description: ['Leading the AI division at an early-stage startup, architecting core AI infrastructure, automation workflows, and deployment-ready systems.'],
    type: 'Internship',
    location: 'Canada, Remote',
  },
    {
    role: 'Chief Advisor',
    company: 'Blue Screen Programming Club, Hindustan University',
    period: 'Sept 2025 - Present',
    description: ['Providing technical mentorship and strategic guidance for student-led programming initiatives.'],
    type: 'Part-Time',
    location: 'Chennai, Hybrid',
  },
  {
    role: 'Student Intern',
    company: 'Tamil Nadu Newsprint and Papers Limited',
    period: 'Dec 2024 - Jan 2025',
    description: ['Focused on SQL database management, ERP system support, and optimizing IT infrastructure.'],
    type: 'Internship',
    location: 'Karur, Onsite',
  },
  {
    role: 'Cybersecurity Intern',
    company: 'Edunet Foundation',
    period: 'Jan 2025 – Feb 2025',
    description: ['Developed a Python-based steganography tool to hide data within images.', 'Performed comprehensive vulnerability assessments on web applications.'],
    type: 'Internship',
    location: 'Remote',
  },
  {
    role: 'Software Engineering Job Simulation',
    company: 'JPMorgan Chase & Co.',
    period: 'Feb 2025',
    description: ['Gained hands-on experience in financial data analysis using Python.', 'Worked on debugging and integrating third-party APIs into a trading platform.'],
    type: 'Simulation',
    location: 'Remote',
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Hindustan Institute of Technology and Science',
    period: '2022 – 2026',
    details: ['Current CGPA: 8.4'],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Car Price Predictor',
    githubUrl: 'https://github.com/Ar141204/CarPricePredictor',
    stack: ['Python', 'React', 'Flask', 'ML'],
    description: 'A machine learning model to predict the price of used cars based on various features.'
  },
  {
    name: 'Traffic Density Analyzer',
    githubUrl: 'https://github.com/Ar141204/Traffic-Density-Analyzer',
    stack: ['Python', 'Flask', 'YOLOv8', 'CV'],
    description: 'A computer vision project to analyze traffic density from video feeds in real-time.'
  },
  {
    name: 'AI-Powered Meeting Notes Summarizer',
    githubUrl: 'https://github.com/Ar141204/AI-Meeting-Notes-Summarizer',
    stack: ['Node.js', 'Express.js', 'Gemini AI'],
    description: 'An intelligent tool to automatically summarize meeting transcripts and email key takeaways.'
  },
  {
    name: 'Weather Forecast Application',
    githubUrl: 'https://github.com/Ar141204/Weather-Forcast',
    stack: ['Django', 'Python', 'API'],
    description: 'A Django-based app for real-time weather info, featuring city-based search, data analysis, and CSV export.'
  },
];

export const SKILLS: Skills = {
    languages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'],
    frameworks_libraries: ['React', 'Node.js', 'Express.js', 'Next.js', 'Flask', 'Django', 'Pandas', 'Tailwind CSS'],
    databases: ['Supabase', 'MongoDB', 'SQLite'],
    tools: ['VScode', 'Cursor', 'Windsurf', 'Antigravity', 'AI Studio', 'Git/GitHub', 'Docker', 'Linux', 'Azure', 'AWS', 'Jupyter', 'Figma', 'Framer', 'N8N', 'Make']
};

export const CERTIFICATIONS: Certification[] = [
    { name: 'Intellithon Runner-Up 2025', issuer: 'Hindustan Institute of Technology and Science (DISC)', url: 'https://drive.google.com/file/d/1vwDWzs_5dG59jkc5Kb2jvuLYsQq34jW9/view?usp=drivesdk' },
    { name: 'Onsite Internship', issuer: 'Tamil Nadu Newsprint and Papers Limited', url: 'https://drive.google.com/file/d/1bj3kiNKBjclYYPJApwCKSbgrfZwlmi02/view?usp=drive_link' },
    { name: 'Software Engineering Job Simulation', issuer: 'JPMorgan Chase & Co (Forage)', url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_YcFKZrGtw2DWuqgyp_1737791970596_completion_certificate.pdf' },
    { name: 'Cybersecurity Internship (AICTE)', issuer: 'Edunet Foundation', url: 'https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZDdlMmU0MmYzZWRhOTU4L0VjeG9Icl9NRHZkSW52UWVrSkJHMjN3QlV0RWFJMG82TlVFZW9uOFFiMzBXV2c&cid=5D7E2E42F3EDA958&id=5D7E2E42F3EDA958%21sbf1e68cc0ecc48f79ef41e909046db7c&parId=root&o=OneUp' },
    { name: 'Fundamentals of Cybersecurity', issuer: 'IBM (SkillsBuild)', url: 'https://www.credly.com/badges/b36dea9e-b568-4892-9702-88070a14ebe9/linked_in_profile' },
    { name: 'AWS Solution Architect Job Simulation', issuer: 'Forage', url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_YcFKZrGtw2DWuqgyp_1752335407450_completion_certificate.pdf' },
    { name: 'Microsoft Certified: Azure AI Fundamentals (AICTE)', issuer: 'Edunet Foundation', url: 'https://onedrive.live.com/?qt=allmyphotos&photosData=%2Fshare%2F5D7E2E42F3EDA958%21s827360e55d4343a9a2fc3637f946bcc5%3Fithint%3Dphoto%26migratedtospo%3Dtrue&cid=5D7E2E42F3EDA958&id=5D7E2E42F3EDA958%21s827360e55d4343a9a2fc3637f946bcc5&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2kvYy81ZDdlMmU0MmYzZWRhOTU4L0VlVmdjNEpEWGFsRG92dzJOX2xHdk1VQkFhTkdhY0xfZ2VIRmxkTDk4WndrMXc&v=photos' },
    { name: 'MongoDB Basics for Students', issuer: 'MongoDB', url: 'https://www.credly.com/badges/53bca7d0-1ef2-480c-b4c2-3c2011cede9a/linked_in_profile' },
    { name: 'Python Certification', issuer: 'Guvi', url: 'https://www.guvi.in/share-certificate/88Z8Q37ay868f16MrL' },
    { name: 'HTML & CSS Certification', issuer: 'Guvi', url: 'https://www.guvi.in/share-certificate/236ZKiR1686187ts7S' },
    { name: 'SQL (Advanced)', issuer: 'HackerRank', url: 'https://www.hackerrank.com/certificates/iframe/1928a13a76f8' },
];

export const SOCIAL_LINKS = [
    { href: 'https://github.com/Ar141204', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/rahman141204/', label: 'LinkedIn' },
    { href: 'mailto:rahman141204@outlook.com', label: 'Email' },
];
