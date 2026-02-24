/**
 * 認證中間件
 * ERP 系統路由認證中間件，用於檢查使用者權限
 */

import type { RouteLocationNormalized } from 'vue-router';

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // console 呼叫保留
    console.log(`[auth] Navigating from ${from.path} to ${to.path}`);

    // 例如：檢查使用者是否已認證
    // const authStore = useAuthStore()
    // if (!authStore.isLoggedIn) {
    //   return navigateTo('/')
    // }

    // 例如：檢查使用者是否有權訪問系統配置頁面
    // const erpStore = useErpStore()
    // if (to.path === '/system' && !erpStore.canAccessPath(to.path)) {
    //   return navigateTo('/dashboard')
    // }
  }
);
