<template>
  <div class="ffxiv-topics">
    <div class="topics-header">
      <h2>FF XIV Topics</h2>
      <p v-if="loading" class="loading-text">載入中...</p>
      <p v-else class="count-text">共 {{ topics.length }} 則話題</p>
    </div>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="refresh" class="retry-btn">重試</button>
    </div>

    <div v-else-if="!loading && topics.length === 0" class="empty-state">
      <p>暫無話題資料</p>
    </div>

    <ul v-else class="topics-list">
      <li v-for="topic in topics" :key="topic.id" class="topic-item">
        <div class="topic-date">{{ topic.timeStamp }}</div>
        <div class="topic-content">
          <a :href="topic.url" target="_blank" rel="noopener noreferrer" class="topic-link">
            {{ topic.title }}
          </a>
          <div class="topic-tooltip">
            <img v-if="topic.image" :src="topic.image" :alt="topic.title" class="topic-image" />
            <p class="topic-description">{{ topic.description }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getFFXIVTopics, formatTimestamp, sortByTimeDesc } from '../api/ffxivApi'
import type { Topic, Locale } from '~/types/ffxiv'

const props = defineProps<{
  locale: Locale
}>()

const topics = ref<Topic[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchTopics = async () => {
  loading.value = true
  error.value = null
  
  try {
    const data = await getFFXIVTopics(props.locale)
    
    // 格式化時間戳記並排序
    const formattedTopics = data.map(topic => ({
      ...topic,
      timeStamp: formatTimestamp(topic.time),
    }))
    
    topics.value = sortByTimeDesc(formattedTopics)
  } catch (err: any) {
    error.value = err.message || '獲取話題資料失敗'
    console.error('Failed to fetch topics:', err)
  } finally {
    loading.value = false
  }
}

const refresh = () => {
  fetchTopics()
}

// 初始化載入
onMounted(() => {
  fetchTopics()
})

// 監聽語言變更
watch(() => props.locale, () => {
  fetchTopics()
})
</script>

<style scoped lang="scss">
.ffxiv-topics {
  .topics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.125rem solid #e0e0e0;

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }

    .loading-text,
    .count-text {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }

  .error-message {
    padding: 1.25rem;
    background: #fee;
    border-left: 0.25rem solid #f44;
    color: #d00;
    border-radius: 0.25rem;
    margin-bottom: 1.25rem;

    p {
      margin: 0 0 0.75rem;
    }

    .retry-btn {
      padding: 0.5rem 1rem;
      background: #f44;
      color: #ffffff;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      font-weight: 600;

      &:hover {
        background: #d33;
      }
    }
  }

  .empty-state {
    padding: 2.5rem 1.25rem;
    text-align: center;
    color: #999;
    background: #f9f9f9;
    border-radius: 0.5rem;
  }

  .topics-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .topic-item {
      display: flex;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 0.0625rem solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .topic-date {
        flex-shrink: 0;
        color: #666;
        font-size: 0.9rem;
        min-width: 6.25rem;
      }

      .topic-content {
        flex: 1;
        position: relative;

        .topic-link {
          color: #1976d2;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;

          &:hover {
            color: #1565c0;
            text-decoration: underline;

            ~ .topic-tooltip {
              display: block;
            }
          }
        }

        .topic-tooltip {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 10;
          background: #ffffff;
          border: 0.0625rem solid #ddd;
          border-radius: 0.5rem;
          padding: 0.75rem;
          box-shadow: 0 0.25rem 0.75rem #00000026;
          max-width: 25rem;
          margin-top: 0.5rem;

          .topic-image {
            width: 100%;
            height: auto;
            border-radius: 0.25rem;
            margin-bottom: 0.5rem;
          }

          .topic-description {
            margin: 0;
            color: #666;
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }
      }
    }
  }
}
</style>
