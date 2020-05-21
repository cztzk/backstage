import Vue from 'vue';
import Router from 'vue-router';
import home from "@/pages/home.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/',
      component: home,
      name: '首页',
      children: [
        {
          path: '/index',
          component: () => import('@/pages/index.vue'),
          name: '主页'
        },
      ]
    },
    {
      path: '/404',
      name: 'notfound',
      component: () => import('@/pages/notfound.vue'),
    },
    {
      path: '*',
      redirect: "/404"
    },//全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
  ]
})
