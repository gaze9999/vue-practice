# CSV 至 JSON 轉換總結

## 專案概述
成功將用戶提供的 `combined_db.csv`（Tokyo Game Show 2025 展商資料）轉換為 JSON 格式，並整合至 Vue Practice 項目的 Python Scraper 示例中。

## 轉換過程

### 1. CSV 源檔案分析
- **檔案位置**: `app/shared/mocks/python-scraper/combined_db.csv`
- **原始記錄**: 2,714 筆（包含空行）
- **實際轉換**: 2,617 筆有效展商記錄
- **欄位結構**:
  - Exhibitor（展商名稱）
  - Area（展示區域）
  - Booth Number（攤位編號）
  - Country（國家/地區）
  - Exhibitor Figure（展商圖片 URL）
  - Exhibitor ID（展商 ID）
  - Is Online（是否線上展示）
  - Location（場地位置）
  - uid（唯一識別碼）

### 2. 轉換方法
使用 Python 3 進行轉換：
```python
import csv, json

with open('combined_db.csv', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    # 跳過第一個空行
    reader = csv.DictReader(lines[1:])
    data = []
    for row in reader:
        data.append({**row, 'isOnline': row.get('Is Online', '').lower() == 'yes'})

with open('combined_db.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
```

### 3. 生成的 JSON 檔案
- **檔案位置**: `app/shared/mocks/python-scraper/combined_db.json`
- **檔案大小**: ~31,405 行
- **記錄數**: 2,617 筆
- **格式**: 標準 JSON，保留原始欄位名稱（含空格）

## 統計數據計算

實際統計數據（基於 2,617 筆記錄）：
- **總展商數**: 2,617 件
- **國際參展商**: 1,437 件（54.9%）
- **場地位置**: 16 個
  - イベントホール
  - ホール1～11
  - ホール9-11 エスプラナード
  - 国際会議場
  - 未指定
  - （空值）

- **展示區域**: 28 個
  - ファミリーゲームパーク（主要區域）
  - ゲームアカデミーコーナー
  - 一般展示
  - eスポーツコーナー
  - ビジネスソリューションコーナー
  - 其他 23 個區域...

## 程式碼集成

### 更新檔案 1: `/app/shared/mocks/python-scraper/index.ts`
```typescript
import rawData from './combined_db.json';

export interface ExhibitorItem {
  Exhibitor?: string;
  exhibitor?: string;
  // ... 其他欄位
}

// 資料轉換函式
const transformData = (data: any[]): ExhibitorItem[] => {/* ... */};

export const pythonScraperMockData: ExhibitorItem[] = transformData(rawData as any[]);

export const scraperStatistics = {
  totalExhibitors: 2617,
  totalLocations: 16,
  totalAreas: 28,
  internationalExhibitors: 1437,
  recordsProcessed: '2,617件',
  dataSource: 'Tokyo Game Show 2025',
  lastUpdated: new Date('2025-02-24'),
};
```

### 更新檔案 2: `/app/pages/projects/shop-admin/finance/vouchers.vue`
修正導入路徑：
```typescript
// 修正前: import { vouchersMockData } from '~/app/shared/mocks/shop-admin'
// 修正後: import { vouchersMockData } from '~/shared/mocks/shop-admin'
```

## 驗證結果

✅ **JSON 檔案**: 生成成功
- 2,617 筆展商記錄
- UTF-8 編碼，支援日文字符
- 有效的 JSON 格式

✅ **TypeScript 編譯**: 通過
- 無型別檢查錯誤
- 介面定義完整

✅ **Nuxt 構建**: 成功
```
✓ 402 modules transformed (Client)
✓ built in 1.28s
✓ 339 modules transformed (Server)
✓ built in 677ms
✨ Build complete!
```

## 功能驗證

### Python Scraper 頁面
- 顯示統計卡片：2,617 件展商、1,437 國際參展商、16 場地、28 區域
- 表格分頁：每頁 15 筆記錄，共 ~175 頁
- 搜尋過濾：支援展商名稱、区域、国家搜尋
- 原始資料來源：TGS 2025 官方資料

## 使用方式

### 頁面訪問
```
http://localhost:4200/projects/python-scraper
```

### 資料訪問方式
```typescript
// 在任何組件中使用
import { pythonScraperMockData, scraperStatistics } from '~/shared/mocks/python-scraper'

// 取得完整資料
const allExhibitors = pythonScraperMockData // 2,617 筆

// 取得統計資訊
const stats = scraperStatistics
// stats.totalExhibitors = 2617
// stats.internationalExhibitors = 1437
```

## 檔案清單

| 檔案                       | 狀態 | 說明                        |
| -------------------------- | ---- | --------------------------- |
| `combined_db.csv`          | ✓    | 原始 CSV 檔案（使用者提供） |
| `combined_db.json`         | ✓    | 轉換後的 JSON 檔案          |
| `index.ts`                 | ✓    | Mock 資料及統計定義         |
| `python-scraper/index.vue` | ✓    | 使用新資料的 Vue 頁面       |

## 技術細節

### 國家/地區處理
- 預設值：空值欄位保持為空字符串
- 不進行地區名稱正規化
- 1,437 筆記錄有明確的國家/地區資訊

### 線上展示標記
- `Is Online` 欄位（CSV）轉換為 `isOnline` 布爾值
- "Yes" / "yes" → `true`
- 其他値 → `false`

### 資料完整性
- 保留所有原始資訊（包括空值）
- 沒有資料遺失或修改
- UTF-8 編碼確保日文正確顯示

## 後續優化空間

1. **快取最佳化**
   - 考慮使用 CDN 快取 JSON 檔案
   - 實現增量更新機制

2. **搜尋效能**
   - 可以添加全文搜尋索引
   - 實現地區/國家篩選器組合

3. **資料維護**
   - 建立自動化 CSV 更新流程
   - 定期重新生成 JSON

4. **國際化**
   - 添加多語言區域名稱對應
   - 考慮建立國家代碼對應表

## 總結
成功完成 TGS 2025 展商資料的 CSV 至 JSON 轉換，並完整整合至 Vue Practice 項目中。應用程式立即可使用 2,617 筆真實展商數據，提供完整的搜尋、分頁和統計功能。
