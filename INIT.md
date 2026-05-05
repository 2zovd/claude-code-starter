# Bootstrap Protocol

> You are bootstrapping a freshly cloned `claude-code-starter` template.
> Read this file, run the interview, apply the chosen preset, customize CLAUDE.md, then delete this file.
>
> **User:** open Claude Code and say `Read INIT.md and bootstrap this project`.

---

## Step 1 — Verify state

```bash
ls -la
cat starter.yml
```

Confirm you see: `core/`, `presets/`, `stack-recipes/`, `INIT.md`, `starter.yml`.
If `CLAUDE.md` is already at the root, bootstrap already ran — stop and ask the user what they want.

---

## Step 2 — Interview

Ask these questions **one at a time**:

1. **Project name** — used in `package.json` and `CLAUDE.md`
2. **What does this project do?** — 1–2 sentences for the CLAUDE.md header
3. **Which preset?**
   - `nuxt-app` — Nuxt 3, SSR/SSG, full-stack (default for most web projects)
   - `vue-vite` — Vue 3 + Vite, SPA, client-only
   - `_empty` — any other stack (Python, Node, Astro, etc.)
4. **Project tier?**
   - Tier 1: script/prototype, days lifespan
   - Tier 2: application/tool, weeks–months (default)
   - Tier 3: production service, months–years
5. **Any project-specific gotchas?** — non-obvious things to remember across sessions (2–5 items, or skip to add later)

---

## Step 3 — Apply preset

### If `nuxt-app` or `vue-vite`:

1. Copy everything from `presets/<chosen>/` to the project root
2. Move `core/` contents to root:
   - `core/CLAUDE.md` → `./CLAUDE.md`
   - `core/AGENTS.md` → `./AGENTS.md`
   - `core/agent_docs/` → `./agent_docs/`
   - `core/.claude/` → `./.claude/` (contains `skills/`, `agents/`, `settings.example.json`)
3. Rename `.claude/settings.example.json` → `.claude/settings.json`
4. Delete: `presets/`, `core/`, `stack-recipes/`, `INIT.md`, `starter.yml`

### If `_empty`:

1. Copy `presets/_empty/` contents to root
2. Move `core/` contents to root (same as above)
3. Read `stack-recipes/<relevant>.md` if it exists — follow its procedure
4. Delete: `presets/`, `core/`, `INIT.md`, `starter.yml` (keep `stack-recipes/` if useful as reference)

---

## Step 4 — Customize CLAUDE.md

Replace placeholders using interview answers:

- `[PROJECT_NAME]` → project name from Q1
- "What this project is" → description from Q2
- Stack section → exact versions from the applied preset's `package.json`
- Verification commands → scripts from `package.json` (typecheck, lint, test:run, build)
- Gotchas section → items from Q5, or leave placeholder comment

Keep the file under 150 lines.

For personal overrides that should not be shared with the team (local paths, experimental rules), use `CLAUDE.local.md` in the project root — it is already in `.gitignore`.

Alternatively, run `/init` to let Claude generate a CLAUDE.md from codebase analysis, then merge with this template.

---

## Step 5 — Replace PROJECT_NAME placeholder

```bash
grep -r "PROJECT_NAME" . --include="*.ts" --include="*.vue" --include="*.json" --include="*.html" -l
```

Replace in each file found.

---

## Step 6 — Initialize git

```bash
git status
```

If no git repo yet:
```bash
git init
git add .
git commit -m "chore: bootstrap from claude-code-starter v0.1.0"
```

If the template's git history is still present, ask the user:
> "This repo has the template's git history. Reset to start clean? (`rm -rf .git && git init`)"
Wait for confirmation before proceeding.

---

## Step 7 — Verify

For `nuxt-app`:
```bash
pnpm install
pnpm postinstall
pnpm typecheck
pnpm lint
pnpm test:run
```

For `vue-vite`:
```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test:run
```

All must pass. Fix failures before declaring done.

Confirm template files are gone:
```bash
ls INIT.md starter.yml presets/ core/ 2>&1
```
Expected: "No such file or directory" for each. If any exist, delete them now.

Common issues:
- `pnpm` not installed → `npm install -g pnpm`
- Node version too old → need Node 20+
- Lockfile mismatch → `pnpm install --no-frozen-lockfile`

---

## Step 8 — Hand off

Tell the user:
- What preset was applied and verification results
- "Review CLAUDE.md and add real gotchas as you discover them — that section is the highest-value part."

Stop. Bootstrap is complete.
