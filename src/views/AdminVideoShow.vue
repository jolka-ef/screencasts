<template>
  <h4>{{ video.name }}</h4>
  <p v-html="video.description"></p>
  <v-combobox
    label="Tags"
    :items="tags"
    item-title="name"
    item-value="name"
    v-model="videoTags"
    closable-chips
    chips
    hide-selected=""
    multiple=""
    return-object
  >
  </v-combobox>
</template>
<script>
import { mapState } from 'pinia'
import { useVideosStore } from '@/stores/videos'
import _ from 'lodash'
export default {
  computed: {
    ...mapState(useVideosStore, [
      'createTag',
      'connectTagToVideo',
      'disconnectTagFromVideo',
      'findVideo',
      'getTag',
      'setSnackbar',
      'tags',
      'updateTags'
    ]),
    video() {
      return this.findVideo(this.$route.params.id) || {}
    },
    videoTags: {
      get() {
        return (this.video.tag_ids && this.video.tag_ids.map((id) => this.getTag(id))) || []
      },
      async set(newTags) {
        const newTagName = newTags.find((tag) => typeof tag == 'string')
        if (newTagName) {
          const newTag = await this.createTag(newTagName)
          this.connectTagToVideo(newTag, this.video)
        } else {
          const addedTags = _.differenceBy(newTags, this.videoTags, 'id')
          const removedTags = _.differenceBy(this.videoTags, newTags, 'id')

          if (addedTags.length > 0) {
            this.connectTagToVideo(addedTags[0], this.video)
          }
          if (removedTags.length > 0) {
            this.disconnectTagFromVideo(removedTags[0], this.video)
          }
        }
      }
    }
  }
}
</script>
