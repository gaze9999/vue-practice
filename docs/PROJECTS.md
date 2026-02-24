# 專案展示說明

本專案包含七個完整的示範應用，展示不同的業務場景、技術架構和最佳實踐。

## 📦 專案總覽

| 專案           | 路由                       | 分類     | 技術重點                  |
| -------------- | -------------------------- | -------- | ------------------------- |
| 購物網站系統   | `/projects/shop`           | 核心應用 | 狀態管理、購物流程        |
| 購物後台管理   | `/projects/shop-admin`     | 核心應用 | 模組化架構(DDD)、權限控制 |
| 圖形設計作品集 | `/projects/graphic-design` | 設計應用 | 作品展示、Lightbox、攝影  |
| Python 爬蟲    | `/projects/python-scraper` | 數據應用 | 大數據處理、動態篩選      |
| 審計系統       | `/projects/audit`          | 系統管理 | 事件追蹤、日誌聚合        |
| 新聞抓取       | `/projects/news`           | 其他示例 | API 整合、多語言          |
| YouTube 電視牆 | `/projects/youtube`        | 其他示例 | 媒體控制、LocalStorage    |

---

## 1. 購物網站系統 (E-commerce)

### 📍 路由
- 主頁面: `/projects/shop`

### 🎯 專案目標
展示完整的電商前台功能，包含商品瀏覽、購物車管理、結帳流程、會員系統。

### ✨ 核心功能
- **商品管理**: 商品列表、分類篩選、詳細資訊
- **購物車系統**: 加入購物車、數量調整、價格計算
- **結帳流程**: 訂單確認、付款方式、訂單追蹤
- **會員中心**: 個人資料、訂單記錄、收藏清單

### 🛠 技術實現
- **狀態管理**: Pinia stores (商品、購物車、用戶)
- **組件設計**: 可復用的商品卡片、購物車元件
- **路由**: 多層級路由結構
- **響應式**: 支援桌面和移動端

### 📂 檔案結構
```
app/pages/projects/shop/
├── index.vue           # 商城首頁
├── cart.vue            # 購物車
├── checkout.vue        # 結帳頁面
└── products/
    └── [id].vue        # 商品詳情
```

---

## 2. 購物後台管理系統 (Admin Panel)

### 📍 路由
- 主頁面: `/projects/shop-admin`
- 子模組:
  - 財務管理: `/projects/shop-admin/finance/vouchers`
  - 庫存管理: `/projects/shop-admin/inventory/adjustments`
  - 採購管理: `/projects/shop-admin/procurement/requests`
  - 銷售管道: `/projects/shop-admin/sales/pipeline`
  - 人資管理: `/projects/shop-admin/hr/recruitment`
  - 報表分析: `/projects/shop-admin/reports/schedule`

### 🎯 專案目標
展示企業級後台管理系統的完整架構，以電商營運為情境，整合多個業務模組。

### ✨ 核心功能

#### 財務管理 (Finance)
- 憑證管理 (2,400+ 筆 mock 資料)
- 分頁與篩選
- 銷售類型分類

#### 庫存管理 (Inventory)
- 庫存調整記錄 (1,200+ 筆)
- 調整類型: 入庫、出庫、盤點
- 狀態追蹤

#### 採購管理 (Procurement)
- 採購申請單 (1,500+ 筆)
- 審批流程
- 狀態管理: 待審核、已核准、已拒絕

#### 銷售管道 (Sales)
- 銷售機會追蹤 (1,300+ 筆)
- 階段管理: 潛在客戶、報價中、成交、失敗

#### 人資管理 (HR)
- 招募流程 (800+ 筆)
- 候選人狀態: 應徵中、面試中、錄取、未通過

#### 報表分析 (Reports)
- 排程報表 (1,000+ 筆)
- 數據視覺化
- 自定義篩選

### 🛠 技術實現
- **模組化架構**: DDD (Domain-Driven Design) 設計模式
- **數據層**: Mock data + Services 抽象層
- **狀態管理**: 各模組獨立 Pinia stores
- **權限控制**: 基於角色的訪問控制 (RBAC)
- **共享組件**: 表格、篩選器、分頁器

### 📂 檔案結構
```
app/
├── pages/projects/shop-admin/
│   ├── index.vue                      # 後台首頁
│   ├── finance/vouchers.vue           # 財務憑證
│   ├── inventory/adjustments.vue      # 庫存調整
│   ├── procurement/requests.vue       # 採購申請
│   ├── sales/pipeline.vue             # 銷售管道
│   ├── hr/recruitment.vue             # 人資招募
│   └── reports/schedule.vue           # 報表排程
│
├── modules/shop/                      # 業務模組
│   ├── types/                         # 類型定義
│   ├── services/                      # 業務服務
│   │   ├── financeService.ts
│   │   ├── inventoryService.ts
│   │   └── ...
│   ├── stores/                        # 狀態管理
│   │   ├── financeStore.ts
│   │   ├── inventoryStore.ts
│   │   └── ...
│   └── constants/                     # 業務常數
│
└── shared/mocks/shop-admin/           # Mock 資料
    ├── finance.ts                     # 2,400 筆
    ├── inventory.ts                   # 1,200 筆
    ├── procurement.ts                 # 1,500 筆
    ├── sales.ts                       # 1,300 筆
    ├── hr.ts                          # 800 筆
    └── reports.ts                     # 1,000 筆
```

### 🔑 關鍵學習點
1. **領域驅動設計**: 按業務領域劃分模組
2. **服務層抽象**: Services 作為 API 和 Store 之間的橋樑
3. **類型安全**: 完整的 TypeScript 類型定義
4. **可維護性**: 高內聚低耦合的模組設計

---

## 3. 圖形設計作品集 (Graphic Design Portfolio)

### 📍 路由
- 主頁面: `/projects/graphic-design`

### 🎯 專案目標
展示平面設計、視覺識別與網站設計的完整作品集，包含Lightbox全屏圖片查看、詳細作品說明與設計哲學。

### ✨ 核心功能
- **作品展示**:
  - 平面作品：鹿頭標誌、Buddha Machine、履歷設計 (3 件)
  - 網站設計：桌機版、行動版 (2 件)
- **互動功能**:
  - Lightbox 全版圖像顯示
  - 按鈕與鍵盤支援 (Escape 關閉)
  - 平滑動畫過場
- **設計說明**:
  - 工具使用 (Adobe Illustrator、InDesign、Figma 等)
  - 詳細創作敘述與理念
- **設計哲學**: 4 項核心原則
  - 視覺美學
  - 創意思考
  - 多平台適配
  - 目標導向

### 🛠 技術實現
- **圖片管理**: 專業資料夾結構 (`/public/assets/images/portfolio/`)
- **格式標準化**: PNG 統一格式，含高 DPI 變體 (@2x)
- **Lightbox 實現**: ref 控制、v-if 條件渲染、z-index 管理
- **鍵盤交互**: Escape 鍵盤事件監聽
- **響應式設計**: Grid auto-fit 適應不同屏幕
- **動畫**: Keyframe 淡入淡出與縮放效果

### 📂 檔案結構
```
app/pages/projects/graphic-design/
├── index.vue                          # 作品集主頁

public/assets/images/portfolio/
├── deer.png / deer2x.png             # 鹿頭標誌
├── buddha.png / buddha2x.png         # Buddha Machine
├── resume.png / resume2x.png         # 履歷設計
├── websitedesktop.png                # 桌機版設計
├── websitemobile.png                 # 行動版設計
└── vw1.svg                           # 向量圖 (SVG)
```

### 🎨 設計特色
- **暖色主題**: #f5f0e6 → #e8dcc8 → #d4c4a8 漸層背景
- **卡片設計**: 白色背景、圓角、懸停提升效果
- **排版**: 標題 + 圖片 + 說明 + 工具欄位

### 🔑 關鍵學習點
1. **Lightbox 交互**: 模態框實現與事件管理
2. **資產管理**: 專業化的媒體資料夾組織
3. **響應式圖片**: 多屏幕適配與高 DPI 支援
4. **動畫與過場**: CSS keyframe 和 Vue transition

---

## 4. Python 爬蟲 - 展覽數據 (Data Scraping)

### 📍 路由
- 主頁面: `/projects/python-scraper`

### 🎯 專案目標
展示從台灣國際禮品展（TGS 2025）爬取的真實展覽商資料，包含數據處理、篩選、排序功能。

### ✨ 核心功能
- **數據展示**: 2,617 筆展覽商資料
- **動態篩選**: 展示區域、國家、場地多重篩選
- **搜尋功能**: 全文搜尋（展覽商名稱、區域、場地）
- **排序功能**: 所有欄位可排序（升序/降序）
- **分頁系統**: 15 筆/頁，完整分頁控制
- **統計資訊**: 
  - 總展覽商數量
  - 國際展覽商數量
  - 展區數量
  - 場地數量
  - 處理記錄數

### 🛠 技術實現
- **數據來源**: JSON 格式的爬蟲資料 (`combined_db.json`)
- **數據轉換**: 統一欄位命名 (camelCase)
- **計算屬性**: Vue computed 實現動態篩選和排序
- **響應式設計**: 移動端隱藏非必要欄位
- **表格固定寬度**: 防止欄位寬度跳動

### 📊 資料結構
```typescript
interface ExhibitorItem {
  uid: string
  exhibitor: string      // 展覽商名稱
  area: string           // 展示區域
  boothNumber: string    // 攤位號碼
  country: string        // 國家
  location: string       // 場地位置
}
```

### 📂 檔案結構
```
app/
├── pages/projects/python-scraper/
│   └── index.vue                       # 主頁面 (667 行)
│
└── shared/mocks/python-scraper/
    ├── combined_db.json                # 原始數據 (2,617 筆)
    ├── combined_db.csv                 # CSV 格式
    └── index.ts                        # 數據轉換與導出
```

### 🎨 UI 特色
- **固定欄位寬度**: 30% / 20% / 15% / 15% / 20%
- **排序圖標**: ⇅ (未排序) / ↑ (升序) / ↓ (降序)
- **篩選下拉選單**: 自動生成唯一值列表
- **分頁控制**: 首頁、上一頁、下一頁、末頁
- **搜尋結果計數**: 動態顯示篩選後的數量

### 🔑 關鍵學習點
1. **大數據處理**: 處理數千筆數據的性能優化
2. **動態篩選**: 多重條件組合篩選
3. **排序算法**: 字串和數字混合排序
4. **響應式表格**: 固定寬度 + 文字換行

---

## 5. 審計與監控系統 (Audit System)

### 📍 路由
- 主頁面: `/projects/shop-admin/audit`

### 🎯 專案目標
展示企業級審計系統的完整功能，包含操作記錄、權限管理、系統日誌與合規報告。

### ✨ 核心功能
- **操作紀錄**: 用戶行為追蹤
- **權限管理**: 角色權限配置
- **系統日誌**: 錯誤和警告記錄
- **合規報告**: 審計報告生成

### 🛠 技術實現
- **事件追蹤**: 攔截器記錄所有 API 請求
- **日誌聚合**: 集中式日誌管理
- **權限驗證**: 基於角色的訪問控制

---

## 6. 每日新聞抓取範例 (News Feed)

### 📍 路由
- 主頁面: `/projects/news`

### 🎯 專案目標
展示新聞 API 整合，以 FFXIV Lodestone News 為例，實現多語言新聞聚合與服務狀態監控。

### ✨ 核心功能
- **新聞聚合**: FFXIV Topics 列表
- **多語言支援**: JP / EN / FR / DE 四種語言
- **服務監控**: 
  - Game Server 狀態
  - Lodestone 狀態
  - Companion App 狀態
  - Mog Station 狀態
  - PSN 狀態
- **維護資訊**: 顯示維護時間和描述

### 🛠 技術實現
- **API 整合**: Lodestone News API (`lodestonenews.com`)
- **Composables**: 
  - `useFFXIVNews.ts`: 數據獲取邏輯
  - `useFFXIVTopics()`: 新聞列表
  - `useFFXIVMaintenance()`: 維護資訊
- **類型定義**: `app/types/ffxiv.ts`
- **組件化**: 
  - `FFXIVTopics.vue`: 新聞卡片
  - `FFXIVMaintenance.vue`: 服務狀態

### 📂 檔案結構
```
app/
├── pages/projects/news/
│   ├── index.vue                       # 新聞首頁
│   └── components/
│       ├── FFXIVTopics.vue            # 新聞主題
│       └── FFXIVMaintenance.vue       # 維護資訊
│
├── types/
│   └── ffxiv.ts                        # FFXIV 類型定義
│
└── composables (news/)
    └── useFFXIVNews.ts                 # 新聞 API composable
```

### 🔑 關鍵學習點
1. **API 整合**: 第三方 API 調用與錯誤處理
2. **Composables 設計**: 可復用的數據獲取邏輯
3. **類型安全**: 完整的 API 響應類型定義
4. **多語言**: 動態切換語言內容

---

## 7. YouTube 電視牆展示 (Media Gallery)

### 📍 路由
- 主頁面: `/projects/youtube`

### 🎯 專案目標
展示嵌入式影音管理系統，支援多影片同時播放、控制與管理。

### ✨ 核心功能
- **影片管理**: 
  - 添加 YouTube 連結
  - 移除影片
  - 清空所有影片
- **播放控制**:
  - 全部播放/暫停
  - 全部靜音/取消靜音
  - 顯示/隱藏聊天室
- **URL 驗證**: 自動驗證 YouTube 連結格式
- **數據持久化**: LocalStorage 保存影片列表

### 🛠 技術實現
- **狀態管理**: Composable `useVideoStore.ts`
- **localStorage**: 影片列表持久化
- **YouTube API**: iframe 嵌入與控制
- **URL 解析**: 支援多種 YouTube URL 格式:
  - `youtube.com/watch?v=VIDEO_ID`
  - `youtu.be/VIDEO_ID`
  - `youtube.com/embed/VIDEO_ID`

### 📂 檔案結構
```
app/pages/projects/youtube/
├── index.vue                           # 主頁面
├── components/
│   ├── VideoFrame.vue                 # 影片框架組件
│   ├── InputBar.vue                   # 輸入欄組件
│   └── ControlBar.vue                 # 控制欄組件
│
└── composables/
    └── useVideoStore.ts                # 影片狀態管理
```

### 🎨 功能特色
- **響應式佈局**: Grid 自動調整影片數量
- **錯誤處理**: URL 格式驗證與錯誤提示
- **重複檢查**: 防止添加重複影片
- **本地儲存**: 頁面重載後保留影片列表

### 🔑 關鍵學習點
1. **Composables**: 狀態管理邏輯抽取
2. **LocalStorage**: 瀏覽器存儲 API 使用
3. **URL 解析**: 正則表達式提取 VIDEO_ID
4. **組件通信**: Props 和 Emits 模式

---

## 🎓 學習路徑建議

### 初學者
1. **YouTube 電視牆** - 最簡單，了解基本組件和狀態管理
2. **新聞抓取** - 學習 API 整合和 Composables
3. **購物網站** - 完整的前台功能實現
4. **圖形設計作品集** - Lightbox 交互、資產管理、響應式設計

### 中級開發者
5. **Python 爬蟲** - 大數據處理和複雜篩選
6. **購物後台管理** - 企業級架構和模組化設計

### 高級開發者
7. **審計系統** - 完整的企業級功能實現

---

## 📝 開發指南

### 添加新專案

1. 在 `app/pages/projects/` 創建新目錄
2. 在 `app/pages/projects/index.vue` 添加專案卡片
3. 如需專用 layout，在 `app/layouts/` 創建
4. 更新本文件 (PROJECTS.md)

### 專案命名規範

- 使用 kebab-case: `python-scraper`
- Layout 名稱對應: `python-scraper.vue`
- 路由路徑對應: `/projects/python-scraper`

### Mock 資料管理

- 集中放置於 `app/shared/mocks/`
- 按專案分類子目錄
- 通過 `index.ts` 統一導出

---

## 🔗 相關文件

- [README.md](./README.md) - 專案總覽與快速開始
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - 完整目錄結構
- [ARCHITECTURE.md](./app/ARCHITECTURE.md) - 架構設計文件
- [QUICKSTART.md](./app/QUICKSTART.md) - 快速開始指南
