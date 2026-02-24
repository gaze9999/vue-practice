<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>庫存調整單</h2>
        <p class="lead">盤點差異與調整原因彙整。</p>
      </div>
      <div class="badge">可存取：系統管理、營運主管</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>調整單號</th>
          <th>品項</th>
          <th>差異</th>
          <th>原因</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in adjustments" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.item }}</td>
          <td>{{ row.diff }}</td>
          <td>{{ row.reason }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>注意事項</h3>
      <p>差異達門檻時需同步財務覆核並更新庫位。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'erp',
  middleware: 'erp-auth',
})

const adjustments = [
  { id: 'ADJ-221', item: '原料 B', diff: '-180', reason: '盤點誤差', status: 'pending' },
  { id: 'ADJ-222', item: '包材 C', diff: '+120', reason: '收貨補登', status: 'done' },
  { id: 'ADJ-223', item: '零件 D', diff: '-20', reason: '報廢', status: 'active' },
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

  .status.done {
    background: #d6f5e3;
    color: #1d6b45;
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
