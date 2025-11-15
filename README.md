# SkillTree

SkillTree is an interactive learning companion for students and early-career builders who want a clearer view of their growth. It combines a narrative-rich landing page with an authenticated workspace so people can visualize their skills, connect the dots between projects, and plan the next sprint with confidence.

## Overview

The experience is split into two worlds that flow together:

- **Public landing journey** – Sets the tone with story-driven sections, a tree preview, and onboarding prompts.
- **Authenticated workspace** – Unlocks a dashboard, interactive skill tree, project gallery, and AI nudges designed to keep momentum high.

## Table of Contents

1. [Key Features](#key-features)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Project Structure](#project-structure)
4. [Data & State Management](#data--state-management)
5. [Getting Started](#getting-started)
6. [Available Scripts](#available-scripts)
7. [Design Language & Motion](#design-language--motion)
8. [Product Roadmap](#product-roadmap)
9. [Contributing](#contributing)
10. [License & Contact](#license--contact)

## Key Features

- **Immersive onboarding flow** – The landing page blends narrative copy with interactive teasers so curious visitors can explore before signing in.
- **Momentum-first dashboard** – Summary cards, streak tracking, and a recommendations carousel surface the next best action each time a user logs in.
- **Interactive skill tree** – A zoomable canvas powers tactile exploration. Nodes open detail drawers, and a fullscreen mode delivers a heads-down planning space.
- **AI suggestion sidebar** – Contextual nudges recommend new branches to grow, complete with quick actions that slot into the existing skill graph.
- **Profile & project gallery** – Focus areas, external links, and milestone projects keep the system grounded in real artifacts and public proof of work.

## Architecture & Tech Stack

- **Framework** – Next.js (App Router) with React 19 and TypeScript, organized around feature folders for clarity between the marketing shell and the in-app surfaces.
- **State** – Zustand slices manage auth, skills, projects, and UI. React Query is wired up for future async integrations without a large refactor.
- **Styling & motion** – Tailwind CSS v4 provides the token system, while Framer Motion handles 2.5D depth, parallax, and micro-interactions.
- **Data layer** – The MVP relies on typed mock repositories that mirror the future Google Sheets + AI proxy stack, making the eventual backend swap straightforward.

## Project Structure

```
src/
├── app/
│   ├── (app)/        # Authenticated dashboard, tree, profile, projects
│   └── landing/      # Public marketing experience & auth entry
├── components/       # Reusable UI primitives, cards, modals, motion widgets
├── lib/              # Mock data, typed repositories, shared utilities
└── store/            # Zustand slices for auth, skills, projects, UI state
```

Each route folder owns its layout and page logic. Shared visuals and motion patterns live in `components`, while `lib` and `store` keep the data layer consistent across screens.

## Data & State Management

- **Mock data** – User profiles, skills, projects, and AI suggestions are defined in typed mocks that emulate the planned Sheets schema. This lets the team design interactions today while keeping the door open for live data tomorrow.
- **State flows** – Zustand stores centralize mutations like adding skills, toggling fullscreen mode, or tracking UI preferences. Selectors keep components lightweight and prevent prop drilling.

## Getting Started

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Launch the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to explore the landing journey. Use the mock login to slip into the workspace and test the tree interactions.

> Tailwind classes hot-reload automatically, so visual tweaks show up instantly without restarting the server.

## Available Scripts

- `npm run dev` – Start the Next.js development server with hot reloading.
- `npm run build` – Create a production-ready build.
- `npm start` – Serve the optimized build locally.
- `npm run lint` – Run ESLint using the project rules.
- `npm test` / `npm run test:watch` – Execute Vitest test suites (watch mode included).

## Design Language & Motion

SkillTree leans into a dark, futuristic palette accented by glass cards and neon gradients. Motion cues—parallax backgrounds, shimmering hover states, elastic panel transitions—add a sense of living energy. Reduced-motion preferences are respected, and all animations favor GPU-friendly transforms to keep performance smooth on mobile.

## Product Roadmap

| Phase | Focus | Status |
| --- | --- | --- |
| P0 | Landing narrative & waitlist capture | ✅ Complete |
| P1 | Interactive MVP (dashboards, skill tree, mock AI) | 🚧 In progress |
| P2 | Live data sync via Google Sheets proxy | 🔜 Planned |
| P3 | Growth features, premium templates, analytics | 🔭 Planned |

The roadmap is intentionally stacked. P1 lays the foundation with structure and motion, P2 brings live data, and P3 layers on retention loops and monetization levers.

## Contributing

SkillTree is still in incubation, and the team is crafting the experience quickly. If you have ideas or feedback, open an issue or start a thread before diving into code so we can stay aligned on the vision.

When you do submit changes:

1. Branch from `main` with a descriptive name.
2. Update or add Vitest coverage when new behavior warrants it.
3. Run `npm run lint` and `npm test` before opening a pull request.

## License & Contact

The project isn’t licensed for general use yet—distribution stays within the team until we align on launch terms. For collaboration requests or questions, reach out to Abdullah Noor directly through the contact links shared in the app.
