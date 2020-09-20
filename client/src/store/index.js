import Vue from 'vue'
import Vuex from 'vuex'
const {isAuthenticated, getUsername, getUserId, getStatus, getStartYear} = require('../services/AuthServices')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    apiURL: `${window.location.protocol}//${window.location.hostname}:3000`,
    username: null,
    userId: null,
    isAdmin: null,
    startYear: null,
  },
  mutations: {
    authenticate(state) {
      state.isAuthenticated = isAuthenticated()
      
      if(state.isAuthenticated) {
        state.username = getUsername()
        state.userId = getUserId()
        state.isAdmin = getStatus()
        state.startYear = getStartYear()
      } else {
        state.username = null
        state.userId = null
        state.isAdmin = null
        state.startYear = null
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  }
})
