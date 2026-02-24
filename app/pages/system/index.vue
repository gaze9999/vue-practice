<template>
  <div class="system-config-page">
    <header class="page-header">
      <h1>系統配置</h1>
      <p class="subtitle">管理系統設定和使用者權限</p>
    </header>

    <!-- 配置選項卡 -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 基本配置 -->
    <section v-show="activeTab === 'basic'" class="config-section">
      <h2>基本設定</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>系統名稱</label>
          <input v-model="config.systemName" type="text" class="form-input" />
        </div>

        <div class="form-group">
          <label>系統版本</label>
          <input v-model="config.version" type="text" class="form-input" disabled />
        </div>

        <div class="form-group">
          <label>時區</label>
          <select v-model="config.timezone" class="form-select">
            <option>UTC+8 (台北)</option>
            <option>UTC+0 (倫敦)</option>
            <option>UTC-5 (紐約)</option>
          </select>
        </div>

        <div class="form-group">
          <label>語言</label>
          <select v-model="config.language" class="form-select">
            <option>繁體中文</option>
            <option>簡體中文</option>
            <option>English</option>
          </select>
        </div>

        <div class="form-group full">
          <label>
            <input v-model="config.autoBackup" type="checkbox" />
            自動備份設定
          </label>
        </div>

        <div class="form-group full">
          <label>
            <input v-model="config.enableNotifications" type="checkbox" />
            啟用通知
          </label>
        </div>
      </div>

      <button class="btn btn-primary">保存設定</button>
    </section>

    <!-- 使用者管理 -->
    <section v-show="activeTab === 'users'" class="config-section">
      <div class="section-header">
        <h2>使用者管理</h2>
        <button class="btn btn-primary">+ 新增使用者</button>
      </div>

      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>使用者名稱</th>
              <th>電子郵件</th>
              <th>角色</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="name-cell">{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="['role-badge', `role-${user.role}`]">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span :class="['status-badge', `status-${user.status}`]">
                  {{ user.status }}
                </span>
              </td>
              <td class="action-cell">
                <button class="action-btn">編輯</button>
                <button class="action-btn delete">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 日誌設定 -->
    <section v-show="activeTab === 'logs'" class="config-section">
      <h2>日誌設定</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>日誌保留期限（天）</label>
          <input v-model="config.logRetention" type="number" class="form-input" />
        </div>

        <div class="form-group">
          <label>日誌級別</label>
          <select v-model="config.logLevel" class="form-select">
            <option>DEBUG</option>
            <option>INFO</option>
            <option>WARN</option>
            <option>ERROR</option>
          </select>
        </div>

        <div class="form-group full">
          <label>
            <input v-model="config.logToFile" type="checkbox" />
            記錄到檔案
          </label>
        </div>

        <div class="form-group full">
          <label>
            <input v-model="config.logToDatabase" type="checkbox" />
            記錄到數據庫
          </label>
        </div>
      </div>

      <button class="btn btn-primary">保存設定</button>
    </section>

    <!-- 安全設定 -->
    <section v-show="activeTab === 'security'" class="config-section">
      <h2>安全設定</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>會話超時（分鐘）</label>
          <input v-model="config.sessionTimeout" type="number" class="form-input" />
        </div>

        <div class="form-group">
          <label>密碼最小長度</label>
          <input v-model="config.passwordMinLength" type="number" class="form-input" />
        </div>

        <div class="form-group">
          <label>密碼有效期（天）</label>
          <input v-model="config.passwordExpiry" type="number" class="form-input" />
        </div>

        <div class="form-group full">
          <label>
            <input v-model="config.require2FA" type="checkbox" />
            要求雙因素認證
          </label>
        </div>

        <div class="form-group full">
          <label>
            <input v-model="config.enforceSSL" type="checkbox" />
            強制 SSL/TLS
          </label>
        </div>

        <div class="form-group full">
          <label>
            <input v-model="config.logFailedAttempts" type="checkbox" />
            記錄失敗的登入嘗試
          </label>
        </div>
      </div>

      <button class="btn btn-primary">保存設定</button>
    </section>
  </div>
</template>

<script setup lang="ts">
  // console 呼叫保留
  console.log('System Config page loaded')

  interface User {
    id: string
    name: string
    email: string
    role: string
    status: string
  }

  const tabs = ref([
    { id: 'basic', label: '基本設定' },
    { id: 'users', label: '使用者管理' },
    { id: 'logs', label: '日誌設定' },
    { id: 'security', label: '安全設定' },
  ])

  const activeTab = ref('basic')

  const config = ref({
    systemName: '合規審計系統',
    version: 'v1.0.0',
    timezone: 'UTC+8 (台北)',
    language: '繁體中文',
    autoBackup: !0,
    enableNotifications: !0,
    logRetention: 90,
    logLevel: 'INFO',
    logToFile: !0,
    logToDatabase: !0,
    sessionTimeout: 30,
    passwordMinLength: 8,
    passwordExpiry: 90,
    require2FA: !0,
    enforceSSL: !0,
    logFailedAttempts: !0,
  })

  const users = ref<User[]>([
    {
      id: '001',
      name: '管理員',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
    },
    {
      id: '002',
      name: '審計人員',
      email: 'auditor@example.com',
      role: 'auditor',
      status: 'active',
    },
    {
      id: '003',
      name: '檢查員',
      email: 'checker@example.com',
      role: 'checker',
      status: 'active',
    },
    {
      id: '004',
      name: '查看者',
      email: 'viewer@example.com',
      role: 'viewer',
      status: 'inactive',
    },
  ])
</script>

<style scoped lang="scss">
  .system-config-page {
    padding: 20px;
    max-width: 1000px;
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

  .tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    border-bottom: 2px solid #e8ecf5;

    .tab-button {
      padding: 12px 20px;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      font-size: 14px;
      font-weight: 600;
      color: #565f79;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: #1e2330;
      }

      &.active {
        color: #667eea;
        border-bottom-color: #667eea;
      }
    }
  }

  .config-section {
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    animation: slideIn 0.3s ease;

    h2 {
      margin: 0 0 24px;
      font-size: 18px;
      font-weight: 700;
      color: #1e2330;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      h2 {
        margin: 0;
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 24px;

    .form-group {
      display: flex;
      flex-direction: column;

      &.full {
        grid-column: 1 / -1;
      }

      label {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #1e2330;

        input[type='checkbox'] {
          margin-right: 8px;
        }
      }

      input[type='checkbox'] {
        cursor: pointer;
      }
    }
  }

  .form-input,
  .form-select {
    padding: 10px 12px;
    border: 1px solid #e8ecf5;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &:disabled {
      background: #f7f9fc;
      color: #8c95a7;
      cursor: not-allowed;
    }
  }

  .users-table {
    overflow-x: auto;
    margin-bottom: 24px;

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

        &:hover {
          background: #f7f9fc;
        }
      }

      td {
        padding: 12px 16px;
        color: #565f79;
      }

      .name-cell {
        font-weight: 600;
        color: #1e2330;
      }

      .role-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;

        &.role-admin {
          background: #ffe8e8;
          color: #d32f2f;
        }

        &.role-auditor {
          background: #fff3cd;
          color: #856404;
        }

        &.role-checker {
          background: #e8f0ff;
          color: #1e40af;
        }

        &.role-viewer {
          background: #e8ecf5;
          color: #565f79;
        }
      }

      .status-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;

        &.status-active {
          background: #d4edda;
          color: #155724;
        }

        &.status-inactive {
          background: #e8ecf5;
          color: #565f79;
        }
      }

      .action-cell {
        display: flex;
        gap: 8px;
      }

      .action-btn {
        padding: 6px 12px;
        background: #e8ecf5;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        color: #667eea;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #667eea;
          color: white;
        }

        &.delete {
          background: #ffe8e8;
          color: #d32f2f;

          &:hover {
            background: #d32f2f;
            color: white;
          }
        }
      }
    }
  }

  .btn {
    padding: 12px 28px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &.btn-primary {
      background: #667eea;
      color: white;

      &:hover {
        background: #5568d3;
      }
    }
  }
</style>
