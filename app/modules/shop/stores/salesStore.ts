/**
 * 銷售 Store
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { salesService } from '../services';
import type { SalesOrder, SalesPipeline } from '../types';

export const useSalesStore = defineStore('shop-sales', () => {
  const orderList = ref<SalesOrder[]>([]);
  const pipelineList = ref<SalesPipeline[]>([]);
  const loading = ref(!1);
  const error = ref<string | void>(void 0);

  const hasOrders = computed(() => orderList.value.length > 0);
  const totalOrderAmount = computed(() =>
    orderList.value.reduce((sum, order) => sum + order.totalAmount, 0)
  );

  const fetchOrders = async () => {
    loading.value = !0;
    error.value = void 0;

    try {
      orderList.value = await salesService.getSalesOrders();
      pipelineList.value = await salesService.getSalesPipeline();
      console.log('[useSalesStore] fetchOrders success');
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤';
      orderList.value = [];
      pipelineList.value = [];
      console.error('[useSalesStore] fetchOrders error:', err);
    } finally {
      loading.value = !1;
    }
  };

  const resetState = () => {
    orderList.value = [];
    pipelineList.value = [];
    loading.value = !1;
    error.value = void 0;
  };

  return {
    orderList,
    pipelineList,
    loading,
    error,
    hasOrders,
    totalOrderAmount,
    fetchOrders,
    resetState,
  };
});
