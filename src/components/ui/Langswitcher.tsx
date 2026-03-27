// ─────────────────────────────────────────────────────────────────────────────
// src/components/ui/LangSwitcher.tsx
// Bouton drapeau FR / EN dans le Header
// ─────────────────────────────────────────────────────────────────────────────

import { useLang } from '../../i18n/LangContext'

// SVG drapeaux inline (pas de dépendance externe)
const FlagFR = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shadow-sm">
    <rect width="6.67"  height="14" fill="#002395"/>
    <rect x="6.67" width="6.66" height="14" fill="#EDEDED"/>
    <rect x="13.33" width="6.67" height="14" fill="#ED2939"/>
  </svg>
)

const FlagEN = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shadow-sm">
    <rect width="20" height="14" fill="#012169"/>
    {/* diagonals */}
    <line x1="0" y1="0"  x2="20" y2="14" stroke="white" strokeWidth="2.8"/>
    <line x1="20" y1="0" x2="0"  y2="14" stroke="white" strokeWidth="2.8"/>
    <line x1="0" y1="0"  x2="20" y2="14" stroke="#C8102E" strokeWidth="1.6"/>
    <line x1="20" y1="0" x2="0"  y2="14" stroke="#C8102E" strokeWidth="1.6"/>
    {/* cross white */}
    <rect x="8.5"  y="0"  width="3"  height="14" fill="white"/>
    <rect x="0"    y="5.5" width="20" height="3" fill="white"/>
    {/* cross red */}
    <rect x="9"    y="0"  width="2"  height="14" fill="#C8102E"/>
    <rect x="0"    y="6"  width="20" height="2" fill="#C8102E"/>
  </svg>
)

export default function LangSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl glass">
      <button
        onClick={() => setLang('fr')}
        title="Français"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          lang === 'fr'
            ? 'bg-lavender-500 text-white shadow-sm'
            : 'text-[#6b7280] hover:text-[#1e1b4b]'
        }`}
      >
        <FlagFR /> FR
      </button>
      <button
        onClick={() => setLang('en')}
        title="English"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          lang === 'en'
            ? 'bg-lavender-500 text-white shadow-sm'
            : 'text-[#6b7280] hover:text-[#1e1b4b]'
        }`}
      >
        <FlagEN /> EN
      </button>
    </div>
  )
}