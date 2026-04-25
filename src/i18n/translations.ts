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
      available:   'Disponible pour missions & collaborations',
      role1:       '⚡ Dev Full Stack',
      role2:       '📊 Data Analyst',
      tagline:     'Je transforme les données en décisions et les idées en applications.',
      location:    'Ouagadougou',
      locationSub: 'disponible en remote',
      stack:       'React · TypeScript · Python · SQL · Power BI · Node.js',
      cta1:        'Voir mes projets',
      cta2:        'Télécharger CV',
      scroll:      'SCROLL',
      yearsExp:    "ans d'exp.",
      projects:    'projets',
    },

    // ── ABOUT ────────────────────────────────────────────────────────────────
    about: {
      sectionSub:  'À propos de moi',
      sectionTitle:'Qui suis-je ?',
      h3:          'Développeur passionné &\nData Analyst rigoureux',
      h3accent:    'Data Analyst rigoureux',
      p1: "Je suis un développeur Full Stack et Data Analyst basé à Ouagadougou, avec plus de 3 ans d'expérience à construire des applications web modernes et à transformer des données brutes en insights actionnables.",
      p2: "Mon double profil me permet de couvrir tout le cycle de vie d'un projet : de la conception de l'architecture technique jusqu'à l'analyse des résultats business. J'aime les défis complexes et livrer des solutions propres, performantes et bien documentées.",
      p3: "Quand je ne code pas, je contribue à des projets open source, je lis des articles tech, ou j'explore de nouveaux datasets pour affiner mes modèles analytiques.",
      cta1:        'Me contacter',
      cta2:        'Voir CV',
      location:    'Ouagadougou, Burkina Faso',
      highlights: {
        dev:   { label: 'Dev Full Stack',  desc: 'React, Node.js, TypeScript, Python' },
        data:  { label: 'Data Analyst',    desc: 'SQL, Power BI, Python, ML' },
        exp:   { label: "3+ ans d'exp.",   desc: 'Web & Data, projets clients' },
        grad:  { label: 'Diplômé',         desc: 'Informatique + Data Science' },
      },
    },

    // ── SKILLS ───────────────────────────────────────────────────────────────
    skills: {
      sectionSub:  'Mes compétences',
      sectionTitle:'Stack technique',
      filterAll:   'Toutes',
    },

    // ── PROJECTS ─────────────────────────────────────────────────────────────
    projects: {
      sectionSub:   'Ce que j\'ai construit',
      sectionTitle: 'Mes projets',
      sectionDesc:  'Une sélection de projets Dev Web et Data Analyse — chacun résout un problème réel.',
      filterAll:    'Tous',
      filterDev:    'Dev Web',
      filterData:   'Data / IA',
      filterFs:     'Full Stack',
      code:         'Code source',
      demo:         'Voir démo',
      featured:     '★ Featured',
      githubCta:    "D'autres projets disponibles sur GitHub",
      githubBtn:    'Voir tous mes projets',
    },

    // ── RESUME ───────────────────────────────────────────────────────────────
    resume: {
      sectionSub:   'Mon parcours',
      sectionTitle: 'Expériences & Formation',
      tabAll:       'Tout',
      tabWork:      'Expériences',
      tabEdu:       'Formations',
      downloadDesc: 'Toutes mes expériences et compétences en détail',
      downloadBtn:  'Télécharger CV',
    },

    // ── CONTACT ──────────────────────────────────────────────────────────────
    contact: {
      sectionSub:   'Travaillons ensemble',
      sectionTitle: 'Me contacter',
      sectionDesc:  'Un projet, une collaboration, ou juste une question ? Je réponds sous 24h.',
      labelName:    'Nom complet *',
      labelEmail:   'Email *',
      labelSubject: 'Sujet *',
      labelMessage: 'Message *',
      phName:       'Jean Dupont',
      phEmail:      'jean@email.com',
      phSubject:    'Projet freelance, collaboration...',
      phMessage:    'Décrivez votre projet ou votre demande...',
      send:         'Envoyer le message',
      sending:      'Ouverture mail...',
      success:      'Message préparé ! ✓',
      error:        'Erreur — réessayez',
      successNote:  'Votre client mail s\'est ouvert avec le message pré-rempli 📧',
      privacy:      '* Champs obligatoires — Aucune donnée stockée',
      availTitle:   'Disponible',
      availDesc:    'Ouvert aux missions freelance, CDI, et collaborations remote. Réponse sous 24h garantie.',
      socials:      'Réseaux sociaux',
      errName:      'Nom requis',
      errEmail:     'Email requis',
      errEmailInvalid: 'Email invalide',
      errSubject:   'Sujet requis',
      errMessage:   'Message trop court (20 car. min.)',
    },

    // ── FOOTER ───────────────────────────────────────────────────────────────
    footer: {
      desc:      'Dev Full Stack & Data Analyst basé à Ouagadougou. Passionné par la création d\'expériences web et l\'analyse de données.',
      nav:       'Navigation',
      more:      'Plus',
      rights:    'Tous droits réservés',
      madeWith:  'Fait avec',
      location:  'à Ouagadougou',
      cvLink:    'Télécharger CV',
    },

        // ── DONNÉES CV ───────────────────────────────────────────────────────────────
    cvData: {
      jobTitle: 'Développeur Full Stack & Data Analyst',
      profileText: 'Développeur Full Stack et Data Analyst passionné, avec une double compétence en développement web et analyse de données. Expert en solutions ERP (Odoo) et gestion électronique de documents (Maarch). Rigoureux, adaptable et toujours à l\'affût des nouvelles technologies.',
      
      langs: [
        { name: 'Français', level: 'C1 (Avancé)' },
        { name: 'Anglais', level: 'B1 (Intermédiaire)' },
      ],
      
      chips: [
        'Langages : Python, Java, TypeScript, R, SQL',
        'Frontend : React, Angular, Tailwind CSS, Flutter, Figma',
        'Backend/BDD : Spring Boot, Prisma, Supabase, PostgreSQL',
        'Data/IA : Machine Learning, Power BI, Stata, ArcGIS Pro',
        'DevOps/Outils : Docker, Kubernetes, Git, Grafana',
        'ERP/GED : Odoo, Maarch',
      ],
      
      formations: [
        { date: 'Depuis octobre 2025', title: 'Master en Sciences des Données', org: 'Université Joseph KI-ZERBO', details: 'Principaux axes : Analyse de données, Modélisation statistique, Développement logiciel, Intelligence Artificielle.' },
        { date: 'Octobre 2022 - Juillet 2025', title: 'Licence en Statistiques et Informatique', org: 'Université Nazi BONI de Bobo-Dioulasso', details: 'Principaux axes : Modélisation et analyse statistique, Bases de données, Réseaux, Programmation avancée' },
        { date: '2020 – 2022', title: 'Baccalauréat série D', org: 'Lycée Provincial de Boromo', details: 'Principaux axes : Sciences de la Vie et de la Terre.' },
        { date: '2018 – 2020', title: 'Brevet d’Études du Premier Cycle (BEPC)', org: 'Lycée Privé Évangélique de Boromo' },
        { date: '2014 – 2018', title: 'Certificat d’Études Primaires (CEP)', org: 'École Primaire de Boromo' },
      ],
      
      experiences: [
        {
          date: 'Depuis novembre 2025',
          title: 'Développeur Full Stack',
          org: 'Telia Informatique',
          bullets: [
            'Déploiement et pilotage de Maarch (GED/SAE) pour LONAB et CNSS',
            'Conception de logiciels de gestion (budgétaire, comptable, stock) pour SONAGESS, CHU Yalgado, DGAIE, UEMOA, ...',
            'Développement d\'un site e-recrutement pour l\'UEMOA',
            'Stack technique : Python, Java, Spring Boot, Angular, Figma, Odoo, Docker, Kubernetes – Méthode Scrum',
          ],
          tags: ['Maarch', 'Odoo', 'Python', 'JavaScript', 'Spring Boot', 'Angular', 'Docker', 'Scrum'],
        },
        {
          date: 'Juin – Juillet 2025',
          title: 'Chargé Suivi & Évaluation',
          org: 'SBUM - Bobo-Dioulasso',
          bullets: [
            'Conception et administration de questionnaires avec KoboToolbox',
            'Collecte et analyse des données de participation sous Excel et R',
            'Automatisation des rapports et reporting stratégique',
          ],
          tags: ['KoboToolbox', 'Excel', 'R', 'Reporting', 'Analyse de données'],
        },
        {
          date: 'Mars – Juin 2025',
          title: 'Stage en Statistiques pour l\'obtention de la Licence',
          org: 'INSD - Ouagadougou',
          bullets: [
            'Thème : Analyse des disparités liées au genre dans l’inclusion sociale sur le marché de l’emploi au Burkina Faso.',
            'Traitement et analyse de données massives (Stata, R, Python) et automatisation des rapports Power BI',
            'Analyse spatiale et cartographie avec ArcGIS Pro',
          ],
          tags: ['Power BI', 'Stata', 'R', 'Python', 'ArcGIS Pro', 'Statistiques'],
        },
        {
          date: 'Juillet – Septembre 2023',
          title: 'Stage en Maintenance et Support IT',
          org: 'CBIT - Comptoir Burkinabè de l\'Informatique et de la Technologie',
          bullets: [
            'Diagnostic matériel / logiciel et résolution de pannes',
            'Installation et configuration de systèmes (Windows, Linux)',
            'Assistance utilisateurs, maintenance préventive et gestion du parc informatique',
          ],
          tags: ['Hardware', 'OS', 'Windows', 'Linux', 'Support IT'],
        },
      ],
      
      projects: [
        { name: 'Gestion École (Odoo)', description: 'ERP complet : inscriptions, notes, paiements', stack: 'Odoo, Python, PostgreSQL', link: null },
        { name: 'Laiterie NASOO', description: 'E-commerce produits laitiers locaux', stack: 'React, Prisma, Supabase', link: 'laiterienasoo.com' },
        { name: 'Parapharmacie Dalwo', description: 'Catalogue digital et vitrine', stack: 'React, Tailwind', link: 'parapharmaciedalwo.com' },
        { name: 'Portfolio Personnel', description: 'Mon portfolio professionnel', stack: 'React, TypeScript, Tailwind', link: 'abdrafithzongo.com' },
      ],
      
      dataSkills: [
        'Statistiques descriptives et inférentielles',
        'Modélisation (régressions, tests)',
        'Tableaux de bord Power BI',
        'Rigueur analytique et adaptabilité',
      ],
      
      signatureCert: 'Je certifie sur l\'honneur l\'exactitude des informations ci-dessus',
      
      // Sections titles
      sectionTitles: {
        profil: 'Profil',
        langues: 'Langues',
        competences: 'Compétences',
        dataAnalytics: 'Data & Analytics',
        formations: 'Formations',
        experiences: 'Expériences professionnelles',
        experiencesSuite: 'Expériences professionnelles (suite)',
        projets: 'Projets Personnels',
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
      available:   'Available for missions & collaborations',
      role1:       '⚡ Full Stack Dev',
      role2:       '📊 Data Analyst',
      tagline:     'I turn data into decisions and ideas into applications.',
      location:    'Ouagadougou',
      locationSub: 'remote friendly',
      stack:       'React · TypeScript · Python · SQL · Power BI · Node.js',
      cta1:        'View my projects',
      cta2:        'Download CV',
      scroll:      'SCROLL',
      yearsExp:    'yrs exp.',
      projects:    'projects',
    },
    about: {
      sectionSub:  'About me',
      sectionTitle:'Who am I?',
      h3:          'Passionate Developer &\nRigorous Data Analyst',
      h3accent:    'Rigorous Data Analyst',
      p1: 'I am a Full Stack Developer and Data Analyst based in Ouagadougou, with over 3 years of experience building modern web applications and transforming raw data into actionable insights.',
      p2: 'My dual profile lets me cover the entire project lifecycle: from technical architecture design to business results analysis. I enjoy complex challenges and delivering clean, performant, well-documented solutions.',
      p3: 'When I\'m not coding, I contribute to open source projects, read tech articles, or explore new datasets to refine my analytical models.',
      cta1:        'Contact me',
      cta2:        'View CV',
      location:    'Ouagadougou, Burkina Faso',
      highlights: {
        dev:   { label: 'Full Stack Dev',  desc: 'React, Node.js, TypeScript, Python' },
        data:  { label: 'Data Analyst',    desc: 'SQL, Power BI, Python, ML' },
        exp:   { label: '3+ yrs exp.',     desc: 'Web & Data, client projects' },
        grad:  { label: 'Graduate',        desc: 'Computer Science + Data Science' },
      },
    },
    skills: {
      sectionSub:  'My skills',
      sectionTitle:'Tech stack',
      filterAll:   'All',
    },
    projects: {
      sectionSub:   'What I\'ve built',
      sectionTitle: 'My projects',
      sectionDesc:  'A selection of Web Dev and Data Analysis projects — each solving a real problem.',
      filterAll:    'All',
      filterDev:    'Web Dev',
      filterData:   'Data / AI',
      filterFs:     'Full Stack',
      code:         'Source code',
      demo:         'Live demo',
      featured:     '★ Featured',
      githubCta:    'More projects available on GitHub',
      githubBtn:    'View all my projects',
    },
    resume: {
      sectionSub:   'My journey',
      sectionTitle: 'Experience & Education',
      tabAll:       'All',
      tabWork:      'Experience',
      tabEdu:       'Education',
      downloadDesc: 'All my experiences and skills in detail',
      downloadBtn:  'Download CV',
    },
    contact: {
      sectionSub:   'Let\'s work together',
      sectionTitle: 'Contact me',
      sectionDesc:  'A project, a collaboration, or just a question? I reply within 24h.',
      labelName:    'Full name *',
      labelEmail:   'Email *',
      labelSubject: 'Subject *',
      labelMessage: 'Message *',
      phName:       'John Doe',
      phEmail:      'john@email.com',
      phSubject:    'Freelance project, collaboration...',
      phMessage:    'Describe your project or request...',
      send:         'Send message',
      sending:      'Opening mail...',
      success:      'Message ready! ✓',
      error:        'Error — please retry',
      successNote:  'Your mail client opened with the pre-filled message 📧',
      privacy:      '* Required fields — No data stored',
      availTitle:   'Available',
      availDesc:    'Open to freelance missions, full-time roles, and remote collaborations. Reply within 24h guaranteed.',
      socials:      'Social networks',
      errName:      'Name required',
      errEmail:     'Email required',
      errEmailInvalid: 'Invalid email',
      errSubject:   'Subject required',
      errMessage:   'Message too short (20 chars min.)',
    },
    footer: {
      desc:      'Full Stack Dev & Data Analyst based in Ouagadougou. Passionate about building web experiences and analysing data.',
      nav:       'Navigation',
      more:      'More',
      rights:    'All rights reserved',
      madeWith:  'Made with',
      location:  'in Ouagadougou',
      cvLink:    'Download CV',
    },
    // ── CV DATA ───────────────────────────────────────────────────────────────
    cvData: {
      jobTitle: 'Full Stack Developer & Data Analyst',
      profileText: 'Passionate Full Stack Developer and Data Analyst with dual expertise in web development and data analysis. Expert in ERP solutions (Odoo) and electronic document management (Maarch). Rigorous, adaptable, and always eager to explore new technologies.',
      
      langs: [
        { name: 'French', level: 'C1 (Advanced)' },
        { name: 'English', level: 'B1 (Intermediate)' },
      ],
      
      chips: [
        'Languages : Python, Java, TypeScript, R, SQL',
        'Frontend : React, Angular, Tailwind CSS, Flutter, Figma',
        'Backend/DB : Spring Boot, Prisma, Supabase, PostgreSQL',
        'Data/AI : Machine Learning, Power BI, Stata, ArcGIS Pro',
        'DevOps/Tools : Docker, Kubernetes, Git, Grafana',
        'ERP/GED : Odoo, Maarch',
      ],
      
      formations: [
        { date: 'Since October 2025', title: 'Master in Data Science', org: 'Joseph KI-ZERBO University', details: 'Main areas : Data Analysis, Statistical Modeling, Software Development, Artificial Intelligence.' },
        { date: 'October 2022 - July 2025', title: 'Bachelor in Statistics and Computer Science', org: 'Nazi BONI University of Bobo-Dioulasso', details: 'Main areas : Statistical Modeling & Analysis, Databases, Networks, Advanced Programming' },
        { date: '2020 – 2022', title: 'High School Diploma (Series D)', org: 'Boromo Provincial High School', details: 'Main areas : Life and Earth Sciences' },
        { date: '2018 – 2020', title: 'Secondary School Certificate (BEPC)', org: 'Boromo Evangelical Private High School' },
        { date: '2014 – 2018', title: 'Primary School Certificate (CEP)', org: 'Boromo Primary School' },
      ],
      
      experiences: [
        {
          date: 'Since November 2025',
          title: 'Full Stack Developer',
          org: 'Telia Informatique',
          bullets: [
            'Deployment and management of Maarch (GED/SAE) for LONAB and CNSS',
            'Design of management software (budget, accounting, inventory) for SONAGESS, CHU Yalgado, DGAIE, UEMOA, ...',
            'Development of an e-recruitment site for UEMOA',
            'Tech stack : Python, Java, Spring Boot, Angular, Figma, Odoo, Docker, Kubernetes – Scrum methodology',
          ],
          tags: ['Maarch', 'Odoo', 'Python', 'JavaScript', 'Spring Boot', 'Angular', 'Docker', 'Scrum'],
        },
        {
          date: 'June – July 2025',
          title: 'Monitoring & Evaluation Officer',
          org: 'SBUM - Bobo-Dioulasso',
          bullets: [
            'Design and administration of questionnaires with KoboToolbox',
            'Data collection and analysis using Excel and R',
            'Report automation and strategic reporting',
          ],
          tags: ['KoboToolbox', 'Excel', 'R', 'Reporting', 'Data Analysis'],
        },
        {
          date: 'March – June 2025',
          title: 'Statistics Internship (Bachelor\'s Degree)',
          org: 'INSD - Ouagadougou',
          bullets: [
            'Theme : Analysis of gender disparities in social inclusion in the job market in Burkina Faso.',
            'Massive data processing and analysis (Stata, R, Python) and Power BI report automation',
            'Spatial analysis and cartography with ArcGIS Pro',
          ],
          tags: ['Power BI', 'Stata', 'R', 'Python', 'ArcGIS Pro', 'Statistics'],
        },
        {
          date: 'July – September 2023',
          title: 'IT Maintenance & Support Internship',
          org: 'CBIT - Burkinabe IT and Technology Center',
          bullets: [
            'Hardware/software diagnostics and troubleshooting',
            'System installation and configuration (Windows, Linux)',
            'User support, preventive maintenance, and IT asset management',
          ],
          tags: ['Hardware', 'OS', 'Windows', 'Linux', 'IT Support'],
        },
      ],
      
      projects: [
        { name: 'School Management (Odoo)', description: 'Complete ERP : registrations, grades, payments', stack: 'Odoo, Python, PostgreSQL', link: null },
        { name: 'NASOO Dairy', description: 'E-commerce for local dairy products', stack: 'React, Prisma, Supabase', link: 'laiterienasoo.com' },
        { name: 'Dalwo Pharmacy', description: 'Digital catalog and showcase', stack: 'React, Tailwind', link: 'parapharmaciedalwo.com' },
        { name: 'Personal Portfolio', description: 'My professional portfolio', stack: 'React, TypeScript, Tailwind', link: 'abdrafithzongo.com' },
      ],
      
      dataSkills: [
        'Descriptive and inferential statistics',
        'Modeling (regressions, tests)',
        'Power BI dashboards',
        'Analytical rigor and adaptability',
      ],
      
      signatureCert: 'I certify on my honor that the information above is accurate',
      
      // Sections titles
      sectionTitles: {
        profil: 'Profile',
        langues: 'Languages',
        competences: 'Skills',
        dataAnalytics: 'Data & Analytics',
        formations: 'Education',
        experiences: 'Professional Experience',
        experiencesSuite: 'Professional Experience (continued)',
        projets: 'Personal Projects',
      },
    },
  },
}