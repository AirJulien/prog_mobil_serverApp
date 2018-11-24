import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/services/Api'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('jwtToken') || '',
    user: {},
    expirationDateToken : Date.now
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user, expirationDateToken) {
      state.status = 'success'
      state.token = token
      state.user = user
      state.expirationDateToken = expirationDateToken
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.expirationDateToken = ''
    }
  },
  actions: {
    login ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Api().post('/login', user)
          .then(res => {
            const token = res.data.token
            console.log("res.data" + JSON.stringify(res.data))
            const user = res.data.user
            const dateNow = new Date()
            const expirationDateToken = new Date(dateNow.getTime()+ parseInt(res.data.tokenExpiresIn))
            localStorage.setItem('jwtToken', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user,expirationDateToken)
            resolve(res)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('jwtToken')
            reject(err)
          })
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isAuth: state =>{
      console.log("state.expirationDateToken "+state.expirationDateToken)
      return (!!state.token && state.expirationDateToken >= Date.now) || (!!state.token && !state.expirationDateToken)},
    authStatus: state => state.status
  }
})
