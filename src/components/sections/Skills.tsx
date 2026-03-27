import { useEffect, useRef, useState } from 'react'
import { skills, skillCategories } from '../../data/skills'

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => el.classList.add('visible'))
          setAnimated(true)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = activeTab === 'all' ? skills : skills.filter((s) => s.category === activeTab)

  const getCategoryColor = (cat: string) => {
    const found = skillCategories.find((c) => c.key === cat)
    return found ? { color: found.color, bg: found.bg } : { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' }
  }

  return (
    <section id="skills" ref={sectionRef} className="mesh-bg">
      <div className="section-wrap">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-subtitle reveal">Mes compétences</p>
          <h2 className="section-title reveal delay-100">Stack technique</h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-lavender-500 to-cyan-400 mx-auto mt-4 reveal delay-200" />
        </div>

        {/* Filter tabs */}
        <div className="reveal delay-200 flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-lavender-500 text-white shadow-md'
                : 'glass text-[#4b5563] hover:text-lavender-600'
            }`}
          >
            Toutes
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === cat.key
                  ? 'text-white shadow-md'
                  : 'glass text-[#4b5563] hover:text-lavender-600'
              }`}
              style={activeTab === cat.key ? { background: cat.color } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {filtered.map((skill, i) => {
            const { color, bg } = getCategoryColor(skill.category)
            return (
              <div
                key={skill.name}
                className="reveal glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: bg }}
                    >
                      {skill.icon}
                    </span>
                    <span className="font-medium text-sm text-[#1e1b4b]">{skill.name}</span>
                  </div>
                  <span
                    className="font-syne font-bold text-sm"
                    style={{ color }}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Bar */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: `linear-gradient(90deg, ${color}cc, ${color})`,
                      width: animated ? `${skill.level}%` : '0%',
                      transitionDelay: `${i * 0.06}s`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Category legend */}
        <div className="reveal mt-12 flex flex-wrap justify-center gap-4">
          {skillCategories.map((cat) => (
            <div key={cat.key} className="flex items-center gap-2 text-sm text-[#4b5563]">
              <span className="w-3 h-3 rounded-sm" style={{ background: cat.color }} />
              {cat.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
