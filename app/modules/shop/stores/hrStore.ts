/**
 * 人資 Store
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { hrService } from '../services';
import type { EmployeeAttendance, EmployeeRecruitment } from '../types';

export const useHRStore = defineStore('shop-hr', () => {
  const recruitmentList = ref<EmployeeRecruitment[]>([]);
  const attendanceList = ref<EmployeeAttendance[]>([]);
  const loading = ref(!1);
  const error = ref<string | void>(void 0);

  const hasRecruitments = computed(() => recruitmentList.value.length > 0);
  const openPositions = computed(() =>
    recruitmentList.value.filter((rec) => rec.status === 'open')
  );

  const fetchData = async () => {
    loading.value = !0;
    error.value = void 0;

    try {
      recruitmentList.value = await hrService.getRecruitments();
      attendanceList.value = await hrService.getAttendance();
      console.log('[useHRStore] fetchData success');
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知錯誤';
      recruitmentList.value = [];
      attendanceList.value = [];
      console.error('[useHRStore] fetchData error:', err);
    } finally {
      loading.value = !1;
    }
  };

  const resetState = () => {
    recruitmentList.value = [];
    attendanceList.value = [];
    loading.value = !1;
    error.value = void 0;
  };

  return {
    recruitmentList,
    attendanceList,
    loading,
    error,
    hasRecruitments,
    openPositions,
    fetchData,
    resetState,
  };
});
