import Vue from 'vue'
import VueRouter from 'vue-router'
import {isAuthenticated, getStatus} from '../services/AuthServices'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Authentication/Login.vue'),
    beforeEnter: (to, from, next) => {
      if(!isAuthenticated()) {
        next()
      } else {
        next({ name: 'Home' })
      }
    }
  },
  {
    path: '/secureregisterpath',
    name: 'Register',
    component: () => import('../views/Authentication/Registration.vue'),
    beforeEnter: (to, from, next) => {
      if(isAuthenticated() && getStatus()) {
        next()
      } else {
        next({ name: 'Login' })
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: () => import('../views/Dashboard/Home.vue'),
    beforeEnter: (to, from, next) => {
      if(isAuthenticated()) {
        next()
      } else {
        next({ name: 'Login' })
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
