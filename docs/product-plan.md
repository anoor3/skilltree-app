# SkillTree Startup Build Plan

## 1. Product Milestones

| Phase | Milestone | Scope | Duration |
| --- | --- | --- | --- |
| P0 | Foundational Landing + Narrative | High-impact marketing site to capture interest, collect waitlist | Complete |
| P1 | Interactive MVP (Current Sprint) | Authenticated dashboards, skill tree builder, mock Sheets integration | 3 weeks |
| P2 | Live Data Sync | Google Sheets proxy, CRUD operations, AI suggestion service integration | 2 weeks |
| P3 | Growth & Monetization | Sharing/export, streaks, premium templates, analytics instrumentation | 4 weeks |

## 2. MVP (P1) Feature Breakdown

1. **Authentication Shell**
   - Mock Google/Email login flow with persistent session storage
   - Onboarding state to collect preferred focus areas
2. **Dashboard Overview**
   - Greeting, streaks, total skills, recommended carousel
   - Daily goals widget with progress tracking
3. **Skill Tree Workspace**
   - Interactive graph canvas (nodes, edges, zoom/pan)
   - Node CRUD (add, edit, delete) with proficiency levels and tags
   - Detail drawer (progress bar, related projects, AI tip)
   - AI suggestion sidebar (mock service + accept/apply actions)
4. **Projects Gallery**
   - Grid of linked projects with filters
   - Modal preview (media, description, linked skills, GitHub link)
5. **Profile & Settings**
   - Avatar, bio, theme toggle (dark), integration toggles (Sheets, future AR)
6. **Data Layer**
   - Zustand stores for auth, skills, projects, suggestions
   - Repository pattern abstracting mock JSON → Sheets API
   - LocalStorage persistence for session/state
7. **Motion & Visuals**
   - 2.5D animations for nodes (pulse, growth)
   - Page transitions, shimmering buttons, background parallax

## 3. Technical Architecture

- **Frontend**: Next.js App Router (React 19, TypeScript)
  - Feature-based folder structure (`/app/(auth)`, `/app/(dashboard)`, `/app/(tree)`)
  - Client components for interactive sections, server for layout/sitemap
- **State Management**: Zustand + React Query
  - Zustand slices: `auth`, `skills`, `projects`, `ui`
  - React Query for async data and future API integration (mock adapters initially)
- **UI Layer**: Tailwind CSS (v4) + custom design tokens
  - Shared components: glass cards, buttons, modals, nav bars, skill nodes
  - Motion: Framer Motion + custom hooks (parallax, floating)
- **Data Persistence**:
  - P1: Local JSON + LocalStorage (browser) for offline iteration
  - P2: Google Apps Script proxy bridging Sheets API with REST endpoints
- **AI Suggestions**:
  - P1: Rules-based mock suggestions
  - P2: External AI integration (OpenAI or Vertex) via proxy

## 4. Implementation Sprints

### Sprint 1 — Foundation (Week 1)
- [ ] Set up feature routing (`/dashboard`, `/tree`, `/projects`, `/profile`)
- [ ] Global layout with bottom nav + top header
- [ ] Build core UI primitives (buttons, badges, chips, modal, bottom sheet)
- [ ] Implement auth mock service + onboarding modal

### Sprint 2 — Skill Tree Builder (Week 1-2)
- [ ] Canvas with zoom/pan interactions
- [ ] Render skill nodes (color by proficiency) + edges (animated gradients)
- [ ] Node selection → detail drawer with editable fields
- [ ] Add Skill flow (form → node spawn animation)
- [ ] AI suggestion sidebar (apply suggestions updates tree)

### Sprint 3 — Dashboard & Projects (Week 2)
- [ ] Dashboard metrics cards + recommended carousel
- [ ] Projects grid + modal (mock data)
- [ ] Daily streak + notifications panel
- [ ] Connect data updates across tree/dashboard/projects

### Sprint 4 — Persistence & Polish (Week 3)
- [ ] LocalStorage persistence
- [ ] API abstraction layer + typed repositories
- [ ] Animations pass (transitions, shimmering buttons, parallax)
- [ ] QA: responsive checks, accessibility (focus states, keyboard nav)
- [ ] Deploy preview, smoke test, define analytics events

## 5. Risks & Mitigations

- **Performance on mobile**: Use canvas/SVG hybrid for tree, avoid heavy 3D libs. Monitor render count with React Profiler.
- **Data consistency pre-Sheets**: Keep single source via Zustand + selectors; write tests for add/edit/remove flows.
- **Animation overload**: Gate with reduced-motion and use GPU-friendly transforms.

## 6. Success Metrics

- Time-to-create skill ≤ 15 seconds (3 taps from dashboard)
- 80% of testers successfully add 3 skills + 1 project in first session
- Lighthouse performance ≥ 85 mobile, accessibility ≥ 90
- Onboarding completion rate ≥ 70%

## 7. Next Steps (Today)

1. Implement `/dashboard` layout + navigation frame
2. Build Zustand auth + ui slices
3. Create reusable UI kit components (button, card, chip, progress ring)
4. Stub tree canvas structure and mock data hooks

Once the above foundation is ready, proceed sprint-by-sprint per checklist above.
