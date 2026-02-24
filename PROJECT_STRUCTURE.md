## 📂 Vue Practice - 專案結構說明

### 項目已升級為業界標準 Nuxt 3 最佳實踐

```
app/
├── layouts/              # 路由佈局
│   └── default.vue       # 默認佈局
├── pages/                # 基於文件的路由
│   ├── index.vue         # 首頁
│   ├── about.vue         # 關於頁面
│   └── counter.vue       # 計數器示例
├── composables/          # 可複用邏輯
│   └── useFetch.ts       # 數據獲取 composable
├── stores/               # Pinia 狀態管理
│   └── counter.ts        # 計數器 store（Composition API 風格）
├── services/             # API 和業務邏輯
│   └── api.ts            # 中央 API 客戶端
├── types/                # TypeScript 類型定義
│   └── index.ts          # 集中式類型定義
├── constants/            # 應用常數
│   └── index.ts          # API、路由、存儲鍵常數
├── utils/                # 工具函數
│   └── format.ts         # 格式化和輔助函數
├── middleware/           # 路由中間件
│   └── auth.ts           # 身份驗證示例中間件
├── styles/               # 全局樣式
│   └── globals.css       # 全局 CSS
└── app.vue               # 根元件

📄 根目錄配置文件：
├── nuxt.config.ts        # Nuxt 配置（含 TypeScript、Pinia、運行時設置）
├── tsconfig.json         # TypeScript 配置（引用生成的類型）
├── .eslintrc.cjs         # ESLint 配置
├── .prettierrc            # Prettier 格式化配置
├── .env.example          # 環境變數模板
├── .gitignore            # Git 忽略規則
├── package.json          # 項目依賴（含開發工具）
└── README.md             # 項目文檔
```

### ✨ 實現的最佳實踐

| 特性                  | 說明                         |
| --------------------- | ---------------------------- |
| **Type Safety**       | 全 TypeScript 配置，嚴格模式 |
| **State Management**  | Pinia (Composition API 風格) |
| **API Layer**         | 集中式 API 客戶端服務        |
| **File Organization** | 邏輯清晰的文件夾結構         |
| **Code Quality**      | ESLint + Prettier            |
| **Constants**         | 集中管理所有常數             |
| **Types**             | 集中式類型定義               |
| **Utilities**         | 可複用工具函數               |
| **Middleware**        | 路由保護示例                 |
| **Composables**       | 可複用邏輯提取               |

### 🚀 快速開始

```bash
# 開發模式
pnpm dev

# 構建
pnpm build

# 代碼檢查
pnpm lint
pnpm lint:fix

# 代碼格式化
pnpm format

# 生成靜態站點
pnpm generate
```

### 📝 核心概念

#### 1. State Management (Pinia)

```typescript
// app/stores/counter.ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
})
```

#### 2. API Service Layer

```typescript
// app/services/api.ts
export const apiClient = new ApiClient(API.BASE_URL)
const response = await apiClient.getCounter()
```

#### 3. Composables

```typescript
// app/composables/useFetch.ts
const { data, loading, error } = useDataFetch('/api/data')
```

#### 4. Type Definitions

```typescript
// app/types/index.ts
export interface Counter {
  count: number
  lastUpdated: string | null
}
```

#### 5. Constants

```typescript
// app/constants/index.ts
export const API = { BASE_URL: 'http://localhost:3000/api' }
```

### 💡 開發提示

- 使用 Nuxt DevTools 進行調試
- VS Code 安裝 ESLint 和 Prettier 擴展獲得最佳體驗
- 在 `.env` 文件中配置環境變數
- 遵循組件命名和目錄結構約定
- 在 `app/types` 中集中管理所有類型定義

### ✅ 項目狀態

- ✔ 構建成功
- ✔ ESLint 通過
- ✔ TypeScript 配置完成
- ✔ 現代化開發工具鏈
- ✔ 行業最佳實踐實施
