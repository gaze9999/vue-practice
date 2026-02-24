<template>
  <div class="input-bar">
    <input
      v-model.trim="inputLink"
      type="text"
      class="input-field"
      placeholder="輸入YouTube連結或影片ID"
      @keyup.enter="handleSubmit"
      aria-label="YouTube連結輸入欄"
    />
    <button
      @click="handleSubmit"
      class="submit-btn"
      :disabled="!inputLink"
      aria-label="送出影片連結"
    >
      送出
    </button>
  </div>
  
  <div v-if="errorMessage" class="error-message" role="alert">
    {{ errorMessage }}
  </div>
  
  <div v-if="successMessage" class="success-message" role="status">
    {{ successMessage }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  submit: [videoId: string]
}>()

const inputLink = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const handleSubmit = () => {
  clearMessages()
  
  if (!inputLink.value) {
    errorMessage.value = '請輸入連結'
    return
  }

  try {
    emit('submit', inputLink.value)
    successMessage.value = '已添加影片'
    inputLink.value = ''
    
    // 3秒後清除成功訊息
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error: any) {
    errorMessage.value = error.message || '添加影片失敗'
  }
}
</script>

<style scoped lang="scss">
.input-bar {
  display: flex;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f0e6 0%, #f9f7f3 100%);
  border-radius: 8px;
  margin-bottom: 20px;

  .input-field {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: #333;
      box-shadow: 0 0 0 3px rgba(51, 51, 51, 0.1);
    }

    &::placeholder {
      color: #999;
    }
  }

  .submit-btn {
    padding: 12px 24px;
    background: #333;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
      background: #222;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.error-message {
  padding: 12px 16px;
  margin-bottom: 16px;
  background-color: #fee;
  border-left: 4px solid #f44;
  color: #d00;
  border-radius: 4px;
  font-size: 14px;
}

.success-message {
  padding: 12px 16px;
  margin-bottom: 16px;
  background-color: #efe;
  border-left: 4px solid #4f4;
  color: #0a0;
  border-radius: 4px;
  font-size: 14px;
}
</style>
