<template>
  <VideoEditForm v-if="video" :video="video" :saveVideo="saveVideo" buttonText="Save video" />
</template>
<script>
import { mapState } from 'pinia'
import { useVideosStore } from '@/stores/videos'
import VideoEditForm from '@/components/VideoEditForm.vue'
export default {
  components: { VideoEditForm },
  computed: {
    ...mapState(useVideosStore, ['editVideo', 'findVideo', 'setSnackbar']),
    video() {
      return this.findVideo(this.$route.params.id)
    }
  },
  methods: {
    async saveVideo() {
      let video = await this.editVideo(this.video)
      this.setSnackbar({
        text: `You have successfully edited Your video, ${video.name.toUpperCase()}`
      })

      this.$router.push({ name: 'admin-video-list' })
    }
  }
}
</script>
