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
      this.get('/videos')
      this.get('/tags')
    },
    serializers: {
      application: JSONAPISerializer,
      video: JSONAPISerializer.extend({ include: ['tags'] }),
      tag: JSONAPISerializer.extend({ include: ['videos'] })
    }
  })

  return server
}

// import { createServer, Model, JSONAPISerializer, hasMany } from 'miragejs'
// import videosJSON from '@/mirage/videos.json'
// import tagsJSON from '@/mirage/tags.json'

// export function makeServer({ environment = 'development' } = {}) {
//   console.log('server')
//   let server = createServer({
//     environment,
//     fixtures: { videos: videosJSON, tags : tagsJSON },
//     models: { video: Model.extend({tags: hasMany()}),tag: Model.extend({videos: hasMany()}) },

//     seeds(server) {},
//     serializers: { application: JSONAPISerializer,
//     video : JSONAPISerializer.extend({include : ['tags']}),
//     tag : JSONAPISerializer.extend({include : ['videos']}),

//     routes() {
//       this.namespace = 'api'
//       this.get('/videos')
//     }
//   })

//   return server
// }
