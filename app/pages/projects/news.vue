<template>
  <section class="news-hero">
    <div class="hero-text">
      <p class="eyebrow">Daily Briefing</p>
      <h1>每日新聞抓取範例</h1>
      <p class="lead">
        以資料彙整為核心，展示新聞來源整合、分類標籤與摘要輸出流程。
      </p>
    </div>
    <div class="hero-stats">
      <div class="stat-card">
        <h3>來源數量</h3>
        <p>12 個來源</p>
      </div>
      <div class="stat-card">
        <h3>更新頻率</h3>
        <p>每小時同步</p>
      </div>
      <div class="stat-card">
        <h3>分類標籤</h3>
        <p>6 大類別</p>
      </div>
    </div>
  </section>

  <section class="news-section">
    <h2>今日摘要</h2>
    <div class="news-grid">
      <article class="news-card">
        <span class="tag">科技</span>
        <h3>AI 產業動態摘要</h3>
        <p>整理最新 AI 產品發布與投資消息，快速掌握產業趨勢。</p>
      </article>
      <article class="news-card">
        <span class="tag">金融</span>
        <h3>市場波動分析</h3>
        <p>彙整指數變化與關鍵事件，提供影響因子解讀。</p>
      </article>
      <article class="news-card">
        <span class="tag">社會</span>
        <h3>公共議題速覽</h3>
        <p>篩選高關注度議題，搭配摘要與延伸閱讀。</p>
      </article>
    </div>
  </section>

  <section class="news-section light">
    <h2>資料流程</h2>
    <div class="pipeline">
      <div class="pipeline-item">
        <span>01</span>
        <p>抓取來源列表</p>
      </div>
      <div class="pipeline-item">
        <span>02</span>
        <p>解析標題與內文</p>
      </div>
      <div class="pipeline-item">
        <span>03</span>
        <p>分類與摘要</p>
      </div>
      <div class="pipeline-item">
        <span>04</span>
        <p>輸出前端展示</p>
      </div>
    </div>
  </section>

  <section class="news-footer">
    <NuxtLink to="/" class="btn">返回首頁</NuxtLink>
  </section>
</template>

<style scoped>
  .news-hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    padding: 60px 32px 40px;
    background: linear-gradient(135deg, #f0f5ff 0%, #fdf7f0 100%);
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
    color: #7b6d58;
  }

  .lead {
    font-size: 15px;
    color: #4d4a57;
    line-height: 1.7;
  }

  .hero-stats {
    display: grid;
    gap: 12px;
  }

  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 18px;
    box-shadow: 0 12px 24px rgba(31, 27, 45, 0.08);
  }

  .news-section {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 32px;
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }

  .news-card {
    background: white;
    border-radius: 16px;
    padding: 18px;
    box-shadow: 0 10px 24px rgba(31, 27, 45, 0.08);
  }

  .news-card .tag {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #b27936;
  }

  .news-section.light {
    background: #1f1b2d;
    color: #f5f0e6;
    border-radius: 24px;
  }

  .pipeline {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }

  .pipeline-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 16px;
    border-radius: 16px;
    text-align: center;
  }

  .pipeline-item span {
    display: block;
    font-weight: 700;
    color: #ff9f4a;
    margin-bottom: 8px;
  }

  .news-footer {
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
  }
</style>
