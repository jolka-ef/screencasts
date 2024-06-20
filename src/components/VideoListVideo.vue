<template>
  <RouterLink class="Video" :to="{ name: 'video-watch', params: { id: video.id } }">
    <div class="VideoThumbnail">
      <img class="Video-image" :src="video.thumbnail" />
    </div>
    <header class="Video-header">
      <h3>{{ video.name }}</h3>
    </header>
    <VideoListVideoTagNav class="Video-nav" :tag_ids="video.tag_ids" />
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
.Video {
  background: var(--callout);
  border-radius: var(--radius);
  border: 1px dotted var(--light-grey);
  box-shadow:
    rgba(50, 50, 93, 0.26) 1px 51px 101px -21px,
    rgba(0, 0, 0, 0.31) 1px 31px 61px -31px;
  color: inherit;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-row: span 3;
  grid-template-rows: auto 1fr auto;
  grid-template-rows: subgrid;
  grid-row-gap: 0;
  text-decoration: none;
}

.Video-header,
.VideoThumbnail,
.Video-nav {
  grid-column-end: span 2;
}
.Video-header {
  padding: 1em;
}
.Video-header h3 {
  font-weight: bold;
}
.Video-nav {
  margin: 1em;
}
h3 {
  margin: 0 auto;
  width: fit-content;
}

.Video-image {
  width: 100%;
  height: auto;
}
</style>
