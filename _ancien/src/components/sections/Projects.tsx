import { useEffect, useRef, useState } from 'react'
import { Github, ExternalLink, BarChart2, Code2, Layers } from 'lucide-react'
import { projects } from '../../data/projects'
import type { Project } from '../../types'

const filters = [
  { key: 'all',      label: 'Tous',        icon: Layers },
  { key: 'dev',      label: 'Dev Web',     icon: Code2 },
  { key: 'data',     label: 'Data / IA',   icon: BarChart2 },
  { key: 'fullstack',label: 'Full Stack',  icon: Layers },
]

const categoryColors: Record<string, { color: string; bg: string; label: string }> = {
  dev:       { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',  label: 'Dev Web' },
  data:      { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',   label: 'Data / IA' },
  fullstack: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  label: 'Full Stack' },
}

function ProjectCard({ project }: { project: Project }) {
  const { color, bg, label } = categoryColors[project.category]
  return (
    <div className="reveal glass rounded-3xl overflow-hidden hover:shadow-[0_16px_48px_rgba(139,92,246,0.18)] transition-all duration-400 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-lavender-100 to-blue-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const t = e.currentTarget
            t.style.display = 'none'
            t.parentElement!.style.cssText += 'display:flex;align-items:center;justify-content:center;'
            const div = document.createElement('div')
            div.innerHTML = `
              <div style="text-align:center;padding:20px">
                <div style="font-size:36px;margin-bottom:8px">${project.category === 'data' ? '📊' : project.category === 'fullstack' ? '⚡' : '💻'}</div>
                <div style="font-family:monospace;font-size:11px;color:rgba(139,92,246,0.5)">${project.title}</div>
              </div>
            `
            t.parentElement!.appendChild(div)
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: 'rgba(255,255,255,0.9)', color }}
        >
          {label}
        </span>

        {/* Featured star */}
        {project.featured && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-lavender-500 text-white">
            ★ Featured
          </span>
        )}

        {/* Action buttons on hover */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center text-[#1e1b4b] hover:bg-lavender-500 hover:text-white transition-colors shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center text-[#1e1b4b] hover:bg-lavender-500 hover:text-white transition-colors shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-syne font-bold text-[#1e1b4b] text-lg mb-2 group-hover:text-lavender-700 transition-colors">
          {project.title}
        </h3>
        <p className="text-[#4b5563] text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-lg font-medium"
              style={{ background: bg, color }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links row */}
        <div className="flex items-center gap-3 pt-3 border-t border-[rgba(139,92,246,0.08)]">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-lavender-600 transition-colors font-medium"
            >
              <Github size={13} /> Code source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-lavender-600 transition-colors font-medium ml-auto"
            >
              <ExternalLink size={13} /> Voir démo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
        }
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Re-trigger reveals when filter changes
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('#projects .reveal').forEach((el) => el.classList.add('visible'))
    }, 50)
  }, [activeFilter])

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" ref={sectionRef} className="bg-white/50">
      <div className="section-wrap">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="section-subtitle reveal">Ce que j'ai construit</p>
          <h2 className="section-title reveal delay-100">Mes projets</h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-lavender-500 to-blue-400 mx-auto mt-4 reveal delay-200" />
          <p className="mt-4 text-[#9ca3af] text-sm max-w-lg mx-auto reveal delay-300">
            Une sélection de projets Dev Web et Data Analyse — chacun résout un problème réel.
          </p>
        </div>

        {/* Filter */}
        <div className="reveal flex flex-wrap justify-center gap-2 mb-10">
          {filters.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === key
                  ? 'bg-lavender-500 text-white shadow-md shadow-lavender-200'
                  : 'glass text-[#4b5563] hover:text-lavender-600'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="reveal mt-14 text-center">
          <p className="text-[#9ca3af] text-sm mb-4">
            D'autres projets disponibles sur GitHub
          </p>
          <a
            href="https://github.com/tonpseudo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <Github size={16} /> Voir tous mes projets
          </a>
        </div>
      </div>
    </section>
  )
}
