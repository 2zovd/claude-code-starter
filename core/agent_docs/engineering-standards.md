# Engineering Standards

> Read when working on non-trivial code or anything that will be deployed or maintained beyond this session.

## The bar

Code is deployable after a normal review — not a rewrite. These are principles with judgment, not a checklist. A 40-line script needs none of this structure; a production service needs all of it.

## Code quality

- **Clarity over cleverness.** Names carry intent. Functions do one thing. Control flow is obvious on first read.
- **Typing is mandatory.** TypeScript strict mode, no implicit `any`, explicit return types on exported functions.
- **Pure functions where possible.** Side effects localized and named honestly (`fetchUser`, `writeLog` — not `processData`).
- **No dead code.** No commented-out blocks, no "just in case" abstractions. If unused, delete.
- **Comments explain WHY.** The code shows what. Comments document intent, constraints, and decisions that won't be obvious in six months.

## Architecture

- **Separate concerns.** Data access, business logic, orchestration, and presentation are distinct layers.
- **Config is explicit and external.** Env vars for secrets, typed config objects for behavior. Never hardcode URLs or thresholds.
- **Dependencies flow inward.** Domain logic never imports from the orchestration layer.
- **Stateful or long-running code:** design for graceful shutdown, idempotent operations, and restart recovery.

## Error handling

- Design error handling before the happy path, not after.
- Distinguish **expected errors** (network blip, validation failure, 404) from **unexpected errors** (bugs, corrupted state). Handle expected errors explicitly; let unexpected errors propagate to a top-level handler that logs and fails loudly.
- Never swallow errors silently. No bare `catch {}`. Every caught error gets logged with context.
- Retry only idempotent operations. Use exponential backoff with jitter.
- **Prefer failing closed over failing open** for consequential operations. If state is uncertain, halt and alert.

## Frontend-specific

See `agent_docs/frontend-patterns.md` for Vue/Nuxt-specific guidance. Universal principles:

- Validate user input at the boundary. Trust nothing from the network or the user.
- Async operations need loading, error, and empty states — all three, always.
- Accessibility is not optional. Semantic HTML, ARIA where needed, keyboard navigation for interactive elements.
- Performance: measure before optimizing. Don't add complexity for theoretical gains.

## Testing

Match testing depth to stakes and lifespan:

- **Throwaway scripts:** sanity checks inline, tests optional.
- **Reusable utilities and composables:** unit tests for the contract and edge cases.
- **UI components:** component tests for interaction and accessibility.
- **Critical paths** (auth, payments, data mutations): unit + integration + e2e.

Principles:
- Test **behavior**, not implementation. Public contract over internals.
- Mock at the network boundary, not inside your own functions.
- Use real captured responses as fixtures — don't invent data shapes.
- Tests that need to be deleted to pass are worse than no tests.

## Security

- Secrets never in code, version control, logs, or error messages.
- Validate and sanitize all external input. Assume it's malformed.
- CSRF, XSS, injection — know which ones apply to your context and account for them.
- Separate dev and production credentials always.

## Dependencies

- Justify every dependency. Each is a liability: supply chain, bundle size, maintenance.
- Pin versions via lockfiles. Dependabot/Renovate for managed updates.
- Prefer standard library or small focused packages over monolithic frameworks where the framework isn't already in the stack.

## Refactoring

- Refactor in a separate commit from feature work.
- Keep refactors mechanical — logic changes are features, not refactors.
- Top 3–5 highest-leverage improvements in review, not an exhaustive audit. Label bugs vs style preferences clearly.
