<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>採購申請清單</h2>
        <p class="lead">彙整各部門需求、預算與審核狀態。</p>
      </div>
      <div class="badge">可存取：系統管理、營運主管</div>
    </div>

    <div class="table-section">
      <table class="data-table">
        <thead>
          <tr>
            <th>申請單號</th>
            <th>部門</th>
            <th>項目</th>
            <th>金額</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in requestRows" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.department }}</td>
            <td>{{ row.item }}</td>
            <td>{{ row.amount }}</td>
            <td><span :class="['status', row.status]">{{ row.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="note-card">
      <h3>審核節點</h3>
      <p>需求提出 → 部門主管 → 供應商比價 → 財務覆核 → 下單。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'erp',
  middleware: 'erp-auth',
})

const requestRows = [
  { id: 'REQ-901', department: '採購中心', item: '原料批次 A', amount: 'NT$ 320,000', status: 'active' },
  { id: 'REQ-902', department: '製造部', item: '包材補貨', amount: 'NT$ 85,000', status: 'pending' },
  { id: 'REQ-903', department: '設備部', item: '維修零件', amount: 'NT$ 52,000', status: 'pending' },
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
