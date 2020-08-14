import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import {
  checktoken
} from '@/api/apis'


Vue.use(VueRouter)
var router = new VueRouter({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: () => import('../pages/Main'),
      children: [{
          path: '/Main/',
          name: 'Main/Index',
          component: () => import('../pages/main/Index'),
          meta: {
            headerlist: ['首页']
          }
        },
        {
          path: '/Main/Indent',
          name: 'Main/Indent',
          component: () => import('../pages/main/Indent'),
          meta: {
            headerlist: ['订单管理']
          }
        },
        {
          path: '/Main/Statistics',
          name: 'Main/Statistics',
          component: () => import('../pages/main/Statistics'),
          meta: {
            headerlist: ['销售统计', '订单统计']
          }
        },
        {
          path: '/Main/Store',
          name: 'Main/Store',
          component: () => import('../pages/main/Store'),
          meta: {
            headerlist: ['店铺管理']
          }
        },
        {
          path: '/Main/Message',
          name: 'Main/Message',
          component: () => import('../pages/main/Message'),
          meta: {
            headerlist: ['账号管理', '账号信息']
          }
        },
        {
          path: '/Main/Commodity',
          name: 'Main/Commodity',
          component: () => import('../pages/main/Commodity'),
          meta: {
            headerlist: ['商品管理', '商品分类']
          }
        },
        {
          path: '/Main/List',
          name: 'Main/List',
          component: () => import('../pages/main/List'),
          meta: {
            headerlist: ['商品管理', '商品列表']
          }
        },
        {
          path: '/Main/Add',
          name: 'Main/Add',
          component: () => import('../pages/main/Add'),
          meta: {
            headerlist: ['商品管理', '商品添加']
          }
        },
        {
          path: '/Main/ShopStatistics',
          name: 'Main/ShopStatistics',
          component: () => import('../pages/main/ShopStatistics'),
          meta: {
            headerlist: ['销售统计', '商品统计']
          }
        },
        {
          path: '/Main/ChangePwd',
          name: 'Main/ChangePwd',
          component: () => import('../pages/main/ChangePwd'),
          meta: {
            headerlist: ['账号管理', '修改密码']
          }
        },
        {
          path: '/Main/AccountList',
          name: 'Main/AccountList',
          component: () => import('../pages/main/AccountList'),
          meta: {
            headerlist: ['账号管理', '商品列表']
          }
        },
        {
          path: '/Main/AddAccount',
          name: 'Main/AddAccount',
          component: () => import('../pages/main/AddAccount'),
          meta: {
            headerlist: ['账号管理', '添加账号']
          }
        },

      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    checktoken(localStorage.token).then(res => {
      if (res.data.code == 0) {
        next()
      } else {
        next('/')
      }
    })
  } else {
    next()
  }
})

export default router