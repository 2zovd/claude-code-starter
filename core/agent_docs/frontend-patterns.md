# Frontend Patterns

> Vue and Nuxt specific conventions. Read when working on component architecture, composables, routing, state management, or SSR.

## Vue 3 composition API

- **`<script setup>`** is the default. Options API only in legacy code or external constraints.
- **Props are typed** via `defineProps<Props>()` with explicit interface — no runtime-only declarations.
- **Emits are typed** via `defineEmits<Emits>()`.
- **`defineModel()`** for two-way binding — not manual `props` + `emit('update:...')`.
- **Template refs** typed: `const el = ref<HTMLDivElement | null>(null)`.
- Destructure props only inside `toRefs()` or `withDefaults()` — raw destructuring breaks reactivity.

```ts
// Good
const props = withDefaults(defineProps<{ label: string; count?: number }>(), { count: 0 })

// Bad — breaks reactivity
const { label, count } = defineProps<{ label: string }>()
```

## Composables

- One composable = one concern. `useAuth`, `useCart`, `useUserPreferences` — not `useApp`.
- Return reactive state and action functions. Avoid returning raw refs from composables that have side effects.
- Prefix with `use` always.
- Clean up side effects in `onUnmounted` (event listeners, subscriptions, timers).
- Composables with async initialization handle their own loading/error state internally.

```ts
// Pattern: self-contained async composable
export function useMarkets() {
  const markets = ref<Market[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      markets.value = await fetchMarkets()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }

  return { markets: readonly(markets), loading: readonly(loading), error: readonly(error), fetch }
}
```

## Component design

- **Single responsibility.** A component does one thing. If you're passing more than 5 props, consider splitting.
- **Presentational vs container separation.** Pure UI components receive data via props and emit events. Smart components (containers, pages) fetch data and manage state.
- **Slots over props** for content composition. Slots scale better than boolean props like `showHeader`.
- **Name components** with two+ words to avoid HTML element conflicts: `UserCard`, `AppHeader`, not `Card`, `Header`.

## Pinia stores

- One store = one domain: `useAuthStore`, `useCartStore`, not one god `useAppStore`.
- Keep actions async-aware: loading and error state managed in the store, not in components.
- `$reset()` in stores that need to be cleared on logout or navigation.
- Use `storeToRefs()` when destructuring reactive state from a store.

```ts
// Good
const { user, isLoggedIn } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()

// Bad — breaks reactivity
const { user, isLoggedIn, logout } = useAuthStore()
```

## Nuxt-specific

**Data fetching:**
- `useFetch` / `useAsyncData` for SSR-safe requests. Never `fetch()` directly inside `<script setup>` at the top level.
- `$fetch` inside event handlers, actions, server routes — where SSR context doesn't apply.
- `lazy: true` for non-critical data that shouldn't block rendering.

**Auto-imports:**
- Nuxt auto-imports composables from `composables/`, components from `components/`, utilities from `utils/`.
- Don't manually import what Nuxt already provides: `ref`, `computed`, `useRoute`, `useRouter`, `useFetch`.
- Explicit imports in non-Nuxt code (tests, standalone scripts).

**Server routes:**
- `/server/api/` for API endpoints, `/server/middleware/` for middleware.
- Type request/response explicitly. Use `H3Event` from `h3`.
- Never access the database or secrets in client-side code — server routes only.

**Routing:**
- File-based routing. Name conventions: `index.vue` (root), `[id].vue` (param), `[...slug].vue` (catch-all).
- `navigateTo()` for programmatic navigation, not `useRouter().push()` (works in both client and server).
- Route middleware in `middleware/` directory, named clearly: `auth.ts`, `admin.ts`.

**Rendering modes:**
- Default: SSR. Use `<ClientOnly>` wrapper for browser-only components (charts, maps, WebGL).
- `ssr: false` in `nuxt.config` for SPA mode — only when SSR provides no value.

## Styling

- Scoped styles by default: `<style scoped>`. Global styles only in `assets/` with explicit import.
- CSS custom properties for theming — don't hardcode values that might change.
- Avoid deep selectors (`:deep()`) except for third-party component overrides.
- Mobile-first responsive design.

## Testing Vue components

- Use `@vue/test-utils` (or `@nuxt/test-utils` in Nuxt).
- Test from the user's perspective: what the component renders and how it responds to interaction.
- Don't test implementation details (internal state, private methods).
- Use `wrapper.find('[data-testid="..."]')` for test-specific selectors — keeps tests stable against style changes.

```ts
// Test behavior, not implementation
it('shows error message when login fails', async () => {
  server.use(http.post('/api/login', () => HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })))
  const wrapper = mount(LoginForm)
  await wrapper.find('[data-testid="email"]').setValue('test@example.com')
  await wrapper.find('[data-testid="password"]').setValue('wrong')
  await wrapper.find('[data-testid="submit"]').trigger('click')
  await flushPromises()
  expect(wrapper.find('[data-testid="error"]').text()).toBe('Invalid credentials')
})
```

## Performance

- `defineAsyncComponent()` for heavy components not needed on initial load.
- `v-memo` for lists with expensive render logic.
- `shallowRef` for large objects that don't need deep reactivity.
- Don't prematurely optimize. Measure with Vue DevTools or browser profiler first.
