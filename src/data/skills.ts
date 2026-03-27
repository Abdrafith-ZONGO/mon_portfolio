import type { Skill } from '../types'

export const skills: Skill[] = [
  // Frontend
  { name: 'React / Next.js', level: 90, category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript',      level: 85, category: 'frontend', icon: '🔷' },
  { name: 'Tailwind CSS',    level: 92, category: 'frontend', icon: '🎨' },
  { name: 'JavaScript ES6+', level: 88, category: 'frontend', icon: '⚡' },

  // Backend
  { name: 'Node.js / Express', level: 82, category: 'backend', icon: '🟢' },
  { name: 'Python / FastAPI',  level: 88, category: 'backend', icon: '🐍' },
  { name: 'PostgreSQL / MySQL',level: 85, category: 'backend', icon: '🗄️' },
  { name: 'REST API / GraphQL',level: 80, category: 'backend', icon: '🔗' },

  // Data
  { name: 'Python (Pandas/NumPy)', level: 92, category: 'data', icon: '📊' },
  { name: 'SQL Avancé',            level: 88, category: 'data', icon: '📋' },
  { name: 'Power BI / Tableau',    level: 85, category: 'data', icon: '📈' },
  { name: 'Machine Learning',      level: 78, category: 'data', icon: '🤖' },
  { name: 'Data Viz (Matplotlib)', level: 82, category: 'data', icon: '📉' },

  // Tools
  { name: 'Git / GitHub',   level: 90, category: 'tools', icon: '🌿' },
  { name: 'Docker',         level: 72, category: 'tools', icon: '🐳' },
  { name: 'Linux / Bash',   level: 78, category: 'tools', icon: '🖥️' },
  { name: 'Figma',          level: 70, category: 'tools', icon: '🎭' },
]

export const skillCategories = [
  { key: 'frontend', label: 'Frontend',    color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
  { key: 'backend',  label: 'Backend',     color: '#3b82f6', bg: 'rgba(59,130,246,0.1)'  },
  { key: 'data',     label: 'Data / IA',   color: '#06b6d4', bg: 'rgba(6,182,212,0.1)'   },
  { key: 'tools',    label: 'Outils DevOps',color: '#10b981',bg: 'rgba(16,185,129,0.1)'  },
] as const
