# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Environment

Set `GEMINI_API_KEY` in `.env.local` (referenced in vite.config.ts, exposed as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`).

## Architecture

React 19 + TypeScript + Vite application featuring an interactive 3D particle hero section.

### Entry Flow
`index.html` → `index.tsx` → `App.tsx` → `Hero.tsx` → `ParticleLogo.tsx`

### Core Components

**ParticleLogo.tsx** - The 3D particle system (react-three-fiber + three.js):
- 7500 instanced particles forming an organic "N" shape
- Particles distributed along a CatmullRom spline (`LOGO_POINTS`) with variable width (`LOGO_WIDTHS`)
- 40% outline particles (brighter, smaller, more stable) + 60% fill particles
- Animation effects: "thinking" jitter, "breathing" flow wave, mouse repulsion with swirl
- Uses `instancedMesh` with per-particle position/scale updates in `useFrame`

**Hero.tsx** - Marketing hero section with:
- 3D background layer (ParticleLogo via Suspense)
- Overlaid content: heading, CTA buttons, feature grid
- Tailwind CSS styling with emerald accent colors

### Key Technical Details

- Path alias: `@/` maps to project root
- Tailwind loaded via CDN in index.html (no config file)
- Particles use additive blending with custom canvas texture for glow effect
- Mouse interaction calculates distance in 3D space and applies physics-based forces
