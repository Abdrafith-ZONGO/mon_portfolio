// ─────────────────────────────────────────────────────────────────────────────
// src/i18n/LangContext.tsx
// Context React pour la langue — wrap <App> avec <LangProvider>
// Usage : const { lang, setLang, tr } = useLang()
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, type ReactNode } from 'react'
import { t, type Lang } from './translations'

interface LangContextValue {
  lang:    Lang
  setLang: (l: Lang) => void
  tr:      typeof t['fr']   // shape identique pour FR et EN
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  // Détecte la langue du navigateur au premier rendu
  const initial: Lang =
    typeof navigator !== 'undefined' && navigator.language.startsWith('en') ? 'en' : 'fr'

  const [lang, setLang] = useState<Lang>(initial)

  return (
    <LangContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

// Hook raccourci
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}