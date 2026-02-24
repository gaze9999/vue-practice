<template>
  <div class="grid grid-cols-[240px_1fr] min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="bg-gray-900 text-blue-50 flex flex-col p-6">
      <div class="mb-7">
        <span class="text-lg font-bold block">新聞系統</span>
        <span class="text-xs text-blue-50/70 mt-1.5 block">News Aggregation System</span>
      </div>
      
      <nav class="flex flex-col gap-2.5">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-2.5 rounded-lg bg-white/8 text-sm transition-colors hover:bg-white/15 [&.router-link-active]:bg-white/20"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      
      <div class="mt-auto text-xs text-blue-50/70">
        <p class="m-0">多平台新聞 API 整合展示</p>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 px-8 py-3 bg-blue-50 border-b border-blue-100 text-xs">
        <NuxtLink to="/projects" class="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          ◄ 返回專案
        </NuxtLink>
        <span class="text-blue-300">/</span>
        <span class="text-gray-900 font-semibold">新聞系統</span>
      </nav>

      <!-- Content Area -->
      <section class="flex-1 p-8">
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const navLinks = [
  { to: '/projects/news', label: 'FFXIV 新聞' },
  { to: '/projects/news/steam', label: 'Steam 新聞' },
]
</script>
