---
name: new-component
description: Scaffold a new Vue component with proper TypeScript, tests, and documentation. Usage: /new-component ComponentName [description]
disable-model-invocation: true
---

# /new-component $ARGUMENTS

Parse arguments: first word is the component name (PascalCase), rest is the description.

## 1. Clarify scope (if needed)

If the component purpose is unclear, ask ONE question before continuing.

Otherwise proceed with these assumptions:
- `<script setup>` with TypeScript
- Scoped styles
- Props documented with types
- Emits documented with types

## 2. Check placement

Read `CLAUDE.md` for the project layout. Determine the right directory:
- Shared/reusable UI → `components/`
- Page-level component → `pages/` (Nuxt) or `views/` (Vue+Vite)
- Layout component → `layouts/`

## 3. Create the component

```vue
<script setup lang="ts">
// Props, emits, composables, logic
</script>

<template>
  <!-- Semantic HTML, data-testid on interactive elements -->
</template>

<style scoped>
/* Component-specific styles */
</style>
```

Requirements:
- All props typed via `defineProps<Props>()`
- All emits typed via `defineEmits<Emits>()`
- Loading + error + empty states if async data is involved
- `data-testid` attributes on interactive elements

## 4. Create the test file

Place at `[same path]/ComponentName.test.ts`.

Test:
- Renders with default/required props
- Interactive behavior (clicks, inputs)
- Conditional rendering (loading, error, empty states)
- Emitted events

## 5. Verify

```bash
pnpm typecheck
pnpm lint
pnpm test:run [path to test file]
```

Show output. All must pass.

## 6. Report

State: component location, test location, what tests cover.
