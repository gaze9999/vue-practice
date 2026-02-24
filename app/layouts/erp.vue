<template>
  <div class="grid grid-cols-[240px_1fr] min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="bg-gray-900 text-amber-50 flex flex-col p-6">
      <div class="mb-7">
        <span class="text-lg font-bold block">{{ brandTitle }}</span>
        <span class="text-xs text-amber-50/70 mt-1.5 block">{{ brandSubtitle }}</span>
      </div>
      
      <nav class="flex flex-col gap-2.5">
        <NuxtLink
          v-for="link in visibleLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-2.5 rounded-lg bg-white/8 text-sm transition-colors hover:bg-white/15 [&.router-link-active]:bg-white/20"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      
      <div v-if="subLinks.length" class="mt-5 flex flex-col gap-2">
        <p class="text-xs uppercase tracking-widest text-amber-50/60 mb-0">子頁面</p>
        <NuxtLink
          v-for="link in subLinks"
          :key="link.to"
          :to="link.to"
          class="px-2.5 py-2 rounded-lg bg-white/5 text-xs transition-colors hover:bg-white/12 [&.router-link-active]:bg-white/18"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
      
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
          <!-- Role Switcher (only for shop-admin routes) -->
          <div v-if="isShopAdminRoute" class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-amber-50 text-xs text-amber-900">
            <span class="font-semibold">角色</span>
            <select v-model="selectedRole" class="border-0 bg-transparent text-xs outline-none cursor-pointer">
              <option v-for="option in roleOptions" :key="option[0]" :value="option[0]">
                {{ option[1] }}
              </option>
            </select>
          </div>
          
          <!-- User Chip -->
          <div class="flex flex-col gap-1 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-semibold">
            <span>{{ currentUser.name }}</span>
            <span class="text-[11px] text-amber-700">{{ roleLabel }}</span>
          </div>
          
          <span class="px-3 py-1.5 rounded-full bg-orange-500 text-gray-900 text-xs font-semibold">展示環境</span>
          <span class="px-3 py-1.5 rounded-full border border-orange-500 text-orange-500 text-xs font-semibold">版本 v1.0</span>
        </div>
      </header>

      <!-- Access Denied Alert -->
      <div v-if="lastDeniedRoute" class="mx-8 mt-4 px-4 py-3 rounded-xl bg-red-100 text-red-700 text-sm font-semibold">
        權限不足，已導回總覽。無法進入：{{ lastDeniedRoute }}
      </div>

      <!-- Content Area -->
      <section class="p-8">
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { ErpRole } from '~/types'

const route = useRoute()

const erpStore = useErpStore()
const { currentUser, lastDeniedRoute } = storeToRefs(erpStore)

const navLinks = [
  { label: '總覽', to: '/shop/admin' },
  { label: '採購', to: '/shop/admin/procurement', roles: ['admin', 'manager'] as ErpRole[] },
  { label: '庫存', to: '/shop/admin/inventory', roles: ['admin', 'manager'] as ErpRole[] },
  { label: '財務', to: '/shop/admin/finance', roles: ['admin', 'finance'] as ErpRole[] },
  { label: '人資', to: '/shop/admin/hr', roles: ['admin', 'hr'] as ErpRole[] },
  { label: '銷售', to: '/shop/admin/sales', roles: ['admin', 'sales'] as ErpRole[] },
  { label: '報表', to: '/shop/admin/reports', roles: ['admin', 'manager', 'finance'] as ErpRole[] },
]

const projectsLinks = [
  { label: '專案總覽', to: '/projects' },
  { label: '購物網站', to: '/projects/shop' },
  { label: '購物後台', to: '/projects/shop-admin' },
  { label: 'Python 爬蟲', to: '/projects/python-scraper' },
  { label: '審計系統', to: '/projects/shop-admin/audit' },
  { label: '新聞系統', to: '/projects/news' },
  { label: 'YouTube', to: '/projects/youtube' },
]

const subNavMap: Record<string, Array<{ label: string; to: string }>> = {
  '/shop/admin/procurement': [{ label: '採購申請清單', to: '/shop/admin/procurement/requests' }],
  '/shop/admin/inventory': [{ label: '庫存調整單', to: '/shop/admin/inventory/adjustments' }],
  '/shop/admin/finance': [{ label: '憑證與結帳明細', to: '/shop/admin/finance/vouchers' }],
  '/shop/admin/hr': [{ label: '招募進度', to: '/shop/admin/hr/recruitment' }],
  '/shop/admin/sales': [{ label: '銷售管線', to: '/shop/admin/sales/pipeline' }],
  '/shop/admin/reports': [{ label: '報表排程', to: '/shop/admin/reports/schedule' }],
}

const isProjectsRoute = computed(() => route.path.startsWith('/projects'))
const isShopAdminRoute = computed(() => route.path.startsWith('/shop/admin'))

const brandTitle = computed(() => {
  if (isProjectsRoute.value) {
    return '專案示例'
  }
  return '購物後台'
})

const brandSubtitle = computed(() => {
  if (isProjectsRoute.value) {
    return 'Project Examples'
  }
  return 'Commerce Admin Console'
})

const visibleLinks = computed(() => {
  const links = isProjectsRoute.value ? projectsLinks : navLinks.filter((link) => erpStore.hasRoleAccess(link.roles))
  return links
})

const roleOptions = computed(() => {
  return Object.entries(erpStore.roleLabels) as Array<[ErpRole, string]>
})

const selectedRole = computed({
  get: () => currentUser.value.role,
  set: (value: ErpRole) => {
    erpStore.setUserRole(value)
  },
})

const roleLabel = computed(() => {
  return erpStore.roleLabels[currentUser.value.role] || currentUser.value.role
})

const activeTitle = computed(() => {
  if (isProjectsRoute.value) {
    const matched = projectsLinks.find((item) => route.path === item.to)
    return matched ? matched.label : '專案總覽'
  }

  const matched = navLinks.find((item) => route.path.startsWith(item.to))
  return matched ? matched.label : '後台總覽'
})

const subLinks = computed(() => {
  if (isProjectsRoute.value) {
    return []
  }

  const matched = navLinks.find((item) => route.path.startsWith(item.to))
  if (!matched || !matched.to || matched.to === '/shop/admin') {
    return []
  }
  const links = subNavMap[matched.to] || []
  return links.filter(() => erpStore.hasRoleAccess(matched.roles))
})
</script>
