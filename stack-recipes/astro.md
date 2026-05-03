# Stack Recipe: Astro Content Site

> Use the `_empty` preset, then follow this recipe for blogs, documentation sites, portfolios, and content-heavy sites.

## When to use this

- Personal blog or portfolio
- Documentation site
- Marketing/landing pages with lots of content
- Any site where SEO and static generation matter more than interactivity

## Setup procedure

### 1. Initialize

```bash
pnpm create astro@latest . -- --template minimal --typescript strict --no-git --no-install
```

### 2. Add Vue integration (optional — if you need interactive components)

```bash
pnpm astro add vue
```

### 3. Add Tailwind (optional)

```bash
pnpm astro add tailwind
```

### 4. Linting

```bash
pnpm add -D eslint @antfu/eslint-config
```

`eslint.config.mjs` — same as `vue-vite` preset.

### 5. Testing

Astro uses Vitest for unit tests and Playwright for e2e:
```bash
pnpm add -D vitest @astrojs/check
```

### 6. Useful scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "typecheck": "astro check",
    "lint": "eslint .",
    "test:run": "vitest run"
  }
}
```

## Verification chain

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test:run
pnpm build
```

## Key gotchas for CLAUDE.md

- `.astro` files use a different syntax than `.vue` — frontmatter in `---` fences
- Islands architecture: add `client:load` or `client:visible` for interactive Vue components
- Content Collections API for type-safe markdown content
- `astro check` for TypeScript checking (not `tsc`)
- Static output by default — add `output: 'server'` for SSR
