import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入组件库
import {Dialog, Picker} from './../packages'
// import lijiUI from './../packages'
import '~/style/liji-ui.scss'
Vue.use(Dialog)
Vue.use(Picker)
// Vue.use(lijiUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
