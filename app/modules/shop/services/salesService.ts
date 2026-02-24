/**
 * 銷售服務層
 */

import { apiClient } from '~/core/services';
import type { SalesOrder, SalesPipeline } from '../types';

class SalesService {
  private readonly API_BASE = '/shop/sales';

  /**
   * 取得銷售訂單列表
   */
  async getSalesOrders(): Promise<SalesOrder[]> {
    const response = await apiClient.get<SalesOrder[]>(`${this.API_BASE}/orders`);
    console.log('[SalesService] getSalesOrders:', response);
    return response.data || [];
  }

  /**
   * 取得銷售管道清單
   */
  async getSalesPipeline(): Promise<SalesPipeline[]> {
    const response = await apiClient.get<SalesPipeline[]>(`${this.API_BASE}/pipeline`);
    console.log('[SalesService] getSalesPipeline:', response);
    return response.data || [];
  }

  /**
   * 建立銷售訂單
   */
  async createOrder(order: SalesOrder): Promise<SalesOrder | null> {
    const response = await apiClient.post<SalesOrder>(`${this.API_BASE}/orders`, order);
    console.log('[SalesService] createOrder:', response);
    return response.data || null;
  }
}

export const salesService = new SalesService();
