# Changelog

All notable changes will be documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Planned for v0.2
- `python-uv` preset (Python 3.11+, uv, ruff, mypy, pytest, structlog, Pydantic v2)
- `/upgrade-template` slash command for pulling template improvements into existing projects
- Browser extension recipe (`stack-recipes/browser-extension.md`)

### Planned for v0.3
- Storybook integration for `vue-vite` and `nuxt-app` presets (optional add-on)
- `component-library` preset (currently a recipe only)

---

## [0.1.0] — 2026-05-02

Initial release.

### Added

**Core (`core/`)**
- `CLAUDE.md` — concise session context template, under 150 lines
- `agent_docs/engineering-standards.md` — code quality principles and error handling
- `agent_docs/frontend-patterns.md` — Vue 3 / Nuxt patterns, composables, testing
- `agent_docs/project-structure.md` — three-tier layout system
- `agent_docs/verification.md` — verification protocol
- `code-reviewer` subagent with read-only tools
- `/plan-implement` slash command
- `/new-component` slash command (Vue/Nuxt-specific)
- `settings.example.json` — hooks: auto-format on edit, typecheck before turn ends

**Presets**
- `nuxt-app` — Nuxt 3, Pinia, VueUse, @nuxt/eslint, Vitest, GitHub Actions CI
- `vue-vite` — Vue 3, Vite, Pinia, VueUse, @antfu/eslint-config, Vitest, GitHub Actions CI
- `_empty` — minimal scaffold for non-standard stacks

**Stack recipes (`stack-recipes/`)**
- `node-bot.md` — Node.js bots and automation scripts
- `python-uv.md` — Python ML/data projects
- `astro.md` — Astro content sites
- `component-library.md` — Vue component libraries

**Bootstrap**
- `INIT.md` — interactive bootstrap protocol for Claude Code
- `claude-code-starter.yml` — template manifest

**Repo infrastructure**
- MIT license
- `.gitignore`, `.editorconfig`, `.gitattributes`
- GitHub Actions CI (validates template structure + CLAUDE.md line count)
- PR template, bug report and feature request issue templates
- `CONTRIBUTING.md`
- `CHANGELOG.md`, `ROADMAP.md`
