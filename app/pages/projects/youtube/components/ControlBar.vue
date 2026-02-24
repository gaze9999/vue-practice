<template>
  <div class="control-bar">
    <div class="controls-group">
      <button
        @click="togglePlaying"
        class="control-btn"
        :title="isPlaying ? '暫停' : '播放'"
        :aria-label="isPlaying ? '暫停所有影片' : '播放所有影片'"
      >
        <span class="icon">{{ isPlaying ? '⏸' : '▶' }}</span>
        {{ isPlaying ? '暫停' : '播放' }}
      </button>

      <button
        @click="toggleMuted"
        class="control-btn"
        :title="isMuted ? '開啟音量' : '靜音'"
        :aria-label="isMuted ? '開啟音量' : '靜音所有影片'"
      >
        <span class="icon"><i v-if="isMuted" class="fas fa-volume-mute"></i><i v-else class="fas fa-volume-up"></i></span>
        {{ isMuted ? '開啟音量' : '靜音' }}
      </button>

      <button
        @click="toggleChat"
        class="control-btn"
        :class="{ active: showChat }"
        :title="showChat ? '隱藏聊天' : '顯示聊天'"
        :aria-label="showChat ? '隱藏聊天室' : '顯示聊天室'"
      >
        <span class="icon"><i class="fas fa-comments"></i></span>
        {{ showChat ? '隱藏聊天' : '顯示聊天' }}
      </button>

      <button
        @click="clearAll"
        class="control-btn danger"
        title="清空所有影片"
        aria-label="清空所有影片"
      >
        <span class="icon"><i class="fas fa-trash"></i></span>
        清空
      </button>
    </div>

    <div class="stats">
      <span class="stat-item">影片數量: {{ videoCount }}</span>
      <span class="stat-item">播放狀態: {{ isPlaying ? '播放中' : '已暫停' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  videoCount: number
  isPlaying: boolean
  isMuted: boolean
  showChat: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'toggle-playing': []
  'toggle-muted': []
  'toggle-chat': []
  'clear-all': []
}>()

const videoCount = computed(() => props.videoCount)
const isPlaying = computed(() => props.isPlaying)
const isMuted = computed(() => props.isMuted)
const showChat = computed(() => props.showChat)

const togglePlaying = () => {
  emit('toggle-playing')
}

const toggleMuted = () => {
  emit('toggle-muted')
}

const toggleChat = () => {
  emit('toggle-chat')
}

const clearAll = () => {
  if (confirm('確定要清空所有影片嗎？')) {
    emit('clear-all')
  }
}
</script>

<style scoped lang="scss">
.control-bar {
  padding: 16px 20px;
  background: #f5f0e6;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;

  .controls-group {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;

    .control-btn {
      padding: 10px 16px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;

      .icon {
        font-size: 16px;
      }

      &:hover {
        background: #f0f0f0;
        border-color: #999;
      }

      &:active {
        transform: scale(0.98);
      }

      &.active {
        background: #333;
        color: white;
        border-color: #333;

        &:hover {
          background: #222;
          border-color: #222;
        }
      }

      &.danger {
        &:hover {
          background: #fee;
          border-color: #f44;
          color: #f44;
        }

        &:active {
          background: #fdd;
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .stats {
    display: flex;
    gap: 24px;
    font-size: 13px;
    color: #666;
    flex-wrap: wrap;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
