<template>
  <div class="shop-container">
    <!-- Navigation -->
    <nav class="shop-nav">
      <h1 class="nav-brand">SHOP DESIGN</h1>
      <ul class="nav-menu">
        <li><a href="#displays">DISPLAYS</a></li>
        <li><a href="#introduce">INTRODUCE</a></li>
        <li><a href="#products">PRODUCTS</a></li>
        <li><a href="#contact">CONTACT</a></li>
      </ul>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section" id="displays">
      <div class="hero-title">
        <h2>購物網站系統</h2>
        <p class="subtitle">E-Commerce Experience Design</p>
      </div>
      <div class="hero-showcase">
        <div
          class="lightbox-carousel"
          @mouseenter="isCarouselPaused = !0"
          @mouseleave="isCarouselPaused = !1"
        >
          <div
            v-for="(slide, index) in heroSlides"
            :key="slide.id"
            :class="['lightbox-slide', { active: index === activeSlideIndex }]"
            :style="{ backgroundImage: slide.background }">
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
              <span class="lightbox-eyebrow">{{ slide.eyebrow }}</span>
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.description }}</p>
            </div>
          </div>
          <div class="lightbox-indicators">
            <span
              v-for="(slide, index) in heroSlides"
              :key="slide.id + '-dot'"
              :class="['indicator', { active: index === activeSlideIndex }]"
            ></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Highlights -->
    <section class="nav-highlights">
      <a href="#displays" class="highlight-item">
        <span class="label">DISPLAYS</span>
      </a>
      <a href="#products" class="highlight-item">
        <span class="label">PRODUCTS</span>
      </a>
      <a href="#contact" class="highlight-item">
        <span class="label">CONTACT</span>
      </a>
    </section>

    <!-- Introduce Section -->
    <section class="introduce-section" id="introduce">
      <h2>ABOUT OUR PLATFORM</h2>
      <div class="intro-content">
        <div class="intro-card">
          <h3>精選商品策展</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
        <div class="intro-card">
          <h3>品質保證承諾</h3>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
          <p>Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
        </div>
        <div class="intro-card">
          <h3>優質購物體驗</h3>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products-section" id="products">
      <h2>FEATURED PRODUCTS</h2>
      <div class="products-showcase">
        <div class="product-row" v-for="(row, rowIndex) in productRows" :key="`row-${rowIndex}`">
          <div class="product-card" v-for="item in row" :key="item.id">
            <div class="product-image"><i :class="item.icon"></i></div>
            <p class="product-name">{{ item.name }}</p>
            <p class="product-price">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <h2>PREMIUM SERVICES</h2>
      <div class="services-grid">
        <div class="service-card" v-for="service in servicesData" :key="service.id">
          <div class="service-icon"><i :class="service.icon"></i></div>
          <h3 class="service-name">{{ service.name }}</h3>
          <p class="service-desc">{{ service.description }}</p>
        </div>
      </div>
    </section>

    <!-- Business Info Section -->
    <section class="business-section">
      <h2>BUSINESS TIME</h2>
      <div class="business-grid">
        <div class="business-item">
          <span class="label">Monday-Friday</span>
          <span class="time">08:00 - 18:00</span>
        </div>
        <div class="business-item">
          <span class="label">Saturday</span>
          <span class="time">10:00 - 16:00</span>
        </div>
        <div class="business-item">
          <span class="label">Sunday</span>
          <span class="time">Closed</span>
        </div>
        <div class="business-item">
          <span class="label">Holiday Support</span>
          <span class="time">Available</span>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section" id="contact">
      <h2>CONTACT</h2>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <span class="icon"><i class="fas fa-envelope"></i></span>
            <p>support@ecommerce.com</p>
          </div>
          <div class="contact-item">
            <span class="icon"><i class="fas fa-phone"></i></span>
            <p>+886-2-XXXX-XXXX</p>
          </div>
          <div class="contact-item">
            <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
            <p>Taipei, Taiwan</p>
          </div>
        </div>
        <div class="contact-map">
          <div class="map-placeholder"><i class="fas fa-map-marker-alt"></i> Location Map</div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="shop-footer">
      <p>&copy; 2025 Gazelle Design</p>
      <NuxtLink to="/" class="footer-link">← 返回首頁</NuxtLink>
    </footer>
  </div>
</template>

<style scoped>
  .shop-container {
    min-height: 100vh;
    background: linear-gradient(180deg, #f5f0e6 0%, #e8dcc8 50%, #d4c4a8 100%);
  }

  /* Navigation */
  .shop-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    position: sticky;
    top: 0;
    background: rgba(245, 240, 230, 0.95);
    border-bottom: 1px solid rgba(31, 27, 45, 0.08);
    z-index: 100;
  }

  .nav-brand {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #1f1b2d;
  }

  .nav-menu {
    display: flex;
    gap: 32px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-menu a {
    font-size: 12px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #6b4f3b;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .nav-menu a:hover {
    color: #b27936;
  }

  /* Hero Section */
  .hero-section {
    padding: 60px 40px;
    text-align: center;
  }

  .hero-title h2 {
    font-size: 48px;
    margin: 0 0 8px;
    color: #1f1b2d;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 14px;
    color: #9a7c5a;
    margin: 0 0 40px;
    letter-spacing: 1px;
  }

  .hero-showcase {
    display: flex;
    justify-content: center;
  }

  .lightbox-carousel {
    position: relative;
    width: min(760px, 90vw);
    height: 360px;
    border-radius: 28px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(12px);
    box-shadow: 0 16px 40px rgba(31, 27, 45, 0.15);
  }

  .lightbox-slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transform: scale(1.02);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .lightbox-slide.active {
    opacity: 1;
    transform: scale(1);
  }

  .lightbox-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(31, 27, 45, 0.05), rgba(31, 27, 45, 0.25));
  }

  .lightbox-content {
    position: absolute;
    inset: auto 32px 32px;
    color: #ffffff;
    text-align: left;
    max-width: 70%;
    text-shadow: 0 12px 24px rgba(31, 27, 45, 0.45);
  }

  .lightbox-eyebrow {
    display: inline-block;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.85;
  }

  .lightbox-content h3 {
    margin: 12px 0 8px;
    font-size: 28px;
  }

  .lightbox-content p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
  }

  .lightbox-indicators {
    position: absolute;
    bottom: 20px;
    right: 24px;
    display: flex;
    gap: 8px;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
  }

  .indicator.active {
    background: #ff9f4a;
    box-shadow: 0 0 12px rgba(255, 159, 74, 0.6);
  }

  /* Navigation Highlights */
  .nav-highlights {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 40px;
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
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #b27936;
  }

  /* Introduce Section */
  .introduce-section {
    padding: 60px 40px;
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.3);
  }

  .introduce-section h2 {
    text-align: center;
    font-size: 32px;
    margin: 0 0 40px;
    color: #1f1b2d;
    letter-spacing: 1px;
  }

  .intro-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
  }

  .intro-card {
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(31, 27, 45, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .intro-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(31, 27, 45, 0.12);
  }

  .intro-card h3 {
    margin: 0 0 16px;
    font-size: 20px;
    font-weight: 700;
    color: #1f1b2d;
    letter-spacing: 0.5px;
  }

  .intro-card p {
    font-size: 13px;
    line-height: 1.8;
    color: #6b4f3b;
    margin: 0 0 12px;
  }

  .intro-card p:last-child {
    margin-bottom: 0;
  }

  /* Products Section */
  .products-section {
    padding: 60px 40px;
    background: rgba(212, 196, 168, 0.3);
  }

  .products-section h2 {
    text-align: center;
    font-size: 32px;
    margin: 0 0 40px;
    color: #1f1b2d;
    letter-spacing: 1px;
  }

  .products-showcase {
    max-width: 1200px;
    margin: 0 auto;
  }

  .product-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .product-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(31, 27, 45, 0.06);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(31, 27, 45, 0.12);
  }

  .product-image {
    font-size: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    margin-bottom: 12px;
    color: #b27936;
  }

  .product-name {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    color: #1f1b2d;
  }

  .product-price {
    margin: 0;
    font-size: 11px;
    color: #9a7c5a;
  }

  /* Services Section */
  .services-section {
    padding: 60px 40px;
    background: rgba(245, 240, 230, 0.5);
  }

  .services-section h2 {
    text-align: center;
    font-size: 32px;
    margin: 0 0 40px;
    color: #1f1b2d;
    letter-spacing: 1px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .service-card {
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 6px 24px rgba(31, 27, 45, 0.08);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .service-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(31, 27, 45, 0.15);
  }

  .service-icon {
    font-size: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    margin-bottom: 20px;
    color: #ff9f4a;
  }

  .service-name {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 700;
    color: #1f1b2d;
  }

  .service-price {
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 600;
    color: #b27936;
  }

  .service-desc {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    color: #6b4f3b;
  }

  /* Business Section */
  .business-section {
    padding: 60px 40px;
  }

  .business-section h2 {
    text-align: center;
    font-size: 32px;
    margin: 0 0 40px;
    color: #1f1b2d;
    letter-spacing: 1px;
  }

  .business-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .business-item {
    background: white;
    padding: 24px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(31, 27, 45, 0.06);
  }

  .business-item .label {
    display: block;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #b27936;
    margin-bottom: 8px;
  }

  .business-item .time {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #1f1b2d;
  }

  /* Contact Section */
  .contact-section {
    padding: 60px 40px;
    background: rgba(212, 196, 168, 0.3);
  }

  .contact-section h2 {
    text-align: center;
    font-size: 32px;
    margin: 0 0 40px;
    color: #1f1b2d;
    letter-spacing: 1px;
  }

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    max-width: 1000px;
    margin: 0 auto;
    align-items: center;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .contact-item .icon {
    font-size: 32px;
    color: #b27936;
  }

  .contact-item p {
    margin: 0;
    font-size: 14px;
    color: #6b4f3b;
  }

  .contact-map {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(31, 27, 45, 0.06);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }

  .map-placeholder {
    font-size: 24px;
    color: #9a7c5a;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Footer */
  .shop-footer {
    padding: 40px;
    text-align: center;
    border-top: 1px solid rgba(31, 27, 45, 0.08);
    background: rgba(245, 240, 230, 0.8);
  }

  .shop-footer p {
    margin: 0 0 16px;
    font-size: 12px;
    color: #9a7c5a;
  }

  .footer-link {
    display: inline-block;
    color: #b27936;
    text-decoration: none;
    font-weight: 600;
    font-size: 13px;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #ff9f4a;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .shop-nav {
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }

    .nav-menu {
      gap: 16px;
      flex-wrap: wrap;
    }

    .hero-section {
      padding: 40px 16px;
    }

    .hero-title h2 {
      font-size: 32px;
    }

    .lightbox-carousel {
      height: 260px;
      border-radius: 20px;
    }

    .lightbox-content {
      inset: auto 20px 20px;
      max-width: 85%;
    }

    .lightbox-content h3 {
      font-size: 20px;
    }

    .nav-highlights {
      gap: 20px;
      padding: 20px;
    }

    .introduce-section {
      padding: 40px 16px;
    }

    .intro-content {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .intro-card {
      padding: 24px;
    }

    .intro-card h3 {
      font-size: 18px;
    }

    .products-section {
      padding: 40px 16px;
    }

    .product-row {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .services-section {
      padding: 40px 16px;
    }

    .services-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .service-card {
      padding: 24px;
    }

    .contact-content {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .business-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({
  layout: 'shop',
})

const heroSlides = [
  {
    id: 'hero-01',
    eyebrow: 'Featured Flow',
    title: '沉浸式購物導覽',
    description: '以燈箱式大圖傳達視覺節奏，凸顯品牌溫度與商品亮點。',
    background: 'linear-gradient(120deg, rgba(31, 27, 45, 0.15), rgba(31, 27, 45, 0.45)), url("https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=1400&q=80")',
  },
  {
    id: 'hero-02',
    eyebrow: 'Conversion Focus',
    title: '促銷節點聚焦',
    description: '以高對比主視覺鎖定限時優惠，帶動關鍵轉換行為。',
    background: 'linear-gradient(120deg, rgba(31, 27, 45, 0.1), rgba(31, 27, 45, 0.5)), url("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80")',
  },
  {
    id: 'hero-03',
    eyebrow: 'Trust & Delivery',
    title: '物流與信任感視覺化',
    description: '以安心色調與柔焦質感呈現配送效率與服務可靠度。',
    background: 'linear-gradient(120deg, rgba(31, 27, 45, 0.12), rgba(31, 27, 45, 0.4)), url("https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1400&q=80")',
  },
]

const activeSlideIndex = ref(0)
const isCarouselPaused = ref(!1)
let heroTimer: number | null = null

const startHeroCarousel = () => {
  if (heroTimer !== null) return
  heroTimer = window.setInterval(() => {
    if (isCarouselPaused.value) return
    activeSlideIndex.value = (activeSlideIndex.value + 1) % heroSlides.length
  }, 5000)
}

const stopHeroCarousel = () => {
  if (heroTimer === null) return
  window.clearInterval(heroTimer)
  heroTimer = null
}

onMounted(() => {
  startHeroCarousel()
})

onUnmounted(() => {
  stopHeroCarousel()
})

const productRows = [
  [
    { id: 'prod-01', name: '晨霧針織外套', price: 'NT$ 2,380', icon: 'fas fa-image' },
    { id: 'prod-02', name: '金箔標籤提袋', price: 'NT$ 680', icon: 'fas fa-tag' },
    { id: 'prod-03', name: '石墨旅行收納盒', price: 'NT$ 1,120', icon: 'fas fa-box' },
    { id: 'prod-04', name: '星際光澤運動鞋', price: 'NT$ 3,260', icon: 'fas fa-star' },
    { id: 'prod-05', name: '夜曲鈴音提示燈', price: 'NT$ 860', icon: 'fas fa-bell' },
    { id: 'prod-06', name: '琥珀香氛蠟燭', price: 'NT$ 520', icon: 'fas fa-heart' },
  ],
  [
    { id: 'prod-07', name: '霧黑手感購物袋', price: 'NT$ 450', icon: 'fas fa-shopping-cart' },
    { id: 'prod-08', name: '秘境折扣禮包', price: 'NT$ 1,480', icon: 'fas fa-money-bill-wave' },
    { id: 'prod-09', name: '流線物流服務包', price: 'NT$ 980', icon: 'fas fa-truck' },
    { id: 'prod-10', name: '雲端分期方案', price: 'NT$ 2,960', icon: 'fas fa-credit-card' },
    { id: 'prod-11', name: '訂單追蹤儀表板', price: 'NT$ 1,260', icon: 'fas fa-clipboard' },
    { id: 'prod-12', name: '會員專屬入會禮', price: 'NT$ 320', icon: 'fas fa-user' },
  ],
]

const servicesData = [
  { 
    id: 'service-01', 
    name: '即時客服服務', 
    icon: 'fas fa-phone',
    description: '24/7 全天候專業客服團隊，即時解決您的購物疑問。'
  },
  { 
    id: 'service-02', 
    name: '退換貨保障', 
    icon: 'fas fa-undo',
    description: '30 天無條件退換貨，讓您安心購物無負擔。'
  },
  { 
    id: 'service-03', 
    name: '節慶禮物包裝',
    icon: 'fas fa-gift',
    description: '精美禮盒包裝服務，為您的心意增添溫度。'
  },
]
</script>
