import store from '../store'
const axios = require('axios')
const jwt = require('jsonwebtoken')

function request() {
  return axios.create({
    baseURL: store.state.apiURL,
    headers: {
      Authorization: getToken()
    }
  })
}

export function isAuthenticated() {
  const token = localStorage.getItem('token')
  return token != null;
}

export function login(user) {
  return request().post('/api/auth', user)
  .then(res => {
    if(res) {
      setToken(res.data.token)
      return true
    }
  })
  .catch(err => {
    if(err.response.status === 401) {
      return false
    }
  })
}

export function logout() {
  localStorage.clear()
  store.dispatch('authenticate')
}

function setToken(token) {
  localStorage.setItem('token', token)
  store.dispatch('authenticate')
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getUsername() {
  const token = decodeToken()
  if(!token) return null
  return token.user.username
}

export function getUserId() {
  const token = decodeToken()
  if(!token) return null
  return token.user.id
}

export function getStartYear() {
  const token = decodeToken()
  if(!token) return null
  return token.user.startYear
}

export function getStatus() {
  const token = decodeToken()
  if(!token) return null
  return token.user.isAdmin
}

export function registerUser(user) {
  return request().post('/api/register', user).then(res => {
    if(res.response.status === 201) return true
    else return false
  }).catch(e => e)
}

function decodeToken() {
  const token = getToken()
  if(!token) return null
  return jwt.decode(token)
}