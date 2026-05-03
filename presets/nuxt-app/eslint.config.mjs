// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Enforce script-first SFC block order
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    // Prevent v-html with user content (XSS risk)
    'vue/no-v-html': 'warn',
    // Disabled for Nuxt: pages/index.vue, layouts/default.vue are single-word by convention
    'vue/multi-word-component-names': 'off',
  },
})
