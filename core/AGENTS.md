# AGENTS.md

> Cross-platform context file for AI coding agents (Claude Code, Cursor, Copilot, etc.).
> Keep this file short and factual. Replace all placeholders before committing.

## Project

**Name:** [PROJECT_NAME]
**Description:** [One sentence — what this project does and who uses it]
**Stack:** [e.g. Nuxt 3 · TypeScript · Pinia · Vitest]

## Repository layout

```
[Paste the output of: find . -maxdepth 2 -not -path '*/node_modules/*' -not -path '*/.git/*' | sort]
```

Key directories:
- `src/` or `pages/` — application code
- `server/` — API routes (Nuxt) or backend
- `tests/` — test files co-located or in dedicated directory
- `agent_docs/` — detailed standards, loaded on demand

## Commands

```bash
pnpm install       # install dependencies
pnpm dev           # start dev server
pnpm typecheck     # TypeScript check
pnpm lint          # lint
pnpm lint:fix      # lint + auto-fix
pnpm test:run      # run tests once
pnpm build         # production build
```

## Conventions

- Language: TypeScript strict mode throughout
- Components: `<script setup lang="ts">`, scoped styles, typed props/emits
- State: Pinia stores, one store per domain
- Tests: Vitest + @vue/test-utils, co-located with source files
- Commits: conventional commits (`feat:`, `fix:`, `chore:`)

## Non-obvious constraints

[List 2–5 project-specific gotchas an AI agent must know. Examples:]
- [e.g. All API routes must validate input with zod before processing]
- [e.g. Do not use `v-html` — XSS risk with user content]
- [e.g. Environment variables must be declared in nuxt.config.ts runtimeConfig]

## Verification chain

Before declaring any change done, confirm this passes:

```bash
pnpm typecheck && pnpm lint && pnpm test:run
```
