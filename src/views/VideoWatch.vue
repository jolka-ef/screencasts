<script>
import { useVideosStore } from '@/stores/videos'
import { mapState } from 'pinia'

import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import VideoListVideoTagNav from '@/components/VideoListVideoTagNav.vue'

export default {
  components: {
    VideoListVideoTagNav,
    VideoPlayer
  },
  computed: {
    ...mapState(useVideosStore, ['findVideo', 'getTag', 'videos']),
    video() {
      return this.findVideo(this.$route.params.id)
    }
  }
}
</script>
<template>
  <div v-if="video">
    <video-player
      class="video-watch"
      :src="findVideo($route.params.id).videoUrl"
      :options="{ playbackRates: [1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0] }"
      :poster="video.thumbnail"
      controls
      :loop="true"
      :volume="0.6"
    />
    <RouterLink :to="{ name: 'video-watch', params: { id: video.id } }" />

    <VideoListVideoTagNav :tag_ids="video.tag_ids" />

    <h1>{{ video.name }}</h1>

    <div v-html="video.description"></div>
  </div>
</template>
<style>
.video-watch.video-js {
  width: 50vw;
  aspect-ratio: 2 / 1;
  height: auto;
  margin: 2em auto;
}
</style>
