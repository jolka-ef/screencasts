import { createServer, Model } from 'miragejs'
import videosJSON from '@/mirage/videos.json'

export function makeServer({ environment = 'development' } = {}) {
  console.log('server')
  let server = createServer({
    environment,

    models: {},

    seeds(server) {},

    routes() {
      this.namespace = 'api'

      this.get('/videos', ({ db }, request) => {
        return db.videos
      })
    }
  })
  server.db.loadData({ videos: videosJSON })

  return server
}
