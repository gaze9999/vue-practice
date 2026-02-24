<template>
  <section class="scraper-hero">
    <div class="hero-text">
      <p class="eyebrow">Data Scraping Results</p>
      <h1>TGS 2025 展覽商爬蟲成果</h1>
      <p class="lead">使用 Python 爬蟲技術從 Tokyo Game Show 2025 官方資料中提取展覽商資訊，進行資料清洗與可視化呈現。</p>
      <p class="notion-source">
        本資料原建立於 
        <a 
          href="https://typhoon-name-be1.notion.site/26d4f7be343f80838781ce35ec520bd0?v=26d4f7be343f80ab8433000c0949466b" 
          target="_blank" 
          rel="noopener noreferrer"
          class="notion-link"
        >
          Notion 資料庫
        </a>
        ，現已轉移至此展示。
      </p>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">{{ stats.recordsProcessed }}</div>
        <div class="stat-label">總展覽商</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.internationalExhibitors }}</div>
        <div class="stat-label">國際參展商</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.totalLocations }}</div>
        <div class="stat-label">場地位置</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ stats.totalAreas }}</div>
        <div class="stat-label">展示區域</div>
      </div>
    </div>
  </section>

  <section class="scraper-section data-section">
    <div class="section-header">
      <h2>展覽商資料</h2>
      <div class="filters">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋展覽商名稱..."
          class="search-input"
        />
        <select v-model="filterArea" class="filter-select">
          <option value="">全部區域</option>
          <option v-for="area in uniqueAreas" :key="area" :value="area">
            {{ area }}
          </option>
        </select>
        <select v-model="filterCountry" class="filter-select">
          <option value="">全部國家</option>
          <option v-for="country in uniqueCountries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
        <select v-model="filterLocation" class="filter-select">
          <option value="">全部場地</option>
          <option v-for="location in uniqueLocations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th class="col-exhibitor" @click="toggleSort('exhibitor')">
            <div class="th-content">
              <span>展覽商</span>
              <span class="sort-icon">{{ getSortIcon('exhibitor') }}</span>
            </div>
          </th>
          <th class="col-area" @click="toggleSort('area')">
            <div class="th-content">
              <span>展示區域</span>
              <span class="sort-icon">{{ getSortIcon('area') }}</span>
            </div>
          </th>
          <th class="col-booth" @click="toggleSort('boothNumber')">
            <div class="th-content">
              <span>攤位號</span>
              <span class="sort-icon">{{ getSortIcon('boothNumber') }}</span>
            </div>
          </th>
          <th class="col-country" @click="toggleSort('country')">
            <div class="th-content">
              <span>國家</span>
              <span class="sort-icon">{{ getSortIcon('country') }}</span>
            </div>
          </th>
          <th class="col-location" @click="toggleSort('location')">
            <div class="th-content">
              <span>場地</span>
              <span class="sort-icon">{{ getSortIcon('location') }}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in paginatedExhibitors" :key="row.uid">
          <td class="col-exhibitor exhibitor-name">{{ row.exhibitor }}</td>
          <td class="col-area">
            <span class="area-badge">{{ row.area }}</span>
          </td>
          <td class="col-booth booth">{{ row.boothNumber }}</td>
          <td class="col-country country">{{ row.country || '日本' }}</td>
          <td class="col-location location">{{ row.location }}</td>
        </tr>
      </tbody>
    </table>
    <div class="table-footer">
      <div class="table-summary">
        搜尋結果：{{ filteredExhibitors.length }} / {{ pythonScraperMockData.length }} 筆
      </div>
      <div class="pagination">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="currentPage = 1"
        >
          首頁
        </button>
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          上一頁
        </button>
        <div class="page-info">
          第 {{ currentPage }} / {{ totalPages }} 頁
        </div>
        <button 
          class="pagination-btn" 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          下一頁
        </button>
        <button 
          class="pagination-btn" 
          :disabled="currentPage === totalPages"
          @click="currentPage = totalPages"
        >
          末頁
        </button>
      </div>
    </div>
  </section>

  <section class="scraper-footer">
    <NuxtLink to="/" class="btn">返回首頁</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { pythonScraperMockData, scraperStatistics, type ExhibitorItem } from '~/shared/mocks'

definePageMeta({
  layout: 'python-scraper',
  middleware: 'erp-auth',
})

const searchQuery = ref('')
const filterArea = ref('')
const filterCountry = ref('')
const filterLocation = ref('')
const currentPage = ref(1)
const pageSize = 15
const stats = scraperStatistics

// 排序狀態
const sortColumn = ref<keyof ExhibitorItem | ''>('')
const sortDirection = ref<'asc' | 'desc'>('asc')

// 獲取唯一值列表
const uniqueAreas = computed(() => {
  const areas = pythonScraperMockData.map(item => item.area)
  return [...new Set(areas)].sort()
})

const uniqueCountries = computed(() => {
  const countries = pythonScraperMockData.map(item => item.country || '日本')
  return [...new Set(countries)].sort()
})

const uniqueLocations = computed(() => {
  const locations = pythonScraperMockData.map(item => item.location)
  return [...new Set(locations)].sort()
})

// 篩選資料
const filteredExhibitors = computed(() => {
  let result = pythonScraperMockData

  // 搜尋過濾
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (item: ExhibitorItem) =>
        (item?.exhibitor || '').toLowerCase().includes(query) ||
        (item?.area || '').toLowerCase().includes(query) ||
        (item?.location || '').toLowerCase().includes(query) ||
        (item?.country || '').toLowerCase().includes(query)
    )
  }

  // 區域過濾
  if (filterArea.value) {
    result = result.filter(item => (item.area || '') === filterArea.value)
  }

  // 國家過濾
  if (filterCountry.value) {
    result = result.filter(item => (item.country || '日本') === filterCountry.value)
  }

  // 場地過濾
  if (filterLocation.value) {
    result = result.filter(item => (item.location || '') === filterLocation.value)
  }

  // 排序
  if (sortColumn.value) {
    result = [...result].sort((a, b) => {
      const aValue = a[sortColumn.value as keyof ExhibitorItem] || ''
      const bValue = b[sortColumn.value as keyof ExhibitorItem] || ''
      
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortDirection.value === 'asc' ? comparison : -comparison
    })
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredExhibitors.value.length / pageSize)
})

const paginatedExhibitors = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredExhibitors.value.slice(start, end)
})

// 當搜尋或篩選條件改變時，重置到第一頁
watch([searchQuery, filterArea, filterCountry, filterLocation], () => {
  currentPage.value = 1
})

// 排序功能
const toggleSort = (column: keyof ExhibitorItem) => {
  if (sortColumn.value === column) {
    // 如果已經是當前列，切換排序方向
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // 新列，預設升序
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

// 獲取排序圖標
const getSortIcon = (column: keyof ExhibitorItem): string => {
  if (sortColumn.value !== column) {
    return '⇅' // 未排序
  }
  return sortDirection.value === 'asc' ? '↑' : '↓'
}
</script>

<style scoped>
.scraper-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 60px 32px 40px;
  background: linear-gradient(135deg, #1f1b2d 0%, #3b314f 100%);
  color: #f5f0e6;
  align-items: start;
}

@media (max-width: 768px) {
  .scraper-hero {
    grid-template-columns: 1fr;
  }
}

.hero-text h1 {
  font-size: 36px;
  margin: 12px 0 16px;
  font-family: 'Playfair Display', 'Times New Roman', serif;
}

.eyebrow {
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #ffb56b;
}

.lead {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(245, 240, 230, 0.8);
  margin-bottom: 16px;
}

.notion-source {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(245, 240, 230, 0.7);
  margin-top: 12px;
}

.notion-link {
  color: #ffb56b;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 181, 107, 0.3);
  transition: all 0.2s ease;
}

.notion-link:hover {
  color: #ffd39d;
  border-bottom-color: #ffd39d;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.12);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 181, 107, 0.3);
  backdrop-filter: blur(10px);
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #ffb56b;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: rgba(245, 240, 230, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.scraper-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px;
}

.pipeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.step {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px 16px;
  box-shadow: 0 10px 24px rgba(31, 27, 45, 0.08);
  text-align: center;
}

.step span {
  display: block;
  font-weight: 700;
  font-size: 24px;
  color: #ff9f4a;
  margin-bottom: 8px;
}

.step p {
  font-weight: 600;
  color: #1f1b2d;
  margin: 0 0 6px 0;
}

.step small {
  display: block;
  font-size: 12px;
  color: #999;
}

.data-section {
  background: #f8f7fb;
  border-radius: 16px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  margin: 0 0 16px 0;
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.search-input,
.filter-select {
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;
}

.search-input {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
}

.filter-select {
  min-width: 140px;
  cursor: pointer;
  color: #333;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #ff9f4a;
  box-shadow: 0 0 0 3px rgba(255, 159, 74, 0.1);
}

.filter-select:hover {
  border-color: #ff9f4a;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(31, 27, 45, 0.06);
  table-layout: fixed;
}

.data-table th {
  background: #f0e7db;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e8ddd0;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s ease;
  position: relative;
}

.data-table th:hover {
  background: #e8ddd0;
}

.th-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.sort-icon {
  font-size: 14px;
  color: #999;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.data-table th:hover .sort-icon {
  color: #ff9f4a;
}

/* 固定欄位寬度比例 */
.col-exhibitor {
  width: 30%;
}

.col-area {
  width: 20%;
}

.col-booth {
  width: 15%;
}

.col-country {
  width: 15%;
}

.col-location {
  width: 20%;
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f0e7db;
  font-size: 14px;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.data-table tbody tr:hover {
  background: #faf9fc;
}

.exhibitor-name {
  font-weight: 600;
  color: #1f1b2d;
  line-height: 1.4;
}

.area-badge {
  display: inline-block;
  padding: 4px 10px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 999px;
  font-size: 12px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.booth {
  font-family: monospace;
  color: #666;
}

.country {
  color: #666;
}

.location {
  color: #999;
  font-size: 13px;
  line-height: 1.4;
}

.table-footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.table-summary {
  color: #999;
  font-size: 13px;
}

.pagination {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #333;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #ff9f4a;
  color: white;
  border-color: #ff9f4a;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  padding: 0 12px;
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  min-width: 80px;
  text-align: center;
}

.scraper-footer {
  display: flex;
  justify-content: center;
  padding: 20px 0 60px;
}

.btn {
  background: #ff9f4a;
  color: #1f1b2d;
  padding: 12px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #ff8c2a;
}

:global(.dark-mode) .data-table {
  background: #1b1f32;
  box-shadow: 0 2px 8px #080a1426;
}

:global(.dark-mode) .data-table th {
  background: #23283c;
  color: #e6e9f2;
  border-bottom-color: #e6e9f214;
}

:global(.dark-mode) .data-table th:hover {
  background: #2a2f45;
}

:global(.dark-mode) .data-table td {
  border-bottom-color: #e6e9f214;
  color: #e6e9f2;
}

:global(.dark-mode) .data-table tbody tr:hover {
  background: #20263a;
}

:global(.dark-mode) .exhibitor-name {
  color: #e6e9f2;
}

:global(.dark-mode) .area-badge {
  background: #1e3a2a;
  color: #8ee3a3;
}

:global(.dark-mode) .booth,
:global(.dark-mode) .country,
:global(.dark-mode) .location {
  color: #c4c8d6;
}

:global(.dark-mode) .table-summary {
  color: #c4c8d6;
}

:global(.dark-mode) .pagination-btn {
  background: #1b1f32;
  border-color: #e6e9f214;
  color: #e6e9f2;
}

:global(.dark-mode) .pagination-btn:hover:not(:disabled) {
  background: #ff9f4a;
  color: #1b1f32;
  border-color: #ff9f4a;
}

:global(.dark-mode) .page-info {
  color: #c4c8d6;
}

:global(.dark-mode) .notion-source {
  color: rgba(230, 233, 242, 0.7);
}

:global(.dark-mode) .notion-link {
  color: #ffb56b;
  border-bottom-color: rgba(255, 181, 107, 0.3);
}

:global(.dark-mode) .notion-link:hover {
  color: #ffd39d;
  border-bottom-color: #ffd39d;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .search-input {
    max-width: 100%;
  }

  .filter-select {
    width: 100%;
  }

  .data-table {
    font-size: 12px;
  }

  .data-table th,
  .data-table td {
    padding: 8px 10px;
  }

  .col-exhibitor {
    width: 35%;
  }

  .col-area {
    width: 25%;
  }

  .col-booth {
    width: 15%;
  }

  .col-country {
    width: 0%;
    display: none;
  }

  .col-location {
    width: 25%;
  }

  .table-footer {
    flex-direction: column;
    gap: 12px;
  }

  .pagination {
    width: 100%;
    justify-content: center;
  }
}
</style>
