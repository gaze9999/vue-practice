<template>
  <div class="erp-dashboard">
    <section class="summary-cards">
      <article v-for="item in summary" :key="item.label" class="summary-card">
        <p class="label">{{ item.label }}</p>
        <h2>{{ item.value }}</h2>
        <span class="meta">{{ item.meta }}</span>
      </article>
    </section>

    <section class="module-section">
      <div class="section-header">
        <h2>模組狀態</h2>
        <span class="pill">更新於 09:20</span>
      </div>
      <div class="module-grid">
        <article v-for="module in modules" :key="module.id" class="module-card">
          <div class="module-header">
            <h3>{{ module.name }}</h3>
            <span :class="['status', module.status]">{{ module.status }}</span>
          </div>
          <p class="owner">負責單位：{{ module.owner }}</p>
          <p class="kpi">{{ module.kpi }}</p>
          <p class="update">更新時間：{{ module.updatedAt }}</p>
        </article>
      </div>
    </section>

    <section class="workflow-section">
      <div class="section-header">
        <h2>跨模組流程總覽</h2>
        <span class="pill light">流程示意</span>
      </div>
      <div class="workflow-grid">
        <div v-for="step in workflowSteps" :key="step.id" class="workflow-card">
          <div class="workflow-header">
            <span class="step">{{ step.id }}</span>
            <span :class="['badge', step.status]">{{ step.status }}</span>
          </div>
          <h3>{{ step.title }}</h3>
          <p class="owner">責任角色：{{ step.owner }}</p>
          <p class="note">{{ step.note }}</p>
          <span class="time">期限：{{ step.due }}</span>
        </div>
      </div>
    </section>

    <section class="access-section">
      <h2>權限顯示</h2>
      <div class="access-card">
        <p>目前角色：{{ roleLabel }}</p>
        <p>可存取模組：{{ accessSummary }}</p>
      </div>
    </section>

    <section class="notice-section">
      <h2>營運通知</h2>
      <div class="notice-grid">
        <div v-for="notice in notices" :key="notice.id" class="notice-card">
          <div class="notice-header">
            <h3>{{ notice.title }}</h3>
            <span :class="['level', notice.level]">{{ notice.level }}</span>
          </div>
          <p>{{ notice.message }}</p>
          <span class="time">{{ notice.time }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'erp',
  middleware: 'erp-auth',
})

const summary = [
  { label: '本月營收', value: 'NT$ 12.4M', meta: '年增 12%' },
  { label: '待審核採購', value: '18 筆', meta: '金額 NT$ 1.6M' },
  { label: '庫存預警', value: '4 項', meta: '低於安全庫存' },
  { label: '人力配置', value: '92%', meta: '本週排班' },
]

const workflowSteps = [
  {
    id: '01',
    title: '需求提出與採購審核',
    owner: '營運主管',
    status: 'active',
    due: '今日 16:00',
    note: '本週採購需求已進入審核階段',
  },
  {
    id: '02',
    title: '庫存檢核與入庫',
    owner: '營運主管',
    status: 'pending',
    due: '明日 10:30',
    note: '等待採購確認後進行入庫作業',
  },
  {
    id: '03',
    title: '財務月結與付款',
    owner: '財務專員',
    status: 'pending',
    due: '本週五',
    note: '須完成採購結算與憑證核對',
  },
  {
    id: '04',
    title: '人資排班確認',
    owner: '人資專員',
    status: 'done',
    due: '已完成',
    note: '本週排班與出勤配置已確認',
  },
]

const { modules } = useErpModules()
const erpStore = useErpStore()
const { notices } = erpStore
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})
const accessSummary = computed(() => {
  const modulesList = ['總覽']
  if (erpStore.canAccessPath('/shop/admin/procurement')) {
    modulesList.push('採購')
  }
  if (erpStore.canAccessPath('/shop/admin/inventory')) {
    modulesList.push('庫存')
  }
  if (erpStore.canAccessPath('/shop/admin/finance')) {
    modulesList.push('財務')
  }
  if (erpStore.canAccessPath('/shop/admin/hr')) {
    modulesList.push('人資')
  }
  if (erpStore.canAccessPath('/shop/admin/sales')) {
    modulesList.push('銷售')
  }
  if (erpStore.canAccessPath('/shop/admin/reports')) {
    modulesList.push('報表')
  }
  return modulesList.join('、')
})
</script>

<style scoped>
  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }

  .summary-card {
    background: #ffffff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(31, 27, 45, 0.08);
  }

  .summary-card h2 {
    margin: 8px 0;
    font-size: 28px;
  }

  .label {
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #9a7c5a;
    margin: 0;
  }

  .meta {
    font-size: 13px;
    color: #6b4f3b;
  }

  .module-section {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 12px 24px rgba(31, 27, 45, 0.08);
    margin-bottom: 32px;
  }

  .workflow-section {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 12px 24px rgba(31, 27, 45, 0.08);
    margin-bottom: 32px;
  }

  .workflow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }

  .workflow-card {
    border: 1px solid #f0e7db;
    border-radius: 16px;
    padding: 16px;
    background: #fffaf4;
  }

  .workflow-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .workflow-card h3 {
    margin: 0 0 6px;
  }

  .badge {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .badge.done {
    background: #d6f5e3;
    color: #1d6b45;
  }

  .badge.active {
    background: #fff2cc;
    color: #8a6d1a;
  }

  .badge.pending {
    background: #e8eef6;
    color: #38527a;
  }

  .note {
    margin: 4px 0;
    font-size: 13px;
    color: #4d4a57;
  }

  .access-section {
    background: #1f1b2d;
    color: #f5f0e6;
    padding: 24px;
    border-radius: 20px;
  }

  .access-card p {
    margin: 6px 0;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .pill {
    background: #ffecd6;
    color: #b27936;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }

  .module-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }

  .module-card {
    border: 1px solid #f0e7db;
    border-radius: 16px;
    padding: 16px;
    background: #fffaf4;
  }

  .module-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .status {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .status.active {
    background: #d6f5e3;
    color: #1d6b45;
  }

  .status.pending {
    background: #fff2cc;
    color: #8a6d1a;
  }

  .status.blocked {
    background: #ffe0df;
    color: #a6342e;
  }

  .owner,
  .kpi,
  .update {
    margin: 4px 0;
    font-size: 13px;
    color: #4d4a57;
  }

  .notice-section h2 {
    margin-bottom: 16px;
  }

  .notice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }

  .notice-card {
    background: #1f1b2d;
    color: #f5f0e6;
    padding: 18px;
    border-radius: 16px;
  }

  .notice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .level {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .level.info {
    background: rgba(255, 255, 255, 0.2);
  }

  .level.warn {
    background: rgba(255, 159, 74, 0.2);
    color: #ffb56b;
  }

  .level.critical {
    background: rgba(255, 0, 85, 0.2);
    color: #ff8fa1;
  }

  .time {
    display: block;
    margin-top: 12px;
    font-size: 12px;
    color: rgba(245, 240, 230, 0.7);
  }
</style>
