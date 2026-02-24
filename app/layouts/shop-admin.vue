<template>
  <div class="grid grid-cols-[240px_1fr] min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="bg-gray-900 text-amber-50 flex flex-col p-6">
      <div class="mb-7">
        <span class="text-lg font-bold block">購物後台</span>
        <span class="text-xs text-amber-50/70 mt-1.5 block">Commerce Admin Console</span>
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
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 px-8 py-3 bg-amber-50 border-b border-amber-100 text-xs">
        <NuxtLink to="/projects" class="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
          ◄ 返回專案
        </NuxtLink>
        <span class="text-amber-400">/</span>
        <span class="text-gray-900 font-semibold">購物後台</span>
      </nav>

      <!-- Topbar -->
      <header class="flex justify-between items-center px-8 py-6 bg-white border-b border-gray-900/8">
        <div>
          <p class="m-0 mb-1 text-xs tracking-widest uppercase text-amber-700">模組標題</p>
          <h1 class="m-0 text-[26px] text-gray-900">{{ activeTitle }}</h1>
        </div>
        <div class="flex gap-2.5 items-center">
          <!-- Role Switcher -->
          <div class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-amber-50 text-xs text-amber-900">
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
const router = useRouter()

const erpStore = useErpStore()
const { currentUser, lastDeniedRoute } = storeToRefs(erpStore)

const navLinks = [
  { label: '總覽', to: '/projects/shop-admin' },
  { label: '採購', to: '/projects/shop-admin/procurement', roles: ['admin', 'manager'] as ErpRole[] },
  { label: '庫存', to: '/projects/shop-admin/inventory', roles: ['admin', 'manager'] as ErpRole[] },
  { label: '財務', to: '/projects/shop-admin/finance', roles: ['admin', 'finance'] as ErpRole[] },
  { label: '人資', to: '/projects/shop-admin/hr', roles: ['admin', 'hr'] as ErpRole[] },
  { label: '銷售', to: '/projects/shop-admin/sales', roles: ['admin', 'sales'] as ErpRole[] },
  { label: '報表', to: '/projects/shop-admin/reports', roles: ['admin', 'manager', 'finance'] as ErpRole[] },
  { label: '審計', to: '/projects/shop-admin/audit', roles: ['admin'] as ErpRole[] },
]

const subNavMap: Record<string, Array<{ label: string; to: string }>> = {
  '/projects/shop-admin/procurement': [{ label: '採購申請清單', to: '/projects/shop-admin/procurement/requests' }],
  '/projects/shop-admin/inventory': [{ label: '庫存調整單', to: '/projects/shop-admin/inventory/adjustments' }],
  '/projects/shop-admin/finance': [{ label: '憑證與結帳明細', to: '/projects/shop-admin/finance/vouchers' }],
  '/projects/shop-admin/hr': [{ label: '招募進度', to: '/projects/shop-admin/hr/recruitment' }],
  '/projects/shop-admin/sales': [{ label: '銷售管線', to: '/projects/shop-admin/sales/pipeline' }],
  '/projects/shop-admin/reports': [{ label: '報表排程', to: '/projects/shop-admin/reports/schedule' }],
  '/projects/shop-admin/audit': [{ label: '操作紀錄', to: '/projects/shop-admin/audit/logs' }],
}

const visibleLinks = computed(() => {
  return navLinks.filter((link) => erpStore.hasRoleAccess(link.roles))
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

// 監聽角色變化，如果當前頁面無法訪問則導向到總覽
watch(
  selectedRole,
  (newRole) => {
    nextTick(() => {
      const currentPageLink = navLinks.find((item) => route.path.startsWith(item.to))
      if (currentPageLink && currentPageLink.roles && currentPageLink.roles.length > 0) {
        const canAccess = currentPageLink.roles.includes(newRole)
        if (!canAccess) {
          router.push('/projects/shop-admin')
        }
      }
    })
  }
)

const roleLabel = computed(() => {
  return erpStore.roleLabels[currentUser.value.role] || currentUser.value.role
})

const activeTitle = computed(() => {
  const matched = navLinks.find((item) => route.path.startsWith(item.to))
  return matched ? matched.label : '後台總覽'
})

const subLinks = computed(() => {
  const matched = navLinks.find((item) => route.path.startsWith(item.to))
  if (!matched || !matched.to || matched.to === '/projects/shop-admin') {
    return []
  }
  const links = subNavMap[matched.to] || []
  return links.filter(() => erpStore.hasRoleAccess(matched.roles))
})
</script>
