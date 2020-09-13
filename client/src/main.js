import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueWindowSize from 'vue-window-size'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueWindowSize)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
