// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {getItem} from './utils/localstorage'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/iconfont/iconfont.css'
import 'babel-polyfill'
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let userInfo = getItem('userInfo')
  if (to.path === '/mybet' || to.path === '/userlist/account' || to.path === '/userlist/recharge' || to.path === '/userlist/withdraw' || to.path === '/recharge' || to.path === '/bindcash' || to.path === '/resetpwd' || to.path === '/resetcash') {
    if (!userInfo) {
      store.commit('popAffirmToggle', {flag: true, title: '请先登陆', path: '/log', redirect: to.fullPath})
    } else {
      next()
    }
  } else if (to.path === '/withdraw') {
    if (!userInfo) {
      store.commit('popAffirmToggle', {flag: true, title: '请先登陆', path: '/log', redirect: to.fullPath})
    } else {
      if (!userInfo.issetcashpassword) {
        store.commit('popAffirmToggle', {flag: true, title: '请先设置资金密码', path: '/bindcash'})
        return false
      }
      if (!userInfo.isbindbank) {
        store.commit('popAffirmToggle', {flag: true, title: '请先设置资金账户', path: '/bindbank'})
        return false
      }
      next()
    }
  } else if (to.path === '/bindbank') {
    if (!userInfo) {
      store.commit('popAffirmToggle', {flag: true, title: '请先登陆', path: '/log', redirect: to.fullPath})
    } else {
      if (getItem('userInfo').issetcashpassword) {
        next()
      } else {
        store.commit('popAffirmToggle', {flag: true, title: '请先设置资金密码', path: '/bindcash'})
      }
    }
  } else if (to.path === '/log') {
    if (!userInfo) {
      next()
    } else {
      next({path: '/index'})
    }
  } else {
    next()
  }
})

Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
