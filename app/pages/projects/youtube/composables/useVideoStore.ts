// 影片狀態管理 composable
// 用於管理YouTube電視牆中的影片列表和相關設置

import { computed, ref } from 'vue';

interface Video {
  id: string;
  videoId: string;
  title?: string;
  timestamp: number;
}

const videos = ref<Video[]>([]);
const settings = ref({
  chat: false,
  playing: true,
  muted: false,
});

// 從 localStorage 初始化
const initializeStore = () => {
  try {
    const saved = localStorage.getItem('youtubeWallVideos');
    if (saved) {
      videos.value = JSON.parse(saved);
    }

    const savedSettings = localStorage.getItem('youtubeWallSettings');
    if (savedSettings) {
      settings.value = JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Failed to initialize store:', error);
  }
};

// 保存到 localStorage
const saveToLocalStorage = () => {
  try {
    localStorage.setItem('youtubeWallVideos', JSON.stringify(videos.value));
    localStorage.setItem('youtubeWallSettings', JSON.stringify(settings.value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// 添加影片
const addVideo = (videoId: string, title?: string) => {
  if (!videoId.trim()) return false;

  // 檢驗YouTube連結
  const youtubeRegex = /.*youtu\.?be.*/i;
  const videoIdRegex = /.*youtu\.?be.*\/(.*\?v=)?([\S]{11})(&?|\?=).*/i;

  if (!youtubeRegex.test(videoId)) {
    throw new Error('無效的YouTube連結');
  }

  const match = videoId.match(videoIdRegex);
  if (!match || !match[2]) {
    throw new Error('無法提取影片ID');
  }

  const extractedId = match[2];

  // 檢查是否已存在
  if (videos.value.some(v => v.videoId === extractedId)) {
    throw new Error('此影片已添加');
  }

  const newVideo: Video = {
    id: `video-${Date.now()}`,
    videoId: extractedId,
    title: title || `影片 ${videos.value.length + 1}`,
    timestamp: Date.now(),
  };

  videos.value.unshift(newVideo);
  saveToLocalStorage();

  return true;
};

// 移除影片
const removeVideo = (id: string) => {
  const index = videos.value.findIndex(v => v.id === id);
  if (index > -1) {
    videos.value.splice(index, 1);
    saveToLocalStorage();
    return true;
  }
  return false;
};

// 清空所有影片
const clearAllVideos = () => {
  videos.value = [];
  saveToLocalStorage();
};

// 更新設置
const updateSetting = (key: keyof typeof settings.value, value: any) => {
  settings.value[key] = value;
  saveToLocalStorage();
};

// 計算屬性
const videoCount = computed(() => videos.value.length);
const hasVideos = computed(() => videos.value.length > 0);

export const useVideoStore = () => {
  return {
    // 狀態
    videos: computed(() => videos.value),
    settings: computed(() => settings.value),

    // 計算屬性
    videoCount,
    hasVideos,

    // 方法
    initializeStore,
    addVideo,
    removeVideo,
    clearAllVideos,
    updateSetting,
  };
};
