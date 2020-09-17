import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import 'zingchart/es6'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import zingchartVue from 'zingchart-vue'
import VueWindowSize from 'vue-window-size'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueWindowSize)

Vue.component('zingchart', zingchartVue)

Vue.mixin({
  methods: {
    makeToast: function(message) {
      this.$bvToast.toast(message, {
        title: 'Message',
        autoHideDelay: 5000,
        toaster: 'b-toaster-bottom-right',
        appendToast: true
      })
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
