/**
 * API Service Layer
 * 審計系統 API 客戶端，提供與後端通信的統一接口
 */

import { API, HTTP_STATUS } from '~/constants';
import type { ApiResponse, AuditCheck, AuditResult, AuditRule } from '~/types';

interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * 審計系統 API 客戶端
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // console 呼叫保留
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
      console.error('API request failed:', error);
      return {
        code: HTTP_STATUS.INTERNAL_ERROR,
        message: 'Request failed',
        data: null as unknown as T,
      };
    }
  }

  /* 審計檢查相關 API */
  async getChecks(): Promise<ApiResponse<AuditCheck[]>> {
    return this.request<AuditCheck[]>('/audit/checks');
  }

  async getCheckById(id: string): Promise<ApiResponse<AuditCheck>> {
    return this.request<AuditCheck>(`/audit/checks/${id}`);
  }

  async createCheck(data: Partial<AuditCheck>): Promise<ApiResponse<AuditCheck>> {
    return this.request<AuditCheck>('/audit/checks', 'POST', data);
  }

  async updateCheck(id: string, data: Partial<AuditCheck>): Promise<ApiResponse<AuditCheck>> {
    return this.request<AuditCheck>(`/audit/checks/${id}`, 'PUT', data);
  }

  async deleteCheck(id: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/audit/checks/${id}`, 'DELETE');
  }

  /* 規則相關 API */
  async getRules(): Promise<ApiResponse<AuditRule[]>> {
    return this.request<AuditRule[]>('/audit/rules');
  }

  async getRuleById(id: string): Promise<ApiResponse<AuditRule>> {
    return this.request<AuditRule>(`/audit/rules/${id}`);
  }

  async createRule(data: Partial<AuditRule>): Promise<ApiResponse<AuditRule>> {
    return this.request<AuditRule>('/audit/rules', 'POST', data);
  }

  async updateRule(id: string, data: Partial<AuditRule>): Promise<ApiResponse<AuditRule>> {
    return this.request<AuditRule>(`/audit/rules/${id}`, 'PUT', data);
  }

  async deleteRule(id: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/audit/rules/${id}`, 'DELETE');
  }

  /* 結果相關 API */
  async getResults(): Promise<ApiResponse<AuditResult[]>> {
    return this.request<AuditResult[]>('/audit/results');
  }

  async getResultById(id: string): Promise<ApiResponse<AuditResult>> {
    return this.request<AuditResult>(`/audit/results/${id}`);
  }

  /* 統計相關 API */
  async getComplianceStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/audit/stats/compliance');
  }

  async getAuditSummary(): Promise<ApiResponse<any>> {
    return this.request<any>('/audit/summary');
  }
}

// 創建單例實例
export const apiClient = new ApiClient(API.BASE_URL);
