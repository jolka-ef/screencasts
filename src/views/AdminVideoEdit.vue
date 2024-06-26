<template>
  <form>
    <v-text-field label="Name" v-model="video.name" variant="solo-filled" />
    <v-textarea label="Description" v-model="video.description" variant="solo-filled" />
    <v-text-field label="Thumbnail URL" v-model="video.thumbnail" variant="solo-filled" />
    <v-text-field
      label="Video Url"
      v-model="video.videoUrl"
      variant="solo-filled"
      hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo."
    />
    <v-btn @click="saveVideo">Save Video</v-btn>
  </form>
</template>
<script>
import { mapState } from 'pinia'
import { useVideosStore } from '@/stores/videos'
export default {
  computed: {
    ...mapState(useVideosStore, ['editVideo', 'findVideo']),
    video() {
      return this.findVideo(this.$route.params.id)
    }
  },
  methods: {
    async saveVideo() {
      await this.editVideo(this.video)
      this.$router.push({ name: 'admin-video-list' })
    }
  }
}
</script>
