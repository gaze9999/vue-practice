<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<script setup lang="ts">
  // Default layout component
  // This wraps all pages that don't specify a different layout
  definePageMeta({
    layout: 'default',
  })
</script>

<style scoped>
  .default-layout {
    min-height: 100vh;
  }
</style>
