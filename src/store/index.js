import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: null,
    popLoadFlag: false,
    popMsgFlag: false,
    popMsgDesc: '',
    popAffirmFlag: false,
    popAffirmDesc: {flag: false}
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, stat) {
      if (stat) {
        state.userInfo = stat
      } else {
        state.userInfo = null
      }
    },
    setUserProp (state, stat) {
      if (stat) {
        state.userInfo[stat['prop']] = stat['val']
      } else {
        state.userInfo = null
      }
    },
    popLoadToggle (state, stat) {
      state.popLoadFlag = stat
    },
    popMsgToggle (state, desc) {
      state.popMsgFlag = true
      state.popMsgDesc = desc
      setTimeout(() => {
        state.popMsgFlag = false
        state.popMsgDesc = ''
      }, 1500)
    },
    popAffirmToggle (state, stat) {
      state.popAffirmFlag = stat.flag
      state.popAffirmDesc = stat
    }
  },
  actions: {
  }
})
