<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>招募進度</h2>
        <p class="lead">追蹤職缺、面談安排與錄用狀態。</p>
      </div>
      <div class="badge">可存取：系統管理、人資專員</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>職缺</th>
          <th>進度</th>
          <th>負責人</th>
          <th>面談場次</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in recruitments" :key="row.role">
          <td>{{ row.role }}</td>
          <td>{{ row.stage }}</td>
          <td>{{ row.owner }}</td>
          <td>{{ row.sessions }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>提醒</h3>
      <p>人力缺口較高的職缺需優先安排面談。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'erp',
  middleware: 'erp-auth',
})

const recruitments = [
  { role: '製程工程師', stage: '面談中', owner: '人資專員 A', sessions: '3 場', status: 'active' },
  { role: '採購專員', stage: '履歷篩選', owner: '人資專員 B', sessions: '1 場', status: 'pending' },
  { role: '財務助理', stage: '錄用核准', owner: '人資專員 A', sessions: '2 場', status: 'pending' },
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
