// src/components/sections/CVPage.tsx
import { useRef } from 'react';
import { 
  ArrowLeft, MapPin, Mail, Phone, User, ExternalLink, Download, 
  Building2, Award, Briefcase, Code2, BarChart3, GraduationCap, 
  Languages, Heart, Github, Linkedin, Globe 
} from 'lucide-react';
import { PDFViewer, pdf, Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// ═════════════════════════════════════════════════════════════════════════════
// DONNÉES CV COMPLÈTES
// ═════════════════════════════════════════════════════════════════════════════
const DATA = {
  name: 'Abdrafith ZONGO',
  email: 'zongo1abdrafith@gmail.com',
  phone: '+226 07 71 32 17',
  location: 'Ouagadougou, Burkina Faso',
  github: 'https://github.com/Abdrafith-ZONGO',
  githubUsername: 'Abdrafith-ZONGO',
  linkedin: 'https://www.linkedin.com/in/abdrafith-zongo-31a6b9265',
  linkedinUsername: 'Abdrafith ZONGO',
  portfolio: 'https://abdrafithzongo.com',
  portfolioName: 'abdrafithzongo.com',
  photo: '/src/assets/photoProfil.jpeg',

langs: [
    { name: 'Français', level: 'C1 (Avancé)' },
    // { name: 'Morée', level: 'C1 (Paternelle)' },
    // { name: 'Dioula', level: 'C1 (Maternelle)' },
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
    { 
      date: 'Depuis octobre 2025', 
      title: 'Master en Sciences des Données', 
      org: 'Université Joseph KI-ZERBO',
      details: 'Principaux axes : Analyse de données, Modélisation statistique, Développement logiciel, Intelligence Artificielle.'
    },
  { 
    date: 'Octobre 2022 - Juillet 2025', 
    title: 'Licence en Statistiques et Informatique', 
    org: 'Université Nazi BONI de Bobo-Dioulasso',
    details: 'Principaux axes : Modélisation et analyse statistique, Bases de données, Réseaux, Programmation avancée'
  },
    { 
      date: '2020 – 2022', 
      title: 'Baccalauréat série D', 
      org: 'Lycée Provincial de Boromo',
      details: 'Principaux axes : Sciences de la Vie et de la Terre.'
    },
    { 
      date: '2018 – 2020', 
      title: 'Brevet d’Études du Premier Cycle (BEPC)', 
      org: 'Lycée Privé Évangélique de Boromo' 
    },
    { 
      date: '2014 – 2018', 
      title: 'Certificat d’Études Primaires (CEP)', 
      org: 'École Primaire de Boromo' 
    },
  ],

  experiences: [
    {
      date: 'Depuis novembre 2025',
      title: 'Développeur Full Stack',
      org: 'Telia Informatique',
      bullets: [
        'Déploiement et pilotage de Maarch (GED/SAE) pour LONAB et CNSS',
        'Conception de logiciels de gestion (budgétaire, comptable, stock) pour SONAGESS, CHU Yalgado, DGAIE, UEMOA, ... ',
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
    {
      name: 'Gestion École (Odoo)',
      description: 'ERP complet : inscriptions, notes, paiements',
      stack: 'Odoo, Python, PostgreSQL',
      link: null,
    },
    {
      name: 'Laiterie NASOO',
      description: 'E-commerce produits laitiers locaux',
      stack: 'React, Prisma, Supabase',
      link: 'laiterienasoo.com',
    },
    {
      name: 'Parapharmacie Dalwo',
      description: 'Catalogue digital et vitrine',
      stack: 'React, Tailwind',
      link: 'parapharmaciedalwo.com',
    },
    {
      name: 'Portfolio Personnel',
      description: 'Mon portfolio professionnel',
      stack: 'React, TypeScript, Tailwind',
      link: 'abdrafithzongo.com',
    },
  ],

  dataSkills: [
    'Statistiques descriptives et inférentielles',
    'Modélisation (régressions, tests)',
    'Tableaux de bord Power BI',
    'Rigueur analytique et adaptabilité',
  ],

  // assoc: {
  //   date: '2022 – Août 2025',
  //   title: 'Délégué activités sportives',
  //   org: 'CESI — UNB',
  //   bullets: [
  //     'Organisation d\'événements sportifs inter-facultés',
  //     'Coordination des équipes',
  //   ],
  // },
};

// ═════════════════════════════════════════════════════════════════════════════
// STYLES PDF - OPTIMISÉ POUR 2 PAGES
// ═════════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  header: {
    backgroundColor: '#0f172a',
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  photo: {
    width: 65,
    height: 65,
    borderRadius: 33,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    color: '#93c5fd',
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 7,
    color: '#e2e8f0',
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  contactLabel: {
    fontSize: 7,
    color: '#93c5fd',
    fontWeight: 'bold',
  },
  contactText: {
    fontSize: 7,
    color: '#e2e8f0',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  socialLabel: {
    fontSize: 7,
    color: '#93c5fd',
    fontWeight: 'bold',
  },
  socialText: {
    fontSize: 7,
    color: '#cbd5e1',
  },
  container: {
    flexDirection: 'row',
    gap: 15,
  },
  sidebar: {
    width: '33%',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
  },
  content: {
    width: '67%',
    padding: 2,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1.5,
    borderBottomColor: '#2563eb',
    paddingBottom: 3,
  },
  profileText: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#0f172a',
    marginBottom: 10,
  },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  langName: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  langLevel: {
    fontSize: 8,
    color: '#2563eb',
  },
  skillBadge: {
    fontSize: 7,
    backgroundColor: '#ffffff',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: 4,
    marginBottom: 4,
    color: '#0f172a',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  expDate: {
    fontSize: 7,
    color: '#2563eb',
  },
  expOrg: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 3,
    fontStyle: 'italic',
  },
  details: {
  fontSize: 7,            
  color: '#475569',      
  marginTop: 2,           
  fontStyle: 'italic',    
  lineHeight: 1.3,        
},
  expBullet: {
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2563eb',
    marginRight: 5,
    marginTop: 3,
  },
  expBulletText: {
    fontSize: 7,
    color: '#1e293b',
    flex: 1,
    lineHeight: 1.3,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
    gap: 3,
  },
  tag: {
    fontSize: 6,
    paddingVertical: 1,
    paddingHorizontal: 4,
    backgroundColor: '#dbeafe',
    borderRadius: 3,
    color: '#1e40af',
  },
  projectItem: {
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e8f0',
  },
  projectName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 7,
    color: '#334155',
    marginBottom: 2,
    lineHeight: 1.3,
  },
  projectStack: {
    fontSize: 6,
    color: '#2563eb',
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 6,
    color: '#475569',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dataSkillItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  dataSkillBullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2563eb',
    marginRight: 5,
    marginTop: 2,
  },
  dataSkillText: {
    fontSize: 7,
    color: '#1e293b',
    flex: 1,
    lineHeight: 1.3,
  },
  signatureWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 25,
    right: 25,
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  signatureItem: {
    flex: 1,
    alignItems: 'center',
  },
  signatureDate: {
    fontSize: 7,
    color: '#475569',
    marginBottom: 30,
  },
  signatureLine: {
    borderTopWidth: 0.5,
    borderTopColor: '#cbd5e1',
    width: '70%',
    paddingTop: 2,
  },
  signatureName: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 30,
  },
  contentWithPadding: {
    flex: 1,
    paddingBottom: 30,
  },
});

// ═════════════════════════════════════════════════════════════════════════════
// COMPOSANT PDF
// ═════════════════════════════════════════════════════════════════════════════
const CVPDFDocument = () => (
  <Document>
    {/* PAGE 1 - Formations + 3 premières expériences */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={DATA.photo} style={styles.photo} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{DATA.name}</Text>
          <Text style={styles.title}>Développeur Full Stack & Data Analyst</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactText}>{DATA.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Tel:</Text>
              <Text style={styles.contactText}>{DATA.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Adresse:</Text>
              <Text style={styles.contactText}>{DATA.location}</Text>
            </View>
          </View>
          <View style={styles.socialLinks}>
            <View style={styles.socialItem}>
              <Text style={styles.socialLabel}>GitHub:</Text>
              <Text style={styles.socialText}>{DATA.githubUsername}</Text>
            </View>
            <View style={styles.socialItem}>
              <Text style={styles.socialLabel}>LinkedIn:</Text>
              <Text style={styles.socialText}>{DATA.linkedinUsername}</Text>
            </View>
            <View style={styles.socialItem}>
              <Text style={styles.socialLabel}>Portfolio:</Text>
              <Text style={styles.socialText}>{DATA.portfolioName}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.sidebar}>
          <View>
            <Text style={styles.sectionTitle}>Profil</Text>
            <Text style={styles.profileText}>
              Développeur Full Stack et Data Analyst passionné, avec une double compétence en 
              développement web et analyse de données. Expert en solutions ERP (Odoo) et 
              gestion électronique de documents (Maarch). Rigoureux, adaptable et toujours 
              à l'affût des nouvelles technologies.
            </Text>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Langues</Text>
            {DATA.langs.map((lang, i) => (
              <View key={i} style={styles.langItem}>
                <Text style={styles.langName}>{lang.name}</Text>
                <Text style={styles.langLevel}>{lang.level}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionTitle}>Compétences</Text>
            <View style={styles.skillContainer}>
              {DATA.chips.map((skill, i) => (
                <Text key={i} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Data & Analytics</Text>
            {DATA.dataSkills.map((skill, i) => (
              <View key={i} style={styles.dataSkillItem}>
                <View style={styles.dataSkillBullet} />
                <Text style={styles.dataSkillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <View>
            <Text style={styles.sectionTitle}>Formations</Text>
            {DATA.formations.map((formation, i) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expTitle}>{formation.title}</Text>
                  <Text style={styles.expDate}>{formation.date}</Text>
                </View>
                <Text style={styles.expOrg}>{formation.org}</Text>
                {formation.details && (
              <Text style={styles.details}>{formation.details}</Text>
    )}
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionTitle}>Expériences professionnelles</Text>
            {DATA.experiences.slice(0, 3).map((exp, i) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expTitle}>{exp.title}</Text>
                  <Text style={styles.expDate}>{exp.date}</Text>
                </View>
                <Text style={styles.expOrg}>{exp.org}</Text>
                {exp.bullets.map((bullet, j) => (
                  <View key={j} style={styles.expBullet}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.expBulletText}>{bullet}</Text>
                  </View>
                ))}
                <View style={styles.tagContainer}>
                  {exp.tags.map((tag, j) => (
                    <Text key={j} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>

    {/* PAGE 2 - Dernière expérience + Projets + Engagements + Signature */}
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <View>
            <Text style={styles.sectionTitle}>Projets Personnels</Text>
            {DATA.projects.map((project, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDesc}>{project.description}</Text>
                <Text style={styles.projectStack}>{project.stack}</Text>
                {project.link && (
                  <View style={styles.projectLink}>
                    <Text>Site:</Text>
                    <Text>{project.link}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <View>
            <Text style={styles.sectionTitle}>Expériences professionnelles (suite)</Text>
            {DATA.experiences.slice(3, 4).map((exp, i) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expTitle}>{exp.title}</Text>
                  <Text style={styles.expDate}>{exp.date}</Text>
                </View>
                <Text style={styles.expOrg}>{exp.org}</Text>
                {exp.bullets.map((bullet, j) => (
                  <View key={j} style={styles.expBullet}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.expBulletText}>{bullet}</Text>
                  </View>
                ))}
                <View style={styles.tagContainer}>
                  {exp.tags.map((tag, j) => (
                    <Text key={j} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* <View>
            <Text style={styles.sectionTitle}>Engagements</Text>
            <View style={styles.experienceItem}>
              <View style={styles.expHeader}>
                <Text style={styles.expTitle}>{DATA.assoc.title}</Text>
                <Text style={styles.expDate}>{DATA.assoc.date}</Text>
              </View>
              <Text style={styles.expOrg}>{DATA.assoc.org}</Text>
              {DATA.assoc.bullets.map((bullet, j) => (
                <View key={j} style={styles.expBullet}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.expBulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View> */}
        </View>
      </View>

    {/* Signature et mention */}
    <View style={styles.signatureWrapper}>
      <View style={styles.signatureContainer}>
        <View style={styles.signatureItem}>
          <Text style={styles.signatureDate}>Fait à Ouagadougou, le ___/___/2026</Text>
          <View style={styles.signatureLine} />
        </View>
        <View style={styles.signatureItem}>
          <Text style={styles.signatureName}>{DATA.name}</Text>
          <View style={styles.signatureLine} />
        </View>
      </View>
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 6, color: '#475569', textAlign: 'center' }}>
          Je certifie sur l'honneur l'exactitude des informations ci-dessus
        </Text>
      </View>
    </View>
    </Page>
  </Document>
);

// ═════════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ═════════════════════════════════════════════════════════════════════════════
export default function CVPage() {
  const handleDownload = async () => {
    const blob = await pdf(<CVPDFDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_Abdrafith_ZONGO.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  const goBack = () => {
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cv" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between gap-3 mb-8">
          <button 
            onClick={goBack} 
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-md text-sm font-medium text-slate-700 hover:text-indigo-600 transition-all"
          >
            <ArrowLeft size={18} /> Retour
          </button>
          <button 
            onClick={handleDownload} 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Download size={18} /> Télécharger PDF
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="h-[85vh]">
            <PDFViewer width="100%" height="100%">
              <CVPDFDocument />
            </PDFViewer>
          </div>
        </div>
      </div>
    </section>
  );
}