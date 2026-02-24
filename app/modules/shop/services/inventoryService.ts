/**
 * 庫存服務層
 */

import { apiClient } from '~/core/services';
import type { InventoryAdjustment, InventoryItem } from '../types';

class InventoryService {
  private readonly API_BASE = '/shop/inventory';

  /**
   * 取得庫存列表
   */
  async getInventoryList(): Promise<InventoryItem[]> {
    const response = await apiClient.get<InventoryItem[]>(`${this.API_BASE}/list`);
    console.log('[InventoryService] getInventoryList:', response);
    return response.data || [];
  }

  /**
   * 建立庫存調整
   */
  async createAdjustment(adjustment: InventoryAdjustment): Promise<InventoryAdjustment | null> {
    const response = await apiClient.post<InventoryAdjustment>(
      `${this.API_BASE}/adjustments`,
      adjustment
    );
    console.log('[InventoryService] createAdjustment:', response);
    return response.data || null;
  }
}

export const inventoryService = new InventoryService();
