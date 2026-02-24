/**
 * Steam 特賣新聞 API
 * GET /api/steam/sales?count=15&appids=593110,730&tag=特賣活動&enddate=1234567890&language=tchinese
 *
 * Query params:
 * - count: 返回的新聞總數（預設 15）
 * - appids: 逗號分隔的遊戲 AppID（必填）
 * - tag: 自訂標籤（選填，預設「特賣活動」）
 * - enddate: Unix timestamp，只返回這個日期之前的新聞（選填，用於分頁）
 * - language: 語言代碼（選填，如：english, schinese, tchinese, japanese）
 *
 * 獲取特賣相關新聞
 */

import { fetchMultipleAppsNews, type SteamNewsItem } from '../../utils/steamApi';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const count = Number(query.count) || 15;
  const customTag = query.tag && typeof query.tag === 'string' ? query.tag : '特賣活動';
  const enddate = query.enddate ? Number(query.enddate) : undefined;
  const language = query.language && typeof query.language === 'string' ? query.language : undefined;

  // 解析 appids 參數（逗號分隔）- 必填
  if (!query.appids || typeof query.appids !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必要參數',
      message: '請提供 appids 參數（遊戲 AppID，逗號分隔）',
    });
  }

  const appIds = query.appids
    .split(',')
    .map(id => Number(id.trim()))
    .filter(id => !isNaN(id));

  if (appIds.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: '無效的參數',
      message: 'appids 參數必須包含至少一個有效的遊戲 AppID',
    });
  }

  // 檢查 API Key 配置
  const config = useRuntimeConfig();
  if (!config.steamApiKey || config.steamApiKey === 'your_steam_api_key_here') {
    throw createError({
      statusCode: 503,
      statusMessage: 'Steam API Key 未配置',
      message: '請在 .env 檔案中設定 NUXT_STEAM_API_KEY',
    });
  }

  try {
    // 獲取新聞
    const allNews = await fetchMultipleAppsNews(appIds, Math.ceil(count / appIds.length), 300, enddate, language);

    // 添加標籤
    const taggedNews = allNews.map((item: SteamNewsItem) => ({
      ...item,
      tags: [customTag],
    }));

    // 去重並排序
    const uniqueNews = Array.from(
      new Map(taggedNews.map((item: SteamNewsItem) => [item.gid, item])).values()
    ) as SteamNewsItem[];

    return uniqueNews.slice(0, count);
  } catch (error) {
    console.error('Error fetching Steam sales news:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '獲取 Steam 特賣新聞失敗',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
