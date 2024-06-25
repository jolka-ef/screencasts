import { defineStore } from 'pinia'
import Api from '@/services/api.js'

export const useVideosStore = defineStore('videos', {
  state: () => ({ playedVideos: [], tags: [], videos: [] }),
  getters: {
    findVideo: (state) => (id) => state.videos.find((video) => video.id == id),
    getTag: (state) => (id) => state.tags.find((tag) => tag.id == id),
    getVideosOnTag: (state) => (id) =>
      state.videos.filter((video) =>
        state.tags.find((tag) => tag.id == id).videos_ids.includes(video.id)
      ),
    isPlayed: (state) => (id) => state.playedVideos.includes(id)
  },
  actions: {
    async addVideo(video) {
      let response = await Api().post('/videos', video)
      let savedVideo = response.data.data
      savedVideo = { id: savedVideo.id, ...savedVideo.attributes }
      let videos = this.videos.concat(savedVideo)
      this.videos = videos
      return savedVideo
    },
    deleteVideo(videoID) {
      console.log(videoID)
      debugger
      const videos = this.videos.filter((video) => video.id != videoID)
      this.videos = videos
    },
    async loadVideos() {
      const response = await Api().get('/videos')
      const playedVideos = JSON.parse(window.localStorage.playedVideos)
      const tags = response.data.included

        .filter((item) => item.type === 'tags')
        .map((tag) => {
          return {
            id: tag.id,
            ...tag.attributes,
            videos_ids: tag.relationships.videos.data.map((video) => video.id)
          }
        })

      const videos = await response.data.data.map((video) => {
        return {
          id: video.id,
          ...video.attributes,
          tag_ids: video.relationships.tags.data.map((tag) => tag.id)
        }
      })
      this.playedVideos = playedVideos
      this.tags = tags
      this.videos = videos
    },
    markVideoPlayed(videoID) {
      let playedVideos = this.playedVideos.concat(Number(videoID))
      window.localStorage.playedVideos = JSON.stringify(playedVideos)
      this.playedVideos = playedVideos
    }
  }
})
