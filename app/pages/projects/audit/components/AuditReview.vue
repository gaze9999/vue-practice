<template>
  <div class="audit-review">
    <div class="header">
      <button @click="$emit('back')" class="btn-back">
        <i class="fas fa-arrow-left"></i> 返回
      </button>
      <h1>購物後台稽核審核</h1>
    </div>

    <div class="content">
      <!-- 檢查信息概覽 -->
      <section class="info-panel">
        <div class="info-item">
          <span class="label">稽核項目</span>
          <span class="value">{{ selectedData?.checkName || '採購申請流程稽核' }}</span>
        </div>
        <div class="info-item">
          <span class="label">模組</span>
          <span class="value">{{ selectedData?.category || '採購' }}</span>
        </div>
        <div class="info-item">
          <span class="label">優先級</span>
          <span :class="['value', 'priority-' + (selectedData?.priority || 'high')]">
            {{ getPriorityLabel(selectedData?.priority || 'high') }}
          </span>
        </div>
        <div class="info-item">
          <span class="label">負責人</span>
          <span class="value">{{ selectedData?.owner || '王怡婷' }}</span>
        </div>
      </section>

      <!-- 檢查結果 -->
      <section class="form-section">
        <h2>檢查結果</h2>
        <div class="result-tabs">
          <button 
            v-for="tab in resultTabs"
            :key="tab"
            @click="activeResultTab = tab"
            :class="['tab-btn', { active: activeResultTab === tab }]"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="activeResultTab === '概覽'" class="tab-content">
          <div class="flex-grid">
            <div class="stat-box">
              <div class="stat-value">{{ results.totalItems }}</div>
              <div class="stat-label">檢查項數</div>
            </div>
            <div class="stat-box">
              <div class="stat-value success">{{ results.passedItems }}</div>
              <div class="stat-label">通過</div>
            </div>
            <div class="stat-box">
              <div class="stat-value warning">{{ results.warningItems }}</div>
              <div class="stat-label">警告</div>
            </div>
            <div class="stat-box">
              <div class="stat-value danger">{{ results.failedItems }}</div>
              <div class="stat-label">失敗</div>
            </div>
          </div>

          <div class="progress-item">
            <span>總體合規率</span>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: results.complianceRate + '%' }"></div>
            </div>
            <span class="progress-text">{{ results.complianceRate }}%</span>
          </div>
        </div>

        <div v-if="activeResultTab === '詳細結果'" class="tab-content">
          <AuditDetailsTable :rows="results.details" />
        </div>

        <div v-if="activeResultTab === '建議'" class="tab-content">
          <div class="suggestions-list">
            <div v-for="(suggestion, index) in results.suggestions" :key="index" class="suggestion-item">
              <div class="suggestion-priority" :class="'priority-' + suggestion.priority"></div>
              <div class="suggestion-content">
                <h4>{{ suggestion.title }}</h4>
                <p>{{ suggestion.description }}</p>
                <div class="suggestion-meta">
                  <span>優先級：{{ suggestion.priority }}</span>
                  <span>預計工作量：{{ suggestion.effort }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 審核意見 -->
      <section class="form-section">
        <h2>審核意見</h2>
        <div class="form-group">
          <label>審核結論</label>
          <div class="radio-group">
            <label class="radio-option">
              <input v-model="reviewData.conclusion" type="radio" value="passed" />
              <span>通過</span>
            </label>
            <label class="radio-option">
              <input v-model="reviewData.conclusion" type="radio" value="conditionalPass" />
              <span>有條件通過</span>
            </label>
            <label class="radio-option">
              <input v-model="reviewData.conclusion" type="radio" value="notPassed" />
              <span>未通過</span>
            </label>
          </div>
        </div>
        <div class="form-group full-width">
          <label>審核備註</label>
          <textarea v-model="reviewData.notes" class="input-field" rows="4" placeholder="請輸入審核備註..."></textarea>
        </div>
      </section>

      <!-- 操作按鈕 -->
      <div class="form-actions">
        <button @click="$emit('back')" class="btn-cancel">
          <i class="fas fa-times"></i> 返回
        </button>
        <button @click="submitReview" class="btn-submit">
          <i class="fas fa-check"></i> 提交審核
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuditDetailsTable from '~/components/audit/AuditDetailsTable.vue'

// console 呼叫保留
console.log('Audit Review Component loaded')

interface Props {
  selectedData?: any
}

defineProps<Props>()
defineEmits<{
  'back': []
}>()

const activeResultTab = ref('概覽')
const resultTabs = ['概覽', '詳細結果', '建議']

const reviewData = ref({
  conclusion: 'passed',
  notes: '',
})

const results = ref({
  totalItems: 15,
  passedItems: 12,
  warningItems: 2,
  failedItems: 1,
  complianceRate: 85,
  details: [
    { id: 1, name: '採購申請流程', result: '通過', issue: '無', suggestion: '維持現行簽核節點' },
    { id: 2, name: '庫存盤點差異', result: '警告', issue: '盤點批次缺漏', suggestion: '補齊盤點批次與追蹤' },
    { id: 3, name: '財務憑證核對', result: '失敗', issue: '部分憑證未匹配', suggestion: '補登與調整核對規則' },
  ],
  suggestions: [
    {
      title: '強化採購簽核節點',
      description: '針對高金額採購增加二級審核節點，避免單點審核風險。',
      priority: 'high',
      effort: '中',
    },
    {
      title: '建立庫存盤點追蹤機制',
      description: '針對盤點差異建立批次追蹤，並定期檢討差異原因。',
      priority: 'medium',
      effort: '大',
    },
    {
      title: '更新財務憑證核對規範',
      description: '統一憑證核對規格與資料來源，降低漏登風險。',
      priority: 'low',
      effort: '小',
    },
  ],
})

const getPriorityLabel = (priority: string) => {
  const labels: Record<string, string> = {
    high: '高',
    medium: '中',
    low: '低',
  }
  return labels[priority] || priority
}

const submitReview = () => {
  alert('審核已提交！')
}
</script>

<style scoped lang="scss">
.audit-review {
  max-width: 75rem;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e2330;
  }
}

.btn-back {
  padding: 0.625rem 1rem;
  background: #e8ecf5;
  border: none;
  border-radius: 0.375rem;
  color: #565f79;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #d8e0e8;
  }
}

.content {
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 0.5rem #00000014;
  overflow: hidden;
}

.info-panel {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
  gap: 1rem;
  background: #f9fafb;
  border-bottom: 0.0625rem solid #e8ecf5;
}

.info-item {
  display: flex;
  flex-direction: column;

  .label {
    font-size: 0.75rem;
    color: #8c95a7;
    text-transform: uppercase;
    letter-spacing: 0.03125rem;
    margin-bottom: 0.25rem;
  }

  .value {
    font-size: 1rem;
    font-weight: 600;
    color: #1e2330;

    &.priority-high {
      color: #dc3545;
    }

    &.priority-medium {
      color: #ffc107;
    }

    &.priority-low {
      color: #28a745;
    }
  }
}

.form-section {
  padding: 1.5rem;
  border-bottom: 0.0625rem solid #e8ecf5;

  h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #1e2330;
  }
}

.result-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 1rem;
  border-bottom: 0.125rem solid #e8ecf5;
}

.tab-btn {
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: none;
  font-weight: 600;
  color: #565f79;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 0.1875rem solid transparent;
  margin-bottom: -0.125rem;

  &:hover {
    color: #667eea;
  }

  &.active {
    color: #667eea;
    border-bottom-color: #667eea;
  }
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.flex-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.375rem, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  text-align: center;
  border-left: 0.25rem solid #e8ecf5;

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e2330;
    margin-bottom: 0.25rem;

    &.success {
      color: #28a745;
    }

    &.warning {
      color: #ffc107;
    }

    &.danger {
      color: #dc3545;
    }
  }

  .stat-label {
    font-size: 0.75rem;
    color: #8c95a7;
  }
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;

  .progress-bar {
    flex: 1;
    height: 0.5rem;
    background: #e8ecf5;
    border-radius: 0.25rem;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }
  }

  .progress-text {
    min-width: 3.125rem;
    text-align: right;
    font-weight: 600;
    color: #667eea;
  }
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;

  thead {
    background: #f9fafb;
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

  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.6875rem;
    font-weight: 600;

    &.通過 {
      background: #d4edda;
      color: #155724;
    }

    &.警告 {
      background: #fff3cd;
      color: #856404;
    }

    &.失敗 {
      background: #f8d7da;
      color: #721c24;
    }
  }
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.suggestion-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;

  .suggestion-priority {
    width: 0.25rem;
    border-radius: 0.25rem;

    &.priority-high {
      background: #dc3545;
    }

    &.priority-medium {
      background: #ffc107;
    }

    &.priority-low {
      background: #28a745;
    }
  }

  .suggestion-content {
    flex: 1;

    h4 {
      margin: 0 0 0.5rem;
      font-size: 0.875rem;
      color: #1e2330;
    }

    p {
      margin: 0 0 0.75rem;
      font-size: 0.8125rem;
      color: #565f79;
      line-height: 1.6;
    }

    .suggestion-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.75rem;
      color: #8c95a7;
    }
  }
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #565f79;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}

.radio-group {
  display: flex;
  gap: 1.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #1e2330;
  cursor: pointer;

  input[type='radio'] {
    cursor: pointer;
  }
}

.input-field {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 0.0625rem solid #e8ecf5;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 0.1875rem #667eea1a;
  }
}

textarea.input-field {
  resize: vertical;
}

.form-actions {
  padding: 1.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  background: #f9fafb;
  border-top: 0.0625rem solid #e8ecf5;
}

.btn-cancel,
.btn-submit {
  padding: 0.625rem 1.5rem;
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

.btn-cancel {
  background: #e8ecf5;
  color: #565f79;

  &:hover {
    background: #d8e0e8;
  }
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.5rem 1rem #667eea4d;
  }
}

:global(.dark-mode) .audit-review {
  background: transparent;
}

:global(.dark-mode) .header h1 {
  color: #e6e9f2;
}

:global(.dark-mode) .btn-back {
  background: #e6e9f21a;
  color: #cfd6e6;

  &:hover {
    background: #e6e9f226;
  }
}

:global(.dark-mode) .content {
  background: #1b1f32;
  box-shadow: 0 0.125rem 0.5rem #0000004d;
}

:global(.dark-mode) .info-panel {
  background: #e6e9f20d;
  border-bottom-color: #e6e9f226;
}

:global(.dark-mode) .info-item .label {
  color: #8c95a7;
}

:global(.dark-mode) .info-item .value {
  color: #e6e9f2;
}

:global(.dark-mode) .form-section {
  border-bottom-color: #e6e9f226;
}

:global(.dark-mode) .form-section h2 {
  color: #e6e9f2;
}

:global(.dark-mode) .result-tabs {
  border-bottom-color: #e6e9f226;
}

:global(.dark-mode) .tab-btn {
  color: #cfd6e6;

  &:hover {
    color: #667eea;
  }

  &.active {
    color: #667eea;
  }
}

:global(.dark-mode) .stat-box {
  background: #e6e9f20d;
  border-left-color: #e6e9f226;
}

:global(.dark-mode) .stat-box .stat-value {
  color: #e6e9f2;
}

:global(.dark-mode) .stat-box .stat-label {
  color: #8c95a7;
}

:global(.dark-mode) .progress-bar {
  background: #e6e9f226;
}

:global(.dark-mode) .progress-item .progress-text {
  color: #667eea;
}

:global(.dark-mode) .result-table thead {
  background: #e6e9f20d;
  border-bottom-color: #e6e9f226;
}

:global(.dark-mode) .result-table th {
  color: #cfd6e6;
}

:global(.dark-mode) .result-table td {
  color: #e6e9f2;
  border-bottom-color: #e6e9f214;
}

:global(.dark-mode) .badge.通過 {
  background: #1d6b454d;
  color: #5ff5a0;
}

:global(.dark-mode) .badge.警告 {
  background: #8a6d1a4d;
  color: #ffd966;
}

:global(.dark-mode) .badge.失敗 {
  background: #a6342e4d;
  color: #ff9494;
}

:global(.dark-mode) .suggestion-item {
  background: #e6e9f20d;
}

:global(.dark-mode) .suggestion-content h4 {
  color: #e6e9f2;
}

:global(.dark-mode) .suggestion-content p {
  color: #cfd6e6;
}

:global(.dark-mode) .suggestion-content .suggestion-meta {
  color: #8c95a7;
}

:global(.dark-mode) .form-group label {
  color: #cfd6e6;
}

:global(.dark-mode) .radio-option {
  color: #e6e9f2;
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

:global(.dark-mode) .form-actions {
  background: #e6e9f20d;
  border-top-color: #e6e9f226;
}

:global(.dark-mode) .btn-cancel {
  background: #e6e9f21a;
  color: #cfd6e6;

  &:hover {
    background: #e6e9f226;
  }
}
</style>
