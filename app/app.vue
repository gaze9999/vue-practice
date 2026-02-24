<template>
  <div class="app">
    <header class="site-header">
      <h1 class="brand">作品展示集</h1>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link" active-class="active"> 首頁 </NuxtLink>
        <NuxtLink to="/shop/admin" class="nav-link" active-class="active"> 購物後台 </NuxtLink>
        <NuxtLink to="/projects/python-scraper" class="nav-link" active-class="active">
          Python 爬蟲
        </NuxtLink>
        <NuxtLink to="/projects/shop" class="nav-link" active-class="active"> 購物網站 </NuxtLink>
        <NuxtLink to="/projects/news" class="nav-link" active-class="active"> 每日新聞 </NuxtLink>
        <NuxtLink to="/projects/youtube" class="nav-link" active-class="active">
          YouTube 內嵌
        </NuxtLink>
        <NuxtLink to="/about" class="nav-link" active-class="active"> 關於 </NuxtLink>
      </nav>
    </header>

    <main class="page">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>

    <footer class="site-footer">
      <p>&copy; 2025 Portfolio Showcase. Built with Nuxt 3 and Vue 3.</p>
    </footer>
  </div>
</template>

<style scoped>
  :root {
    color-scheme: light;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f5f0 0%, #f0f7ff 60%, #f4fff8 100%);
    color: #1e2330;
    font-family: 'Avenir Next', 'Segoe UI', sans-serif;
  }

  .site-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px;
    border-bottom: 1px solid rgba(30, 35, 48, 0.08);
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
  }

  .brand {
    margin: 0;
    font-size: 20px;
    letter-spacing: 0.4px;
  }

  .nav {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
  }

  .nav-link {
    padding: 6px 12px;
    border-radius: 6px;
    text-decoration: none;
    color: inherit;
    font-weight: 600;
    font-size: 13px;
    background: rgba(30, 35, 48, 0.06);
    transition:
      transform 120ms ease,
      background 120ms ease;
    white-space: nowrap;
  }

  .nav-link:hover,
  .nav-link.active {
    transform: translateY(-1px);
    background: rgba(30, 35, 48, 0.12);
  }

  .nav-link.active {
    background: rgba(102, 126, 234, 0.15);
    color: #667eea;
  }

  .page {
    padding: 40px 32px;
    flex: 1;
  }

  .site-footer {
    text-align: center;
    padding: 24px 32px;
    border-top: 1px solid rgba(30, 35, 48, 0.08);
    background: rgba(255, 255, 255, 0.7);
    color: rgba(30, 35, 48, 0.6);
    font-size: 14px;
  }

  .app {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 720px) {
    .site-header {
      flex-direction: column;
      gap: 12px;
    }
  }
</style>
