import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './plugins/element.js'
import './plugins/plugin'
// import request from './utils/http'
import request from './utils/request'

Vue.prototype.$http = request
Vue.prototype.$loadingMain = function (text = '加载中') {
  return this.$loading({
    target: document.getElementById('main'),
    lock: true,
    text: text,
    spinner: 'el-icon-loading'
  })
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
