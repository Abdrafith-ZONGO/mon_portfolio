import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    id: 1,
    type: 'work',
    title: 'Dev Full Stack & Data Analyst',
    org: 'Nom de l\'entreprise',
    period: '2023 — Présent',
    desc: 'Développement d\'applications web full stack et analyse de données business. Création de dashboards décisionnels, pipelines ETL, et APIs REST.',
    tags: ['React', 'Python', 'SQL', 'Power BI'],
  },
  {
    id: 2,
    type: 'work',
    title: 'Développeur Frontend',
    org: 'Nom de l\'entreprise 2',
    period: '2022 — 2023',
    desc: 'Conception et développement d\'interfaces utilisateur modernes. Intégration d\'APIs, optimisation des performances, collaboration en équipe Agile.',
    tags: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: 3,
    type: 'work',
    title: 'Data Analyst Junior',
    org: 'Nom de l\'entreprise 3',
    period: '2021 — 2022',
    desc: 'Analyse des données de ventes et marketing, création de rapports hebdomadaires, automatisation des reportings Excel/Python.',
    tags: ['Python', 'Excel', 'SQL', 'Tableau'],
  },
  {
    id: 4,
    type: 'education',
    title: 'Licence Informatique',
    org: 'Université / École',
    period: '2018 — 2021',
    desc: 'Formation en développement logiciel, algorithmique, bases de données, réseaux et systèmes d\'information.',
    tags: ['Algorithmique', 'C++', 'Java', 'SQL'],
  },
  {
    id: 5,
    type: 'education',
    title: 'Certification Data Science',
    org: 'Coursera / DataCamp',
    period: '2022',
    desc: 'Spécialisation en Data Science : Machine Learning, Deep Learning, visualisation de données et statistiques avancées.',
    tags: ['Python', 'ML', 'TensorFlow', 'Stats'],
  },
]

export const stats = [
  { value: '12+', label: 'Projets réalisés' },
  { value: '3+',  label: 'Ans d\'expérience' },
  { value: '2',   label: 'Expertises clés' },
  { value: '100%', label: 'Passion & rigueur' },
]
