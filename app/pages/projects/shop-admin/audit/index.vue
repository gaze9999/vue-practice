<template>
  <div class="audit-overview">
    <section class="overview-cards">
      <article class="overview-card">
        <div class="card-header">
          <h3>操作審計</h3>
          <span class="icon"><i class="fas fa-clipboard"></i></span>
        </div>
        <p class="description">追蹤系統中所有重要操作與資料變更</p>
        <NuxtLink to="/projects/shop-admin/audit/logs" class="action-link">
          查看操作紀錄 →
        </NuxtLink>
      </article>

      <article class="overview-card">
        <div class="card-header">
          <h3>權限管理</h3>
          <span class="icon"><i class="fas fa-lock"></i></span>
        </div>
        <p class="description">管理使用者角色與權限設定</p>
        <div class="info-badge">計畫中</div>
      </article>

      <article class="overview-card">
        <div class="card-header">
          <h3>系統日誌</h3>
          <span class="icon"><i class="fas fa-chart-bar"></i></span>
        </div>
        <p class="description">系統事件與錯誤日誌查詢</p>
        <div class="info-badge">計畫中</div>
      </article>

      <article class="overview-card">
        <div class="card-header">
          <h3>合規報告</h3>
          <span class="icon">✅</span>
        </div>
        <p class="description">生成審計與合規相關報告</p>
        <div class="info-badge">計畫中</div>
      </article>
    </section>

    <section class="stats-section">
      <h2>審計統計</h2>
      <div class="stats-grid">
        <div class="stat-box">
          <p class="stat-label">本日操作</p>
          <h3 class="stat-value">{{ stats.todayOperations }}</h3>
        </div>
        <div class="stat-box">
          <p class="stat-label">本周操作</p>
          <h3 class="stat-value">{{ stats.weekOperations }}</h3>
        </div>
        <div class="stat-box">
          <p class="stat-label">活躍使用者</p>
          <h3 class="stat-value">{{ stats.activeUsers }}</h3>
        </div>
        <div class="stat-box">
          <p class="stat-label">高風險操作</p>
          <h3 class="stat-value" style="color: #e74c3c">{{ stats.highRiskOps }}</h3>
        </div>
      </div>
    </section>

    <section class="recent-section">
      <h2>最近操作</h2>
      <div class="recent-list">
        <div v-for="item in recentOperations" :key="item.id" class="recent-item">
          <div class="item-header">
            <p class="user">{{ item.user }}</p>
            <span :class="['severity', item.severity]">{{ item.severity }}</span>
          </div>
          <p class="operation">{{ item.operation }}</p>
          <p class="time">{{ item.time }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

const stats = {
  todayOperations: '48',
  weekOperations: '312',
  activeUsers: '8',
  highRiskOps: '3',
}

const recentOperations = [
  {
    id: 1,
    user: '王管理員',
    operation: '修改採購訂單 PO-2025-001',
    severity: '一般',
    time: '2分鐘前',
  },
  {
    id: 2,
    user: '李財務',
    operation: '審核發票 INV-2025-0234',
    severity: '一般',
    time: '5分鐘前',
  },
  {
    id: 3,
    user: '陳庫存',
    operation: '異常調整庫存 -50 件',
    severity: '高風險',
    time: '12分鐘前',
  },
  {
    id: 4,
    user: '王管理員',
    operation: '建立新採購需求單',
    severity: '一般',
    time: '18分鐘前',
  },
  {
    id: 5,
    user: '黃HR',
    operation: '建立招募職位',
    severity: '一般',
    time: '24分鐘前',
  },
]
</script>

<style scoped>
  .audit-overview {
    display: grid;
    gap: 2rem;
  }

  .overview-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
    gap: 1rem;
  }

  .overview-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: white;
    border: 0.0625rem solid #e8e3db;
    transition: all 0.2s ease;
  }

  .overview-card:hover {
    border-color: #d4c5b9;
    box-shadow: 0 0.25rem 0.75rem #1f1b2d14;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  .card-header h3 {
    margin: 0;
    font-size: 1rem;
    color: #1f1b2d;
  }

  .icon {
    font-size: 1.5rem;
  }

  .description {
    margin: 0.5rem 0 1rem;
    font-size: 0.8125rem;
    color: #6b4f3b;
    line-height: 1.5;
  }

  .action-link {
    display: inline-block;
    color: #ff9f4a;
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .action-link:hover {
    color: #ff7c1f;
  }

  .info-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    background: #f0e6d8;
    color: #9a7c5a;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .stats-section {
    padding: 0;
  }

  .stats-section h2 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    color: #1f1b2d;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1rem;
  }

  .stat-box {
    padding: 1rem;
    border-radius: 0.75rem;
    background: white;
    border: 0.0625rem solid #e8e3db;
    text-align: center;
  }

  .stat-label {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    color: #9a7c5a;
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
  }

  .stat-value {
    margin: 0;
    font-size: 1.75rem;
    color: #1f1b2d;
    font-weight: 700;
  }

  .recent-section h2 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    color: #1f1b2d;
  }

  .recent-list {
    display: grid;
    gap: 0.75rem;
  }

  .recent-item {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background: white;
    border-left: 0.1875rem solid #ff9f4a;
    border: 0.0625rem solid #e8e3db;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.375rem;
  }

  .recent-item .user {
    margin: 0;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #1f1b2d;
  }

  .severity {
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.6875rem;
    font-weight: 600;
  }

  .severity.一般 {
    background: #e8f4e6;
    color: #27ae60;
  }

  .severity.高風險 {
    background: #ffe0df;
    color: #a6342e;
  }

  .recent-item .operation {
    margin: 0.375rem 0;
    font-size: 0.8125rem;
    color: #1f1b2d;
  }

  .recent-item .time {
    margin: 0;
    font-size: 0.75rem;
    color: #9a7c5a;
  }

  @media (max-width: 48rem) {
    .overview-cards {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
