/**
 * Steam 社群新聞 API
 * GET /api/steam/community?count=20&appids=730,570,1172470&enddate=1234567890&language=tchinese
 *
 * Query params:
 * - count: 返回的新聞總數（預設 20）
 * - appids: 逗號分隔的遊戲 AppID（必填）
 * - enddate: Unix timestamp，只返回這個日期之前的新聞（選填，用於分頁）
 * - language: 語言代碼（選填，如：english, schinese, tchinese, japanese）
 *
 * 聚合多款遊戲的新聞
 */

import { fetchMultipleAppsNews } from '../../utils/steamApi';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const count = Number(query.count) || 20;
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
    // 計算每個遊戲需要的新聞數量
    const newsPerGame = Math.max(2, Math.ceil(count / appIds.length));

    // 獲取聚合新聞
    const allNews = await fetchMultipleAppsNews(appIds, newsPerGame, 300, enddate, language);

    return allNews.slice(0, count);
  } catch (error) {
    console.error('Error fetching Steam community news:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '獲取 Steam 社群新聞失敗',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
