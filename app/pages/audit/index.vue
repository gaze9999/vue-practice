<template>
  <div class="audit-dashboard">
    <!-- 頁面標題 -->
    <header class="page-header">
      <h1>審計儀表板</h1>
      <p class="subtitle">檢查與合規狀況概覽</p>
    </header>

    <!-- 統計卡片 -->
    <section class="stats-grid">
      <article class="stat-card">
        <div class="stat-icon">📋</div>
        <div class="stat-content">
          <h3>進行中的檢查</h3>
          <p class="stat-value">{{ ongoingChecks }}</p>
          <p class="stat-desc">個活躍檢查</p>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <h3>已通過檢查</h3>
          <p class="stat-value">{{ passedChecks }}</p>
          <p class="stat-desc">達成合規標準</p>
        </div>
      </article>

      <article class="stat-card warning">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <h3>待改善項目</h3>
          <p class="stat-value">{{ pendingChecks }}</p>
          <p class="stat-desc">需要關注</p>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>檢查規則</h3>
          <p class="stat-value">{{ totalRules }}</p>
          <p class="stat-desc">已配置規則</p>
        </div>
      </article>
    </section>

    <!-- 合規進度 -->
    <section class="progress-section">
      <h2>整體合規進度</h2>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${compliancePercentage}%` }"></div>
      </div>
      <p class="progress-text">{{ compliancePercentage }}% 合規</p>
    </section>

    <!-- 快速導航 -->
    <section class="quick-actions">
      <h2>快速操作</h2>
      <div class="actions-grid">
        <NuxtLink to="/audit/checks" class="action-card">
          <span class="action-icon">📋</span>
          <h3>管理檢查</h3>
          <p>查看和編輯審計檢查項目</p>
        </NuxtLink>

        <NuxtLink to="/audit/rules" class="action-card">
          <span class="action-icon">⚙️</span>
          <h3>配置規則</h3>
          <p>設定檢查規則與驗證條件</p>
        </NuxtLink>

        <NuxtLink to="/audit/results" class="action-card">
          <span class="action-icon">📊</span>
          <h3>檢視結果</h3>
          <p>分析審計結果與合規狀況</p>
        </NuxtLink>

        <NuxtLink to="/system" class="action-card">
          <span class="action-icon">⚙️</span>
          <h3>系統配置</h3>
          <p>管理使用者與系統設定</p>
        </NuxtLink>
      </div>
    </section>

    <!-- 最近活動 -->
    <section class="recent-activity">
      <h2>最近活動</h2>
      <ul class="activity-list">
        <li v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
          <span class="activity-icon">{{ activity.icon }}</span>
          <span class="activity-text">{{ activity.text }}</span>
          <span class="activity-time">{{ activity.time }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
  // console 呼叫保留
  console.log('Audit Dashboard loaded')

  // 統計數據
  const ongoingChecks = ref<number>(12)
  const passedChecks = ref<number>(28)
  const pendingChecks = ref<number>(5)
  const totalRules = ref<number>(45)

  // 計算合規百分比
  const compliancePercentage = computed<number>(() => {
    const total = passedChecks.value + pendingChecks.value
    return total > !0 ? Math.round((passedChecks.value / total) * 100) : !0
  })

  // 最近活動
  const recentActivities = ref([
    { icon: '✅', text: '檢查「資料加密」已通過', time: '2小時前' },
    { icon: '⚠️', text: '檢查「存取控制」需改善', time: '5小時前' },
    { icon: '📋', text: '新增檢查項目「備份管理」', time: '1天前' },
    { icon: '✏️', text: '更新規則「密碼強度」設定', time: '2天前' },
    { icon: '📊', text: '產生月度合規報告', time: '3天前' },
  ])
</script>

<style scoped lang="scss">
  .audit-dashboard {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 32px;

    h1 {
      margin: 0 0 8px;
      font-size: 32px;
      font-weight: 700;
      color: #1e2330;
    }

    .subtitle {
      margin: 0;
      font-size: 16px;
      color: #565f79;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  .stat-card {
    display: flex;
    gap: 20px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    border-left: 4px solid #667eea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    }

    &.warning {
      border-left-color: #f39c12;

      .stat-icon {
        background: rgba(243, 156, 18, 0.1);
      }
    }
  }

  .stat-icon {
    font-size: 32px;
    background: rgba(102, 126, 234, 0.1);
    width: 60px;
    height: 60px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .stat-content {
    flex: 1;

    h3 {
      margin: 0 0 8px;
      font-size: 14px;
      font-weight: 600;
      color: #565f79;
    }

    .stat-value {
      margin: 0 0 4px;
      font-size: 28px;
      font-weight: 700;
      color: #1e2330;
    }

    .stat-desc {
      margin: 0;
      font-size: 13px;
      color: #8c95a7;
    }
  }

  .progress-section {
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 40px;

    h2 {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 18px;
      color: #1e2330;
    }

    .progress-bar {
      background: #e8ecf5;
      height: 12px;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 12px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }

    .progress-text {
      margin: 0;
      text-align: right;
      font-size: 14px;
      font-weight: 600;
      color: #667eea;
    }
  }

  .quick-actions {
    margin-bottom: 40px;

    h2 {
      margin: 0 0 16px;
      font-size: 18px;
      color: #1e2330;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
  }

  .action-card {
    padding: 20px;
    background: white;
    border-radius: 10px;
    border: 2px solid #e8ecf5;
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      border-color: #667eea;
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
    }

    .action-icon {
      font-size: 32px;
      margin-bottom: 12px;
    }

    h3 {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
      color: #1e2330;
    }

    p {
      margin: 0;
      font-size: 13px;
      color: #565f79;
    }
  }

  .recent-activity {
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h2 {
      margin: 0 0 16px;
      font-size: 18px;
      color: #1e2330;
    }

    .activity-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #e8ecf5;
      font-size: 14px;

      &:last-child {
        border-bottom: none;
      }

      .activity-icon {
        font-size: 18px;
      }

      .activity-text {
        flex: 1;
        color: #1e2330;
        font-weight: 500;
      }

      .activity-time {
        color: #8c95a7;
        font-size: 13px;
        white-space: nowrap;
      }
    }
  }
</style>
