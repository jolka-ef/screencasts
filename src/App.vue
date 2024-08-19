<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useVideosStore } from '@/stores/videos'
const store = useVideosStore()
const { loadTags, loadVideos, loadCurrentUser } = store
loadVideos()
loadTags()
loadCurrentUser()
</script>

<template>
  <header class="Header">
    <nav class="HeaderNav">
      <RouterLink class="HeaderNav-link" to="/">Vue Screencast</RouterLink>
      <RouterLink class="HeaderNav-link" to="/admin" v-if="useVideosStore().currentUser.admin"
        >Admin</RouterLink
      >
      <div v-if="useVideosStore().currentUser.name">
        <p>{{ useVideosStore().currentUser.name }}</p>
        <v-btn @click="store.logoutUser()" class="HeaderNav-link" to="">Logout</v-btn>
      </div>
      <div v-else>
        <RouterLink class="HeaderNav-link" to="/login">Login</RouterLink>
        <RouterLink class="HeaderNav-link" to="/registration">Register</RouterLink>
      </div>
    </nav>
  </header>
  <main class="ContentContainer">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
  <v-snackbar
    v-for="(snackbar, index) in useVideosStore().snackbars.filter((snackbar) => snackbar.showing)"
    v-model="snackbar.showing"
    :style="`bottom: ${index * 70}px`"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.text }}
    <v-btn @click="snackbar.showing = false" variant="text" size="small">CLOSE</v-btn>
  </v-snackbar>
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
