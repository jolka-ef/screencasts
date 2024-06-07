<script setup>
import { useVideosStore } from '@/stores/videos'
const videosStore = useVideosStore()
</script>

<template>
  <main>
    <h1>Videos</h1>
    <ul>
      <li class="video-box" v-for="video in videosStore.videos">
        <RouterLink :to="{ name: 'video-watch', params: { id: video.id } }">
          <img class="video-image" :src="video.thumbnail" />
          <h3>{{ video.name }}</h3>
          <div v-html="video.description"></div>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
<style scoped>
h1,
h3 {
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
.video-image {
  grid-area: image;
  width: 20vw;
}
</style>
