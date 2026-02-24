/**
 * Composables - Reusable Logic
 * 通用資料獲取 composable
 */

export interface UseDataFetchOptions {
  immediate?: boolean;
}

export interface UseDataFetchReturn<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  refetch: () => Promise<void>;
}

/**
 * 通用數據獲取 Composable
 * @param url - 請求 URL
 * @param options - 配置選項
 * @returns 資料、載入狀態、錯誤及重新獲取方法
 */
export const useDataFetch = <T = unknown>(
  url: string,
  options: UseDataFetchOptions = {}
): UseDataFetchReturn<T> => {
  const data = ref<T | null>(null);
  const loading = ref(!1); // false
  const error = ref<Error | null>(null);

  const fetch = async (): Promise<void> => {
    loading.value = !0; // true
    error.value = null;

    try {
      const response = await $fetch<T>(url);
      data.value = response;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('未知錯誤');
    } finally {
      loading.value = !1; // false
    }
  };

  if (options.immediate ?? !0) {
    fetch();
  }

  return {
    data: data as Ref<T | null>,
    loading,
    error,
    refetch: fetch,
  };
};
