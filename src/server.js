import { createServer, Model, JSONAPISerializer, hasMany } from 'miragejs'
import tagsJSON from '@/mirage/tags.json'
import usersJSON from '@/mirage/users.json'

import videosJSON from '@/mirage/videos.json'

export function makeServer({ environment = 'development' } = {}) {
  console.log('server')
  let server = createServer({
    environment,
    fixtures: { users: usersJSON, videos: videosJSON, tags: tagsJSON },
    models: {
      user: Model,
      video: Model.extend({ tags: hasMany() }),
      tag: Model.extend({ videos: hasMany() })
    },
    routes() {
      this.namespace = 'api'
      this.get('/users')
      this.get('/tags')
      this.delete('/videos/:id')
      this.get('/videos')
      this.post('/videos')
      this.post('/sessions', function (schema, request) {
        let json = JSON.parse(request.requestBody)
        let response = schema.users.findBy({ name: json.name })
        return this.serialize(response)
      })
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
