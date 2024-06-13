import { defineStore } from 'pinia'
import Api from '@/services/api.js'

export const useVideosStore = defineStore('videos', {
  state: () => ({ videos: [] }),
  getters: {},
  actions: {
    async loadVideos() {
      const response = await Api().get('/videos')
      const videos = await response.data.data.map((video) => {
        return { id: video.id, ...video.attributes }
      })
      console.log(videos)
      this.videos = videos
    },
    findVideo(videoId) {
      return this.videos.find((video) => video.id == videoId)
    }
  }
})
