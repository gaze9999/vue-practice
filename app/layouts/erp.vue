<template>
  <div class="erp-layout">
    <aside class="erp-sidebar">
      <div class="brand">
        <span class="brand-title">購物後台</span>
        <span class="brand-subtitle">Commerce Admin Console</span>
      </div>
      <nav class="nav-list">
        <NuxtLink
          v-for="link in visibleLinks"
          :key="link.to"
          :to="link.to"
          class="nav-item"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div v-if="subLinks.length" class="sub-nav">
        <p class="sub-nav-title">子頁面</p>
        <NuxtLink
          v-for="link in subLinks"
          :key="link.to"
          :to="link.to"
          class="sub-nav-item"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
      <div class="sidebar-footer">
        <p>資料皆為去識別化樣本</p>
      </div>
    </aside>

    <div class="erp-main">
      <header class="erp-topbar">
        <div>
          <p class="topbar-label">模組標題</p>
          <h1 class="topbar-title">{{ activeTitle }}</h1>
        </div>
        <div class="topbar-actions">
          <div class="role-switch">
            <span class="role-label">角色</span>
            <select v-model="selectedRole" class="role-select">
              <option v-for="option in roleOptions" :key="option[0]" :value="option[0]">
                {{ option[1] }}
              </option>
            </select>
          </div>
          <div class="user-chip">
            <span>{{ currentUser.name }}</span>
            <span class="user-role">{{ roleLabel }}</span>
          </div>
          <span class="chip">展示環境</span>
          <span class="chip outline">版本 v1.0</span>
        </div>
      </header>

      <div v-if="lastDeniedRoute" class="access-alert">
        權限不足，已導回總覽。無法進入：{{ lastDeniedRoute }}
      </div>

      <section class="erp-content">
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
  { label: '採購', to: '/shop/admin/procurement', roles: ['admin', 'manager'] },
  { label: '庫存', to: '/shop/admin/inventory', roles: ['admin', 'manager'] },
  { label: '財務', to: '/shop/admin/finance', roles: ['admin', 'finance'] },
  { label: '人資', to: '/shop/admin/hr', roles: ['admin', 'hr'] },
  { label: '銷售', to: '/shop/admin/sales', roles: ['admin', 'sales'] },
  { label: '報表', to: '/shop/admin/reports', roles: ['admin', 'manager', 'finance'] },
]

const subNavMap: Record<string, Array<{ label: string; to: string }>> = {
  '/shop/admin/procurement': [{ label: '採購申請清單', to: '/shop/admin/procurement/requests' }],
  '/shop/admin/inventory': [{ label: '庫存調整單', to: '/shop/admin/inventory/adjustments' }],
  '/shop/admin/finance': [{ label: '憑證與結帳明細', to: '/shop/admin/finance/vouchers' }],
  '/shop/admin/hr': [{ label: '招募進度', to: '/shop/admin/hr/recruitment' }],
  '/shop/admin/sales': [{ label: '銷售管線', to: '/shop/admin/sales/pipeline' }],
  '/shop/admin/reports': [{ label: '報表排程', to: '/shop/admin/reports/schedule' }],
}

const visibleLinks = computed(() =>
  navLinks.filter((link) => erpStore.hasRoleAccess(link.roles))
)

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
  const matched = navLinks.find((item) => route.path.startsWith(item.to))
  return matched ? matched.label : '後台總覽'
})

const subLinks = computed(() => {
  const matched = navLinks.find((item) => route.path.startsWith(item.to))
  if (!matched || !matched.to || matched.to === '/shop/admin') {
    return []
  }
  const links = subNavMap[matched.to] || []
  return links.filter(() => erpStore.hasRoleAccess(matched.roles))
})
</script>

<style scoped>
  .erp-layout {
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: 100vh;
    background: #f4f5f8;
  }

  .erp-sidebar {
    background: #1f1b2d;
    color: #f5f0e6;
    display: flex;
    flex-direction: column;
    padding: 24px 20px;
  }

  .brand-title {
    font-size: 18px;
    font-weight: 700;
  }

  .brand-subtitle {
    display: block;
    font-size: 12px;
    margin-top: 6px;
    color: rgba(245, 240, 230, 0.7);
  }

  .nav-list {
    display: grid;
    gap: 10px;
    margin-top: 28px;
  }

  .nav-item {
    padding: 10px 12px;
    border-radius: 10px;
    color: inherit;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.08);
    font-size: 14px;
    transition: background 0.2s ease;
  }

  .nav-item.router-link-active {
    background: rgba(255, 255, 255, 0.2);
  }

  .sub-nav {
    margin-top: 20px;
    display: grid;
    gap: 8px;
  }

  .sub-nav-title {
    margin: 0;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(245, 240, 230, 0.6);
  }

  .sub-nav-item {
    padding: 8px 10px;
    border-radius: 8px;
    color: inherit;
    text-decoration: none;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.05);
  }

  .sub-nav-item.router-link-active {
    background: rgba(255, 255, 255, 0.18);
  }

  .sidebar-footer {
    margin-top: auto;
    font-size: 12px;
    color: rgba(245, 240, 230, 0.7);
  }

  .erp-main {
    display: flex;
    flex-direction: column;
  }

  .erp-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    background: #ffffff;
    border-bottom: 1px solid rgba(31, 27, 45, 0.08);
  }

  .topbar-label {
    margin: 0 0 4px;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #9a7c5a;
  }

  .topbar-title {
    margin: 0;
    font-size: 26px;
    color: #1f1b2d;
  }

  .topbar-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .role-switch {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 12px;
    background: #f7f1ea;
    font-size: 12px;
    color: #6b4f3b;
  }

  .role-label {
    font-weight: 600;
  }

  .role-select {
    border: none;
    background: transparent;
    font-size: 12px;
    color: inherit;
    outline: none;
  }

  .user-chip {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 12px;
    background: #fff4e7;
    color: #6b4f3b;
    font-size: 12px;
    font-weight: 600;
  }

  .user-role {
    font-size: 11px;
    color: #9a7c5a;
  }

  .access-alert {
    margin: 16px 32px 0;
    padding: 12px 16px;
    border-radius: 12px;
    background: #ffe0df;
    color: #a6342e;
    font-size: 13px;
    font-weight: 600;
  }

  .chip {
    padding: 6px 12px;
    border-radius: 999px;
    background: #ff9f4a;
    color: #1f1b2d;
    font-size: 12px;
    font-weight: 600;
  }

  .chip.outline {
    background: transparent;
    border: 1px solid #ff9f4a;
    color: #ff9f4a;
  }

  .erp-content {
    padding: 32px;
  }

  @media (max-width: 900px) {
    .erp-layout {
      grid-template-columns: 1fr;
    }

    .erp-sidebar {
      flex-direction: row;
      align-items: center;
      overflow-x: auto;
      gap: 12px;
    }

    .nav-list {
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      margin-top: 0;
    }

    .sidebar-footer {
      display: none;
    }
  }
</style>
