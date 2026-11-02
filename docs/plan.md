# PortoCraft - Development Plan & Task Breakdown

**Timeline:** Phase 1 (MVP) - 8 weeks  
**Team:** 5 people (1 backend + 4 frontend)

---

## Phase 1: Foundation (Weeks 1-2)

### Week 1: Setup & Design Foundation

#### Anggrea (Design Lead) - 40h
- [x] Finalize design system (colors, typography, spacing verified)
- [x] Create design tokens file (Figma / design-system.md / design-tokens.json)
- [x] Design 3 template mockups (Professional, Creative, Minimal) - desktop + mobile
- [x] Design key pages:
  - Landing page
  - Template gallery
  - CV builder (2-column layout)
  - Dashboard / My projects
- [x] Design components: Header, Footer, Navigation
- [x] Create component library & high-fidelity HTML/CSS mockups
- **Deliverable:** Design system + 5 high-fi mockups (Completed)

#### Cici (Component Dev) - 40h
- [ ] Setup React + Vite + Tailwind project
- [ ] Create folder structure (`/src/components`, `/src/pages`, `/src/hooks`)
- [ ] Implement design tokens as Tailwind config
- [ ] Build base components:
  - Button (Primary, Secondary, Danger)
  - Input (text, email, textarea)
  - Card
  - Modal
  - Tabs
  - Dropdown
- [ ] Create Storybook (optional but recommended)
- **Deliverable:** Working component library + demo

#### Faiz (Pages & Routing) - 40h
- [ ] Setup React Router v6
- [ ] Create page structure:
  - `/` - Landing page
  - `/templates` - Template gallery
  - `/builder/:id` - CV builder (empty shell)
  - `/dashboard` - My projects
  - `/settings` - Settings (future)
- [ ] Implement navigation & routing logic
- [ ] Setup basic layout shell (header, footer, sidebar if needed)
- **Deliverable:** Working routing + empty pages

#### Fahri (Integration & State) - 40h
- [ ] Design backend API contracts (endpoints, request/response)
- [ ] Setup Zustand store (user, cv data, ui state)
- [ ] Create API client layer (axios / fetch wrapper)
- [ ] Setup localStorage for local save
- [ ] Create auth flow skeleton (login/signup pages - minimal)
- [ ] Integrate with Riski's backend endpoints (stub/mock first)
- **Deliverable:** Working API layer + state management

#### Riski (Backend) - Solo
- [x] Setup backend project (Node.js / Express / Supabase)
- [x] Create database schema (users, cvs, projects)
- [x] Implement auth (JWT / session)
- [x] Create API endpoints (stub):
  - POST /auth/login, /auth/signup
  - GET /users/:id
  - POST /cvs, GET /cvs/:id, PUT /cvs/:id, DELETE /cvs/:id
  - POST /cvs/:id/save-progress
- [x] Setup file storage for PDF exports
- [x] Create basic logging & error handling
- **Deliverable:** Working backend with auth + CRUD endpoints

---

## Phase 2: Template Gallery & Builder Shell (Weeks 3-4)

### Week 3: Template Data & Gallery UI

#### Anggrea - 20h
- [ ] Finalize all 3 template designs (detailed specs for each)
- [ ] Define template JSON schema (fields, structure)
- [ ] Create template preview images

#### Cici - 30h
- [ ] Build Template Gallery page
  - Card component for each template
  - Filter/sort (future-proofing)
  - Click-to-use button
- [ ] Implement template preview modal
- [ ] Ensure responsive design (mobile-first)

#### Faiz - 30h
- [ ] Connect gallery to router
- [ ] Create template data structure (JSON or DB)
- [ ] Implement template selection flow
- [ ] Redirect to builder with template pre-selected

#### Fahri - 20h
- [ ] Store selected template in Zustand store
- [ ] API call to fetch templates from backend
- [ ] Mock template data if backend not ready

#### Riski - 20h
- [ ] Create templates table in database
- [ ] Implement GET /templates endpoint
- [ ] Seed 3 templates into database

**Deliverable:** Clickable template gallery → leads to builder

### Week 4: CV Builder Layout (2-Column)

#### Anggrea - 10h
- [ ] Design detailed CV builder layout (form left, preview right)
- [ ] Design each section form (Header, Summary, Experience, etc)
- [ ] Create section add/remove/reorder UI

#### Cici - 40h
- [ ] Build CV builder container (2-column layout)
- [ ] Build form components per section:
  - Header section (name, email, phone, location)
  - Summary section (textarea)
  - Experience section (repeatable fields)
  - Education section (repeatable fields)
  - Skills section (tag list)
  - Projects section (repeatable)
- [ ] Build section toolbar (add, remove, reorder)
- [ ] Implement field validation

#### Faiz - 30h
- [ ] Integrate sections into builder page
- [ ] Implement add/remove section logic
- [ ] Implement reorder sections (drag-and-drop or buttons)
- [ ] Real-time update Zustand store on input change

#### Fahri - 30h
- [ ] Implement save button → persist to Zustand
- [ ] Implement auto-save (every 30 seconds)
- [ ] Persist to localStorage
- [ ] API call to backend save endpoint (POST /cvs/:id/save-progress)
- [ ] Implement loading state + error handling

#### Riski - 20h
- [ ] Implement POST /cvs/:id/save-progress endpoint
- [ ] Validate data before saving
- [ ] Return confirmation + timestamp

**Deliverable:** Full working CV builder (form + save)

---

## Phase 3: Preview & Export (Weeks 5-6)

### Week 5: Live Preview System

#### Anggrea - 10h
- [ ] Design CV preview (right column should match template design)
- [ ] Specify styling per template

#### Cici - 30h
- [ ] Build CV preview component
  - Takes CV data + template from Zustand
  - Renders formatted CV (matches template design)
  - Real-time update as user types
- [ ] Implement 3 template preview styles
- [ ] Add template switcher (live preview change)

#### Faiz - 20h
- [ ] Connect preview to builder form
- [ ] Ensure preview updates on every input change

#### Fahri - 10h
- [ ] Handle template data in state
- [ ] Ensure data flows correctly to preview

**Deliverable:** Real-time CV preview in builder

### Week 6: Export to PDF

#### Cici - 30h
- [ ] Integrate PDF library (jsPDF + html2canvas OR react-pdf)
- [ ] Build export button & modal
- [ ] Implement HTML → PDF conversion
- [ ] Test PDF quality & formatting

#### Fahri - 20h
- [ ] Implement POST /export endpoint (backend PDF generation - optional)
- [ ] Or: Handle client-side PDF generation
- [ ] Test file download + naming

#### Riski - 10h
- [ ] Optional: Implement backend PDF generation (for consistency)
- [ ] Setup file storage (AWS S3 / local)

**Deliverable:** Click "Export PDF" → download formatted PDF

---

## Phase 4: AI Auto-Write & ATS Checker (Weeks 7-8)

### Week 7: AI Auto-Write Feature

#### Anggrea - 5h
- [ ] Design AI modal (input form + 3 option cards)
- [ ] Design loading state

#### Cici - 25h
- [ ] Build AI Auto-Write modal component
- [ ] Build 3 option cards (diff text)
- [ ] Build select/edit flow

#### Faiz - 15h
- [ ] Add "Generate with AI" button to sections
- [ ] Implement modal trigger flow
- [ ] Handle option selection → insert to form

#### Fahri - 25h
- [ ] Implement POST /ai/generate endpoint call
- [ ] Handle 3 options returned from backend
- [ ] Update Zustand store with selected text

#### Riski - 40h
- [ ] Integrate LLM API (OpenAI / Hugging Face)
- [ ] Create prompt templates per section
- [ ] Implement POST /ai/generate endpoint
- [ ] Return 3 option variations
- [ ] Test quality + edge cases

**Deliverable:** Working AI Auto-Write (tested with real data)

### Week 8: ATS Checker

#### Anggrea - 5h
- [ ] Design ATS result card (score + issue list)
- [ ] Design severity indicators (color-coded)

#### Cici - 20h
- [ ] Build ATS Checker button + result modal
- [ ] Build score card + issue list display
- [ ] Build recommendation cards

#### Fahri - 20h
- [ ] Implement POST /ats-check endpoint call
- [ ] Display results in UI
- [ ] Handle loading + error states

#### Riski - 30h
- [ ] Implement ATS validation logic
- [ ] Check: font compatibility, spacing, formatting, keywords
- [ ] Return score (0-100) + list of issues
- [ ] Provide actionable recommendations

**Deliverable:** Working ATS Checker (tested)

---

## Summary by Role

### Anggrea (Design Lead) - Total ~150h
- Week 1: Design system + 5 mockups (Completed)
- Week 3: Template specs + images
- Week 4: CV builder layout design
- Week 5: Preview design
- Week 7: AI modal design
- Week 8: ATS result design
- **Ongoing:** Design reviews, component QA, pixel-perfect verification

### Cici (Component Dev) - Total ~180h
- Week 1: Setup + base components + Storybook
- Week 3: Template gallery
- Week 4: CV sections + toolbar
- Week 5: CV preview
- Week 6: PDF export
- Week 7: AI modal UI
- Week 8: ATS checker UI
- **Ongoing:** Component refinement, testing

### Faiz (Pages & Routing) - Total ~140h
- Week 1: Routing setup + page shells
- Week 3: Gallery flow
- Week 4: Builder sections + reorder
- Week 5: Preview integration
- Week 6: Export button
- Week 7: AI modal trigger
- Week 8: ATS button + results display
- **Ongoing:** UX flow testing

### Fahri (Integration & State) - Total ~160h
- Week 1: State + API layer + auth
- Week 3: Gallery API
- Week 4: Save progress + auto-save
- Week 5: Preview state
- Week 6: Export API
- Week 7: AI generate API
- Week 8: ATS check API
- **Ongoing:** Error handling, edge cases, data validation

### Riski (Backend) - Total ~160h
- Week 1: Backend setup + DB + auth + stub APIs (Completed)
- Week 3: Templates endpoint
- Week 4: Save progress endpoint
- Week 6: File storage setup
- Week 7: AI integration (40h)
- Week 8: ATS logic (30h)
- **Ongoing:** API refinement, testing, documentation

---

## Critical Path & Dependencies

```
Week 1 (Foundation):
  - Anggrea design → Cici components → Faiz pages
  - All depend on Riski backend auth working

Week 3-4 (Builder):
  - Anggrea template design → Cici gallery UI → Faiz routing
  - Riski templates endpoint required

Week 5-6 (Preview & Export):
  - Cici preview depends on Faiz integration
  - Riski PDF endpoint helpful but not blocking (can do client-side)

Week 7-8 (AI & ATS):
  - Riski AI integration is the bottleneck (longest lead time)
  - Frontend can start UI while backend works
```

---

## Checkpoints & Reviews

**Weekly Sync (Every Monday):**
- Demo progress
- Flag blockers
- Adjust next week's tasks

**Code Review:**
- Faiz reviews Cici's components before integration
- Fahri reviews Faiz's page integration
- All review Riski's backend before using

**QA Gate (End of Week):**
- No console errors
- Components match design
- All APIs working
- No data loss on refresh

---

## Definition of Done

A feature is done when:
- [x] Code complete + tested (unit tests optional, manual OK)
- [x] Matches design spec pixel-perfectly
- [x] All APIs connected + working
- [x] Data persists correctly
- [x] No console errors / warnings
- [x] Mobile responsive (375px+)
- [x] Peer review approved
- [x] Deployed to staging (optional)
