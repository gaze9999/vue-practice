/**
 * Authentication Middleware
 * 審計系統路由認證中間件，用於檢查使用者權限
 */

import type { RouteLocationNormalized } from 'vue-router';

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // console 呼叫保留
    console.log(`Navigating from ${from.path} to ${to.path}`);

    // 例如：檢查使用者是否已認證
    // const isAuthenticated = useAuthStore().isLoggedIn
    // if (!isAuthenticated) {
    //   return navigateTo('/')
    // }

    // 例如：檢查使用者是否有權訪問系統配置頁面
    // const userRole = useAuthStore().userRole
    // if (to.path === '/system' && !['admin', 'auditor'].includes(userRole)) {
    //   return navigateTo('/audit')
    // }
  }
);
