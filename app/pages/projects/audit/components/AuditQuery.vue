<template>
  <div class="audit-query">
    <!-- 查詢表單 -->
    <section class="query-form">
      <h2>後台稽核查詢</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>後台作業</label>
          <input 
            v-model="queryForm.checkName" 
            type="text" 
            placeholder="輸入作業或規則名稱"
            class="input-field"
          />
        </div>
        <div class="form-group">
          <label>狀態</label>
          <select v-model="queryForm.status" class="input-field">
            <option value="">全部</option>
            <option value="pending">待檢查</option>
            <option value="passed">已通過</option>
            <option value="failed">未通過</option>
          </select>
        </div>
        <div class="form-group">
          <label>優先級</label>
          <select v-model="queryForm.priority" class="input-field">
            <option value="">全部</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>
        <div class="form-group">
          <label>日期範圍</label>
          <input 
            v-model="queryForm.dateRange" 
            type="date" 
            class="input-field"
          />
        </div>
      </div>
      <div class="form-actions">
        <button @click="queryData" class="btn-primary">
          <i class="fas fa-search"></i> 查詢
        </button>
        <button @click="resetForm" class="btn-secondary">
          <i class="fas fa-redo"></i> 重置
        </button>
        <button @click="$emit('mode-change', { mode: 'create' })" class="btn-primary">
          <i class="fas fa-plus"></i> 新建
        </button>
      </div>
    </section>

    <!-- 查詢結果表格 -->
    <section class="query-results" v-if="showTable">
      <h2>稽核清單</h2>
      <div class="table-wrapper">
        <table class="query-table">
          <thead>
            <tr>
              <th style="width: 3.125rem"><input type="checkbox" @change="toggleAll" /></th>
              <th>稽核項目</th>
              <th>模組</th>
              <th>狀態</th>
              <th>優先級</th>
              <th>負責人</th>
              <th>異動日期</th>
              <th style="width: 7.5rem">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.id" class="table-row">
              <td><input type="checkbox" :value="item.id" v-model="selectedIds" /></td>
              <td><strong>{{ item.checkName }}</strong></td>
              <td>{{ item.category }}</td>
              <td>
                <span :class="['status-badge', item.status]">
                  {{ getStatusLabel(item.status) }}
                </span>
              </td>
              <td>
                <span :class="['priority-badge', item.priority]">
                  {{ getPriorityLabel(item.priority) }}
                </span>
              </td>
              <td>{{ item.owner }}</td>
              <td>{{ formatDate(item.createdAt) }}</td>
              <td>
                <div class="action-buttons">
                  <button 
                    @click="$emit('mode-change', { mode: 'edit', selectedData: item })"
                    class="btn-icon"
                    title="編輯"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteItem(item.id)" class="btn-icon danger" title="刪除">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分頁 -->
      <div class="pagination">
        <span>共 {{ totalRecords }} 筆記錄</span>
        <div class="page-buttons">
          <button :disabled="currentPage === 1" @click="currentPage--">上一頁</button>
          <span>第 {{ currentPage }} 頁，每頁 {{ pageSize }} 筆</span>
          <button :disabled="currentPage >= Math.ceil(totalRecords / pageSize)" @click="currentPage++">下一頁</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// console 呼叫保留
console.log('Audit Query Component loaded')

defineEmits<{
  'mode-change': [data: { mode: 'create' | 'edit'; selectedData?: any }]
}>()

// 查詢表單
const queryForm = ref({
  checkName: '',
  status: '',
  priority: '',
  dateRange: '',
})

// 表格數據
const showTable = ref(false)
const tableData = ref<any[]>([])
const selectedIds = ref<string[]>([])
const totalRecords = ref(0)
const currentPage = ref(1)
const pageSize = 10

// 模擬數據
const mockData = [
  {
    id: '1',
    checkName: '採購申請流程稽核',
    category: '採購',
    status: 'passed',
    priority: 'high',
    owner: '王怡婷',
    createdAt: new Date('2026-02-20'),
  },
  {
    id: '2',
    checkName: '庫存盤點差異稽核',
    category: '庫存',
    status: 'pending',
    priority: 'high',
    owner: '林志豪',
    createdAt: new Date('2026-02-22'),
  },
  {
    id: '3',
    checkName: '財務憑證核對',
    category: '財務',
    status: 'failed',
    priority: 'medium',
    owner: '陳雅涵',
    createdAt: new Date('2026-02-21'),
  },
  {
    id: '4',
    checkName: '人資權限配置稽核',
    category: '人資',
    status: 'passed',
    priority: 'medium',
    owner: '張皓然',
    createdAt: new Date('2026-02-23'),
  },
]

// 查詢數據
const queryData = () => {
  tableData.value = mockData.filter(item => {
    if (queryForm.value.checkName && !item.checkName.includes(queryForm.value.checkName)) return false
    if (queryForm.value.status && item.status !== queryForm.value.status) return false
    if (queryForm.value.priority && item.priority !== queryForm.value.priority) return false
    return true
  })
  totalRecords.value = tableData.value.length
  currentPage.value = 1
  showTable.value = !0
}

// 重置表單
const resetForm = () => {
  queryForm.value = {
    checkName: '',
    status: '',
    priority: '',
    dateRange: '',
  }
  showTable.value = !1
  selectedIds.value = []
}

// 全選
const toggleAll = (e: any) => {
  if (e.target.checked) {
    selectedIds.value = tableData.value.map(item => item.id)
  } else {
    selectedIds.value = []
  }
}

// 刪除項目
const deleteItem = (id: string) => {
  if (confirm('確定要刪除此項目嗎？')) {
    tableData.value = tableData.value.filter(item => item.id !== id)
    totalRecords.value--
  }
}

// 輔助函數
const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: '待檢查',
    passed: '已通過',
    failed: '未通過',
  }
  return labels[status] || status
}

const getPriorityLabel = (priority: string) => {
  const labels: Record<string, string> = {
    high: '高',
    medium: '中',
    low: '低',
  }
  return labels[priority] || priority
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-TW')
}
</script>

<style scoped lang="scss">
.audit-query {
  max-width: 87.5rem;
  margin: 0 auto;
}

.query-form {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0.125rem 0.5rem #00000014;

  h2 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e2330;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #565f79;
  }
}

.input-field {
  padding: 0.625rem 0.75rem;
  border: 0.0625rem solid #e8ecf5;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 0.1875rem #667eea1a;
  }
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.5rem 1rem #667eea4d;
  }
}

.btn-secondary {
  background: #e8ecf5;
  color: #565f79;

  &:hover {
    background: #d8e0e8;
  }
}

.query-results {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 0.5rem #00000014;

  h2 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e2330;
  }
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 1.25rem;
}

.query-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;

  thead {
    background: #f5f6fa;
    border-bottom: 0.125rem solid #e8ecf5;
  }

  th {
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    color: #565f79;
  }

  td {
    padding: 0.75rem;
    border-bottom: 0.0625rem solid #e8ecf5;
    color: #1e2330;
  }

  .table-row:hover {
    background: #f9fafb;
  }
}

.status-badge,
.priority-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge {
  &.passed {
    background: #d4edda;
    color: #155724;
  }

  &.pending {
    background: #fff3cd;
    color: #856404;
  }

  &.failed {
    background: #f8d7da;
    color: #721c24;
  }
}

.priority-badge {
  &.high {
    background: #f8d7da;
    color: #721c24;
  }

  &.medium {
    background: #fff3cd;
    color: #856404;
  }

  &.low {
    background: #d4edda;
    color: #155724;
  }
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  background: #e8ecf5;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #667eea;
    color: #ffffff;
  }

  &.danger {
    color: #dc3545;

    &:hover {
      background: #dc3545;
      color: #ffffff;
    }
  }
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 0.0625rem solid #e8ecf5;
  font-size: 0.8125rem;
  color: #565f79;
}

.page-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;

  button {
    padding: 0.375rem 0.75rem;
    border: 0.0625rem solid #e8ecf5;
    border-radius: 0.25rem;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      border-color: #667eea;
      color: #667eea;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

:global(.dark-mode) .audit-query {
  background: transparent;
}

:global(.dark-mode) .query-form,
:global(.dark-mode) .query-results {
  background: #1b1f32;
  box-shadow: 0 0.125rem 0.5rem #0000004d;
}

:global(.dark-mode) .query-form h2,
:global(.dark-mode) .query-results h2 {
  color: #e6e9f2;
}

:global(.dark-mode) .form-group label {
  color: #cfd6e6;
}

:global(.dark-mode) .input-field {
  background: #e6e9f20d;
  border-color: #e6e9f226;
  color: #e6e9f2;

  &:focus {
    border-color: #667eea;
    background: #e6e9f214;
  }

  &::placeholder {
    color: #8c95a7;
  }
}

:global(.dark-mode) .btn-secondary {
  background: #e6e9f21a;
  color: #cfd6e6;

  &:hover {
    background: #e6e9f226;
  }
}

:global(.dark-mode) .query-table thead {
  background: #e6e9f20d;
  border-bottom-color: #e6e9f226;
}

:global(.dark-mode) .query-table th {
  color: #cfd6e6;
}

:global(.dark-mode) .query-table td {
  color: #e6e9f2;
  border-bottom-color: #e6e9f214;
}

:global(.dark-mode) .query-table .table-row:hover {
  background: #e6e9f20d;
}

:global(.dark-mode) .status-badge.passed {
  background: #1d6b454d;
  color: #5ff5a0;
}

:global(.dark-mode) .status-badge.pending {
  background: #8a6d1a4d;
  color: #ffd966;
}

:global(.dark-mode) .status-badge.failed {
  background: #a6342e4d;
  color: #ff9494;
}

:global(.dark-mode) .priority-badge.high {
  background: #a6342e4d;
  color: #ff9494;
}

:global(.dark-mode) .priority-badge.medium {
  background: #8a6d1a4d;
  color: #ffd966;
}

:global(.dark-mode) .priority-badge.low {
  background: #1d6b454d;
  color: #5ff5a0;
}

:global(.dark-mode) .btn-icon {
  background: #e6e9f21a;
  color: #667eea;

  &:hover {
    background: #667eea;
    color: #ffffff;
  }

  &.danger {
    color: #ff9494;

    &:hover {
      background: #dc3545;
      color: #ffffff;
    }
  }
}

:global(.dark-mode) .pagination {
  border-top-color: #e6e9f226;
  color: #cfd6e6;
}

:global(.dark-mode) .page-buttons button {
  background: #e6e9f20d;
  border-color: #e6e9f226;
  color: #e6e9f2;

  &:hover:not(:disabled) {
    border-color: #667eea;
    color: #667eea;
  }
}
</style>
