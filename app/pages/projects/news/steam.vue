<template>
  <div class="steam-news-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <p class="eyebrow">Steam Store News</p>
        <h1 class="title">Steam 商店新聞</h1>
        <p class="description">整合 Steam 社群新聞與特賣活動資訊，即時掌握熱門遊戲動態與優惠情報。</p>
      </div>
      <button @click="refreshCurrentTab" class="refresh-button" :disabled="loading">
        <span class="refresh-icon"><i v-if="loading" class="fas fa-hourglass-end"></i><i v-else class="fas fa-sync"></i></span>
        {{ loading ? '載入中...' : '重新整理' }}
      </button>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
      >
        <span class="tab-icon"><i :class="tab.icon"></i></span>
        <span class="tab-label">{{ tab.label }}</span>
        <span v-if="getTabCount(tab.id) > 0" class="tab-count">{{ getTabCount(tab.id) }}</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">正在載入 {{ activeTabLabel }}...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon"><i v-if="error.includes('API Key')" class="fas fa-key"></i><i v-else class="fas fa-exclamation-triangle"></i></div>
      <h3 class="error-title">{{ error.includes('API Key') ? 'API Key 未配置' : '無法載入新聞' }}</h3>
      <p class="error-message">{{ error }}</p>
      <div class="error-info" v-if="error.includes('API Key')">
        <p class="info-text">如需使用 Steam 新聞功能，請按以下步驟設定：</p>
        <ol class="steps-list">
          <li>前往 <a href="https://steamcommunity.com/dev/apikey" target="_blank" rel="noopener noreferrer" class="link">Steam Web API Key 頁面</a></li>
          <li>登入 Steam 帳號並取得 API Key</li>
          <li>在專案根目錄的 <code>.env</code> 檔案中設定 <code>NUXT_STEAM_API_KEY</code></li>
          <li>重新啟動開發伺服器</li>
        </ol>
      </div>
      <button v-else @click="refreshCurrentTab" class="retry-button">重試</button>
    </div>

    <!-- News Grid -->
    <section v-else-if="currentNews.length > 0" class="news-section">
      <div class="news-grid">
        <article
          v-for="item in currentNews"
          :key="item.gid"
          class="news-card"
        >
          <!-- Card Header -->
          <div class="card-header">
            <div class="header-left">
              <span v-if="item.tags" class="sale-badge">{{ item.tags[0] }}</span>
              <span class="news-feedlabel">{{ item.feedlabel || 'Update' }}</span>
            </div>
            <span class="news-date">{{ formatSteamTimestamp(item.date) }}</span>
          </div>

          <!-- News Content -->
          <div class="news-content">
            <h3 class="news-title">{{ item.title }}</h3>
            
            <p class="news-excerpt">{{ stripHtml(item.contents) }}</p>
            
            <div class="news-meta">
              <span class="news-author">
                <svg class="author-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                {{ item.author }}
              </span>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="card-footer">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="read-more-link"
            >
              閱讀完整內容
              <svg class="link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div class="pagination-container">
        <button 
          @click="goToPrevPage" 
          class="pagination-btn"
          :disabled="currentPage === 1 || loading"
        >
          <i class="fas fa-chevron-left"></i>
          上一頁
        </button>
        <span class="page-info">第 {{ currentPage }} 頁，共 {{ currentNews.length }} 則新聞</span>
        <button 
          @click="goToNextPage" 
          class="pagination-btn"
          :disabled="loading || !hasMorePages"
        >
          下一頁
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>

    <!-- Empty State -->
    <div v-else class="empty-container">
      <div class="empty-icon"><i class="fas fa-newspaper"></i></div>
      <h3 class="empty-title">目前沒有新聞</h3>
      <p class="empty-message">請稍後再試或切換其他分類</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSteamCommunityNews, getSteamSalesNews, formatSteamTimestamp, stripHtml, type SteamNewsItem } from './api/steamApi'

definePageMeta({
  layout: 'news',
})

type TabId = 'community' | 'sales'

interface Tab {
  id: TabId
  label: string
  icon: string
}

const tabs: Tab[] = [
  { id: 'community', label: '社群新聞', icon: 'fas fa-gamepad' },
  { id: 'sales', label: '特賣活動', icon: 'fas fa-tag' },
]

// 熱門遊戲 AppID 列表
const COMMUNITY_APP_IDS = [
  730,      // Counter-Strike 2
  570,      // Dota 2
  1172470,  // Apex Legends
  1245620,  // ELDEN RING
  2358720,  // Black Myth: Wukong
  1086940,  // Baldur's Gate 3
  1091500,  // Cyberpunk 2077
  1938090,  // Call of Duty
  2379780,  // Enshrouded
  2050650,  // Starfield
]

// 特賣相關 AppID 列表
const SALES_APP_IDS = [
  593110,  // Steam 本身
]

const activeTab = ref<TabId>('community')
const communityNews = ref<SteamNewsItem[]>([])
const salesNews = ref<SteamNewsItem[]>([])
const loading = ref(!1)
const error = ref<string | null>(null)

// 分頁狀態 - 使用歷史堆疊追蹤每頁的 enddate
const communityPageHistory = ref<(number | undefined)[]>([void 0]) // [undefined, enddate1, enddate2, ...]
const salesPageHistory = ref<(number | undefined)[]>([void 0])
const communityPage = ref(1)
const salesPage = ref(1)
const itemsPerPage = 20

// 當前頁碼
const currentPage = computed(() => {
  return activeTab.value === 'community' ? communityPage.value : salesPage.value
})

// 是否還有更多頁（如果當前頁有滿 20 筆，就假設還有下一頁）
const hasMorePages = computed(() => {
  return currentNews.value.length >= itemsPerPage
})

// 當前顯示的新聞
const currentNews = computed(() => {
  return activeTab.value === 'community' ? communityNews.value : salesNews.value
})

// 當前標籤名稱
const activeTabLabel = computed(() => {
  return tabs.find(t => t.id === activeTab.value)?.label || ''
})

// 獲取標籤計數
const getTabCount = (tabId: TabId): number => {
  return tabId === 'community' ? communityNews.value.length : salesNews.value.length
}

// 載入社群新聞
const loadCommunityNews = async (enddate?: number) => {
  loading.value = !0
  error.value = null

  try {
    communityNews.value = await getSteamCommunityNews(COMMUNITY_APP_IDS, itemsPerPage, enddate)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '無法載入社群新聞'
  } finally {
    loading.value = !1
  }
}

// 載入特賣新聞
const loadSalesNews = async (enddate?: number) => {
  loading.value = !0
  error.value = null

  try {
    salesNews.value = await getSteamSalesNews(SALES_APP_IDS, itemsPerPage, void 0, enddate)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '無法載入特賣新聞'
  } finally {
    loading.value = !1
  }
}

// 重新整理當前標籤
const refreshCurrentTab = () => {
  if (activeTab.value === 'community') {
    communityPage.value = 1
    communityPageHistory.value = [void 0]
    loadCommunityNews()
  } else {
    salesPage.value = 1
    salesPageHistory.value = [void 0]
    loadSalesNews()
  }
}

// 上一頁
const goToPrevPage = () => {
  if (currentPage.value <= 1) return
  
  if (activeTab.value === 'community') {
    communityPage.value--
    // 從歷史記錄中獲取上一頁的 enddate
    const enddate = communityPageHistory.value[communityPage.value - 1]
    loadCommunityNews(enddate)
  } else {
    salesPage.value--
    const enddate = salesPageHistory.value[salesPage.value - 1]
    loadSalesNews(enddate)
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 下一頁
const goToNextPage = () => {
  if (!hasMorePages.value) return
  
  if (activeTab.value === 'community') {
    // 獲取當前頁最後一筆新聞的日期作為下一頁的 enddate
    const lastNewsDate = communityNews.value[communityNews.value.length - 1]?.date
    if (lastNewsDate) {
      communityPage.value++
      // 儲存到歷史記錄
      if (communityPageHistory.value.length < communityPage.value) {
        communityPageHistory.value.push(lastNewsDate)
      }
      loadCommunityNews(lastNewsDate)
    }
  } else {
    const lastNewsDate = salesNews.value[salesNews.value.length - 1]?.date
    if (lastNewsDate) {
      salesPage.value++
      if (salesPageHistory.value.length < salesPage.value) {
        salesPageHistory.value.push(lastNewsDate)
      }
      loadSalesNews(lastNewsDate)
    }
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 監聽標籤切換
watch(activeTab, (newTab) => {
  // 如果該標籤還沒有資料，自動載入
  if (newTab === 'community' && communityNews.value.length === 0) {
    loadCommunityNews()
  } else if (newTab === 'sales' && salesNews.value.length === 0) {
    loadSalesNews()
  }
})

// 頁面載入時自動載入社群新聞
onMounted(() => {
  loadCommunityNews()
})
</script>

<style scoped>
.steam-news-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}

.header-content {
  flex: 1;
}

.eyebrow {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1e40af;
  margin-bottom: 8px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.description {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  max-width: 700px;
}

.refresh-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.refresh-button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-icon {
  font-size: 16px;
}

/* Tabs */
.tabs-container {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: #6b7280;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  margin-bottom: -2px;
}

.tab-button:hover {
  color: #1f2937;
  background: #f9fafb;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-icon {
  font-size: 18px;
}

.tab-label {
  font-weight: 600;
}

.tab-count {
  padding: 2px 8px;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.tab-button.active .tab-count {
  background: #3b82f6;
  color: white;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 20px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 20px;
  font-size: 16px;
  color: #6b7280;
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  text-align: center;
}

.error-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.error-title {
  font-size: 24px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 12px;
}

.error-message {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 24px;
  max-width: 500px;
}

.error-info {
  background: #f3f4f6;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  max-width: 600px;
  text-align: left;
}

.info-text {
  font-size: 14px;
  color: #374151;
  margin-bottom: 16px;
  font-weight: 500;
}

.steps-list {
  margin: 0;
  padding-left: 20px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.8;
}

.steps-list li {
  margin-bottom: 8px;
}

.steps-list .link {
  color: #3b82f6;
  text-decoration: underline;
  transition: color 0.2s;
}

.steps-list .link:hover {
  color: #2563eb;
}

.steps-list code {
  background: #e5e7eb;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #dc2626;
}

.retry-button {
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-button:hover {
  background: #2563eb;
}

/* News Grid */
.news-section {
  margin-bottom: 48px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.news-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sale-badge {
  padding: 4px 10px;
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.news-feedlabel {
  padding: 4px 10px;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.news-date {
  font-size: 12px;
  color: #9ca3af;
}

/* News Content */
.news-content {
  padding: 20px;
  flex: 1;
}

.news-title {
  font-size: 17px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-excerpt {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
}

.news-author {
  display: flex;
  align-items: center;
  gap: 6px;
}

.author-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

/* Card Footer */
.card-footer {
  padding: 14px 20px;
  border-top: 1px solid #f3f4f6;
  background: #fafafa;
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.2s;
}

.read-more-link:hover {
  color: #2563eb;
  gap: 8px;
}

.link-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}

.read-more-link:hover .link-icon {
  transform: translate(2px, -2px);
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 32px 0;
  margin-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.pagination-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination-btn i {
  font-size: 12px;
}

.page-info {
  padding: 8px 16px;
  background: #f9fafb;
  color: #6b7280;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

/* Empty State */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.empty-message {
  font-size: 16px;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 26px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .refresh-button {
    width: 100%;
    justify-content: center;
  }

  .pagination-container {
    flex-wrap: wrap;
    gap: 12px;
  }

  .pagination-btn {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }

  .page-info {
    width: 100%;
    text-align: center;
  }

  .tabs-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab-button {
    white-space: nowrap;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }
}

/* Dark Mode */
:global(.dark-mode) .steam-news-container {
  color: #e5e7eb;
}

:global(.dark-mode) .eyebrow {
  color: #60a5fa;
}

:global(.dark-mode) .title {
  color: #f9fafb;
}

:global(.dark-mode) .description {
  color: #9ca3af;
}

:global(.dark-mode) .refresh-button {
  background: #2563eb;
}

:global(.dark-mode) .refresh-button:hover:not(:disabled) {
  background: #1d4ed8;
}

:global(.dark-mode) .tabs-container {
  border-bottom-color: #374151;
}

:global(.dark-mode) .tab-button {
  color: #9ca3af;
}

:global(.dark-mode) .tab-button:hover {
  color: #f9fafb;
  background: #1f2937;
}

:global(.dark-mode) .tab-button.active {
  color: #60a5fa;
  border-bottom-color: #60a5fa;
}

:global(.dark-mode) .news-card {
  background: #1f2937;
  border-color: #374151;
}

:global(.dark-mode) .news-card:hover {
  border-color: #4b5563;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

:global(.dark-mode) .news-title {
  color: #f9fafb;
}

:global(.dark-mode) .news-excerpt {
  color: #d1d5db;
}

:global(.dark-mode) .news-date,
:global(.dark-mode) .news-author {
  color: #9ca3af;
}

:global(.dark-mode) .read-more-link {
  color: #60a5fa;
}

:global(.dark-mode) .read-more-link:hover {
  color: #93c5fd;
}

:global(.dark-mode) .pagination-btn {
  background: #374151;
  color: #f9fafb;
  border-color: #4b5563;
}

:global(.dark-mode) .pagination-btn:hover:not(:disabled) {
  background: #4b5563;
  border-color: #60a5fa;
}

:global(.dark-mode) .page-info {
  color: #d1d5db;
}

:global(.dark-mode) .loading-text {
  color: #d1d5db;
}

:global(.dark-mode) .error-container {
  background: #1f2937;
  border-color: #ef4444;
}

:global(.dark-mode) .error-title {
  color: #f9fafb;
}

:global(.dark-mode) .error-message {
  color: #fca5a5;
}

:global(.dark-mode) .empty-title {
  color: #f9fafb;
}

:global(.dark-mode) .empty-message {
  color: #9ca3af;
}
</style>
