import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/invoice/:id',
      name: 'invoice',
      component: () => import('../views/invoice.vue')
    }
  ]
})

export default router
