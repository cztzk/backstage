import Vue from 'vue';
import Router from 'vue-router';
import home from "@/pages/home.vue";

// vue-router跳转相同路径报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

// parameter 是否带有参数
// jurisdiction 是否需要权限跳转
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
      meta: {
        title: "登录",
        hidden: true
      },
    },
    {
      path: '/',
      component: home,
      tips: "首页",
      icons: "el-icon-s-home",
      redirect: {
        name: 'Index'
      },
      children: [{
        path: '/index',
        component: () => import('@/pages/index.vue'),
        name: 'Index',
        meta: {
          title: "首页",
        },
      }],
      meta: {
        title: "首页",
      },
    },
    {
      path: '/',
      component: home,
      tips: "消息",
      icons: "el-icon-message-solid",
      children: [{
        path: '/forms',
        component: () => import('@/pages/forms.vue'),
        name: 'forms',
        meta: {
          title: "表单",
        },
      }, {
        path: '/tables/:id',
        component: () => import('@/pages/tables.vue'),
        name: 'tables',
        parameter: true,
        meta: {
          subtitle: "列表",
          parameter: true,
          titles: [
            {
              id: 1,
              title: "列表1",
              path: "/tables/1"
            }, {
              id: 2,
              title: "列表2",
              path: "/tables/2"
            }
          ]
        },
      },
      {
        path: '/msgTab',
        name: 'msgTab',
        component: () => import('@/pages/msgTab.vue'),
        meta: {
          title: "我的消息",
        },
      }]
    },
    {
      path: '/',
      component: home,
      tips: "富文本",
      icons: "el-icon-document",
      children: [{
        path: '/wangEditor',
        name: 'wangEditor',
        component: () => import('@/pages/wangEditor.vue'),
        meta: {
          title: "富文本",
        },
      }]
    },
    {
      path: '/',
      component: home,
      tips: "错误处理",
      icons: "el-icon-warning",
      children: [{
        path: '/404',
        name: 'notfound',
        component: () => import('@/pages/notfound.vue'),
        meta: {
          title: "404",
        },
      },
      {
        path: '/jurisdictions',
        name: 'jurisdictions',
        component: () => import('@/pages/jurisdictions.vue'),
        meta: {
          title: "权限测试",
          jurisdiction: true
        },
      },
      {
        path: '/403',
        name: 'jurisdiction',
        component: () => import('@/pages/jurisdiction.vue'),
        meta: {
          title: "403",
          hidden: true,
        },
      }]
    },
    {
      path: '*',
      redirect: "/404",
      meta: {
        title: "404",
        hidden: true,
      },
    },//全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
  ]
})