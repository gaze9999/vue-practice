<template>
  <div class="results-page">
    <header class="page-header">
      <h1>審計結果</h1>
      <p class="subtitle">查看和分析審計檢查結果</p>
    </header>

    <!-- 結果統計 -->
    <section class="summary-section">
      <h2>結果摘要</h2>
      <div class="summary-cards">
        <div class="summary-card pass">
          <span class="summary-icon">✅</span>
          <div class="summary-content">
            <span class="summary-label">檢查通過</span>
            <span class="summary-value">{{ passedCount }}</span>
          </div>
        </div>

        <div class="summary-card fail">
          <span class="summary-icon">❌</span>
          <div class="summary-content">
            <span class="summary-label">檢查失敗</span>
            <span class="summary-value">{{ failedCount }}</span>
          </div>
        </div>

        <div class="summary-card warning">
          <span class="summary-icon">⚠️</span>
          <div class="summary-content">
            <span class="summary-label">警告項目</span>
            <span class="summary-value">{{ warningCount }}</span>
          </div>
        </div>

        <div class="summary-card pending">
          <span class="summary-icon">⏳</span>
          <div class="summary-content">
            <span class="summary-label">待執行</span>
            <span class="summary-value">{{ pendingCount }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 合規統計圖表 -->
    <section class="compliance-chart">
      <h2>合規統計</h2>
      <div class="chart-container">
        <div class="pie-chart">
          <div class="pie-slice pass" :style="{ width: `${passedPercent}%` }"></div>
          <div class="pie-slice warning" :style="{ width: `${warningPercent}%` }"></div>
          <div class="pie-slice fail" :style="{ width: `${failedPercent}%` }"></div>
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-color pass"></span>
            <span>通過 {{ passedCount }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color warning"></span>
            <span>警告 {{ warningCount }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color fail"></span>
            <span>失敗 {{ failedCount }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 結果清單 -->
    <section class="results-list-section">
      <h2>詳細結果</h2>
      <div class="results-table">
        <table>
          <thead>
            <tr>
              <th>檢查項目</th>
              <th>結果</th>
              <th>執行時間</th>
              <th>備註</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in resultsList" :key="result.id" :class="`result-${result.status}`">
              <td class="name-cell">
                <NuxtLink :to="`/projects/audit/checks/${result.checkId}`">
                  {{ result.name }}
                </NuxtLink>
              </td>
              <td>
                <span :class="['result-badge', `result-${result.status}`]">
                  {{ result.status }}
                </span>
              </td>
              <td>{{ result.executedAt }}</td>
              <td class="remarks">{{ result.remarks }}</td>
              <td class="action-cell">
                <button class="action-btn">詳情</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 導出選項 -->
    <section class="export-section">
      <h2>導出報告</h2>
      <div class="export-buttons">
        <button class="export-btn"><i class="fas fa-file-pdf"></i> 導出 PDF</button>
        <button class="export-btn"><i class="fas fa-file-excel"></i> 導出 Excel</button>
        <button class="export-btn"><i class="fas fa-file-csv"></i> 導出 CSV</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  // console 呼叫保留
  console.log('Audit Results page loaded')

  interface Result {
    id: string
    checkId: string
    name: string
    status: string
    executedAt: string
    remarks: string
  }

  const passedCount = ref(28)
  const failedCount = ref(3)
  const warningCount = ref(5)
  const pendingCount = ref(4)

  const total = computed(
    () => passedCount.value + failedCount.value + warningCount.value + pendingCount.value
  )
  const passedPercent = computed(() => (passedCount.value / total.value) * 100)
  const warningPercent = computed(() => (warningCount.value / total.value) * 100)
  const failedPercent = computed(() => (failedCount.value / total.value) * 100)

  const resultsList = ref<Result[]>([
    {
      id: '1',
      checkId: 'CHK001',
      name: '資料加密檢查',
      status: 'pass',
      executedAt: '2024-02-10 14:30',
      remarks: '所有數據加密配置正確',
    },
    {
      id: '2',
      checkId: 'CHK002',
      name: '存取控制檢查',
      status: 'warning',
      executedAt: '2024-02-10 14:25',
      remarks: '部分舊帳戶未遵守新規則',
    },
    {
      id: '3',
      checkId: 'CHK003',
      name: '密碼強度檢查',
      status: 'pass',
      executedAt: '2024-02-09 10:15',
      remarks: '密碼強度符合標準',
    },
    {
      id: '4',
      checkId: 'CHK004',
      name: '備份完整性檢查',
      status: 'fail',
      executedAt: '2024-02-08 09:00',
      remarks: '發現 3 個損壞的備份檔案',
    },
    {
      id: '5',
      checkId: 'CHK005',
      name: '日誌記錄檢查',
      status: 'fail',
      executedAt: '2024-02-08 16:45',
      remarks: '某些關鍵操作日誌丟失',
    },
  ])
</script>

<style scoped lang="scss">
  .results-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 32px;

    h1 {
      margin: 0 0 8px;
      font-size: 32px;
      font-weight: 700;
      color: #1e2330;
    }

    .subtitle {
      margin: 0;
      font-size: 16px;
      color: #565f79;
    }
  }

  .summary-section {
    margin-bottom: 32px;

    h2 {
      margin: 0 0 20px;
      font-size: 18px;
      color: #1e2330;
    }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .summary-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 10px;
      border-left: 4px solid;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      &.pass {
        border-left-color: #28a745;
        .summary-icon {
          color: #28a745;
        }
      }

      &.fail {
        border-left-color: #d32f2f;
        .summary-icon {
          color: #d32f2f;
        }
      }

      &.warning {
        border-left-color: #f39c12;
        .summary-icon {
          color: #f39c12;
        }
      }

      &.pending {
        border-left-color: #667eea;
        .summary-icon {
          color: #667eea;
        }
      }

      .summary-icon {
        font-size: 32px;
      }

      .summary-content {
        flex: 1;
      }

      .summary-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: #8c95a7;
        margin-bottom: 4px;
      }

      .summary-value {
        display: block;
        font-size: 28px;
        font-weight: 700;
        color: #1e2330;
      }
    }
  }

  .compliance-chart {
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 32px;

    h2 {
      margin: 0 0 24px;
      font-size: 18px;
      color: #1e2330;
    }

    .chart-container {
      display: flex;
      align-items: center;
      gap: 40px;
    }

    .pie-chart {
      display: flex;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      .pie-slice {
        &.pass {
          background: #28a745;
        }

        &.warning {
          background: #f39c12;
        }

        &.fail {
          background: #d32f2f;
        }
      }
    }

    .chart-legend {
      display: grid;
      gap: 12px;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        color: #565f79;

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 3px;

          &.pass {
            background: #28a745;
          }

          &.warning {
            background: #f39c12;
          }

          &.fail {
            background: #d32f2f;
          }
        }
      }
    }
  }

  .results-list-section {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 24px;
    margin-bottom: 32px;

    h2 {
      margin: 0 0 20px;
      font-size: 18px;
      color: #1e2330;
    }

    .results-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;

      thead {
        background: #f7f9fc;
        border-bottom: 2px solid #e8ecf5;

        th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #1e2330;
        }
      }

      tbody tr {
        border-bottom: 1px solid #e8ecf5;
        transition: background 0.2s ease;

        &:hover {
          background: #f7f9fc;
        }
      }

      td {
        padding: 12px 16px;
        color: #565f79;
      }

      .name-cell {
        font-weight: 500;

        a {
          color: #667eea;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .remarks {
        font-size: 13px;
        color: #8c95a7;
      }

      .result-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;

        &.result-pass {
          background: #d4edda;
          color: #155724;
        }

        &.result-warning {
          background: #fff3cd;
          color: #856404;
        }

        &.result-fail {
          background: #f8d7da;
          color: #721c24;
        }
      }

      .action-cell {
        text-align: center;

        .action-btn {
          padding: 6px 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: #5568d3;
          }
        }
      }
    }
  }

  .export-section {
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h2 {
      margin: 0 0 16px;
      font-size: 18px;
      color: #1e2330;
    }

    .export-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;

      .export-btn {
        padding: 12px 24px;
        background: #e8ecf5;
        color: #667eea;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #667eea;
          color: white;
        }
      }
    }
  }
</style>
