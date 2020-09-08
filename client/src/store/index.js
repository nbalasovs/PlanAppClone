import Vue from 'vue'
import Vuex from 'vuex'
const {isAuthenticated, getUsername, getUserId, getStatus} = require('../services/AuthServices')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    apiURL: 'http://localhost:3000',
    username: null,
    userId: null,
    isAdmin: null,
  },
  mutations: {
    authenticate(state) {
      state.isAuthenticated = isAuthenticated()
      
      if(state.isAuthenticated) {
        state.username = getUsername()
        state.userId = getUserId()
        state.isAdmin = getStatus()
      } else {
        state.username = null
        state.userId = null
        state.isAdmin = null
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  }
})
