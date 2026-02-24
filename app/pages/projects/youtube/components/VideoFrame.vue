<template>
  <v-col class="video-frame">
    <div class="frame-container">
      <button
        class="remove-btn"
        @click="handleRemove"
        :aria-label="`移除影片 ${video.title}`"
        title="移除此影片"
      >
        <span class="icon">×</span>
      </button>

      <iframe
        :key="`player-${video.id}`"
        :src="`https://www.youtube.com/embed/${video.videoId}?controls=1&modestbranding=1`"
        :title="video.title"
        class="youtube-player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <iframe
        v-if="showChat"
        :key="`chat-${video.id}`"
        :src="`https://www.youtube.com/live_chat?embed=1&v=${video.videoId}&embed_domain=${getDomain}`"
        :title="`${video.title} - 聊天`"
        class="youtube-chat"
        frameborder="0"
        allow="clipboard-write"
      ></iframe>
    </div>
  </v-col>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Video {
  id: string
  videoId: string
  title?: string
  timestamp: number
}

interface Props {
  video: Video
  showChat?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showChat: false,
})

const emit = defineEmits<{
  remove: [id: string]
}>()

const handleRemove = () => {
  emit('remove', props.video.id)
}

const getDomain = computed(() => {
  return typeof window !== 'undefined' ? window.location.hostname : 'localhost'
})
</script>

<style scoped lang="scss">
.video-frame {
  position: relative;
  display: flex;
  flex: 0 50%;
  min-height: calc(50vh - 64px);
  max-height: 50%;
  background: #000;
  border: 1px solid #e0e0e0;

  &:only-child {
    flex: 1;
    max-height: 100%;
  }

  .frame-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
  }

  .remove-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 0, 0, 0.8);
    }

    .icon {
      display: block;
      font-weight: bold;
    }
  }

  .youtube-player {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
  }

  .youtube-chat {
    flex: 0 40%;
    width: 40%;
    height: 100%;
    border: none;
    border-left: 1px solid #333;
  }
}
</style>
