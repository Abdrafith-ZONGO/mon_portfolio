# 🚀 Mon Portfolio — Dev Full Stack & Data Analyst

Portfolio moderne, lumineux, style Clair & Professionnel.
Stack : Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion

---

## ⚡ Installation rapide

```bash
# 1. Aller dans le dossier
cd portfolio

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev

# 4. Build pour la production
npm run build
```

Ouvre http://localhost:5173 dans ton navigateur.

---

## 📸 Ajouter tes images

Crée le dossier `public/images/` et place-y :

| Fichier              | Description                                  |
|----------------------|----------------------------------------------|
| `photo.jpg`          | **Ta photo principale** (carrée, min 400×400) |
| `project1.jpg`       | Image du projet 1 (16:9, min 800×450)        |
| `project2.jpg`       | Image du projet 2                            |
| `project3.jpg`       | Image du projet 3                            |
| `project4.jpg`       | Image du projet 4                            |
| `project5.jpg`       | Image du projet 5                            |
| `project6.jpg`       | Image du projet 6                            |

> Si une image est absente, un placeholder élégant s'affiche automatiquement.

---

## 📄 Ajouter ton CV

Place ton fichier CV dans `public/cv.pdf`.

---

## ✏️ Personnaliser le contenu

### Ton nom & infos perso
- `src/components/sections/Hero.tsx` → ligne ~60 : change `Ton Prénom` et `Ton Nom`
- `src/components/sections/Hero.tsx` → tagline, localisation
- `src/components/layout/Footer.tsx` → liens réseaux sociaux
- `src/components/sections/Contact.tsx` → ton email réel

### Tes projets
- `src/data/projects.ts` → modifie les 6 projets (titre, description, liens GitHub/démo)

### Tes compétences
- `src/data/skills.ts` → adapte les niveaux (0-100) et ajoute/retire des techs

### Ton parcours
- `src/data/experiences.ts` → expériences pro + formations

### Tes stats Hero
- `src/data/experiences.ts` → tableau `stats` en bas du fichier

### Tes réseaux sociaux
- `src/components/layout/Header.tsx` → array `socials`
- `src/components/layout/Footer.tsx` → array `socials`
- `src/components/sections/Contact.tsx` → array `socials`
- `src/components/sections/Hero.tsx` → array `socials`

---

## 🌐 Déploiement Vercel (gratuit)

```bash
# Option 1 : Via CLI
npm install -g vercel
vercel

# Option 2 : Via GitHub
# 1. Push sur GitHub
# 2. Va sur vercel.com
# 3. "New Project" → importe ton repo
# 4. Deploy → c'est en ligne !
```

---

## 🎨 Structure des fichiers

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── cv.pdf              ← TON CV ici
│   └── images/
│       ├── photo.jpg       ← TA PHOTO ici
│       ├── project1.jpg
│       └── ...
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Resume.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       └── ScrollToTop.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── experiences.ts
│   ├── hooks/
│   │   └── useReveal.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

Fait avec 💜 — Bonne chance pour ton portfolio !
