# Stack Recipe: Node.js Bot / Automation Script

> Use the `_empty` preset, then follow this recipe for bots, automation scripts, CLI tools, and server-side TypeScript without a frontend framework.

## When to use this

- Polymarket bots, trading automation
- CLI tools and scripts
- Backend services without a frontend
- Automation pipelines

## Setup procedure

### 1. Initialize

```bash
pnpm init
```

Edit `package.json`:
```json
{
  "type": "module",
  "engines": { "node": ">=20.0.0", "pnpm": ">=9.0.0" }
}
```

### 2. TypeScript

```bash
pnpm add -D typescript @types/node tsx
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

### 3. Linting

```bash
pnpm add -D @biomejs/biome
pnpm biome init
```

Use Biome (not ESLint) for Node.js projects — faster, no Vue SFC parsing needed.

### 4. Testing

```bash
pnpm add -D vitest
```

### 5. Logging and validation

```bash
pnpm add pino zod
pnpm add -D pino-pretty
```

### 6. Useful scripts

```json
{
  "scripts": {
    "dev": "tsx watch src/main.ts",
    "build": "tsc -p tsconfig.build.json",
    "typecheck": "tsc --noEmit",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

### 7. Project structure (Tier 2)

```
src/
  main.ts           # entry point
  lib/
    logger.ts       # pino setup
    config.ts       # Zod-validated env config
  [domain]/         # business logic
tests/
.env.example
```

## Verification chain

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test:run
```

## Key gotchas for CLAUDE.md

- Biome's `noDelete` rule fires on `delete process.env.X` — use `vi.stubEnv()` in tests instead
- Empty strings from env are not `undefined` — normalize before passing to Zod: `value || undefined`
- `tsx` for dev/scripts, compile to `dist/` for production
