import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  rules: {
    // Prevent v-html with user content (XSS risk)
    'vue/no-v-html': 'warn',
    // Require multi-word component names to avoid HTML element conflicts
    'vue/multi-word-component-names': 'error',
  },
})
