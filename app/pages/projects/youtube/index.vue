<template>
  <div class="youtube-wall-container">
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb-nav">
      <NuxtLink to="/projects" class="breadcrumb-link">◄ 返回專案</NuxtLink>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">YouTube 電視牆</span>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <h1 class="title">YouTube 電視牆</h1>
      <p class="subtitle">展示多個YouTube影片，支援播放控制與聊天功能</p>
    </section>

    <!-- Information Section -->
    <section class="info-section">
      <div class="info-grid">
        <article class="info-card">
          <h3>功能說明</h3>
          <p>在下方輸入YouTube連結，系統會自動解析影片ID並添加至電視牆中展示。支援多個影片同時播放與管理。</p>
        </article>
        <article class="info-card">
          <h3>播放控制</h3>
          <p>支援全局播放/暫停控制、靜音設定、聊天室顯示切換。所有設定會自動保存至本地存儲。</p>
        </article>
        <article class="info-card">
          <h3>連結格式</h3>
          <p>支援 youtube.com 或 youtu.be 的標準連結格式，如：youtube.com/watch?v=... 或 youtu.be/...</p>
        </article>
      </div>
    </section>

    <!-- Main Content -->
    <section class="content-section">
      <!-- Input Bar -->
      <InputBar @submit="handleAddVideo" />

      <!-- Control Bar -->
      <ControlBar
        v-if="hasVideos"
        :video-count="videoCount"
        :is-playing="settings.playing"
        :is-muted="settings.muted"
        :show-chat="settings.chat"
        @toggle-playing="togglePlaying"
        @toggle-muted="toggleMuted"
        @toggle-chat="toggleChat"
        @clear-all="handleClearAll"
      />

      <!-- Empty State -->
      <div v-if="!hasVideos" class="empty-state">
        <p class="empty-icon"><i class="fas fa-tv"></i></p>
        <p class="empty-text">尚未添加任何影片</p>
        <p class="empty-hint">請在上方輸入YouTube連結開始使用</p>
      </div>

      <!-- Video Grid -->
      <div v-else class="video-grid">
        <VideoFrame
          v-for="video in videos"
          :key="video.id"
          :video="video"
          :show-chat="settings.chat"
          @remove="handleRemoveVideo"
        />
      </div>
    </section>

    <!-- Footer -->
    <section class="footer-section">
      <NuxtLink to="/projects" class="btn">返回專案列表</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useVideoStore } from './composables/useVideoStore'
import InputBar from './components/InputBar.vue'
import ControlBar from './components/ControlBar.vue'
import VideoFrame from './components/VideoFrame.vue'

definePageMeta({
  layout: 'youtube',
})

const {
  videos,
  settings,
  initializeStore,
  addVideo,
  removeVideo,
  clearAllVideos,
  updateSetting,
  hasVideos,
  videoCount,
} = useVideoStore()

// 初始化存儲
onMounted(() => {
  initializeStore()
})

// 处理事件
const handleAddVideo = (videoId: string) => {
  try {
    addVideo(videoId)
  } catch (error: any) {
    throw error
  }
}

const handleRemoveVideo = (id: string) => {
  removeVideo(id)
}

const handleClearAll = () => {
  clearAllVideos()
}

const togglePlaying = () => {
  updateSetting('playing', !settings.value.playing)
}

const toggleMuted = () => {
  updateSetting('muted', !settings.value.muted)
}

const toggleChat = () => {
  updateSetting('chat', !settings.value.chat)
}
</script>

<style scoped lang="scss">
.youtube-wall-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0e6 0%, #f9f7f3 100%);
  padding: 0 20px 40px;

  .breadcrumb-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 20px 0 10px;
    font-size: 14px;

    .breadcrumb-link {
      color: #333;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: #666;
        text-decoration: underline;
      }
    }

    .breadcrumb-sep {
      color: #999;
    }

    .breadcrumb-current {
      color: #666;
      font-weight: 500;
    }
  }

  .hero-section {
    padding: 40px 0;
    text-align: center;

    .title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 12px;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }
  }

  .info-section {
    margin-bottom: 40px;

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;

      .info-card {
        padding: 24px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        border: 1px solid #e0e0e0;

        h3 {
          margin: 0 0 12px;
          font-size: 1.1rem;
          color: #333;
        }

        p {
          margin: 0;
          color: #666;
          line-height: 1.6;
          font-size: 0.95rem;
        }
      }
    }
  }

  .content-section {
    max-width: 1400px;
    margin: 0 auto 40px;

    .empty-state {
      padding: 60px 20px;
      text-align: center;
      background: white;
      border-radius: 8px;
      border: 2px dashed #ddd;

      .empty-icon {
        font-size: 48px;
        margin: 0 0 16px;
      }

      .empty-text {
        font-size: 1.2rem;
        color: #333;
        font-weight: 600;
        margin: 0 0 8px;
      }

      .empty-hint {
        color: #999;
        margin: 0;
      }
    }

    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 0;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
    }
  }

  .footer-section {
    text-align: center;
    padding: 20px 0;

    .btn {
      display: inline-block;
      padding: 12px 32px;
      background: #333;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      transition: background 0.2s ease;

      &:hover {
        background: #222;
      }
    }
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .youtube-wall-container {
    padding: 0 16px 32px;

    .hero-section {
      padding: 24px 0;

      .title {
        font-size: 1.8rem;
      }

      .subtitle {
        font-size: 1rem;
      }
    }

    .content-section {
      .video-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
