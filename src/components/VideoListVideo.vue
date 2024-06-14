<template>
  <RouterLink :to="{ name: 'video-watch', params: { id: video.id } }">
    <VideoListVideoTagNav :tag_ids="video.tag_ids" />
    <img class="video-image" :src="video.thumbnail" />
    <h3>{{ video.name }}</h3>
    <div v-html="video.description"></div>
  </RouterLink>
</template>
<script>
import { useVideosStore } from '@/stores/videos'
import { mapState } from 'pinia'
import VideoListVideoTagNav from '@/components/VideoListVideoTagNav.vue'

export default {
  components: { VideoListVideoTagNav },
  computed: {
    ...mapState(useVideosStore, ['videos'])
  },
  props: {
    video: Object
  }
}
</script>
<style scoped>
h3 {
  margin: 0 auto;
  width: fit-content;
}

.video-image {
  grid-area: image;
  width: 20vw;
}
</style>
