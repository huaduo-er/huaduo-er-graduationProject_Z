import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import global from './global.js'
//命名并设置全局变量
Vue.prototype.$global = global


import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

// 导入axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = "http://47.94.96.115:8099/"
// 挂载原型
Vue.prototype.$http = axios

// 为每次一请求都在header中携带token
axios.interceptors.request.use(config => {
  console.log(window.sessionStorage.getItem("token"))
  // 每一次请求都携带
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
