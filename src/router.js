import Vue from 'vue'
import Router from 'vue-router'
import DataCenter from './views/DataCenter.vue'

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      meta: {index: 0},   // meta对象的index用来定义当前路由的层级,由小到大,由低到高
      component: DataCenter
    },
    {
      path: '/index.html',
      name: 'index',
      meta: {index: 0},   // meta对象的index用来定义当前路由的层级,由小到大,由低到高
      component: DataCenter
    },
    {
      path: '/clerk',
      name: 'clerk',
      meta: {index: 1},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 当访问的时候才会去加载(lazy-loaded)
      component: () => import('./views/ClerkRecord.vue')
    },
    {
      path: '/store',
      name: 'store',
      meta: {index: 1},
      component: () => import('./views/StoreRecord.vue')
    },
    {
      path: '/sell',
      name: 'sell',
      meta: {index: 1},
      component: () => import('./views/SellWell.vue')
    },
    {
      path: '/badSell',
      name: 'badSell',
      meta: {index: 1},
      component: () => import('./views/SellBad.vue')
    },
    {
      path: '/saleDetails',
      name: 'saleDetails',
      meta: {index: 1},
      component: () => import('./views/SaleDetails.vue')
    },
    {
      path: '/stockCount',
      name: 'stockCount',
      meta: {index: 1},
      component: () => import('./views/StockCount.vue')
    },
    {
      path: '/',
      name: 'index',
      meta: {index: 0},
      redirect: '/index'
    }
  ]
})
