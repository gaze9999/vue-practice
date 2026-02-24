/**
 * Steam Web API 工具函數
 * 使用官方 Steam Web API，需要 API Key
 * 取得方式：https://steamcommunity.com/dev/apikey
 */

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

export interface SteamNewsResponse {
  appnews: {
    appid: number;
    newsitems: SteamNewsItem[];
    count: number;
  };
}

/**
 * 獲取指定 AppID 的新聞
 * @param appid 遊戲 AppID
 * @param count 新聞數量
 * @param maxlength 內容最大長度
 * @param enddate Unix timestamp，只返回這個日期之前的新聞（用於分頁）
 * @param language 語言代碼（如：english, schinese, tchinese, japanese）
 * @returns Promise<SteamNewsItem[]>
 */
export const fetchSteamNews = async (
  appid: number,
  count: number = 5,
  maxlength: number = 300,
  enddate?: number,
  language?: string
): Promise<SteamNewsItem[]> => {
  const config = useRuntimeConfig();
  const apiKey = config.steamApiKey;

  if (!apiKey || apiKey === 'your_steam_api_key_here') {
    throw new Error('Steam API Key 未配置');
  }

  const apiUrl = 'https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/';

  try {
    const params: Record<string, any> = {
      appid,
      count,
      maxlength,
      format: 'json',
    };

    // 如果提供 enddate，添加到參數中（用於分頁）
    if (enddate) {
      params.enddate = enddate;
    }

    // Steam API 的語言支援通過 l 參數或 feed
    if (language) {
      // 某些 Steam API 端點支援 l 參數
      params.l = language;
    }

    const response = await $fetch<SteamNewsResponse>(apiUrl, {
      method: 'GET',
      params,
      retry: 2,
      retryDelay: 500,
      timeout: 10000,
    });

    return response.appnews?.newsitems || [];
  } catch (error) {
    console.error(`Failed to fetch Steam news for AppID ${appid}:`, error);
    return [];
  }
};

/**
 * 並行獲取多個 AppID 的新聞並聚合
 * @param appids AppID 陣列
 * @param countPerApp 每個遊戲的新聞數量
 * @param maxlength 內容最大長度
 * @param enddate Unix timestamp，只返回這個日期之前的新聞（用於分頁）
 * @param language 語言代碼（如：english, schinese, tchinese, japanese）
 * @returns Promise<SteamNewsItem[]>
 */
export const fetchMultipleAppsNews = async (
  appids: number[],
  countPerApp: number = 2,
  maxlength: number = 300,
  enddate?: number,
  language?: string
): Promise<SteamNewsItem[]> => {
  const newsPromises = appids.map((appid: number) =>
    fetchSteamNews(appid, countPerApp, maxlength, enddate, language)
  );

  const allNewsArrays = await Promise.all(newsPromises);
  const allNews = allNewsArrays.flat();

  // 按時間排序（最新的在前）
  allNews.sort((a: SteamNewsItem, b: SteamNewsItem) => b.date - a.date);

  return allNews;
};

/**
 * 格式化 Unix 時間戳記
 * @param timestamp Unix 時間戳記（秒）
 * @returns 格式化後的日期字串
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
 * 清理 HTML 標籤
 */
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};
