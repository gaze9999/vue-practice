/**
 * Composables - Reusable Logic
 * Example composable for data fetching with loading and error states
 */

export interface UseDataFetchOptions {
  immediate?: boolean
}

export interface UseDataFetchReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  refetch: () => Promise<void>
}

/**
 * Generic fetch composable (renamed to avoid conflict with built-in useFetch)
 */
export const useDataFetch = <T = unknown>(
  url: string,
  options: UseDataFetchOptions = {}
): UseDataFetchReturn<T> => {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetch = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<T>(url)
      data.value = response
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error')
    } finally {
      loading.value = false
    }
  }

  if (options.immediate ?? true) {
    fetch()
  }

  return {
    data: data as Ref<T | null>,
    loading,
    error,
    refetch: fetch,
  }
}
