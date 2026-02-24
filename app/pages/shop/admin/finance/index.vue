<template>
  <section class="page-block">
    <h2>財務管理</h2>
    <p class="lead">本月結帳、現金流與憑證狀態總覽。</p>

    <div class="permission-card">
      <p>可存取角色：系統管理、財務專員</p>
      <p>目前角色：{{ roleLabel }}</p>
    </div>

    <div class="grid">
      <article class="card">
        <h3>月結進度</h3>
        <p>{{ financeSummary.monthClose }}</p>
        <p>未結筆數：{{ financeSummary.pending }}</p>
      </article>
      <article class="card">
        <h3>現金流概況</h3>
        <p>收入：{{ financeSummary.income }}</p>
        <p>支出：{{ financeSummary.expense }}</p>
      </article>
      <article class="card">
        <h3>應收應付</h3>
        <p>應收：{{ financeSummary.receivable }}</p>
        <p>應付：{{ financeSummary.payable }}</p>
      </article>
    </div>

    <div class="subpage-card">
      <div>
        <h3>子頁面：憑證與結帳明細</h3>
        <p>展示應收應付與憑證分錄的細項清單。</p>
      </div>
      <NuxtLink to="/shop/admin/finance/vouchers" class="sub-link">前往憑證 →</NuxtLink>
    </div>

    <div class="flow-section">
      <h3>月結流程</h3>
      <div class="flow-grid">
        <div v-for="step in closeFlow" :key="step.id" class="flow-card">
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
      <h3>待核對清單</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>憑證編號</th>
            <th>類型</th>
            <th>金額</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in voucherRows" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.amount }}</td>
            <td><span :class="['badge', row.status]">{{ row.status }}</span></td>
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

const financeSummary = {
  monthClose: '74% 完成',
  pending: '18 筆',
  income: 'NT$ 5.8M',
  expense: 'NT$ 4.1M',
  receivable: 'NT$ 2.2M',
  payable: 'NT$ 1.4M',
}

const erpStore = useErpStore()
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})

const closeFlow = [
  { id: '01', title: '憑證彙整', status: 'done', note: '已完成本月憑證匯入' },
  { id: '02', title: '成本核對', status: 'active', note: '等待成本中心覆核' },
  { id: '03', title: '應收應付結算', status: 'pending', note: '排程中' },
  { id: '04', title: '月結報表輸出', status: 'pending', note: '待完成前置核對' },
]

const voucherRows = [
  { id: 'V-8831', type: '應付', amount: 'NT$ 320,000', status: 'active' },
  { id: 'V-8832', type: '應收', amount: 'NT$ 210,000', status: 'pending' },
  { id: 'V-8833', type: '稅務', amount: 'NT$ 58,000', status: 'pending' },
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
</style>
