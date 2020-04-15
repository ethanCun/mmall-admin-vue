// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/store.js' //状态管理
import cookies from 'js-cookie' //cookie管理
import api from './common/api/api.js' //api
import axios from 'axios' //axios请求

//element-ui
Vue.use(ElementUI);


Vue.config.productionTip = false

//解决跨域问题
axios.defaults.withCredentials = true

//挂载js文件
Vue.prototype.$cookies = cookies;
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;

console.log('api:' + api.getVerifyCodeUrl)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
