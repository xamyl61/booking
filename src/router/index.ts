import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Complete from '@/pages/Complete.vue'
import Booking from '@/pages/Booking.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/complete',
        name: 'complete',
        component: Complete
    },
    {
      path: '/booking',
        name: 'booking',
        component: Booking,
    },
  ]
})
export default router
