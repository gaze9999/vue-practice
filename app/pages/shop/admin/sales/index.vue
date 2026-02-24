<template>
  <section class="page-block">
    <h2>銷售管理</h2>
    <p class="lead">訂單、客戶與業績達成率追蹤。</p>

    <div class="permission-card">
      <p>可存取角色：系統管理、銷售主管</p>
      <p>目前角色：{{ roleLabel }}</p>
    </div>

    <div class="grid">
      <article class="card">
        <h3>本月訂單</h3>
        <p>{{ salesSummary.orders }}</p>
        <p>金額：{{ salesSummary.revenue }}</p>
      </article>
      <article class="card">
        <h3>前五大客戶</h3>
        <ol>
          <li v-for="client in salesSummary.topClients" :key="client">{{ client }}</li>
        </ol>
      </article>
      <article class="card">
        <h3>達成率</h3>
        <p>{{ salesSummary.achievement }}</p>
        <p>成長趨勢：穩定</p>
      </article>
    </div>

    <div class="subpage-card">
      <div>
        <h3>子頁面：銷售管線</h3>
        <p>顯示各階段案件進度與預估成交率。</p>
      </div>
      <NuxtLink to="/shop/admin/sales/pipeline" class="sub-link">前往管線 →</NuxtLink>
    </div>

    <div class="flow-section">
      <h3>銷售多層流程</h3>
      <div class="flow-grid">
        <div v-for="step in salesFlow" :key="step.id" class="flow-card">
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
      <h3>重點客戶</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>客戶</th>
            <th>本月成交</th>
            <th>業績占比</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in keyClients" :key="client.name">
            <td>{{ client.name }}</td>
            <td>{{ client.amount }}</td>
            <td>{{ client.share }}</td>
            <td><span :class="['badge', client.status]">{{ client.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'erp',
  middleware: 'erp-auth',
})

const salesSummary = {
  orders: '325 筆',
  revenue: 'NT$ 8.9M',
  topClients: ['客戶 A', '客戶 B', '客戶 C', '客戶 D', '客戶 E'],
  achievement: '88%',
}

const erpStore = useErpStore()
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})

const salesFlow = [
  { id: '01', title: '潛在客戶評估', status: 'done', note: '完成本週名單整理' },
  { id: '02', title: '報價與審核', status: 'active', note: '等待主管確認報價' },
  { id: '03', title: '簽約與下單', status: 'pending', note: '待客戶回覆' },
  { id: '04', title: '出貨與回款', status: 'pending', note: '排程中' },
]

const keyClients = [
  { name: '客戶 A', amount: 'NT$ 1.6M', share: '18%', status: 'active' },
  { name: '客戶 B', amount: 'NT$ 1.2M', share: '14%', status: 'active' },
  { name: '客戶 C', amount: 'NT$ 820K', share: '9%', status: 'pending' },
]
</script>

<style scoped>
  .page-block {
    background: #ffffff;
    padding: 24px;
    border-radius: 18px;
    box-shadow: 0 12px 24px rgba(31, 27, 45, 0.08);
  }

  .lead {
    color: #4d4a57;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 20px;
  }

  .subpage-card {
    margin-top: 20px;
    padding: 16px;
    border-radius: 14px;
    background: #ffffff;
    border: 1px solid #f0e7db;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .sub-link {
    text-decoration: none;
    font-weight: 600;
    color: #b27936;
  }

  .permission-card {
    margin-top: 16px;
    padding: 12px 16px;
    border-radius: 12px;
    background: #fff4e7;
    color: #6b4f3b;
    font-size: 13px;
  }

  .flow-section,
  .table-section {
    margin-top: 24px;
  }

  .flow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 12px;
  }

  .flow-card {
    padding: 16px;
    background: #fdf6ef;
    border-radius: 14px;
  }

  .flow-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .badge {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
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
    margin-top: 12px;
    font-size: 13px;
  }

  .data-table th,
  .data-table td {
    padding: 10px 12px;
    border-bottom: 1px solid #f0e7db;
    text-align: left;
  }

  .card {
    padding: 16px;
    background: #f8f7fb;
    border-radius: 14px;
  }

  ol {
    margin: 0;
    padding-left: 18px;
  }
</style>
