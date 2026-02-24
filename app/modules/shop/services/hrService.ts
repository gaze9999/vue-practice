/**
 * 人資服務層
 */

import { apiClient } from '~/core/services';
import type { EmployeeAttendance, EmployeeRecruitment } from '../types';

class HRService {
  private readonly API_BASE = '/shop/hr';

  /**
   * 取得招聘清單
   */
  async getRecruitments(): Promise<EmployeeRecruitment[]> {
    const response = await apiClient.get<EmployeeRecruitment[]>(`${this.API_BASE}/recruitments`);
    console.log('[HRService] getRecruitments:', response);
    return response.data || [];
  }

  /**
   * 取得考勤記錄
   */
  async getAttendance(): Promise<EmployeeAttendance[]> {
    const response = await apiClient.get<EmployeeAttendance[]>(`${this.API_BASE}/attendance`);
    console.log('[HRService] getAttendance:', response);
    return response.data || [];
  }

  /**
   * 建立招聘職位
   */
  async createRecruitment(recruitment: EmployeeRecruitment): Promise<EmployeeRecruitment | null> {
    const response = await apiClient.post<EmployeeRecruitment>(
      `${this.API_BASE}/recruitments`,
      recruitment
    );
    console.log('[HRService] createRecruitment:', response);
    return response.data || null;
  }
}

export const hrService = new HRService();
