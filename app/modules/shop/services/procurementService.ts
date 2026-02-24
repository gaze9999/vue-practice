/**
 * 採購服務層
 */

import { apiClient } from '~/core/services';
import type { ProcurementRequest } from '../types';

class ProcurementService {
  private readonly API_BASE = '/shop/procurement';

  /**
   * 取得採購需求列表
   */
  async getProcurementRequests(): Promise<ProcurementRequest[]> {
    const response = await apiClient.get<ProcurementRequest[]>(`${this.API_BASE}/requests`);
    console.log('[ProcurementService] getProcurementRequests:', response);
    return response.data || [];
  }

  /**
   * 建立採購需求
   */
  async createRequest(request: ProcurementRequest): Promise<ProcurementRequest | null> {
    const response = await apiClient.post<ProcurementRequest>(
      `${this.API_BASE}/requests`,
      request
    );
    console.log('[ProcurementService] createRequest:', response);
    return response.data || null;
  }
}

export const procurementService = new ProcurementService();
