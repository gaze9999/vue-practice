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
      <NuxtLink to="/projects/shop-admin/reports/schedule" class="sub-link">前往排程 →</NuxtLink>
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
      <div class="table-header">
        <h3>排程清單</h3>
        <div class="export-actions">
          <button class="export-btn excel-btn" @click="exportToExcel" title="匯出為 Excel">
            <i class="fas fa-file-excel"></i> Excel
          </button>
          <button class="export-btn csv-btn" @click="exportToCsv" title="匯出為 CSV">
            <i class="fas fa-file-csv"></i> CSV
          </button>
        </div>
      </div>
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
  layout: 'shop-admin',
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

// TODO: 匯出功能 - 尚未實作
/**
 * 匯出排程清單為 Excel 格式
 * 將表格資料轉換為 Excel 檔案並將其下載到用戶設備
 */
const exportToExcel = () => {
  // 實作方式：使用第三方套件（如 xlsx/exceljs）將 schedules 資料轉換且匯出
  console.log('匯出 Excel 功能待實作', schedules)
}

/**
 * 匯出排程清單為 CSV 格式
 * 將表格資料轉換為 CSV 檔案並將其下載到用戶設備
 */
const exportToCsv = () => {
  // 實作方式：將 schedules 資料轉換為 CSV 格式字串並透過 blob 下載
  console.log('匯出 CSV 功能待實作', schedules)
}
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

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .table-header h3 {
    margin: 0;
  }

  .export-actions {
    display: flex;
    gap: 0.5rem;
  }

  .export-btn {
    padding: 0.5rem 0.875rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #f5f5f5;
    color: #333;
  }

  .export-btn:hover {
    transform: translateY(-0.0625rem);
    box-shadow: 0 0.25rem 0.5rem #1f1b2d1f;
  }

  .export-btn.excel-btn {
    background: #e8f5e9;
    color: #2e7d32;
  }

  .export-btn.excel-btn:hover {
    background: #c8e6c9;
  }

  .export-btn.csv-btn {
    background: #fce4ec;
    color: #c2185b;
  }

  .export-btn.csv-btn:hover {
    background: #f8bbd0;
  }

  .card {
    padding: 1rem;
    background: #f8f7fb;
    border-radius: 0.875rem;
  }

  .meta {
    display: inline-block;
    margin-top: 0.625rem;
    font-size: 0.75rem;
    color: #9a7c5a;
  }
</style>
