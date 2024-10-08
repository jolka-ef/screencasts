import { defineStore } from 'pinia'
import { getSavedUser } from '@/utils/getSavedUser'
import Api from '@/services/api.js'

export const useVideosStore = defineStore('videos', {
  state: () => ({
    currentUser: {},
    tags: [],
    users: [],
    videos: []
  }),
  getters: {
    findVideo: (state) => (id) => state.videos.find((video) => video.id == id),
    getTag: (state) => (id) => state.tags.find((tag) => tag.id == id),
    getVideosOnTag: (state) => (id) =>
      state.videos.filter((video) =>
        state.tags.find((tag) => tag.id == id)?.videos_ids.includes(video.id)
      ),
    playedVideos: (state) => state.currentUser.playedVideos || [],
    isPlayed() {
      return (videoId) => this.playedVideos.includes(videoId)
    }
  },
  actions: {
    async createTag(name) {
      let response = await Api().post('/tags', { name })
      const tag = { id: response.data.data.id, videos_ids: [], ...response.data.data.attributes }
      const tags = this.tags.concat(tag)
      this.tags = tags
      return tag
    },
    connectTagToVideo(tag, video) {
      video.tag_ids = video.tag_ids.concat(tag.id)
      tag.videos_ids = tag.videos_ids.concat(video.id)
      Api().post('/video_tags', {
        video_id: video.id,
        tag_id: tag.id
      })
    },
    disconnectTagFromVideo(tag, video) {
      video.tag_ids = video.tag_ids.filter((id) => id != tag.id)
      tag.videos_ids = tag.videos_ids.filter((id) => id != video.id)
      Api().post('video_tags/delete', {
        video_id: video.id,
        tag_id: tag.id
      })
    },
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
    async deleteTag(tagId) {
      let response = await Api().delete(`/tags/${tagId}`)
      if (response.status == 200 || response.status == 204) {
        const tags = this.tags.filter((tag) => tag.id != tagId)
        this.tags = tags
      }
    },
    async updateTagName(tag) {
      await Api().put(`/tags/:${tag.id}`, { tag })
      let tagToUpdate = this.tags.find((t) => t.id == tag.id)
      tagToUpdate.name = tag.name
    },
    async loadUsers() {
      const response = await Api().get('/users')
      const users = await response.data.data.map((user) => {
        return {
          id: user.id,
          ...user.attributes
        }
      })
      this.users = users
    },
    async loadTags() {
      const response = await Api().get('/tags')
      const tags = response.data.data.map((tag) => {
        return {
          id: tag.id,
          ...tag.attributes,
          videos_ids: tag.relationships.videos.data.map((video) => video.id)
        }
      })
      this.tags = tags
    },
    async loadVideos() {
      const response = await Api().get('/videos')
      const videos = response.data.data.map((video) => {
        return {
          id: video.id,
          ...video.attributes,
          tag_ids: video.relationships.tags.data.map((tag) => tag.id)
        }
      })
      this.videos = videos
    },
    async loginUser(loginInfo) {
      try {
        let response = await Api().post('/sessions', loginInfo)
        let user = response.data.data.attributes
        user.id = response.data.data.id
        this.setCurrentUser(user)
        return user
      } catch {
        return { error: 'email/password  combination was incorrect. Please try again.' }
      }
    },
    async registerUser(registrationInfo) {
      try {
        let response = await Api().post('/users', registrationInfo)
        let user = response.data.data.attributes
        user.id = response.data.data.id
        user.playedVideos = this.playedVideos
        this.setCurrentUser(user)
        return user
      } catch (e) {
        return { error: 'There was an error. Please try again.' }
      }
    },
    async loadPlayedVideos(userId) {
      let response = await Api().get(`/users/${userId}`)
      let user = response.data.data.attributes
      this.currentUser.playedVideos = user.playedVideos
    },

    async loadCurrentUser() {
      const user = getSavedUser()
      this.currentUser = user
      user && this.loadPlayedVideos(user.id)
    },
    logoutUser() {
      this.currentUser = {}
      window.localStorage.currentUser = JSON.stringify({})
    },
    markVideoPlayed(videoID) {
      if (this.currentUser.name) {
        let playedVideos = this.currentUser.playedVideos.concat(videoID)
        this.currentUser.playedVideos = playedVideos
        Api().post('/video_plays', { video_id: videoID })
      }
    },
    async editVideo(video) {
      const response = (await Api().put(`/videos/${video.id}`, video)).data.data

      const newVideo = {
        id: response.id,
        ...response.attributes,
        tag_ids: response.relationships.tags.data.map((tag) => tag.id)
      }

      this.videos.forEach((video) => {
        if (video.id == newVideo.id) {
          video = newVideo
        }
      })

      return newVideo
    },
    setCurrentUser(user) {
      this.currentUser = user
      window.localStorage.currentUser = JSON.stringify(user)
    },

    updateTags(videoID, newTags) {
      const video = this.findVideo(videoID)
      video.tag_ids = newTags.map((tag) => tag.id)
    }
  }
})
