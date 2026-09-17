# ResumeForge 🛠️
> Local-First, Zero-Account, ATS Resume Builder & Rule-Based Linter.

ResumeForge is an opinionated web application that helps candidates write, format, and audit high-impact resumes. It provides **real-time editorial guidance** (what to add, what to remove) with **$0 in AI costs**, complete privacy, and instant client-side performance.

---

## ⚡ Key Highlights

- **100% Client-Side & Local-First:** No accounts, no sign-ups, and no databases. Personal information never leaves the browser. Automatically persists to `localStorage`.
- **Zero AI Costs (Rule-Based "ESLint for Resumes"):**
  - **Action Verb Enhancer:** Replaces passive verbs (*"Assisted"*, *"Responsible for"*, *"Worked on"*) with categorized power verbs (*Architected, Automated, Spearheaded, Optimized*).
  - **Google X-Y-Z Metric Scanner:** Validates quantifiable impact (`%`, `$`, throughput, latency, users served).
  - **Fluff & Cliché Redliner:** Detects overused buzzwords (*"team player"*, *"detail-oriented"*, *"go-getter"*, *"synergy"*).
  - **ATS Anti-Pattern Alerts:** Flags full street addresses, redundant high school entries, and outdated reference notes.
- **Modular Element Management ("Add/Remove Elements"):**
  - Toggle visibility on entire sections or individual bullet points without deleting data.
  - Reorder sections with one-click presets (*Student / New Grad* vs. *Experienced Engineer*).
  - Interactive skill chips with click-to-delete and instant add.
- **Single-Page Budgeting:** Real-time height measurement with an exact visual cutoff line indicating if content is spilling onto page 2.
- **3 ATS-Compliant Formats:**
  1. *Classic Ivy* (inspired by proven single-column LaTeX formats).
  2. *Modern Tech* (clean typography with subtle tech pill badges).
  3. *Compact Exec* (dense, space-efficient single-pager).
- **Zero-Backend Sharing:** Compresses complete resume state into URL hashes using `lz-string`. Share a link with a friend and they receive the exact resume state with zero server storage.
- **Pixel-Perfect PDF Export:** Native CSS `@media print` with paged media rules.

---

## 🚀 Getting Started

### Local Development
```bash
npm install
npm run dev
```

### Production Build & Tests
```bash
npm test
npm run build
```

---

## 🌐 Deployment Options

### Option 1: Cloudflare Workers with Static Assets
```bash
# Preview
npm run preview:worker

# Deploy to Cloudflare
npm run deploy
```

### Option 2: Docker Container (Homelab / Self-Hosted)
```bash
docker build -t resume-builder .
docker run -d -p 8085:80 --name resume-builder resume-builder
```
