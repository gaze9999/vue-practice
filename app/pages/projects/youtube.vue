<template>
  <section class="video-hero">
    <div class="hero-text">
      <p class="eyebrow">Embedded Media</p>
      <h1>YouTube 網頁內嵌展示</h1>
      <p class="lead">
        示範嵌入式影音在作品頁中的展示方式，包含說明區與相關資訊卡片。
      </p>
    </div>
    <div class="video-frame">
      <iframe
        src="https://www.youtube.com/embed/aqz-KE-bpKQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </section>

  <section class="video-section">
    <h2>影片說明</h2>
    <p>
      這裡可放置影片介紹、專案背景與相關連結。你也可以替換影片連結為自己的作品影片或展示片段。
    </p>
    <div class="info-grid">
      <div class="info-card">
        <h3>展示用途</h3>
        <p>適合用於產品 Demo、操作教學或成果展示。</p>
      </div>
      <div class="info-card">
        <h3>版面設計</h3>
        <p>右側資訊卡可替換為專案規格、技術細節或聯絡方式。</p>
      </div>
      <div class="info-card">
        <h3>可調整項目</h3>
        <p>支援不同尺寸與比例，對應行動裝置版面。</p>
      </div>
    </div>
  </section>

  <section class="video-footer">
    <NuxtLink to="/" class="btn">返回首頁</NuxtLink>
  </section>
</template>

<style scoped>
  .video-hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
    padding: 60px 32px 40px;
    background: linear-gradient(135deg, #1f1b2d 0%, #2f2a3f 100%);
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
    color: rgba(245, 240, 230, 0.8);
    line-height: 1.7;
  }

  .video-frame {
    position: relative;
    padding-top: 56.25%;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  }

  .video-frame iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .video-section {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 32px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 20px;
  }

  .info-card {
    background: white;
    border-radius: 16px;
    padding: 18px;
    box-shadow: 0 12px 24px rgba(31, 27, 45, 0.08);
  }

  .video-footer {
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
