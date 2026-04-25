// src/components/sections/CVPage.tsx
import { useRef } from 'react';
import { 
  ArrowLeft, MapPin, Mail, Phone, User, ExternalLink, Download, 
  Building2, Award, Briefcase, Code2, BarChart3, GraduationCap, 
  Languages, Heart, Github, Linkedin, Globe 
} from 'lucide-react';
import { PDFViewer, pdf, Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { useLang } from '../../i18n/LangContext';

// ═════════════════════════════════════════════════════════════════════════════
// DONNÉES COMMUNES (non traduites - identiques en FR et EN)
// ═════════════════════════════════════════════════════════════════════════════
const COMMON = {
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
};

// ═════════════════════════════════════════════════════════════════════════════
// STYLES PDF - OPTIMISÉ POUR 2 PAGES (inchangés)
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
const CVPDFDocument = ({ data, common }: { data: any, common: typeof COMMON }) => (
  <Document>
    {/* PAGE 1 - Formations + 3 premières expériences */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={common.photo} style={styles.photo} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{common.name}</Text>
          <Text style={styles.title}>{data.jobTitle}</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactText}>{common.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Tel:</Text>
              <Text style={styles.contactText}>{common.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Adresse:</Text>
              <Text style={styles.contactText}>{common.location}</Text>
            </View>
          </View>
          <View style={styles.socialLinks}>
            <View style={styles.socialItem}>
              <Text style={styles.socialLabel}>GitHub:</Text>
              <Text style={styles.socialText}>{common.githubUsername}</Text>
            </View>
            <View style={styles.socialItem}>
              <Text style={styles.socialLabel}>LinkedIn:</Text>
              <Text style={styles.socialText}>{common.linkedinUsername}</Text>
            </View>
            <View style={styles.socialItem}>
              <Text style={styles.socialLabel}>Portfolio:</Text>
              <Text style={styles.socialText}>{common.portfolioName}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.sidebar}>
          <View>
            <Text style={styles.sectionTitle}>{data.sectionTitles.profil}</Text>
            <Text style={styles.profileText}>{data.profileText}</Text>
          </View>

          <View>
            <Text style={styles.sectionTitle}>{data.sectionTitles.langues}</Text>
            {data.langs.map((lang: any, i: number) => (
              <View key={i} style={styles.langItem}>
                <Text style={styles.langName}>{lang.name}</Text>
                <Text style={styles.langLevel}>{lang.level}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionTitle}>{data.sectionTitles.competences}</Text>
            <View style={styles.skillContainer}>
              {data.chips.map((skill: string, i: number) => (
                <Text key={i} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>{data.sectionTitles.dataAnalytics}</Text>
            {data.dataSkills.map((skill: string, i: number) => (
              <View key={i} style={styles.dataSkillItem}>
                <View style={styles.dataSkillBullet} />
                <Text style={styles.dataSkillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <View>
            <Text style={styles.sectionTitle}>{data.sectionTitles.formations}</Text>
            {data.formations.map((formation: any, i: number) => (
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
            <Text style={styles.sectionTitle}>{data.sectionTitles.experiences}</Text>
            {data.experiences.slice(0, 3).map((exp: any, i: number) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expTitle}>{exp.title}</Text>
                  <Text style={styles.expDate}>{exp.date}</Text>
                </View>
                <Text style={styles.expOrg}>{exp.org}</Text>
                {exp.bullets.map((bullet: string, j: number) => (
                  <View key={j} style={styles.expBullet}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.expBulletText}>{bullet}</Text>
                  </View>
                ))}
                <View style={styles.tagContainer}>
                  {exp.tags.map((tag: string, j: number) => (
                    <Text key={j} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>

    {/* PAGE 2 - Dernière expérience + Projets + Signature */}
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <View>
            <Text style={styles.sectionTitle}>{data.sectionTitles.projets}</Text>
            {data.projects.map((project: any, i: number) => (
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
            <Text style={styles.sectionTitle}>{data.sectionTitles.experiencesSuite}</Text>
            {data.experiences.slice(3, 4).map((exp: any, i: number) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expTitle}>{exp.title}</Text>
                  <Text style={styles.expDate}>{exp.date}</Text>
                </View>
                <Text style={styles.expOrg}>{exp.org}</Text>
                {exp.bullets.map((bullet: string, j: number) => (
                  <View key={j} style={styles.expBullet}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.expBulletText}>{bullet}</Text>
                  </View>
                ))}
                <View style={styles.tagContainer}>
                  {exp.tags.map((tag: string, j: number) => (
                    <Text key={j} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
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
            <Text style={styles.signatureName}>{common.name}</Text>
            <View style={styles.signatureLine} />
          </View>
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 6, color: '#475569', textAlign: 'center' }}>
            {data.signatureCert}
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
  const { tr } = useLang();
  const data = tr.cvData;

  const handleDownload = async () => {
    const blob = await pdf(<CVPDFDocument data={data} common={COMMON} />).toBlob();
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
              <CVPDFDocument data={data} common={COMMON} />
            </PDFViewer>
          </div>
        </div>
      </div>
    </section>
  );
}