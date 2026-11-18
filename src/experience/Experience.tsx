import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as RPointerEvent } from 'react'
import { createScene, IDX as IDX_RAW } from './engine'
import { TECHS, CATS, CONCEPTS } from '../data/stack'
import type { Cat } from '../data/stack'
import { PROJECTS, DOMAINS, ORGS, EXPERIENCES, FORMATIONS, CERTIFS, LINKS } from '../data/site'
import type { Step, Shot } from '../data/site'
import portrait from '../assets/portrait.jpg'
import { siWhatsapp, siGithub } from 'simple-icons'

const ICON_PHONE = 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z'
const ICON_MAIL = 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.4 2L12 12.3 19.6 7zM20 8.6l-8 5.6-8-5.6V17h16z'
const ICON_DOWN = 'M11 3h2v9.2l3.3-3.3 1.4 1.4L12 16l-5.7-5.7 1.4-1.4 3.3 3.3zM4 18h16v2H4z'

const BASE = import.meta.env.BASE_URL
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const ease = (t: number) => { const x = clamp01(t); return x * x * (3 - 2 * x) }

// Scènes du premier voyage (dans l'ordre du défilement)
const IDX = IDX_RAW as Record<number, number>
const S_NAME = IDX[1]      // présentation
const S_GRID = IDX[0]      // « Ce que je fais » : ouverture
const S_DOM = [IDX[2], IDX[3], IDX[6], IDX[7]] // les quatre domaines
const S_TUNNEL = IDX[5]    // projets
const S_STACK = IDX[4]     // stack technique
const RAIL = ['Présentation', 'Ce que je fais', 'Données', 'IA', 'Applications', 'Bases', 'Projets']

// Projets : longueur de défilement, en hauteurs d'écran
const UNIT = 0.42   // un chapitre
const INTRO = 0.9   // entrée du premier projet, en unités
const TAIL = 0.6
const NP = PROJECTS.length
const PROJ_UNITS = INTRO + NP * 3 + TAIL
const PROJ_VH = PROJ_UNITS * UNIT * 100 + 100
const CHAP_AT = [0, 1.02, 2.02]
const CHAPTERS = ['Contexte et besoin', 'Démarche technique', 'Résultat']

const hexRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
const ACCENTS = PROJECTS.map((p) => hexRgb(p.accent))

// Répartition régulière des tuiles sur une sphère
const SPHERE = TECHS.map((_, i) => {
  const n = TECHS.length
  const y = 1 - (2 * (i + 0.5)) / n
  const r = Math.sqrt(1 - y * y)
  const a = i * Math.PI * (3 - Math.sqrt(5))
  return [Math.cos(a) * r, y, Math.sin(a) * r]
})

interface FrameInfo { p: number; dt: number; cx: number; cy: number; radius: number }

export default function Experience() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const hitRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const projRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const pbarRef = useRef<HTMLSpanElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [filter, setFilter] = useState<Cat | 'all'>('all')
  const filterRef = useRef<Cat | 'all'>('all')
  const [noGl, setNoGl] = useState(false)
  const [sheet, setSheet] = useState<number | null>(null)
  const raw = useRef({ q: 0, past: 0, pp: 0, u: 0, e: 0, y: -1, out: 0 })
  const rot = useRef({ yaw: 0.4, pitch: -0.15, drag: false, lx: 0, ly: 0, vy: 0 })

  useEffect(() => { filterRef.current = filter }, [filter])

  const scrollMax = () => (trackRef.current ? trackRef.current.offsetHeight - window.innerHeight : 0)
  const goScene = (i: number) => window.scrollTo({ top: (scrollMax() * i) / S_TUNNEL, behavior: 'smooth' })
  const goId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const goStack = () => { const t = track2Ref.current; if (t) window.scrollTo({ top: t.offsetTop + window.innerHeight * 0.45, behavior: 'smooth' }) }

  // fiche complète d'un projet : Échap pour fermer, page figée derrière
  useEffect(() => {
    if (sheet === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSheet(null) }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = '' }
  }, [sheet])

  useEffect(() => {
    const canvas = canvasRef.current, labels = labelsRef.current, root = rootRef.current
    if (!canvas || !labels || !root) return

    const onMouse = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      root.style.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3))
      root.style.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3))
    }
    window.addEventListener('pointermove', onMouse)

    const getTarget = () => {
      const vh = window.innerHeight, sy = window.scrollY
      const max = scrollMax()
      let q = max > 0 ? clamp01(sy / max) * S_TUNNEL : 0
      const sec = projRef.current, t2 = track2Ref.current
      if (sec) {
        const unit = vh * UNIT
        const y = sy - sec.offsetTop
        raw.current.y = y / vh
        raw.current.e = clamp01(y / (INTRO * unit))
        const u = Math.max(0, Math.min(NP * 3 - 0.001, y / unit - INTRO))
        raw.current.u = u
        const i = Math.floor(u / 3)
        raw.current.pp = Math.min(NP - 1, i + (i < NP - 1 ? ease((u - i * 3 - 2.3) / 0.7) : 0))
        raw.current.past = clamp01((y + vh * 0.6) / (vh * 0.5))
      }
      // second voyage : après les projets, le tunnel devient la sphère de la stack
      if (t2 && sy > t2.offsetTop - vh * 1.2) q = S_TUNNEL + ease((sy - (t2.offsetTop - vh * 1.15)) / (vh * 0.75))
      // après la stack : la scène s'efface doucement derrière le parcours, sans coupure
      raw.current.out = t2 ? ease((sy - (t2.offsetTop + t2.offsetHeight - vh * 1.45)) / (vh * 0.5)) : 0
      raw.current.q = q
      if (q >= S_TUNNEL) return q
      const fl = Math.min(S_TUNNEL - 1, Math.floor(q))
      return fl + ease((q - fl - 0.1) / 0.8)
    }
    const getDrift = () => { const q = raw.current.q; return q >= S_TUNNEL ? 0 : q - Math.floor(q) - 0.5 }
    const getFlow = () => window.scrollY * 0.0045
    const getTint = () => {
      const pp = raw.current.pp, i = Math.min(NP - 2, Math.floor(pp)), f = pp - i
      return ACCENTS[i].map((v, k) => v + (ACCENTS[i + 1][k] - v) * f)
    }

    const onFrame = (info: FrameInfo) => {
      canvas.style.opacity = (1 - raw.current.out * 0.45).toFixed(3)
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${clamp01(raw.current.q / S_TUNNEL).toFixed(4)})`
      if (railRef.current) {
        railRef.current.style.opacity = (1 - raw.current.past).toFixed(2)
        railRef.current.style.pointerEvents = raw.current.past > 0.5 ? 'none' : 'auto'
        const cur = Math.round(raw.current.q)
        railRef.current.querySelectorAll('button').forEach((b, i) => b.classList.toggle('on', i === cur))
      }
      panelRefs.current.forEach((el, i) => {
        if (!el) return
        let o = clamp01((1 - Math.abs(info.p - i) * 1.9) * 2.2) * (i === S_STACK ? 1 - raw.current.out : 1)
        if (i === S_TUNNEL) o *= 1 - clamp01((raw.current.y + 0.55) / 0.35) // laisse la place aux projets
        if (i === S_STACK && raw.current.q < S_TUNNEL + 0.5) o = 0
        el.style.opacity = o.toFixed(3)
        el.style.transform = `translateY(${((1 - o) * 14).toFixed(1)}px)`
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible'
        el.style.pointerEvents = o > 0.6 ? 'auto' : 'none'
        el.classList.toggle('live', o > 0.5)
      })

      // projets : chaque projet se raconte en 3 chapitres, avec sa propre transition
      const { pp, u, e, y } = raw.current
      const stage = stageRef.current
      if (stage) {
        const yUnits = (y * 1) / UNIT
        const vis = clamp01((y + 0.12) / 0.3) * clamp01((PROJ_UNITS - yUnits) / 0.5)
        stage.style.opacity = vis.toFixed(3)
        stage.style.visibility = vis < 0.01 ? 'hidden' : 'visible'
        const near = Math.round(pp)
        stage.style.setProperty('--acc', PROJECTS[near].accent)
        if (pbarRef.current) pbarRef.current.style.transform = `scaleX(${(u / (NP * 3)).toFixed(4)})`
        if (introRef.current) {
          const o = clamp01(e * 4) * (1 - clamp01((e - 0.55) / 0.3))
          introRef.current.style.opacity = o.toFixed(3)
          introRef.current.style.visibility = o < 0.01 ? 'hidden' : 'visible'
          introRef.current.style.setProperty('--e', e.toFixed(4))
        }
        const enter = 1 - ease(e) // arrivée du premier projet
        slideRefs.current.forEach((el, i) => {
          if (!el) return
          const d = i === 0 && pp <= 0 ? enter : i - pp, ad = Math.abs(d)
          el.style.visibility = ad > 1.2 ? 'hidden' : 'visible'
          if (ad > 1.2) return
          const v = Math.max(0, Math.min(3, u - i * 3))
          const c = v < 1.35 ? ease((v - 0.35) / 0.65) : 1 + ease((v - 1.35) / 0.65) // chapitre courant, de 0 à 2
          el.style.setProperty('--d', d.toFixed(4))
          el.style.setProperty('--ad', ad.toFixed(4))
          el.style.setProperty('--txt', clamp01(1 - ad * 2.3).toFixed(4))
          el.style.setProperty('--v', v.toFixed(4))
          el.style.pointerEvents = ad < 0.4 ? 'auto' : 'none'
          el.style.zIndex = String(10 - Math.round(ad * 5))
          el.dataset.chap = String(Math.round(c))
          const fan = clamp01(1 - ad * 1.6)
          el.querySelectorAll<HTMLElement>('.win').forEach((w, k) => {
            const r = k - c
            w.style.setProperty('--b', (Math.max(0, r) * fan).toFixed(4))
            w.style.setProperty('--o', clamp01(-r).toFixed(4))
          })
          const cur = Math.round(c)
          el.querySelectorAll<HTMLElement>('.chap').forEach((ch, k) => {
            const dist = k - c
            ch.style.opacity = clamp01(1 - Math.abs(dist) * 2.2).toFixed(3)
            ch.style.transform = `translateY(${(dist * 46).toFixed(1)}px)`
            ch.style.pointerEvents = k === cur ? 'auto' : 'none'
          })
          el.querySelectorAll<HTMLElement>('.tab').forEach((t, k) => t.classList.toggle('on', k === cur))
        })
      }

      // sphère des technologies
      const sph = sphereRef.current, hit = hitRef.current
      if (!sph || !hit) return
      const w = clamp01(1 - Math.abs(info.p - S_STACK) * 2.2) * (1 - raw.current.out)
      sph.style.visibility = w < 0.01 ? 'hidden' : 'visible'
      if (w < 0.01) return
      const r = rot.current
      if (!r.drag) { r.yaw += info.dt * 0.22 + r.vy; r.vy *= 0.94 }
      const R = info.radius
      hit.style.left = info.cx + 'px'; hit.style.top = info.cy + 'px'
      hit.style.width = hit.style.height = R * 2.3 + 'px'
      hit.style.pointerEvents = w > 0.6 ? 'auto' : 'none'
      const cy = Math.cos(r.yaw), sy = Math.sin(r.yaw), cp = Math.cos(r.pitch), sp = Math.sin(r.pitch)
      const f = filterRef.current
      SPHERE.forEach((v, i) => {
        const el = tileRefs.current[i]
        if (!el) return
        const x1 = v[0] * cy + v[2] * sy, z1 = -v[0] * sy + v[2] * cy
        const y2 = v[1] * cp - z1 * sp, z2 = v[1] * sp + z1 * cp
        const d = (z2 + 1) / 2
        const match = f === 'all' || TECHS[i].cat === f
        el.style.transform = `translate3d(${(info.cx + x1 * R).toFixed(1)}px,${(info.cy - y2 * R).toFixed(1)}px,0) translate(-50%,-50%) scale(${(0.55 + 0.55 * d).toFixed(3)})`
        el.style.opacity = (w * (0.2 + 0.8 * Math.pow(d, 1.5)) * (match ? 1 : 0.1)).toFixed(3)
        el.style.zIndex = String(Math.round(d * 100))
        el.style.pointerEvents = w > 0.6 && d > 0.45 && match ? 'auto' : 'none'
        el.classList.toggle('front', d > 0.58 && match)
      })
    }
    const scene = createScene(canvas, { labels, getTarget, getDrift, getFlow, getTint, onFrame })
    if (!scene) { setNoGl(true); return () => window.removeEventListener('pointermove', onMouse) }
    return () => { scene.destroy(); window.removeEventListener('pointermove', onMouse) }
  }, [])

  // rotation de la sphère à la souris ou au doigt
  const onDown = (e: RPointerEvent) => {
    const r = rot.current; r.drag = true; r.lx = e.clientX; r.ly = e.clientY; r.vy = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onMoveSphere = (e: RPointerEvent) => {
    const r = rot.current
    if (!r.drag) return
    const dx = e.clientX - r.lx, dy = e.clientY - r.ly
    r.lx = e.clientX; r.ly = e.clientY
    r.yaw += dx * 0.008; r.vy = dx * 0.008
    r.pitch = Math.max(-1.1, Math.min(1.1, r.pitch - dy * 0.006))
  }
  const onUp = () => { rot.current.drag = false }
  const setPanel = (i: number) => (el: HTMLDivElement | null) => { panelRefs.current[i] = el }

  const goChapter = (i: number, k: number) => {
    const sec = projRef.current
    if (sec) window.scrollTo({ top: sec.offsetTop + (INTRO + i * 3 + CHAP_AT[k]) * UNIT * window.innerHeight, behavior: 'smooth' })
  }
  const shot = (s: Shot, title: string) => {
    if ('img' in s) return <img src={`${BASE}images/web/${s.img}`} alt={`Capture du projet ${title}`} loading="lazy" draggable={false} />
    if (s.diagram === 'cluster') return (
      <div className="dia">
        <span className="dcap">Cluster shardé : les données sont réparties sur 3 shards</span>
        <div className="drow"><b className="dn hi">fasopay-mongos<i>routeur</i></b><b className="dn">fasopay-cfg<i>serveur de configuration</i></b></div>
        <div className="dlines"><i /><i /><i /></div>
        <div className="drow"><b className="dn">shard1</b><b className="dn">shard2</b><b className="dn">shard3</b></div>
        <code>{'clé : { walletCle: "hashed" }'}</code>
      </div>
    )
    return (
      <div className="dia">
        <span className="dcap">Replica Set : un nœud tombe, un autre prend le relais</span>
        <div className="drow"><b className="dn hi">noeud1<i>PRIMARY · écritures</i></b></div>
        <div className="dlines two"><i /><i /></div>
        <div className="drow"><b className="dn">noeud2<i>SECONDARY · copie</i></b><b className="dn">noeud3<i>SECONDARY · copie</i></b></div>
        <code>{'écriture confirmée à la majorité'}</code>
      </div>
    )
  }

  const steps = (items: Step[]) => (
    <ol className="steps">
      {items.map((s) => (
        <li key={s.title}>
          <span className="when">{s.period}</span>
          <strong>{s.title}</strong>
          <span className="org">{s.org}</span>
          {s.desc && <p>{s.desc}</p>}
        </li>
      ))}
    </ol>
  )

  const shownConcepts = CONCEPTS.filter((c) => filter === 'all' || c.cat === filter)

  return (
    <div className={noGl ? 'xp nogl' : 'xp'} ref={rootRef}>
      <canvas ref={canvasRef} className="gl" aria-hidden="true" />

      <header className="top">
        <button className="logo" onClick={() => goScene(0)} aria-label="Retour au début">AZ</button>
        <nav>
          <button onClick={() => goScene(S_GRID)}>Ce que je fais</button>
          <button onClick={() => goId('projets')}>Projets</button>
          <button onClick={goStack}>Stack</button>
          <button onClick={() => goId('parcours')}>Parcours</button>
          <button onClick={() => goId('contact')}>Contact</button>
        </nav>
      </header>

      <div className="rail" ref={railRef}>
        <span className="line"><span className="fill" ref={fillRef} /></span>
        {RAIL.map((t, i) => (
          <button key={t} style={{ top: `${(i / (RAIL.length - 1)) * 100}%` }} onClick={() => goScene(i)} aria-label={`Aller à : ${t}`}><em>{t}</em></button>
        ))}
      </div>

      {/* 01 — Présentation */}
      <div className="panel p-id" ref={setPanel(S_NAME)} style={{ ['--acc' as string]: 'var(--ocre)' }}>
        <div className="idtext">
          <div className="idhead">
            <img className="avatar" src={portrait} alt="Portrait d'Abdrafith Zongo" width={416} height={520} />
            <div>
              <h1 className="name">Abdrafith <span>ZONGO</span></h1>
              <div className="role">Data Scientist <em>&amp;</em> Développeur Full Stack</div>
            </div>
          </div>
          <p className="lead">Je relie la science des données au développement logiciel pour transformer des besoins concrets en solutions numériques utiles.</p>
          <p className="long">Étudiant en <strong>Master 2 Sciences des Données à l'Université Joseph KI-ZERBO</strong> et statisticien de formation, je m'intéresse à la manière dont les données aident à mieux comprendre les situations, à éclairer les décisions et à améliorer les processus.</p>
          <p className="long">De l'analyse statistique à l'intelligence artificielle, en passant par les applications web et les solutions de gestion, j'aime les projets où la réflexion analytique rencontre la réalisation technique.</p>
          <div className="cta">
            <button onClick={() => goId('contact')}>Échangeons</button>
            <a href={`${BASE}cv.pdf`} target="_blank" rel="noreferrer">Télécharger le CV ↓</a>
            <span className="place">Ouagadougou · Burkina Faso</span>
          </div>
        </div>
      </div>

      {/* 02 — Ce que je fais, concrètement */}
      <div className="panel p-intro" ref={setPanel(S_GRID)}>
        <h2>Ce que je fais, <em>concrètement</em>.</h2>
        <p>Tout part de données brutes. Voici les quatre domaines dans lesquels j'interviens.</p>
      </div>

      {DOMAINS.map((d, i) => (
        <div key={d.title} className="panel p-side" ref={setPanel(S_DOM[i])} style={{ ['--acc' as string]: d.accent }}>
          <div className="kicker">Ce que je fais</div>
          <h2>{d.title}</h2>
          <p>{d.text}</p>
          {i === 1 && <p className="long note">Sur le réseau : touchez une compétence, les projets qui l'utilisent s'allument.</p>}
        </div>
      ))}

      {/* 04 — Stack technique (après les projets) */}
      <div className="panel p-side" ref={setPanel(S_STACK)}>
        <div className="kicker">Stack technique</div>
        <h2>Ma boîte à <em>outils</em>.</h2>
        <p>Les outils que j'utilise en stage, en cours et sur mes projets, rangés par domaine. Faites tourner la sphère ou choisissez un domaine.</p>
        <div className="chips">
          {CATS.map((c) => (
            <button key={c.key} className={filter === c.key ? 'chip on' : 'chip'} onClick={() => setFilter(c.key)}>{c.label}</button>
          ))}
        </div>
        <dl className="concepts">
          {shownConcepts.map((c) => (
            <div key={c.label}><dt>{c.label}</dt><dd>{c.items.join(' · ')}</dd></div>
          ))}
        </dl>
      </div>

      <div className="panel p-intro p-proj" ref={setPanel(S_TUNNEL)} style={{ ['--acc' as string]: 'var(--ocre)' }}>
        <div className="kicker">Projets</div>
        <h2>Un projet commence par un <em>besoin</em> à comprendre.</h2>
        <p>Je cherche d'abord à comprendre le contexte, je choisis les méthodes adaptées, puis je construis une solution exploitable. Voici sept réalisations.</p>
      </div>

      <div ref={labelsRef} />

      <div className="sphere" ref={sphereRef} onPointerDown={onDown} onPointerMove={onMoveSphere} onPointerUp={onUp} onPointerCancel={onUp}>
        <div className="sphere-hit" ref={hitRef} />
        {TECHS.map((t, i) => (
          <div key={t.name} className="tile" ref={(el) => { tileRefs.current[i] = el }} style={{ ['--c' as string]: t.color }}>
            <div className="face">
              {t.path ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={t.path} fill="currentColor" /></svg>
              ) : (
                <span className="mono">{t.mono}</span>
              )}
            </div>
            <span className="tname">{t.name}</span>
          </div>
        ))}
      </div>

      <div className="track" ref={trackRef} style={{ height: `${S_TUNNEL * 105 + 100}vh` }} />

      {/* 03 — Projets */}
      <section className="proj" id="projets" ref={projRef} style={{ height: `${PROJ_VH}vh` }}>
        <div className="stage" ref={stageRef}>
          <div className="stage-head">
            <span className="kicker">Projets</span>
          </div>
          <div className="pintro" ref={introRef} />
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="pslide" ref={(el) => { slideRefs.current[i] = el }} style={{ ['--acc' as string]: p.accent }}>
              <div className="ptext">
                <span className="badge">{p.kind}</span>
                <h3>{p.title}</h3>
                <p className="ptag">{p.tagline}</p>
                <span className="ctx">{p.frame}</span>
                <div className="tabs">
                  {CHAPTERS.map((c, k) => <button key={c} className="tab" onClick={() => goChapter(i, k)}>{c}</button>)}
                </div>
                <div className="chaps">
                  <div className="chap">
                    <h4>Le contexte</h4><p>{p.context}</p>
                    <h4>Le besoin</h4><p>{p.need}</p>
                  </div>
                  <div className="chap">
                    <h4>La démarche technique</h4>
                    <ul>{p.technique.map((t) => <li key={t}>{t}</li>)}</ul>
                    <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                  <div className="chap">
                    <h4>Le résultat</h4><p>{p.result}</p>
                    {p.link && <a className="plink" href={p.link} target="_blank" rel="noreferrer">Voir le site ↗</a>}
                  </div>
                </div>
              </div>
              <div className={`pvis fx-${p.fx}`}>
                <div className="pstack">
                  {p.shots.map((s, k) => (
                    <figure key={k} className="win" style={{ zIndex: 3 - k }} onClick={() => setSheet(i)}>
                      <div className="bar"><i /><i /><i /></div>
                      {shot(s, p.title)}
                    </figure>
                  ))}
                </div>
                <button className="zoom" onClick={() => setSheet(i)}>Lire la fiche complète et voir les captures ⤢</button>
              </div>
            </div>
          ))}
          <div className="pbar"><span ref={pbarRef} /></div>
        </div>
      </section>

      <div className="track t2" ref={track2Ref} style={{ height: '200vh' }} />

      <main className="flow">
        <section id="parcours" style={{ ['--acc' as string]: 'var(--savane)' }}>
          <div className="block">
            <div className="kicker">Parcours</div>
            <h2>Expérience et <em>formation</em>.</h2>
            <div className="cols">
              <div>
                <h3>Expérience</h3>{steps(EXPERIENCES)}
                <div className="orgs">
                  <span>Organisations pour lesquelles j'ai travaillé chez Telia Informatique</span>
                  <ul>{ORGS.map((o) => <li key={o}>{o}</li>)}</ul>
                </div>
              </div>
              <div>
                <h3>Formation</h3>{steps(FORMATIONS)}
                <h3 className="mt">Certifications</h3>
                <ul className="plain">{CERTIFS.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" style={{ ['--acc' as string]: 'var(--laterite)' }}>
          <div className="block">
            <div className="kicker">Contact</div>
            <h2>Échangeons autour d'une <em>idée</em> ou d'un projet.</h2>
            <p className="cintro">Le plus simple : un message WhatsApp, un appel ou un e-mail.</p>
            <div className="cgrid">
              <a className="citem" href={LINKS.whatsapp} target="_blank" rel="noreferrer" style={{ ['--c' as string]: '#25d366' }}>
                <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={siWhatsapp.path} fill="currentColor" /></svg></i>
                <span>WhatsApp</span><strong>{LINKS.phone}</strong>
              </a>
              <a className="citem" href={LINKS.phoneHref} style={{ ['--c' as string]: '#e2a63b' }}>
                <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICON_PHONE} fill="currentColor" /></svg></i>
                <span>Téléphone</span><strong>{LINKS.phone}</strong>
              </a>
              <a className="citem" href={`mailto:${LINKS.email}`} style={{ ['--c' as string]: '#d8644a' }}>
                <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICON_MAIL} fill="currentColor" /></svg></i>
                <span>E-mail</span><strong>{LINKS.email}</strong>
              </a>
              <a className="citem" href={LINKS.linkedin} target="_blank" rel="noreferrer" style={{ ['--c' as string]: '#7d9bd0' }}>
                <i><b>in</b></i>
                <span>LinkedIn</span><strong>Abdrafith Zongo</strong>
              </a>
              <a className="citem" href={LINKS.github} target="_blank" rel="noreferrer" style={{ ['--c' as string]: '#eadfc8' }}>
                <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={siGithub.path} fill="currentColor" /></svg></i>
                <span>GitHub</span><strong>Abdrafith-ZONGO</strong>
              </a>
              <a className="citem" href={`${BASE}cv.pdf`} target="_blank" rel="noreferrer" style={{ ['--c' as string]: '#86b06a' }}>
                <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICON_DOWN} fill="currentColor" /></svg></i>
                <span>Curriculum vitae</span><strong>Télécharger le CV (PDF)</strong>
              </a>
            </div>
            <footer>© {new Date().getFullYear()} Abdrafith Zongo · Ouagadougou, Burkina Faso</footer>
          </div>
        </section>
      </main>

      {sheet !== null && (() => {
        const p = PROJECTS[sheet]
        return (
          <div className="sheet" role="dialog" aria-label={`Fiche du projet ${p.title}`} onClick={() => setSheet(null)}>
            <article onClick={(e) => e.stopPropagation()} style={{ ['--acc' as string]: p.accent }}>
              <button className="sclose" onClick={() => setSheet(null)}>Fermer ✕</button>
              <span className="badge">{p.kind}</span>
              <h3>{p.title}</h3>
              <p className="ptag">{p.tagline}</p>
              <span className="ctx">{p.frame}</span>
              <div className="sgrid">
                <div><h4>Le contexte</h4><p>{p.context}</p></div>
                <div><h4>Le besoin</h4><p>{p.need}</p></div>
                <div className="wide"><h4>La démarche technique</h4><ul>{p.technique.map((t) => <li key={t}>{t}</li>)}</ul></div>
                <div className="wide">
                  <h4>Le résultat</h4><p>{p.result}</p>
                  <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  {p.link && <a className="plink" href={p.link} target="_blank" rel="noreferrer">Voir le site ↗</a>}
                </div>
              </div>
              <div className="sshots">
                {p.gallery.map((g) => <img key={g} src={`${BASE}images/web/${g}`} alt={`Capture du projet ${p.title}`} loading="lazy" />)}
                {p.shots.filter((x) => 'diagram' in x).map((x, k) => <div key={k} className="sdia">{shot(x, p.title)}</div>)}
              </div>
            </article>
          </div>
        )
      })()}
    </div>
  )
}
