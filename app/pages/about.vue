<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Hero Section -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-6 py-16 text-center">
        <div class="mb-6">
          <h1 class="text-5xl font-bold text-gray-900 mb-4">林洧</h1>
          <p class="text-xl text-gray-600 mb-2">前端工程師</p>
          <p class="text-base text-gray-500 max-w-2xl mx-auto">以工程實作為核心，具備高度自學能力與跨領域吸收能力</p>
        </div>
        <div class="flex justify-center gap-4 mt-8">
          <a href="https://github.com/gaze9999/" target="_blank" class="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <NuxtLink to="/projects" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            查看專案
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Skills Section -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">技術專長</h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Frontend -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
            <i class="fas fa-code"></i>
            Frontend
          </h3>
          <div class="space-y-3">
            <div v-for="skill in skillCategories.frontend" :key="skill.name" class="flex items-center gap-3">
              <i :class="skill.icon" class="text-2xl" :style="{ color: skill.color }"></i>
              <span class="text-sm text-gray-700">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Backend & Data -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
            <i class="fas fa-database"></i>
            Backend & Data
          </h3>
          <div class="space-y-3">
            <div v-for="skill in skillCategories.backend" :key="skill.name" class="flex items-center gap-3">
              <i :class="skill.icon" class="text-2xl" :style="{ color: skill.color }"></i>
              <span class="text-sm text-gray-700">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Design & Creative -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-purple-600 mb-4 flex items-center gap-2">
            <i class="fas fa-palette"></i>
            Design & Creative
          </h3>
          <div class="space-y-3">
            <div v-for="skill in skillCategories.design" :key="skill.name" class="flex items-center gap-3">
              <i :class="skill.icon" class="text-2xl" :style="{ color: skill.color }"></i>
              <span class="text-sm text-gray-700">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Tools & Others -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-orange-600 mb-4 flex items-center gap-2">
            <i class="fas fa-tools"></i>
            Tools & Others
          </h3>
          <div class="space-y-3">
            <div v-for="skill in skillCategories.tools" :key="skill.name" class="flex items-center gap-3">
              <i :class="skill.icon" class="text-2xl" :style="{ color: skill.color }"></i>
              <span class="text-sm text-gray-700">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Me Section -->
    <section class="max-w-5xl mx-auto px-6 py-16">
      <div class="space-y-12">
        <!-- Core Introduction -->
        <article class="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i class="fas fa-user-circle text-blue-600"></i>
            核心定位
          </h2>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              您好，我是<strong class="text-gray-900">林洧</strong>。我是一名以工程實作為核心、同時具備高度自學能力與跨領域吸收能力的前端工程師。對我而言，學習並非單點技能的累積，而是透過理解底層原理、反覆實作與跨技術對照，逐步建立可遷移、可延展的知識結構。這樣的學習方式，使我能在不同技術、框架與領域之間快速轉換，同時保持足夠的深度。
            </p>
            <p>
              我對<strong class="text-gray-900">遊戲、互動式內容與數位產品</strong>始終抱持高度興趣，也正是這份動機，引導我從創作端走向工程端，並一路延伸至系統架構、資料處理與 AI 應用層面。
            </p>
          </div>
        </article>

        <!-- Early Journey -->
        <article class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i class="fas fa-seedling text-green-600"></i>
            從創作導向到工程基礎的累積
          </h2>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              在早期的自學階段，我以 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-600">Python</code> 作為程式設計入門語言，培養基礎邏輯與資料處理能力；同時接觸 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-purple-600">Blender</code> 進行 3D 建模、使用 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-600">Photoshop</code> 製作視覺素材，並透過 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-orange-600">FL Studio</code> 嘗試音樂製作。這段期間讓我建立對「產品不是單一技術，而是多個系統整合」的直覺理解，也形塑了我後續在工程上特別重視結構與整體性的思考方式。
            </p>
            <p>
              為了補齊設計與使用者體驗的系統性知識，我進一步參加<strong class="text-gray-900">資策會 UI／UX 設計課程</strong>，學習 UI／UX 設計流程、工具操作與使用者導向的分析方法，並在課程中接觸 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-indigo-600">PHP</code> 與資料庫操作，逐步建立對前後端分工與資料流動的整體輪廓。
            </p>
          </div>
        </article>

        <!-- Professional Development -->
        <article class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i class="fas fa-chart-line text-blue-600"></i>
            專業化發展與工程深度的建立
          </h2>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              進入職場後，我逐步將重心放在前端工程的專業深化。初期以 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-red-600">Angular</code> 為主要技術棧，從功能實作、元件拆分與樣式模組化開始，逐漸深入至專案架構、套件管理與工程流程。
            </p>
            <p>
              在實務中，我曾主導並實際執行 <strong class="text-gray-900">Angular 版本升級專案</strong>，將既有系統由舊版升級至較新版本，負責升級風險評估、相依套件盤點與分階段調整。這段經驗使我不再只關注「功能是否完成」，而是更重視長期可維護性、架構穩定度與升級策略。
            </p>
            <p>
              同時，我持續深化對<strong class="text-gray-900">原生 JavaScript</strong> 的理解，熟悉 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-yellow-600">ES2022</code> 以後的語言特性，並刻意避免過度依賴框架語法糖，確保在不同技術環境下仍能保持判斷力。
            </p>
          </div>
        </article>

        <!-- Recent Experience -->
        <article class="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i class="fas fa-rocket text-green-600"></i>
            近年經歷：深度與廣度並進
          </h2>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              近年來，我主要參與<strong class="text-gray-900">企業級 ERP 管理平台、金融官網（SSR）與公共服務系統</strong>的前端開發與重構，技術層面涵蓋 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-red-600">Angular 18–19</code>、<code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-600">SSR</code>、微架構設計與效能調校。
            </p>
            <p>
              在大型系統中，我導入 <strong class="text-gray-900">Angular Signals</strong> 重構資料流，並以單向資料流與細粒度依賴追蹤為核心，將 UI、狀態管理與資料轉換清楚拆分；同時，我亦熟悉 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-green-600">Vue 3 Composition API</code>，能以相同的心智模型理解不同框架，確保資料流設計在跨技術選型下仍具一致性。
            </p>
            <p>
              在效能與體驗層面，我實際參與 <strong class="text-gray-900">SSR 架構重構</strong>，處理首屏渲染、Hydration、版面穩定性與互動回應，並以 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-orange-600">Lighthouse</code> 與 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-purple-600">Chrome DevTools</code> 指標（FCP、LCP、CLS、INP）作為量化依據，而非僅憑感覺調整。
            </p>
          </div>
        </article>

        <!-- Extended Learning -->
        <article class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i class="fas fa-brain text-purple-600"></i>
            學習廣度的延伸：資料、AI 與跨技術整合
          </h2>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              在專業工程之外，我持續擴展學習範圍。業餘時間以 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-600">Python</code> 撰寫爬蟲進行資料蒐集，並以 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-cyan-600">Golang</code> 進行資料清洗、格式正規化與結構化處理，搭配 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-700">PostgreSQL</code> 儲存資料，完整實作從資料來源到前端呈現的流程。
            </p>
            <p>
              前端呈現上，我亦持續學習 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-green-600">Vue</code>、<code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-600">React</code> 與 <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-500">React Native</code>，並將其視為不同設計哲學的對照工具，而非單純技能清單。此外，我也實際導入<strong class="text-gray-900">生成式 AI（如 ChatGPT API）</strong>於專案與 Side Project 中，用於智慧化功能與工程輔助，並以工程判斷確保品質與可維護性。
            </p>
          </div>
        </article>

        <!-- Future Vision -->
        <article class="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-orange-600">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i class="fas fa-compass text-orange-600"></i>
            學習觀點與未來方向
          </h2>
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              回顧至今，我的學習路徑並非線性，而是透過不斷擴展廣度、再回頭加深深度的方式前進。這使我能在面對新技術或陌生領域時，快速建立理解框架，同時保有足夠的專業深度。
            </p>
            <p>
              未來，我希望能在日本不論是投入 <strong class="text-gray-900">IT 產業</strong>深化大型系統與架構能力，或進入<strong class="text-gray-900">遊戲產業</strong>完整理解遊戲製作流程、AI 技術與產品生命週期，都願意長期投入學習與實作。對我而言，<strong class="text-gray-900">持續學習本身，就是我作為工程師與創作者最核心的價值</strong>。
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- Projects Overview -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">作品集專案</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="project in projects" :key="project.to" :to="project.to" 
          class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 hover:border-blue-200">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" :class="project.bgColor">
              <i :class="project.icon" style="color: inherit;"></i>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                {{ project.title }}
              </h3>
              <p class="text-sm text-gray-600">{{ project.desc }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-12">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <p class="text-sm">© 2020-{{ new Date().getFullYear() }} 林洧. All rights reserved.</p>
        <p class="text-xs mt-2">Built with Nuxt 4 & Tailwind CSS</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Skill {
  name: string
  icon: string
  color: string
}

interface SkillCategories {
  frontend: Skill[]
  backend: Skill[]
  design: Skill[]
  tools: Skill[]
}

const skillCategories: SkillCategories = {
  frontend: [
    { name: 'Angular ~19', icon: 'fab fa-angular', color: '#DD0031' },
    { name: 'Vue 3', icon: 'fab fa-vuejs', color: '#42b883' },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'TypeScript', icon: 'fas fa-code', color: '#3178C6' },
    { name: 'JavaScript ES2022+', icon: 'fab fa-js-square', color: '#F7DF1E' },
    { name: 'HTML5 / CSS3', icon: 'fab fa-html5', color: '#E34F26' },
  ],
  backend: [
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
    { name: 'Golang', icon: 'fab fa-golang', color: '#00ADD8' },
    { name: 'PostgreSQL', icon: 'fas fa-database', color: '#336791' },
    { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
  ],
  design: [
    { name: 'UI/UX Design', icon: 'fas fa-pencil-ruler', color: '#FF6B6B' },
    { name: 'Photoshop', icon: 'fas fa-images', color: '#31A8FF' },
    { name: 'Blender 3D', icon: 'fas fa-cube', color: '#F5792A' },
    { name: 'FL Studio', icon: 'fas fa-music', color: '#F87C25' },
  ],
  tools: [
    { name: 'Git', icon: 'fab fa-git-square', color: '#F05032' },
    { name: 'SSR / Hydration', icon: 'fas fa-server', color: '#68A063' },
    { name: 'Lighthouse', icon: 'fas fa-tachometer-alt', color: '#F44B21' },
    { name: 'AI / ChatGPT API', icon: 'fas fa-brain', color: '#10A37F' },
  ],
}

const projects = [
  { title: '購物網站', desc: 'E-Commerce 前台展示', to: '/projects/shop', icon: 'fas fa-shopping-bag', bgColor: 'bg-blue-50' },
  { title: '購物後台', desc: 'ERP 後台管理系統', to: '/projects/shop-admin', icon: 'fas fa-sliders-h', bgColor: 'bg-purple-50' },
  { title: 'Python 爬蟲', desc: '展覽資料抓取展示', to: '/projects/python-scraper', icon: 'fab fa-python', bgColor: 'bg-green-50' },
  { title: '審計系統', desc: '企業內控稽核管理', to: '/projects/audit', icon: 'fas fa-chart-bar', bgColor: 'bg-orange-50' },
  { title: '新聞系統', desc: 'FFXIV 新聞抓取', to: '/projects/news', icon: 'fas fa-newspaper', bgColor: 'bg-red-50' },
  { title: 'YouTube 電視牆', desc: '影片嵌入展示', to: '/projects/youtube', icon: 'fas fa-tv', bgColor: 'bg-pink-50' },
]
</script>
