<template>
  <section class="page-block">
    <h2>採購與供應鏈</h2>
    <p class="lead">涵蓋需求申請、詢價、審核與供應商績效追蹤。</p>

    <div class="permission-card">
      <p>可存取角色：系統管理、營運主管</p>
      <p>目前角色：{{ roleLabel }}</p>
    </div>

    <div class="grid">
      <article class="card">
        <h3>待審核採購單</h3>
        <ul>
          <li v-for="order in pendingOrders" :key="order.id">
            {{ order.id }}｜{{ order.item }}｜{{ order.amount }}
          </li>
        </ul>
      </article>
      <article class="card">
        <h3>供應商評等</h3>
        <ul>
          <li v-for="vendor in vendors" :key="vendor.name">
            {{ vendor.name }}｜{{ vendor.score }}｜{{ vendor.note }}
          </li>
        </ul>
      </article>
    </div>

    <div class="subpage-card">
      <div>
        <h3>子頁面：採購申請清單</h3>
        <p>查看各部門申請、審核狀態與需求摘要。</p>
      </div>
      <NuxtLink to="/projects/shop-admin/procurement/requests" class="sub-link">前往清單 →</NuxtLink>
    </div>

    <div class="flow-section">
      <h3>採購多層簽核流程</h3>
      <div class="flow-grid">
        <div v-for="step in approvalSteps" :key="step.id" class="flow-card">
          <div class="flow-header">
            <span class="step">{{ step.id }}</span>
            <span :class="['badge', step.status]">{{ step.status }}</span>
          </div>
          <h4>{{ step.title }}</h4>
          <p>負責角色：{{ step.owner }}</p>
          <p class="note">{{ step.note }}</p>
        </div>
      </div>
    </div>

    <div class="table-section">
      <h3>進行中流程</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>流程編號</th>
            <th>項目</th>
            <th>目前節點</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in processRows" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.item }}</td>
            <td>{{ item.stage }}</td>
            <td><span :class="['badge', item.status]">{{ item.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

const pendingOrders = [
  { id: 'PO-1024', item: '原料批次 A', amount: 'NT$ 320,000' },
  { id: 'PO-1025', item: '包材補貨', amount: 'NT$ 85,000' },
  { id: 'PO-1026', item: '維修零件', amount: 'NT$ 52,000' },
]

const vendors = [
  { name: '供應商 A', score: '95 分', note: '交期穩定' },
  { name: '供應商 B', score: '88 分', note: '價格優勢' },
  { name: '供應商 C', score: '82 分', note: '需改善品質' },
]

const erpStore = useErpStore()
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})

const approvalSteps = [
  { id: '01', title: '需求建立', owner: '營運主管', status: 'done', note: '需求已確認' },
  { id: '02', title: '部門審核', owner: '營運主管', status: 'active', note: '等待主管審核' },
  { id: '03', title: '供應商比價', owner: '採購專員', status: 'pending', note: '尚未比價' },
  { id: '04', title: '財務覆核', owner: '財務專員', status: 'pending', note: '等待成本評估' },
  { id: '05', title: '下單與驗收', owner: '採購專員', status: 'pending', note: '待確認交期' },
]

const processRows = [
  { id: 'FLOW-201', item: '原料 A', stage: '部門審核', status: 'active' },
  { id: 'FLOW-202', item: '包材 B', stage: '供應商比價', status: 'pending' },
  { id: 'FLOW-203', item: '設備零件', stage: '財務覆核', status: 'pending' },
]
</script>

<style scoped>
  .page-block {
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 1.125rem;
    box-shadow: 0 0.75rem 1.5rem #1f1b2d14;
  }

  .lead {
    color: #4d4a57;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
    gap: 1rem;
    margin-top: 1.25rem;
  }

  .subpage-card {
    margin-top: 1.25rem;
    padding: 1rem;
    border-radius: 0.875rem;
    background: #ffffff;
    border: 0.0625rem solid #f0e7db;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .sub-link {
    text-decoration: none;
    font-weight: 600;
    color: #b27936;
  }

  .permission-card {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    background: #fff4e7;
    color: #6b4f3b;
    font-size: 0.8125rem;
  }

  .flow-section,
  .table-section {
    margin-top: 1.5rem;
  }

  .flow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
    gap: 1rem;
    margin-top: 0.75rem;
  }

  .flow-card {
    padding: 1rem;
    background: #fdf6ef;
    border-radius: 0.875rem;
  }

  .flow-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .badge {
    padding: 0.25rem 0.625rem;
    border-radius: 62.4375rem;
    font-size: 0.6875rem;
    text-transform: uppercase;
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

  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0.75rem;
    font-size: 0.8125rem;
  }

  .data-table th,
  .data-table td {
    padding: 0.625rem 0.75rem;
    border-bottom: 0.0625rem solid #f0e7db;
    text-align: left;
  }

  .card {
    padding: 1rem;
    background: #f8f7fb;
    border-radius: 0.875rem;
  }
</style>
