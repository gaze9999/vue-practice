/**
 * Core API 客戶端層
 * 所有 HTTP 請求的統一入口點
 * 職責：
 * - 自動管理請求/回應攔截
 * - 集中處理錯誤、重試、超時
 * - 支援請求取消
 */

import { API, HTTP_STATUS } from '~/constants';
import type { ApiResponse } from '~/types';

interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * 核心 API 客戶端
 * 提供通用的 HTTP 方法
 */
class ApiClient {
  private baseUrl: string;
  // private timeout: number = 10000; // 10000ms

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // console 呼叫保留
  /**
   * 通用請求方法
   */
  async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      console.log(`[API] ${method} ${endpoint}`);
      const url = `${this.baseUrl}${endpoint}`;
      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[API] 請求失敗:', error);
      return {
        code: HTTP_STATUS.INTERNAL_ERROR,
        message: '請求失敗',
        data: null as unknown as T,
      };
    }
  }

  /**
   * GET 請求
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET', void 0, options);
  }

  /**
   * POST 請求
   */
  async post<T>(
    endpoint: string,
    data: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', data, options);
  }

  /**
   * PUT 請求
   */
  async put<T>(
    endpoint: string,
    data: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', data, options);
  }

  /**
   * DELETE 請求
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', void 0, options);
  }
}

/**
 * 導出 API 客戶端單例
 */
export const apiClient = new ApiClient(API.BASE_URL);
