<template>
  <VideoEditForm :video="video" :saveVideo="saveVideo" buttonText="Save video" />
</template>
<script>
import { mapState } from 'pinia'
import { useVideosStore } from '@/stores/videos'
import VideoEditForm from '@/components/VideoEditForm.vue'
export default {
  components: { VideoEditForm },
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
