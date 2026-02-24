<template>
  <div class="rule-detail-page">
    <div class="back-link">
      <NuxtLink to="/projects/audit/rules">← 返回規則清單</NuxtLink>
    </div>

    <header class="detail-header">
      <div>
        <h1>{{ ruleDetail.name }}</h1>
        <p class="rule-id">ID: {{ ruleDetail.id }}</p>
      </div>
      <span :class="['status-badge', `status-${ruleDetail.status}`]">
        {{ ruleDetail.status }}
      </span>
    </header>

    <div class="detail-grid">
      <section class="detail-card">
        <h2>規則基本資訊</h2>
        <dl class="info-list">
          <dt>規則名稱</dt>
          <dd>{{ ruleDetail.name }}</dd>

          <dt>描述</dt>
          <dd>{{ ruleDetail.description }}</dd>

          <dt>類別</dt>
          <dd>{{ ruleDetail.category }}</dd>

          <dt>優先順序</dt>
          <dd>
            <span :class="['priority', `priority-${ruleDetail.priority}`]">
              {{ ruleDetail.priority }}
            </span>
          </dd>

          <dt>狀態</dt>
          <dd>
            <span :class="['status-badge', `status-${ruleDetail.status}`]">
              {{ ruleDetail.status }}
            </span>
          </dd>
        </dl>
      </section>

      <section class="detail-card">
        <h2>驗證條件</h2>
        <div class="conditions-list">
          <div v-for="(condition, idx) in ruleDetail.conditions" :key="idx" class="condition-item">
            <h4>{{ condition.name }}</h4>
            <p>{{ condition.description }}</p>
            <code>{{ condition.expression }}</code>
          </div>
        </div>
      </section>
    </div>

    <section class="detail-card">
      <h2>應用的檢查</h2>
      <div class="applies-grid">
        <div v-for="check in ruleDetail.appliesTo" :key="check.id" class="apply-item">
          <NuxtLink :to="`/projects/audit/checks/${check.id}`" class="apply-link">
            {{ check.name }}
          </NuxtLink>
          <span class="apply-count">{{ check.frequency }}次</span>
        </div>
      </div>
    </section>

    <div class="action-buttons">
      <button class="btn btn-primary">編輯規則</button>
      <button class="btn btn-secondary">複製規則</button>
      <button class="btn btn-danger">刪除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  // console 呼叫保留
  console.log('Rule Detail page loaded')

  interface Condition {
    name: string
    description: string
    expression: string
  }

  interface AppliesTo {
    id: string
    name: string
    frequency: number
  }

  interface RuleDetail {
    id: string
    name: string
    description: string
    category: string
    priority: string
    status: string
    conditions: Condition[]
    appliesTo: AppliesTo[]
  }

  const ruleDetail = ref<RuleDetail>({
    id: 'RULE001',
    name: 'TLS 1.2+ 加密',
    description: '檢查傳輸層是否使用 TLS 1.2 或更高版本',
    category: '傳輸安全',
    priority: 'high',
    status: 'active',
    conditions: [
      {
        name: '最小 TLS 版本',
        description: '伺服器應配置為至少支持 TLS 1.2',
        expression: 'tlsVersion >= 1.2',
      },
      {
        name: '弱密碼套件',
        description: '禁用所有已知的弱密碼套件',
        expression: '!(cipherSuite in WEAK_CIPHERS)',
      },
      {
        name: '完全前向保密',
        description: '啟用 PFS (Perfect Forward Secrecy)',
        expression: 'pfsEnabled === true',
      },
    ],
    appliesTo: [
      { id: 'CHK001', name: '資料加密檢查', frequency: 5 },
      { id: 'CHK003', name: '密碼強度檢查', frequency: 3 },
    ],
  })
</script>

<style scoped lang="scss">
  .rule-detail-page {
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

    .rule-id {
      margin: 0;
      font-size: 13px;
      color: #8c95a7;
      font-family: 'Courier New', monospace;
    }

    .status-badge {
      padding: 6px 12px;
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

    h4 {
      margin: 0 0 8px;
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
    }
  }

  .conditions-list {
    display: grid;
    gap: 16px;

    .condition-item {
      padding: 16px;
      background: #f7f9fc;
      border-radius: 8px;
      border-left: 3px solid #667eea;

      p {
        margin: 8px 0;
        font-size: 13px;
        color: #565f79;
      }

      code {
        display: block;
        margin-top: 8px;
        padding: 8px 12px;
        background: white;
        border: 1px solid #e8ecf5;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        color: #667eea;
        overflow-x: auto;
      }
    }
  }

  .applies-grid {
    display: grid;
    gap: 12px;

    .apply-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #f7f9fc;
      border-radius: 6px;

      .apply-link {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }

      .apply-count {
        font-size: 12px;
        color: #8c95a7;
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
