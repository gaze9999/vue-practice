<template>
  <section class="page-block">
    <h2>報表中心</h2>
    <p class="lead">展示營運、財務與績效報表的輸出範例。</p>

    <div class="permission-card">
      <p>可存取角色：系統管理、營運主管、財務專員</p>
      <p>目前角色：{{ roleLabel }}</p>
    </div>

    <div class="grid">
      <article class="card" v-for="report in reports" :key="report.name">
        <h3>{{ report.name }}</h3>
        <p>{{ report.desc }}</p>
        <span class="meta">更新：{{ report.updated }}</span>
      </article>
    </div>

    <div class="subpage-card">
      <div>
        <h3>子頁面：報表排程</h3>
        <p>彙整自動產出排程與通知設定。</p>
      </div>
      <NuxtLink to="/shop/admin/reports/schedule" class="sub-link">前往排程 →</NuxtLink>
    </div>

    <div class="flow-section">
      <h3>報表審核流程</h3>
      <div class="flow-grid">
        <div v-for="step in reportFlow" :key="step.id" class="flow-card">
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
      <h3>排程清單</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>報表</th>
            <th>頻率</th>
            <th>負責人</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="schedule in schedules" :key="schedule.name">
            <td>{{ schedule.name }}</td>
            <td>{{ schedule.frequency }}</td>
            <td>{{ schedule.owner }}</td>
            <td><span :class="['badge', schedule.status]">{{ schedule.status }}</span></td>
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

const reports = [
  { name: '月營收報表', desc: '部門別營收與毛利分析', updated: '今天 08:00' },
  { name: '庫存週轉率', desc: '依品項分類週轉效率', updated: '昨天 18:30' },
  { name: '採購成本趨勢', desc: '材料成本與議價成效', updated: '昨天 15:10' },
  { name: '人力配置報表', desc: '工時與出勤分析', updated: '昨天 11:45' },
]

const erpStore = useErpStore()
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})

const reportFlow = [
  { id: '01', title: '數據彙整', status: 'done', note: '已完成資料抽取' },
  { id: '02', title: '主管審閱', status: 'active', note: '等待營運主管確認' },
  { id: '03', title: '財務覆核', status: 'pending', note: '排程中' },
  { id: '04', title: '發布與寄送', status: 'pending', note: '待審核完成' },
]

const schedules = [
  { name: '月營收報表', frequency: '每月 1 次', owner: '分析小組', status: 'active' },
  { name: '庫存週轉率', frequency: '每週 1 次', owner: '倉儲管理', status: 'active' },
  { name: '採購成本趨勢', frequency: '每月 2 次', owner: '採購團隊', status: 'pending' },
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

  .meta {
    display: inline-block;
    margin-top: 10px;
    font-size: 12px;
    color: #9a7c5a;
  }
</style>
