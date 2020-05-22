import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events'
Vue.use(ElementUI);
Vue.config.productionTip = false

// mock开关 开发环境下使用mock
process.env.NODE_ENV == "development" && require('@/mock/api.js');

Vue.prototype.axios = axios
// 接口错误拦截
axios.interceptors.response.use(function (response) {
  // code 返回类型 0正常 10未登录 
  let res = response.data;
  // let path = location.hash;
  if (res.code == 0) {
    return res.data;
  } else if (res.code == 10) {
    // if (path != '#/index') {
    window.location.href = '/#/login';
    // }
    // return Promise.reject(res);
  } else {
    // console.log(res);
    return Promise.reject(res);
  }
}, (error) => {
  let err = error.response;
  // console.log(err);
  return Promise.reject(err);
});

// api接口管理
import utils from '@/utils/utils.js';
Vue.prototype.Utils = utils;
// 封装storage
import storage from "@/storage/index.js";
Vue.prototype.storage = storage;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
