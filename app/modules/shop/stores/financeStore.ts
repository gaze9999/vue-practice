/**
 * 財務 Store - Pinia 狀態管理
 * 職責：維護財務模組的反應式狀態
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { financeService } from '../services';
import type { FinanceListRequest, VoucherItem } from '../types';

export const useFinanceStore = defineStore('shop-finance', () => {
  // ============= 狀態 =============
  const voucherList = ref<VoucherItem[]>([]);
  const loading = ref(!1); // false
  const error = ref<string | void>(void 0); // undefined
  const pagination = ref({ page: 1, pageSize: 20, total: 0 });

  // ============= 計算屬性 =============
  const hasVouchers = computed(() => voucherList.value.length > 0);
  const totalPages = computed(() =>
    Math.ceil(pagination.value.total / pagination.value.pageSize)
  );

  // ============= 非同步操作 =============
  /**
   * 載入憑證列表
   */
  const fetchVouchers = async (request: FinanceListRequest) => {
    loading.value = !0; // true
    error.value = void 0; // undefined

    try {
      const response = await financeService.getVouchers(request);
      voucherList.value = response.items;
      pagination.value = response.pagination;

      console.log('[useFinanceStore] fetchVouchers success:', response);
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤';
      voucherList.value = [];
      console.error('[useFinanceStore] fetchVouchers error:', err);
    } finally {
      loading.value = !1; // false
    }
  };

  /**
   * 重設狀態
   */
  const resetState = () => {
    voucherList.value = [];
    loading.value = !1;
    error.value = void 0;
    pagination.value = { page: 1, pageSize: 20, total: 0 };
  };

  return {
    // 狀態
    voucherList,
    loading,
    error,
    pagination,
    // 計算屬性
    hasVouchers,
    totalPages,
    // 方法
    fetchVouchers,
    resetState,
  };
});
