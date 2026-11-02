# PortoCraft - Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** 2026-10-31  
**Status:** In Development  
**Team:** Riski (Backend), Anggrea (Design), Cici (Components), Faiz (Pages), Fahri (Integration)

---

## 1. Executive Summary

PortoCraft adalah **Web CV & Portfolio Builder** berbasis AI dengan fitur AI Auto-Write, ATS Checker, dan Template Gallery. Produk ini membantu users (fresh grad, professionals, creative) membuat CV/portfolio profesional dengan mudah tanpa perlu design skills.

**Target Launch:** Q1 2027  
**MVP Scope:** 3 template default + AI Auto-Write + ATS Checker + basic export  

---

## 2. Problem Statement

**Pain Points:**
- Users kesulitan format CV yang ATS-friendly
- Design CV dari scratch butuh waktu lama
- Template CV kebanyakan generic atau membosankan
- Tidak ada cara instant check apakah CV mereka ATS-compliant
- Portfolio builders mahal dan kompleks

**Solution:** All-in-one platform yang cepat, affordable, dan intelligent.

---

## 3. Target Users

### Primary Personas
1. **Fresh Graduates** (Age 20-25)
   - Goal: Cepat bikin CV profesional untuk apply kerja
   - Pain: Tidak tahu format yang benar
   - Behavior: Suka template yang modern tapi simple

2. **Working Professionals** (Age 25-40)
   - Goal: Update CV/portfolio untuk career switch
   - Pain: Tidak punya waktu, ingin hasil yang polished
   - Behavior: Suka customize detail, perlu ATS check

3. **Creatives** (Designer, Developer, Creator)
   - Goal: Showcase portfolio dengan style unik
   - Pain: Template biasa tidak cukup impressive
   - Behavior: Suka fitur customize penuh, export banyak format

---

## 4. Core Features (MVP)

### 4.1 Feature: Template Gallery
- **Scope:** 3 template default (Professional, Creative, Minimal)
- **Functionality:**
  - Browse semua template dalam 1 halaman
  - Click-to-use instan ke builder
  - Preview live sebelum pilih
- **Design:** Grid layout, smooth transitions, category filter (future)

### 4.2 Feature: CV Builder / Portfolio Builder
- **Scope:** Drag-and-drop sections (Header, Summary, Experience, Education, Skills, Projects)
- **Functionality:**
  - Real-time preview (left: form, right: preview)
  - Add/remove/reorder sections
  - WYSIWYG editor per section
  - Save progress ke browser (localStorage + backend)
  - Export as PDF / JSON
- **Design:** Clean 2-column layout, professional typography

### 4.3 Feature: AI Auto-Write
- **Scope:** Generate section content (Experience, Skills, Summary) dari user input
- **Functionality:**
  - Button "Generate with AI" di tiap section
  - Modal input minimal (job title, company, duration, etc)
  - AI return 3 opsi text
  - User pick one atau edit
- **Integration:** Backend API call ke LLM
- **Design:** Clean modal, loading state, 3 option cards

### 4.4 Feature: ATS Checker
- **Scope:** Validate CV structure & flag ATS issues
- **Functionality:**
  - Scan: Font compatibility, spacing, formatting
  - Return: Score (0-100) + list issues
  - Recommendations: Simple fixes
- **Integration:** Backend validation logic
- **Design:** Score card + issue list, color-coded severity

### 4.5 Feature: Data Management
- **Scope:** Save/Load progress, account system (future: cloud sync)
- **Functionality:**
  - Local save (localStorage)
  - Backend save (DB)
  - Multiple project support (save multiple CVs)
  - Export JSON backup
  - Import JSON
- **Integration:** Fahri handle API + state sync

---

## 5. Design System

### 5.1 Color Palette
```
Primary:      #1e3a8a (Deep Navy - titles, CTAs)
Accent:       #0ea5e9 (Bright Cyan - highlights)
Secondary:    #f97316 (Warm Orange - alt accent)
Background:   #f8fafc (Light Slate - page bg)
Text Primary: #0f172a (Dark Slate)
Text Muted:   #64748b (Gray)
Border:       #e2e8f0 (Light Gray)
Success:      #22c55e (Green)
Warning:      #eab308 (Yellow)
Error:        #ef4444 (Red)
```

### 5.2 Typography
```
Font Stack (Heading): Inter, system-ui, sans-serif
Font Stack (Body):    Open Sans, system-ui, sans-serif

Title:        54pt / 66pt, bold, Primary
Subtitle:     28pt / 32pt, semi-bold, Primary
Heading 2:    24pt, bold, Primary
Heading 3:    20pt, semi-bold, Text Primary
Body Large:   18pt, regular, Text Primary
Body Normal:  16pt, regular, Text Primary
Body Small:   14pt, regular, Text Muted
Caption:      12pt, regular, Text Muted
```

### 5.3 Spacing & Layout
```
Grid Unit:    8px (all spacing multiples of 8px)
Margin:       16px (default margin)
Padding:      16px / 24px / 32px
Gap:          16px (between components)
Border Radius: 8px (standard), 12px (large)
Shadow:       Light (0 1px 2px rgba(0,0,0,0.05))
              Medium (0 4px 6px rgba(0,0,0,0.1))
              Large (0 10px 15px rgba(0,0,0,0.1))
```

### 5.4 Component Treatment
- **Buttons:** Primary (Navy + Cyan hover), Secondary (outline), Danger (Red)
- **Cards:** White bg, light shadow, 8px radius
- **Inputs:** Border gray, focus blue accent, 8px radius
- **Modals:** Overlay dark, center content, shadow large
- **Progress:** Cyan accent color, smooth animation

---

## 6. User Flow

### Flow 1: New User → Create CV
```
Landing Page
  → Template Gallery (browse 3 template)
    → Select Template
      → CV Builder (real-time preview)
        → Fill sections (or AI Auto-Write)
          → Save Progress
            → ATS Check (optional)
              → Export PDF
```

### Flow 2: Returning User → Load CV
```
Dashboard / My Projects
  → Select existing CV
    → CV Builder (edit mode)
      → Update sections
        → Save Progress
          → Export
```

### Flow 3: AI Auto-Write Flow
```
User click "Generate with AI"
  → Modal: Input (job title, company, duration)
    → Backend API call LLM
      → Return 3 options
        → User pick / edit
          → Insert to section
```

### Flow 4: ATS Checker Flow
```
User click "Check ATS Score"
  → Backend scan CV
    → Return score + issues
      → UI display: Score card + list
        → User fix issues (or ignore)
```

---

## 7. Technical Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand (simple) or Context API
- **Forms:** React Hook Form
- **PDF Export:** jsPDF + html2canvas or react-pdf
- **Icons:** Lucide React

### Backend (Riski)
- **Auth:** JWT / Session
- **Database:** PostgreSQL / MongoDB
- **API:** REST / GraphQL
- **LLM Integration:** OpenAI / Hugging Face API
- **File Storage:** AWS S3 / local
- **ATS Logic:** Custom validation rules

### Hosting
- **Frontend:** Vercel / Netlify / Cloudflare Pages
- **Backend:** Railway / Render / Heroku
- **Database:** Managed (PlanetScale / MongoDB Atlas)

---

## 8. Success Metrics

- Users can create CV in < 5 minutes
- ATS score accuracy > 85%
- PDF export quality 100% professional
- User retention after 7 days > 40%
- Positive feedback on AI Auto-Write quality

---

## 9. Out of Scope (v2+)

- [ ] Multi-language support
- [ ] Collaboration / sharing
- [ ] Job application tracker
- [ ] AI Cover Letter generator
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Subscription tiers
- [ ] Template marketplace

---

## 10. Risks & Mitigation

| Risk | Mitigation |
|------|-----------|
| AI output quality poor | Test LLM prompts extensively, allow user edit |
| ATS checker inaccurate | Research real ATS systems, iterate on rules |
| Performance slow on large CV | Lazy load, optimize state, pagination |
| Users lose data | Implement auto-save + backup system |
| Competitors already exist | Focus on UX speed + AI quality |

---

## 11. Acceptance Criteria

**Feature Complete when:**
- All 4 core features working end-to-end
- 3 templates fully functional
- No console errors
- PDF export matches preview 100%
- ATS checker shows meaningful results
- Data persists after page refresh
- Load time < 2 seconds
- Mobile responsive (375px+)
- All AI features tested with real data
