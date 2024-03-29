import Vue from 'vue'
import VueRouter from 'vue-router'
import {isAuthenticated, getStatus} from '../services/AuthServices'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      title: 'PlanApp Clone'
    },
    component: () => import('../views/Authentication/Login.vue'),
    beforeEnter: (to, from, next) => {
      if(!isAuthenticated()) next()
      else next({ name: 'Home' })
    }
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: 'Registration'
    },
    component: () => import('../views/Authentication/Registration.vue'),
    beforeEnter: (to, from, next) => {
      if(isAuthenticated() && getStatus()) next()
      else next({ name: 'Login' })
    }
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Home'
    },
    component: () => import('../views/Home.vue'),
    beforeEnter: (to, from, next) => {
      if(isAuthenticated()) next()
      else next({ name: 'Login' })
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: 'Dashboard'
    },
    component: () => import('../views/Dashboard/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if(isAuthenticated) next()
      else next({ name: 'Login' })
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title || 'PlanApp Clone'
  })
})

export default router
