// ─────────────────────────────────────────────────────────────────────────────
// src/App.tsx  — VERSION MISE À JOUR
// Ajoute : affichage de la page CV via state + scroll
// ─────────────────────────────────────────────────────────────────────────────

import { Toaster } from 'react-hot-toast'
import Header      from './components/layout/Header'
import Footer      from './components/layout/Footer'
import Hero        from './components/sections/Hero'
import About       from './components/sections/About'
import Skills      from './components/sections/Skills'
import Projects    from './components/sections/Projects'
import Resume      from './components/sections/Resume'
import Contact     from './components/sections/Contact'
import CVPage      from './components/sections/CVPage'
import ScrollToTop from './components/ui/ScrollToTop'

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(139,92,246,0.2)',
            color: '#1e1b4b',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            borderRadius: '12px',
          },
        }}
      />

      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
        <CVPage />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}