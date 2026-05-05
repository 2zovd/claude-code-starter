# claude-code-starter

> A Claude Code project template for Vue, Nuxt, Node, Python, and more. Drop it into a new repo and get a working, production-grade AI-augmented setup in under a minute.

[![CI](https://github.com/2zovd/claude-code-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/2zovd/claude-code-starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Template](https://img.shields.io/badge/Use%20this-Template-blue?logo=github)](https://github.com/2zovd/claude-code-starter/generate)

## What you get

- A concise `CLAUDE.md` kept under 150 lines — because [bloated CLAUDE.md files cause Claude to ignore instructions](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- An `AGENTS.md` for cross-platform AI agent context (Cursor, Copilot, and others read this too)
- Detailed standards in `agent_docs/` loaded on demand, not on every session
- Vue/Nuxt-specific patterns, composable conventions, and testing guidance
- Skills for common workflows (`/plan-implement`, `/new-component`)
- A code-reviewer subagent with read-only tools and isolated context
- Agent Teams ready — subagents coordinate across parallel sessions
- Deterministic hooks: auto-format on every edit, typecheck before every turn ends
- Two battle-tested presets with working configs, CI, and lockfiles
- Plugin-compatible structure — skills, hooks, and subagents can be packaged as a Claude Code plugin

## Presets

| Preset | Stack | Use for |
|---|---|---|
| `nuxt-app` | Nuxt 3, Pinia, VueUse, @nuxt/eslint, Vitest | SSR sites, dashboards, full-stack apps |
| `vue-vite` | Vue 3, Vite, Pinia, VueUse, @antfu/eslint-config, Vitest | SPAs, client-only tools, landing pages |
| `_empty` | None | Any other stack — see `stack-recipes/` |

## Quick start

### Option A — GitHub Template (recommended)

1. Click **"Use this template"** → Create new repository
2. Clone your new repo
3. Open Claude Code in the project root
4. Say: `Read INIT.md and bootstrap this project`
5. Claude interviews you, applies the right preset, customizes `CLAUDE.md`, cleans up

### Option B — Clone manually

```bash
git clone https://github.com/2zovd/claude-code-starter.git my-project
cd my-project
rm -rf .git && git init
# Open Claude Code and say: Read INIT.md and bootstrap this project
```

## Repository layout

```
claude-code-starter/
├── core/                        # Stack-agnostic Claude Code foundation
│   ├── CLAUDE.md                # Session context — kept under 150 lines
│   ├── agent_docs/              # Detailed standards, loaded on demand
│   │   ├── engineering-standards.md
│   │   ├── frontend-patterns.md  ← Vue/Nuxt specific
│   │   ├── project-structure.md
│   │   └── verification.md
│   └── .claude/
│       ├── agents/              # Subagents (code-reviewer)
│       ├── skills/              # Skills (/plan-implement, /new-component)
│       └── settings.example.json
│
├── presets/
│   ├── nuxt-app/                # Nuxt 3 — working, CI-verified
│   ├── vue-vite/                # Vue 3 + Vite — working, CI-verified
│   └── _empty/                  # Minimal scaffold for other stacks
│
├── stack-recipes/               # Setup guides for stacks without a preset
│   ├── node-bot.md
│   ├── python-uv.md
│   ├── astro.md
│   └── component-library.md
│
├── INIT.md                      # Bootstrap protocol — Claude reads this on first run
└── starter.yml                  # Template manifest
```

## Why this structure

**`CLAUDE.md` stays short.** It loads into every session and competes with Claude Code's ~50 built-in instructions. Longer files cause uniform degradation across all rules — the short file wins. Details live in `agent_docs/` and are read on demand.

**Presets ship with working configs.** LLMs hallucinate API surfaces and conflate library versions. Every preset is CI-verified on fresh install — no guessing, no debugging generated configs.

**Hooks enforce what CLAUDE.md can only request.** Format-on-edit and typecheck-before-done are in `settings.json` hooks, not in CLAUDE.md instructions. That makes them deterministic, not probabilistic.

**`stack-recipes/` for everything else.** If you need a stack without a preset, `_empty` + the relevant recipe gives Claude a proven procedure to follow rather than improvising.

## Adding a new preset

See [CONTRIBUTING.md](CONTRIBUTING.md). The short version: build it, verify `pnpm install && pnpm typecheck && pnpm lint && pnpm test:run` passes on a fresh clone, update `starter.yml`, open a PR.

## License

MIT — see [LICENSE](LICENSE).
