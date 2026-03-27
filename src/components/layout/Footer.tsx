import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

const socials = [
  { icon: Github,   href: 'https://github.com/tonpseudo',    label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/tonpseudo', label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com/tonpseudo',    label: 'Twitter' },
  { icon: Mail,     href: 'mailto:ton@email.com',             label: 'Email' },
]

const navCols = [
  { title: 'Navigation',  links: [
    { label: 'Accueil',     href: '#hero' },
    { label: 'À propos',    href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets',     href: '#projects' },
  ]},
  { title: 'Plus',  links: [
    { label: 'Parcours',   href: '#resume' },
    { label: 'Contact',    href: '#contact' },
    { label: 'Télécharger CV', href: '/cv.pdf' },
  ]},
]

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-0 border-t border-[rgba(139,92,246,0.12)] bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-syne font-bold text-2xl text-[#1e1b4b] mb-3">
              <span className="text-lavender-500">&lt;</span>MonPortfolio<span className="text-lavender-500"> /&gt;</span>
            </div>
            <p className="text-sm text-[#9ca3af] leading-relaxed max-w-xs">
              Dev Full Stack & Data Analyst basé à Ouagadougou.
              Passionné par la création d'expériences web et l'analyse de données.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-lavender-500 hover:text-white hover:bg-lavender-500 transition-all duration-200 hover:scale-105"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {navCols.map((col) => (
            <div key={col.title}>
              <h4 className="font-syne font-semibold text-sm text-[#1e1b4b] mb-4 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => link.href.startsWith('#') ? scrollTo(link.href) : window.open(link.href)}
                      className="text-sm text-[#9ca3af] hover:text-lavender-600 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(139,92,246,0.1)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#9ca3af]">
            © {year} MonPortfolio — Tous droits réservés
          </p>
          <p className="text-xs text-[#9ca3af] flex items-center gap-1">
            Fait avec <Heart size={12} className="text-lavender-400 fill-lavender-400" /> à Ouagadougou
          </p>
        </div>
      </div>
    </footer>
  )
}
