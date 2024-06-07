<script>
import { useVideosStore } from '@/stores/videos'

export default {
  computed: {
    video() {
      return useVideosStore().videos.find((video) => video.id == this.$route.params.id)
    }
  }
}
</script>
<template>
  <video controls>
    <source :src="video.videoUrl" type="video/mp4" />
    <p>
      Your browser doesn't support HTML video. Here is a
      <a :href="video.videoUrl" download="video.videoUrl">link to the video</a> instead.
    </p>
  </video>
  <h1>{{ video.name }}</h1>
  <div v-html="video.description"></div>
</template>
<style scoped>
img {
  max-width: 50%;
}
</style>
