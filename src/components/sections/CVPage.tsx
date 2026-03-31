// src/components/sections/CVPage.tsx - Version avec design amélioré
import { useRef } from 'react';
import { 
  ArrowLeft, MapPin, Mail, Phone, User, ExternalLink, Download, 
  Building2, Award, Briefcase, Code2, BarChart3, GraduationCap, 
  Languages, Heart, Github, Linkedin, Globe 
} from 'lucide-react';
import { PDFViewer, pdf, Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

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
    { date: 'Depuis oct. 2025', title: 'Master en Sciences des Données (Data Science)', org: 'Université Joseph KI-ZERBO — Ouagadougou' },
    { date: 'Oct. 2022 – Juil. 2025', title: 'Licence en Statistiques et Informatique', org: 'Université Nazi Boni — Bobo-Dioulasso' },
    { date: '2020 – 2022', title: 'Baccalauréat série D', org: 'Lycée Provincial Boromo' },
  ],

  experiences: [
    {
      date: 'Nov. 2025 – Présent',
      title: 'Développeur Informatique',
      org: 'Telia Informatique — Ouagadougou',
      bullets: [
        'Pilotage du projet GEC/SAE avec Maarch Courier et Maarch Archives',
        'Déploiement des solutions Maarch à la LONAB et à la CNSS',
        'Participation à la conception du logiciel de gestion budgétaire à la SONAGESS',
        'Contribution au développement du logiciel de gestion budgétaire pour le FONDS SPORT du Burkina',
        'Développement et maintenance de solutions Odoo ERP',
      ],
      tags: ['Maarch', 'Odoo', 'Python', 'Déploiement'],
    },
    {
      date: 'Juin 2025 – Présent',
      title: 'Chargé du suivi et évaluation',
      org: 'SBUM — Bobo-Dioulasso',
      bullets: [
        'Suivi et évaluation des activités logistiques',
        'Analyse des données de participation',
        'Reporting auprès des partenaires',
      ],
      tags: ['Reporting', 'Évaluation'],
    },
    {
      date: 'Mars – Juin 2025',
      title: 'Stage en Statistiques',
      org: 'INSD — Ouagadougou',
      bullets: [
        'Traitement et analyse de données statistiques',
        'Automatisation des rapports avec Power BI',
      ],
      tags: ['Power BI', 'Statistiques'],
    },
    {
      date: 'Juil. – Sept. 2023',
      title: 'Stage en maintenance IT',
      org: 'CBIT — Bobo-Dioulasso',
      bullets: [
        'Maintenance et diagnostic informatique',
        'Installation de systèmes',
      ],
      tags: ['Maintenance', 'Support'],
    },
  ],

  projects: [
    {
      name: 'Application de Gestion d\'École (Odoo)',
      description: 'ERP complet pour la gestion d\'établissement scolaire : inscriptions, notes, paiements',
      stack: 'Odoo, Python, PostgreSQL',
      link: null,
    },
    {
      name: 'Laiterie Nasoo',
      description: 'Site e-commerce pour la vente de produits laitiers locaux',
      stack: 'React, Prisma, Supabase, Railway',
      link: 'https://laiterienasoo.com',
    },
    {
      name: 'Parapharmacie Dalwo',
      description: 'Site vitrine avec catalogue de produits',
      stack: 'React, TypeScript, Tailwind',
      link: 'https://parapharmaciedalwo.com',
    },
  ],

  dataSkills: [
    'Maîtrise des méthodes statistiques descriptives et inférentielles',
    'Expérience en modélisation (régressions, tests d\'hypothèses)',
    'Création de tableaux de bord interactifs avec Power BI',
    'Capacité d\'analyse, rigueur et adaptabilité',
  ],

  assoc: {
    date: '2022 – Août 2025',
    title: 'Délégué aux activités sportives',
    org: 'CESI — UNB, Bobo-Dioulasso',
    bullets: [
      'Organisation d\'événements sportifs inter-facultés',
      'Coordination des équipes',
    ],
  },
};

// ═════════════════════════════════════════════════════════════════════════════
// STYLES PDF - DESIGN MODERNE ET LISIBLE
// ═════════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  // Header avec dégradé
  header: {
    backgroundColor: '#0f172a',
    padding: 25,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 25,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    color: '#60a5fa',
    marginBottom: 12,
    fontWeight: 'medium',
  },
  contactInfo: {
    fontSize: 9,
    color: '#cbd5e1',
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  // Liens sociaux
  socialLinks: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    fontSize: 9,
    color: '#60a5fa',
  },
  // Layout principal
  container: {
    flexDirection: 'row',
    gap: 25,
  },
  sidebar: {
    width: '32%',
    backgroundColor: '#f8fafc',
    padding: 18,
    borderRadius: 12,
  },
  content: {
    width: '68%',
    padding: 5,
  },
  // Sections
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 6,
  },
  profileText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#1e293b',
    marginBottom: 15,
  },
  // Langues
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 4,
  },
  langName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  langLevel: {
    fontSize: 9,
    color: '#3b82f6',
  },
  // Compétences
  skillBadge: {
    fontSize: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 6,
    marginBottom: 6,
    color: '#0f172a',
    fontWeight: 'medium',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  // Expériences
  experienceItem: {
    marginBottom: 18,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  expTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  expDate: {
    fontSize: 8,
    color: '#3b82f6',
    fontWeight: 'medium',
  },
  expOrg: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  expBullet: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3b82f6',
    marginRight: 8,
    marginTop: 4,
  },
  expBulletText: {
    fontSize: 8,
    color: '#334155',
    flex: 1,
    lineHeight: 1.4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 4,
  },
  tag: {
    fontSize: 7,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#eef2ff',
    borderRadius: 4,
    color: '#3b82f6',
    fontWeight: 'medium',
  },
  // Projets
  projectItem: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  projectDesc: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  projectStack: {
    fontSize: 7,
    color: '#3b82f6',
    fontFamily: 'Courier',
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 7,
    color: '#3b82f6',
    textDecoration: 'underline',
    marginTop: 4,
  },
  // Data skills
  dataSkillItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  dataSkillBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3b82f6',
    marginRight: 8,
    marginTop: 3,
  },
  dataSkillText: {
    fontSize: 8,
    color: '#334155',
    flex: 1,
    lineHeight: 1.4,
  },
  // Signature
  signatureContainer: {
    position: 'absolute',
    bottom: 35,
    left: 35,
    right: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
  },
  signatureItem: {
    flex: 1,
    alignItems: 'center',
  },
  signatureDate: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 20,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    width: '70%',
    paddingTop: 4,
  },
  signatureLabel: {
    fontSize: 7,
    color: '#94a3b8',
    textAlign: 'center',
  },
  signatureName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
  },
});

// ═════════════════════════════════════════════════════════════════════════════
// COMPOSANT PDF
// ═════════════════════════════════════════════════════════════════════════════
const CVPDFDocument = () => (
  <Document>
    {/* PAGE 1 */}
    <Page size="A4" style={styles.page}>
      {/* Header avec photo et infos */}
      <View style={styles.header}>
        <Image src={DATA.photo} style={styles.photo} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{DATA.name}</Text>
          <Text style={styles.title}>Développeur Full Stack & Data Analyst</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text>📧</Text>
              <Text>{DATA.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📱</Text>
              <Text>{DATA.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📍</Text>
              <Text>{DATA.location}</Text>
            </View>
          </View>
          <View style={styles.socialLinks}>
            <Link src={DATA.github} style={styles.socialLink}>
              <Text>🐙</Text>
              <Text>{DATA.githubUsername}</Text>
            </Link>
            <Link src={DATA.linkedin} style={styles.socialLink}>
              <Text>🔗</Text>
              <Text>{DATA.linkedinUsername}</Text>
            </Link>
          </View>
        </View>
      </View>

      {/* Contenu principal */}
      <View style={styles.container}>
        {/* Sidebar gauche */}
        <View style={styles.sidebar}>
          <View>
            <Text style={styles.sectionTitle}>Profil</Text>
            <Text style={styles.profileText}>
              Développeur Full Stack et Data Analyst passionné, avec une double compétence 
              en développement web et analyse de données. Je transforme les idées en 
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

        {/* Contenu droit */}
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
            <Text style={styles.sectionTitle}>Expériences Professionnelles</Text>
            {DATA.experiences.slice(0, 2).map((exp, i) => (
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

    {/* PAGE 2 */}
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
                  <Link src={project.link} style={styles.projectLink}>
                    🔗 {project.link}
                  </Link>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <View>
            <Text style={styles.sectionTitle}>Expériences (suite)</Text>
            {DATA.experiences.slice(2, 4).map((exp, i) => (
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
            <Text style={styles.sectionTitle}>Engagements Associatifs</Text>
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

      {/* Signature en bas de page */}
      <View style={styles.signatureContainer}>
        <View style={styles.signatureItem}>
          <Text style={styles.signatureDate}>Fait à Ouagadougou, le ___/___/2026</Text>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureLabel}>Signature</Text>
          </View>
        </View>
        <View style={styles.signatureItem}>
          <Text style={styles.signatureName}>{DATA.name}</Text>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureLabel}>Signature</Text>
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
        {/* Barre d'actions */}
        <div className="flex items-center justify-between gap-3 mb-8">
          <button 
            onClick={goBack} 
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-md text-sm font-medium text-slate-700 hover:text-indigo-600 hover:shadow-lg transition-all"
          >
            <ArrowLeft size={18} /> Retour au portfolio
          </button>
          <button 
            onClick={handleDownload} 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all"
          >
            <Download size={18} /> Télécharger le CV (PDF)
          </button>
        </div>

        {/* Aperçu PDF */}
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