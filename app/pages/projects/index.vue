<template>
  <div class="projects-overview">
    <section class="overview-hero">
      <h1>Vue 3 實戰專案集</h1>
      <p class="subtitle">展示七個不同領域的完整應用，涵蓋電商、ERP、資料爬取、新聞聚合、媒體整合與系統監控</p>
    </section>

    <section class="projects-grid">
      <article v-for="project in projects"
               :key="project.id"
               class="project-card"
               :class="{ 'has-related': project.relatedTo }">
        <div class="card-header">
          <div>
            <h3>{{ project.title }}</h3>
            <span v-if="project.category"
                  class="category">{{ project.category }}</span>
          </div>
          <span class="badge">{{ project.badge }}</span>
        </div>
        <p class="description">{{ project.description }}</p>
        <div class="features">
          <span v-for="feature in project.features"
                :key="feature"
                class="feature-tag">{{ feature }}</span>
        </div>
        <div v-if="project.relatedTo"
             class="related-note">
          ◆ 配合「購物網站系統」使用
        </div>
        <NuxtLink :to="project.link"
                  class="card-link">進入專案 →</NuxtLink>
      </article>
    </section>

    <section class="overview-footer">
      <NuxtLink to="/"
                class="btn">返回首頁</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'projects',
});

const projects = [
  {
    id: 'shop',
    title: '購物網站系統',
    badge: 'Frontend',
    description: '展示商品探索、個人化推薦、購物車與結帳流程的完整前台購物體驗。',
    features: ['商品管理', '購物車', '結帳流程', '會員中心'],
    link: '/projects/shop',
    category: '核心應用',
  },
  {
    id: 'shop-admin',
    title: '購物後台管理系統 (ERP)',
    badge: 'Admin',
    description: '參考 TSRDERP 架構，以電商營運為情境展示採購、庫存、財務、人資與報表的整合後台設計（六大模組）。',
    features: ['採購管理', '庫存追蹤', '財務結算', '人資管理', '報表分析', '審計日誌'],
    link: '/projects/shop-admin',
    category: '核心應用',
    relatedTo: 'shop',
  },
  {
    id: 'graphic-design',
    title: '圖形設計作品集',
    badge: 'Design',
    description: '展示高保真原型設計作品，涵蓋網頁 UI、行動介面與品牌視覺設計的完整設計流程。',
    features: ['UI 設計', '原型製作', '視覺設計', '互動效果', 'Lightbox 相冊'],
    link: '/projects/graphic-design',
    category: '核心應用',
  },
  {
    id: 'python-scraper',
    title: 'TGS 2025 展覽商爬蟲',
    badge: 'Data',
    description: '使用 Python 爬蟲從 Tokyo Game Show 官方網站抽取展覽商資訊，進行資料清洗與可視化。',
    features: ['網頁爬取', '資料清洗', '可視化展示', '搜尋過濾', '統計分析'],
    link: '/projects/python-scraper',
    category: '數據應用',
  },
  {
    id: 'news',
    title: '每日新聞整合系統',
    badge: 'Feed',
    description: '整合 FFXIV Lodestone 新聞與服務狀態，展示外部 API 資料彙整、分類與多語言呈現。',
    features: ['API 整合', '新聞聚合', '分類標籤', '多語言支持', '來源管理'],
    link: '/projects/news',
    category: '其他示例',
  },
  {
    id: 'youtube',
    title: 'YouTube 電視牆',
    badge: 'Media',
    description: '展示多個 YouTube 影片牆面，支援動態添加、播放控制與即時聊天功能整合。',
    features: ['影音嵌入', '播放控制', '動態管理', '聊天整合', '本地存儲'],
    link: '/projects/youtube',
    category: '其他示例',
  },
  {
    id: 'audit',
    title: '審計與監控系統',
    badge: 'Audit',
    description: '展示操作紀錄追蹤、權限管理、系統日誌與合規報告的完整審計與監控功能。',
    features: ['操作紀錄', '權限管理', '系統日誌', '合規報告', '異常通知'],
    link: '/projects/audit',
    category: '系統管理',
  },
];
</script>

<style scoped>
.projects-overview {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0e6 0%, #f9f7f3 100%);
}

.overview-hero {
  padding: 3.75rem 2rem;
  text-align: center;
  border-bottom: 0.0625rem solid #1f1b2d14;
}

.overview-hero h1 {
  margin: 0 0 1rem;
  font-size: 2.625rem;
  color: #1f1b2d;
}

.subtitle {
  margin: 0;
  font-size: 1rem;
  color: #9a7c5a;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1.5rem;
  padding: 3.75rem 2rem;
  max-width: 87.5rem;
  margin: 0 auto;
}

.project-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.75rem;
  box-shadow: 0 0.125rem 0.5rem #1f1b2d0f;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  box-shadow: 0 0.5rem 1.5rem #1f1b2d1f;
  transform: translateY(-0.25rem);
}

.project-card.has-related {
  border-left: 0.1875rem solid #ff9f4a;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
}

.card-header>div {
  flex: 1;
}

.card-header h3 {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
  color: #1f1b2d;
}

.category {
  display: inline-block;
  font-size: 0.6875rem;
  color: #9a7c5a;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
  font-weight: 600;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #ff9f4a;
  color: #1f1b2d;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 62.4375rem;
  white-space: nowrap;
}

.description {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: #6b4f3b;
  flex: 1;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.feature-tag {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: #ff9f4a1a;
  color: #ff9f4a;
  font-size: 0.75rem;
  border-radius: 0.375rem;
}

.related-note {
  margin: 0.75rem 0;
  padding: 0.5rem 0.75rem;
  background: #fff4e7;
  border-left: 0.125rem solid #ff9f4a;
  color: #6b4f3b;
  font-size: 0.75rem;
  font-weight: 500;
}

.card-link {
  display: inline-block;
  margin-top: auto;
  padding: 0.625rem 1rem;
  background: #1f1b2d;
  color: #f5f0e6;
  text-decoration: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background 0.2s ease;
  text-align: center;
}

.card-link:hover {
  background: #2a2639;
}

.overview-footer {
  display: flex;
  justify-content: center;
  padding: 2.5rem 2rem 3.75rem;
  border-top: 0.0625rem solid #1f1b2d14;
}

.btn {
  background: #ff9f4a;
  color: #1f1b2d;
  padding: 0.75rem 1.5rem;
  border-radius: 62.4375rem;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;
}

.btn:hover {
  background: #ff8f2e;
}

@media (max-width: 48rem) {
  .projects-grid {
    grid-template-columns: 1fr;
    padding: 2.5rem 1rem;
    gap: 1rem;
  }

  .overview-hero {
    padding: 2.5rem 1rem;
  }

  .overview-hero h1 {
    font-size: 2rem;
  }

  .project-card {
    padding: 1.25rem;
  }
}
</style>
