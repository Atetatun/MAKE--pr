# PortoCraft - 3 Templates Design Specification

**Phase 1 Deliverable:** High-Fidelity Specs & Responsive Layouts  
**Author:** Anggrea (Design Lead)  
**Version:** 1.0  
**Status:** Approved for Implementation  

---

## Template 1: Professional (The Executive Standard)

### Concept & Target User
- **Target:** Corporate professionals, Finance, Legal, Consultants, Engineers, Fresh Grads targeting multinational corporations.
- **Tone:** Authoritative, clean, structured, highly trustworthy.
- **ATS Target Score:** **95 - 100%** (Single continuous text stream, standard Unicode bullet characters, zero multi-column parsing traps).

### Visual & Layout Architecture
- **Desktop (A4 Canvas 210mm × 297mm):**
  - Margins: `24mm` left/right, `20mm` top/bottom.
  - Header: Centered full-width candidate name (Navy `#1e3a8a`, 24pt Bold), centered contact strip with clean dot dividers (`·`).
  - Section Headings: 14pt Semi-bold Navy with full-width `1px` subtle divider bar (`#cbd5e1`) underneath.
  - Chronology: Left-aligned Job Title & Company (Bold), Right-aligned Dates & Location (Regular Muted).
  - Body Text: 10.5pt Open Sans / Georgia accents, 1.45 line-height, bullet indent `16px`.
- **Mobile Responsive View (375px+):**
  - Single column linear flow.
  - Dates snap beneath Job Title instead of right-floating.
  - Contact links convert into stacked tap-friendly tags with phone, email, and LinkedIn icons.

### Section Styling Matrix
| Section | Header Style | Entry Content Layout |
|---------|--------------|----------------------|
| **Header** | 24pt Navy `#1e3a8a` Bold | Centered name, subtitle "Senior Full Stack Engineer", contact line |
| **Summary** | 13pt Navy with underline bar | 2-3 sentence high-impact executive summary paragraph |
| **Experience** | 13pt Navy with underline bar | Company + Role, right-aligned date range, 3-4 bullet points |
| **Education** | 13pt Navy with underline bar | Degree, University name, GPA/Honors, graduation year |
| **Skills** | 13pt Navy with underline bar | Categorized comma-separated or inline bordered pills |

---

## Template 2: Creative (The Modern Innovator)

### Concept & Target User
- **Target:** UI/UX Designers, Frontend Developers, Product Managers, Content Creators, Marketers.
- **Tone:** Dynamic, visually engaging, structured modernism, portfolio-forward.
- **ATS Target Score:** **85 - 92%** (Logical DOM ordering preserved during 2-column rendering).

### Visual & Layout Architecture
- **Desktop (A4 Canvas):**
  - Layout: Asymmetric 2-column split.
    - Left Column (32% width): Light slate background tint (`#f1f5f9`), candidate profile photo/monogram, contact details, social/GitHub/portfolio links, skill level tags with Cyan `#0ea5e9` pill indicators, languages.
    - Right Column (68% width): Clean white background, bold candidate name and role title in Navy `#1e3a8a`, executive summary, experience timeline with cyan accent bullet nodes, featured project highlights with live demo links.
  - Section Separators: Minimal Cyan accent micro-bars (`3px` height, `24px` width) above section titles.
- **Mobile Responsive View (375px+):**
  - Seamless responsive collapse: Left sidebar unrolls first into an engaging candidate header banner + quick-access skill pills, followed immediately by experience and project portfolios.

### Section Styling Matrix
| Section | Left Sidebar (32%) | Right Main Area (68%) |
|---------|--------------------|-----------------------|
| **Contact & Links** | Icon + URL, GitHub, Dribbble, LinkedIn | — |
| **Skills & Tools** | Rounded cyan accent pill tags (`#e0f2fe` bg, `#0369a1` text) | — |
| **Work Experience** | — | Role (Navy bold), Company, date pill, impact bullets |
| **Featured Projects** | — | Project title with live link arrow, tech stack tags |
| **Education** | University, Degree, Year | — |

---

## Template 3: Minimal (The Swiss Monograph)

### Concept & Target User
- **Target:** Minimalists, Software Architects, Researchers, Writers, Academics.
- **Tone:** Understated elegance, typographical mastery, maximized breathing space.
- **ATS Target Score:** **98 - 100%** (Linear text, pure semantic tags, zero decorative artifacts).

### Visual & Layout Architecture
- **Desktop (A4 Canvas):**
  - Margins: Generous `28mm` all around.
  - Typography: Pure Inter typeface hierarchy. Section titles in 12pt uppercase tracking (`letter-spacing: 0.1em`), muted slate (`#64748b`).
  - Layout: Single column with left-hanging metadata timestamps (`100px` fixed left column for dates, right area for descriptions).
  - Lines: Strict absence of heavy boxes or backgrounds. Only hairline `#e2e8f0` dividers where essential.
- **Mobile Responsive View (375px+):**
  - Date column collapses above role titles.
  - Spacing tightens by 20% while retaining readability and elegance.

### Section Styling Matrix
| Element | Typography & Visual Rule |
|---------|--------------------------|
| **Name** | 28pt Inter Bold `#0f172a`, lowercase or title-case with tight tracking |
| **Section Label** | 11pt Inter Semi-bold `#64748b`, ALL CAPS, tracking `+0.12em` |
| **Role & Firm** | 13pt Inter Semi-bold `#0f172a`, followed by lightweight location meta |
| **Dates** | 11pt JetBrains Mono / Inter Regular `#64748b` |
| **Bullet Points** | Minimal dash `-` or clean round bullet with 1.6 line height |

---

## Template Comparison & Selection Guide

| Dimension | Professional | Creative | Minimal |
|-----------|--------------|----------|---------|
| **Primary Column** | 1 Column (Classic) | 2 Columns (32% / 68%) | 1 Column (Hanging dates) |
| **Primary Color** | Navy `#1e3a8a` | Navy `#1e3a8a` + Cyan `#0ea5e9` | Slate 900 `#0f172a` + Hairline Slate |
| **ATS Score** | 98% (Flawless) | 88% (Good) | 99% (Near perfect) |
| **Best For** | Corporate, Big Tech, Finance | Designers, Product, Startups | Senior Execs, Tech Leads, Academics |
| **Print / PDF Behavior** | Pixel-perfect vector A4 | High visual contrast | Ultra-clean ink-saver |
