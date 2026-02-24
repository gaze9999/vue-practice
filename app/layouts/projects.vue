<template>
  <div class="grid grid-cols-[240px_1fr] min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="bg-gray-900 text-amber-50 flex flex-col p-6">
      <div class="mb-7">
        <span class="text-lg font-bold block">專案示例</span>
        <span class="text-xs text-amber-50/70 mt-1.5 block">Project Examples</span>
      </div>
      
      <nav class="flex flex-col gap-2.5">
        <NuxtLink
          v-for="link in projectsLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-2.5 rounded-lg bg-white/8 text-sm transition-colors hover:bg-white/15 [&.router-link-active]:bg-white/20"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      
      <div class="mt-auto text-xs text-amber-50/70">
        <p class="m-0">資料皆為去識別化樣本</p>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col">
      <header class="flex justify-between items-center px-8 py-6 bg-white border-b border-gray-900/8">
        <div>
          <p class="m-0 mb-1 text-xs tracking-widest uppercase text-amber-700">模組標題</p>
          <h1 class="m-0 text-[26px] text-gray-900">{{ activeTitle }}</h1>
        </div>
        <div class="flex gap-2.5 items-center">
          <div class="flex flex-col gap-1 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-semibold">
            <span>{{ currentUser.name }}</span>
            <span class="text-[11px] text-amber-700">{{ roleLabel }}</span>
          </div>
          <span class="px-3 py-1.5 rounded-full bg-orange-500 text-gray-900 text-xs font-semibold">展示環境</span>
          <span class="px-3 py-1.5 rounded-full border border-orange-500 text-orange-500 text-xs font-semibold">版本 v1.0</span>
        </div>
      </header>

      <section class="p-8">
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const route = useRoute()

const erpStore = useErpStore()
const { currentUser } = storeToRefs(erpStore)

const projectsLinks = [
  { label: '專案總覽', to: '/projects' },
  { label: '購物後台', to: '/projects/erp' },
  { label: 'Python 爬蟲', to: '/projects/python-scraper' },
  { label: '新聞系統', to: '/projects/news' },
  { label: 'YouTube', to: '/projects/youtube' },
  { label: '商城展示', to: '/projects/shop' },
]

const roleLabel = computed(() => {
  return erpStore.roleLabels[currentUser.value.role] || currentUser.value.role
})

const activeTitle = computed(() => {
  const matched = projectsLinks.find((item) => route.path === item.to)
  return matched ? matched.label : '專案總覽'
})
</script>
