// ─────────────────────────────────────────────────────────────────────────────
// src/components/layout/Header.tsx  — VERSION MISE À JOUR
// Ajouts : lien CV dans la nav + LangSwitcher (drapeaux FR/EN)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import LangSwitcher from '../ui/LangSwitcher'
import { useLang }  from '../../i18n/LangContext'

export default function Header() {
  const { tr } = useLang()
  const n = tr.nav

  // Liens de navigation — tirés des traductions
  const navItems = [
    { label: n.home,     href: '#hero'     },
    { label: n.about,    href: '#about'    },
    { label: n.skills,   href: '#skills'   },
    { label: n.projects, href: '#projects' },
    { label: n.resume,   href: '#resume'   },
    { label: n.contact,  href: '#contact'  },
  ]

  const [scrolled,      setScrolled]  = useState(false)
  const [menuOpen,      setMenuOpen]  = useState(false)
  const [activeSection, setActive]    = useState('hero')

  // Détecte le scroll pour ajouter le fond flou
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Détecte la section active pour surligner le lien nav
  useEffect(() => {
    const ids = [...navItems.map((i) => i.href.slice(1)), 'cv']
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -50% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, []) // eslint-disable-line

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 glass shadow-[0_4px_24px_rgba(139,92,246,0.1)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">

        {/* ── LOGO ──────────────────────────────────────────────────────── */}
        <button
          onClick={() => scrollTo('#hero')}
          className="font-syne font-bold text-xl text-[#1e1b4b] tracking-tight hover:text-lavender-600 transition-colors flex-shrink-0"
        >
          <span className="text-lavender-500">&lt;</span>
          AZ
          <span className="text-lavender-500"> /&gt;</span>
        </button>

        {/* ── NAV DESKTOP ───────────────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}

          {/* Lien CV — mis en évidence */}
          <button
            onClick={() => scrollTo('#cv')}
            className={`relative text-sm font-semibold transition-colors duration-200 px-2.5 py-1 rounded-lg ${
              activeSection === 'cv'
                ? 'bg-lavender-500 text-white'
                : 'text-lavender-600 hover:bg-lavender-100'
            }`}
          >
            {n.cv} ✦
          </button>
        </nav>

        {/* ── DROITE : LangSwitcher + CTA ────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Drapeaux FR / EN */}
          <LangSwitcher />

          {/* Bouton Télécharger CV */}
          <button
            onClick={() => {
              scrollTo('#cv')
              // Petit délai pour que le scroll se termine puis déclenche l'impression
              setTimeout(() => window.print(), 600)
            }}
            className="btn-primary text-xs px-4 py-2"
          >
            {n.downloadCv}
          </button>
        </div>

        {/* ── TOGGLE MOBILE ──────────────────────────────────────────── */}
        <button
          className="lg:hidden p-2 rounded-lg text-lavender-600 hover:bg-lavender-100 transition"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── MENU MOBILE ──────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden glass mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`text-left text-sm font-medium transition-colors ${
                activeSection === item.href.slice(1)
                  ? 'text-lavender-600'
                  : 'text-[#4b5563] hover:text-lavender-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#cv')}
            className="text-left text-sm font-semibold text-lavender-600"
          >
            {n.cv} ✦
          </button>
          {/* Sélecteur de langue dans le menu mobile */}
          <LangSwitcher />
          <button
            onClick={() => { scrollTo('#cv'); setTimeout(() => window.print(), 600) }}
            className="btn-primary text-xs self-start"
          >
            {n.downloadCv}
          </button>
        </div>
      )}
    </header>
  )
}