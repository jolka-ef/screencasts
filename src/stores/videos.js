import { defineStore } from 'pinia'
import Api from '@/services/api.js'

export const useVideosStore = defineStore('videos', {
  state: () => ({ tags: [], videos: [] }),
  getters: {
    findVideo: (state) => (id) => state.videos.find((video) => video.id == id),
    getTag: (state) => (id) => state.tags.find((tag) => tag.id == id)
  },
  actions: {
    async loadVideos() {
      const response = await Api().get('/videos')
      const tags = response.data.included
        .filter((item) => item.type === 'tags')
        .map((tag) => {
          return { id: tag.id, ...tag.attributes }
        })
      const videos = await response.data.data.map((video) => {
        return {
          id: video.id,
          ...video.attributes,
          tag_ids: video.relationships.tags.data.map((tag) => tag.id)
        }
      })
      this.tags = tags
      this.videos = videos
    }
  }
})
