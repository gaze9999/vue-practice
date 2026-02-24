<template>
  <div class="checks-page">
    <header class="page-header">
      <h1>審計檢查管理</h1>
      <p class="subtitle">新增、編輯和執行檢查項目</p>
    </header>

    <!-- 檢查列表 -->
    <section class="checks-section">
      <div class="section-header">
        <h2>檢查清單</h2>
        <button class="btn btn-primary">+ 新增檢查</button>
      </div>

      <div class="table-wrapper">
        <table class="checks-table">
          <thead>
            <tr>
              <th>檢查ID</th>
              <th>名稱</th>
              <th>狀態</th>
              <th>執行時間</th>
              <th>結果</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="check in checksList" :key="check.id" class="check-row">
              <td class="id-cell">{{ check.id }}</td>
              <td class="name-cell">
                <NuxtLink :to="`/audit/checks/${check.id}`" class="check-link">
                  {{ check.name }}
                </NuxtLink>
              </td>
              <td>
                <span :class="['status-badge', `status-${check.status}`]">{{ check.status }}</span>
              </td>
              <td>{{ check.executedAt }}</td>
              <td>
                <span :class="['result-badge', `result-${check.result}`]">{{ check.result }}</span>
              </td>
              <td class="action-cell">
                <button class="action-btn">編輯</button>
                <button class="action-btn delete">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 篩選區域 -->
    <section class="filters-section">
      <h2>篩選與搜尋</h2>
      <div class="filters-grid">
        <div class="filter-group">
          <label>狀態</label>
          <select v-model="selectedStatus" class="select-input">
            <option value="">所有狀態</option>
            <option value="pending">待執行</option>
            <option value="executing">執行中</option>
            <option value="completed">已完成</option>
          </select>
        </div>

        <div class="filter-group">
          <label>結果</label>
          <select v-model="selectedResult" class="select-input">
            <option value="">所有結果</option>
            <option value="pass">通過</option>
            <option value="fail">失敗</option>
            <option value="warning">警告</option>
          </select>
        </div>

        <div class="filter-group">
          <label>搜尋</label>
          <input
            v-model="searchQuery"
            type="text"
            class="text-input"
            placeholder="輸入檢查名稱..."
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  // console 呼叫保留
  console.log('Checks Management page loaded')

  interface Check {
    id: string
    name: string
    status: string
    executedAt: string
    result: string
  }

  const selectedStatus = ref<string>('')
  const selectedResult = ref<string>('')
  const searchQuery = ref<string>('')

  const checksList = ref<Check[]>([
    {
      id: 'CHK001',
      name: '資料加密檢查',
      status: 'completed',
      executedAt: '2024-02-10 14:30',
      result: 'pass',
    },
    {
      id: 'CHK002',
      name: '存取控制檢查',
      status: 'executing',
      executedAt: '進行中',
      result: 'warning',
    },
    {
      id: 'CHK003',
      name: '密碼強度檢查',
      status: 'completed',
      executedAt: '2024-02-09 10:15',
      result: 'pass',
    },
    {
      id: 'CHK004',
      name: '備份完整性檢查',
      status: 'pending',
      executedAt: '待執行',
      result: 'pending',
    },
    {
      id: 'CHK005',
      name: '日誌記錄檢查',
      status: 'completed',
      executedAt: '2024-02-08 16:45',
      result: 'fail',
    },
    {
      id: 'CHK006',
      name: '防火牆設定檢查',
      status: 'completed',
      executedAt: '2024-02-07 09:20',
      result: 'pass',
    },
  ])
</script>

<style scoped lang="scss">
  .checks-page {
    padding: 20px;
    max-width: 1400px;
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

  .checks-section {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 32px;
    overflow: hidden;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e8ecf5;

    h2 {
      margin: 0;
      font-size: 18px;
      color: #1e2330;
    }
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

  .table-wrapper {
    overflow-x: auto;
  }

  .checks-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    thead {
      background: #f7f9fc;
      border-bottom: 2px solid #e8ecf5;

      th {
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        color: #1e2330;
      }
    }

    tbody tr {
      border-bottom: 1px solid #e8ecf5;
      transition: background 0.2s ease;

      &:hover {
        background: #f7f9fc;
      }
    }

    td {
      padding: 12px 16px;
      color: #565f79;
    }

    .id-cell {
      font-weight: 600;
      color: #667eea;
      font-family: 'Courier New', monospace;
    }

    .name-cell {
      font-weight: 500;
    }

    .check-link {
      color: #667eea;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #5568d3;
        text-decoration: underline;
      }
    }

    .status-badge,
    .result-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;

      &.status-pending,
      &.result-pending {
        background: #e8ecf5;
        color: #565f79;
      }

      &.status-executing {
        background: #fff3cd;
        color: #856404;
      }

      &.status-completed {
        background: #d4edda;
        color: #155724;
      }

      &.result-pass {
        background: #d4edda;
        color: #155724;
      }

      &.result-warning {
        background: #fff3cd;
        color: #856404;
      }

      &.result-fail {
        background: #f8d7da;
        color: #721c24;
      }
    }

    .action-cell {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      padding: 6px 12px;
      background: #e8ecf5;
      border: none;
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
        background: #ffe8e8;
        color: #d32f2f;

        &:hover {
          background: #d32f2f;
          color: white;
        }
      }
    }
  }

  .filters-section {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h2 {
      margin: 0 0 16px;
      font-size: 18px;
      color: #1e2330;
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }
  }

  .filter-group {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #1e2330;
    }
  }

  .select-input,
  .text-input {
    padding: 10px 12px;
    border: 1px solid #e8ecf5;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
</style>
