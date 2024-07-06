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
    ...mapState(useVideosStore, ['findVideo', 'getTag', 'isPlayed', 'markVideoPlayed', 'videos']),
    video() {
      const video = this.findVideo(this.$route.params.id)
      return video
    },
    playerOptions() {
      return {
        sources: [
          {
            src: this.video['video-url'],
            type: 'video/mp4'
          }
        ],
        playbackRates: [1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0],
        poster: this.video.thumbnail,
        language: 'en',
        fluid: true,
        controls: true
      }
    }
  }
}
</script>
<template>
  <div v-if="video" class="VideoWatchContainer">
    <video-player class="video-watch" :options="playerOptions" @ended="markVideoPlayed(video.id)" />
    <div>
      <h1>{{ video.name }}</h1>
      <p class="Video-status" v-if="isPlayed(video.id)">&#10004; Played</p>
      <button v-else @click="markVideoPlayed(video.id)">Mark as played</button>
      <div v-html="video.description"></div>
      <VideoListVideoTagNav :tag_ids="video.tag_ids" />
    </div>
  </div>
</template>
<style>
.VideoWatchContainer {
  display: grid;
  gap: 2em;
}
.Video-status {
  color: rgb(0, 92, 92);
  margin: 0 auto;
  width: fit-content;
}
</style>
