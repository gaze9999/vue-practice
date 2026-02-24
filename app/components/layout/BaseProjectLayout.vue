<template>
  <div class="erp-layout">
    <aside class="erp-sidebar">
      <div class="brand">
        <span class="brand-title">{{ brandTitle }}</span>
        <span class="brand-subtitle">{{ brandSubtitle }}</span>
      </div>
      <nav class="nav-list">
        <NuxtLink to="/projects" class="nav-item">← 返回專案</NuxtLink>
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-item"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
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
          <div class="user-chip">
            <span>{{ currentUser.name }}</span>
            <span class="user-role">{{ roleLabel }}</span>
          </div>
          <span class="chip">展示環境</span>
          <span class="chip outline">版本 v1.0</span>
        </div>
      </header>

      <section class="erp-content">
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

interface NavLink {
  label: string
  to: string
}

interface Props {
  brandTitle: string
  brandSubtitle: string
  navLinks: NavLink[]
  titleMap: Record<string, string>
}

const props = defineProps<Props>()

const route = useRoute()
const erpStore = useErpStore()
const { currentUser } = storeToRefs(erpStore)

const roleLabel = computed(() => {
  return erpStore.roleLabels[currentUser.value.role] || currentUser.value.role
})

const activeTitle = computed(() => {
  return props.titleMap[route.path] || '專案總覽'
})
</script>

<style scoped>
.erp-layout {
  display: grid;
  grid-template-columns: 15rem 1fr;
  min-height: 100vh;
  background: #f4f5f8;
}

.erp-sidebar {
  background: #1f1b2d;
  color: #f5f0e6;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem;
}

.brand-title {
  font-size: 1.125rem;
  font-weight: 700;
}

.brand-subtitle {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.375rem;
  color: #f5f0e6b3;
}

.nav-list {
  display: grid;
  gap: 0.625rem;
  margin-top: 1.75rem;
}

.nav-item {
  padding: 0.625rem 0.75rem;
  border-radius: 0.625rem;
  color: inherit;
  text-decoration: none;
  background: #ffffff14;
  font-size: 0.875rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-item:hover {
  background: #ff9f4a33;
  color: #ffb56b;
}

.nav-item.router-link-active {
  background: #ff9f4a;
  color: #1f1b2d;
  font-weight: 600;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  font-size: 0.75rem;
  color: #f5f0e680;
  border-top: 0.0625rem solid #ffffff1a;
}

.erp-main {
  display: flex;
  flex-direction: column;
}

.erp-topbar {
  background: #ffffff;
  padding: 1.25rem 2rem;
  border-bottom: 0.0625rem solid #e8e9ec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.topbar-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
  color: #999;
  margin: 0 0 0.375rem 0;
}

.topbar-title {
  font-size: 1.375rem;
  margin: 0;
  color: #1f1b2d;
}

.topbar-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.user-chip {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.5rem 1rem;
  background: #f0e7db;
  border-radius: 62.4375rem;
  font-size: 0.8125rem;
  color: #333;
}

.user-role {
  font-size: 0.6875rem;
  color: #999;
  margin-top: 0.125rem;
}

.chip {
  padding: 0.375rem 0.875rem;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 62.4375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.chip.outline {
  background: transparent;
  border: 0.0625rem solid #ddd;
  color: #666;
}

.erp-content {
  flex: 1;
  padding: 0;
  overflow-x: hidden;
}

/* 響應式設計 */
@media (max-width: 48rem) {
  .erp-layout {
    grid-template-columns: 1fr;
  }

  .erp-sidebar {
    display: none;
  }

  .erp-topbar {
    padding: 1rem 1.25rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
