# Contributing to claude-code-starter

Contributions welcome. Read this first to understand what fits and what doesn't.

## Core principles — non-negotiable

1. **`CLAUDE.md` stays under 150 lines.** Longer files cause Claude to ignore instructions. Details belong in `agent_docs/`.
2. **Presets must work on fresh install.** `pnpm install && pnpm typecheck && pnpm lint && pnpm test:run` must pass from a clean clone. No exceptions.
3. **Tools enforce style, not CLAUDE.md.** Linting, formatting, type-checking belong in config files and hooks — not in the session prompt.
4. **Working configs only.** No LLM-generated configs without human verification. Every preset ships with a tested lockfile.

## Types of contributions

### New preset (most valuable)

1. Open an issue to confirm fit before building
2. Create `presets/<name>/` with a complete, working setup
3. Verify: `pnpm install && pnpm typecheck && pnpm lint && pnpm test:run && pnpm build` from a fresh clone
4. Update `starter.yml` to register the preset
5. Update `INIT.md` Step 3 to include the new preset as an option
6. Add a `CHANGELOG.md` entry under Unreleased
7. Open a PR with the verification output pasted

### New or improved stack recipe

Recipes in `stack-recipes/` are markdown guides Claude follows when using `_empty`. A good recipe:
- Provides exact commands (not "install dependencies somehow")
- Lists key gotchas for `CLAUDE.md` at the bottom
- Ends with a clear verification chain

### Improvements to `core/`

Changes to `agent_docs/` or `.claude/` should be broadly applicable — not specific to one project or stack. Cite sources for factual claims. Lean toward removing over adding.

### Bug fixes

Most valuable bugs: a preset's verification chain fails on a fresh clone, or INIT.md bootstrap leaves the project broken.

## What we won't accept

- Adding style guidelines to `CLAUDE.md` that a linter should handle
- Presets with `node_modules` committed or missing lockfiles
- Stack recipes that rely on third-party services to install
- Changes that push `CLAUDE.md` past 150 lines

## Versioning

- **MAJOR**: breaking change to bootstrap protocol or file layout
- **MINOR**: new preset, new recipe, new agent_doc
- **PATCH**: fixes, dependency bumps, documentation

## License

By contributing, you agree your contributions are licensed under MIT.
