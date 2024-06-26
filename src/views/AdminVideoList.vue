<template>
  <v-btn text to="/video/new" @click="">Add Video</v-btn>
  <v-data-table>
    <caption>
      Video List
    </caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="video in videos">
        <div v-if="video">
          <th scope="row">{{ video.name }}</th>
          <td>
            {{ abbreviate(video.description) }}
          </td>
          <td>
            <RouterLink :to="{ name: 'admin-video-edit', params: { id: video.id } }"
              >Edit</RouterLink
            >
            <RouterLink :to="{ name: 'video-watch', params: { id: video.id } }">Show</RouterLink>
            <v-btn small @click="deleteVideo(video)">Delete</v-btn>
          </td>
        </div>
      </tr>
    </tbody>
  </v-data-table>
</template>
<script>
import { useVideosStore } from '@/stores/videos'
import { mapActions, mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useVideosStore, ['videos'])
  },
  methods: {
    // ...mapActions(useVideosStore, ['deleteVideo']),
    abbreviate(text) {
      if (text) {
        text = text.replace('<p>', '')
        return text.slice(0, 50)
      }
    },
    deleteVideo(video) {
      let response = confirm(`Are you sure you want to delete ${video.name}`)
      if (response) {
        useVideosStore().deleteVideo(video.id)
      }
    }
  }
}
</script>
