import { useEffect, useRef, useState } from 'react'
import { Briefcase, GraduationCap, Download, Calendar } from 'lucide-react'
import { experiences } from '../../data/experiences'

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null)
  const [tab, setTab] = useState<'all' | 'work' | 'education'>('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => el.classList.add('visible'))
        }
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('#resume .reveal').forEach((el) => el.classList.add('visible'))
    }, 60)
  }, [tab])

  const filtered = tab === 'all' ? experiences : experiences.filter((e) => e.type === tab)

  return (
    <section id="resume" ref={sectionRef} className="mesh-bg">
      <div className="section-wrap">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-subtitle reveal">Mon parcours</p>
          <h2 className="section-title reveal delay-100">Expériences & Formation</h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-lavender-500 to-blue-400 mx-auto mt-4 reveal delay-200" />
        </div>

        {/* Tabs */}
        <div className="reveal flex justify-center gap-2 mb-12">
          {[
            { key: 'all',       label: 'Tout',        icon: null },
            { key: 'work',      label: 'Expériences', icon: Briefcase },
            { key: 'education', label: 'Formations',  icon: GraduationCap },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as typeof tab)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === key
                  ? 'bg-lavender-500 text-white shadow-md'
                  : 'glass text-[#4b5563] hover:text-lavender-600'
              }`}
            >
              {Icon && <Icon size={14} />}
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-lavender-300 via-lavender-200 to-transparent" />

          <div className="space-y-6 pl-16">
            {filtered.map((exp, i) => (
              <div
                key={exp.id}
                className="reveal relative"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Circle on line */}
                <div
                  className={`absolute -left-16 top-4 w-8 h-8 rounded-xl flex items-center justify-center shadow-md z-10 ${
                    exp.type === 'work'
                      ? 'bg-lavender-500 text-white'
                      : 'bg-blue-400 text-white'
                  }`}
                  style={{ left: 'calc(-4rem + 2px)' }}
                >
                  {exp.type === 'work'
                    ? <Briefcase size={14} />
                    : <GraduationCap size={14} />
                  }
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-5 hover:shadow-[0_8px_32px_rgba(139,92,246,0.14)] transition-all duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-syne font-bold text-[#1e1b4b] text-base group-hover:text-lavender-700 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-lavender-600 text-sm font-medium">{exp.org}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#9ca3af] font-mono whitespace-nowrap">
                      <Calendar size={11} />
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-[#4b5563] text-sm leading-relaxed mb-3">{exp.desc}</p>

                  {exp.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-lg font-medium"
                          style={{
                            background: exp.type === 'work'
                              ? 'rgba(139,92,246,0.1)'
                              : 'rgba(59,130,246,0.1)',
                            color: exp.type === 'work' ? '#7c3aed' : '#1d4ed8',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download CV CTA */}
        <div className="reveal mt-16 text-center">
          <div className="glass inline-flex flex-col sm:flex-row items-center gap-6 rounded-3xl px-8 py-6 max-w-lg mx-auto">
            <div className="text-left">
              <p className="font-syne font-bold text-[#1e1b4b]">Mon CV complet</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">Toutes mes expériences et compétences en détail</p>
            </div>
            <a
              href="/cv.pdf"
              download
              className="btn-primary whitespace-nowrap flex-shrink-0"
            >
              <Download size={16} />
              Télécharger CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
