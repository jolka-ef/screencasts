<script>
import { useVideosStore } from '@/stores/videos'
import { mapState } from 'pinia'
import VideoListVideo from '@/components/VideoListVideo.vue'
export default {
  components: { VideoListVideo },
  computed: {
    ...mapState(useVideosStore, ['videos'])
  }
}
</script>

<template>
  <main>
    <h1>Videos</h1>
    <ul>
      <li class="video-box" v-for="video in videos">
        <VideoListVideo :video="video" />
      </li>
    </ul>
  </main>
</template>

<style scoped>
h1 {
  margin: 0 auto;
  width: fit-content;
}
</style>
