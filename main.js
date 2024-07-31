import App from './App'

import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from 'uview-ui'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
