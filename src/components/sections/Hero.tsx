import { useEffect, useRef } from 'react'
import { Github, Linkedin, Download, ArrowDown, ChevronRight } from 'lucide-react'
import { stats } from '../../data/experiences'

const socials = [
  { icon: Github,   href: 'https://github.com/Abdrafith-ZONGO',     label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdrafith-zongo-31a6b9265', label: 'LinkedIn' },
]

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  // Stagger entrance animation
  useEffect(() => {
    const els = document.querySelectorAll('.hero-anim')
    els.forEach((el, i) => {
      ;(el as HTMLElement).style.animationDelay = `${i * 0.13}s`
      el.classList.add('animate-fade-up')
    })
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen mesh-bg flex items-center overflow-hidden"
    >
      {/* Background blobs */}
      <div
        className="blob pointer-events-none absolute top-[-120px] right-[-100px] w-[520px] h-[520px] opacity-25"
        style={{ background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)' }}
      />
      <div
        className="blob2 pointer-events-none absolute bottom-[-80px] left-[-80px] w-[360px] h-[360px] opacity-20"
        style={{ background: 'radial-gradient(circle, #93c5fd 0%, transparent 70%)' }}
      />

      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.18) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="section-wrap w-full z-10 pt-28 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── LEFT TEXT ── */}
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
            {/* Available badge */}
            <div className="hero-anim opacity-0 inline-flex items-center gap-2 badge mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
              Ouvert aux collaborations
            </div>

            {/* Name */}
            <h1 className="hero-anim opacity-0 font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[#1e1b4b] leading-[1.0] tracking-tight mb-4">
              Abdrafith <br />
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 60%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ZONGO
              </span>
            </h1>

            {/* Role pills */}
            <div className="hero-anim opacity-0 flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
              <span className="badge text-sm">⚡ Dev Full Stack</span>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(6,182,212,0.1)',
                  border: '1px solid rgba(6,182,212,0.25)',
                  color: '#0891b2',
                }}
              >
                📊 Data Analyst
              </span>
            </div>

                  {/* Tagline - Deux volets */}
                  <p className="hero-anim opacity-0 text-[#4b5563] text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lavender-100 text-lavender-600 mr-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" fill="none"/>
                        <path d="M8 21H16" stroke="currentColor" strokeLinecap="round"/>
                        <path d="M12 17V21" stroke="currentColor" strokeLinecap="round"/>
                        <path d="M12 7V3" stroke="currentColor" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <strong className="text-[#1e1b4b] font-semibold">Développeur Full Stack</strong> — je conçois des sites web, des applications web, des applications mobiles et j'intègre des solutions IA. Je transforme vos idées en produits digitaux.
                  </p>
                  <p className="hero-anim opacity-0 text-[#4b5563] text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lavender-100 text-lavender-600 mr-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3V21H21V3H3Z" stroke="currentColor" fill="none"/>
                        <path d="M7 7H17" stroke="currentColor" strokeLinecap="round"/>
                        <path d="M7 12H14" stroke="currentColor" strokeLinecap="round"/>
                        <path d="M7 17H11" stroke="currentColor" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <strong className="text-[#1e1b4b] font-semibold">Data Analyst</strong> — j'analyse, modélise et visualise vos données pour en faire un levier stratégique et éclairer vos décisions.
                  </p>
                  <p className="hero-anim opacity-0 text-sm text-[#9ca3af] flex items-center gap-3 justify-center lg:justify-start">
                    <span>📍 Basé à Ouagadougou</span>
                    <span className="w-1 h-1 rounded-full bg-lavender-300"></span>
                    <span>🌍 Disponible en remote</span>
                  </p>

            {/* CTA buttons */}
            <div className="hero-anim opacity-0 flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Voir mes projets <ChevronRight size={16} />
              </button>
          <button
            onClick={() => document.querySelector('#cv')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            <Download size={16} /> Voir mon CV
          </button>
            </div>

            {/* Social links */}
            <div className="hero-anim opacity-0 flex items-center justify-center lg:justify-start gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-lavender-500 hover:text-white hover:bg-lavender-500 transition-all duration-200 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT PHOTO ── */}
          <div className="flex-shrink-0 order-1 lg:order-2 flex flex-col items-center gap-6">
            {/* Photo container */}
            <div className="hero-anim opacity-0 relative">
              {/* Floating ring decoration */}
              <div className="absolute -inset-4 rounded-[40px] border-2 border-dashed border-lavender-200 opacity-60 animate-[spin_25s_linear_infinite]" />

              {/* Glow ring */}
              <div className="photo-ring rounded-[28px]">
                <div
                  className="w-64 h-64 lg:w-72 lg:h-72 rounded-[26px] overflow-hidden bg-gradient-to-br from-lavender-100 to-blue-100 flex items-center justify-center"
                >
                  {/* Replace src with your actual photo path */}
                  <img
                    src="/src/assets/photoProfil.jpeg"
                    alt="Photo de profil"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback placeholder if image not found
                      const target = e.currentTarget
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = `
                        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;height:100%;background:linear-gradient(135deg,#e0d7f7,#c7d8f5)">
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="rgba(139,92,246,0.4)">
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                          </svg>
                          <span style="font-size:11px;color:rgba(139,92,246,0.6);font-family:monospace">photoProfil.jpeg</span>
                        </div>
                      `
                    }}
                  />
                </div>
              </div>

              {/* Floating badges on photo */}
              <div
                className="absolute -left-8 top-8 glass rounded-xl px-3 py-2 text-xs font-medium text-[#1e1b4b] shadow-md animate-float"
                style={{ animationDelay: '0s' }}
              >
                <span className="text-lavender-500 font-mono mr-1">3+</span> ans d'exp.
              </div>
              <div
                className="absolute -right-8 bottom-8 glass rounded-xl px-3 py-2 text-xs font-medium text-[#1e1b4b] shadow-md animate-float"
                style={{ animationDelay: '2s' }}
              >
                <span className="text-cyan-500 font-mono mr-1">12+</span> projets
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="hero-anim opacity-0 glass rounded-2xl p-5 text-center hover:scale-[1.03] transition-transform"
              style={{ animationDelay: `${0.7 + i * 0.1}s` }}
            >
              <div
                className="font-syne font-extrabold text-3xl mb-1"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {s.value}
              </div>
              <div className="text-xs text-[#9ca3af]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-lavender-400 hover:text-lavender-600 transition-colors group"
          >
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <ArrowDown size={18} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}
