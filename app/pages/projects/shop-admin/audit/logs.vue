<template>
  <div class="audit-logs">
    <section class="logs-header">
      <div class="filter-controls">
        <div class="filter-group">
          <label>篩選類型：</label>
          <select v-model="filterType" class="select-control">
            <option value="">全部</option>
            <option value="create">新增</option>
            <option value="update">修改</option>
            <option value="delete">刪除</option>
            <option value="approve">審核</option>
          </select>
        </div>

        <div class="filter-group">
          <label>嚴重程度：</label>
          <select v-model="filterSeverity" class="select-control">
            <option value="">全部</option>
            <option value="info">一般</option>
            <option value="warning">警告</option>
            <option value="error">高風險</option>
          </select>
        </div>

        <div class="filter-group">
          <label>使用者：</label>
          <input v-model="searchUser" type="text" class="input-control" placeholder="搜尋使用者名稱">
        </div>

        <button @click="applyFilters" class="btn-primary">篩選</button>
        <button @click="resetFilters" class="btn-secondary">重設</button>
      </div>
    </section>

    <section class="logs-table">
      <div class="table-container">
        <table class="audit-table">
          <thead>
            <tr>
              <th>時間</th>
              <th>使用者</th>
              <th>操作</th>
              <th>模組</th>
              <th>資源</th>
              <th>詳細資訊</th>
              <th>嚴重程度</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in displayedLogs" :key="log.id" :class="['log-row', log.severity]">
              <td class="time">{{ log.time }}</td>
              <td class="user">{{ log.user }}</td>
              <td class="operation">{{ log.operation }}</td>
              <td class="module">{{ log.module }}</td>
              <td class="resource">{{ log.resource }}</td>
              <td class="details">{{ log.details }}</td>
              <td>
                <span :class="['badge', log.severity]">{{ log.severityLabel }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="pagination-section">
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        上一頁
      </button>
      <div class="page-info">
        第 {{ currentPage }} / {{ totalPages }} 頁
      </div>
      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        下一頁
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

const filterType = ref('')
const filterSeverity = ref('')
const searchUser = ref('')
const currentPage = ref(1)
const pageSize = 20

const allLogs = [
  {
    id: 1,
    time: '2025-02-24 09:30',
    user: '王管理員',
    operation: '修改',
    module: '採購',
    resource: 'PO-2025-001',
    details: '變更供應商與交期',
    severity: 'info',
    severityLabel: '一般',
  },
  {
    id: 2,
    time: '2025-02-24 09:25',
    user: '李財務',
    operation: '審核',
    module: '財務',
    resource: 'INV-2025-0234',
    details: '審核發票付款',
    severity: 'info',
    severityLabel: '一般',
  },
  {
    id: 3,
    time: '2025-02-24 09:15',
    user: '陳庫存',
    operation: '修改',
    module: '庫存',
    resource: 'SKU-12345',
    details: '庫存調整 -50 件',
    severity: 'error',
    severityLabel: '高風險',
  },
  {
    id: 4,
    time: '2025-02-24 09:10',
    user: '王管理員',
    operation: '新增',
    module: '採購',
    resource: 'PR-2025-0089',
    details: '建立新採購需求單',
    severity: 'info',
    severityLabel: '一般',
  },
  {
    id: 5,
    time: '2025-02-24 09:05',
    user: '黃HR',
    operation: '新增',
    module: '人資',
    resource: 'JOB-2025-015',
    details: '新增招募職位',
    severity: 'info',
    severityLabel: '一般',
  },
  {
    id: 6,
    time: '2025-02-24 08:55',
    user: '李銷售',
    operation: '審核',
    module: '銷售',
    resource: 'SALES-INV-567',
    details: '批准銷售發票',
    severity: 'info',
    severityLabel: '一般',
  },
  {
    id: 7,
    time: '2025-02-24 08:45',
    user: '王管理員',
    operation: '刪除',
    module: '採購',
    resource: 'PR-2025-0088',
    details: '取消採購需求單',
    severity: 'warning',
    severityLabel: '警告',
  },
  {
    id: 8,
    time: '2025-02-24 08:35',
    user: '陳庫存',
    operation: '修改',
    module: '庫存',
    resource: 'LOC-A1-01',
    details: '更新庫位資訊',
    severity: 'info',
    severityLabel: '一般',
  },
]

const filteredLogs = computed(() => {
  return allLogs.filter((log) => {
    if (filterType.value && log.operation !== filterType.value) return false
    if (filterSeverity.value && log.severity !== filterSeverity.value) return false
    if (searchUser.value && !log.user.includes(searchUser.value)) return false
    return true
  })
})

const totalPages = computed(() => Math.ceil(filteredLogs.value.length / pageSize))

const displayedLogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredLogs.value.slice(start, end)
})

const applyFilters = () => {
  currentPage.value = 1
}

const resetFilters = () => {
  filterType.value = ''
  filterSeverity.value = ''
  searchUser.value = ''
  currentPage.value = 1
}
</script>

<style scoped>
  .audit-logs {
    display: grid;
    gap: 1.5rem;
  }

  .logs-header {
    padding: 1.25rem;
    background: white;
    border-radius: 0.75rem;
    border: 0.0625rem solid #e8e3db;
  }

  .filter-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
    gap: 0.75rem;
    align-items: flex-end;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .filter-group label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #1f1b2d;
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
  }

  .select-control,
  .input-control {
    padding: 0.5rem 0.75rem;
    border: 0.0625rem solid #d4c5b9;
    border-radius: 0.375rem;
    font-size: 0.8125rem;
    background: white;
    color: #1f1b2d;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .select-control:focus,
  .input-control:focus {
    border-color: #ff9f4a;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: #ff9f4a;
    color: white;
  }

  .btn-primary:hover {
    background: #ff7c1f;
  }

  .btn-secondary {
    background: #f0e6d8;
    color: #1f1b2d;
  }

  .btn-secondary:hover {
    background: #e8d9c9;
  }

  .logs-table {
    background: white;
    border-radius: 0.75rem;
    border: 0.0625rem solid #e8e3db;
    overflow: hidden;
  }

  .table-container {
    overflow-x: auto;
  }

  .audit-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8125rem;
  }

  .audit-table thead {
    background: #f7f1ea;
    border-bottom: 0.125rem solid #e8e3db;
  }

  .audit-table th {
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    color: #1f1b2d;
    text-transform: uppercase;
    letter-spacing: 0.03125rem;
  }

  .audit-table tbody tr {
    border-bottom: 0.0625rem solid #e8e3db;
    transition: background 0.2s ease;
  }

  .audit-table tbody tr:hover {
    background: #faf8f5;
  }

  .audit-table td {
    padding: 0.75rem;
    color: #1f1b2d;
  }

  .time {
    color: #9a7c5a;
    font-size: 0.75rem;
  }

  .user {
    font-weight: 600;
  }

  .operation {
    color: #ff9f4a;
    font-weight: 500;
  }

  .module {
    color: #6b4f3b;
  }

  .resource {
    color: #2980b9;
    font-weight: 500;
  }

  .details {
    color: #6b4f3b;
    max-width: 12.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.6875rem;
    font-weight: 600;
  }

  .badge.info {
    background: #e8f4e6;
    color: #27ae60;
  }

  .badge.warning {
    background: #fff3e0;
    color: #f39c12;
  }

  .badge.error {
    background: #ffe0df;
    color: #a6342e;
  }

  .pagination-section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: white;
    border-radius: 0.75rem;
    border: 0.0625rem solid #e8e3db;
  }

  .pagination-btn {
    padding: 0.5rem 1rem;
    border: 0.0625rem solid #d4c5b9;
    border-radius: 0.375rem;
    background: white;
    color: #1f1b2d;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-btn:hover:not(:disabled) {
    background: #f7f1ea;
    border-color: #ff9f4a;
    color: #ff9f4a;
  }

  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    font-size: 0.8125rem;
    color: #9a7c5a;
    font-weight: 600;
  }

  @media (max-width: 48rem) {
    .filter-controls {
      grid-template-columns: 1fr;
    }

    .audit-table {
      font-size: 0.75rem;
    }

    .audit-table th,
    .audit-table td {
      padding: 0.5rem;
    }

    .details {
      max-width: 9.375rem;
    }
  }
</style>
