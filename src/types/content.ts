export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  year?: string;
  role: string;
  category: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  tags: string[];
  metrics?: ProjectMetric[];
}

export interface ModelResult {
  id: string;
  name: string;
  shortName: string;
  methodology: string;
  accuracy: number | null;
  latencyMs: number | null;
  robustnessDropPp: number | null;
  note?: string;
}

export interface ResearchProject {
  slug: string;
  title: string;
  venue: string;
  status: string;
  year: string;
  summary: string;
  dataset: {
    size: number;
    intentCategories: number;
    language: string;
    characteristics: string[];
  };
  models: ModelResult[];
}

export type WorkMode = "On-site" | "Remote" | "Hybrid";

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  start: string;
  end: string;
  location: string;
  mode: WorkMode;
  sortKey: string; // YYYY-MM, used for chronological ordering
  description?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  program: string;
  focus?: string;
  start: string;
  end: string;
  location: string;
  distinction?: string;
}

export interface OrgRole {
  id: string;
  title: string;
  start: string;
  end: string;
}

export interface OrganizationEntry {
  id: string;
  name: string;
  fullName?: string;
  roles: OrgRole[];
}

export interface VolunteerEntry {
  id: string;
  role: string;
  organization: string;
  date: string;
  location: string;
  description: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}
