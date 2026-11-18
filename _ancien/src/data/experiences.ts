import type { Experience } from '../types'

export const experiences: Experience[] = [
  // ── WORK EXPERIENCES ──
  {
    id: 1,
    type: 'work',
    title: 'Développeur Full Stack — Stage professionnel',
    org: 'Telia Informatique (Ouagadougou)',
    period: 'Nov. 2025 — Oct. 2026',
    desc: 'Réalisation et mise en production de la plateforme de la Bourse de l\'UEMOA (e-bourse.uemoa.int) et du site institutionnel Telia Informatique. Conception de solutions de gestion et GED pour des organisations de premier plan (SONAGESS, CHU Yalgado, LONAB, CNSS, CARFO, Banque Postale, DGAIE). Gestion et administration PostgreSQL, APIs REST et déploiement conteneurisé en équipe Agile/Scrum.',
    tags: ['PostgreSQL', 'Python', 'Java', 'Spring Boot', 'Angular', 'Odoo', 'Docker', 'Kubernetes'],
  },
  {
    id: 2,
    type: 'work',
    title: 'Chargé de Suivi & Évaluation — Stage',
    org: 'SBUM (Bobo-Dioulasso)',
    period: 'Juin 2025 — Juil. 2025',
    desc: 'Conception et administration de questionnaires d\'enquêtes avec KoboToolbox. Collecte, nettoyage et analyse approfondie des données de participation sous Excel et R, avec automatisation complète des rapports statistiques.',
    tags: ['KoboToolbox', 'Excel', 'R', 'Analyse Statistique'],
  },
  {
    id: 3,
    type: 'work',
    title: 'Stagiaire en Statistiques',
    org: 'INSD — Inst. National de la Statistique et de la Démographie (Ouagadougou)',
    period: 'Mars 2025 — Juin 2025',
    desc: 'Traitement, exploration et analyse de données massives avec Python, R et Stata. Automatisation de tableaux de bord décisionnels sous Power BI et analyses spatiales / cartographie SIG avec ArcGIS Pro.',
    tags: ['Python', 'R', 'Stata', 'Power BI', 'ArcGIS Pro'],
  },
  {
    id: 4,
    type: 'work',
    title: 'Stagiaire Maintenance & Support IT',
    org: 'CBIT (Ouagadougou)',
    period: 'Juil. 2023 — Sept. 2023',
    desc: 'Diagnostic matériel et logiciel, installation et configuration d\'environnements Windows et Linux, assistance technique et accompagnement des utilisateurs.',
    tags: ['Linux', 'Windows', 'Réseaux', 'Maintenance'],
  },

  // ── EDUCATION ──
  {
    id: 5,
    type: 'education',
    title: 'Formation Développeur Full Stack',
    org: 'Orange Digital Center (Ouagadougou)',
    period: 'Depuis Oct. 2026',
    desc: 'Perfectionnement intensif en développement d\'applications web et mobiles modernes, architectures microservices, intégration continue et pratiques logicielles avancées.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'DevOps'],
  },
  {
    id: 6,
    type: 'education',
    title: 'Master Sciences des Données',
    org: 'Université Joseph KI-ZERBO (Ouagadougou)',
    period: 'Depuis Oct. 2025',
    desc: 'Formation d\'excellence en Data Science : Machine Learning, Deep Learning, Computer Vision, Big Data, modélisation mathématique et pipelines MLOps.',
    tags: ['Data Science', 'Machine Learning', 'Deep Learning', 'Big Data', 'MLOps'],
  },
  {
    id: 7,
    type: 'education',
    title: 'Licence Statistiques et Informatique',
    org: 'Université Nazi BONI (Bobo-Dioulasso)',
    period: 'Oct. 2022 — Juil. 2025',
    desc: 'Double formation combinant mathématiques appliquées, analyse statistique inférentielle, modélisation de bases de données relationnelles et génie logiciel.',
    tags: ['Statistiques', 'Python', 'R', 'SQL', 'Algorithmique'],
  },
  {
    id: 8,
    type: 'education',
    title: 'Baccalauréat série D',
    org: 'Lycée Provincial de Boromo',
    period: '2022',
    desc: 'Formation scientifique avec dominante en mathématiques, sciences physiques et sciences naturelles.',
    tags: ['Mathématiques', 'Sciences'],
  },
]

export const stats = [
  { value: '10+', label: 'Projets en production' },
  { value: '2+',  label: 'Ans d\'expérience terrain' },
  { value: '2',   label: 'Expertises : Data & Web' },
  { value: '2ème', label: 'Prix Hackathon CIF-AO' },
]
