<template>
  <section class="project-hero">
    <div class="hero-content">
      <p class="eyebrow">Commerce Back Office</p>
      <h1>購物後台管理系統</h1>
      <p class="lead">
        以電商營運為情境，參考 TSRDERP 組織方式，展示採購、庫存、財務、人資與報表的整合後台設計。
      </p>
      <div class="hero-meta">
        <span>模組數量：6</span>
        <span>角色權限：7</span>
        <span>資料流：20+ 節點</span>
      </div>
    </div>
    <div class="hero-panel">
      <div class="panel-header">後台控制中樞</div>
      <div class="panel-grid">
        <div class="panel-card">
          <h4>採購與供應</h4>
          <p>採購需求 → 審核 → 供應商 → 驗收</p>
        </div>
        <div class="panel-card">
          <h4>庫存管理</h4>
          <p>批次控管、庫位盤點與異動追蹤</p>
        </div>
        <div class="panel-card">
          <h4>財務結算</h4>
          <p>憑證、應收應付、月結報表</p>
        </div>
        <div class="panel-card">
          <h4>人資流程</h4>
          <p>招募、排班、績效、薪資結算</p>
        </div>
      </div>
    </div>
  </section>

  <section class="project-section">
    <h2>核心模組設計</h2>
    <div class="module-grid">
      <article>
        <h3>供應鏈管理</h3>
        <p>涵蓋需求規劃、供應商評分、交期監控與採購風險。</p>
      </article>
      <article>
        <h3>資產與庫存</h3>
        <p>支援批次追溯、序號管理、庫存預警與倉庫動線。</p>
      </article>
      <article>
        <h3>財務與稅務</h3>
        <p>整合費用與收入資料，建立自動對帳與稅務報表。</p>
      </article>
      <article>
        <h3>人資管理</h3>
        <p>角色權限、薪資結構、考勤管理與績效指標。</p>
      </article>
    </div>
  </section>

  <section class="project-section dark">
    <h2>系統架構亮點</h2>
    <div class="architecture-list">
      <div class="arch-item">
        <span>01</span>
        <p>模組化設計，支援快速擴充新流程</p>
      </div>
      <div class="arch-item">
        <span>02</span>
        <p>多層權限控管，對應各部門角色</p>
      </div>
      <div class="arch-item">
        <span>03</span>
        <p>即時監控與 KPI 儀表板</p>
      </div>
      <div class="arch-item">
        <span>04</span>
        <p>集中式報表輸出與匯出服務</p>
      </div>
    </div>
  </section>

  <section class="project-section">
    <h2>展示內容</h2>
    <div class="showcase">
      <div>
        <h3>視覺展示</h3>
        <p>提供跨模組的工作台與總覽視圖，強調營運效率。</p>
      </div>
      <div>
        <h3>流程示意</h3>
        <p>以圖卡形式描述「需求 → 採購 → 交付 → 結算」完整流程。</p>
      </div>
      <div>
        <h3>資料分析</h3>
        <p>即時監控供應鏈績效與財務風險。</p>
      </div>
    </div>
  </section>

  <section class="project-section">
    <div class="entry-card">
      <div>
        <h2>體驗購物後台</h2>
        <p>瀏覽實際模組頁面與角色權限配置示範。</p>
      </div>
      <NuxtLink to="/shop/admin" class="btn">前往後台 →</NuxtLink>
    </div>
  </section>

  <section class="project-footer">
    <NuxtLink to="/" class="btn">返回首頁</NuxtLink>
  </section>
</template>

<style scoped>
  .project-hero {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    align-items: center;
    padding: 60px 32px 40px;
    background: linear-gradient(135deg, #f2f5ff 0%, #fff8ef 100%);
  }

  .hero-content h1 {
    font-size: 36px;
    margin: 12px 0 16px;
    font-family: 'Playfair Display', 'Times New Roman', serif;
  }

  .eyebrow {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #8f6b4f;
    margin: 0;
  }

  .lead {
    font-size: 16px;
    color: #4d4a57;
    line-height: 1.7;
  }

  .hero-meta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 13px;
    color: #6b4f3b;
    font-weight: 600;
  }

  .hero-panel {
    background: #1f1b2d;
    color: #f5f0e6;
    padding: 24px;
    border-radius: 18px;
    box-shadow: 0 18px 40px rgba(31, 27, 45, 0.2);
  }

  .panel-header {
    font-weight: 600;
    margin-bottom: 16px;
  }

  .panel-grid {
    display: grid;
    gap: 12px;
  }

  .panel-card {
    background: rgba(255, 255, 255, 0.08);
    padding: 12px;
    border-radius: 12px;
  }

  .panel-card h4 {
    margin: 0 0 6px;
  }

  .project-section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 32px;
  }

  .project-section h2 {
    margin-bottom: 20px;
  }

  .module-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }

  .module-grid article {
    padding: 18px;
    border-radius: 14px;
    background: #ffffff;
    box-shadow: 0 12px 24px rgba(31, 27, 45, 0.08);
  }

  .entry-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 24px;
    background: #ffffff;
    border-radius: 18px;
    box-shadow: 0 16px 32px rgba(31, 27, 45, 0.08);
  }

  .entry-card h2 {
    margin: 0 0 8px;
  }

  .entry-card p {
    margin: 0;
    color: #4d4a57;
  }

  @media (max-width: 720px) {
    .entry-card {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .project-section.dark {
    background: #1f1b2d;
    color: #f5f0e6;
    border-radius: 22px;
  }

  .architecture-list {
    display: grid;
    gap: 12px;
  }

  .arch-item {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
  }

  .arch-item span {
    font-weight: 700;
    color: #ff9f4a;
  }

  .showcase {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .project-footer {
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
