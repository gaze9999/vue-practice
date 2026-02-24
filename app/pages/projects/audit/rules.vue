<template>
  <div class="rules-page">
    <header class="page-header">
      <h1>檢查規則管理</h1>
      <p class="subtitle">定義和配置審計檢查規則</p>
    </header>

    <!-- 規則清單 -->
    <section class="rules-section">
      <div class="section-header">
        <h2>規則清單</h2>
        <button class="btn btn-primary">+ 新增規則</button>
      </div>

      <div class="rules-grid">
        <article v-for="rule in rulesList" :key="rule.id" class="rule-card">
          <div class="rule-card-header">
            <h3>
              <NuxtLink :to="`/projects/audit/rules/${rule.id}`" class="rule-link">
                {{ rule.name }}
              </NuxtLink>
            </h3>
            <span :class="['status-badge', `status-${rule.status}`]">
              {{ rule.status }}
            </span>
          </div>

          <p class="rule-desc">{{ rule.description }}</p>

          <div class="rule-meta">
            <div class="meta-item">
              <span class="meta-label">類別</span>
              <span class="meta-value">{{ rule.category }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">優先順序</span>
              <span :class="['priority', `priority-${rule.priority}`]">{{ rule.priority }}</span>
            </div>
          </div>

          <div class="rule-footer">
            <button class="action-btn">編輯</button>
            <button class="action-btn delete">刪除</button>
          </div>
        </article>
      </div>
    </section>

    <!-- 規則統計 -->
    <section class="stats-section">
      <h2>規則統計</h2>
      <div class="stats-cards">
        <div class="stat-card">
          <span class="stat-label">總規則數</span>
          <span class="stat-number">{{ totalRules }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">啟用規則</span>
          <span class="stat-number active">{{ enabledRules }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">高優先順序</span>
          <span class="stat-number high">{{ highPriorityRules }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">最近更新</span>
          <span class="stat-date">2天前</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  // console 呼叫保留
  console.log('Rules Management page loaded')

  interface Rule {
    id: string
    name: string
    description: string
    status: string
    category: string
    priority: string
  }

  const rulesList = ref<Rule[]>([
    {
      id: 'RULE001',
      name: 'TLS 1.2+ 加密',
      description: '檢查傳輸層是否使用 TLS 1.2 或更高版本',
      status: 'active',
      category: '傳輸安全',
      priority: 'high',
    },
    {
      id: 'RULE002',
      name: '數據庫加密',
      description: '驗證數據庫中的敏感字段已加密',
      status: 'active',
      category: '數據保護',
      priority: 'high',
    },
    {
      id: 'RULE003',
      name: '密鑰管理',
      description: '檢查加密密鑰的安全管理',
      status: 'active',
      category: '金鑰管理',
      priority: 'high',
    },
    {
      id: 'RULE004',
      name: '密碼強度',
      description: '驗證密碼符合複雜度要求',
      status: 'active',
      category: '身份驗證',
      priority: 'medium',
    },
    {
      id: 'RULE005',
      name: '存取控制',
      description: '檢查是否實施最小權限原則',
      status: 'active',
      category: '訪問控制',
      priority: 'high',
    },
    {
      id: 'RULE006',
      name: '日誌記錄',
      description: '驗證詳細的審計日誌記錄',
      status: 'inactive',
      category: '審計日誌',
      priority: 'medium',
    },
  ])

  const totalRules = computed(() => rulesList.value.length)
  const enabledRules = computed(() => rulesList.value.filter((r) => r.status === 'active').length)
  const highPriorityRules = computed(
    () => rulesList.value.filter((r) => r.priority === 'high').length
  )
</script>

<style scoped lang="scss">
  .rules-page {
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

  .rules-section {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 20px;
    margin-bottom: 32px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      margin: 0;
      font-size: 18px;
      color: #1e2330;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &.btn-primary {
        background: #667eea;
        color: white;

        &:hover {
          background: #5568d3;
        }
      }
    }
  }

  .rules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .rule-card {
    padding: 20px;
    background: #f7f9fc;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
    }

    .rule-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        flex: 1;
      }

      .rule-link {
        color: #667eea;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #5568d3;
          text-decoration: underline;
        }
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;

        &.status-active {
          background: #d4edda;
          color: #155724;
        }

        &.status-inactive {
          background: #e8ecf5;
          color: #565f79;
        }
      }
    }

    .rule-desc {
      margin: 0 0 16px;
      font-size: 13px;
      color: #565f79;
      line-height: 1.5;
    }

    .rule-meta {
      display: flex;
      gap: 16px;
      padding: 12px 0;
      border-top: 1px solid #e8ecf5;
      border-bottom: 1px solid #e8ecf5;
      margin-bottom: 16px;

      .meta-item {
        flex: 1;
      }

      .meta-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: #8c95a7;
        margin-bottom: 4px;
      }

      .meta-value {
        font-size: 14px;
        font-weight: 600;
        color: #1e2330;
      }

      .priority {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;

        &.priority-high {
          background: #ffe8e8;
          color: #d32f2f;
        }

        &.priority-medium {
          background: #fff3cd;
          color: #856404;
        }

        &.priority-low {
          background: #d4edda;
          color: #155724;
        }
      }
    }

    .rule-footer {
      display: flex;
      gap: 8px;

      .action-btn {
        flex: 1;
        padding: 8px 12px;
        background: white;
        border: 1px solid #e8ecf5;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        color: #667eea;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #667eea;
          color: white;
        }

        &.delete {
          border-color: #f8d7da;
          color: #d32f2f;

          &:hover {
            background: #d32f2f;
            border-color: #d32f2f;
            color: white;
          }
        }
      }
    }
  }

  .stats-section {
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h2 {
      margin: 0 0 20px;
      font-size: 18px;
      color: #1e2330;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .stat-card {
      padding: 16px;
      background: #f7f9fc;
      border-radius: 8px;
      text-align: center;

      .stat-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: #8c95a7;
        margin-bottom: 8px;
      }

      .stat-number {
        display: block;
        font-size: 28px;
        font-weight: 700;
        color: #1e2330;

        &.active {
          color: #155724;
        }

        &.high {
          color: #d32f2f;
        }
      }

      .stat-date {
        display: block;
        font-size: 13px;
        color: #565f79;
      }
    }
  }
</style>
