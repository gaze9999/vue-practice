<template>
  <div class="ffxiv-maintenance">
    <div class="maintenance-header">
      <h2>FF XIV Service Status</h2>
      <button @click="refresh" class="refresh-btn" :disabled="loading">
        {{ loading ? '更新中...' : '重新整理' }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>

    <!-- 最新維護資訊 -->
    <div v-if="latestMaintenance" class="latest-maintenance">
      <h3>最新維護資訊</h3>
      <div class="maintenance-card">
        <span class="date">{{ latestMaintenance.timeStamp }}</span>
        <a :href="latestMaintenance.url" target="_blank" rel="noopener noreferrer" class="title">
          {{ latestMaintenance.title }}
        </a>
      </div>
    </div>

    <!-- 當前服務狀態 -->
    <div v-if="currentStatus" class="service-status">
      <h3>服務狀態</h3>
      <div class="status-grid">
        <!-- Game Status -->
        <div class="status-item">
          <h4>遊戲伺服器</h4>
          <span v-if="!currentStatus.game.some(d => d.current)" class="status-badge online">
            ● 正常運作
          </span>
          <ul v-else class="maintenance-list">
            <li v-for="item in currentStatus.game" :key="item.id">
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </li>
          </ul>
        </div>

        <!-- Lodestone Status -->
        <div class="status-item">
          <h4>Lodestone</h4>
          <span v-if="!currentStatus.lodestone.some(d => d.current)" class="status-badge online">
            ● 正常運作
          </span>
          <ul v-else class="maintenance-list">
            <li v-for="item in currentStatus.lodestone" :key="item.id">
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </li>
          </ul>
        </div>

        <!-- Companion Status -->
        <div class="status-item">
          <h4>Companion App</h4>
          <span v-if="!currentStatus.companion.some(d => d.current)" class="status-badge online">
            ● 正常運作
          </span>
          <ul v-else class="maintenance-list">
            <li v-for="item in currentStatus.companion" :key="item.id">
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </li>
          </ul>
        </div>

        <!-- Mog Station Status -->
        <div class="status-item">
          <h4>Mog Station</h4>
          <span v-if="!currentStatus.mog.some(d => d.current)" class="status-badge online">
            ● 正常運作
          </span>
          <ul v-else class="maintenance-list">
            <li v-for="item in currentStatus.mog" :key="item.id">
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </li>
          </ul>
        </div>

        <!-- PSN Status -->
        <div class="status-item">
          <h4>PSN</h4>
          <span v-if="!currentStatus.psn.some(d => d.current)" class="status-badge online">
            ● 正常運作
          </span>
          <ul v-else class="maintenance-list">
            <li v-for="item in currentStatus.psn" :key="item.id">
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { getFFXIVMaintenance, getFFXIVMaintenanceCurrent, formatTimestamp, sortByTimeDesc } from '../api/ffxivApi'
import type { Maintenance, MaintenanceCurrent, Locale } from '~/types/ffxiv'

const props = defineProps<{
  locale: Locale
}>()

const maintenanceList = ref<Maintenance[]>([])
const currentStatus = ref<MaintenanceCurrent | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const latestMaintenance = computed(() => {
  if (maintenanceList.value.length === 0) return null
  return maintenanceList.value[0]
})

const fetchData = async () => {
  loading.value = true
  error.value = null

  try {
    const [maintenance, current] = await Promise.all([
      getFFXIVMaintenance(props.locale),
      getFFXIVMaintenanceCurrent(props.locale),
    ])

    // 格式化時間戳記並排序
    const formattedMaintenance = maintenance.map(item => ({
      ...item,
      timeStamp: formatTimestamp(item.time),
    }))

    maintenanceList.value = sortByTimeDesc(formattedMaintenance)
    currentStatus.value = current
  } catch (err: any) {
    error.value = err.message || '獲取維護資料失敗'
    console.error('Failed to fetch maintenance data:', err)
  } finally {
    loading.value = false
  }
}

const refresh = () => {
  fetchData()
}

// 初始化載入
onMounted(() => {
  fetchData()
})

// 監聽語言變更
watch(() => props.locale, () => {
  fetchData()
})
</script>

<style scoped lang="scss">
.ffxiv-maintenance {
  .maintenance-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e0e0e0;

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }

    .refresh-btn {
      padding: 8px 16px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.2s ease;

      &:hover:not(:disabled) {
        background: #1565c0;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  .error-message {
    padding: 16px;
    background: #fee;
    border-left: 4px solid #f44;
    color: #d00;
    border-radius: 4px;
    margin-bottom: 20px;

    p {
      margin: 0;
    }
  }

  .latest-maintenance {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 12px;
      font-size: 1.2rem;
      color: #333;
    }

    .maintenance-card {
      padding: 16px;
      background: #f9f9f9;
      border-left: 4px solid #1976d2;
      border-radius: 4px;

      .date {
        display: block;
        color: #666;
        font-size: 0.85rem;
        margin-bottom: 8px;
      }

      .title {
        color: #1976d2;
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .service-status {
    h3 {
      margin: 0 0 20px;
      font-size: 1.2rem;
      color: #333;
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .status-item {
        padding: 16px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;

        h4 {
          margin: 0 0 12px;
          font-size: 1rem;
          color: #333;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;

          &.online {
            background: #e8f5e9;
            color: #2e7d32;
          }

          &.maintenance {
            background: #fff3e0;
            color: #e65100;
          }
        }

        .maintenance-list {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;

            &:last-child {
              border-bottom: none;
            }

            a {
              color: #1976d2;
              text-decoration: none;
              font-size: 0.9rem;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
