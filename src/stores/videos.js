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
    async deleteVideo(videoID) {
      let response = await Api().delete(`/videos/${videoID}`)
      if (response.status == 200 || response.status == 204) {
        const videos = this.videos.filter((video) => video.id != videoID)
        this.videos = videos
      }
    },
    async loadVideos() {
      const response = await Api().get('/videos')
      const playedVideos = window.localStorage.playedVideos
        ? JSON.parse(window.localStorage.playedVideos)
        : []

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
      let playedVideos = this.playedVideos.concat(videoID)
      window.localStorage.playedVideos = JSON.stringify(playedVideos)
      this.playedVideos = playedVideos
    },
    async editVideo(video) {
      const response = await Api().put(`/videos/${video.id}`, video)
      const newVideo = response.data.data.attributes
      this.videos.forEach((video) => {
        if (video.id == newVideo.id) {
          video - newVideo
        }
      })
    }
  }
})
