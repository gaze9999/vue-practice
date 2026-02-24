<template>
  <section class="page-block">
    <div class="page-header">
      <div>
        <h2>庫存查詢</h2>
        <p class="lead">即時查詢貨物庫存、批次資訊與異動歷程。</p>
      </div>
      <NuxtLink to="/projects/shop-admin/inventory" class="btn-secondary">← 返回庫存管理</NuxtLink>
    </div>

    <div class="permission-card">
      <p>可存取角色：系統管理、營運主管、倉儲人員</p>
      <p>目前角色：{{ roleLabel }}</p>
    </div>

    <!-- 搜尋與篩選區 -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-group">
          <label for="search">商品搜尋</label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="商品名稱、編號或批次號"
            class="search-input"
          />
        </div>
        <div class="filter-group">
          <label for="category">商品類別</label>
          <select id="category" v-model="filterCategory" class="filter-select">
            <option value="">全部類別</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <label for="warehouse">倉庫位置</label>
          <select id="warehouse" v-model="filterWarehouse" class="filter-select">
            <option value="">全部倉庫</option>
            <option v-for="wh in warehouses" :key="wh" :value="wh">
              {{ wh }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <label for="status">庫存狀態</label>
          <select id="status" v-model="filterStatus" class="filter-select">
            <option value="">全部狀態</option>
            <option value="正常">正常</option>
            <option value="低於安全值">低於安全值</option>
            <option value="需補貨">需補貨</option>
            <option value="過期警告">過期警告</option>
          </select>
        </div>
      </div>
      <div class="filter-actions">
        <button @click="handleSearch" class="btn-primary">查詢</button>
        <button @click="handleReset" class="btn-secondary">重置</button>
        <button @click="handleExport" class="btn-outline">匯出報表</button>
      </div>
    </div>

    <!-- 統計卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon primary"><i class="fas fa-boxes"></i></div>
        <div class="stat-content">
          <p class="stat-label">總庫存品項</p>
          <h3 class="stat-value">{{ hasSearched ? filteredItems.length : '-' }}</h3>
          <p class="stat-meta">{{ hasSearched ? `${inventoryItems.length} 品項` : '請先查詢' }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon success"><i class="fas fa-check-circle"></i></div>
        <div class="stat-content">
          <p class="stat-label">正常庫存</p>
          <h3 class="stat-value">{{ hasSearched ? normalStock : '-' }}</h3>
          <p class="stat-meta">{{ hasSearched ? `${normalStockPercent}%` : '請先查詢' }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon warning"><i class="fas fa-exclamation-triangle"></i></div>
        <div class="stat-content">
          <p class="stat-label">低於安全值</p>
          <h3 class="stat-value">{{ hasSearched ? lowStock : '-' }}</h3>
          <p class="stat-meta">{{ hasSearched ? '需注意補貨' : '請先查詢' }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon danger"><i class="fas fa-bell"></i></div>
        <div class="stat-content">
          <p class="stat-label">庫存總值</p>
          <h3 class="stat-value">{{ hasSearched ? totalValue : '-' }}</h3>
          <p class="stat-meta">{{ hasSearched ? '新台幣' : '請先查詢' }}</p>
        </div>
      </div>
    </div>

    <!-- 庫存清單表格 -->
    <div class="table-section">
      <div class="table-header">
        <h3>庫存清單</h3>
        <span class="record-count" v-if="hasSearched">共 {{ filteredItems.length }} 筆記錄</span>
      </div>
      <!-- 未查詢提示 -->
      <div v-if="!hasSearched" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-search"></i>
        </div>
        <h3>請設定查詢條件</h3>
        <p>請在上方輸入搜尋條件或選擇篩選項目，然後點擊「查詢」按鈕</p>
      </div>

      <!-- 查詢結果為空 -->
      <div v-else-if="filteredItems.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-inbox"></i>
        </div>
        <h3>查無資料</h3>
        <p>找不到符合條件的庫存記錄，請調整查詢條件後重試</p>
      </div>

      <div v-else class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th @click="toggleSort('code')">
                <div class="th-content">
                  <span>商品編號</span>
                  <span class="sort-icon">{{ getSortIcon('code') }}</span>
                </div>
              </th>
              <th @click="toggleSort('name')">
                <div class="th-content">
                  <span>商品名稱</span>
                  <span class="sort-icon">{{ getSortIcon('name') }}</span>
                </div>
              </th>
              <th @click="toggleSort('category')">
                <div class="th-content">
                  <span>類別</span>
                  <span class="sort-icon">{{ getSortIcon('category') }}</span>
                </div>
              </th>
              <th @click="toggleSort('warehouse')">
                <div class="th-content">
                  <span>倉庫</span>
                  <span class="sort-icon">{{ getSortIcon('warehouse') }}</span>
                </div>
              </th>
              <th @click="toggleSort('quantity')">
                <div class="th-content">
                  <span>庫存數量</span>
                  <span class="sort-icon">{{ getSortIcon('quantity') }}</span>
                </div>
              </th>
              <th @click="toggleSort('safeLevel')">
                <div class="th-content">
                  <span>安全值</span>
                  <span class="sort-icon">{{ getSortIcon('safeLevel') }}</span>
                </div>
              </th>
              <th>單位</th>
              <th @click="toggleSort('unitPrice')">
                <div class="th-content">
                  <span>單價</span>
                  <span class="sort-icon">{{ getSortIcon('unitPrice') }}</span>
                </div>
              </th>
              <th>總值</th>
              <th>批次號</th>
              <th>到期日</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedItems" :key="item.id">
              <td class="code">{{ item.code }}</td>
              <td class="name">{{ item.name }}</td>
              <td>
                <span class="category-badge">{{ item.category }}</span>
              </td>
              <td>{{ item.warehouse }}</td>
              <td class="quantity">{{ item.quantity }}</td>
              <td class="safe-level">{{ item.safeLevel }}</td>
              <td>{{ item.unit }}</td>
              <td class="price">${{ item.unitPrice.toLocaleString() }}</td>
              <td class="price">${{ (item.quantity * item.unitPrice).toLocaleString() }}</td>
              <td class="batch">{{ item.batchNo }}</td>
              <td class="expire-date">{{ item.expireDate || '-' }}</td>
              <td>
                <span :class="['status-badge', getStatusClass(item.status)]">
                  {{ item.status }}
                </span>
              </td>
              <td class="actions">
                <button @click="viewDetails(item)" class="btn-icon" title="查看詳情">
                  <i class="fas fa-eye"></i>
                </button>
                <button @click="editItem(item)" class="btn-icon" title="編輯">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分頁 -->
      <div v-if="hasSearched && filteredItems.length > 0" class="pagination">
        <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="currentPage = 1"
        >
          首頁
        </button>
        <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          上一頁
        </button>
        <div class="page-info">
          第 {{ currentPage }} / {{ totalPages }} 頁
        </div>
        <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          下一頁
        </button>
        <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage = totalPages"
        >
          末頁
        </button>
      </div>
    </div>

    <!-- 詳情 Modal -->
    <div v-if="showDetailModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>庫存詳情</h3>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>
        <div class="modal-body" v-if="selectedItem">
          <div class="detail-grid">
            <div class="detail-item">
              <label>商品編號</label>
              <p>{{ selectedItem.code }}</p>
            </div>
            <div class="detail-item">
              <label>商品名稱</label>
              <p>{{ selectedItem.name }}</p>
            </div>
            <div class="detail-item">
              <label>類別</label>
              <p>{{ selectedItem.category }}</p>
            </div>
            <div class="detail-item">
              <label>倉庫位置</label>
              <p>{{ selectedItem.warehouse }}</p>
            </div>
            <div class="detail-item">
              <label>庫存數量</label>
              <p>{{ selectedItem.quantity }} {{ selectedItem.unit }}</p>
            </div>
            <div class="detail-item">
              <label>安全庫存</label>
              <p>{{ selectedItem.safeLevel }} {{ selectedItem.unit }}</p>
            </div>
            <div class="detail-item">
              <label>單價</label>
              <p>${{ selectedItem.unitPrice.toLocaleString() }}</p>
            </div>
            <div class="detail-item">
              <label>總值</label>
              <p>${{ (selectedItem.quantity * selectedItem.unitPrice).toLocaleString() }}</p>
            </div>
            <div class="detail-item">
              <label>批次號</label>
              <p>{{ selectedItem.batchNo }}</p>
            </div>
            <div class="detail-item">
              <label>到期日</label>
              <p>{{ selectedItem.expireDate || '無' }}</p>
            </div>
            <div class="detail-item">
              <label>供應商</label>
              <p>{{ selectedItem.supplier }}</p>
            </div>
            <div class="detail-item">
              <label>最後更新</label>
              <p>{{ selectedItem.lastUpdated }}</p>
            </div>
          </div>
          <div class="detail-section">
            <h4>近期異動紀錄</h4>
            <table class="detail-table">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>類型</th>
                  <th>數量</th>
                  <th>經手人</th>
                  <th>備註</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in selectedItem.history" :key="record.id">
                  <td>{{ record.date }}</td>
                  <td><span :class="['type-badge', record.type]">{{ record.type }}</span></td>
                  <td>{{ record.quantity }}</td>
                  <td>{{ record.operator }}</td>
                  <td>{{ record.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="btn-secondary">關閉</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

interface InventoryItem {
  id: string
  code: string
  name: string
  category: string
  warehouse: string
  quantity: number
  safeLevel: number
  unit: string
  unitPrice: number
  batchNo: string
  expireDate: string
  status: string
  supplier: string
  lastUpdated: string
  history: Array<{
    id: string
    date: string
    type: string
    quantity: string
    operator: string
    note: string
  }>
}

const erpStore = useErpStore()
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})

// 搜尋與篩選
const searchQuery = ref('')
const filterCategory = ref('')
const filterWarehouse = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const pageSize = 15
const hasSearched = ref(!1) // 是否已執行查詢

// 排序
const sortColumn = ref<keyof InventoryItem | ''>('')
const sortDirection = ref<'asc' | 'desc'>('asc')

// Modal
const showDetailModal = ref(!1)
const selectedItem = ref<InventoryItem | null>(null)

// 類別和倉庫選項
const categories = ['原料', '包材', '零件', '成品', '耗材']
const warehouses = ['A 倉', 'B 倉', 'C 倉', 'D 倉（冷藏）', 'E 倉（危險品）']

// 模擬庫存資料
const inventoryItems = ref<InventoryItem[]>([
  {
    id: 'INV-001',
    code: 'RAW-A-001',
    name: '原料 A-銅線材',
    category: '原料',
    warehouse: 'A 倉',
    quantity: 1250,
    safeLevel: 1000,
    unit: '公斤',
    unitPrice: 350,
    batchNo: 'BATCH-2024-001',
    expireDate: '2026-12-31',
    status: '正常',
    supplier: '銅業股份有限公司',
    lastUpdated: '2024-02-20 14:30',
    history: [
      { id: 'H1', date: '02/20', type: '入庫', quantity: '+500', operator: '張三', note: '採購單 PO-2024-123' },
      { id: 'H2', date: '02/18', type: '出庫', quantity: '-300', operator: '李四', note: '生產領料單 PR-001' },
    ]
  },
  {
    id: 'INV-002',
    code: 'RAW-B-002',
    name: '原料 B-塑膠粒',
    category: '原料',
    warehouse: 'A 倉',
    quantity: 720,
    safeLevel: 900,
    unit: '公斤',
    unitPrice: 180,
    batchNo: 'BATCH-2024-002',
    expireDate: '2025-08-31',
    status: '低於安全值',
    supplier: '化工材料行',
    lastUpdated: '2024-02-19 10:15',
    history: [
      { id: 'H3', date: '02/19', type: '出庫', quantity: '-200', operator: '王五', note: '生產領料' },
      { id: 'H4', date: '02/15', type: '入庫', quantity: '+400', operator: '張三', note: '採購補貨' },
    ]
  },
  {
    id: 'INV-003',
    code: 'PKG-C-001',
    name: '包材 C-紙箱',
    category: '包材',
    warehouse: 'B 倉',
    quantity: 2400,
    safeLevel: 2000,
    unit: '個',
    unitPrice: 15,
    batchNo: 'BATCH-2024-003',
    expireDate: '',
    status: '正常',
    supplier: '包裝盒製造商',
    lastUpdated: '2024-02-21 09:00',
    history: [
      { id: 'H5', date: '02/21', type: '入庫', quantity: '+1000', operator: '陳六', note: '新批次進貨' },
      { id: 'H6', date: '02/17', type: '出庫', quantity: '-600', operator: '劉七', note: '出貨包裝' },
    ]
  },
  {
    id: 'INV-004',
    code: 'PRT-D-001',
    name: '零件 D-螺絲組',
    category: '零件',
    warehouse: 'C 倉',
    quantity: 150,
    safeLevel: 180,
    unit: '盒',
    unitPrice: 120,
    batchNo: 'BATCH-2024-004',
    expireDate: '',
    status: '需補貨',
    supplier: '五金行',
    lastUpdated: '2024-02-18 16:45',
    history: [
      { id: 'H7', date: '02/18', type: '出庫', quantity: '-50', operator: '趙八', note: '組裝用料' },
      { id: 'H8', date: '02/10', type: '入庫', quantity: '+100', operator: '張三', note: '定期補貨' },
    ]
  },
  {
    id: 'INV-005',
    code: 'FIN-E-001',
    name: '成品 E-電源模組',
    category: '成品',
    warehouse: 'C 倉',
    quantity: 580,
    safeLevel: 500,
    unit: '台',
    unitPrice: 2500,
    batchNo: 'BATCH-2024-005',
    expireDate: '2027-12-31',
    status: '正常',
    supplier: '自行生產',
    lastUpdated: '2024-02-22 11:20',
    history: [
      { id: 'H9', date: '02/22', type: '入庫', quantity: '+200', operator: '生產部', note: '生產完成入庫' },
      { id: 'H10', date: '02/20', type: '出庫', quantity: '-120', operator: '業務部', note: '客戶訂單出貨' },
    ]
  },
  {
    id: 'INV-006',
    code: 'CON-F-001',
    name: '耗材 F-焊錫絲',
    category: '耗材',
    warehouse: 'A 倉',
    quantity: 85,
    safeLevel: 100,
    unit: '捲',
    unitPrice: 450,
    batchNo: 'BATCH-2024-006',
    expireDate: '2025-06-30',
    status: '低於安全值',
    supplier: '焊接材料供應商',
    lastUpdated: '2024-02-19 14:00',
    history: [
      { id: 'H11', date: '02/19', type: '出庫', quantity: '-15', operator: '製造部', note: '生產線使用' },
      { id: 'H12', date: '02/12', type: '入庫', quantity: '+50', operator: '張三', note: '定期補貨' },
    ]
  },
  {
    id: 'INV-007',
    code: 'RAW-G-003',
    name: '原料 G-鋁板',
    category: '原料',
    warehouse: 'B 倉',
    quantity: 950,
    safeLevel: 800,
    unit: '片',
    unitPrice: 680,
    batchNo: 'BATCH-2024-007',
    expireDate: '',
    status: '正常',
    supplier: '金屬材料商',
    lastUpdated: '2024-02-21 15:30',
    history: [
      { id: 'H13', date: '02/21', type: '入庫', quantity: '+300', operator: '倉管', note: '新批次到貨' },
      { id: 'H14', date: '02/16', type: '出庫', quantity: '-150', operator: '生產', note: '機殼製作' },
    ]
  },
  {
    id: 'INV-008',
    code: 'PKG-H-002',
    name: '包材 H-氣泡膜',
    category: '包材',
    warehouse: 'B 倉',
    quantity: 1800,
    safeLevel: 1500,
    unit: '捲',
    unitPrice: 25,
    batchNo: 'BATCH-2024-008',
    expireDate: '',
    status: '正常',
    supplier: '包裝材料商',
    lastUpdated: '2024-02-20 10:00',
    history: [
      { id: 'H15', date: '02/20', type: '入庫', quantity: '+500', operator: '採購', note: '補充庫存' },
      { id: 'H16', date: '02/15', type: '出庫', quantity: '-200', operator: '出貨', note: '包裝使用' },
    ]
  },
  {
    id: 'INV-009',
    code: 'FIN-I-002',
    name: '成品 I-LED 燈具',
    category: '成品',
    warehouse: 'D 倉（冷藏）',
    quantity: 320,
    safeLevel: 300,
    unit: '組',
    unitPrice: 1800,
    batchNo: 'BATCH-2024-009',
    expireDate: '2028-03-31',
    status: '正常',
    supplier: '自行生產',
    lastUpdated: '2024-02-22 09:45',
    history: [
      { id: 'H17', date: '02/22', type: '入庫', quantity: '+150', operator: '組裝部', note: '完成組裝' },
      { id: 'H18', date: '02/19', type: '出庫', quantity: '-80', operator: '銷售', note: '訂單出貨' },
    ]
  },
  {
    id: 'INV-010',
    code: 'CON-J-002',
    name: '耗材 J-清潔劑',
    category: '耗材',
    warehouse: 'E 倉（危險品）',
    quantity: 45,
    safeLevel: 50,
    unit: '瓶',
    unitPrice: 280,
    batchNo: 'BATCH-2024-010',
    expireDate: '2025-03-31',
    status: '過期警告',
    supplier: '化學用品供應商',
    lastUpdated: '2024-02-18 13:20',
    history: [
      { id: 'H19', date: '02/18', type: '出庫', quantity: '-5', operator: '清潔', note: '例行清潔' },
      { id: 'H20', date: '02/01', type: '入庫', quantity: '+30', operator: '採購', note: '定期補貨' },
    ]
  },
])

// 計算屬性
const filteredItems = computed(() => {
  // 如果尚未執行查詢，返回空陣列
  if (!hasSearched.value) {
    return []
  }

  let result = inventoryItems.value

  // 搜尋
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      item =>
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.batchNo.toLowerCase().includes(query)
    )
  }

  // 類別篩選
  if (filterCategory.value) {
    result = result.filter(item => item.category === filterCategory.value)
  }

  // 倉庫篩選
  if (filterWarehouse.value) {
    result = result.filter(item => item.warehouse === filterWarehouse.value)
  }

  // 狀態篩選
  if (filterStatus.value) {
    result = result.filter(item => item.status === filterStatus.value)
  }

  // 排序
  if (sortColumn.value) {
    result = [...result].sort((a, b) => {
      const aValue = a[sortColumn.value as keyof InventoryItem]
      const bValue = b[sortColumn.value as keyof InventoryItem]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue
      }

      const comparison = String(aValue).localeCompare(String(bValue))
      return sortDirection.value === 'asc' ? comparison : -comparison
    })
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / pageSize))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredItems.value.slice(start, start + pageSize)
})

const normalStock = computed(() => {
  return filteredItems.value.filter(item => item.status === '正常').length
})

const normalStockPercent = computed(() => {
  if (!filteredItems.value.length) return 0
  return Math.round((normalStock.value / filteredItems.value.length) * 100)
})

const lowStock = computed(() => {
  return filteredItems.value.filter(
    item => item.status === '低於安全值' || item.status === '需補貨'
  ).length
})

const totalValue = computed(() => {
  const sum = filteredItems.value.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  )
  return `$${sum.toLocaleString()}`
})

// 方法
const handleSearch = () => {
  hasSearched.value = !0
  currentPage.value = 1
}

const handleReset = () => {
  searchQuery.value = ''
  filterCategory.value = ''
  filterWarehouse.value = ''
  filterStatus.value = ''
  sortColumn.value = ''
  currentPage.value = 1
  hasSearched.value = !1 // 重置查詢狀態
}

const handleExport = () => {
  alert('匯出功能開發中...')
}

const toggleSort = (column: keyof InventoryItem) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (column: keyof InventoryItem): string => {
  if (sortColumn.value !== column) return '⇅'
  return sortDirection.value === 'asc' ? '↑' : '↓'
}

const getStatusClass = (status: string): string => {
  const statusMap: Record<string, string> = {
    '正常': 'normal',
    '低於安全值': 'warning',
    '需補貨': 'danger',
    '過期警告': 'expired',
  }
  return statusMap[status] || 'normal'
}

const viewDetails = (item: InventoryItem) => {
  selectedItem.value = item
  showDetailModal.value = !0
}

const editItem = (item: InventoryItem) => {
  alert(`編輯功能開發中...\n商品：${item.name}`)
}

const closeModal = () => {
  showDetailModal.value = !1
  selectedItem.value = null
}

// 監聽篩選變化
watch([filterCategory, filterWarehouse, filterStatus], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.page-block {
  max-width: 95rem;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.page-header h2 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  color: #1f1b2d;
}

.lead {
  color: #6b7280;
  font-size: 0.9375rem;
  margin: 0;
}

.permission-card {
  background: #f0e7db;
  border-left: 0.25rem solid #ff9f4a;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.permission-card p {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: #3e2723;
}

/* 篩選區 */
.filter-section {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 0.125rem 0.5rem #1f1b2d0d;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.search-input,
.filter-select {
  padding: 0.625rem 1rem;
  border: 0.0625rem solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #ff9f4a;
  box-shadow: 0 0 0 0.1875rem rgba(255, 159, 74, 0.1);
}

.filter-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-outline {
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: #ff9f4a;
  color: white;
}

.btn-primary:hover {
  background: #ff8c2a;
}

.btn-secondary {
  background: #6b7280;
  color: white;
  text-decoration: none;
  display: inline-block;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-outline {
  background: white;
  color: #ff9f4a;
  border: 0.0625rem solid #ff9f4a;
}

.btn-outline:hover {
  background: #fff7ed;
}

/* 統計卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  box-shadow: 0 0.125rem 0.5rem #1f1b2d0d;
}

.stat-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.stat-icon.primary {
  background: #dbeafe;
  color: #1e40af;
}

.stat-icon.success {
  background: #d1fae5;
  color: #065f46;
}

.stat-icon.warning {
  background: #fef3c7;
  color: #92400e;
}

.stat-icon.danger {
  background: #ffe4e6;
  color: #9f1239;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.25rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.stat-meta {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* 表格 */
.table-section {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 0.125rem 0.5rem #1f1b2d0d;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.table-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.record-count {
  font-size: 0.875rem;
  color: #6b7280;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table th {
  background: #f9fafb;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 0.125rem solid #e5e7eb;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.data-table th:hover {
  background: #f3f4f6;
}

.th-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.sort-icon {
  font-size: 0.875rem;
  color: #9ca3af;
}

.data-table td {
  padding: 0.75rem 1rem;
  border-bottom: 0.0625rem solid #f3f4f6;
}

.data-table tbody tr:hover {
  background: #fafafa;
}

.code {
  font-family: 'Courier New', monospace;
  color: #6366f1;
  font-weight: 600;
}

.name {
  font-weight: 600;
  color: #1f2937;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #ede9fe;
  color: #6b21a8;
  border-radius: 9999rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.quantity,
.safe-level {
  font-weight: 600;
  color: #374151;
}

.price {
  color: #059669;
  font-weight: 600;
}

.batch {
  font-family: 'Courier New', monospace;
  font-size: 0.8125rem;
  color: #6b7280;
}

.expire-date {
  color: #6b7280;
  font-size: 0.8125rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.normal {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.warning {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.danger {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.expired {
  background: #fce7f3;
  color: #9f1239;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  padding: 0.375rem 0.5rem;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.btn-icon:hover {
  background: #ff9f4a;
  color: white;
}

/* 分頁 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 0.0625rem solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #ff9f4a;
  color: white;
  border-color: #ff9f4a;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  padding: 0 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 0.75rem;
  max-width: 50rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 1.25rem 3.125rem rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 0.0625rem solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.modal-close {
  border: none;
  background: none;
  font-size: 2rem;
  color: #9ca3af;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 2rem;
  height: 2rem;
}

.modal-close:hover {
  color: #374151;
}

.modal-body {
  padding: 1.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-item label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.03125rem;
  margin-bottom: 0.25rem;
}

.detail-item p {
  margin: 0;
  font-size: 0.9375rem;
  color: #1f2937;
  font-weight: 600;
}

.detail-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 0.0625rem solid #e5e7eb;
}

.detail-section h4 {
  margin: 0 0 1rem;
  font-size: 1rem;
  color: #1f2937;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.detail-table thead {
  background: #f9fafb;
}

.detail-table th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 0.0625rem solid #e5e7eb;
}

.detail-table td {
  padding: 0.75rem;
  border-bottom: 0.0625rem solid #f3f4f6;
}

.type-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.type-badge.入庫 {
  background: #d1fae5;
  color: #065f46;
}

.type-badge.出庫 {
  background: #fee2e2;
  color: #991b1b;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 0.0625rem solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

/* 空狀態 */
.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: #6b7280;
}

.empty-icon {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  color: #374151;
  margin: 0 0 0.5rem;
}

.empty-state p {
  font-size: 0.9375rem;
  color: #6b7280;
  max-width: 31.25rem;
  margin: 0 auto;
  line-height: 1.6;
}

/* 響應式 */
@media (max-width: 48rem) {
  .page-block {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-row {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .data-table {
    font-size: 0.8125rem;
  }

  .data-table th,
  .data-table td {
    padding: 0.5rem 0.625rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
