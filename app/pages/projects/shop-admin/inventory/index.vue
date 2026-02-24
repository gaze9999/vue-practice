<template>
  <section class="page-block">
    <h2>庫存與倉儲</h2>
    <p class="lead">即時庫存、批次追溯與異動警示。</p>

    <div class="permission-card">
      <p>可存取角色：系統管理、營運主管</p>
      <p>目前角色：{{ roleLabel }}</p>
    </div>

    <div class="grid">
      <article class="card" v-for="item in stockItems" :key="item.name">
        <h3>{{ item.name }}</h3>
        <p>庫存：{{ item.qty }}</p>
        <p>安全值：{{ item.safe }}</p>
        <p>狀態：{{ item.status }}</p>
      </article>
    </div>

    <div class="subpage-card">
      <div>
        <h3>子頁面：庫存查詢</h3>
        <p>即時查詢所有貨物庫存、批次資訊與異動歷程。</p>
      </div>
      <NuxtLink to="/projects/shop-admin/inventory/query" class="sub-link">前往查詢頁面 →</NuxtLink>
    </div>

    <div class="subpage-card">
      <div>
        <h3>子頁面：庫存調整單</h3>
        <p>追蹤盤點差異、調整原因與簽核進度。</p>
      </div>
      <NuxtLink to="/projects/shop-admin/inventory/adjustments" class="sub-link">前往調整單 →</NuxtLink>
    </div>

    <div class="flow-section">
      <h3>盤點流程</h3>
      <div class="flow-grid">
        <div v-for="step in stockFlow" :key="step.id" class="flow-card">
          <div class="flow-header">
            <span class="step">{{ step.id }}</span>
            <span :class="['badge', step.status]">{{ step.status }}</span>
          </div>
          <h4>{{ step.title }}</h4>
          <p class="note">{{ step.note }}</p>
        </div>
      </div>
    </div>

    <div class="table-section">
      <h3>近期異動紀錄</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>日期</th>
            <th>品項</th>
            <th>類型</th>
            <th>數量</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in movements" :key="row.id">
            <td>{{ row.date }}</td>
            <td>{{ row.item }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.qty }}</td>
            <td><span :class="['badge', row.status]">{{ row.status }}</span></td>
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

const stockItems = [
  { name: '原料 A', qty: '1,250', safe: '1,000', status: '正常' },
  { name: '原料 B', qty: '720', safe: '900', status: '低於安全值' },
  { name: '包材 C', qty: '2,400', safe: '2,000', status: '正常' },
  { name: '零件 D', qty: '150', safe: '180', status: '需補貨' },
]

const erpStore = useErpStore()
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})

const stockFlow = [
  { id: '01', title: '盤點任務建立', status: 'done', note: '已完成排程' },
  { id: '02', title: '現場盤點', status: 'active', note: 'A 倉區進行中' },
  { id: '03', title: '差異覆核', status: 'pending', note: '等待審核' },
  { id: '04', title: '調整入帳', status: 'pending', note: '待財務同步' },
]

const movements = [
  { id: 'M-01', date: '02/12', item: '原料 A', type: '入庫', qty: '+320', status: 'done' },
  { id: 'M-02', date: '02/12', item: '包材 C', type: '出庫', qty: '-180', status: 'done' },
  { id: 'M-03', date: '02/11', item: '零件 D', type: '調整', qty: '-20', status: 'pending' },
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
    grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
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
