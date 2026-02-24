<template>
  <section class="page-block">
    <div class="header">
      <div>
        <h2>憑證與結帳明細</h2>
        <p class="lead">掌握本期憑證與應收應付對帳狀態。</p>
      </div>
      <div class="badge">可存取：系統管理、財務專員</div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>憑證編號</th>
          <th>類型</th>
          <th>金額</th>
          <th>期間</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in vouchers" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.type }}</td>
          <td>{{ row.amount }}</td>
          <td>{{ row.period }}</td>
          <td><span :class="['status', row.status]">{{ row.status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="note-card">
      <h3>提醒</h3>
      <p>月結前需完成所有憑證覆核，避免報表延遲。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { vouchersMockData } from '~/shared/mocks/shop-admin'

definePageMeta({
  layout: 'shop-admin',
  middleware: 'erp-auth',
})

const vouchers = vouchersMockData
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
