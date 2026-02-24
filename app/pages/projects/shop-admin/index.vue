<template>
  <div class="erp-dashboard">
    <section class="summary-cards">
      <article v-for="(item, index) in summary" :key="item.label" class="summary-card">
        <p class="label">{{ item.label }}</p>
        <h2>{{ item.value }}</h2>
        <span class="meta">{{ item.meta }}</span>
        <div class="summary-chart" :ref="(el) => setSummaryRef(el as HTMLElement | null, index)"></div>
      </article>
    </section>

    <section class="module-section">
      <div class="section-header">
        <h2>模組狀態</h2>
        <span class="pill">更新於 09:20</span>
      </div>
      <div class="module-grid">
        <article v-for="module in modules" :key="module.id" class="module-card">
          <div class="module-header">
            <h3>{{ module.name }}</h3>
            <span :class="['status', module.status]">{{ module.status }}</span>
          </div>
          <p class="owner">負責單位：{{ module.owner }}</p>
          <p class="kpi">{{ module.kpi }}</p>
          <p class="update">更新時間：{{ module.updatedAt }}</p>
        </article>
      </div>
    </section>

    <section id="warning-charts" class="workflow-section">
      <div class="section-header">
        <h2>資料視覺化</h2>
        <span class="pill">圖表分析</span>
      </div>
      <div class="charts-grid">
        <!-- 營收趨勢圖 -->
        <div class="chart-container">
          <h3>營收趨勢（近6個月）</h3>
          <div ref="revenueChartRef" class="chart"></div>
        </div>
        <!-- 採購狀態分佈 -->
        <div class="chart-container">
          <h3>採購狀態分佈</h3>
          <div ref="procurementChartRef" class="chart pie-chart"></div>
        </div>
        <!-- 模組運營效率 -->
        <div class="chart-container">
          <h3>模組運營效率對比</h3>
          <div ref="moduleChartRef" class="chart"></div>
        </div>
        <!-- 人力資源配置 -->
        <div class="chart-container">
          <h3>部門人力資源配置</h3>
          <div ref="hrChartRef" class="chart pie-chart"></div>
        </div>
      </div>
    </section>

    <section class="workflow-section">
      <div class="section-header">
        <h2>跨模組流程總覽</h2>
        <span class="pill light">流程示意</span>
      </div>
      <div class="workflow-grid">
        <div v-for="step in workflowSteps" :key="step.id" class="workflow-card">
          <div class="workflow-header">
            <span class="step">{{ step.id }}</span>
            <span :class="['badge', step.status]">{{ step.status }}</span>
          </div>
          <h3>{{ step.title }}</h3>
          <p class="owner">責任角色：{{ step.owner }}</p>
          <p class="note">{{ step.note }}</p>
          <span class="time">期限：{{ step.due }}</span>
        </div>
      </div>
    </section>

    <section class="access-section">
      <h2>權限顯示</h2>
      <div class="access-card">
        <p>目前角色：{{ roleLabel }}</p>
        <p>可存取模組：{{ accessSummary }}</p>
      </div>
    </section>

    <section class="warning-section">
      <div class="section-header">
        <h2>預警摘要</h2>
        <span class="pill warn">需要關注</span>
      </div>
      <div class="warning-grid">
        <button
          v-for="item in warningStats"
          :key="item.title"
          type="button"
          class="warning-card"
          :class="item.level"
          @click="openWarningDialog(item)"
        >
          <div class="warning-title">{{ item.title }}</div>
          <div class="warning-value">{{ item.value }}</div>
          <div class="warning-meta">{{ item.meta }}</div>
          <span class="warning-cta">查看圖表 →</span>
        </button>
      </div>
    </section>

    <div v-if="isWarningDialogOpen" class="dialog-backdrop" @click.self="closeWarningDialog">
      <div class="dialog" :key="activeWarning?.title">
        <div class="dialog-header">
          <div>
            <h3>{{ activeWarning?.title }} 明細</h3>
            <div class="dialog-value">{{ activeWarning?.value }}</div>
          </div>
          <button type="button" class="dialog-close" @click="closeWarningDialog">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="dialog-body">
          <p class="dialog-subtitle">{{ activeWarning?.meta }}</p>
          <WarningDetailsTable :rows="activeWarning?.details || []" />
        </div>
      </div>
    </div>

    <section class="notice-section">
      <h2>營運通知</h2>
      <div class="notice-grid">
        <div v-for="notice in notices" :key="notice.id" class="notice-card">
          <div class="notice-header">
            <h3>{{ notice.title }}</h3>
            <span :class="['level', notice.level]">{{ notice.level }}</span>
          </div>
          <p>{{ notice.message }}</p>
          <span class="time">{{ notice.time }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useErpModules } from '~/shared/composables'
import WarningDetailsTable from '~/components/shop-admin/WarningDetailsTable.vue'
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

// 圖表參考
const summaryChartRefs = ref<Array<HTMLElement | null>>([])
const summaryCharts: echarts.ECharts[] = []
const revenueChartRef = ref<HTMLElement>()
const procurementChartRef = ref<HTMLElement>()
const moduleChartRef = ref<HTMLElement>()
const hrChartRef = ref<HTMLElement>()

// 圖表實例
let revenueChart: echarts.ECharts
let procurementChart: echarts.ECharts
let moduleChart: echarts.ECharts
let hrChart: echarts.ECharts

const summary = [
  { label: '本月營收', value: 'NT$ 12.4M', meta: '年增 12%', trend: [10.8, 11.3, 11.1, 11.9, 12.1, 12.4] },
  { label: '待審核採購', value: '18 筆', meta: '金額 NT$ 1.6M', trend: [22, 20, 19, 21, 18, 18] },
  { label: '庫存預警', value: '4 項', meta: '低於安全庫存', trend: [6, 5, 7, 4, 5, 4] },
  { label: '人力配置', value: '92%', meta: '本週排班', trend: [88, 90, 89, 91, 92, 92] },
]

const workflowSteps = [
  {
    id: '01',
    title: '需求提出與採購審核',
    owner: '營運主管',
    status: 'active',
    due: '今日 16:00',
    note: '本週採購需求已進入審核階段',
  },
  {
    id: '02',
    title: '庫存檢核與入庫',
    owner: '營運主管',
    status: 'pending',
    due: '明日 10:30',
    note: '等待採購確認後進行入庫作業',
  },
  {
    id: '03',
    title: '財務月結與付款',
    owner: '財務專員',
    status: 'pending',
    due: '本週五',
    note: '須完成採購結算與憑證核對',
  },
  {
    id: '04',
    title: '人資排班確認',
    owner: '人資專員',
    status: 'done',
    due: '已完成',
    note: '本週排班與出勤配置已確認',
  },
]

const warningStats = [
  {
    title: '高風險庫存',
    value: '6 項',
    meta: '低於安全庫存',
    level: 'critical',
    details: [
      { id: 'inv-01', item: 'A-102 電池模組', status: 'critical', owner: '王怡婷', updated: '今日 09:10' },
      { id: 'inv-02', item: 'B-208 包材組', status: 'warning', owner: '張皓然', updated: '今日 08:45' },
      { id: 'inv-03', item: 'C-411 轉接頭', status: 'warning', owner: '林志豪', updated: '昨日 16:20' },
      { id: 'inv-04', item: 'D-117 充電器', status: 'warning', owner: '蔡宜臻', updated: '昨日 14:50' },
      { id: 'inv-05', item: 'E-305 感測器', status: 'warning', owner: '王怡婷', updated: '昨日 11:05' },
      { id: 'inv-06', item: 'F-220 線材組', status: 'warning', owner: '林志豪', updated: '2天前 17:40' },
    ],
  },
  {
    title: '待處理採購',
    value: '18 筆',
    meta: '含 3 筆急件',
    level: 'warning',
    details: [
      { id: 'pr-01', item: '急件採購 PR-202602-31', status: 'warning', owner: '陳雅涵', updated: '今日 10:05' },
      { id: 'pr-02', item: '設備維護 PR-202602-19', status: 'pending', owner: '王怡婷', updated: '今日 09:40' },
      { id: 'pr-03', item: '包材補貨 PR-202602-17', status: 'pending', owner: '林志豪', updated: '昨日 15:30' },
      { id: 'pr-04', item: '急件採購 PR-202602-15', status: 'warning', owner: '蔡宜臻', updated: '昨日 13:20' },
      { id: 'pr-05', item: '安全庫存補充 PR-202602-14', status: 'pending', owner: '王怡婷', updated: '昨日 12:05' },
      { id: 'pr-06', item: '耗材採購 PR-202602-13', status: 'pending', owner: '張皓然', updated: '昨日 11:40' },
      { id: 'pr-07', item: '倉儲設備 PR-202602-12', status: 'pending', owner: '林志豪', updated: '昨日 10:50' },
      { id: 'pr-08', item: '急件採購 PR-202602-11', status: 'warning', owner: '陳雅涵', updated: '昨日 09:15' },
      { id: 'pr-09', item: '車隊維護 PR-202602-10', status: 'pending', owner: '張皓然', updated: '昨日 08:30' },
      { id: 'pr-10', item: '包材補貨 PR-202602-09', status: 'pending', owner: '王怡婷', updated: '2天前 17:20' },
      { id: 'pr-11', item: '採購詢價 PR-202602-08', status: 'pending', owner: '蔡宜臻', updated: '2天前 15:55' },
      { id: 'pr-12', item: '門市耗材 PR-202602-07', status: 'pending', owner: '林志豪', updated: '2天前 14:10' },
      { id: 'pr-13', item: '備援設備 PR-202602-06', status: 'pending', owner: '王怡婷', updated: '2天前 11:45' },
      { id: 'pr-14', item: '急件採購 PR-202602-05', status: 'warning', owner: '陳雅涵', updated: '2天前 10:05' },
      { id: 'pr-15', item: '包材補貨 PR-202602-04', status: 'pending', owner: '張皓然', updated: '2天前 09:30' },
      { id: 'pr-16', item: '物流耗材 PR-202602-03', status: 'pending', owner: '蔡宜臻', updated: '3天前 16:20' },
      { id: 'pr-17', item: '系統設備 PR-202602-02', status: 'pending', owner: '王怡婷', updated: '3天前 14:05' },
      { id: 'pr-18', item: '備援包材 PR-202602-01', status: 'pending', owner: '林志豪', updated: '3天前 11:50' },
    ],
  },
  {
    title: '財務異常',
    value: '2 筆',
    meta: '需核對憑證',
    level: 'warning',
    details: [
      { id: 'fin-07', item: '付款憑證 F-202602-08', status: 'warning', owner: '蔡宜臻', updated: '今日 11:20' },
      { id: 'fin-08', item: '退款憑證 F-202602-11', status: 'pending', owner: '陳雅涵', updated: '昨日 17:10' },
    ],
  },
  {
    title: '人資缺口',
    value: '3 人',
    meta: '配送與倉儲',
    level: 'info',
    details: [
      { id: 'hr-02', item: '倉儲晚班', status: 'warning', owner: '張皓然', updated: '今日 08:30' },
      { id: 'hr-03', item: '配送支援', status: 'pending', owner: '林志豪', updated: '昨日 18:00' },
      { id: 'hr-04', item: '倉儲日班', status: 'pending', owner: '王怡婷', updated: '昨日 14:20' },
    ],
  },
]

const isWarningDialogOpen = ref(!1)
const activeWarning = ref<typeof warningStats[number] | null>(null)

const openWarningDialog = (item: typeof warningStats[number]) => {
  activeWarning.value = {
    ...item,
    details: item.details ? [...item.details] : [],
  }
  isWarningDialogOpen.value = !0
}

const closeWarningDialog = () => {
  isWarningDialogOpen.value = !1
  activeWarning.value = null
}

const { modules } = useErpModules()
const erpStore = useErpStore()
const { notices } = erpStore
const roleLabel = computed(() => {
  return erpStore.roleLabels[erpStore.currentUser.role] || erpStore.currentUser.role
})
const accessSummary = computed(() => {
  const modulesList = ['總覽']
  if (erpStore.canAccessPath('/projects/shop-admin/procurement')) {
    modulesList.push('採購')
  }
  if (erpStore.canAccessPath('/projects/shop-admin/inventory')) {
    modulesList.push('庫存')
  }
  if (erpStore.canAccessPath('/projects/shop-admin/finance')) {
    modulesList.push('財務')
  }
  if (erpStore.canAccessPath('/projects/shop-admin/hr')) {
    modulesList.push('人資')
  }
  if (erpStore.canAccessPath('/projects/shop-admin/sales')) {
    modulesList.push('銷售')
  }
  if (erpStore.canAccessPath('/projects/shop-admin/reports')) {
    modulesList.push('報表')
  }
  return modulesList.join('、')
})

const setSummaryRef = (el: HTMLElement | null, index: number) => {
  summaryChartRefs.value[index] = el
}

const initSummaryCharts = () => {
  const colors = ['#ff9f4a', '#667eea', '#00d4aa', '#764ba2']
  summaryCharts.length = 0

  summaryChartRefs.value.forEach((el, index) => {
    if (!el) return
    const chart = echarts.init(el)
    const option = {
      grid: { left: '4%', right: '4%', top: '10%', bottom: '10%' },
      xAxis: { type: 'category', show: !1, data: ['1', '2', '3', '4', '5', '6'] },
      yAxis: { type: 'value', show: !1 },
      series: [
        {
          data: summary[index]?.trend || [],
          type: 'line',
          smooth: !0,
          symbol: 'none',
          lineStyle: { color: colors[index % colors.length], width: 2 },
          areaStyle: { color: '#667eea1f' },
        },
      ],
    }
    chart.setOption(option)
    summaryCharts.push(chart)
  })
}

// 初始化營收趨勢圖
const initRevenueChart = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月']
  const revenue = [11.5, 11.2, 12.1, 11.8, 12.3, 12.4]

  const option = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: !0 },
    xAxis: { type: 'category', data: months },
    yAxis: { type: 'value' },
    series: [
      {
        name: '營收(百萬)',
        data: revenue,
        type: 'line',
        smooth: !0,
        itemStyle: { color: '#667eea' },
        areaStyle: { color: '#667eea33' },
      },
    ],
  }

  if (revenueChartRef.value) {
    revenueChart = echarts.init(revenueChartRef.value)
    revenueChart.setOption(option)
  }
}

// 初始化採購狀態圖
const initProcurementChart = () => {
  const option = {
    tooltip: { trigger: 'item' },
    legend: { orient: 'horizontal', left: 'center', bottom: 0, itemGap: 12 },
    series: [
      {
        name: '採購狀態',
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '42%'],
        data: [
          { value: 28, name: '已完成' },
          { value: 18, name: '待審核' },
          { value: 12, name: '進行中' },
          { value: 5, name: '已取消' },
        ],
        label: { formatter: '{b}', overflow: 'truncate', width: 72 },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: '#00000080' },
        },
      },
    ],
  }

  if (procurementChartRef.value) {
    procurementChart = echarts.init(procurementChartRef.value)
    procurementChart.setOption(option)
  }
}

// 初始化模組效率圖
const initModuleChart = () => {
  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: !0 },
    xAxis: { type: 'category', data: ['採購', '庫存', '財務', '人資', '銷售'] },
    yAxis: { type: 'value', max: 100 },
    series: [
      {
        name: '運營效率(%)',
        data: [85, 78, 92, 88, 81],
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#667eea' },
            { offset: 1, color: '#764ba2' },
          ]),
        },
        borderRadius: [8, 8, 0, 0],
      },
    ],
  }

  if (moduleChartRef.value) {
    moduleChart = echarts.init(moduleChartRef.value)
    moduleChart.setOption(option)
  }
}

// 初始化人資配置圖
const initHrChart = () => {
  const option = {
    tooltip: { trigger: 'item' },
    legend: { orient: 'horizontal', left: 'center', bottom: 0, itemGap: 12 },
    series: [
      {
        name: '人力配置',
        type: 'pie',
        radius: ['38%', '62%'],
        center: ['50%', '42%'],
        data: [
          { value: 35, name: '採購部' },
          { value: 28, name: '倉儲部' },
          { value: 22, name: '運營部' },
          { value: 15, name: '行政部' },
        ],
        label: { formatter: '{b}', overflow: 'truncate', width: 72 },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: '#00000080' },
        },
      },
    ],
  }

  if (hrChartRef.value) {
    hrChart = echarts.init(hrChartRef.value)
    hrChart.setOption(option)
  }
}

// 初始化所有圖表
const initAllCharts = () => {
  initSummaryCharts()
  initRevenueChart()
  initProcurementChart()
  initModuleChart()
  initHrChart()
}

// 響應式調整
const handleResize = () => {
  summaryCharts.forEach((chart) => chart?.resize())
  revenueChart?.resize()
  procurementChart?.resize()
  moduleChart?.resize()
  hrChart?.resize()
}

onMounted(() => {
  initAllCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  summaryCharts.forEach((chart) => chart?.dispose())
  revenueChart?.dispose()
  procurementChart?.dispose()
  moduleChart?.dispose()
  hrChart?.dispose()
})
</script>

<style scoped>
  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .summary-card {
    background: #ffffff;
    padding: 1.25rem;
    border-radius: 1rem;
    box-shadow: 0 0.625rem 1.5rem #1f1b2d14;
  }

  .summary-card h2 {
    margin: 0.5rem 0;
    font-size: 1.75rem;
  }

  .summary-chart {
    margin-top: 0.75rem;
    height: 4rem;
  }

  .label {
    font-size: 0.75rem;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
    color: #9a7c5a;
    margin: 0;
  }

  .meta {
    font-size: 0.8125rem;
    color: #6b4f3b;
  }

  .module-section {
    background: #ffffff;
    border-radius: 1.25rem;
    padding: 1.5rem;
    box-shadow: 0 0.75rem 1.5rem #1f1b2d14;
    margin-bottom: 2rem;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(23.75rem, 1fr));
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .chart-container {
    background: #ffffff;
    border-radius: 1.25rem;
    padding: 1.5rem;
    box-shadow: 0 0.75rem 1.5rem #1f1b2d14;
  }

  .chart-container h3 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #1f1b2d;
  }

  .chart {
    width: 100%;
    height: 18.75rem;
  }

  .pie-chart {
    height: 17.5rem;
  }

  .workflow-section {
    background: #ffffff;
    border-radius: 1.25rem;
    padding: 1.5rem;
    box-shadow: 0 0.75rem 1.5rem #1f1b2d14;
    margin-bottom: 2rem;
  }

  .workflow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
    gap: 1rem;
  }

  .workflow-card {
    border: 0.0625rem solid #f0e7db;
    border-radius: 1rem;
    padding: 1rem;
    background: #fffaf4;
  }

  .workflow-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.625rem;
  }

  .workflow-card h3 {
    margin: 0 0 0.375rem;
  }

  .badge {
    padding: 0.25rem 0.625rem;
    border-radius: 62.4375rem;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
  }

  .badge.done {
    background: #d6f5e3;
    color: #1d6b45;
  }

  .badge.active {
    background: #fff2cc;
    color: #8a6d1a;
  }

  .badge.pending {
    background: #e8eef6;
    color: #38527a;
  }

  .note {
    margin: 0.25rem 0;
    font-size: 0.8125rem;
    color: #4d4a57;
  }

  .access-section {
    background: #1f1b2d;
    color: #f5f0e6;
    padding: 1.5rem;
    border-radius: 1.25rem;
  }

  .warning-section {
    background: #ffffff;
    border-radius: 1.25rem;
    padding: 1.5rem;
    box-shadow: 0 0.75rem 1.5rem #1f1b2d14;
    margin: 2rem 0;
  }

  .warning-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
    gap: 1rem;
  }

  .warning-card {
    text-decoration: none;
    color: inherit;
    display: block;
    width: 100%;
    text-align: left;
    border: none;
    border-radius: 1rem;
    padding: 1rem;
    background: #fff7ef;
    border: 0.0625rem solid #ff9f4a33;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }

  .warning-card:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.625rem 1.25rem #1f1b2d1f;
  }

  .warning-card.critical {
    background: #fff1f2;
    border-color: #dc354540;
  }

  .warning-card.warning {
    background: #fff8e6;
    border-color: #ffc10740;
  }

  .warning-card.info {
    background: #f2f6ff;
    border-color: #667eea40;
  }

  .warning-title {
    font-size: 0.75rem;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
    color: #9a7c5a;
  }

  .warning-value {
    margin: 0.5rem 0 0.25rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f1b2d;
  }

  .warning-meta {
    font-size: 0.8125rem;
    color: #6b4f3b;
  }

  .warning-cta {
    margin-top: 0.625rem;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b4f3b;
  }

  .dialog-backdrop {
    position: fixed;
    inset: 0;
    background: #0f121e8c;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 200;
  }

  .dialog {
    background: #ffffff;
    border-radius: 1.25rem;
    width: min(53.75rem, 100%);
    box-shadow: 0 1.25rem 2.5rem #0f121e33;
    overflow: hidden;
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.125rem 1.5rem;
    border-bottom: 0.0625rem solid #1f1b2d14;
  }

  .dialog-header h3 {
    margin: 0;
    font-size: 1.125rem;
    color: #1f1b2d;
  }

  .dialog-value {
    margin-top: 0.375rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f1b2d;
  }

  .dialog-close {
    background: #f3f4f8;
    border: none;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b4f3b;
  }

  .dialog-body {
    padding: 1.25rem 1.5rem 1.75rem;
  }

  .dialog-subtitle {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    color: #6b4f3b;
  }

  .dialog-table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .dialog-table th,
  .dialog-table td {
    text-align: left;
    padding: 0.75rem;
    border-bottom: 0.0625rem solid #1f1b2d14;
  }

  .dialog-table th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
    color: #9a7c5a;
  }

  .access-card p {
    margin: 0.375rem 0;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .pill {
    background: #ffecd6;
    color: #b27936;
    padding: 0.375rem 0.75rem;
    border-radius: 62.4375rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .pill.warn {
    background: #fff1cc;
    color: #8a6d1a;
  }

  .module-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 1rem;
  }

  .module-card {
    border: 0.0625rem solid #f0e7db;
    border-radius: 1rem;
    padding: 1rem;
    background: #fffaf4;
  }

  .module-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .status {
    padding: 0.25rem 0.625rem;
    border-radius: 62.4375rem;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
  }

  .status.active {
    background: #d6f5e3;
    color: #1d6b45;
  }

  .status.pending {
    background: #fff2cc;
    color: #8a6d1a;
  }

  .status.blocked {
    background: #ffe0df;
    color: #a6342e;
  }

  .owner,
  .kpi,
  .update {
    margin: 0.25rem 0;
    font-size: 0.8125rem;
    color: #4d4a57;
  }

  .notice-section h2 {
    margin-bottom: 1rem;
  }

  .notice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13.75rem, 1fr));
    gap: 1rem;
  }

  .notice-card {
    background: #1f1b2d;
    color: #f5f0e6;
    padding: 1.125rem;
    border-radius: 1rem;
  }

  .notice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .level {
    padding: 0.25rem 0.625rem;
    border-radius: 62.4375rem;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
  }

  .level.info {
    background: #ffffff33;
  }

  .level.warn {
    background: #ff9f4a33;
    color: #ffb56b;
  }

  :global(.dark-mode) .erp-dashboard {
    color: #e6e9f2;
  }

  :global(.dark-mode) .summary-card,
  :global(.dark-mode) .module-section,
  :global(.dark-mode) .workflow-section,
  :global(.dark-mode) .chart-container,
  :global(.dark-mode) .warning-section,
  :global(.dark-mode) .dialog,
  :global(.dark-mode) .module-card {
    background: #1b1f32;
    box-shadow: 0 0.75rem 1.5rem #080a1466;
    border-color: #e6e9f214;
  }

  :global(.dark-mode) .warning-card {
    background: #1b1f32;
    border-color: #ff9f4a2e;
  }

  :global(.dark-mode) .warning-card.critical {
    background: #2a1d24;
  }

  :global(.dark-mode) .warning-card.warning {
    background: #2a2416;
  }

  :global(.dark-mode) .warning-card.info {
    background: #1e2336;
  }

  :global(.dark-mode) .dialog-header {
    border-bottom-color: #e6e9f214;
  }

  :global(.dark-mode) .dialog-close {
    background: #e6e9f21f;
    color: #e6e9f2;
  }

  :global(.dark-mode) .dialog-table th,
  :global(.dark-mode) .dialog-table td {
    border-bottom-color: #e6e9f214;
  }

  :global(.dark-mode) .dialog-header h3,
  :global(.dark-mode) .dialog-value,
  :global(.dark-mode) .dialog-table th,
  :global(.dark-mode) .dialog-table td {
    color: #e6e9f2;
  }

  :global(.dark-mode) .notice-card {
    background: #111524;
  }

  :global(.dark-mode) .note,
  :global(.dark-mode) .owner,
  :global(.dark-mode) .kpi,
  :global(.dark-mode) .update,
  :global(.dark-mode) .warning-meta,
  :global(.dark-mode) .dialog-subtitle {
    color: #e6e9f2b3;
  }

  .level.critical {
    background: #ff005533;
    color: #ff8fa1;
  }

  .time {
    display: block;
    margin-top: 0.75rem;
    font-size: 0.75rem;
    color: #f5f0e6b3;
  }
</style>
