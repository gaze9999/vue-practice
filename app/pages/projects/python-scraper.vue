<template>
  <section class="scraper-hero">
    <div class="hero-text">
      <p class="eyebrow">Data Collection</p>
      <h1>Python 爬蟲成果範例</h1>
      <p class="lead">此頁面預留給你補充爬蟲成果、流程與數據分析視覺。</p>
      <div class="status-badge">內容待補充</div>
    </div>
    <div class="hero-card">
      <h3>展示建議</h3>
      <ul>
        <li>爬取來源與頻率</li>
        <li>數據清洗與儲存流程</li>
        <li>成果報表、圖表或截圖</li>
        <li>自動化排程與通知機制</li>
      </ul>
    </div>
  </section>

  <section class="scraper-section">
    <h2>流程概覽（可替換）</h2>
    <div class="pipeline">
      <div class="step">
        <span>01</span>
        <p>資料來源設定</p>
      </div>
      <div class="step">
        <span>02</span>
        <p>爬取與解析</p>
      </div>
      <div class="step">
        <span>03</span>
        <p>清洗與分類</p>
      </div>
      <div class="step">
        <span>04</span>
        <p>輸出與視覺化</p>
      </div>
    </div>
  </section>

  <section class="scraper-section light">
    <h2>可放入的成果形式</h2>
    <div class="placeholder-grid">
      <div class="placeholder">📊 數據儀表板</div>
      <div class="placeholder">🧾 報表下載</div>
      <div class="placeholder">🧠 模型分析</div>
      <div class="placeholder">📷 成果截圖</div>
    </div>
  </section>

  <section class="scraper-footer">
    <NuxtLink to="/" class="btn">返回首頁</NuxtLink>
  </section>
</template>

<style scoped>
  .scraper-hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
    padding: 60px 32px 40px;
    background: linear-gradient(135deg, #1f1b2d 0%, #3b314f 100%);
    color: #f5f0e6;
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
  }

  .status-badge {
    display: inline-block;
    margin-top: 12px;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(255, 181, 107, 0.2);
    color: #ffb56b;
    font-size: 12px;
    font-weight: 600;
  }

  .hero-card {
    background: rgba(255, 255, 255, 0.08);
    padding: 20px;
    border-radius: 16px;
  }

  .hero-card ul {
    margin: 0;
    padding-left: 18px;
    line-height: 1.8;
  }

  .scraper-section {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 32px;
  }

  .pipeline {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }

  .step {
    background: #ffffff;
    border-radius: 14px;
    padding: 16px;
    box-shadow: 0 10px 24px rgba(31, 27, 45, 0.08);
    text-align: center;
  }

  .step span {
    display: block;
    font-weight: 700;
    color: #ff9f4a;
    margin-bottom: 6px;
  }

  .scraper-section.light {
    background: #f8f7fb;
    border-radius: 24px;
  }

  .placeholder-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .placeholder {
    padding: 16px;
    border-radius: 14px;
    background: white;
    text-align: center;
    font-weight: 600;
    color: #6b4f3b;
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
  }
</style>
