<template>
  <section class="portfolio-hero">
    <div class="hero-glow"></div>
    <div class="hero-content">
      <div class="hero-text">
        <p class="eyebrow">Portfolio Showcase</p>
        <h1>作品展示集</h1>
        <p class="lead">
          精選五個代表性作品，呈現企業級系統設計、資料擷取與前端整合能力。
        </p>
        <div class="hero-actions">
          <NuxtLink to="/shop/admin" class="btn btn-primary">先看購物後台</NuxtLink>
          <NuxtLink to="/about" class="btn btn-ghost">查看作品概覽</NuxtLink>
        </div>
      </div>

      <div class="hero-panel">
        <div class="panel-header">
          <span class="status-dot"></span>
          <span>展示版工作台</span>
        </div>
        <div class="panel-list">
          <div class="panel-item">購物後台管理系統</div>
          <div class="panel-item">Python 爬蟲成果（待補）</div>
          <div class="panel-item">購物網站系統</div>
          <div class="panel-item">每日新聞抓取範例</div>
          <div class="panel-item">YouTube 內嵌展示</div>
        </div>
      </div>
    </div>
  </section>

  <section class="projects-grid">
    <NuxtLink to="/shop/admin" class="project-card">
      <div class="card-top">
        <span class="tag">後台</span>
        <h2>購物後台管理系統</h2>
      </div>
      <p>參考 TSRDERP 組織方式，整合採購、庫存、財務、人資與報表模組。</p>
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
  </section>
</template>

<style scoped>
  :root {
    color-scheme: light;
  }

  .portfolio-hero {
    position: relative;
    padding: 80px 32px 60px;
    background:
      radial-gradient(circle at top left, #ffe6cc 0%, transparent 60%),
      radial-gradient(circle at 80% 10%, #d9f4ff 0%, transparent 55%),
      linear-gradient(135deg, #f9f7f4 0%, #f3f0ff 55%, #f1fff7 100%);
    overflow: hidden;
  }

  .hero-glow {
    position: absolute;
    width: 460px;
    height: 460px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 186, 122, 0.35), transparent 70%);
    right: -120px;
    top: -180px;
    filter: blur(6px);
  }

  .hero-content {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
    align-items: center;
  }

  .hero-text h1 {
    margin: 12px 0 16px;
    font-size: 44px;
    font-family: 'Playfair Display', 'Times New Roman', serif;
    color: #1f1b2d;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 12px;
    color: #9a7c5a;
    margin: 0;
  }

  .lead {
    font-size: 16px;
    line-height: 1.7;
    color: #4d4a57;
    margin: 0 0 24px;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn {
    padding: 12px 28px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .btn-primary {
    background: #ff9f4a;
    color: #1f1b2d;
    box-shadow: 0 10px 20px rgba(255, 159, 74, 0.25);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
  }

  .btn-ghost {
    border: 1px solid #1f1b2d;
    color: #1f1b2d;
  }

  .hero-panel {
    background: #1f1b2d;
    color: #f5f0e6;
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 18px 40px rgba(31, 27, 45, 0.25);
    animation: floatIn 0.8s ease both;
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    margin-bottom: 20px;
  }

  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #9effc0;
  }

  .panel-list {
    display: grid;
    gap: 12px;
    font-size: 14px;
  }

  .panel-item {
    background: rgba(255, 255, 255, 0.08);
    padding: 10px 12px;
    border-radius: 10px;
  }

  .projects-grid {
    max-width: 1100px;
    margin: -40px auto 60px;
    padding: 0 32px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    border-radius: 16px;
    text-decoration: none;
    background: white;
    color: #1f1b2d;
    box-shadow: 0 12px 26px rgba(31, 27, 45, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 32px rgba(31, 27, 45, 0.12);
  }

  .project-card.muted {
    background: #f8f7fb;
  }

  .card-top {
    display: grid;
    gap: 8px;
  }

  .tag {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #9a7c5a;
  }

  .cta {
    font-size: 13px;
    color: #6b4f3b;
    font-weight: 600;
  }

  @keyframes floatIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 720px) {
    .portfolio-hero {
      padding: 60px 20px 40px;
    }

    .projects-grid {
      margin-top: -20px;
      padding: 0 20px 40px;
    }
  }
</style>
