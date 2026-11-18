import type { Skill } from '../types'

export const skills: Skill[] = [
  // ── Frontend / Web ──
  { name: 'React / Next.js',            level: 92, category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript / JavaScript',    level: 90, category: 'frontend', icon: '🔷' },
  { name: 'Tailwind CSS / HTML5 / CSS3',level: 92, category: 'frontend', icon: '🎨' },
  { name: 'Angular',                    level: 82, category: 'frontend', icon: '🅰️' },

  // ── Backend & Bases de Données ──
  { name: 'PostgreSQL & SQL Avancé',    level: 92, category: 'backend',  icon: '🐘' },
  { name: 'Python (API REST / FastAPI)', level: 90, category: 'backend',  icon: '🐍' },
  { name: 'Java & Spring Boot',          level: 84, category: 'backend',  icon: '☕' },
  { name: 'MongoDB / Prisma / Supabase', level: 82, category: 'backend',  icon: '🍃' },

  // ── Data Science & IA ──
  { name: 'Python (Pandas, ML, Scikit)', level: 94, category: 'data',     icon: '📊' },
  { name: 'Machine Learning & Deep Learning', level: 88, category: 'data', icon: '🤖' },
  { name: 'R & Stata (Statistiques)',    level: 88, category: 'data',     icon: '📈' },
  { name: 'Power BI & Dataviz',          level: 90, category: 'data',     icon: '📉' },
  { name: 'Computer Vision & Big Data',  level: 82, category: 'data',     icon: '👁️' },

  // ── DevOps & Outils ──
  { name: 'Git / GitHub & Agile/Scrum',  level: 92, category: 'tools',    icon: '🌿' },
  { name: 'Docker & Kubernetes',         level: 82, category: 'tools',    icon: '🐳' },
  { name: 'Linux / Bash & Odoo',         level: 86, category: 'tools',    icon: '🐧' },
  { name: 'ArcGIS Pro & KoboToolbox',    level: 88, category: 'tools',    icon: '🗺️' },
  { name: 'MLOps & Gestion GED (Maarch)',level: 82, category: 'tools',    icon: '⚙️' },
]

export const skillCategories = [
  { key: 'data',     label: 'Data Science & IA',  color: '#06b6d4', bg: 'rgba(6,182,212,0.1)'   },
  { key: 'frontend', label: 'Frontend / Web',      color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
  { key: 'backend',  label: 'Backend & Données',   color: '#3b82f6', bg: 'rgba(59,130,246,0.1)'  },
  { key: 'tools',    label: 'DevOps & Outils',     color: '#10b981', bg: 'rgba(16,185,129,0.1)'  },
] as const
