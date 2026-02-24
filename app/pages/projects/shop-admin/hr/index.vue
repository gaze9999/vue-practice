<template>
  <section class="page-block">
    <h2>人資管理</h2>
    <p class="lead">人力配置、排班與績效追蹤範例。</p>

    <div class="permission-card">
      <p>可存取角色：系統管理、人資專員</p>
      <p>目前角色：{{ roleLabel }}</p>
    </div>

    <div class="grid">
      <article class="card" v-for="team in teams" :key="team.name">
        <h3>{{ team.name }}</h3>
        <p>人數：{{ team.count }}</p>
        <p>本週出勤：{{ team.attendance }}</p>
        <p>關鍵職缺：{{ team.openings }}</p>
      </article>
    </div>

    <div class="subpage-card">
      <div>
        <h3>子頁面：招募進度</h3>
        <p>追蹤招募管道、面談排程與錄用進度。</p>
      </div>
      <NuxtLink to="/projects/shop-admin/hr/recruitment" class="sub-link">前往招募 →</NuxtLink>
    </div>

    <div class="flow-section">
      <h3>招募多層流程</h3>
      <div class="flow-grid">
        <div v-for="step in hiringFlow" :key="step.id" class="flow-card">
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
      <h3>待處理任務</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>任務</th>
            <th>負責人</th>
            <th>期限</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in hrTasks" :key="task.title">
            <td>{{ task.title }}</td>
            <td>{{ task.owner }}</td>
            <td>{{ task.due }}</td>
            <td><span :class="['badge', task.status]">{{ task.status }}</span></td>
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

const teams = [
  { name: '生產團隊', count: '42 人', attendance: '96%', openings: '2 名' },
  { name: '研發團隊', count: '28 人', attendance: '94%', openings: '1 名' },
  { name: '後勤團隊', count: '19 人', attendance: '98%', openings: '0 名' },
]

const erpStore = useErpStore()
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})

const hiringFlow = [
  { id: '01', title: '需求提出', status: 'done', note: '用人需求已確認' },
  { id: '02', title: '主管審核', status: 'active', note: '等待部門主管確認' },
  { id: '03', title: '招募與面談', status: 'pending', note: '排程中' },
  { id: '04', title: '錄用與報到', status: 'pending', note: '待核准' },
]

const hrTasks = [
  { title: '排班確認', owner: '人資專員 A', due: '今日 17:00', status: 'active' },
  { title: '績效評估彙整', owner: '人資專員 B', due: '本週五', status: 'pending' },
  { title: '新人報到流程', owner: '人資專員 A', due: '明日 10:00', status: 'pending' },
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
