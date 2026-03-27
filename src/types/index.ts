export interface Project {
  id: number
  title: string
  description: string
  longDesc: string
  tags: string[]
  category: 'dev' | 'data' | 'fullstack'
  github?: string
  demo?: string
  image: string
  featured?: boolean
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'data' | 'tools'
  icon: string
}

export interface Experience {
  id: number
  type: 'work' | 'education'
  title: string
  org: string
  period: string
  desc: string
  tags?: string[]
}

export interface SocialLink {
  label: string
  url: string
  icon: string
}
