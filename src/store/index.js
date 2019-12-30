import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
let store = new Vuex.Store({
  plugins: [createPersistedState()],
  // 1. state
  state: {
    userInfo: ''
  },
  // 2. mutations
  mutations: {
    // state指的是state的数据
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  // 3. actions
  // 通常跟api接口打交道
  actions: {
    // state指的是state数据
    // commit调用mutations的方法
    // data就是调用此方法时要传的参数

    // api (state, data) {
    // 调用mutaions里面的方法
    // state.commit('setUserInfo', data)
    // }
  }
})

export default store
