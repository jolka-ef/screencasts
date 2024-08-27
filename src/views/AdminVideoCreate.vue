<template>
  <h1>Video Create Page</h1>
  <VideoEditForm :video="video" buttonText="Create video" :saveVideo="createVideo" />
  <VideoListVideo :video="video" />
</template>
<script>
import { useVideosStore } from '@/stores/videos'
import { useSnackbarsStore } from '@/stores/snackbars'
import { mapActions } from 'pinia'
import VideoListVideo from '@/components/VideoListVideo.vue'
import VideoEditForm from '@/components/VideoEditForm.vue'
import router from '@/router'
export default {
  data() {
    return {
      video: {}
    }
  },
  components: {
    VideoListVideo,
    VideoEditForm
  },

  methods: {
    ...mapActions(useVideosStore, ['addVideo']),
    ...mapActions(useSnackbarsStore, ['setSnackbar']),

    async createVideo() {
      let video = await this.addVideo(this.video)
      this.setSnackbar({
        text: `You have successfully created new video, ${video.name.toUpperCase()}`
      })
      router.push({ name: 'video-watch', params: { id: video.id } })
    }
  }
}
</script>
