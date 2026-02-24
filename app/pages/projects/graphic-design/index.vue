<template>
  <div class="graphics-container">
    <!-- Navigation -->
    <nav class="graphics-nav">
      <h1 class="nav-brand">GRAPHIC DESIGN</h1>
      <NuxtLink to="/projects" class="back-link">← 返回專案</NuxtLink>
    </nav>

    <!-- Image Lightbox Modal -->
    <div v-if="showModal" class="lightbox-modal" @click="closeLightbox">
      <button class="modal-close" @click="closeLightbox" aria-label="關閉">&times;</button>
      <div class="lightbox-content" @click.stop>
        <img :src="selectedImage" :alt="selectedImageAlt" class="full-image">
      </div>
    </div>

    <!-- Hero Section -->
    <section class="graphics-hero">
      <h1>平面設計作品集</h1>
      <p class="subtitle">Graphic Design Portfolio</p>
      <p class="lead">多樣化的設計風格展示，包括視覺識別、插畫與網站設計</p>
    </section>

    <!-- Navigation Highlights -->
    <section class="nav-highlights">
      <a href="#portfolio" class="highlight-item">
        <span class="label">PORTFOLIO</span>
      </a>
      <a href="#about" class="highlight-item">
        <span class="label">ABOUT</span>
      </a>
    </section>

    <!-- Portfolio Section -->
    <section class="portfolio-section" id="portfolio">
      <h2>GRAPHIC WORKS</h2>
      <p class="section-subtitle">精選設計作品系列</p>
      <div class="portfolio-grid">
        <div class="portfolio-item" role="button" tabindex="0" @click="openLightbox('/assets/images/portfolio/deer2x.png', '鹿頭標誌')" @keydown.enter="openLightbox('/assets/images/portfolio/deer2x.png', '鹿頭標誌')">
          <div class="item-image-wrapper">
            <img src="/assets/images/portfolio/deer2x.png" alt="Deer Design - Personal Logo" class="portfolio-image">
          </div>
          <div class="item-content">
            <h3>鹿頭標誌</h3>
            <p class="description">我喜歡鹿靈巧的氣質，用 Adobe Illustrator 設計了一個個人標誌。融合線條與面積的感受，簡潔而富有辨識度。</p>
            <p class="tools">工具：Adobe Illustrator</p>
          </div>
        </div>

        <div class="portfolio-item" role="button" tabindex="0" @click="openLightbox('/assets/images/portfolio/buddha2x.png', 'Buddha Machine')" @keydown.enter="openLightbox('/assets/images/portfolio/buddha2x.png', 'Buddha Machine')">
          <div class="item-image-wrapper">
            <img src="/assets/images/portfolio/buddha2x.png" alt="Buddha Machine Artwork" class="portfolio-image">
          </div>
          <div class="item-content">
            <h3>Buddha Machine</h3>
            <p class="description">探索禪學意涵的筆畫創作。黑白線條交織，呈現靜謐與機械美的對話。未加上色的淨白設計，留予觀者想像空間。</p>
            <p class="tools">工具：手繪＆掃描處理</p>
          </div>
        </div>

        <div class="portfolio-item" role="button" tabindex="0" @click="openLightbox('/assets/images/portfolio/resume2x.png', '履歷設計')" @keydown.enter="openLightbox('/assets/images/portfolio/resume2x.png', '履歷設計')">
          <div class="item-image-wrapper">
            <img src="/assets/images/portfolio/resume2x.png" alt="Resume Design" class="portfolio-image">
          </div>
          <div class="item-content">
            <h3>履歷設計</h3>
            <p class="description">以個人鹿頭標誌為視覺核心，設計的創意履歷版型。將設計元素與資訊組織完美結合，體現個人風格與專業精神。</p>
            <p class="tools">工具：Adobe InDesign</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Website Design Section -->
    <section class="website-section">
      <h2>WEBSITE DESIGNS</h2>
      <p class="section-subtitle">響應式網站設計系列</p>
      <div class="website-grid">
        <div class="website-item" role="button" tabindex="0" @click="openLightbox('/assets/images/portfolio/websitedesktop.png', '桌機版設計')" @keydown.enter="openLightbox('/assets/images/portfolio/websitedesktop.png', '桌機版設計')">
          <div class="item-image-wrapper">
            <img src="/assets/images/portfolio/websitedesktop.png" alt="Website Desktop Version Design" class="website-image">
          </div>
          <div class="item-content">
            <h3>桌機版設計</h3>
            <p class="description">完整的桌機版網站設計，採用現代化佈局。充分利用寬屏空間，提供清晰的資訊架構與優雅的視覺層級。注重用戶導航體驗與內容展示的平衡。</p>
            <p class="tools">工具：Figma / Adobe XD</p>
          </div>
        </div>

        <div class="website-item" role="button" tabindex="0" @click="openLightbox('/assets/images/portfolio/websitemobile.png', '行動版設計')" @keydown.enter="openLightbox('/assets/images/portfolio/websitemobile.png', '行動版設計')">
          <div class="item-image-wrapper">
            <img src="/assets/images/portfolio/websitemobile.png" alt="Website Mobile Version Design" class="website-image">
          </div>
          <div class="item-content">
            <h3>行動版設計</h3>
            <p class="description">針對行動裝置最佳化的設計方案。精簡版面配置，優先展示核心內容，確保觸控易用性。嚴格遵循響應式設計原則，在小螢幕上也能提供流暢體驗。</p>
            <p class="tools">工具：Figma / Adobe XD</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="about">
      <h2>DESIGN PHILOSOPHY</h2>
      <div class="philosophy-cards">
        <div class="philosophy-card">
          <span class="phil-icon"><i class="fas fa-palette"></i></span>
          <h3>視覺美學</h3>
          <p>注重色彩和諧、排版清晰、視覺平衡，創造令人驚艷的視覺體驗。</p>
        </div>
        <div class="philosophy-card">
          <span class="phil-icon"><i class="fas fa-lightbulb"></i></span>
          <h3>創意思考</h3>
          <p>突破傳統框架，運用創意元素，將複雜概念簡化並視覺化。</p>
        </div>
        <div class="philosophy-card">
          <span class="phil-icon"><i class="fas fa-mobile-alt"></i></span>
          <h3>多平台支援</h3>
          <p>設計兼顧桌機、平板與手機，確保所有裝置上的優秀視覺呈現。</p>
        </div>
        <div class="philosophy-card">
          <span class="phil-icon"><i class="fas fa-bullseye"></i></span>
          <h3>目標導向</h3>
          <p>每個設計都有明確的目標受眾與傳達目的，設計用於溝通。</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="graphics-footer">
      <NuxtLink to="/projects" class="footer-link">← 返回專案列表</NuxtLink>
      <p>&copy; 2025 Gazelle Design</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(!1);
const selectedImage = ref('');
const selectedImageAlt = ref('');

const openLightbox = (src: string, alt: string) => {
  selectedImage.value = src;
  selectedImageAlt.value = alt;
  showModal.value = !0;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  showModal.value = !1;
  document.body.style.overflow = 'auto';
};

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showModal.value) {
      closeLightbox();
    }
  };
  window.addEventListener('keydown', handleEscape);
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
  });
});

definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
  .graphics-container {
    min-height: 100vh;
    background: linear-gradient(180deg, #f5f0e6 0%, #e8dcc8 50%, #d4c4a8 100%);
  }

  /* Navigation */
  .graphics-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 2.5rem;
    position: sticky;
    top: 0;
    background: #f5f0e6f2;
    border-bottom: 0.0625rem solid #1f1b2d14;
    z-index: 100;
  }

  .nav-brand {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: 0.125rem;
    color: #1f1b2d;
  }

  .back-link {
    color: #b27936;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.8125rem;
    transition: color 0.3s ease;
  }

  .back-link:hover {
    color: #ff9f4a;
  }

  /* Hero Section */
  .graphics-hero {
    padding: 3.75rem 2.5rem;
    text-align: center;
  }

  .graphics-hero h1 {
    font-size: 3rem;
    margin: 0 0 0.5rem;
    color: #1f1b2d;
    letter-spacing: 0.125rem;
  }

  .subtitle {
    font-size: 0.875rem;
    color: #9a7c5a;
    margin: 0 0 1rem;
    letter-spacing: 0.0625rem;
  }

  .lead {
    font-size: 1rem;
    color: #6b4f3b;
    margin: 0;
    max-width: 37.5rem;
    margin-left: auto;
    margin-right: auto;
  }

  /* Navigation Highlights */
  .nav-highlights {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    padding: 2.5rem;
    flex-wrap: wrap;
  }

  .highlight-item {
    text-decoration: none;
    text-align: center;
    transition: transform 0.3s ease;
  }

  .highlight-item:hover {
    transform: scale(1.1);
  }

  .highlight-item .label {
    display: block;
    font-size: 0.6875rem;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
    color: #b27936;
  }

  /* Portfolio Section */
  .portfolio-section {
    padding: 3.75rem 2.5rem;
    background: #d4c4a84d;
  }

  .portfolio-section h2 {
    text-align: center;
    font-size: 2rem;
    margin: 0 0 2.5rem;
    color: #1f1b2d;
    letter-spacing: 0.0625rem;
  }

  .works-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16.25rem, 1fr));
    gap: 1.5rem;
    max-width: 75rem;
    margin: 0 auto;
  }

  .gallery-item {
    background: #ffffff;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 0.25rem 0.75rem #1f1b2d14;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .gallery-item:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1.25rem #1f1b2d1f;
  }

  .gallery-image {
    width: 100%;
    height: 17.5rem;
    object-fit: cover;
    display: block;
  }

  .item-info {
    padding: 1.25rem;
  }

  .item-info h3 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    color: #1f1b2d;
  }

  .item-info p {
    margin: 0;
    font-size: 0.8125rem;
    color: #9a7c5a;
  }

  /* Portfolio Section */
  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
    gap: 2rem;
    max-width: 75rem;
    margin: 0 auto;
  }

  .portfolio-item {
    background: #ffffff;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 0.25rem 0.75rem #1f1b2d14;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .portfolio-item:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1.25rem #1f1b2d1f;
  }

  .item-image-wrapper {
    overflow: hidden;
    height: 18.75rem;
  }

  .portfolio-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .item-content {
    padding: 1.5rem;
  }

  .item-content h3 {
    margin: 0 0 0.75rem;
    font-size: 1.125rem;
    color: #1f1b2d;
  }

  .description {
    margin: 0 0 0.75rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: #6b4f3b;
  }

  .tools {
    margin: 0;
    font-size: 0.75rem;
    color: #9a7c5a;
    font-style: italic;
  }

  /* Website Section */
  .website-section {
    padding: 3.75rem 2.5rem;
  }

  .website-section h2 {
    text-align: center;
    font-size: 2rem;
    margin: 0 0 2.5rem;
    color: #1f1b2d;
    letter-spacing: 0.0625rem;
  }

  .website-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
    gap: 2rem;
    max-width: 75rem;
    margin: 0 auto;
  }

  .website-item {
    background: #ffffff;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 0.25rem 0.75rem #1f1b2d14;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .website-item:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1.25rem #1f1b2d1f;
  }

  .website-image {
    width: 100%;
    height: 18.75rem;
    object-fit: cover;
    display: block;
  }

  /* About Section */
  .about-section {
    padding: 3.75rem 2.5rem;
    background: #d4c4a84d;
  }

  .about-section h2 {
    text-align: center;
    font-size: 2rem;
    margin: 0 0 2.5rem;
    color: #1f1b2d;
    letter-spacing: 0.0625rem;
  }

  .philosophy-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
    gap: 1.5rem;
    max-width: 62.5rem;
    margin: 0 auto;
  }

  .philosophy-card {
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 0.75rem;
    text-align: center;
    box-shadow: 0 0.25rem 0.75rem #1f1b2d14;
  }

  .phil-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 0.75rem;
  }

  .philosophy-card h3 {
    margin: 0 0 0.75rem;
    font-size: 1rem;
    color: #1f1b2d;
  }

  .philosophy-card p {
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.6;
    color: #6b4f3b;
  }

  /* Footer */
  .graphics-footer {
    padding: 2.5rem;
    text-align: center;
    border-top: 0.0625rem solid #1f1b2d14;
    background: #f5f0e6cc;
  }

  .footer-link {
    display: inline-block;
    color: #b27936;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.8125rem;
    margin-bottom: 1rem;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #ff9f4a;
  }

  .graphics-footer p {
    margin: 0;
    font-size: 0.75rem;
    color: #9a7c5a;
  }

  /* Lightbox Modal */
  .lightbox-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000d9;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1.25rem;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
  }

  .full-image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0.5rem;
    animation: zoomIn 0.3s ease;
  }

  @keyframes zoomIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .modal-close {
    position: absolute;
    top: -2.5rem;
    right: 0;
    background: none;
    border: none;
    color: #ffffff;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    line-height: 1;
    transition: transform 0.2s ease;
  }

  .modal-close:hover {
    transform: scale(1.2);
  }

  /* Responsive */
  @media (max-width: 48rem) {
    .graphics-nav {
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem;
    }

    .graphics-hero {
      padding: 2.5rem 1rem;
    }

    .graphics-hero h1 {
      font-size: 2rem;
    }

    .nav-highlights {
      gap: 1.25rem;
      padding: 1.25rem;
    }

    .portfolio-section {
      padding: 2.5rem 1rem;
    }

    .works-gallery {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .website-section {
      padding: 2.5rem 1rem;
    }

    .website-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .about-section {
      padding: 2.5rem 1rem;
    }

    .philosophy-cards {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
</style>
