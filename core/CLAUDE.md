# Verification Protocol

> Read when implementing changes. If you can't verify it, don't ship it.

## The rule

A change that "looks right" is not a change that works. Verification closes the loop. This is the highest-leverage practice — most failures come from confidently-wrong implementations that nobody ran.

## Verification ladder

Pick the highest applicable rung. Doing less is where bugs live.

1. **Type check passes** — necessary, not sufficient
2. **Linter passes** — same
3. **Existing tests pass** — confirms nothing was broken
4. **New tests pass** — confirms the change does what you claim (**required for new behavior**)
5. **Integration test passes** — confirms it works inside the real system
6. **Manual run with realistic input** — run it, capture the output
7. **Visual check** — for UI changes: screenshot before and after, compare

## By change type

**New component or composable:**
Write tests before declaring done. Test rendering, user interaction, and edge cases. Show test output.

**Bug fix:**
Write a failing test reproducing the bug. Confirm it fails on `main`. Apply fix. Confirm it passes. The test stays as a regression guard.

**Refactor:**
The existing test suite must pass with zero changes to test logic. If tests need to change, it's a behavior change, not a refactor.

**API / server route:**
Mock the HTTP boundary with `msw` or `vitest-fetch-mock`. Use real captured responses as fixtures. Run a real call once in dev to validate the contract.

**UI change:**
Render the component in the test environment and assert on the DOM. Take a screenshot in the browser for visual review. List visible differences.

**Performance fix:**
Measure before. Apply. Measure after. Show both. "Feels faster" is not verification.

## Anti-patterns

- "It compiles, ship it" — type-checking is not testing
- Modifying tests until they pass — if a test fails, understand why; the test is usually right
- Removing assertions to "fix" tests
- Skipping tests with `.skip` to make CI green
- Running only the test you wrote — run the full relevant suite

## How to report completion

```
Done.
- Added useCartTotal composable in src/composables/useCartTotal.ts
- 6 unit tests: base case, empty cart, discount applied, currency rounding (2 cases), negative quantity guard
- pnpm test:run → 6 passed, 0 failed
- pnpm typecheck → clean
- pnpm lint → clean
```

Vague "tests pass" without specifics is a yellow flag.

## When verification fails

State the failure clearly, propose the fix, verify the fix. If you've failed twice on the same issue: stop, `/clear`, restart with a better-scoped prompt incorporating what you learned.

---

## References

Uncomment the imports you need. Claude loads them on demand — keep this list short.

<!--
@agent_docs/engineering-standards.md
@agent_docs/frontend-patterns.md
@agent_docs/project-structure.md
-->