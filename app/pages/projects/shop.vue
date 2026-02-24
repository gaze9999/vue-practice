<template>
  <section class="shop-hero">
    <div class="hero-text">
      <p class="eyebrow">Commerce Experience</p>
      <h1>購物網站系統</h1>
      <p class="lead">展示商品探索、個人化推薦、購物車與結帳流程的完整體驗。</p>
      <div class="hero-tags">
        <span>商品管理</span>
        <span>會員中心</span>
        <span>結帳流程</span>
      </div>
    </div>
    <div class="hero-preview">
      <div class="preview-card">
        <h3>本週主打</h3>
        <p>精選商品輪播、折扣資訊與即時庫存提示。</p>
        <button class="btn">立即探索</button>
      </div>
      <div class="preview-card light">
        <h3>購物車摘要</h3>
        <p>支持優惠券、運費試算與多地址配送。</p>
      </div>
    </div>
  </section>

  <section class="shop-section">
    <h2>核心流程</h2>
    <div class="flow-grid">
      <div class="flow-item">
        <span>01</span>
        <h4>商品探索</h4>
        <p>分類、關鍵字搜尋、品牌篩選。</p>
      </div>
      <div class="flow-item">
        <span>02</span>
        <h4>加入購物車</h4>
        <p>多規格、即時庫存檢核。</p>
      </div>
      <div class="flow-item">
        <span>03</span>
        <h4>結帳支付</h4>
        <p>信用卡、轉帳、行動支付。</p>
      </div>
      <div class="flow-item">
        <span>04</span>
        <h4>訂單追蹤</h4>
        <p>物流狀態、售後服務。</p>
      </div>
    </div>
  </section>

  <section class="shop-section dark">
    <h2>後台亮點</h2>
    <div class="admin-grid">
      <div class="admin-card">
        <h3>商品資料</h3>
        <p>庫存警示、價格變更紀錄與批次上架。</p>
      </div>
      <div class="admin-card">
        <h3>訂單儀表板</h3>
        <p>日週月營收報表與退貨比率。</p>
      </div>
      <div class="admin-card">
        <h3>會員洞察</h3>
        <p>分群標籤、回購率與推薦成效。</p>
      </div>
    </div>
    <div class="admin-cta">
      <div>
        <h3>直接進入後台</h3>
        <p>查看採購、庫存、財務、人資與報表模組的整合版面。</p>
      </div>
      <NuxtLink to="/shop/admin" class="btn btn-light">前往購物後台 →</NuxtLink>
    </div>
  </section>

  <section class="shop-footer">
    <NuxtLink to="/" class="btn">返回首頁</NuxtLink>
  </section>
</template>

<style scoped>
  .shop-hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
    padding: 60px 32px 40px;
    background: radial-gradient(circle at top right, #fff1d8 0%, transparent 60%),
      linear-gradient(135deg, #ffffff 0%, #f3f6ff 100%);
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
    color: #b27936;
  }

  .lead {
    font-size: 15px;
    color: #4d4a57;
    line-height: 1.7;
  }

  .hero-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .hero-tags span {
    padding: 6px 12px;
    border-radius: 999px;
    background: #fff1d8;
    color: #b27936;
    font-size: 12px;
    font-weight: 600;
  }

  .hero-preview {
    display: grid;
    gap: 12px;
  }

  .preview-card {
    background: #1f1b2d;
    color: #f5f0e6;
    padding: 20px;
    border-radius: 16px;
  }

  .preview-card.light {
    background: white;
    color: #1f1b2d;
    box-shadow: 0 12px 24px rgba(31, 27, 45, 0.08);
  }

  .btn {
    margin-top: 12px;
    background: #ff9f4a;
    color: #1f1b2d;
    border: none;
    padding: 10px 18px;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
  }

  .shop-section {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 32px;
  }

  .flow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .flow-item {
    background: white;
    border-radius: 16px;
    padding: 18px;
    box-shadow: 0 10px 24px rgba(31, 27, 45, 0.08);
  }

  .flow-item span {
    font-weight: 700;
    color: #ff9f4a;
  }

  .shop-section.dark {
    background: #1f1b2d;
    color: #f5f0e6;
    border-radius: 24px;
  }

  .admin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .admin-card {
    padding: 18px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 16px;
  }

  .admin-cta {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.12);
  }

  .admin-cta h3 {
    margin: 0 0 6px;
  }

  .admin-cta p {
    margin: 0;
    color: rgba(245, 240, 230, 0.82);
  }

  .btn-light {
    background: #f5f0e6;
    color: #1f1b2d;
    text-decoration: none;
  }

  .shop-footer {
    display: flex;
    justify-content: center;
    padding: 20px 0 60px;
  }
</style>
