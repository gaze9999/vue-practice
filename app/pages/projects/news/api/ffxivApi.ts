// FFXIV News API
// 使用 Lodestone News API 獲取 FF XIV 相關新聞資訊

import type { Locale, Maintenance, MaintenanceCurrent, Topic } from '~/types/ffxiv';

const BASE_URL = 'https://lodestonenews.com/news';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * 獲取 FF XIV 話題列表
 * @param locale 語言區域 (jp, na, eu, fr, de)
 * @returns Promise<Topic[]>
 */
export const getFFXIVTopics = async (locale: Locale = 'jp'): Promise<Topic[]> => {
  try {
    const response = await fetch(`${BASE_URL}/topics?locale=${locale}`, {
      method: 'GET',
      mode: 'cors',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Topic[];
  } catch (error) {
    console.error('Error fetching FFXIV topics:', error);
    throw error;
  }
};

/**
 * 獲取 FF XIV 維護資訊列表
 * @param locale 語言區域 (jp, na, eu, fr, de)
 * @returns Promise<Maintenance[]>
 */
export const getFFXIVMaintenance = async (locale: Locale = 'jp'): Promise<Maintenance[]> => {
  try {
    const response = await fetch(`${BASE_URL}/maintenance?locale=${locale}`, {
      method: 'GET',
      mode: 'cors',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Maintenance[];
  } catch (error) {
    console.error('Error fetching FFXIV maintenance:', error);
    throw error;
  }
};

/**
 * 獲取 FF XIV 當前維護狀態
 * @param locale 語言區域 (jp, na, eu, fr, de)
 * @returns Promise<MaintenanceCurrent>
 */
export const getFFXIVMaintenanceCurrent = async (locale: Locale = 'jp'): Promise<MaintenanceCurrent> => {
  try {
    const response = await fetch(`${BASE_URL}/maintenance/current?locale=${locale}`, {
      method: 'GET',
      mode: 'cors',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as MaintenanceCurrent;
  } catch (error) {
    console.error('Error fetching FFXIV maintenance current:', error);
    throw error;
  }
};

/**
 * 格式化時間戳記
 * @param timeString ISO 時間字串
 * @returns 格式化後的日期字串 (YYYY-MM-DD)
 */
export const formatTimestamp = (timeString: string): string => {
  const date = new Date(new Date(timeString).getTime() - 3.6e6);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * 排序項目（依時間倒序）
 * @param items 待排序項目
 * @returns 排序後的項目
 */
export const sortByTimeDesc = <T extends { time: string; }>(items: T[]): T[] => {
  return items.sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });
};
