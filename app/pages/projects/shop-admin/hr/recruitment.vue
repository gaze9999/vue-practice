<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>招募進度</h2>
        <p class="lead">追蹤職缺、面談安排與錄用狀態。</p>
      </div>
      <div class="badge">可存取：系統管理、人資專員</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>職缺</th>
          <th>進度</th>
          <th>負責人</th>
          <th>面談場次</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in recruitments" :key="row.role">
          <td>{{ row.role }}</td>
          <td>{{ row.stage }}</td>
          <td>{{ row.owner }}</td>
          <td>{{ row.sessions }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>提醒</h3>
      <p>人力缺口較高的職缺需優先安排面談。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { recruitmentMockData } from '~/shared/mocks'

definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

const recruitments = recruitmentMockData
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
