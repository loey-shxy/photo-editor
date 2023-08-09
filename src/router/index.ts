import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      name: 'Index',
      component: async() => await import('@/views/home/home.vue')
    }
  ]
})

export default router