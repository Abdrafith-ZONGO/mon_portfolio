import { useRef, useEffect } from 'react'
import { MapPin, Briefcase, GraduationCap, Code2, BarChart2 } from 'lucide-react'

const highlights = [
  { icon: Code2,      label: 'Dev Full Stack',   desc: 'React, Node.js, TypeScript, Python' },
  { icon: BarChart2,  label: 'Data Analyst',      desc: 'SQL, Power BI, Python, ML' },
  { icon: Briefcase,  label: '3+ ans d\'exp.',    desc: 'Web & Data, projets clients' },
  { icon: GraduationCap, label: 'Diplômé',        desc: 'Informatique + Data Science' },
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
          <h2 className="section-title reveal delay-100">Qui suis-je ?</h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-lavender-500 to-blue-400 mx-auto mt-4 reveal delay-200" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo + card */}
          <div className="reveal-left flex flex-col items-center lg:items-start gap-6">
            {/* Secondary photo (smaller) */}
            <div className="relative">
              <div className="photo-ring rounded-3xl">
                <div className="w-72 h-80 rounded-[22px] overflow-hidden bg-gradient-to-br from-lavender-100 to-blue-100 flex items-center justify-center">
                  <img
                    src="/images/photo.jpg"
                    alt="Photo de profil"
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
                <MapPin size={14} className="text-lavender-500" />
                Ouagadougou, Burkina Faso
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="reveal-right space-y-5">
            <h3 className="font-syne text-2xl font-bold text-[#1e1b4b]">
              Développeur passionné &<br />
              <span className="text-lavender-600">Data Analyst rigoureux</span>
            </h3>

            <p className="text-[#4b5563] leading-relaxed">
              Je suis un développeur Full Stack et Data Analyst basé à Ouagadougou,
              avec plus de 3 ans d'expérience à construire des applications web modernes
              et à transformer des données brutes en insights actionnables.
            </p>

            <p className="text-[#4b5563] leading-relaxed">
              Mon double profil me permet de couvrir tout le cycle de vie d'un projet :
              de la conception de l'architecture technique jusqu'à l'analyse des résultats
              business. J'aime les défis complexes et livrer des solutions propres,
              performantes et bien documentées.
            </p>

            <p className="text-[#4b5563] leading-relaxed">
              Quand je ne code pas, je contribue à des projets open source, je lis des
              articles tech, ou j'explore de nouveaux datasets pour affiner mes modèles
              analytiques.
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-4 hover:scale-[1.02] transition-transform"
                >
                  <div className="w-8 h-8 rounded-xl bg-lavender-100 flex items-center justify-center mb-2">
                    <Icon size={16} className="text-lavender-600" />
                  </div>
                  <div className="font-syne font-semibold text-sm text-[#1e1b4b]">{label}</div>
                  <div className="text-xs text-[#9ca3af] mt-0.5">{desc}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Me contacter
              </button>
              <a href="/cv.pdf" download className="btn-secondary">
                Voir CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
