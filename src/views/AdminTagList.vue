<template>
  <table>
    <caption>
      Tag List
    </caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Number of videos</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tag in tags">
        <th v-if="tagEditingId == tag.id">
          <v-text-field
            autofocus
            v-model="tag.name"
            @blur="updateTag(tag)"
            @keydown.enter="updateTag(tag)"
          />
        </th>
        <th scope="row" v-else @click="editTagName(tag.id)">{{ tag?.name }}</th>
        <td>
          <RouterLink :to="{ name: 'tag', params: { id: tag.id } }">{{
            tag?.videos_ids.length
          }}</RouterLink>
        </td>
        <td class="Actions">
          <v-btn size="x-small" @click="editTagName(tag.id)">Edit</v-btn>
          <v-btn size="x-small" @click="deleteTag(tag)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </table>
  <v-btn text to="/admin/tag/new" @click="">Add Tag</v-btn>
</template>

<script>
import { mapState } from 'pinia'
import { useVideosStore } from '@/stores/videos'

export default {
  data() {
    return { tagEditingId: '' }
  },

  computed: {
    ...mapState(useVideosStore, ['setSnackbar', 'tags', 'updateTagName'])
  },
  methods: {
    editTagName(id) {
      this.tagEditingId = id
    },
    deleteTag(tag) {
      let response = confirm(
        `Are you sure you want to delete ${tag.name} ? This tag is connected to ${tag.videos_ids.length} videos.`
      )

      if (response) {
        useVideosStore().deleteTag(tag.id)
        this.setSnackbar({
          text: `You have successfully deleted your tag, ${tag.name.toUpperCase()}`
        })
      }
    },
    updateTag(tag) {
      this.tagEditingId = ''
      this.updateTagName(tag)
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
