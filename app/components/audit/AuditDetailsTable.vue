<template>
  <div class="audit-table" :class="{ 'is-scroll': rows.length > 10 }">
    <table>
      <thead>
        <tr>
          <th>檢查項</th>
          <th>結果</th>
          <th>發現問題</th>
          <th>改進建議</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in rows" :key="item.id">
          <td><strong>{{ item.name }}</strong></td>
          <td>
            <span :class="['badge', item.result]">{{ item.result }}</span>
          </td>
          <td>{{ item.issue }}</td>
          <td>{{ item.suggestion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface AuditRow {
  id: number
  name: string
  result: string
  issue: string
  suggestion: string
}

interface Props {
  rows: AuditRow[]
}

defineProps<Props>()
</script>

<style scoped>
.audit-table {
  width: 100%;
}

.audit-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.audit-table th,
.audit-table td {
  text-align: left;
  padding: 0.75rem;
  border-bottom: 0.0625rem solid #1f1b2d14;
}

.audit-table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
  color: #9a7c5a;
  position: sticky;
  top: 0;
  background: #ffffff;
}

.audit-table.is-scroll {
  max-height: 22.5rem;
  overflow-y: auto;
  border: 0.0625rem solid #1f1b2d0f;
  border-radius: 0.75rem;
}

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 62.4375rem;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
}

.badge.通過 {
  background: #d6f5e3;
  color: #1d6b45;
}

.badge.警告 {
  background: #fff2cc;
  color: #8a6d1a;
}

.badge.失敗 {
  background: #ffe0df;
  color: #a6342e;
}

:global(.dark-mode) .audit-table th {
  background: #1b1f32;
  color: #cfd6e6;
}

:global(.dark-mode) .audit-table td {
  color: #e6e9f2;
}

:global(.dark-mode) .audit-table th,
:global(.dark-mode) .audit-table td {
  border-bottom-color: #e6e9f214;
}

:global(.dark-mode) .audit-table.is-scroll {
  border-color: #e6e9f21f;
  background: #1b1f32;
}

:global(.dark-mode) .badge.通過 {
  background: #1d6b454d;
  color: #5ff5a0;
}

:global(.dark-mode) .badge.警告 {
  background: #8a6d1a4d;
  color: #ffd966;
}

:global(.dark-mode) .badge.失敗 {
  background: #a6342e4d;
  color: #ff9494;
}
</style>
