/**
 * 庫存 Store
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { inventoryService } from '../services';
import type { InventoryItem } from '../types';

export const useInventoryStore = defineStore('shop-inventory', () => {
  const inventoryList = ref<InventoryItem[]>([]);
  const loading = ref(!1);
  const error = ref<string | void>(void 0);

  const hasItems = computed(() => inventoryList.value.length > 0);
  const warningItems = computed(() =>
    inventoryList.value.filter((item) => item.status !== 'normal')
  );

  const fetchInventory = async () => {
    loading.value = !0;
    error.value = void 0;

    try {
      inventoryList.value = await inventoryService.getInventoryList();
      console.log('[useInventoryStore] fetchInventory success');
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤';
      inventoryList.value = [];
      console.error('[useInventoryStore] fetchInventory error:', err);
    } finally {
      loading.value = !1;
    }
  };

  const resetState = () => {
    inventoryList.value = [];
    loading.value = !1;
    error.value = void 0;
  };

  return {
    inventoryList,
    loading,
    error,
    hasItems,
    warningItems,
    fetchInventory,
    resetState,
  };
});
