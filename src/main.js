// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import store from '@/store'
import Vuetify from 'vuetify'
import theme from './plugins/theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import router from "./router";

Vue.prototype.$http = axios
// Sets the default url used by all of this axios instance's requests
axios.defaults.baseURL = 'http://154.49.211.66:4000/api'
axios.defaults.headers.get['Accept'] = 'application/json'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['auth'] = token
}

// Sync store with router
sync(store, router)

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
