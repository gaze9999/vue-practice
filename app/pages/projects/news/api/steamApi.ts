// Steam News API - Client Side
// 透過 Nuxt server API 獲取 Steam 新聞（使用官方 Steam Web API）

export interface SteamNewsItem {
  gid: string;
  title: string;
  url: string;
  is_external_url: boolean;
  author: string;
  contents: string;
  feedlabel: string;
  date: number;
  feedname: string;
  feed_type: number;
  appid: number;
  appname?: string;
  tags?: string[];
}

/**
 * 獲取 Steam 社群整合新聞（多款遊戲聚合）
 * @param appIds 遊戲 AppID 陣列（必填）
 * @param count 新聞總數 (預設 20)
 * @param enddate Unix timestamp，只返回這個日期之前的新聞（用於分頁）
 * @param language 語言代碼（如：english, schinese, tchinese, japanese）
 * @returns Promise<SteamNewsItem[]>
 */
export const getSteamCommunityNews = async (
  appIds: number[],
  count: number = 20,
  enddate?: number,
  language?: string
): Promise<SteamNewsItem[]> => {
  if (!appIds || appIds.length === 0) {
    throw new Error('appIds 參數為必填，請提供至少一個遊戲 AppID');
  }

  try {
    const params: Record<string, any> = {
      count,
      appids: appIds.join(','),
    };

    // 如果提供 enddate，添加到參數中（用於分頁）
    if (enddate) {
      params.enddate = enddate;
    }

    // 如果提供 language，添加到參數中
    if (language) {
      params.language = language;
    }

    const data = await $fetch<SteamNewsItem[]>('/api/steam/community', {
      method: 'GET',
      params,
    });

    return data;
  } catch (error: any) {
    console.error('Error fetching Steam community news:', error);

    // 如果是 503 錯誤（API Key 未配置），拋出特定錯誤
    if (error?.statusCode === 503) {
      throw new Error('Steam API Key 未配置，請聯繫管理員設定');
    }

    throw error;
  }
};

/**
 * 獲取 Steam 特賣新聞
 * @param appIds 遊戲 AppID 陣列（必填）
 * @param count 新聞數量 (預設 20)
 * @param tag 可選的自訂標籤
 * @param enddate Unix timestamp，只返回這個日期之前的新聞（用於分頁）
 * @param language 語言代碼（如：english, schinese, tchinese, japanese）
 * @returns Promise<SteamNewsItem[]>
 */
export const getSteamSalesNews = async (
  appIds: number[],
  count: number = 20,
  tag?: string,
  enddate?: number,
  language?: string
): Promise<SteamNewsItem[]> => {
  if (!appIds || appIds.length === 0) {
    throw new Error('appIds 參數為必填，請提供至少一個遊戲 AppID');
  }

  try {
    const params: Record<string, any> = {
      count,
      appids: appIds.join(','),
    };
    if (tag) {
      params.tag = tag;
    }
    // 如果提供 enddate，添加到參數中（用於分頁）
    if (enddate) {
      params.enddate = enddate;
    }
    // 如果提供 language，添加到參數中
    if (language) {
      params.language = language;
    }

    const data = await $fetch<SteamNewsItem[]>('/api/steam/sales', {
      method: 'GET',
      params,
    });

    return data;
  } catch (error: any) {
    console.error('Error fetching Steam sales news:', error);

    // 如果是 503 錯誤（API Key 未配置），拋出特定錯誤
    if (error?.statusCode === 503) {
      throw new Error('Steam API Key 未配置，請聯繫管理員設定');
    }

    throw error;
  }
};

/**
 * 格式化 Unix 時間戳記
 * @param timestamp Unix 時間戳記 (秒)
 * @returns 格式化後的日期字串 (YYYY-MM-DD HH:mm)
 */
export const formatSteamTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * 清理 HTML 內容
 * @param html HTML 字串
 * @returns 純文字內容
 */
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};
