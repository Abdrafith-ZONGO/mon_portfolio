// src/components/sections/CVPage.tsx - Version finale optimisée
import { useRef } from 'react';
import { 
  ArrowLeft, MapPin, Mail, Phone, User, ExternalLink, Download, 
  Building2, Award, Briefcase, Code2, BarChart3, GraduationCap, 
  Languages, Heart, Github, Linkedin, Globe 
} from 'lucide-react';
import { PDFViewer, pdf, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// ═════════════════════════════════════════════════════════════════════════════
// DONNÉES CV
// ═════════════════════════════════════════════════════════════════════════════
const DATA = {
  name: 'Abdrafith ZONGO',
  email: 'zongo1abdrafith@gmail.com',
  phone: '+226 07 71 32 17',
  location: 'Ouagadougou, Burkina Faso',
  github: 'https://github.com/Abdrafith-ZONGO',
  githubUsername: 'Abdrafith-ZONGO',
  linkedin: 'https://www.linkedin.com/in/abdrafith-zongo-31a6b9265',
  linkedinUsername: 'abdrafith-zongo-31a6b9265',
  photo: '/src/assets/photoProfil.jpeg',

  langs: [
    { name: 'Français', level: 'C2 (Courant)' },
    { name: 'Morée', level: 'B2 (Intermédiaire)' },
    { name: 'Dioula', level: 'B2 (Intermédiaire)' },
    { name: 'Anglais', level: 'B1 (Intermédiaire)' },
  ],

  chips: [
    'Python', 'Java', 'SQL', 'R', 'React', 'TypeScript', 'Flutter',
    'Power BI', 'Odoo', 'Git', 'Machine Learning', 'Maarch',
    'Prisma', 'Supabase', 'Tailwind CSS',
  ],

  formations: [
    { date: 'Depuis oct. 2025', title: 'Master en Sciences des Données', org: 'Univ. Joseph KI-ZERBO' },
    { date: 'Oct. 2022 – Juil. 2025', title: 'Licence Statistiques & Info', org: 'Univ. Nazi Boni' },
    { date: '2020 – 2022', title: 'Baccalauréat série D', org: 'Lycée Provincial Boromo' },
  ],

  experiences: [
    {
      date: 'Nov. 2025 – Présent',
      title: 'Développeur Informatique',
      org: 'Telia Informatique',
      bullets: [
        'Pilotage du projet GEC/SAE avec Maarch Courier et Archives',
        'Déploiement Maarch à la LONAB et CNSS',
        'Conception logiciel gestion budgétaire (SONAGESS & FONDS SPORT)',
        'Développement et maintenance Odoo ERP',
      ],
      tags: ['Maarch', 'Odoo', 'Python'],
    },
    {
      date: 'Juin 2025 – Présent',
      title: 'Chargé suivi & évaluation',
      org: 'SBUM — Bobo-Dioulasso',
      bullets: [
        'Suivi et évaluation des activités logistiques',
        'Analyse des données de participation',
        'Reporting stratégique',
      ],
      tags: ['Reporting', 'Analyse'],
    },
    {
      date: 'Mars – Juin 2025',
      title: 'Stage en Statistiques',
      org: 'INSD — Ouagadougou',
      bullets: [
        'Traitement de données massives',
        'Automatisation des rapports Power BI',
      ],
      tags: ['Power BI', 'Statistiques'],
    },
    {
      date: 'Juil. – Sept. 2023',
      title: 'Stage maintenance IT',
      org: 'CBIT — Bobo-Dioulasso',
      bullets: [
        'Diagnostic matériel et logiciel',
        'Installation systèmes',
      ],
      tags: ['Hardware', 'OS'],
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
  ],

  dataSkills: [
    'Statistiques descriptives et inférentielles',
    'Modélisation (régressions, tests)',
    'Tableaux de bord Power BI',
    'Rigueur analytique et adaptabilité',
  ],

  assoc: {
    date: '2022 – Août 2025',
    title: 'Délégué activités sportives',
    org: 'CESI — UNB',
    bullets: [
      'Organisation d\'événements sportifs inter-facultés',
      'Coordination des équipes',
    ],
  },
};

// ═════════════════════════════════════════════════════════════════════════════
// STYLES PDF - TAILLES LÉGÈREMENT AUGMENTÉES, COULEURS CLAIRES SUR FOND SOMBRE
// ═════════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  header: {
    backgroundColor: '#0f172a',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  photo: {
    width: 75,
    height: 75,
    borderRadius: 38,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: '#93c5fd',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 8,
    color: '#e2e8f0',
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactLabel: {
    fontSize: 8,
    color: '#93c5fd',
    fontWeight: 'bold',
  },
  contactText: {
    fontSize: 8,
    color: '#e2e8f0',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 6,
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  socialLabel: {
    fontSize: 8,
    color: '#93c5fd',
    fontWeight: 'bold',
  },
  socialText: {
    fontSize: 8,
    color: '#cbd5e1',
  },
  container: {
    flexDirection: 'row',
    gap: 20,
  },
  sidebar: {
    width: '33%',
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 10,
  },
  content: {
    width: '67%',
    padding: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1.5,
    borderBottomColor: '#2563eb',
    paddingBottom: 4,
  },
  profileText: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#0f172a',
    marginBottom: 12,
  },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  langName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  langLevel: {
    fontSize: 9,
    color: '#2563eb',
  },
  skillBadge: {
    fontSize: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 3,
    paddingHorizontal: 6,
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
    marginBottom: 12,
  },
  experienceItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  expDate: {
    fontSize: 8,
    color: '#2563eb',
  },
  expOrg: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 4,
    fontStyle: 'italic',
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
    marginRight: 6,
    marginTop: 3,
  },
  expBulletText: {
    fontSize: 8,
    color: '#1e293b',
    flex: 1,
    lineHeight: 1.3,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: 3,
  },
  tag: {
    fontSize: 7,
    paddingVertical: 1,
    paddingHorizontal: 5,
    backgroundColor: '#dbeafe',
    borderRadius: 3,
    color: '#1e40af',
  },
  projectItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e8f0',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 8,
    color: '#334155',
    marginBottom: 2,
    lineHeight: 1.3,
  },
  projectStack: {
    fontSize: 7,
    color: '#2563eb',
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 7,
    color: '#475569',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dataSkillItem: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  dataSkillBullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2563eb',
    marginRight: 6,
    marginTop: 2,
  },
  dataSkillText: {
    fontSize: 8,
    color: '#1e293b',
    flex: 1,
    lineHeight: 1.3,
  },
  signatureWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  signatureItem: {
    flex: 1,
    alignItems: 'center',
  },
  signatureDate: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 15,
  },
  signatureLine: {
    borderTopWidth: 0.5,
    borderTopColor: '#cbd5e1',
    width: '70%',
    paddingTop: 3,
  },
  signatureName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 15,
  },
  contentWithPadding: {
    flex: 1,
    paddingBottom: 70,
  },
});

// ═════════════════════════════════════════════════════════════════════════════
// COMPOSANT PDF
// ═════════════════════════════════════════════════════════════════════════════
const CVPDFDocument = () => (
  <Document>
    {/* PAGE 1 */}
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
          </View>
        </View>
      </View>

      <View style={styles.contentWithPadding}>
        <View style={styles.container}>
          <View style={styles.sidebar}>
            <View>
              <Text style={styles.sectionTitle}>Profil</Text>
              <Text style={styles.profileText}>
                Développeur Full Stack et Data Analyst avec une double compétence en 
                développement web et analyse de données. Je transforme les idées en 
                applications performantes et les données en décisions stratégiques.
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
                </View>
              ))}
            </View>

            <View>
              <Text style={styles.sectionTitle}>Expériences</Text>
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
      </View>
    </Page>

    {/* PAGE 2 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.contentWithPadding}>
        <View style={styles.container}>
          <View style={styles.sidebar}>
            <View>
              <Text style={styles.sectionTitle}>Projets</Text>
              {DATA.projects.map((project, i) => (
                <View key={i} style={styles.projectItem}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDesc}>{project.description}</Text>
                  <Text style={styles.projectStack}>{project.stack}</Text>
                  {project.link && (
                    <View style={styles.projectLink}>
                      <Text>Site web:</Text>
                      <Text>{project.link}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.content}>
            <View>
              <Text style={styles.sectionTitle}>Expériences (suite)</Text>
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

            <View>
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
            </View>
          </View>
        </View>
      </View>

      {/* Signature sans texte "Signature" */}
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