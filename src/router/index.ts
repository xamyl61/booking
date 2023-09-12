import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Complete from '@/pages/Complete.vue'
import Lk from "@/pages/Lk.vue";
import {getAccessToken} from "@/utils/token";


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
      path: '/lk',
      name: 'lk',
      component: Lk,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = getAccessToken()
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});


export default router
