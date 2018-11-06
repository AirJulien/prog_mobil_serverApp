import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import store from './store/index'
import router from './router'
import VueCookie from 'vue-cookie'
import axios from 'axios'

Vue.use(VueCookie)
Vue.config.productionTip = false

const token = localStorage.getItem('jwtToken')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
