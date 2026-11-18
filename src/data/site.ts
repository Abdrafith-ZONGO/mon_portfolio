export const LINKS = {
  email: 'zongo1abdrafith@gmail.com',
  github: 'https://github.com/Abdrafith-ZONGO',
  linkedin: 'https://www.linkedin.com/in/abdrafith-zongo-31a6b9265',
  phone: '+226 07 71 32 17',
  phoneHref: 'tel:+22607713217',
  whatsapp: 'https://wa.me/22607713217',
}

export type Fx = 'zoom' | 'flow' | 'rise' | 'flip' | 'spin'
export type Shot = { img: string } | { diagram: 'cluster' | 'replica' }
export interface ProjectItem {
  title: string; tagline: string; accent: string; kind: string; frame: string
  tags: string[]; shots: [Shot, Shot, Shot]; gallery: string[]; fx: Fx; link?: string
  context: string       // pourquoi le projet existe, pour qui, et ma place dedans
  need: string          // le problème à résoudre
  technique: string[]   // les choix techniques et leur utilité
  result: string        // ce que la solution permet
}

// IMPORTANT : chaque texte ci-dessous doit rester vrai. Corriger ici ce qui ne correspond pas à la réalité.
export const PROJECTS: ProjectItem[] = [
  {
    title: 'e-Bourse UEMOA', tagline: 'Une plateforme numérique au service de la gestion des bourses.',
    accent: '#7d9bd0', kind: 'Web', fx: 'zoom', frame: 'Telia Informatique · stage, 2025 – 2026',
    tags: ['Odoo', 'Python', 'PostgreSQL', 'Docker'], link: 'https://e-bourse.uemoa.int/',
    shots: [{ img: 'ebourse-1.webp' }, { img: 'ebourse-2.webp' }, { img: 'ebourse-1.webp' }],
    gallery: ['ebourse-1.webp', 'ebourse-2.webp'],
    context: "L'UEMOA attribue des bourses de formation et de recherche aux étudiants de ses huit pays membres. La plateforme a été réalisée par Telia Informatique, où j'ai travaillé dessus comme développeur full stack pendant mon stage, de la conception au support après la mise en ligne.",
    need: 'Permettre aux étudiants de candidater en ligne, en français ou en portugais, et donner aux gestionnaires un espace pour suivre et instruire les dossiers.',
    technique: ['Odoo et Python pour la logique métier et le back-office', 'PostgreSQL pour les données', 'Docker pour le déploiement'],
    result: 'La plateforme est en ligne sur e-bourse.uemoa.int : candidature en cinq étapes côté public, suivi des dossiers côté gestionnaires.',
  },
  {
    title: 'Mon Atelier Pro', tagline: 'Le carnet de commandes des ateliers de couture, en version numérique.',
    accent: '#e2a63b', kind: 'Web', fx: 'flow', frame: 'Projet personnel · produit SaaS',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'], link: 'https://monatelierpro.app',
    shots: [{ img: 'atelier-1.webp' }, { img: 'atelier-2.webp' }, { img: 'atelier-3.webp' }],
    gallery: ['atelier-1.webp', 'atelier-2.webp', 'atelier-3.webp'],
    context: "Mon Atelier Pro est une solution en ligne pensée pour les ateliers de couture. C'est un projet personnel : je l'ai conçu, développé et mis en ligne moi-même.",
    need: 'Remplacer les cahiers où se perdent les mesures, les acomptes et les dates de livraison par un outil simple à utiliser au quotidien.',
    technique: ["Next.js, React et TypeScript pour l'application", "Tailwind CSS pour l'interface, en français et en anglais, avec un mode sombre", 'Modules : mesures, commandes, caisse, stock de tissus, catalogue de modèles, agenda des livraisons'],
    result: 'En ligne sur monatelierpro.app. Le tableau de bord affiche les livraisons urgentes et les derniers encaissements.',
  },
  {
    title: 'Leader Trading Business Express', tagline: 'Échanger cryptomonnaies et devises contre des francs CFA.',
    accent: '#5fae7a', kind: 'Web', fx: 'rise', frame: 'Projet réalisé pour un client',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'], link: 'https://ltbexpress.com/',
    shots: [{ img: 'ltb-1.webp' }, { img: 'ltb-2.webp' }, { img: 'ltb-3.webp' }],
    gallery: ['ltb-1.webp', 'ltb-2.webp', 'ltb-3.webp'],
    context: "Une plateforme d'échange que j'ai développée pour un client, avec un espace pour ses utilisateurs et un espace d'administration.",
    need: "Convertir des USDT ou des dollars en francs CFA, dans les deux sens, avec un règlement par mobile money, et donner à l'équipe un outil pour traiter les demandes.",
    technique: ['Next.js, React et TypeScript', "Tailwind CSS pour l'interface", "Simulateur de conversion, historique et reçus PDF côté utilisateur ; gestion des demandes et des taux côté administration"],
    result: 'En ligne sur ltbexpress.com, avec règlement par Orange Money, Moov Money et Telecel Money.',
  },
  {
    title: 'SAMDE', tagline: "Décider d'un microcrédit sur des faits.",
    accent: '#d8644a', kind: 'Data & IA', fx: 'flip', frame: 'Hackathon CIF-AO 2026 · équipe DataMasters',
    tags: ['Scoring de crédit', 'Analyse de données', 'Microfinance'],
    shots: [{ img: 'hackaton-cif-1.webp' }, { img: 'hackaton-cif-2.webp' }, { img: 'hackaton-cif-4.webp' }],
    gallery: ['hackaton-cif-1.webp', 'hackaton-cif-2.webp', 'hackaton-cif-3.webp', 'hackaton-cif-4.webp'],
    context: "Projet réalisé avec l'équipe DataMasters pendant le hackathon de la Confédération des Institutions Financières de l'Afrique de l'Ouest.",
    need: "Aider les institutions de microfinance à évaluer une demande de crédit à partir de données, plutôt que sur la seule appréciation de l'agent.",
    technique: ['Un moteur de scoring qui évalue chaque demande', 'Un portail destiné aux agents de crédit'],
    result: '2ᵉ place nationale.',
  },
  {
    title: 'FasoPay', tagline: 'Une base de données qui ne perd aucun transfert.',
    accent: '#4fa3a5', kind: 'Big Data', fx: 'spin', frame: 'Projet de Master 2 · en binôme',
    tags: ['MongoDB 8', 'Replica Set', 'Sharding', 'Docker'],
    shots: [{ img: 'tp-fasopay1.webp' }, { diagram: 'cluster' }, { diagram: 'replica' }],
    gallery: ['tp-fasopay1.webp'],
    context: "Projet du cours de bases de données NoSQL, mené en binôme : concevoir la base d'un service de paiement mobile, de la modélisation jusqu'au cluster, puis en rédiger le rapport.",
    need: "Un service de paiement ne doit ni perdre un transfert, ni débiter deux fois, ni s'arrêter quand un serveur tombe.",
    technique: ['Validateurs de schéma et 3 index mesurés avec explain()', 'Transferts en transactions multi-documents, testés en concurrence', 'Replica Set à 3 nœuds : bascule automatique, écriture à la majorité', 'Cluster à 3 shards, 5 clés de sharding comparées'],
    result: 'Clé de sharding retenue : le portefeuille, en mode hashed. Chaque résultat est conservé avec sa commande, sa date et sa sortie brute.',
  },
  {
    title: 'CardioLogic', tagline: "Une aide au diagnostic de l'insuffisance cardiaque.",
    accent: '#d0707a', kind: 'Data & IA', fx: 'zoom', frame: 'Freelance · client privé · en cours',
    tags: ['Neo4j', 'FastAPI', 'Angular', 'Docker Compose'],
    shots: [{ img: 'ontology-1.webp' }, { img: 'ontology-2.webp' }, { img: 'ontology-3.webp' }],
    gallery: ['ontology-1.webp', 'ontology-2.webp', 'ontology-3.webp'],
    context: "Une application web destinée aux médecins, commandée par un client qui dispose d'une ontologie de l'insuffisance cardiaque. Je la développe seul, en quatre lots livrés l'un après l'autre.",
    need: 'Enregistrer les symptômes observés en consultation et proposer des diagnostics possibles à partir de cette ontologie.',
    technique: ["Neo4j : l'ontologie (fichier OWL fourni par le client) est stockée sous forme de graphe", "FastAPI en Python pour l'API, Angular pour l'interface", 'Docker Compose pour faire tourner l\'ensemble', 'Statistiques, visualisation du graphe, exports Excel et PDF'],
    result: 'Le médecin saisit une consultation en trois étapes et reçoit des diagnostics possibles. Le projet est en cours de livraison.',
  },
  {
    title: 'Site de Telia Informatique', tagline: "La vitrine d'une entreprise de services numériques.",
    accent: '#e07b39', kind: 'Web', fx: 'flow', frame: 'Telia Informatique · stage, 2025 – 2026',
    tags: ['React', 'TypeScript', 'Tailwind CSS'], link: 'https://teliainfo.com/fr',
    shots: [{ img: 'telia-1.webp' }, { img: 'telia-3.webp' }, { img: 'telia-2.webp' }],
    gallery: ['telia-1.webp', 'telia-2.webp', 'telia-3.webp'],
    context: "Le site institutionnel de l'entreprise où j'ai effectué mon stage de développeur full stack. J'ai participé à sa conception et à sa réalisation avec l'équipe.",
    need: "Présenter clairement les pôles d'expertise de l'entreprise, ses réalisations et ses offres d'emploi.",
    technique: ['React et TypeScript', "Tailwind CSS pour l'interface", 'Site bilingue français / anglais, mode clair et mode sombre'],
    result: 'En ligne sur teliainfo.com.',
  },
]

export interface Domain { title: string; accent: string; text: string; proof: string }

// « Ce que je fais, concrètement » : quatre domaines, sans liste de technologies.
export const DOMAINS: Domain[] = [
  {
    title: 'Analyser et valoriser les données', accent: 'var(--savane)',
    text: 'Collecter, nettoyer, structurer et analyser les données pour en extraire des informations pertinentes. Produire des indicateurs, des rapports et des tableaux de bord qui facilitent le suivi et la prise de décision.',
    proof: "Stages à l'INSD et à la SBUM",
  },
  {
    title: "Explorer l'intelligence artificielle", accent: 'var(--indigo)',
    text: 'Mobiliser les statistiques et le machine learning pour étudier des phénomènes, identifier des tendances, construire des modèles et explorer des approches prédictives.',
    proof: 'SAMDE · CardioLogic',
  },
  {
    title: 'Concevoir des applications numériques', accent: 'var(--ocre)',
    text: "Développer des applications web et des outils métier qui répondent à des besoins réels : gestion, suivi d'activités, traitement de l'information et automatisation de certaines tâches.",
    proof: 'e-Bourse UEMOA · Mon Atelier Pro · LTB Express',
  },
  {
    title: 'Organiser et fiabiliser les données', accent: '#4fa3a5',
    text: "Concevoir et exploiter des bases de données, structurer l'information, contrôler sa cohérence et contribuer à mettre en place des systèmes d'information fiables.",
    proof: 'FasoPay · bases PostgreSQL chez Telia Informatique',
  },
]

// Organisations pour lesquelles j'ai travaillé pendant mon stage chez Telia Informatique (voir le CV).
export const ORGS = ['UEMOA', 'SONAGESS', 'CHU Yalgado', 'DGAIE', 'SOBTO', 'Banque Postale', 'CARFO', 'LONAB', 'CNSS']

export interface Step { period: string; title: string; org: string; desc?: string }

export const EXPERIENCES: Step[] = [
  { period: 'Nov. 2025 — Oct. 2026', title: 'Développeur Full Stack — stage professionnel', org: 'Telia Informatique, Ouagadougou',
    desc: "Plateforme de la Bourse de l'UEMOA, site de l'entreprise, applications de gestion et bases PostgreSQL pour plusieurs organisations, au sein d'une équipe Agile." },
  { period: 'Juin — Juil. 2025', title: 'Chargé de suivi et évaluation — stage', org: 'SBUM, Bobo-Dioulasso',
    desc: 'Questionnaires KoboToolbox, collecte et analyse des données sous Excel et R, rapports automatisés.' },
  { period: 'Mars — Juin 2025', title: 'Stage en statistiques', org: 'INSD, Ouagadougou',
    desc: 'Traitement et analyse de données avec Python, R et Stata, rapports Power BI, cartographie avec ArcGIS Pro.' },
  { period: 'Juil. — Sept. 2023', title: 'Stage en maintenance et support informatique', org: 'CBIT, Ouagadougou' },
]

export const FORMATIONS: Step[] = [
  { period: 'Depuis oct. 2026', title: 'Formation Développeur Full Stack', org: 'Orange Digital Center, Ouagadougou' },
  { period: 'Depuis oct. 2025', title: 'Master Sciences des Données', org: 'Université Joseph KI-ZERBO' },
  { period: '2022 — 2025', title: 'Licence Statistiques et Informatique', org: 'Université Nazi BONI, Bobo-Dioulasso' },
  { period: '2022', title: 'Baccalauréat série D', org: 'Lycée Provincial de Boromo' },
]

export const CERTIFS = [
  'Responsive Web Design — freeCodeCamp (oct. 2026)',
  'Odoo 14 Essentials — Hibou Corp. (avr. 2026)',
  'Initiation au Computer Vision — Orange Digital Center (oct. 2025)',
]
