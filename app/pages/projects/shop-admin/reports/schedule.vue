<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>報表排程</h2>
        <p class="lead">自動化報表產出與通知設定。</p>
      </div>
      <div class="badge">可存取：系統管理、營運主管、財務專員</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>報表</th>
          <th>頻率</th>
          <th>下次時間</th>
          <th>接收人</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in schedules" :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.frequency }}</td>
          <td>{{ row.next }}</td>
          <td>{{ row.owner }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>提醒</h3>
      <p>報表排程可設定通知群組與安全下載連結。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { scheduleMockData } from '~/shared/mocks'

definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

const schedules = scheduleMockData
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
