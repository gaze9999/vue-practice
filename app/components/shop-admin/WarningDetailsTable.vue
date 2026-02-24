<template>
  <div class="warning-table" :class="{ 'is-scroll': rows.length > 10 }">
    <table>
      <thead>
        <tr>
          <th>項目</th>
          <th>狀態</th>
          <th>負責人</th>
          <th>更新時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.item }}</td>
          <td><span :class="['level', row.status]">{{ row.status }}</span></td>
          <td>{{ row.owner }}</td>
          <td>{{ row.updated }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface WarningRow {
  id: string
  item: string
  status: string
  owner: string
  updated: string
}

interface Props {
  rows: WarningRow[]
}

defineProps<Props>()
</script>

<style scoped>
.warning-table {
  width: 100%;
}

.warning-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.warning-table th,
.warning-table td {
  text-align: left;
  padding: 0.75rem;
  border-bottom: 0.0625rem solid #1f1b2d14;
}

.warning-table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
  color: #9a7c5a;
  position: sticky;
  top: 0;
  background: #ffffff;
}

.warning-table.is-scroll {
  max-height: 22.5rem;
  overflow-y: auto;
  border: 0.0625rem solid #1f1b2d0f;
  border-radius: 0.75rem;
}

:global(.dark-mode) .warning-table th {
  background: #1b1f32;
  color: #cfd6e6;
}

:global(.dark-mode) .warning-table td {
  color: #e6e9f2;
}

:global(.dark-mode) .warning-table th,
:global(.dark-mode) .warning-table td {
  border-bottom-color: #e6e9f214;
}

:global(.dark-mode) .warning-table.is-scroll {
  border-color: #e6e9f21f;
  background: #1b1f32;
}
</style>
