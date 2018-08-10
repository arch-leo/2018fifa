import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/vslist',
      name: 'vslist',
      component: () => import('@/pages/vslist')
    },
    {
      path: '/mybet',
      name: 'mybet',
      component: () => import('@/pages/mybet')
    },
    {
      path: '/bill',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/bill/:id',
      name: 'bill',
      component: () => import('@/pages/bill')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/pages/user')
    },
    {
      path: '/log',
      name: 'log',
      component: () => import('@/pages/log')
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('@/pages/reg')
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/pages/notice')
    },
    {
      path: '/matchs',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/matchs/:id',
      name: 'matchs',
      component: () => import('@/pages/matchs')
    },
    {
      path: '/playrules',
      name: 'playrules',
      component: () => import('@/pages/playrules')
    },
    {
      path: '/playsets',
      name: 'playsets',
      component: () => import('@/pages/playsets')
    },
    {
      path: '/playdeclar',
      name: 'playdeclar',
      component: () => import('@/pages/playdeclar')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/pages/settings')
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('@/pages/recharge')
    },
    {
      path: '/recharge/:id',
      name: 'recharge-detail',
      component: () => import('@/pages/recharge-detail')
    },
    {
      path: '/recharge/:id/:type',
      name: 'recharge-progress',
      component: () => import('@/pages/recharge-progress')
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('@/pages/withdraw')
    },
    {
      path: '/bindcash',
      name: 'bindcash',
      component: () => import('@/pages/bindcash')
    },
    {
      path: '/bindbank',
      name: 'bindbank',
      component: () => import('@/pages/bindbank')
    },
    {
      path: '/resetpwd',
      name: 'resetpwd',
      component: () => import('@/pages/resetpwd')
    },
    {
      path: '/resetcash',
      name: 'resetcash',
      component: () => import('@/pages/resetcash')
    },
    {
      path: '/safecenter',
      name: 'safecenter',
      component: () => import('@/pages/safecenter')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/pages/services')
    },
    {
      path: '/userlist',
      redirect: {
        name: 'user'
      }
    },
    {
      path: '/userlist/:id',
      name: 'userlist',
      component: () => import('@/pages/userlist')
    },
    {
      path: '/advice',
      name: 'advice',
      component: () => import('@/pages/advice')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('@/pages/activity')
    },
    {
      path: '/plays',
      name: 'plays',
      component: () => import('@/pages/plays')
    },
    {
      path: '**',
      redirect: {
        name: 'index'
      }
    }
  ]
})
