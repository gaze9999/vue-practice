<template>
  <div class="about-page">
    <header class="about-header">
      <p class="eyebrow">About The Portfolio</p>
      <h1>作品集導覽</h1>
      <p class="subtitle">聚焦企業系統、資料擷取與多媒體整合的展示型專案</p>
    </header>

    <section class="about-grid">
      <article class="about-card">
        <h2>策展思路</h2>
        <p>
          這份作品集以「可落地的產品構想」為主軸，將購物後台、電商平台、新聞抓取與影音嵌入整合為一組連貫的
          應用場景。
        </p>
      </article>

      <article class="about-card">
        <h2>展示方式</h2>
        <ul>
          <li>以專案頁面詳述流程、模組與核心價值</li>
          <li>保留可補充區塊，方便快速更新成果</li>
          <li>採用一致的視覺語言，便於瀏覽與對比</li>
        </ul>
      </article>

      <article class="about-card">
        <h2>作品清單</h2>
        <div class="list">
          <NuxtLink to="/shop/admin">購物後台管理系統</NuxtLink>
          <NuxtLink to="/projects/python-scraper">Python 爬蟲成果（待補）</NuxtLink>
          <NuxtLink to="/projects/shop">購物網站系統</NuxtLink>
          <NuxtLink to="/projects/news">每日新聞抓取範例</NuxtLink>
          <NuxtLink to="/projects/youtube">YouTube 內嵌展示</NuxtLink>
        </div>
      </article>
    </section>

    <section class="about-strip">
      <div>
        <h3>延伸補充</h3>
        <p>你可在各專案頁中加入截圖、流程圖、影片或程式碼片段，快速完成個人化展示。</p>
      </div>
      <NuxtLink to="/" class="btn">返回首頁</NuxtLink>
    </section>
  </div>
</template>

<style scoped lang="scss">
  .about-page {
    padding: 60px 24px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .about-header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      margin: 12px 0 12px;
      font-size: 42px;
      color: #1f1b2d;
      font-family: 'Playfair Display', 'Times New Roman', serif;
    }

    .subtitle {
      margin: 0;
      color: #5a5666;
      font-size: 16px;
    }
  }

  .eyebrow {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #9a7c5a;
    margin: 0;
  }

  .about-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }

  .about-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 16px 32px rgba(31, 27, 45, 0.08);

    h2 {
      margin: 0 0 12px;
      font-size: 18px;
      color: #1f1b2d;
    }

    p {
      margin: 0;
      color: #5a5666;
      line-height: 1.7;
      font-size: 14px;
    }

    ul {
      margin: 0;
      padding-left: 18px;
      color: #5a5666;
      font-size: 14px;
    }
  }

  .list {
    display: grid;
    gap: 10px;

    a {
      color: #6b4f3b;
      text-decoration: none;
      font-weight: 600;
    }
  }

  .about-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 24px;
    background: #1f1b2d;
    color: #f5f0e6;
    border-radius: 16px;

    h3 {
      margin: 0 0 8px;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: rgba(245, 240, 230, 0.8);
    }
  }

  .btn {
    background: #ff9f4a;
    color: #1f1b2d;
    padding: 10px 20px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    white-space: nowrap;
  }

  @media (max-width: 720px) {
    .about-strip {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
