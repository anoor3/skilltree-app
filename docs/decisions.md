# SkillTree MVP Decisions

## Platform & Stack
- **Frontend:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS with custom theme extensions for gradients, glassmorphism, and neon accents
- **State Management:** Zustand for global client state and React Query (TanStack Query) for data fetching/cache
- **Build Tooling:** ESLint + Prettier (via Next defaults); testing via Vitest + React Testing Library (to be added)

## Visual & Animation Direction
- **Animation Depth:** 2.5D layered composition using CSS transforms, Framer Motion, and SVG/Canvas for node links
- **3D Assets:** Pre-rendered/illustrated 3D icons (static) with motion parallax rather than real-time orbit controls
- **Motion Principles:** Ease-in-out curves, floating parallax, shimmer on hover, elastic slide-in for panels

## Backend Strategy
- **Primary Data Source:** Google Sheets API (Skills, Projects, Users sheets)
- **Integration Layer:** Serverless proxy (Google Apps Script) scheduled for v1.1
- **MVP Data:** Local JSON mocks wrapped in a repository layer; hook interfaces ready for live swap
- **Auth:** Placeholder auth flow (mock) with Google/Email buttons; full OAuth integration deferred

## MVP Scope (Interactive)
1. Splash/Login screen with gradient hero and CTA buttons
2. Dashboard summary with streaks, skill count, and recommended carousel (mock data)
3. Skill Tree canvas with clickable nodes and detail drawer modal
4. Add Skill modal updating local state and animating node addition
5. Projects grid with detail modal linking to external URLs
6. AI Suggestions sidebar populated from mock AI service

## Deferred Features (Static/Placeholder)
- Export/share mechanics
- AR preview teaser
- Real-time AI inference
- Google Sheets live sync & CRUD (read-only mock for demo)

## Theme
- Dark Futuristic theme for MVP (light theme reserved for v1.1)

## Performance Targets
- Keep bundle modular via feature-based routing and dynamic imports where appropriate
- Target Lighthouse Performance ≥ 85 on mobile with mock data
- Ensure 60fps animations on modern mobile browsers using transform/opacity transitions
