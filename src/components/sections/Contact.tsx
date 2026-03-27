import { useEffect, useRef, useState } from 'react'
import {
  Mail, MapPin, Github, Linkedin, Twitter,
  Send, CheckCircle, AlertCircle, Phone,
} from 'lucide-react'

const socials = [
  { icon: Github,   href: 'https://github.com/tonpseudo',     label: 'GitHub',   color: '#1e1b4b' },
  { icon: Linkedin, href: 'https://linkedin.com/in/tonpseudo', label: 'LinkedIn', color: '#0077b5' },
  { icon: Twitter,  href: 'https://twitter.com/tonpseudo',    label: 'Twitter',  color: '#1da1f2' },
  { icon: Mail,     href: 'mailto:ton@email.com',             label: 'Email',    color: '#8b5cf6' },
]

const infos = [
  { icon: Mail,    label: 'Email',        value: 'ton@email.com' },
  { icon: Phone,   label: 'Téléphone',    value: '+226 XX XX XX XX' },
  { icon: MapPin,  label: 'Localisation', value: 'Ouagadougou, Burkina Faso' },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

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

  const validate = () => {
    const errs: Partial<typeof form> = {}
    if (!form.name.trim())           errs.name    = 'Nom requis'
    if (!form.email.trim())          errs.email   = 'Email requis'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email invalide'
    if (!form.subject.trim())        errs.subject = 'Sujet requis'
    if (form.message.trim().length < 20) errs.message = 'Message trop court (20 car. min.)'
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')

    // Build mailto link — no backend needed
    const subject = encodeURIComponent(`[Portfolio] ${form.subject}`)
    const body = encodeURIComponent(
      `Bonjour,\n\nNom: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n\n---\nEnvoyé depuis le portfolio`
    )
    const mailtoUrl = `mailto:ton@email.com?subject=${subject}&body=${body}`

    setTimeout(() => {
      window.location.href = mailtoUrl
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    }, 800)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const inputClass = (field: keyof typeof form) =>
    `w-full px-4 py-3 rounded-xl text-sm text-[#1e1b4b] placeholder:text-[#9ca3af] outline-none transition-all duration-200 bg-white/70 border ${
      errors[field]
        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-[rgba(139,92,246,0.2)] focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100'
    }`

  return (
    <section id="contact" ref={sectionRef} className="bg-white/50">
      <div className="section-wrap">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="section-subtitle reveal">Travaillons ensemble</p>
          <h2 className="section-title reveal delay-100">Me contacter</h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-lavender-500 to-blue-400 mx-auto mt-4 reveal delay-200" />
          <p className="mt-4 text-[#9ca3af] text-sm max-w-md mx-auto reveal delay-300">
            Un projet, une collaboration, ou juste une question ? Je réponds sous 24h.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left info */}
          <div className="lg:col-span-2 reveal-left space-y-5">
            {/* Info cards */}
            {infos.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-lavender-600" />
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-medium text-[#1e1b4b]">{value}</p>
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs text-[#9ca3af] font-medium uppercase tracking-wide mb-4">Réseaux sociaux</p>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm font-medium text-[#4b5563] hover:text-white transition-all duration-200 hover:scale-105"
                    style={{ ['--hover-color' as string]: color }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = color; (e.currentTarget as HTMLElement).style.color = 'white' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '' }}
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-syne font-semibold text-[#1e1b4b] text-sm">Disponible</span>
              </div>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Ouvert aux missions freelance, CDI, et collaborations remote. Réponse sous 24h garantie.
              </p>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3 reveal-right">
            <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-7 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-[#4b5563] mb-1.5 uppercase tracking-wide">
                    Nom complet *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className={inputClass('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-[#4b5563] mb-1.5 uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jean@email.com"
                    className={inputClass('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-[#4b5563] mb-1.5 uppercase tracking-wide">
                  Sujet *
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Projet freelance, collaboration..."
                  className={inputClass('subject')}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-[#4b5563] mb-1.5 uppercase tracking-wide">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className={`${inputClass('message')} resize-none`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.message}
                    </p>
                  ) : <span />}
                  <span className="text-xs text-[#9ca3af]">{form.message.length} car.</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full btn-primary justify-center py-3.5 text-sm font-semibold transition-all ${
                  status === 'success' ? 'bg-emerald-500 shadow-emerald-200' : ''
                }`}
                style={status === 'success' ? { background: 'linear-gradient(135deg,#10b981,#059669)', boxShadow: '0 4px 20px rgba(16,185,129,0.35)' } : {}}
              >
                {status === 'idle' && (
                  <><Send size={15} /> Envoyer le message</>
                )}
                {status === 'sending' && (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Ouverture mail...</>
                )}
                {status === 'success' && (
                  <><CheckCircle size={15} /> Message préparé ! ✓</>
                )}
                {status === 'error' && (
                  <><AlertCircle size={15} /> Erreur — réessayez</>
                )}
              </button>

              {status === 'success' && (
                <p className="text-xs text-center text-emerald-600 font-medium">
                  Votre client mail s'est ouvert avec le message pré-rempli 📧
                </p>
              )}

              <p className="text-xs text-center text-[#9ca3af]">
                * Champs obligatoires — Aucune donnée stockée, message envoyé via votre client mail
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
