<template>
  <div class="check-detail-page">
    <!-- 返回按鈕 -->
    <div class="back-link">
      <NuxtLink to="/projects/audit/checks">← 返回檢查清單</NuxtLink>
    </div>

    <!-- 檢查詳情 -->
    <header class="detail-header">
      <div>
        <h1>{{ checkDetail.name }}</h1>
        <p class="check-id">ID: {{ checkDetail.id }}</p>
      </div>
      <div class="header-actions">
        <span :class="['status-badge', `status-${checkDetail.status}`]">
          {{ checkDetail.status }}
        </span>
        <span :class="['result-badge', `result-${checkDetail.result}`]">
          {{ checkDetail.result }}
        </span>
      </div>
    </header>

    <!-- 檢查詳情卡片 -->
    <div class="detail-grid">
      <section class="detail-card">
        <h2>基本資訊</h2>
        <dl class="info-list">
          <dt>檢查名稱</dt>
          <dd>{{ checkDetail.name }}</dd>

          <dt>描述</dt>
          <dd>{{ checkDetail.description }}</dd>

          <dt>狀態</dt>
          <dd>
            <span :class="['status-badge', `status-${checkDetail.status}`]">
              {{ checkDetail.status }}
            </span>
          </dd>

          <dt>建立日期</dt>
          <dd>{{ checkDetail.createdAt }}</dd>

          <dt>最後執行</dt>
          <dd>{{ checkDetail.lastExecuted }}</dd>
        </dl>
      </section>

      <section class="detail-card">
        <h2>執行結果</h2>
        <dl class="info-list">
          <dt>檢查結果</dt>
          <dd>
            <span :class="['result-badge', `result-${checkDetail.result}`]">
              {{ checkDetail.result }}
            </span>
          </dd>

          <dt>通過項目</dt>
          <dd class="pass-count">{{ checkDetail.passCount }} / {{ checkDetail.totalItems }}</dd>

          <dt>成功率</dt>
          <dd>
            <div class="mini-progress">
              <div class="mini-progress-fill" :style="{ width: `${successRate}%` }"></div>
            </div>
            <span class="success-rate-text">{{ successRate }}%</span>
          </dd>

          <dt>執行時間</dt>
          <dd>{{ checkDetail.executionTime }}</dd>
        </dl>
      </section>
    </div>

    <!-- 檢查規則 -->
    <section class="detail-card">
      <h2>使用的規則</h2>
      <div class="rules-list">
        <div v-for="rule in checkDetail.rules" :key="rule.id" class="rule-item">
          <div class="rule-header">
            <h3>{{ rule.name }}</h3>
            <span :class="['rule-status', `status-${rule.applied}`]">
              {{ rule.applied ? '已應用' : '未應用' }}
            </span>
          </div>
          <p class="rule-desc">{{ rule.description }}</p>
        </div>
      </div>
    </section>

    <!-- 詳細結果 -->
    <section class="detail-card">
      <h2>詳細檢查項目</h2>
      <div class="items-list">
        <div v-for="item in checkDetail.items" :key="item.id" class="item-row">
          <span class="item-icon">{{ item.status === 'pass' ? '✅' : '❌' }}</span>
          <div class="item-info">
            <h4>{{ item.name }}</h4>
            <p>{{ item.message }}</p>
          </div>
          <span :class="['item-status', `status-${item.status}`]">{{ item.status }}</span>
        </div>
      </div>
    </section>

    <!-- 操作按鈕 -->
    <div class="action-buttons">
      <button class="btn btn-primary">重新執行檢查</button>
      <button class="btn btn-secondary">編輯檢查</button>
      <button class="btn btn-danger">刪除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  // console 呼叫保留
  console.log('Check Detail page loaded')

  const route = useRoute()

  interface Rule {
    id: string
    name: string
    description: string
    applied: boolean
  }

  interface CheckItem {
    id: string
    name: string
    status: string
    message: string
  }

  interface CheckDetail {
    id: string
    name: string
    description: string
    status: string
    result: string
    createdAt: string
    lastExecuted: string
    passCount: number
    totalItems: number
    executionTime: string
    rules: Rule[]
    items: CheckItem[]
  }

  const checkDetail = ref<CheckDetail>({
    id: 'CHK001',
    name: '資料加密檢查',
    description: '驗證系統中的所有敏感數據是否已正確加密',
    status: 'completed',
    result: 'pass',
    createdAt: '2024-01-15',
    lastExecuted: '2024-02-10 14:30',
    passCount: 5,
    totalItems: 5,
    executionTime: '2分30秒',
    rules: [
      {
        id: 'RULE001',
        name: 'TLS 1.2+ 加密',
        description: '檢查傳輸層是否使用 TLS 1.2 或更高版本',
        applied: !0,
      },
      {
        id: 'RULE002',
        name: '數據庫加密',
        description: '驗證數據庫中的敏感字段已加密',
        applied: !0,
      },
      {
        id: 'RULE003',
        name: '密鑰管理',
        description: '檢查加密密鑰的安全管理',
        applied: !0,
      },
    ],
    items: [
      {
        id: '1',
        name: '傳輸層加密',
        status: 'pass',
        message: 'HTTPS/TLS 配置正確，版本 1.3',
      },
      {
        id: '2',
        name: '靜態數據加密',
        status: 'pass',
        message: '數據庫使用 AES-256 加密',
      },
      {
        id: '3',
        name: '密鑰存儲',
        status: 'pass',
        message: '密鑰安全保存在密鑰管理系統',
      },
      {
        id: '4',
        name: '備份加密',
        status: 'pass',
        message: '備份文件已加密存儲',
      },
      {
        id: '5',
        name: '日誌加密',
        status: 'pass',
        message: '敏感日誌信息已加密記錄',
      },
    ],
  })

  const successRate = computed(() => {
    return Math.round((checkDetail.value.passCount / checkDetail.value.totalItems) * 100)
  })
</script>

<style scoped lang="scss">
  .check-detail-page {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .back-link {
    margin-bottom: 20px;

    a {
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: color 0.3s ease;

      &:hover {
        color: #5568d3;
      }
    }
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 32px;
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h1 {
      margin: 0 0 8px;
      font-size: 28px;
      font-weight: 700;
      color: #1e2330;
    }

    .check-id {
      margin: 0;
      font-size: 13px;
      color: #8c95a7;
      font-family: 'Courier New', monospace;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .detail-card {
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h2 {
      margin: 0 0 20px;
      font-size: 18px;
      font-weight: 700;
      color: #1e2330;
    }

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #1e2330;
    }

    h4 {
      margin: 0 0 4px;
      font-size: 14px;
      font-weight: 600;
      color: #1e2330;
    }
  }

  .info-list {
    display: grid;
    gap: 16px;

    dt {
      font-size: 12px;
      font-weight: 600;
      color: #8c95a7;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    dd {
      margin: 0 0 12px;
      font-size: 14px;
      color: #565f79;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    .pass-count {
      font-weight: 600;
      color: #155724;
    }
  }

  .mini-progress {
    background: #e8ecf5;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;

    .mini-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }
  }

  .success-rate-text {
    font-size: 13px;
    font-weight: 600;
    color: #667eea;
  }

  .status-badge,
  .result-badge,
  .rule-status,
  .item-status {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;

    &.status-pending {
      background: #e8ecf5;
      color: #565f79;
    }

    &.status-completed,
    &.status-pass {
      background: #d4edda;
      color: #155724;
    }

    &.result-pass {
      background: #d4edda;
      color: #155724;
    }

    &.result-fail {
      background: #f8d7da;
      color: #721c24;
    }

    &.result-warning {
      background: #fff3cd;
      color: #856404;
    }
  }

  .rules-list {
    display: grid;
    gap: 16px;

    .rule-item {
      padding: 16px;
      background: #f7f9fc;
      border-radius: 8px;
      border-left: 3px solid #667eea;

      .rule-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .rule-desc {
        margin: 0;
        font-size: 13px;
        color: #565f79;
      }
    }
  }

  .items-list {
    display: grid;
    gap: 12px;

    .item-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: #f7f9fc;
      border-radius: 8px;
      border-left: 3px solid #e8ecf5;

      .item-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      .item-info {
        flex: 1;

        p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #8c95a7;
        }
      }

      .item-status {
        white-space: nowrap;
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 12px;
    margin-top: 32px;
    justify-content: center;

    .btn {
      padding: 12px 28px;
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

      &.btn-secondary {
        background: #e8ecf5;
        color: #667eea;

        &:hover {
          background: #d4dae3;
        }
      }

      &.btn-danger {
        background: #ffe8e8;
        color: #d32f2f;

        &:hover {
          background: #ffcccc;
        }
      }
    }
  }
</style>
