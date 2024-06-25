<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useVideosStore } from '@/stores/videos'
const store = useVideosStore()
const { loadVideos } = store
loadVideos()
</script>

<template>
  <header class="Header">
    <nav class="HeaderNav">
      <RouterLink class="HeaderNav-link" to="/">Vue Screencast</RouterLink>
      <RouterLink class="HeaderNav-link" to="/video/new">Add video</RouterLink>
      <RouterLink class="HeaderNav-link" to="/about">Login</RouterLink>
    </nav>
  </header>
  <main class="ContentContainer">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style scoped>
.ContentContainer {
  max-width: 1200px;
  margin: 0 auto;
}
.ContentContainer,
.Header {
  padding: var(--v-gap);
}
.Header {
  background-color: #f1d8cf;
  position: sticky;
  top: 0;
  box-shadow:
    rgba(0, 0, 0, 0.17) 1px 4px 7px,
    rgba(0, 0, 0, 0.24) 1px 3px 6px;
}
.HeaderNav {
  display: flex;
  justify-content: space-between;
}
.HeaderNav-link {
  color: inherit;
  font-weight: bold;
  padding: 0.35em 0.9rem;
  text-decoration: none;
  text-transform: uppercase;
}
.HeaderNav-link:hover,
.HeaderNav-link:focus {
  background-color: rgb(0 0 0 / 9%);
  border-radius: 0.675em;
}
</style>
