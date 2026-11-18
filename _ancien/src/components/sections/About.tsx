import { useRef, useEffect } from 'react'
import { MapPin, Award, GraduationCap, Code2, BarChart2, Download } from 'lucide-react'
import photoProfil from '../../assets/photoProfil.jpeg'

const highlights = [
  { icon: BarChart2,  label: 'Data Scientist & IA',  desc: 'Master Sciences des Données (UJKZ), ML/DL, Python, R, Stata' },
  { icon: Code2,      label: 'Dev Full Stack',       desc: 'React, Next.js, Spring Boot, PostgreSQL, Docker, Odoo' },
  { icon: Award,      label: 'Prix Hackathon CIF-AO',desc: '2ème place nationale 2026 (Équipe DataMasters)' },
  { icon: GraduationCap, label: 'Double Formation',  desc: 'Licence Statistiques & Info + Orange Digital Center' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => el.classList.add('visible'))
        }
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="bg-white/50">
      <div className="section-wrap">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="section-subtitle reveal">À propos de moi</p>
          <h2 className="section-title reveal delay-100">Profil & Parcours</h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-lavender-500 to-cyan-400 mx-auto mt-4 reveal delay-200" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo + card */}
          <div className="reveal-left flex flex-col items-center lg:items-start gap-6">
            <div className="relative">
              <div className="photo-ring rounded-3xl">
                <div className="w-72 h-80 rounded-[22px] overflow-hidden bg-gradient-to-br from-lavender-100 to-blue-100 flex items-center justify-center">
                  <img
                    src={photoProfil}
                    alt="Photo Abdrafith ZONGO"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const t = e.currentTarget
                      t.style.display = 'none'
                      t.parentElement!.innerHTML = `
                        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:100%;height:100%;background:linear-gradient(135deg,#e0d7f7,#c7d8f5)">
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="rgba(139,92,246,0.35)">
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                          </svg>
                          <span style="font-size:11px;color:rgba(139,92,246,0.5);font-family:monospace">photo.jpg</span>
                        </div>
                      `
                    }}
                  />
                </div>
              </div>

              {/* Location badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-[#1e1b4b] shadow-md whitespace-nowrap">
                <MapPin size={14} className="text-cyan-600" />
                Ouagadougou, Burkina Faso
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="reveal-right space-y-5">
            <h3 className="font-syne text-2xl font-bold text-[#1e1b4b]">
              Data Scientist rigoureux &<br />
              <span className="text-lavender-600">Développeur Full Stack passionné</span>
            </h3>

            <p className="text-[#4b5563] leading-relaxed">
              Titulaire d'une <strong>Licence en Statistiques et Informatique</strong> et actuellement en <strong>Master Sciences des Données</strong> à l'Université Joseph KI-ZERBO, je combine une solide rigueur mathématique et analytique à une expertise éprouvée en ingénierie logicielle.
            </p>

            <p className="text-[#4b5563] leading-relaxed">
              Mon parcours m'a permis d'intervenir sur des projets stratégiques d'envergure : du traitement et de l'analyse prédictive de données massives (Python, R, Stata, Power BI), jusqu'à la conception et la mise en production de solutions numériques institutionnelles (plateforme de la <strong>Bourse de l'UEMOA</strong>, solutions SaaS, GED et architectures PostgreSQL).
            </p>

            <p className="text-[#4b5563] leading-relaxed">
              Je perfectionne continuellement mes compétences via la formation Développeur Full Stack d'<strong>Orange Digital Center</strong>. Rigoureux, curieux et doté d'un excellent esprit d'équipe, je transforme les données brutes en leviers décisionnels et les idées complexes en produits digitaux durables.
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-4 hover:scale-[1.02] transition-transform"
                >
                  <div className="w-8 h-8 rounded-xl bg-lavender-100 flex items-center justify-center mb-2">
                    <Icon size={16} className="text-lavender-600" />
                  </div>
                  <div className="font-syne font-semibold text-sm text-[#1e1b4b]">{label}</div>
                  <div className="text-xs text-[#6b7280] mt-1 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 pt-3">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Me contacter
              </button>
              <a
                href="/cv.pdf"
                download="CV_Abdrafith_ZONGO.pdf"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Download size={16} /> Télécharger mon CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
