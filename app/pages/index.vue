<template>
  <section class="portfolio-hero">
    <div class="hero-glow"></div>
    <div class="hero-content">
      <div class="hero-text">
        <p class="eyebrow">Portfolio Showcase</p>
        <h1>作品展示集</h1>
        <p class="lead">
          精選七個代表性作品，呈現企業級系統設計、資料擷取、前端整合與系統監控能力。
        </p>
        <div class="hero-actions">
          <NuxtLink to="/projects" class="btn btn-primary">查看作品概覽</NuxtLink>
        </div>
      </div>

      <div class="hero-panel">
        <div class="panel-header">
          <span class="status-dot"></span>
          <span>展示版工作台</span>
        </div>
        <div class="panel-list">
          <NuxtLink to="/projects/shop-admin" class="panel-item">購物後台管理系統</NuxtLink>
          <NuxtLink to="/projects/shop" class="panel-item">購物網站系統</NuxtLink>
          <NuxtLink to="/projects/graphic-design" class="panel-item">圖形設計作品集</NuxtLink>
          <NuxtLink to="/projects/news" class="panel-item">每日新聞抓取</NuxtLink>
          <NuxtLink to="/projects/youtube" class="panel-item">YouTube 內嵌展示</NuxtLink>
          <NuxtLink to="/projects/python-scraper" class="panel-item">Python 爬蟲成果</NuxtLink>
          <NuxtLink to="/projects/audit" class="panel-item">審計與監控系統</NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <section class="projects-grid">
    <NuxtLink to="/projects/shop-admin" class="project-card">
      <div class="card-top">
        <span class="tag">後台</span>
        <h2>購物後台管理系統</h2>
      </div>
      <p>參考 TSRDERP 組織方式，整合採購、庫存、財務、人資與報表模組。</p>
      <div class="card-features">
        <span class="feature">採購管理</span>
        <span class="feature">庫存追蹤</span>
        <span class="feature">財務結算</span>
        <span class="feature">人資管理</span>
        <span class="feature">報表分析</span>
        <span class="feature">審計日誌</span>
      </div>
      <span class="cta">查看詳情 →</span>
    </NuxtLink>

    <NuxtLink to="/projects/python-scraper" class="project-card muted">
      <div class="card-top">
        <span class="tag">資料擷取</span>
        <h2>Python 爬蟲成果</h2>
      </div>
      <p>預留展示區域，將由你自行補充實際成果與成果截圖。</p>
      <span class="cta">保留空間 →</span>
    </NuxtLink>

    <NuxtLink to="/projects/shop" class="project-card">
      <div class="card-top">
        <span class="tag">電商</span>
        <h2>購物網站系統</h2>
      </div>
      <p>商品、購物車、結帳與會員歷程的完整展示。</p>
      <span class="cta">查看詳情 →</span>
    </NuxtLink>

    <NuxtLink to="/projects/graphic-design" class="project-card">
      <div class="card-top">
        <span class="tag">設計</span>
        <h2>圖形設計作品集</h2>
      </div>
      <p>視覺識別、插畫與網站設計的完整作品展示。</p>
      <span class="cta">查看詳情 →</span>
    </NuxtLink>

    <NuxtLink to="/projects/news" class="project-card">
      <div class="card-top">
        <span class="tag">資訊流</span>
        <h2>每日新聞抓取</h2>
      </div>
      <p>結合資料彙整、分類與摘要的新聞展示體驗。</p>
      <span class="cta">查看詳情 →</span>
    </NuxtLink>

    <NuxtLink to="/projects/youtube" class="project-card">
      <div class="card-top">
        <span class="tag">多媒體</span>
        <h2>YouTube 內嵌展示</h2>
      </div>
      <p>示範網頁內嵌影音與周邊資訊排版。</p>
      <span class="cta">查看詳情 →</span>
    </NuxtLink>

    <NuxtLink to="/projects/audit" class="project-card">
      <div class="card-top">
        <span class="tag">監控</span>
        <h2>審計與監控系統</h2>
      </div>
      <p>展示操作紀錄追蹤、權限管理、系統日誌與合規報告的完整審計功能。</p>
      <span class="cta">查看詳情 →</span>
    </NuxtLink>
  </section>
</template>

<style scoped>
  :root {
    color-scheme: light;
  }

  .portfolio-hero {
    position: relative;
    padding: 5rem 2rem 3.75rem;
    background:
      radial-gradient(circle at top left, #ffe6cc 0%, transparent 60%),
      radial-gradient(circle at 80% 10%, #d9f4ff 0%, transparent 55%),
      linear-gradient(135deg, #f5f0e6 0%, #e8dcc8 55%, #d4c4a8 100%);
    overflow: hidden;
  }

  .hero-glow {
    position: absolute;
    width: 28.75rem;
    height: 28.75rem;
    border-radius: 50%;
    background: radial-gradient(circle, #ffba7a59, transparent 70%);
    right: -7.5rem;
    top: -11.25rem;
    filter: blur(0.375rem);
  }

  .hero-content {
    position: relative;
    max-width: 68.75rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
    gap: 2rem;
    align-items: center;
  }

  .hero-text h1 {
    margin: 0.75rem 0 1rem;
    font-size: 2.75rem;
    font-family: 'Playfair Display', 'Times New Roman', serif;
    color: #1f1b2d;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.1875rem;
    font-size: 0.75rem;
    color: #9a7c5a;
    margin: 0;
  }

  .lead {
    font-size: 1rem;
    line-height: 1.7;
    color: #4d4a57;
    margin: 0 0 1.5rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.75rem 1.75rem;
    border-radius: 62.4375rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.875rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .btn-primary {
    background: #ff9f4a;
    color: #1f1b2d;
    box-shadow: 0 0.625rem 1.25rem #ff9f4a40;
  }

  .btn-primary:hover {
    transform: translateY(-0.125rem);
  }

  .btn-ghost {
    border: 0.0625rem solid #1f1b2d;
    color: #1f1b2d;
  }

  .hero-panel {
    background: #1f1b2d;
    color: #f5f0e6;
    border-radius: 1.125rem;
    padding: 1.5rem;
    box-shadow: 0 1.125rem 2.5rem #1f1b2d40;
    animation: floatIn 0.8s ease both;
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.8125rem;
    margin-bottom: 1.25rem;
  }

  .status-dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background: #9effc0;
  }

  .panel-list {
    display: grid;
    gap: 0.75rem;
    font-size: 0.875rem;
  }

  .panel-item {
    background: #ffffff14;
    padding: 0.625rem 0.75rem;
    border-radius: 0.625rem;
    text-decoration: none;
    color: #f5f0e6;
    display: block;
    transition: background 0.3s ease;
    cursor: pointer;
  }

  .panel-item:hover {
    background: #ffffff1f;
  }

  .projects-grid {
    max-width: 68.75rem;
    margin: 3.75rem auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border-radius: 1rem;
    text-decoration: none;
    background: #ffffff;
    color: #1f1b2d;
    box-shadow: 0 0.75rem 1.625rem #1f1b2d14;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 1.125rem 2rem #1f1b2d1f;
  }

  .project-card.muted {
    background: #f8f7fb;
  }

  .card-top {
    display: grid;
    gap: 0.5rem;
  }

  .tag {
    font-size: 0.6875rem;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
    color: #9a7c5a;
  }

  .cta {
    font-size: 0.8125rem;
    color: #6b4f3b;
    font-weight: 600;
  }

  .card-features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin: 0.25rem 0;
  }

  .feature {
    display: inline-block;
    padding: 0.25rem 0.625rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    border-radius: 62.4375rem;
    font-size: 0.6875rem;
    font-weight: 600;
    white-space: nowrap;
  }

  @keyframes floatIn {
    from {
      transform: translateY(1.25rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 45rem) {
    .portfolio-hero {
      padding: 3.75rem 1.25rem 2.5rem;
    }

    .projects-grid {
      margin-top: -1.25rem;
      padding: 0 1.25rem 2.5rem;
      grid-template-columns: 1fr;
    }
  }
</style>
