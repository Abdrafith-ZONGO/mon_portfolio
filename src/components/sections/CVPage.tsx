// ─────────────────────────────────────────────────────────────────────────────
// src/components/sections/CVPage.tsx
//
// Page CV complète :
//   • Reproduit le CV d'Abdrafith ZONGO dans un layout HTML/CSS soigné
//   • Bouton "Télécharger PDF" en haut (et en bas) — déclenche window.print()
//     avec @media print qui masque tout sauf la zone CV
//   • Bouton "← Retour" pour revenir au portfolio (scroll vers #hero)
//   • Bloc signature en bas : date à remplir + signature manuscrite
//   • Bilingue FR/EN via useLang()
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { ArrowLeft, Printer, Download, MapPin, Mail, Phone, User } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'

// ── Données CV (fixes, bilingues dans le composant) ───────────────────────────
const DATA = {
  name:  'Abdrafith ZONGO',
  email: 'zongo1abdrafith@gmail.com',
  phone: '+226 07 71 32 17',
  age:   { fr: '21 ans', en: '21 years old' },
  nationality: { fr: 'Burkinabé', en: 'Burkinabe' },
  location: 'Ouagadougou, Burkina Faso',

  langs: [
    { name: 'Français / French', dots: 5 },
    { name: 'Morée',             dots: 4 },
    { name: 'Dioula',            dots: 4 },
    { name: 'Anglais / English', dots: 2 },
  ],

  chips: [
    'Python','Java','SQL','R','Flutter','HTML/CSS',
    'Power BI','Jupyter','Odoo','Git','VS Code','Excel',
    'Machine Learning','Statistiques',
  ],

  hobbies: [
    { fr: 'Découverte', en: 'Discovery' },
    { fr: 'Lecture',    en: 'Reading'   },
    { fr: 'Sport',      en: 'Sport'     },
  ],

  formations: [
    {
      date: { fr: 'Depuis oct. 2025', en: 'Since Oct. 2025' },
      title: { fr: 'Master en Sciences des Données (Data Science)', en: 'Master of Data Science' },
      org:  'Université Joseph KI-ZERBO — Ouagadougou',
    },
    {
      date: { fr: 'Oct. 2022 – Juil. 2025', en: 'Oct. 2022 – Jul. 2025' },
      title: { fr: 'Licence professionnelle en Statistiques et Informatique', en: 'Bachelor in Statistics & Computer Science' },
      org:  'Université Nazi Boni — Bobo-Dioulasso',
    },
    {
      date: { fr: '2020 – 2022', en: '2020 – 2022' },
      title: { fr: 'Baccalauréat série D', en: 'High School Diploma (Science)' },
      org:  'Lycée Provincial Boromo',
    },
    {
      date: { fr: '2016 – 2019', en: '2016 – 2019' },
      title: { fr: "Brevet d'Étude du Premier Cycle (BEPC)", en: 'Middle School Certificate (BEPC)' },
      org:  'Lycée Privé Évangélique Boromo',
    },
    {
      date: { fr: '2009 – 2015', en: '2009 – 2015' },
      title: { fr: "Certificat d'Étude Primaire (CEP)", en: 'Primary School Certificate (CEP)' },
      org:  'École A Boromo',
    },
  ],

  experiences: [
    {
      date:  { fr: 'Depuis nov. 2025', en: 'Since Nov. 2025' },
      title: { fr: 'Développeur Informatique', en: 'Software Developer' },
      org:   'Telia Informatique — Ouagadougou',
      bullets: null,
      tags: ['Python','Web','Data'],
    },
    {
      date:  { fr: 'Depuis juin 2025', en: 'Since Jun. 2025' },
      title: { fr: "Chargé du suivi et de l'évaluation — comité logistique", en: 'Monitoring & Evaluation Officer — logistics committee' },
      org:   'Semaine du Bon Usage des Médicaments (SBUM) — Bobo-Dioulasso',
      bullets: null,
      tags: ['Reporting','Évaluation / Evaluation'],
    },
    {
      date:  { fr: 'Mars – Juin 2025', en: 'Mar. – Jun. 2025' },
      title: { fr: "Stage — Licence en Statistiques et Informatique", en: 'Internship — Bachelor Statistics & IT' },
      org:   'INSD — Ouagadougou',
      bullets: null,
      tags: ['Statistiques / Statistics','Données / Data'],
    },
    {
      date:  { fr: 'Juil. – Sept. 2023', en: 'Jul. – Sep. 2023' },
      title: { fr: 'Stage en maintenance informatique', en: 'IT Maintenance Internship' },
      org:   'Comptoire Burkinabé de l\'Informatique et de la Technologie (CBIT) — Bobo-Dioulasso',
      bullets: {
        fr: [
          'Maintenance, diagnostic et réparation de matériels informatiques',
          'Installation de systèmes et logiciels informatiques',
        ],
        en: [
          'Maintenance, diagnosis and repair of computer equipment',
          'Installation of operating systems and software',
        ],
      },
      tags: null,
    },
  ],

  dataSkills: {
    fr: [
      'Maîtrise des méthodes statistiques descriptives et inférentielles',
      "Expérience en modélisation (régressions, tests d'hypothèses, distributions)",
      'Application des outils probabilistes à la prise de décision',
      'Création de tableaux de bord interactifs avec Power BI',
      "Capacité d'analyse et de résolution de problèmes, rigueur, organisation, adaptabilité et aptitude au travail en équipe",
    ],
    en: [
      'Proficiency in descriptive and inferential statistical methods',
      'Experience in modelling (regressions, hypothesis tests, distributions)',
      'Application of probabilistic tools to decision-making',
      'Creation of interactive dashboards with Power BI',
      'Analytical and problem-solving ability, rigour, organisation, adaptability and teamwork',
    ],
  },

  assoc: {
    date:  { fr: '2022 – Août 2025', en: '2022 – Aug. 2025' },
    title: { fr: 'Délégué aux activités sportives', en: 'Sports Activities Delegate' },
    org:   'Club des Étudiants en Statistiques et Informatique (CESI) — UNB, Bobo-Dioulasso',
  },
}

// ── Sous-composants ─────────────────────────────────────────────────────────

/** Barre de dots pour les langues */
function LangDots({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            i < count ? 'bg-lavender-500' : 'bg-lavender-200'
          }`}
        />
      ))}
    </div>
  )
}

/** Titre de section dans la colonne principale */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 mt-5 first:mt-0">
      <h3 className="font-syne font-bold text-[10px] tracking-[2px] uppercase text-lavender-600 mb-1">
        {children}
      </h3>
      <div className="h-px bg-lavender-200" />
    </div>
  )
}

/** Titre de section dans la sidebar */
function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 mt-5 first:mt-0">
      <h3 className="font-syne font-bold text-[9px] tracking-[2px] uppercase text-lavender-600 mb-1">
        {children}
      </h3>
      <div className="h-px bg-lavender-300 opacity-50" />
    </div>
  )
}

/** Ligne d'expérience */
function EntryRow({
  date, title, org, bullets, tags,
}: {
  date: string; title: string; org: string
  bullets?: string[] | null; tags?: string[] | null
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-2 mb-3">
      <p className="text-[10px] italic text-[#6b7280] leading-relaxed text-right pt-0.5">{date}</p>
      <div>
        <p className="font-semibold text-[11px] text-[#1e1b4b] leading-tight">{title}</p>
        <p className="text-[10.5px] text-lavender-600 mb-1">{org}</p>
        {bullets && (
          <ul className="space-y-0.5">
            {bullets.map((b, i) => (
              <li key={i} className="text-[10.5px] text-[#374151] leading-snug pl-3 relative before:content-['▸'] before:absolute before:left-0 before:text-lavender-500 before:text-[9px]">
                {b}
              </li>
            ))}
          </ul>
        )}
        {tags && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-2 py-0.5 rounded-md font-medium"
                style={{ background: 'rgba(124,58,237,.1)', color: '#7c3aed' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function CVPage() {
  const { lang, tr } = useLang()
  const cv = tr.cv
  const cvRef = useRef<HTMLDivElement>(null)

  // Déclenche l'impression (= export PDF via le navigateur)
  const handleDownload = () => window.print()

  const goBack = () => {
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  const l = lang  // raccourci

  return (
    <>
      {/* ── STYLES D'IMPRESSION ────────────────────────────────────────────── */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #cv-printable, #cv-printable * { visibility: visible !important; }
          #cv-printable {
            position: fixed !important;
            inset: 0 !important;
            z-index: 9999 !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
          }
          @page { margin: 0; size: A4 portrait; }
        }
      `}</style>

      {/* ── WRAPPER PAGE ───────────────────────────────────────────────────── */}
      <section id="cv" className="min-h-screen mesh-bg pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">

          {/* ── BARRE D'ACTIONS ──────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            {/* Retour */}
            <button
              onClick={goBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-[#4b5563] hover:text-lavender-600 transition-all"
            >
              <ArrowLeft size={15} /> {cv.backBtn}
            </button>

            {/* Actions droite */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-lavender-600"
                style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.25)' }}
              >
                <Printer size={15} /> {cv.printBtn}
              </button>
              <button
                onClick={handleDownload}
                className="btn-primary"
              >
                <Download size={15} /> {cv.downloadBtn}
              </button>
            </div>
          </div>

          {/* ── BANDEAU INFO ─────────────────────────────────────────────── */}
          <div
            className="glass rounded-2xl p-4 mb-6 flex items-center gap-4"
            style={{ borderColor: 'rgba(124,58,237,.2)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center flex-shrink-0 text-xl">
              📄
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-syne font-semibold text-sm text-[#1e1b4b]">{cv.bannerTitle}</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">{cv.bannerDesc}</p>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* CV IMPRIMABLE                                                   */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div
            id="cv-printable"
            ref={cvRef}
            className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(124,58,237,.12)] overflow-hidden border border-[rgba(124,58,237,.1)]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {/* Barre accent top */}
            <div style={{ height: 6, background: 'linear-gradient(90deg,#7c3aed,#3b82f6,#06b6d4)' }} />

            {/* Layout 2 colonnes */}
            <div className="flex min-h-[900px]">

              {/* ── SIDEBAR ─────────────────────────────────────────────── */}
              <aside
                className="w-48 flex-shrink-0 p-5"
                style={{ background: '#ede9fe', borderRight: '1px solid rgba(139,92,246,.15)' }}
              >
                {/* Photo */}
                <div
                  className="mx-auto mb-5"
                  style={{
                    width: 100, height: 100,
                    background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                    padding: 2, borderRadius: 18,
                    boxShadow: '0 6px 20px rgba(124,58,237,.3)',
                  }}
                >
                  <div
                    style={{
                      width: '100%', height: '100%', borderRadius: 16,
                      background: 'linear-gradient(145deg,#ddd6fe,#bfdbfe)',
                      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <img
                      src="/images/photo.jpg"
                      alt={DATA.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.innerHTML =
                          '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%"><svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(124,58,237,.4)"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>'
                      }}
                    />
                  </div>
                </div>

                {/* Contact */}
                <SidebarTitle>{cv.contact}</SidebarTitle>
                {[
                  { Icon: Mail,  val: DATA.email,                 wrap: true  },
                  { Icon: Phone, val: DATA.phone,                 wrap: false },
                  { Icon: User,  val: DATA.nationality[l],        wrap: false },
                  { Icon: User,  val: DATA.age[l],                wrap: false },
                  { Icon: MapPin,val: 'Ouagadougou, BF',          wrap: false },
                ].map(({ Icon, val, wrap }, i) => (
                  <div key={i} className="flex items-start gap-1.5 mb-2">
                    <Icon size={11} className="text-lavender-500 mt-0.5 flex-shrink-0" />
                    <span
                      className="text-[10px] text-[#1e1b4b] leading-snug"
                      style={wrap ? { wordBreak: 'break-all' } : {}}
                    >
                      {val}
                    </span>
                  </div>
                ))}

                {/* Langues */}
                <SidebarTitle>{cv.sectionLangs}</SidebarTitle>
                {DATA.langs.map((lng) => (
                  <div key={lng.name} className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#1e1b4b]">{lng.name}</span>
                    <LangDots count={lng.dots} />
                  </div>
                ))}

                {/* Compétences */}
                <SidebarTitle>{cv.sectionSkills}</SidebarTitle>
                <div className="flex flex-wrap gap-1">
                  {DATA.chips.map((c) => (
                    <span
                      key={c}
                      className="text-[9px] px-1.5 py-0.5 rounded-md font-medium"
                      style={{ background: 'rgba(124,58,237,.12)', color: '#7c3aed', border: '1px solid rgba(124,58,237,.2)' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Intérêts */}
                <SidebarTitle>{cv.sectionHobbies}</SidebarTitle>
                {DATA.hobbies.map((h) => (
                  <div key={h.fr} className="text-[10px] text-[#1e1b4b] mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lavender-500 flex-shrink-0" />
                    {h[l]}
                  </div>
                ))}
              </aside>

              {/* ── CONTENU PRINCIPAL ───────────────────────────────────── */}
              <main className="flex-1 p-7">

                {/* En-tête nom */}
                <h1
                  className="font-syne font-extrabold text-[#1e1b4b] leading-tight mb-1"
                  style={{ fontSize: 26, letterSpacing: -0.5 }}
                >
                  {DATA.name}
                </h1>
                <p className="text-[11px] font-semibold italic text-lavender-600 mb-1">{cv.jobTitle}</p>
                <p className="text-[10px] text-[#6b7280] mb-2">{cv.eduLine}</p>
                <p className="text-[10.5px] text-[#374151] leading-relaxed mb-1 max-w-lg">{cv.tagline1}</p>
                <p className="text-[10.5px] italic text-[#6b7280] leading-relaxed max-w-lg">{cv.tagline2}</p>

                {/* Séparateur */}
                <div style={{ height: 2, background: 'linear-gradient(90deg,#7c3aed,#3b82f6)', borderRadius: 2, margin: '14px 0 16px' }} />

                {/* FORMATIONS */}
                <SectionTitle>{cv.sectionEdu}</SectionTitle>
                {DATA.formations.map((f, i) => (
                  <EntryRow key={i} date={f.date[l]} title={f.title[l]} org={f.org} />
                ))}

                {/* EXPÉRIENCES */}
                <SectionTitle>{cv.sectionExp}</SectionTitle>
                {DATA.experiences.map((e, i) => (
                  <EntryRow
                    key={i}
                    date={e.date[l]}
                    title={e.title[l]}
                    org={e.org}
                    bullets={e.bullets ? e.bullets[l] : null}
                    tags={e.tags}
                  />
                ))}

                {/* DATA & ANALYSE */}
                <SectionTitle>{cv.sectionData}</SectionTitle>
                <ul className="space-y-1 mb-2">
                  {DATA.dataSkills[l].map((s, i) => (
                    <li
                      key={i}
                      className="text-[10.5px] text-[#1e1b4b] leading-snug pl-3.5 relative"
                      style={{ paddingLeft: 14 }}
                    >
                      <span
                        style={{ position: 'absolute', left: 0, color: '#7c3aed', fontSize: 9 }}
                      >▸</span>
                      {s}
                    </li>
                  ))}
                </ul>

                {/* ASSOCIATIF */}
                <SectionTitle>{cv.sectionAssoc}</SectionTitle>
                <EntryRow
                  date={DATA.assoc.date[l]}
                  title={DATA.assoc.title[l]}
                  org={DATA.assoc.org}
                />

                {/* ── BLOC SIGNATURE ───────────────────────────────────── */}
                <div
                  className="mt-8 pt-5 grid grid-cols-2 gap-6"
                  style={{ borderTop: '1px solid #d1d5db' }}
                >
                  {/* Date */}
                  <div className="text-center">
                    <p className="text-[11px] font-semibold text-[#1e1b4b] mb-10">{cv.dateLabel}</p>
                    <div style={{ borderTop: '1px solid #d1d5db', paddingTop: 6 }}>
                      <p className="text-[10px] text-[#9ca3af]">
                        {l === 'fr' ? 'Date' : 'Date'}
                      </p>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="text-center">
                    <p className="text-[11px] font-semibold text-[#1e1b4b] mb-10">{cv.signLabel}</p>
                    <div style={{ borderTop: '1px solid #d1d5db', paddingTop: 6 }}>
                      <p className="font-syne font-bold text-[12px] text-[#1e1b4b]">{cv.signName}</p>
                      <p className="text-[10px] text-[#9ca3af] mt-0.5">{cv.signSub}</p>
                    </div>
                  </div>
                </div>

              </main>
            </div>
          </div>
          {/* fin cv-printable */}

          {/* Bouton bas */}
          <div className="text-center mt-8">
            <button
              onClick={handleDownload}
              className="btn-primary text-base px-8 py-3.5"
            >
              <Download size={18} /> {cv.downloadBtn}
            </button>
            <p className="text-xs text-[#9ca3af] mt-3">{cv.downloadNote}</p>
          </div>

        </div>
      </section>
    </>
  )
}