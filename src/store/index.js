import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      accessToken: '',
      refreshToken: ''
    }
  },
  mutations: {
    setAuth(state, payload) {
      state.auth = payload
    },
    setAccessToken(state, payload) {
      state.auth.accessToken = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
