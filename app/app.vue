<template>
  <div class="app">
    <header class="site-header">
      <h1 class="brand">作品展示集</h1>
      <div class="header-actions">
        <nav class="nav">
          <NuxtLink to="/"
                    class="nav-link"
                    active-class="active"> 首頁 </NuxtLink>
          <NuxtLink to="/projects/shop-admin"
                    class="nav-link"
                    active-class="active"> 購物後台 </NuxtLink>
          <NuxtLink to="/projects/shop"
                    class="nav-link"
                    active-class="active"> 購物網站 </NuxtLink>
          <NuxtLink to="/projects/python-scraper"
                    class="nav-link"
                    active-class="active"> Python 爬蟲 </NuxtLink>
          <NuxtLink to="/projects/news"
                    class="nav-link"
                    active-class="active"> 新聞收集 </NuxtLink>
          <NuxtLink to="/projects/youtube"
                    class="nav-link"
                    active-class="active"> YouTube 電視牆 </NuxtLink>
          <NuxtLink to="/projects/graphic-design"
                    class="nav-link"
                    active-class="active"> 圖形設計 </NuxtLink>
          <NuxtLink to="/projects/audit"
                    class="nav-link"
                    active-class="active"> 審計系統 </NuxtLink>
          <NuxtLink to="/contact"
                    class="nav-link"
                    active-class="active"> 聯絡 </NuxtLink>
          <NuxtLink to="/about"
                    class="nav-link"
                    active-class="active"> 關於 </NuxtLink>
        </nav>
        <button type="button" class="theme-toggle" @click="toggleTheme">
          <span class="toggle-indicator" :class="{ active: isDark }"></span>
          {{ isDark ? '切換淺色' : '切換深色' }}
        </button>
      </div>
    </header>

    <main class="page">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>

    <footer class="site-footer">
      <p>&copy; 2025 Gazelle Design. Built with Nuxt 3 and Vue 3.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(!1)
const isThemeReady = ref(!1)

const applyTheme = (dark: boolean) => {
  if (!import.meta.client) return
  const html = document.documentElement
  html.classList.toggle('dark-mode', dark)
  html.style.colorScheme = dark ? 'dark' : 'light'
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  isDark.value = stored === 'dark' ? !0 : !1
  applyTheme(isDark.value)
  isThemeReady.value = !0
})

watch(isDark, (value) => {
  if (!isThemeReady.value) return
  applyTheme(value)
})
</script>

<style>
:root {
  color-scheme: light;
}

.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f0e6 0%, #e8dcc8 50%, #d4c4a8 100%);
  color: #1f1b2d;
  font-family: 'Avenir Next', 'Segoe UI', sans-serif;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 0.0625rem solid #1f1b2d14;
  background: #f5f0e6e6;
  backdrop-filter: blur(0.5rem);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.brand {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: 0.025rem;
  color: #1f1b2d;
}

.nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 999rem;
  border: 0.0625rem solid #1f1b2d26;
  background: #ffffffe6;
  color: #1f1b2d;
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
  transition: transform 120ms ease, background 120ms ease;
  white-space: nowrap;
}

.theme-toggle:hover {
  transform: translateY(-0.0625rem);
  background: #ffffff;
}

.toggle-indicator {
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background: #ff9f4a;
  box-shadow: 0 0 0 0.125rem #ff9f4a33;
  transition: transform 120ms ease, background 120ms ease;
}

.toggle-indicator.active {
  background: #667eea;
  box-shadow: 0 0 0 0.125rem #667eea40;
}

.nav-link {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
  color: #6b4f3b;
  font-weight: 600;
  font-size: 0.8125rem;
  background: #b279361a;
  transition:
    transform 120ms ease,
    background 120ms ease;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active {
  transform: translateY(-0.0625rem);
  background: #b2793633;
}

.nav-link.active {
  background: #ff9f4a40;
  color: #b27936;
}

.page {
  padding: 2.5rem 2rem;
  flex: 1;
}

.site-footer {
  text-align: center;
  padding: 1.5rem 2rem;
  border-top: 0.0625rem solid #1f1b2d14;
  background: #f5f0e6cc;
  color: #9a7c5a;
  font-size: 0.875rem;
}

.dark-mode .app {
  background: linear-gradient(135deg, #0d0f1a 0%, #1a1d2e 50%, #0f1219 100%);
  color: #e6e9f2;
}

.dark-mode .site-header,
.dark-mode .site-footer {
  background: #1b1f32e6;
  border-color: #e6e9f226;
}

.dark-mode .brand {
  color: #e6e9f2;
}

.dark-mode .nav-link {
  background: #e6e9f21a;
  color: #cfd6e6;
}

.dark-mode .nav-link:hover,
.dark-mode .nav-link.active {
  background: #ff9f4a33;
  color: #ffb366;
}

.dark-mode .theme-toggle {
  background: #1b1f32e6;
  border-color: #e6e9f233;
  color: #e6e9f2;
}

.dark-mode .site-footer {
  color: #8c95a7;
}

.app {
  display: flex;
  flex-direction: column;
}

@media (max-width: 45rem) {
  .site-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  .header-actions {
    justify-content: center;
  }
}
</style>
