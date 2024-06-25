<template>
  <!-- <VideoListVideo :video="video" /> -->
  <h1>Video Create Page</h1>
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
    <v-btn @click="createVideo">Create Video</v-btn>
  </form>
</template>
<script>
import { useVideosStore } from '@/stores/videos'
import { mapActions } from 'pinia'
import VideoListVideo from '@/components/VideoListVideo.vue'
import router from '@/router'
export default {
  data() {
    return {
      video: {}
    }
  },
  components: {
    VideoListVideo
  },

  methods: {
    ...mapActions(useVideosStore, ['addVideo']),
    async createVideo() {
      let video = await this.addVideo(this.video)
      this.$router.push({ name: 'video-watch', params: { id: video.id } })
    }
  }
}
</script>
