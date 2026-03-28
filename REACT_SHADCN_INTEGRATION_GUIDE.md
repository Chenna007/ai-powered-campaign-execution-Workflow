# Glowy Waves Hero Integration Guide

This repository currently runs a static Express app (`server.js` + `public/`).
It does not currently run a React + TypeScript + Tailwind + shadcn frontend.

## What was integrated

- `components/ui/glowy-waves-hero-shadcnui.tsx`
- `components/ui/demo.tsx`

## Current default paths in this repo

- Components path: `components/ui`
- Styles path: `globals.css`

These paths match shadcn conventions.

## Why `components/ui` is important

shadcn components expect a predictable design-system location, usually `components/ui`.
Keeping this folder avoids duplicate UI primitives, keeps imports consistent, and makes future `shadcn add ...` usage cleaner.

## Required setup for this component to run

Because this repo is not a React runtime yet, you have two options.

### Option A: Migrate this repo to React/Next.js

```bash
npx create-next-app@latest flowai-ui --typescript --tailwind --eslint
cd flowai-ui
npx shadcn@latest init
npm install lucide-react framer-motion class-variance-authority @radix-ui/react-slot
```

Then copy these files from this repo:

- `components/ui/glowy-waves-hero-shadcnui.tsx`
- `components/ui/demo.tsx`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/card.tsx`
- `lib/utils.ts`
- `globals.css` styles (merge into your app globals)

### Option B: Keep static app + use this as ready-to-migrate source

Keep serving `public/index.html` for now, and use the TSX files once you move frontend to React.

## TypeScript + Tailwind + alias checks

If `tsconfig.json`, `tailwind.config.*`, or `postcss.config.*` are missing, add them via setup above.

Ensure `tsconfig.json` has alias support:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Dependencies required by this hero

- `framer-motion`
- `lucide-react`

Install command:

```bash
npm install lucide-react framer-motion
```

## Component analysis (state/hooks/arguments)

- Props: none required for `GlowyWavesHero`.
- State: internal refs for mouse and canvas animation.
- Hooks used: `useEffect`, `useRef`.
- Context providers: none required.
- Icons/assets: lucide icons only, no image assets required.

## Questions to ask before production use

- What data/props will be passed to this component?
  - Current version is self-contained with static text/stats.
- Are there any specific state management requirements?
  - Not currently; local refs are enough.
- Are there any required assets (images, icons, etc.)?
  - No images required. Icon dependency is `lucide-react`.
- What is the expected responsive behavior?
  - Full-screen hero on desktop, readable stacked content on mobile.
- What is the best place to use this component in the app?
  - Best as a landing page hero or top section of a marketing route.

## Step-by-step integration checklist

0. Copy code into `components/ui/glowy-waves-hero-shadcnui.tsx` and `components/ui/demo.tsx`.
1. Install dependencies: `npm install lucide-react framer-motion`.
2. If needed, create React + TypeScript + Tailwind + shadcn setup via CLI commands above.
3. Verify alias `@/` mapping in TypeScript config.
4. Render `<GlowyWavesHero />` from a page component.

## Unsplash assets note

Not applicable for this component because it does not use image assets.
