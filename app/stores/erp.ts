/**
 * ERP Store
 * 模組狀態與通知管理
 */

import type { ErpNotice, ErpRole, ErpUser } from '~/types';

export const useErpStore = defineStore('erp', () => {
  const activeModule = ref('dashboard');
  const currentUser = ref<ErpUser>({
    id: 'U-001',
    name: '展示帳號',
    role: 'manager',
    department: '營運中心',
  });
  const lastDeniedRoute = ref('');
  const roleLabels: Record<ErpRole, string> = {
    admin: '系統管理',
    manager: '營運主管',
    finance: '財務專員',
    hr: '人資專員',
    sales: '銷售主管',
    viewer: '訪客檢視',
  };
  const routeRoles: Array<{ prefix: string; roles: ErpRole[]; }> = [
    { prefix: '/shop/admin/procurement', roles: ['admin', 'manager'] },
    { prefix: '/shop/admin/inventory', roles: ['admin', 'manager'] },
    { prefix: '/shop/admin/finance', roles: ['admin', 'finance'] },
    { prefix: '/shop/admin/hr', roles: ['admin', 'hr'] },
    { prefix: '/shop/admin/sales', roles: ['admin', 'sales'] },
    { prefix: '/shop/admin/reports', roles: ['admin', 'manager', 'finance'] },
  ];
  const notices = ref<ErpNotice[]>([
    {
      id: 'N-001',
      title: '採購審核等待中',
      level: 'warn',
      message: '有 3 筆採購單等待審核',
      time: '10 分鐘前',
    },
    {
      id: 'N-002',
      title: '庫存預警',
      level: 'critical',
      message: '2 項原料低於安全庫存',
      time: '1 小時前',
    },
  ]);

  const setActiveModule = (moduleId: string) => {
    activeModule.value = moduleId;
  };

  const setUserRole = (role: ErpRole) => {
    currentUser.value = {
      ...currentUser.value,
      role,
    };
  };

  const getRequiredRoles = (path: string) => {
    const matched = routeRoles.find((item) => path.startsWith(item.prefix));
    return matched ? matched.roles : void 0;
  };

  const hasRoleAccess = (roles?: ErpRole[]) => {
    return roles ? roles.includes(currentUser.value.role) : !0;
  };

  const canAccessPath = (path: string) => {
    return hasRoleAccess(getRequiredRoles(path));
  };

  const setDeniedRoute = (path: string) => {
    lastDeniedRoute.value = path;
  };

  const clearDeniedRoute = () => {
    lastDeniedRoute.value = '';
  };

  const removeNotice = (id: string) => {
    notices.value = notices.value.filter((item) => item.id !== id);
  };

  return {
    activeModule,
    currentUser,
    lastDeniedRoute,
    roleLabels,
    notices,
    setActiveModule,
    setUserRole,
    getRequiredRoles,
    hasRoleAccess,
    canAccessPath,
    setDeniedRoute,
    clearDeniedRoute,
    removeNotice,
  };
});
