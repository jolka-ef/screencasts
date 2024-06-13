<!-- not working 

<script setup>
import { computed, ref } from 'vue'

import { useRoute } from 'vue-router'
import { useVideosStore } from '@/stores/videos'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const video = computed(() => {
  const route = useRoute()
  const id = ref(route.params.id)
  const store = useVideosStore()
  const { findVideo } = store
  return findVideo(id)
})
</script> -->

<script>
import { useVideosStore } from '@/stores/videos'

import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default {
  components: {
    VideoPlayer
  },
  computed: {
    video() {
      const store = useVideosStore()
      const { findVideo } = store
      return findVideo(this.$route.params.id)
    }
  }
}
</script>
<template>
  <div v-if="video">
    <video-player
      class="video-watch"
      :src="video.videoUrl"
      :options="{ playbackRates: [1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0] }"
      :poster="video.thumbnail"
      controls
      :loop="true"
      :volume="0.6"
    />

    <h1>{{ video.name }}</h1>
    <div v-html="video.description"></div>
  </div>
</template>
<style>
.video-watch.video-js {
  width: 50vw;
  aspect-ratio: 2 / 1;
  height: auto;
  margin: auto;
}
</style>
