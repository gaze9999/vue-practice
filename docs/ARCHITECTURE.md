/**
 * 架構遷移指南
 * 
 * ## 目錄結構說明
 * 
 * ### Core 層 (`core/`)
 * 核心功能層，提供應用級別的基礎設施：
 * - **services/**: API 客戶端、全局服務
 * - **guards/**: 路由守衛
 * - **interceptors/**: HTTP 攔截器
 * - **constants/**: 全局常數、配置
 * 
 * ### Shared 層 (`shared/`)
 * 共享資源層，提供可復用的元素：
 * - **composables/**: 通用 Vue Composables
 * - **components/**: 通用 UI 元件
 * - **directives/**: 自訂指令
 * - **pipes/**: 管道/過濾器
 * 
 * ### Modules 層 (`modules/`)
 * 業務模組層，按業務域組織（DDD 原則）：
 * - **shop/**: 商店管理系統
 *   - types/: 模組類型定義
 *   - services/: 業務服務
 *   - stores/: 狀態管理
 *   - constants/: 模組常數
 *   - components/: 模組專用元件
 * - **audit/**: 審計模組
 * - **dashboard/**: 儀表板模組
 * - **system/**: 系統管理模組
 * - 等等...
 * 
 * ### Global 層 (`app/`)
 * 應用層：
 * - **stores/**: 全局狀態
 * - **types/**: 全局類型
 * - **middleware/**: 路由中間件
 * - **layouts/**: 佈局元件
 * - **utils/**: 全局工具函式
 * - **styles/**: 全局樣式
 * 
 * ## 導入路徑對應
 * 
 * ### 原舊結構 → 新結構
 * 
 * ```
 * import { useErpModules } from '~/composables/useErpModules'
 * ⟹ import { useErpModules } from '~/shared/composables'
 * 
 * import { apiClient } from '~/services/api'
 * ⟹ import { apiClient } from '~/core/services'
 * 
 * import { API, HTTP_STATUS } from '~/constants'
 * ⟹ import { API, HTTP_STATUS } from '~/core/constants'
 * 
 * import { useErpStore } from '~/stores/erp'
 * ⟹ import { useErpStore } from '~/stores'
 * 
 * import { formatDate } from '~/utils/format'
 * ⟹ import { formatDate } from '~/utils/format' // 保持不變
 * ```
 * 
 * ## 模組使用示例
 * 
 * ### 服務層使用
 * ```typescript
 * import { financeService } from '~/modules/shop'
 * 
 * const vouchers = await financeService.getVouchers(request)
 * ```
 * 
 * ### Store 使用
 * ```typescript
 * import { useFinanceStore } from '~/modules/shop'
 * 
 * const financeStore = useFinanceStore()
 * await financeStore.fetchVouchers(request)
 * ```
 * 
 * ### 類型定義
 * ```typescript
 * import type { VoucherItem, FinanceListResponse } from '~/modules/shop'
 * ```
 * 
 * ## 最佳實踐
 * 
 * 1. **模組獨立性**: 各模組應該可以獨立測試和維護
 * 2. **一致的層次**: 遵循 Presentation → State → Service → Data 層次
 * 3. **類型安全**: 在模組的 types/ 中定義所有相關類型
 * 4. **集中導出**: 通過 index.ts 導出所有公開 API
 * 5. **避免循環依賴**: 服務層不應導入 Store，Store 導入服務
 * 
 * ## 更新步驟檢清單
 * 
 * - [ ] 更新所有 import 語句
 * - [ ] 驗證 TypeScript 編譯
 * - [ ] 測試路由導航
 * - [ ] 測試數據加載
 * - [ ] 驗證狀態管理流程
 */

export {}
