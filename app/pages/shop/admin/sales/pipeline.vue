<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>銷售管線</h2>
        <p class="lead">展示案件階段、預估金額與成交機率。</p>
      </div>
      <div class="badge">可存取：系統管理、銷售主管</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>客戶</th>
          <th>階段</th>
          <th>預估金額</th>
          <th>可能性</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in pipeline" :key="row.client">
          <td>{{ row.client }}</td>
          <td>{{ row.stage }}</td>
          <td>{{ row.amount }}</td>
          <td>{{ row.probability }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>提醒</h3>
      <p>高價值案件需建立專案計畫並設定追蹤節點。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'erp',
  middleware: 'erp-auth',
})

const pipeline = [
  { client: '客戶 A', stage: '報價', amount: 'NT$ 1.6M', probability: '70%', status: 'active' },
  { client: '客戶 B', stage: '簽約', amount: 'NT$ 1.2M', probability: '85%', status: 'active' },
  { client: '客戶 C', stage: '洽談', amount: 'NT$ 820K', probability: '55%', status: 'pending' },
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
