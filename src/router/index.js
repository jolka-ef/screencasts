import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TagVideoList from '@/views/TagVideoList.vue'
import VideoCreate from '../views/VideoCreate.vue'
import VideoWatch from '../views/VideoWatch.vue'
import AdminVideoEdit from '../views/AdminVideoEdit.vue'
import AdminVideoList from '../views/AdminVideoList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/admin/videos',
      name: 'admin-video-list',
      component: AdminVideoList
    },

    {
      path: '/admin/videos/:id/edit',
      name: 'admin-video-edit',
      component: AdminVideoEdit
    },

    {
      path: '/video/new',
      name: 'video-create',
      component: VideoCreate
    },
    { path: '/video/:id', name: 'video-watch', component: VideoWatch },
    { path: '/tag/:id', name: 'tag', component: TagVideoList }
  ]
})

export default router
