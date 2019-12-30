import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/index.js'
import ElementUI from 'element-ui'
import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
