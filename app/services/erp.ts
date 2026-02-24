import { HTTP_STATUS } from '~/constants';
import type { ApiResponse, ErpKpi } from '~/types';

export const getErpKpis = async (): Promise<ApiResponse<ErpKpi[]>> => {
  const data: ErpKpi[] = [
    { label: '營收成長', value: '+12%', trend: 'up' },
    { label: '庫存周轉', value: '8.6 次', trend: 'up' },
    { label: '採購成本', value: '-4%', trend: 'down' },
    { label: '人力配置', value: '92%', trend: 'flat' },
  ];

  return {
    code: HTTP_STATUS.OK,
    message: 'success',
    data,
  };
};
