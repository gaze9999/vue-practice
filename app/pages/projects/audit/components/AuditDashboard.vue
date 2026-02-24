<template>
  <div class="audit-dashboard">
    <!-- 統計卡片 -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon"><i class="fas fa-tasks"></i></div>
        <div class="stat-info">
          <h3>進行中的後台稽核</h3>
          <p class="stat-value">12</p>
          <p class="stat-desc">採購與庫存流程</p>
        </div>
      </div>

      <div class="stat-card success">
        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
        <div class="stat-info">
          <h3>已通過稽核</h3>
          <p class="stat-value">28</p>
          <p class="stat-desc">符合後台規範</p>
        </div>
      </div>

      <div class="stat-card warning">
        <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <div class="stat-info">
          <h3>待改善項目</h3>
          <p class="stat-value">5</p>
          <p class="stat-desc">人資與財務</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon"><i class="fas fa-chart-bar"></i></div>
        <div class="stat-info">
          <h3>稽核規則</h3>
          <p class="stat-value">45</p>
          <p class="stat-desc">後台流程規範</p>
        </div>
      </div>
    </section>

    <!-- 合規進度 -->
    <section class="progress-section">
      <h2>後台合規進度</h2>
      <div class="progress-item">
        <div class="progress-header">
          <span>合規率</span>
          <span class="progress-value">{{ compliancePercentage }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${compliancePercentage}%` }"></div>
        </div>
      </div>

      <div class="category-progress">
        <div v-for="item in progressCategories" :key="item.name" class="category-item">
          <span class="category-name">{{ item.name }}</span>
          <div class="mini-progress-bar">
            <div class="mini-progress-fill" :style="{ width: item.percentage + '%', backgroundColor: item.color }"></div>
          </div>
          <span class="category-percentage">{{ item.percentage }}%</span>
        </div>
      </div>
    </section>

    <!-- 最近活動 -->
    <section class="recent-section">
      <h2>最近活動</h2>
      <ul class="activity-list">
        <li v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
          <div class="activity-icon" :style="{ borderColor: activity.color }">
            <i :class="activity.icon"></i>
          </div>
          <div class="activity-details">
            <p class="activity-text">{{ activity.text }}</p>
            <span class="activity-time">{{ activity.time }}</span>
          </div>
        </li>
      </ul>
    </section>

    <!-- 按優先級分佈 -->
    <section class="distribution-section">
      <h2>後台稽核項目按優先級分佈</h2>
      <div class="distribution-grid">
        <div class="distribution-item">
          <div class="distribution-header">
            <span class="label">高優先級</span>
            <span class="count">12</span>
          </div>
          <div class="distribution-bar">
            <div class="distribution-fill high" style="width: 40%"></div>
          </div>
        </div>
        <div class="distribution-item">
          <div class="distribution-header">
            <span class="label">中優先級</span>
            <span class="count">18</span>
          </div>
          <div class="distribution-bar">
            <div class="distribution-fill medium" style="width: 60%"></div>
          </div>
        </div>
        <div class="distribution-item">
          <div class="distribution-header">
            <span class="label">低優先級</span>
            <span class="count">15</span>
          </div>
          <div class="distribution-bar">
            <div class="distribution-fill low" style="width: 50%"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// console 呼叫保留
console.log('Audit Dashboard Component loaded')

const compliancePercentage = ref(82)

const progressCategories = [
  { name: '採購流程', percentage: 85, color: '#667eea' },
  { name: '庫存盤點', percentage: 78, color: '#764ba2' },
  { name: '財務憑證', percentage: 88, color: '#00d4aa' },
  { name: '人資權限', percentage: 75, color: '#ffc107' },
]

const recentActivities = [
  {
    icon: 'fas fa-check-circle',
    color: '#28a745',
    text: '稽核「採購申請流程」已通過',
    time: '2小時前',
  },
  {
    icon: 'fas fa-exclamation-circle',
    color: '#ffc107',
    text: '稽核「庫存盤點差異」需改善',
    time: '5小時前',
  },
  {
    icon: 'fas fa-plus-circle',
    color: '#667eea',
    text: '新增稽核項目「財務憑證核對」',
    time: '1天前',
  },
  {
    icon: 'fas fa-edit',
    color: '#764ba2',
    text: '更新規則「人資權限配置」設定',
    time: '2天前',
  },
  {
    icon: 'fas fa-file-pdf',
    color: '#dc3545',
    text: '產生後台稽核月報',
    time: '3天前',
  },
]
</script>

<style scoped lang="scss">
.audit-dashboard {
  padding: 1.5rem;
  max-width: 87.5rem;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem;
  background: #ffffff;
  border-radius: 0.75rem;
  border-left: 0.25rem solid #667eea;
  box-shadow: 0 0.125rem 0.5rem #00000014;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1rem #0000001f;
  }

  &.success {
    border-left-color: #28a745;

    .stat-icon {
      background: #28a7451a;
      color: #28a745;
    }
  }

  &.warning {
    border-left-color: #ffc107;

    .stat-icon {
      background: #ffc1071a;
      color: #ffc107;
    }
  }
}

.stat-icon {
  font-size: 2rem;
  background: #667eea1a;
  color: #667eea;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #565f79;
  }

  .stat-value {
    margin: 0 0 0.25rem;
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e2330;
  }

  .stat-desc {
    margin: 0;
    font-size: 0.8125rem;
    color: #8c95a7;
  }
}

.progress-section,
.recent-section,
.distribution-section {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 0.5rem #00000014;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #1e2330;
  }
}

.progress-item {
  margin-bottom: 1.5rem;

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 0.8125rem;

    .progress-value {
      font-weight: 600;
      color: #667eea;
    }
  }
}

.progress-bar {
  background: #e8ecf5;
  height: 0.75rem;
  border-radius: 0.375rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.category-progress {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
  gap: 1rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;

  .category-name {
    min-width: 5rem;
    color: #565f79;
    font-weight: 500;
  }

  .mini-progress-bar {
    flex: 1;
    height: 0.375rem;
    background: #e8ecf5;
    border-radius: 0.1875rem;
    overflow: hidden;
  }

  .mini-progress-fill {
    height: 100%;
  }

  .category-percentage {
    min-width: 2.5rem;
    text-align: right;
    font-weight: 600;
    color: #1e2330;
  }
}

.activity-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.activity-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 0.0625rem solid #e8ecf5;

  &:last-child {
    border-bottom: none;
  }

  .activity-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    border: 0.125rem solid;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1rem;
    color: inherit;
  }

  .activity-details {
    flex: 1;

    .activity-text {
      margin: 0 0 0.25rem;
      font-size: 0.8125rem;
      color: #1e2330;
      font-weight: 500;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #8c95a7;
    }
  }
}

.distribution-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
  gap: 1.25rem;
}

.distribution-item {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.distribution-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.8125rem;

  .label {
    font-weight: 600;
    color: #1e2330;
  }

  .count {
    font-weight: 700;
    color: #667eea;
  }
}

.distribution-bar {
  height: 0.5rem;
  background: #e8ecf5;
  border-radius: 0.25rem;
  overflow: hidden;
}

.distribution-fill {
  height: 100%;

  &.high {
    background: #dc3545;
  }

  &.medium {
    background: #ffc107;
  }

  &.low {
    background: #28a745;
  }
}

@media (max-width: 48rem) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .category-progress {
    grid-template-columns: 1fr;
  }

  .distribution-grid {
    grid-template-columns: 1fr;
  }
}

:global(.dark-mode) .audit-dashboard {
  background: transparent;
}

:global(.dark-mode) .stat-card {
  background: #1b1f32;
  box-shadow: 0 0.125rem 0.5rem #0000004d;
}

:global(.dark-mode) .stat-info h3 {
  color: #cfd6e6;
}

:global(.dark-mode) .stat-info .stat-value {
  color: #e6e9f2;
}

:global(.dark-mode) .stat-info .stat-desc {
  color: #8c95a7;
}

:global(.dark-mode) .progress-section,
:global(.dark-mode) .recent-section,
:global(.dark-mode) .distribution-section {
  background: #1b1f32;
  box-shadow: 0 0.125rem 0.5rem #0000004d;
}

:global(.dark-mode) .progress-section h2,
:global(.dark-mode) .recent-section h2,
:global(.dark-mode) .distribution-section h2 {
  color: #e6e9f2;
}

:global(.dark-mode) .progress-bar {
  background: #e6e9f226;
}

:global(.dark-mode) .category-item .category-name {
  color: #cfd6e6;
}

:global(.dark-mode) .category-item .category-percentage {
  color: #e6e9f2;
}

:global(.dark-mode) .category-item .mini-progress-bar {
  background: #e6e9f226;
}

:global(.dark-mode) .activity-item {
  border-bottom-color: #e6e9f214;
}

:global(.dark-mode) .activity-item .activity-text {
  color: #e6e9f2;
}

:global(.dark-mode) .activity-item .activity-time {
  color: #8c95a7;
}

:global(.dark-mode) .distribution-item {
  background: #e6e9f20d;
}

:global(.dark-mode) .distribution-header .label {
  color: #e6e9f2;
}

:global(.dark-mode) .distribution-bar {
  background: #e6e9f226;
}
</style>
