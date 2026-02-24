/**
 * 採購 Store
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { procurementService } from '../services';
import type { ProcurementRequest } from '../types';

export const useProcurementStore = defineStore('shop-procurement', () => {
  const requestList = ref<ProcurementRequest[]>([]);
  const loading = ref(!1);
  const error = ref<string | void>(void 0);

  const hasRequests = computed(() => requestList.value.length > 0);
  const pendingRequests = computed(() =>
    requestList.value.filter((req) => req.status === 'submitted' || req.status === 'draft')
  );

  const fetchRequests = async () => {
    loading.value = !0;
    error.value = void 0;

    try {
      requestList.value = await procurementService.getProcurementRequests();
      console.log('[useProcurementStore] fetchRequests success');
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤';
      requestList.value = [];
      console.error('[useProcurementStore] fetchRequests error:', err);
    } finally {
      loading.value = !1;
    }
  };

  const resetState = () => {
    requestList.value = [];
    loading.value = !1;
    error.value = void 0;
  };

  return {
    requestList,
    loading,
    error,
    hasRequests,
    pendingRequests,
    fetchRequests,
    resetState,
  };
});
