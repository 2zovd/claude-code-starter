# Project Structure

> Read when starting a new module or deciding how to organize code.

## Match structure to lifespan

Don't impose full structure on scripts. Don't leave services as loose files. When starting, state which tier you're targeting and why.

---

## Tier 1 — Script / prototype

Single file, <200 lines, lifespan hours to days. No build system, inline config, tests optional. Promote when it survives past a week.

---

## Tier 2 — Application / tool

Structured layout, CI, tests required. Most web projects live here.

**Nuxt app:**
```
pages/              # file-based routes
components/         # shared UI components
composables/        # shared composable logic
stores/             # Pinia stores
layouts/            # layout components
middleware/         # route middleware
server/
  api/              # API endpoints
  middleware/       # server middleware
  utils/            # server-only utilities
assets/             # processed by Vite (CSS, images)
public/             # served as-is
utils/              # shared pure utilities (auto-imported)
types/              # TypeScript type definitions
```

**Vue + Vite SPA:**
```
src/
  components/       # shared UI components
  composables/      # reusable logic
  router/           # Vue Router config and guards
  stores/           # Pinia stores
  views/            # route-level components (pages)
  assets/           # CSS, images
  types/            # TypeScript interfaces
  utils/            # pure utility functions
  main.ts           # entry point
  App.vue           # root component
```

---

## Tier 3 — Production service

Full structure with ops concerns: Docker, deploy config, runbook. Add when Tier 2 is deployed and needs monitoring/recovery docs.

---

## Naming conventions

- **Components:** PascalCase (`UserCard.vue`, `AppHeader.vue`)
- **Composables:** camelCase, `use` prefix (`useAuth.ts`, `useCart.ts`)
- **Stores:** camelCase, `use` prefix + `Store` suffix (`useAuthStore.ts`)
- **Utils:** camelCase, descriptive (`formatDate.ts`, `validateEmail.ts`)
- **Types:** PascalCase for interfaces and types, `*.types.ts` for type-only files

## Promotion path

Promote tier when:
- Tier 1 → Tier 2: other people depend on it, or it runs in production
- Tier 2 → Tier 3: it's deployed, runs unattended, and needs a runbook

Don't pre-promote. Complexity should be earned, not anticipated.
