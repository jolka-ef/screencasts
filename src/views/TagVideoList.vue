<template>
  <h1 v-if="tag">Videos with tag "{{ tag.name }}"</h1>
  <ul class="VideoList">
    <li class="VideoList-item" v-for="video in getVideosOnTag(this.$route.params.id)">
      <VideoListVideo :video="video" />
    </li>
  </ul>
</template>
<script>
import { useVideosStore } from '@/stores/videos'
import { mapState } from 'pinia'
import VideoListVideo from '@/components/VideoListVideo.vue'

export default {
  components: {
    VideoListVideo
  },
  computed: {
    tag() {
      return this.getTag(this.$route.params.id)
    },
    ...mapState(useVideosStore, ['getTag', 'getVideosOnTag'])
  }
}
</script>
