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
      this.post('/users')
      this.get('/tags')
      this.put('/videos/:id')
      this.delete('/videos/:id')
      this.get('/videos')
      this.post('/videos')
      this.post('/sessions', function (schema, request) {
        let json = JSON.parse(request.requestBody)
        let response = schema.users.findBy({ email: json.email })
        if (json.password == 'aaaaaaaa') {
          // your actual backend should test the hashed password in the DB
          return this.serialize(response)
        } else {
          return new Response(401)
        }
      })
      this.post('/users', function (schema, request) {
        let json = JSON.parse(request.requestBody)
        let response = schema.users.create(json)
        return this.serialize(response)
      })
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
      tag: JSONAPISerializer.extend({ include: ['videos'] }),
      user: JSONAPISerializer.extend({
        attrs: ['name', 'email', 'admin']
      })
    }
  })

  return server
}
