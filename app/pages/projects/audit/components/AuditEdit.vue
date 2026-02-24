<template>
  <div class="audit-edit">
    <div class="header">
      <button @click="$emit('back')" class="btn-back">
        <i class="fas fa-arrow-left"></i> 返回
      </button>
      <h1>{{ mode === 'create' ? '新建檢查項目' : '編輯檢查項目' }}</h1>
    </div>

    <div class="content">
      <!-- 基本信息 -->
      <section class="form-section">
        <h2>基本信息</h2>
        <div class="form-grid">
          <div class="form-group">
            <label>檢查項目名稱 *</label>
            <input v-model="formData.checkName" type="text" class="input-field" />
          </div>
          <div class="form-group">
            <label>分類 *</label>
            <select v-model="formData.category" class="input-field">
              <option>安全性</option>
              <option>權限管理</option>
              <option>數據保護</option>
              <option>系統運維</option>
            </select>
          </div>
          <div class="form-group">
            <label>優先級 *</label>
            <select v-model="formData.priority" class="input-field">
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
          <div class="form-group">
            <label>負責人 *</label>
            <input v-model="formData.owner" type="text" class="input-field" />
          </div>
        </div>
      </section>

      <!-- 檢查詳情 -->
      <section class="form-section">
        <h2>檢查詳情</h2>
        <div class="form-group full-width">
          <label>檢查描述</label>
          <textarea v-model="formData.description" class="input-field" rows="6" placeholder="詳細描述檢查項目的目的和範圍..."></textarea>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label>檢查方法</label>
            <select v-model="formData.method" class="input-field">
              <option>自動檢查</option>
              <option>手動檢查</option>
              <option>混合檢查</option>
            </select>
          </div>
          <div class="form-group">
            <label>檢查頻率</label>
            <select v-model="formData.frequency" class="input-field">
              <option>每日</option>
              <option>每周</option>
              <option>每月</option>
              <option>每季</option>
            </select>
          </div>
        </div>
      </section>

      <!-- 合規標準 -->
      <section class="form-section">
        <h2>合規標準</h2>
        <div class="form-group full-width">
          <label>合規要求</label>
          <textarea v-model="formData.complianceRequirement" class="input-field" rows="4" placeholder="指定此檢查項目的具體合規要求..."></textarea>
        </div>
        <div class="form-group full-width">
          <label>風險評估</label>
          <textarea v-model="formData.riskAssessment" class="input-field" rows="4" placeholder="描述不合規的風險及影響..."></textarea>
        </div>
      </section>

      <!-- 操作按鈕 -->
      <div class="form-actions">
        <button @click="$emit('back')" class="btn-cancel">
          <i class="fas fa-times"></i> 取消
        </button>
        <button @click="saveForm" class="btn-submit">
          <i class="fas fa-save"></i> {{ mode === 'create' ? '新建' : '保存' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// console 呼叫保留
console.log('Audit Edit Component loaded')

interface Props {
  mode: 'create' | 'edit'
  selectedData?: any
}

const props = defineProps<Props>()
defineEmits<{
  'back': []
}>()

const formData = ref({
  checkName: '',
  category: '安全性',
  priority: 'high',
  owner: '',
  description: '',
  method: '自動檢查',
  frequency: '每月',
  complianceRequirement: '',
  riskAssessment: '',
})

watch(() => props.selectedData, (newData) => {
  if (newData) {
    formData.value = { ...newData }
  }
}, { immediate: !0 })

const saveForm = () => {
  if (!formData.value.checkName || !formData.value.owner) {
    alert('請填寫必填項目')
    return
  }
  alert('保存成功！')
}
</script>

<style scoped lang="scss">
.audit-edit {
  max-width: 62.5rem;
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

.form-section {
  padding: 1.5rem;
  border-bottom: 0.0625rem solid #e8ecf5;

  &:last-of-type {
    border-bottom: none;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #1e2330;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
  gap: 1rem;
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

  &.full-width {
    grid-column: 1 / -1;
  }
}

.input-field {
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
  min-height: 6.25rem;
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
</style>
