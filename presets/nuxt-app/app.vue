<script setup lang="ts">
// Global app setup — metadata, layouts, error handling
useHead({
  titleTemplate: title => title ? `${title} — PROJECT_NAME` : 'PROJECT_NAME',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
