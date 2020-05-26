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

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | backstage`;
  // 判断是否已登录
  let role = window.sessionStorage.getItem('user');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.jurisdiction) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //grade 等级 0游客 1用户 2超级管理员
    console.log(role);
    role.grade === '2' ? next() : next('/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
