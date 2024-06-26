import { createServer, Model, JSONAPISerializer, hasMany } from 'miragejs'
import videosJSON from '@/mirage/videos.json'
import tagsJSON from '@/mirage/tags.json'

export function makeServer({ environment = 'development' } = {}) {
  console.log('server')
  let server = createServer({
    environment,
    fixtures: { videos: videosJSON, tags: tagsJSON },
    models: { video: Model.extend({ tags: hasMany() }), tag: Model.extend({ videos: hasMany() }) },
    routes() {
      this.namespace = 'api'
      this.delete('/videos/:id')
      this.get('/videos')
      this.get('/tags')
      this.post('/videos')
      this.put('/videos/:id')
    },
    serializers: {
      application: JSONAPISerializer,
      video: JSONAPISerializer.extend({
        include: ['tags'],
        normalize(json) {
          return {
            data: {
              type: 'video',
              attributes: json
            }
          }
        }
      }),
      tag: JSONAPISerializer.extend({ include: ['videos'] })
    }
  })

  return server
}
