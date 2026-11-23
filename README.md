# vibe-template

A React + TypeScript template powered by Vite, Tailwind CSS, and shadcn/ui components.

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Available scripts

- `npm run dev` - start Vite in development mode
- `npm run build` - create a production build
- `npm run build:dev` - create a development-mode build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks
- `npm run test` - run Vitest tests once
- `npm run test:watch` - run Vitest in watch mode

## Static prerendering (SEO)

`npm run build` runs three steps: the client build, an SSR build of
`src/entry-server.tsx` (to `dist-ssr/`), then `scripts/prerender.mjs`, which
renders every route in `ROUTES` with the real React components and writes
`dist/<route>/index.html` with full head tags, JSON-LD and body HTML. The
browser hydrates that HTML (`src/main.tsx`). To add a page, add a route in
`src/App.tsx` and make sure it is listed in `ROUTES`. The host must serve
`/<slug>` from `dist/<slug>/index.html` (most static hosts do; `vite preview`
does not without a trailing slash).

## Verification commands

Use these to verify repository health:

```bash
npm run lint
npm run test
npm run build
npx tsc --noEmit
```

## Lockfile policy

This repository does not track `package-lock.json`.
