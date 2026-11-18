export type Lang = 'fr' | 'en'

export const t = {
  fr: {
    // ── NAV ──────────────────────────────────────────────────────────────────
    nav: {
      home:        'Accueil',
      about:       'À propos',
      skills:      'Compétences',
      projects:    'Projets',
      resume:      'Parcours',
      contact:     'Contact',
      cv:          'CV',
      downloadCv:  'Télécharger CV',
    },

    // ── HERO ─────────────────────────────────────────────────────────────────
    hero: {
      available:   'Disponible pour opportunités & collaborations',
      role1:       '📊 Data Scientist & IA',
      role2:       '⚡ Full Stack Developer',
      role3:       '⚙️ DevOps & MLOps',
      tagline:     'Je transforme les données complexes en leviers décisionnels et les idées en solutions digitales robustes.',
      location:    'Ouagadougou',
      locationSub: 'Burkina Faso · Présentiel & Remote',
      stack:       'Python · PostgreSQL · React · Next.js · Spring Boot · Docker · Power BI · R',
      cta1:        'Voir mes réalisations',
      cta2:        'Télécharger CV',
      scroll:      'SCROLL',
      yearsExp:    "ans d'exp. terrain",
      projects:    'projets déployés',
    },

    // ── ABOUT ────────────────────────────────────────────────────────────────
    about: {
      sectionSub:  'À propos de moi',
      sectionTitle:'Profil & Parcours',
      h3:          'Data Scientist rigoureux &\nDéveloppeur Full Stack passionné',
      h3accent:    'Développeur Full Stack passionné',
      p1: "Titulaire d'une Licence en Statistiques et Informatique et actuellement en Master Sciences des Données à l'Université Joseph KI-ZERBO, je combine une solide rigueur mathématique et analytique à une expertise éprouvée en ingénierie logicielle.",
      p2: "Mon parcours m'a permis d'intervenir sur des projets stratégiques d'envergure : du traitement et de l'analyse prédictive de données massives (Python, R, Stata, Power BI), jusqu'à la conception et la mise en production de solutions numériques institutionnelles (plateforme de la Bourse de l'UEMOA, solutions SaaS, GED et architectures PostgreSQL).",
      p3: "Je perfectionne continuellement mes compétences via la formation Développeur Full Stack d'Orange Digital Center. Rigoureux, curieux et doté d'un excellent esprit d'équipe, je transforme les données brutes en leviers décisionnels et les idées complexes en produits digitaux durables.",
      cta1:        'Me contacter',
      cta2:        'Télécharger CV',
      location:    'Ouagadougou, Burkina Faso',
      highlights: {
        data:  { label: 'Data Scientist & IA',  desc: 'Master Sciences des Données (UJKZ), ML/DL, Python, R, Stata' },
        dev:   { label: 'Dev Full Stack',       desc: 'React, Next.js, Spring Boot, PostgreSQL, Docker, Odoo' },
        award: { label: 'Prix Hackathon CIF-AO',desc: '2ème place nationale 2026 (Équipe DataMasters)' },
        grad:  { label: 'Double Formation',     desc: 'Licence Statistiques & Info + Orange Digital Center' },
      },
    },

    // ── SKILLS ───────────────────────────────────────────────────────────────
    skills: {
      sectionSub:  'Mes compétences',
      sectionTitle:'Stack technique & Expertises',
      filterAll:   'Toutes',
    },

    // ── PROJECTS ─────────────────────────────────────────────────────────────
    projects: {
      sectionSub:   'Ce que j\'ai construit',
      sectionTitle: 'Projets & Réalisations',
      sectionDesc:  'Une sélection d\'applications en production, solutions SaaS et analyses Data/IA à fort impact.',
      filterAll:    'Tous',
      filterDev:    'Dev Web',
      filterData:   'Data / IA',
      filterFs:     'Full Stack',
      code:         'Code source',
      demo:         'Voir la plateforme',
      featured:     '★ Projet Clé',
      githubCta:    'Retrouvez d\'autres travaux sur mon profil GitHub',
      githubBtn:    'Consulter mon GitHub',
    },

    // ── RESUME ───────────────────────────────────────────────────────────────
    resume: {
      sectionSub:   'Mon parcours',
      sectionTitle: 'Expériences, Formations & Distinctions',
      tabAll:       'Tout',
      tabWork:      'Expériences',
      tabEdu:       'Formations & Diplômes',
      downloadDesc: 'Retrouvez mon profil détaillé au format PDF',
      downloadBtn:  'Télécharger CV',
    },

    // ── CONTACT ──────────────────────────────────────────────────────────────
    contact: {
      sectionSub:   'Travaillons ensemble',
      sectionTitle: 'Me contacter',
      sectionDesc:  'Un projet, une opportunité professionnelle ou une collaboration ? Je vous réponds sous 24h.',
      labelName:    'Nom complet *',
      labelEmail:   'Email *',
      labelSubject: 'Sujet *',
      labelMessage: 'Message *',
      phName:       'Votre nom ou entreprise',
      phEmail:      'votre.email@domaine.com',
      phSubject:    'Opportunité, projet data, développement web...',
      phMessage:    'Décrivez votre besoin, projet ou proposition...',
      send:         'Envoyer le message',
      sending:      'Ouverture de votre messagerie...',
      success:      'Message prêt à être envoyé ! ✓',
      error:        'Erreur — veuillez réessayer',
      successNote:  'Votre client de messagerie s\'est ouvert avec le message pré-rempli 📧',
      privacy:      '* Réponse rapide garantie sous 24h',
      availTitle:   'Disponibilité',
      availDesc:    'Ouvert aux opportunités en entreprise (CDI / CDD), missions de consulting et projets innovants en présentiel ou remote.',
      socials:      'Réseaux & Liens professionnels',
      errName:      'Veuillez renseigner votre nom',
      errEmail:     'Veuillez renseigner un email valide',
      errEmailInvalid: 'Adresse email invalide',
      errSubject:   'Veuillez préciser le sujet',
      errMessage:   'Message trop court (20 caractères minimum)',
    },

    // ── FOOTER ───────────────────────────────────────────────────────────────
    footer: {
      desc:      'Data Scientist & Full Stack Developer basé à Ouagadougou. Passionné par l\'intelligence artificielle, les données massives et l\'ingénierie logicielle.',
      nav:       'Navigation',
      more:      'Accès rapide',
      rights:    'Tous droits réservés',
      madeWith:  'Conçu avec passion',
      location:  'à Ouagadougou, Burkina Faso',
      cvLink:    'Télécharger mon CV (PDF)',
    },

    // ── DONNÉES CV ───────────────────────────────────────────────────────────
    cvData: {
      jobTitle: 'Data Scientist & Full Stack Developer',
      profileText: 'Informaticien et Data Scientist en formation, titulaire d\'une Licence en Statistiques et Informatique et actuellement en Master Sciences des Données à l\'Université Joseph KI-ZERBO. Expérience pratique dans le traitement, l\'analyse et la visualisation de données (Python, R, Stata, Power BI), ainsi que dans la conception, le développement et le déploiement d\'applications web et solutions de gestion PostgreSQL. En formation Full Stack à Orange Digital Center.',
      
      langs: [
        { name: 'Français', level: 'C1 (Avancé)' },
        { name: 'Anglais', level: 'B1 (Intermédiaire)' },
      ],
      
      chips: [
        'Data & IA : Python (Pandas, Scikit, ML, DL), R, Stata, Power BI, ArcGIS Pro, Big Data',
        'Frontend : React, Next.js, TypeScript, Tailwind CSS, Angular, HTML5, CSS3',
        'Backend : PostgreSQL, Python (FastAPI/REST), Java, Spring Boot, Supabase, Prisma, MongoDB',
        'DevOps & Outils : Docker, Kubernetes, Git, MLOps, Linux, Odoo, Maarch, Agile/Scrum',
      ],
      
      formations: [
        { date: 'Depuis octobre 2026', title: 'Formation Développeur Full Stack', org: 'Orange Digital Center, Ouagadougou', details: 'Développement d\'applications web et mobiles modernes, architectures logicielles et intégration continue.' },
        { date: 'Depuis octobre 2025', title: 'Master Sciences des Données', org: 'Université Joseph KI-ZERBO, Burkina Faso', details: 'Machine Learning, Deep Learning, Computer Vision, Big Data, modélisation mathématique et MLOps.' },
        { date: 'Octobre 2022 - Juillet 2025', title: 'Licence Statistiques et Informatique', org: 'Université Nazi BONI, Bobo-Dioulasso', details: 'Statistiques inférentielles, probabilités, génie logiciel, algorithmique et bases de données.' },
        { date: '2022', title: 'Baccalauréat série D', org: 'Lycée Provincial de Boromo', details: 'Mathématiques, sciences physiques et sciences naturelles.' },
      ],
      
      experiences: [
        {
          date: 'Novembre 2025 - Octobre 2026',
          title: 'Développeur Full Stack - Stage professionnel',
          org: 'Telia Informatique, Ouagadougou',
          bullets: [
            'Réalisation et mise en production du site de la Bourse de l\'UEMOA (e-bourse.uemoa.int)',
            'Conception et réalisation du site web institutionnel de Telia Informatique (teliainfo.com/fr)',
            'Participation au développement de la plateforme de recrutement de l\'UEMOA',
            'Conception et développement de solutions de gestion pour SONAGESS, CHU Yalgado, DGAIE, SOBTO, Banque Postale, CARFO et maintenance SIG-EPE',
            'Déploiement et configuration de solutions GED et archivage (Maarch) pour LONAB et CNSS',
            'Administration PostgreSQL, développement d\'APIs REST et frontend Angular / React en équipe Agile/Scrum',
          ],
          tags: ['PostgreSQL', 'Python', 'Java', 'Spring Boot', 'Angular', 'Odoo', 'Docker', 'Kubernetes'],
        },
        {
          date: 'Juin - Juillet 2025',
          title: 'Chargé de Suivi & Évaluation - Stage',
          org: 'SBUM, Bobo-Dioulasso',
          bullets: [
            'Conception et administration de questionnaires d\'enquêtes avec KoboToolbox',
            'Collecte, nettoyage et analyse des données de participation sous Excel et R, automatisation des rapports',
          ],
          tags: ['KoboToolbox', 'Excel', 'R', 'Statistiques'],
        },
        {
          date: 'Mars - Juin 2025',
          title: 'Stage en Statistiques',
          org: 'INSD, Ouagadougou',
          bullets: [
            'Traitement et analyse de données massives avec Python, R et Stata',
            'Automatisation de tableaux de bord décisionnels sous Power BI et analyse spatiale / SIG avec ArcGIS Pro',
          ],
          tags: ['Python', 'R', 'Stata', 'Power BI', 'ArcGIS Pro'],
        },
        {
          date: 'Juillet - Septembre 2023',
          title: 'Stage en Maintenance et Support IT',
          org: 'CBIT, Ouagadougou',
          bullets: [
            'Diagnostic matériel et logiciel, installation et configuration de systèmes Windows et Linux, assistance utilisateurs',
          ],
          tags: ['Hardware', 'Windows', 'Linux', 'Support IT'],
        },
      ],
      
      projects: [
        { name: 'e-Bourse UEMOA', description: 'Plateforme officielle bilingue de gestion des bourses', stack: 'Odoo, Python, PostgreSQL, Docker', link: 'e-bourse.uemoa.int' },
        { name: 'Mon Atelier Pro', description: 'SaaS de gestion quotidienne pour ateliers de couture', stack: 'React, Next.js, TypeScript, Tailwind', link: 'monatelierpro.app' },
        { name: 'Leader Trading Business Express', description: 'Plateforme sécurisée d\'échange de cryptos & devises', stack: 'React, Next.js, TypeScript, REST API', link: 'ltbexpress.com' },
        { name: 'Telia Informatique', description: 'Site web vitrine institutionnel de l\'entreprise', stack: 'React, TypeScript, Tailwind', link: 'teliainfo.com/fr' },
      ],
      
      certifications: [
        'Responsive Web Design - freeCodeCamp (300h - Oct. 2026)',
        'Certification Odoo 14 Essentials - Hibou Corp. (Avril 2026 - N° 000000825)',
        'Initiation au Computer Vision - Orange Digital Center (Oct. 2025)',
      ],

      distinctions: [
        '2ème place nationale Hackathon CIF-AO 2026 (Équipe DataMasters)',
      ],
      
      signatureCert: 'Je certifie sur l\'honneur l\'exactitude des informations ci-dessus',
      
      sectionTitles: {
        profil: 'Profil',
        langues: 'Langues',
        competences: 'Compétences',
        dataAnalytics: 'Data Science & IA',
        formations: 'Formations',
        experiences: 'Expériences professionnelles',
        experiencesSuite: 'Expériences professionnelles (suite)',
        projets: 'Projets Réalisés',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ══════════════════════════════════════════════════════════════════════════
  en: {
    nav: {
      home:        'Home',
      about:       'About',
      skills:      'Skills',
      projects:    'Projects',
      resume:      'Resume',
      contact:     'Contact',
      cv:          'CV',
      downloadCv:  'Download CV',
    },
    hero: {
      available:   'Available for opportunities & collaborations',
      role1:       '📊 Data Scientist & AI',
      role2:       '⚡ Full Stack Developer',
      role3:       '⚙️ DevOps & MLOps',
      tagline:     'Transforming complex data into strategic insights and bold ideas into high-performance digital products.',
      location:    'Ouagadougou',
      locationSub: 'Burkina Faso · On-site & Remote',
      stack:       'Python · PostgreSQL · React · Next.js · Spring Boot · Docker · Power BI · R',
      cta1:        'View my projects',
      cta2:        'Download CV',
      scroll:      'SCROLL',
      yearsExp:    'yrs field exp.',
      projects:    'deployed projects',
    },
    about: {
      sectionSub:  'About me',
      sectionTitle:'Profile & Background',
      h3:          'Rigorous Data Scientist &\nPassionate Full Stack Developer',
      h3accent:    'Passionate Full Stack Developer',
      p1: "Holding a Bachelor's Degree in Statistics and Computer Science and currently pursuing a Master's Degree in Data Science at Joseph KI-ZERBO University, I bridge mathematical rigor with advanced software engineering.",
      p2: "My journey includes delivering large-scale production projects: from big data processing and predictive analytics (Python, R, Stata, Power BI) to architecting and deploying national & institutional platforms (WAEMU Scholarship platform, SaaS solutions, EDM systems and PostgreSQL databases).",
      p3: "Currently completing the Full Stack Developer curriculum at Orange Digital Center, I thrive at the crossroads of Data/AI and modern web development to build resilient, human-centered digital solutions.",
      cta1:        'Contact me',
      cta2:        'Download CV',
      location:    'Ouagadougou, Burkina Faso',
      highlights: {
        data:  { label: 'Data Scientist & AI', desc: 'M.Sc. in Data Science (UJKZ), ML/DL, Python, R, Stata' },
        dev:   { label: 'Full Stack Dev',      desc: 'React, Next.js, Spring Boot, PostgreSQL, Docker, Odoo' },
        award: { label: 'CIF-AO Hackathon Winner', desc: '2nd National Place 2026 (DataMasters Team)' },
        grad:  { label: 'Dual Curriculum',     desc: 'B.Sc. Statistics & CS + Orange Digital Center' },
      },
    },
    skills: {
      sectionSub:  'My capabilities',
      sectionTitle:'Technical Stack & Expertise',
      filterAll:   'All',
    },
    projects: {
      sectionSub:   'What I\'ve built',
      sectionTitle: 'Featured Projects',
      sectionDesc:  'Production applications, SaaS solutions and high-impact Data & AI models.',
      filterAll:    'All',
      filterDev:    'Web Dev',
      filterData:   'Data / AI',
      filterFs:     'Full Stack',
      code:         'Source code',
      demo:         'Visit platform',
      featured:     '★ Featured',
      githubCta:    'Explore more open-source code on my GitHub',
      githubBtn:    'Visit my GitHub',
    },
    resume: {
      sectionSub:   'Career timeline',
      sectionTitle: 'Experience, Education & Awards',
      tabAll:       'All',
      tabWork:      'Experience',
      tabEdu:       'Education & Degrees',
      downloadDesc: 'Download my full resume in PDF format',
      downloadBtn:  'Download CV',
    },
    contact: {
      sectionSub:   'Let\'s build together',
      sectionTitle: 'Get in touch',
      sectionDesc:  'Have a project, job opportunity or collaboration in mind? I will get back to you within 24 hours.',
      labelName:    'Full name *',
      labelEmail:   'Email *',
      labelSubject: 'Subject *',
      labelMessage: 'Message *',
      phName:       'Your name or company',
      phEmail:      'your.email@company.com',
      phSubject:    'Job opportunity, Data project, Web dev...',
      phMessage:    'Tell me about your project, goals or proposal...',
      send:         'Send message',
      sending:      'Opening email client...',
      success:      'Message ready! ✓',
      error:        'Error — please retry',
      successNote:  'Your email client opened with the pre-filled message 📧',
      privacy:      '* Fast response guaranteed within 24h',
      availTitle:   'Availability',
      availDesc:    'Open to full-time roles, freelance missions and innovative collaborations on-site or remote.',
      socials:      'Professional Networks',
      errName:      'Please enter your name',
      errEmail:     'Please enter a valid email',
      errEmailInvalid: 'Invalid email address',
      errSubject:   'Please provide a subject',
      errMessage:   'Message too short (20 characters minimum)',
    },
    footer: {
      desc:      'Data Scientist & Full Stack Developer based in Ouagadougou. Passionate about artificial intelligence, big data and software engineering.',
      nav:       'Navigation',
      more:      'Quick Links',
      rights:    'All rights reserved',
      madeWith:  'Built with passion',
      location:  'in Ouagadougou, Burkina Faso',
      cvLink:    'Download CV (PDF)',
    },
    cvData: {
      jobTitle: 'Data Scientist & Full Stack Developer',
      profileText: 'Computer Scientist and Data Scientist in training, holding a Bachelor\'s Degree in Statistics and Computer Science and currently pursuing a Master\'s Degree in Data Science at Joseph KI-ZERBO University. Hands-on experience in data processing, analytics and visualization (Python, R, Stata, Power BI), as well as designing, developing and deploying web applications and PostgreSQL management solutions.',
      
      langs: [
        { name: 'French', level: 'C1 (Advanced)' },
        { name: 'English', level: 'B1 (Intermediate)' },
      ],
      
      chips: [
        'Data & AI : Python (Pandas, Scikit, ML, DL), R, Stata, Power BI, ArcGIS Pro, Big Data',
        'Frontend : React, Next.js, TypeScript, Tailwind CSS, Angular, HTML5, CSS3',
        'Backend : PostgreSQL, Python (FastAPI/REST), Java, Spring Boot, Supabase, Prisma, MongoDB',
        'DevOps & Tools : Docker, Kubernetes, Git, MLOps, Linux, Odoo, Maarch, Agile/Scrum',
      ],
      
      formations: [
        { date: 'Since October 2026', title: 'Full Stack Developer Training', org: 'Orange Digital Center, Ouagadougou', details: 'Modern web and mobile application development, software architectures and continuous integration.' },
        { date: 'Since October 2025', title: 'Master in Data Science', org: 'Joseph KI-ZERBO University, Burkina Faso', details: 'Machine Learning, Deep Learning, Computer Vision, Big Data, mathematical modeling and MLOps.' },
        { date: 'October 2022 - July 2025', title: 'Bachelor in Statistics and Computer Science', org: 'Nazi BONI University, Bobo-Dioulasso', details: 'Inferential statistics, probability, software engineering, algorithms and databases.' },
        { date: '2022', title: 'High School Diploma (Series D)', org: 'Boromo Provincial High School', details: 'Mathematics, physics and life sciences.' },
      ],
      
      experiences: [
        {
          date: 'November 2025 - October 2026',
          title: 'Full Stack Developer - Professional Internship',
          org: 'Telia Informatique, Ouagadougou',
          bullets: [
            'Built and deployed the WAEMU Scholarship platform (e-bourse.uemoa.int)',
            'Designed and launched the institutional website for Telia Informatique (teliainfo.com/fr)',
            'Contributed to the development of the WAEMU recruitment platform',
            'Engineered management solutions for SONAGESS, Yalgado Hospital, DGAIE, SOBTO, Postal Bank, CARFO and maintained SIG-EPE',
            'Deployed electronic document management (Maarch) for LONAB and CNSS',
            'PostgreSQL administration, REST API engineering and Angular/React frontends in an Agile/Scrum team',
          ],
          tags: ['PostgreSQL', 'Python', 'Java', 'Spring Boot', 'Angular', 'Odoo', 'Docker', 'Kubernetes'],
        },
        {
          date: 'June - July 2025',
          title: 'Monitoring & Evaluation Officer - Internship',
          org: 'SBUM, Bobo-Dioulasso',
          bullets: [
            'Designed and administered survey questionnaires using KoboToolbox',
            'Collected, cleaned and analyzed participation data using Excel and R, automated statistical reporting',
          ],
          tags: ['KoboToolbox', 'Excel', 'R', 'Statistics'],
        },
        {
          date: 'March - June 2025',
          title: 'Statistics Internship',
          org: 'INSD, Ouagadougou',
          bullets: [
            'Massive data processing and analysis using Python, R and Stata',
            'Automated Power BI executive dashboards and conducted spatial/GIS analysis with ArcGIS Pro',
          ],
          tags: ['Python', 'R', 'Stata', 'Power BI', 'ArcGIS Pro'],
        },
        {
          date: 'July - September 2023',
          title: 'IT Maintenance & Support Internship',
          org: 'CBIT, Ouagadougou',
          bullets: [
            'Hardware and software diagnosis, Windows and Linux systems configuration, user support',
          ],
          tags: ['Hardware', 'Windows', 'Linux', 'IT Support'],
        },
      ],
      
      projects: [
        { name: 'WAEMU e-Scholarship', description: 'Official bilingual scholarship management platform', stack: 'Odoo, Python, PostgreSQL, Docker', link: 'e-bourse.uemoa.int' },
        { name: 'Mon Atelier Pro', description: 'Daily management SaaS for tailoring and fashion workshops', stack: 'React, Next.js, TypeScript, Tailwind', link: 'monatelierpro.app' },
        { name: 'Leader Trading Business Express', description: 'Secure crypto and currency exchange platform', stack: 'React, Next.js, TypeScript, REST API', link: 'ltbexpress.com' },
        { name: 'Telia Informatique', description: 'Corporate website for IT engineering services', stack: 'React, TypeScript, Tailwind', link: 'teliainfo.com/fr' },
      ],
      
      certifications: [
        'Responsive Web Design - freeCodeCamp (300h - Oct. 2026)',
        'Odoo 14 Essentials Certification - Hibou Corp. (April 2026 - No. 000000825)',
        'Introduction to Computer Vision - Orange Digital Center (Oct. 2025)',
      ],

      distinctions: [
        '2nd National Place CIF-AO Hackathon 2026 (DataMasters Team)',
      ],
      
      signatureCert: 'I certify that the information above is true and accurate',
      
      sectionTitles: {
        profil: 'Profile',
        langues: 'Languages',
        competences: 'Skills',
        dataAnalytics: 'Data Science & AI',
        formations: 'Education',
        experiences: 'Professional Experience',
        experiencesSuite: 'Professional Experience (continued)',
        projets: 'Featured Projects',
      },
    },
  },
}
