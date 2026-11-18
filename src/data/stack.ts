import {
  siPython, siR, siArcgis, siReact, siNextdotjs, siTypescript, siJavascript, siHtml5, siCss,
  siTailwindcss, siAngular, siOpenjdk, siSpringboot, siFastapi, siPostgresql, siMongodb, siNeo4j,
  siPrisma, siSupabase, siGit, siGithub, siDocker, siKubernetes, siLinux, siFigma, siOdoo,
} from 'simple-icons'

export type Cat = 'data' | 'web' | 'back' | 'ops'
export interface Tech { name: string; cat: Cat; color: string; path?: string; mono?: string }

export const CATS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'Tout' },
  { key: 'data', label: 'Data & IA' },
  { key: 'web', label: 'Web' },
  { key: 'back', label: 'Backend & bases de données' },
  { key: 'ops', label: 'DevOps & outils' },
]

// Une couleur de marque trop sombre est illisible sur fond nuit : on la remplace par le crème.
function tone(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum < 0.24 ? '#f1e3c6' : '#' + hex
}
type Icon = { hex: string; path: string }
const ic = (name: string, cat: Cat, icon: Icon, color?: string): Tech => ({ name, cat, path: icon.path, color: color ?? tone(icon.hex) })
const mono = (name: string, cat: Cat, m: string, color: string): Tech => ({ name, cat, mono: m, color })

// Technologies citées dans le CV et utilisées dans les projets. Aucun pourcentage : ils ne mesurent rien.
export const TECHS: Tech[] = [
  ic('Python', 'data', siPython),
  ic('R', 'data', siR),
  mono('Stata', 'data', 'St', '#6f8fbf'),
  mono('Power BI', 'data', 'BI', '#e2a63b'),
  mono('Excel', 'data', 'XL', '#7fa35a'),
  ic('ArcGIS Pro', 'data', siArcgis),
  mono('KoboToolbox', 'data', 'Kb', '#6f8fbf'),
  ic('React', 'web', siReact),
  ic('Next.js', 'web', siNextdotjs),
  ic('TypeScript', 'web', siTypescript),
  ic('JavaScript', 'web', siJavascript),
  ic('HTML5', 'web', siHtml5),
  ic('CSS3', 'web', siCss, '#9b6fd0'),
  ic('Tailwind CSS', 'web', siTailwindcss),
  ic('Angular', 'web', siAngular, '#e23237'),
  ic('Java', 'back', siOpenjdk, '#e76f00'),
  ic('Spring Boot', 'back', siSpringboot),
  ic('FastAPI', 'back', siFastapi),
  ic('PostgreSQL', 'back', siPostgresql),
  ic('MongoDB', 'back', siMongodb),
  ic('Neo4j', 'back', siNeo4j),
  ic('Prisma', 'back', siPrisma),
  ic('Supabase', 'back', siSupabase),
  ic('Git', 'ops', siGit),
  ic('GitHub', 'ops', siGithub),
  ic('Docker', 'ops', siDocker),
  ic('Kubernetes', 'ops', siKubernetes),
  ic('Linux', 'ops', siLinux),
  ic('Figma', 'ops', siFigma),
  ic('Odoo', 'ops', siOdoo, '#b784a7'),
  mono('Maarch', 'ops', 'Ma', '#c4583a'),
]

// Notions, rangées par domaine (pas d'icône : ce sont des savoirs, pas des outils)
export const CONCEPTS: { cat: Cat; label: string; items: string[] }[] = [
  { cat: 'data', label: 'Data & IA', items: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'MLOps'] },
  { cat: 'web', label: 'Web', items: ['API REST'] },
  { cat: 'back', label: 'Backend & bases de données', items: ['NoSQL', 'Big Data'] },
  { cat: 'ops', label: 'DevOps & outils', items: ['Agile / Scrum'] },
]
