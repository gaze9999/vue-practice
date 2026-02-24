import type { ErpModuleSummary } from '~/types';

export const useErpModules = () => {
  const modules = ref<ErpModuleSummary[]>([
    {
      id: 'procurement',
      name: '採購管理',
      owner: '採購中心',
      status: 'active',
      updatedAt: '2026-02-12 09:20',
      kpi: '採購達成率 92%',
    },
    {
      id: 'inventory',
      name: '庫存管理',
      owner: '倉儲部門',
      status: 'active',
      updatedAt: '2026-02-12 08:05',
      kpi: '安全庫存達標 96%',
    },
    {
      id: 'finance',
      name: '財務管理',
      owner: '財務部',
      status: 'pending',
      updatedAt: '2026-02-11 18:30',
      kpi: '月結進度 74%',
    },
    {
      id: 'hr',
      name: '人資管理',
      owner: '人資中心',
      status: 'active',
      updatedAt: '2026-02-12 07:40',
      kpi: '出勤覆蓋率 98%',
    },
    {
      id: 'sales',
      name: '銷售管理',
      owner: '銷售部',
      status: 'blocked',
      updatedAt: '2026-02-10 16:10',
      kpi: '目標達成 88%',
    },
    {
      id: 'reports',
      name: '報表中心',
      owner: '營運分析',
      status: 'active',
      updatedAt: '2026-02-12 06:50',
      kpi: '即時報表 14 項',
    },
  ]);

  return {
    modules,
  };
};
