<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>報表排程</h2>
        <p class="lead">自動化報表產出與通知設定。</p>
      </div>
      <div class="badge">可存取：系統管理、營運主管、財務專員</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>報表</th>
          <th>頻率</th>
          <th>下次時間</th>
          <th>接收人</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in schedules" :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.frequency }}</td>
          <td>{{ row.next }}</td>
          <td>{{ row.owner }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>提醒</h3>
      <p>報表排程可設定通知群組與安全下載連結。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'erp',
  middleware: 'erp-auth',
})

const schedules = [
  { name: '月營收報表', frequency: '每月 1 次', next: '03/01 08:00', owner: '分析小組', status: 'active' },
  { name: '庫存週轉率', frequency: '每週 1 次', next: '02/19 09:00', owner: '倉儲管理', status: 'active' },
  { name: '採購成本趨勢', frequency: '每月 2 次', next: '02/20 16:00', owner: '採購團隊', status: 'pending' },
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
