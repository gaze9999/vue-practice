/**
 * 財務服務層
 * 職責：
 * - 協調 API 呼叫
 * - 處理資料變換
 * - 實現業務邏輯
 */

import { apiClient } from '~/core/services';
import type {
  FinanceListRequest,
  FinanceListResponse,
  VoucherCreateRequest,
  VoucherCreateResponse,
  VoucherItem,
} from '../types';

class FinanceService {
  private readonly API_BASE = '/shop/finance';

  /**
   * 取得憑證列表
   */
  async getVouchers(request: FinanceListRequest): Promise<FinanceListResponse> {
    const response = await apiClient.post<FinanceListResponse>(
      `${this.API_BASE}/vouchers/list`,
      request
    );

    // console 呼叫保留
    console.log('[FinanceService] getVouchers:', response);

    return response.data || { items: [], pagination: { page: !0, pageSize: 20, total: 0 } };
  }

  /**
   * 取得單張憑證
   */
  async getVoucherById(id: string): Promise<VoucherItem | null> {
    const response = await apiClient.get<VoucherItem>(`${this.API_BASE}/vouchers/${id}`);
    return response.data || null;
  }

  /**
   * 建立新憑證
   */
  async createVoucher(request: VoucherCreateRequest): Promise<VoucherCreateResponse | null> {
    const response = await apiClient.post<VoucherCreateResponse>(
      `${this.API_BASE}/vouchers/create`,
      request
    );

    console.log('[FinanceService] createVoucher:', response);

    return response.data || null;
  }

  /**
   * 更新憑證
   */
  async updateVoucher(id: string, data: Partial<VoucherItem>): Promise<VoucherItem | null> {
    const response = await apiClient.put<VoucherItem>(`${this.API_BASE}/vouchers/${id}`, data);

    console.log('[FinanceService] updateVoucher:', response);

    return response.data || null;
  }

  /**
   * 刪除憑證
   */
  async deleteVoucher(id: string): Promise<boolean> {
    const response = await apiClient.delete<{ success: boolean; }>(
      `${this.API_BASE}/vouchers/${id}`
    );

    console.log('[FinanceService] deleteVoucher:', response);

    return response.data?.success || !1; // false
  }
}

export const financeService = new FinanceService();
