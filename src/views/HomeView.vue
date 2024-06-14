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

<style>
h1 {
  margin: 0 auto;
  width: fit-content;
}
.video-box {
  list-style: none;
  border: 1px solid black;
  border-radius: 10px;
  margin: 1em;
  padding: 2em;
  display: grid;
  grid-template-areas: 'image name' 'image description';
  gap: 2em;
}
</style>
