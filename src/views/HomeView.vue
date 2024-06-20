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
  <h1>All Videos</h1>
  <ul class="VideoList">
    <li class="VideoList-item" v-for="video in videos">
      <VideoListVideo :video="video" />
    </li>
  </ul>
</template>

<style>
.VideoList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(18em, 100%), 1fr));
  grid-template-rows: auto 1fr auto;

  grid-gap: 1.25em;
  padding: 0;
  list-style: none;
}
.VideoList-item {
  display: contents;
}

h1 {
  font-size: 2em;
  margin: 1.5em auto;
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
