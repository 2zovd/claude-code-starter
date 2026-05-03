# Stack Recipe: Vue Component Library

> Use the `_empty` preset, then follow this recipe for publishable Vue component libraries and npm packages.

## When to use this

- Reusable Vue 3 component library
- Design system published to npm
- Shared UI package in a monorepo

## Setup procedure

### 1. Initialize

```bash
pnpm init
```

### 2. Core setup

```bash
pnpm add -D vue typescript vite @vitejs/plugin-vue vue-tsc
pnpm add -D vitest @vue/test-utils @testing-library/vue happy-dom
pnpm add -D eslint @antfu/eslint-config
```

### 3. vite.config.ts — library mode

```ts
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyLibrary',
      fileName: 'my-library',
    },
    rollupOptions: {
      // Vue must be external — consumers provide it
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
})
```

### 4. src/index.ts — public API

```ts
// Export only the public API
export { default as MyComponent } from './components/MyComponent.vue'
export type { MyComponentProps } from './types'
```

### 5. package.json key fields

```json
{
  "type": "module",
  "main": "./dist/my-library.umd.cjs",
  "module": "./dist/my-library.js",
  "exports": {
    ".": {
      "import": "./dist/my-library.js",
      "require": "./dist/my-library.umd.cjs"
    }
  },
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

### 6. Useful scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build && vue-tsc --declaration --emitDeclarationOnly",
    "typecheck": "vue-tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest",
    "test:run": "vitest run",
    "prepublishOnly": "pnpm build"
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
# Check dist/ — should contain .js, .umd.cjs, .d.ts files
ls dist/
```

## Key gotchas for CLAUDE.md

- Vue must be in `peerDependencies`, not `dependencies` — consumers provide their own Vue
- Generate `.d.ts` type declarations alongside the bundle for TypeScript consumers
- Test components in isolation — don't rely on Nuxt auto-imports
- Semantic versioning matters: breaking prop changes = major version bump
- Document every exported component's props and emits in README or Storybook
