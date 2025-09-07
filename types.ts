export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'Internship' | 'Simulation';
  location: 'Onsite' | 'Remote';
}

export interface Project {
  name:string;
  githubUrl: string;
  stack: string[];
  description: string;
}

export interface Skills {
  languages: string[];
  frameworks_libraries: string[];
  databases: string[];
  tools: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  url: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}
