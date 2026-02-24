<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>庫存調整單</h2>
        <p class="lead">盤點差異與調整原因彙整。</p>
      </div>
      <div class="badge">可存取：系統管理、營運主管</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>調整單號</th>
          <th>品項</th>
          <th>差異</th>
          <th>原因</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in adjustments" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.item }}</td>
          <td>{{ row.diff }}</td>
          <td>{{ row.reason }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>注意事項</h3>
      <p>差異達門檻時需同步財務覆核並更新庫位。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { adjustmentsMockData } from '~/shared/mocks'

definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

const adjustments = adjustmentsMockData
</script>

<style scoped>
  .page-block {
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 1.125rem;
    box-shadow: 0 0.75rem 1.5rem #1f1b2d14;
  }

  .header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .lead {
    color: #4d4a57;
  }

  .badge {
    background: #fff4e7;
    color: #6b4f3b;
    padding: 0.375rem 0.75rem;
    border-radius: 62.4375rem;
    font-size: 0.75rem;
    font-weight: 600;
    height: fit-content;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8125rem;
  }

  .data-table th,
  .data-table td {
    padding: 0.625rem 0.75rem;
    border-bottom: 0.0625rem solid #f0e7db;
    text-align: left;
  }

  .status {
    padding: 0.25rem 0.625rem;
    border-radius: 62.4375rem;
    font-size: 0.6875rem;
    text-transform: uppercase;
  }

  .status.done {
    background: #d6f5e3;
    color: #1d6b45;
  }

  .status.active {
    background: #fff2cc;
    color: #8a6d1a;
  }

  .status.pending {
    background: #e8eef6;
    color: #38527a;
  }

  .note-card {
    margin-top: 1.25rem;
    padding: 1rem;
    background: #fdf6ef;
    border-radius: 0.875rem;
  }
</style>
