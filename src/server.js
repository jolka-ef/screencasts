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
      this.get('/tags')
      this.put('tags/:id', function () {
        return new Response(200)
      })
      this.delete('tags/:id')
      this.get('/users')
      this.post('/users')
      this.put('/videos/:id')
      this.delete('/videos/:id')
      this.get('/videos')
      this.post('/videos')
      this.get('/users/:id')
      this.post('/video_tags', function () {
        return new Response(201)
      })
      this.post('/video_tags/delete', function () {
        return new Response(200)
      })

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
      this.post('/tags', function ({ tags }, { requestBody }) {
        let json = JSON.parse(requestBody)
        let response = tags.create(json)
        return this.serialize(response)
      })
      this.post('/users', function (schema, request) {
        let json = JSON.parse(request.requestBody)
        let response = schema.users.create(json)
        return this.serialize(response)
      })
      this.post('/video_plays', function (schema, request) {
        return new Response(201)
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
        attrs: ['name', 'email', 'admin', 'playedVideos'],
        keyForAttribute(attr) {
          return attr
        }
      })
    }
  })

  return server
}
