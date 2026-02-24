<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>憑證與結帳明細</h2>
        <p class="lead">掌握本期憑證與應收應付對帳狀態。</p>
      </div>
      <div class="badge">可存取：系統管理、財務專員</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>憑證編號</th>
          <th>類型</th>
          <th>金額</th>
          <th>期間</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in vouchers" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.type }}</td>
          <td>{{ row.amount }}</td>
          <td>{{ row.period }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>提醒</h3>
      <p>月結前需完成所有憑證覆核，避免報表延遲。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'erp',
  middleware: 'erp-auth',
})

const vouchers = [
  { id: 'V-901', type: '應收', amount: 'NT$ 210,000', period: '2026/02', status: 'active' },
  { id: 'V-902', type: '應付', amount: 'NT$ 320,000', period: '2026/02', status: 'pending' },
  { id: 'V-903', type: '稅務', amount: 'NT$ 58,000', period: '2026/02', status: 'pending' },
]
</script>

<style scoped>
  .page-block {
    background: #ffffff;
    padding: 24px;
    border-radius: 18px;
    box-shadow: 0 12px 24px rgba(31, 27, 45, 0.08);
  }

  .header {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .lead {
    color: #4d4a57;
  }

  .badge {
    background: #fff4e7;
    color: #6b4f3b;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    height: fit-content;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  .data-table th,
  .data-table td {
    padding: 10px 12px;
    border-bottom: 1px solid #f0e7db;
    text-align: left;
  }

  .status {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    text-transform: uppercase;
  }

  .status.active {
    background: #fff2cc;
    color: #8a6d1a;
  }

  .status.pending {
    background: #e8eef6;
    color: #38527a;
  }

  .note-card {
    margin-top: 20px;
    padding: 16px;
    background: #fdf6ef;
    border-radius: 14px;
  }
</style>
