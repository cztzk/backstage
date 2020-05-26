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
    },
    {
      path: '/',
      component: home,
      redirect: {
        name: 'Index'
      },
      meta: {
        title: "首页",
        parameter: false
      },
      children: [
        {
          path: '/index',
          component: () => import('@/pages/index.vue'),
          name: 'Index',
          meta: {
            title: "首页",
            parameter: false
          },
        }, {
          path: '/forms',
          component: () => import('@/pages/forms.vue'),
          name: 'forms',
          meta: {
            title: "表单",
            parameter: false
          },
        }, {
          path: '/tables/:id',
          component: () => import('@/pages/tables.vue'),
          name: 'tables',
          meta: {
            parameter: true,
            titles: [
              {
                id: 1,
                title: "列表1"
              }, {
                id: 2,
                title: "列表2"
              }
            ]
          },
        },
        {
          path: '/404',
          name: 'notfound',
          component: () => import('@/pages/notfound.vue'),
          meta: {
            title: "404",
            parameter: false
          },
        },
        {
          path: '/jurisdictions',
          name: 'jurisdictions',
          component: () => import('@/pages/jurisdictions.vue'),
          meta: {
            title: "权限测试",
            parameter: false,
          },
        },
        {
          path: '/403',
          name: 'jurisdiction',
          component: () => import('@/pages/jurisdiction.vue'),
          meta: {
            title: "403",
            parameter: false,
            jurisdiction: true
          },
        },
      ]
    },

    {
      path: '*',
      redirect: "/404"
    },//全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
  ]
})