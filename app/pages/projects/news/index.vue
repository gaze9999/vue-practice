<template>
  <div class="news-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-text">
        <p class="eyebrow">Daily News</p>
        <h1>每日新聞抓取範例</h1>
        <p class="lead">整合 FFXIV Lodestone 新聞與服務狀態，展示外部 API 資料彙整與呈現能力。</p>
      </div>
      <div class="hero-controls">
        <div class="locale-switch">
          <span class="locale-label">語言:</span>
          <button
            v-for="loc in locales"
            :key="loc.value"
            @click="currentLocale = loc.value"
            class="locale-btn"
            :class="{ active: currentLocale === loc.value }"
          >
            {{ loc.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Info Cards -->
    <section class="info-section">
      <div class="info-grid">
        <article class="info-card">
          <h3>資料來源</h3>
          <p>使用 Lodestone News API 獲取 FFXIV 官方最新公告、維護資訊與服務狀態。</p>
        </article>
        <article class="info-card">
          <h3>即時更新</h3>
          <p>支援多語言切換（日文、英文、法文、德文），即時獲取最新新聞與服務狀態。</p>
        </article>
        <article class="info-card">
          <h3>結構化資料</h3>
          <p>展示如何將外部 API 資料轉換為結構化格式，便於前端展示與互動。</p>
        </article>
      </div>
    </section>

    <!-- Main Content -->
    <section class="content-section">
      <div class="content-tabs">
        <button
          @click="activeTab = 'maintenance'"
          class="tab-btn"
          :class="{ active: activeTab === 'maintenance' }"
        >
          服務狀態
        </button>
        <button
          @click="activeTab = 'topics'"
          class="tab-btn"
          :class="{ active: activeTab === 'topics' }"
        >
          最新話題
        </button>
      </div>

      <div class="content-panel">
        <FFXIVMaintenance v-if="activeTab === 'maintenance'" :locale="currentLocale" />
        <FFXIVTopics v-else-if="activeTab === 'topics'" :locale="currentLocale" />
      </div>
    </section>

    <!-- Footer -->
    <section class="footer-section">
      <div class="footer-info">
        <p class="footer-note">
          資料來源：<a href="https://lodestonenews.com/" target="_blank" rel="noopener noreferrer">Lodestone News API</a>
        </p>
        <p class="footer-disclaimer">本範例僅作為技術展示用途，所有資料版權歸 Square Enix 所有。</p>
      </div>
      <NuxtLink to="/projects" class="btn">返回專案列表</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Locale } from '~/types/ffxiv'
import FFXIVMaintenance from './components/FFXIVMaintenance.vue'
import FFXIVTopics from './components/FFXIVTopics.vue'

definePageMeta({
  layout: 'news',
})

const currentLocale = ref<Locale>('jp')
const activeTab = ref<'maintenance' | 'topics'>('maintenance')

const locales = [
  { value: 'jp' as Locale, label: 'JP' },
  { value: 'na' as Locale, label: 'EN' },
  { value: 'fr' as Locale, label: 'FR' },
  { value: 'de' as Locale, label: 'DE' },
]
</script>

<style scoped lang="scss">
.news-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0e6 0%, #f9f7f3 100%);
  padding: 0 20px 40px;

  .hero-section {
    padding: 40px 0;
    text-align: center;

    .hero-text {
      margin-bottom: 32px;

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.85rem;
        color: #999;
        margin: 0 0 8px;
      }

      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 12px;
      }

      .lead {
        font-size: 1.1rem;
        color: #666;
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
      }
    }

    .hero-controls {
      display: flex;
      justify-content: center;
      align-items: center;

      .locale-switch {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .locale-label {
          font-weight: 600;
          color: #666;
          font-size: 0.9rem;
        }

        .locale-btn {
          padding: 8px 16px;
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          color: #666;
          transition: all 0.2s ease;

          &:hover {
            background: #e0e0e0;
            border-color: #999;
          }

          &.active {
            background: #1976d2;
            color: white;
            border-color: #1976d2;
          }
        }
      }
    }
  }

  .info-section {
    margin-bottom: 40px;

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;

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
    max-width: 1200px;
    margin: 0 auto 40px;

    .content-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;

      .tab-btn {
        padding: 12px 24px;
        background: transparent;
        border: none;
        border-bottom: 3px solid transparent;
        cursor: pointer;
        font-weight: 600;
        color: #666;
        transition: all 0.2s ease;

        &:hover {
          color: #333;
        }

        &.active {
          color: #1976d2;
          border-bottom-color: #1976d2;
        }
      }
    }

    .content-panel {
      padding: 32px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #e0e0e0;
      min-height: 400px;
    }
  }

  .footer-section {
    text-align: center;
    padding: 40px 0 20px;
    max-width: 1200px;
    margin: 0 auto;

    .footer-info {
      margin-bottom: 24px;

      .footer-note {
        margin: 0 0 8px;
        color: #666;
        font-size: 0.9rem;

        a {
          color: #1976d2;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .footer-disclaimer {
        margin: 0;
        color: #999;
        font-size: 0.85rem;
      }
    }

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
  .news-container {
    padding: 0 16px 32px;

    .hero-section {
      padding: 24px 0;

      .hero-text {
        h1 {
          font-size: 1.8rem;
        }

        .lead {
          font-size: 1rem;
        }
      }

      .hero-controls {
        .locale-switch {
          flex-wrap: wrap;
        }
      }
    }

    .content-section {
      .content-panel {
        padding: 20px;
      }
    }
  }
}
</style>
