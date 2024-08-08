<template>
  <v-btn text to="/admin/video/new" @click="">Add Video</v-btn>
  <table>
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
        <th scope="row">{{ video.name }}</th>
        <td>
          {{ abbreviate(video.description) }}
        </td>
        <td class="Actions">
          <RouterLink :to="{ name: 'admin-video-edit', params: { id: video.id } }">Edit</RouterLink>
          <RouterLink :to="{ name: 'video-watch', params: { id: video.id } }">Watch</RouterLink>
          <RouterLink :to="{ name: 'admin-video-show', params: { id: video.id } }">Show</RouterLink>

          <v-btn size="x-small" @click="deleteVideo(video)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { useVideosStore } from '@/stores/videos'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useVideosStore, ['setSnackbar', 'videos'])
  },
  methods: {
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
        this.setSnackbar({
          text: `You have successfully deleted your video, ${video.name.toUpperCase()}`
        })
      }
    }
  }
}
</script>
<style scoped>
.Actions {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
caption {
  font-size: 2em;
  font-weight: bold;
}
table {
  width: 100%;
  border-collapse: collapse;
}
/* Zebra striping */
tr:nth-of-type(odd) {
  background: #eee;
}
thead th {
  background: var(--dark-green);
  color: white;
  font-weight: bold;
}
td,
th {
  padding: 6px;
  border: 1px solid #ccc;
  text-align: left;
}
</style>
