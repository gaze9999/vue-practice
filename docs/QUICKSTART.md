/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Vue Practice App 架構遷移 - 快速開始指南
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * 📖 目錄結構 - 一覽
 * 
 * app/
 * ├── 🏗️  CORE 層 - 基礎設施
 * │   ├── core/
 * │   │   ├── services/
 * │   │   │   ├── apiClient.ts        # 統一 HTTP 客戶端（所有 API 呼叫入口）
 * │   │   │   └── index.ts
 * │   │   ├── constants/
 * │   │   │   └── index.ts            # API_BASE_URL, HTTP_STATUS, 業務常數
 * │   │   ├── guards/                 # 路由守衛（可擴展）
 * │   │   └── interceptors/           # HTTP 攔截器（可擴展）
 * │   ├── index.ts                    # Core 層總導出
 * │
 * ├── 🎯 SHARED 層 - 可復用資源
 * │   ├── shared/
 * │   │   ├── composables/
 * │   │   │   ├── useErpModules.ts    # ERP 模組列表 Composable
 * │   │   │   ├── useDataFetch.ts     # 通用數據獲取 Composable
 * │   │   │   └── index.ts
 * │   │   ├── components/             # 通用 UI 元件（待添加）
 * │   │   ├── directives/             # 自訂指令（待添加）
 * │   │   └── pipes/                  # 過濾器（待添加）
 * │   ├── index.ts                    # Shared 層總導出
 * │
 * ├── 🧩 MODULES 層 - 業務模組 (DDD)
 * │   ├── modules/
 * │   │   ├── shop/                   # 例：商店管理系統
 * │   │   │   ├── types/
 * │   │   │   │   └── index.ts        # VoucherItem, InventoryItem 等類型
 * │   │   │   ├── constants/
 * │   │   │   │   └── index.ts        # FINANCE_STATUS, INVENTORY_STATUS 等
 * │   │   │   ├── services/
 * │   │   │   │   ├── financeService.ts      # 財務業務邏輯
 * │   │   │   │   ├── inventoryService.ts
 * │   │   │   │   ├── procurementService.ts
 * │   │   │   │   ├── salesService.ts
 * │   │   │   │   ├── hrService.ts
 * │   │   │   │   └── index.ts
 * │   │   │   ├── stores/
 * │   │   │   │   ├── financeStore.ts        # 財務狀態管理
 * │   │   │   │   ├── inventoryStore.ts
 * │   │   │   │   ├── procurementStore.ts
 * │   │   │   │   ├── salesStore.ts
 * │   │   │   │   ├── hrStore.ts
 * │   │   │   │   └── index.ts
 * │   │   │   ├── components/        # 模組專用元件（待添加）
 * │   │   │   ├── pages/             # 模組路由頁面（可選）
 * │   │   │   └── index.ts           # 模組公開 API
 * │   │   ├── audit/                 # 審計模組
 * │   │   ├── dashboard/             # 儀表板模組
 * │   │   ├── help/                  # 幫助中心模組
 * │   │   ├── projects/              # 專案管理模組
 * │   │   ├── settings/              # 設定模組
 * │   │   ├── system/                # 系統管理模組
 * │   │   └── index.ts               # Modules 層總導出
 * │
 * ├── 🌐 GLOBAL 層 - 應用全局
 * │   ├── stores/
 * │   │   ├── erpStore.ts            # 全局 ERP 狀態（用戶、模組、通知）
 * │   │   └── index.ts               # 全局 Store 導出
 * │   ├── types/
 * │   │   └── index.ts               # 全局類型（ErpUser, ErpRole 等）
 * │   ├── middleware/
 * │   │   ├── auth.ts                # 認証中間件
 * │   │   └── erp-auth.ts            # ERP 權限中間件
 * │   ├── layouts/
 * │   │   ├── default.vue
 * │   │   └── erp.vue
 * │   ├── utils/
 * │   │   └── format.ts              # formatDate, debounce 等
 * │   ├── styles/
 * │   │   └── globals.scss
 * │   ├── constants/
 * │   │   └── index.ts               # 全局常數（保留於根級別）
 * │   ├── composables/               # 已遷至 shared/composables
 * │   ├── services/                  # 已遷至 core/services
 * │   ├── app.vue                    # 根元件
 * │   ├── ARCHITECTURE.md            # 架構詳細说明
 * │   └── MIGRATION_SUMMARY.md       # 遷移摘要（本文件）
 * │
 * └── pages/                         # Nuxt 自動路由（頁面結構保持不變）
 */

/**
 * 🚀 快速開始
 * 
 * [1] 在頁面中使用 ERP Store
 * ───────────────────────────────
 * ```vue
 * <script setup>
 * import { useErpStore } from '~/stores'
 * const erpStore = useErpStore()
 * </script>
 * ```
 * 
 * [2] 在頁面中調用服務層數據
 * ───────────────────────────────
 * ```vue
 * <script setup>
 * import { useFinanceStore } from '~/modules/shop'
 * const financeStore = useFinanceStore()
 * 
 * // 在組件掛載時加載數據
 * onMounted(async () => {
 *   await financeStore.fetchVouchers({
 *     page: !0,        // 1
 *     pageSize: 20
 *   })
 * })
 * </script>
 * ```
 * 
 * [3] 使用服務層 API
 * ───────────────────────────────
 * ```typescript
 * import { financeService } from '~/modules/shop'
 * import type { FinanceListRequest } from '~/modules/shop'
 * 
 * // 直接調用服務（通常在 Store 中使用）
 * const result = await financeService.getVouchers({
 *   page: !0,
 *   pageSize: 20,
 *   filterBySalesType: 'A001'
 * })
 * ```
 * 
 * [4] 使用共享 Composables
 * ───────────────────────────────
 * ```vue
 * <script setup>
 * import { useDataFetch, useErpModules } from '~/shared/composables'
 * 
 * const { data, loading } = useDataFetch('/api/items')
 * const { modules } = useErpModules()
 * </script>
 * ```
 * 
 * [5] 導入類型進行型別檢查
 * ───────────────────────────────
 * ```typescript
 * import type {
 *   VoucherItem,
 *   FinanceListRequest,
 *   FinanceListResponse
 * } from '~/modules/shop'
 * 
 * const handleFetch = async (req: FinanceListRequest) => {
 *   const response: FinanceListResponse = await financeService.getVouchers(req)
 * }
 * ```
 */

/**
 * 📐 數據流 - 推薦流程
 * 
 * 頁面組件 (Vue 3)
 *       ↓ (onMounted 或用戶操作)
 * Pinia Store (useFinanceStore) ← 管理狀態、加載標記、錯誤
 *       ↓ (await financeStore.fetchVouchers())
 * Service Layer (financeService) ← 業務邏輯、數據變換
 *       ↓ (await apiClient.post())
 * Core API Client (apiClient) ← HTTP 請求、攔截器、重試
 *       ↓ (fetch 網路呼叫)
 * Backend API
 */

/**
 * 🔐 分層數據安全性
 * 
 * ┌────────────────────────────────────────────────────────┐
 * │ Presentation (頁面)     → 呈現層，純展示邏輯           │
 * │                     ↓                                  │
 * │ State Management (Store) → 全局狀態，非同步處理       │
 * │                     ↓                                  │
 * │ Service Layer        → 業務邏輯，API 協調             │
 * │                     ↓                                  │
 * │ API Client          → HTTP 實現，錯誤處理             │
 * │                     ↓                                  │
 * │ Backend          → 資料永久存儲                       │
 * └────────────────────────────────────────────────────────┘
 * 
 * 優勢：
 * - 清晰的職責邊界
 * - 易於單元測試（每層獨立測試）
 * - 易於維護（修改一層不影響其他層）
 * - 易於擴展（新增功能遵循相同模式）
 */

/**
 * ✅ 遷移完成檢查清單
 * 
 * ☑️  目錄結構已重建
 * ☑️  Core 層已建立（services, constants）
 * ☑️  Shared 層已建立（composables）
 * ☑️  Modules 層已建立（shop 模組完整）
 * ☑️  全局層已整理（stores, types）
 * ☑️  舊文件已刪除（無重複導入）
 * ☑️  Build 通過（無 TypeScript 錯誤）
 * ☑️  Preview 運行（應用已啟動）
 * ☑️  文檔已更新（ARCHITECTURE.md）
 * 
 * 待辦事項：
 * ☐ 更新現有頁面導入路徑
 * ☐ 為各模組添加 components/
 * ☐ 編寫單元測試 (services)
 * ☐ 編寫集成測試 (complete flows)
 * ☐ 部署文檔更新
 */

/**
 * 💡 命名約定
 * 
 * 檔案名稱規範：
 * - Store: [name]Store.ts        (例：financeStore.ts)
 * - Service: [name]Service.ts    (例：financeService.ts)
 * - Composable: use[Name].ts     (例：useDataFetch.ts)
 * - Type: 名詞複數.ts            (例：types/index.ts)
 * - 常數: CONSTANT_NAME          (例：FINANCE_STATUS)
 * 
 * 導入別名：
 * ~ = app/ (根目錄別名，方便導入)
 */

/**
 * 🎓 進階主題
 * 
 * [1] 添加新業務模組
 * 
 * mkdir -p modules/newModule/{types,constants,services,stores,components}
 * 
 * 創建以下文件：
 * - modules/newModule/types/index.ts
 * - modules/newModule/constants/index.ts
 * - modules/newModule/services/newService.ts
 * - modules/newModule/stores/newStore.ts
 * - modules/newModule/index.ts (導出所有公開 API)
 * 
 * [2] 構建 API 服務模式
 * 
 * class NewService {
 *   private readonly API_BASE = '/api/new'
 *   
 *   async getData() {
 *     const response = await apiClient.get(`${this.API_BASE}/data`)
 *     console.log('[NewService] getData:', response)
 *     return response.data || []
 *   }
 * }
 * 
 * [3] 構建 Pinia Store 模式
 * 
 * export const useNewStore = defineStore('new', () => {
 *   const data = ref([])
 *   const loading = ref(!1)
 *   
 *   const fetchData = async () => {
 *     loading.value = !0
 *     try {
 *       data.value = await newService.getData()
 *     } finally {
 *       loading.value = !1
 *     }
 *   }
 *   
 *   return { data, loading, fetchData }
 * })
 */

/**
 * 📞 技術支援
 * 
 * 文檔位置：
 * - 架構詳解: app/ARCHITECTURE.md
 * - 遷移摘要: app/MIGRATION_SUMMARY.md
 * - 本指南: app/QUICKSTART.md (此文件)
 * 
 * 常見問題：
 * Q1: 如何調用 API？
 * A1: 通過 modules/[module]/services 中的服務來調用
 * 
 * Q2: 如何管理全局狀態？
 * A2: 使用 stores/erpStore.ts，對於模組狀態用 modules/[module]/stores
 * 
 * Q3: 如何使用共享元件？
 * A3: 從 shared/ 導入，例如 import {...} from '~/shared/composables'
 * 
 * Q4: 如何添加新的 API 端點？
 * A4: 在相應的 Service 中添加方法，然後在 Store 中使用
 */

export {}
