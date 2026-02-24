<template>
  <div class="audit-system">
    <!-- 頁面選擇器 -->
    <div class="audit-tabs">
      <button 
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id as 'query' | 'edit' | 'review' | 'dashboard'"
      >
        <i :class="tab.icon"></i>
        {{ tab.label }}
      </button>
    </div>

    <!-- 查詢頁面 -->
    <div v-if="activeTab === 'query'" class="tab-content">
      <AuditQuery @mode-change="handleModeChange" />
    </div>

    <!-- 編輯/新建頁面 -->
    <div v-if="activeTab === 'edit'" class="tab-content">
      <AuditEdit 
        :mode="editMode" 
        :selected-data="selectedData"
        @back="activeTab = 'query'"
      />
    </div>

    <!-- 審核頁面 -->
    <div v-if="activeTab === 'review'" class="tab-content">
      <AuditReview 
        :selected-data="selectedData"
        @back="activeTab = 'query'"
      />
    </div>

    <!-- 統計儀表板 -->
    <div v-if="activeTab === 'dashboard'" class="tab-content">
      <AuditDashboard />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuditQuery from './components/AuditQuery.vue'
import AuditEdit from './components/AuditEdit.vue'
import AuditReview from './components/AuditReview.vue'
import AuditDashboard from './components/AuditDashboard.vue'

// console 呼叫保留
console.log('Audit System loaded')

const activeTab = ref<'query' | 'edit' | 'review' | 'dashboard'>('query')
const editMode = ref<'create' | 'edit'>('create')
const selectedData = ref<any>(null)

const tabs = [
  { id: 'query', label: '查詢', icon: 'fas fa-search' },
  { id: 'dashboard', label: '儀表板', icon: 'fas fa-chart-line' },
  { id: 'review', label: '審核', icon: 'fas fa-check-circle' },
]

const handleModeChange = (data: { mode: 'create' | 'edit'; selectedData?: any }) => {
  editMode.value = data.mode
  selectedData.value = data.selectedData
  activeTab.value = 'edit'
}
</script>

<style scoped lang="scss">
.audit-system {
  padding: 0;
  background: #f5f6fa;
  min-height: 100vh;
}

.audit-tabs {
  display: flex;
  gap: 0;
  background: #ffffff;
  border-bottom: 0.125rem solid #e8ecf5;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 0.125rem 0.5rem #00000014;
}

.tab-button {
  flex: 1;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  color: #565f79;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-bottom: 0.1875rem solid transparent;
  position: relative;

  i {
    font-size: 1rem;
  }

  &:hover {
    color: #667eea;
    background: #667eea0d;
  }

  &.active {
    color: #667eea;
    border-bottom-color: #667eea;
  }
}

.tab-content {
  animation: fadeIn 0.3s ease;
  padding: 1.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 48rem) {
  .audit-tabs {
    overflow-x: auto;
  }

  .tab-button {
    min-width: 10rem;
    font-size: 0.75rem;
    padding: 0.75rem 1rem;

    i {
      display: none;
    }
  }
}

:global(.dark-mode) .audit-system {
  background: transparent;
}

:global(.dark-mode) .audit-tabs {
  background: #1b1f32;
  border-bottom-color: #e6e9f226;
  box-shadow: 0 0.125rem 0.5rem #0000004d;
}

:global(.dark-mode) .tab-button {
  color: #cfd6e6;

  &:hover {
    color: #667eea;
    background: #667eea1a;
  }

  &.active {
    color: #667eea;
    border-bottom-color: #667eea;
  }
}
</style>
