const state = {
  flag: true
}

const mutations = {
  toggle (state, stat) {
    console.log(11111)
    if (stat) {
      state.flag = true
    } else {
      state.flag = false
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
