<script>
import { useVideosStore } from '@/stores/videos'
import { mapState } from 'pinia'

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
    },
    ...mapState(useVideosStore, ['findVideo', 'getTag', 'videos'])
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
  </div>

  <nav>
    <ul class="TagsList">
      <li v-for="tag_id in video.tag_ids">
        <a class="TagsList-link">{{ getTag(tag_id).name }}</a>
      </li>
    </ul>
  </nav>

  <h1>{{ video.name }}</h1>

  <div v-html="video.description"></div>
</template>
<style>
.TagsList {
  list-style: none;
  display: flex;
  justify-content: end;
  gap: 0.75em;

  padding: 0;
}
.TagsList-link {
  cursor: pointer;
  display: inline-block;
  font-size: 1.25em;
  padding: 0.375em 0.5em;
  background-color: #d6f3e7;
  border-radius: 10px;
}
.video-watch.video-js {
  width: 50vw;
  aspect-ratio: 2 / 1;
  height: auto;
  margin: 2em auto;
}
</style>
