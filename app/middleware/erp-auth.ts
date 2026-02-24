/**
 * ERP Access Middleware
 * 用於購物後台範例的路由保護與權限檢查
 */

export default defineNuxtRouteMiddleware((to, from) => {
  // console 呼叫保留
  console.log(`ERP navigation: ${from.path} -> ${to.path}`);

  const erpStore = useErpStore();
  const requiredRoles = erpStore.getRequiredRoles(to.path);
  const hasAccess = erpStore.hasRoleAccess(requiredRoles);

  if (!hasAccess) {
    erpStore.setDeniedRoute(to.path);
    return navigateTo('/shop/admin');
  }

  erpStore.clearDeniedRoute();
});
