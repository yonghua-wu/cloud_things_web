import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      accessToken: '',
      refreshToken: ''
    },
    userInfo: {
      email: ''
    }
  },
  mutations: {
    setAuth(state, payload) {
      state.auth.accessToken = payload.access_token
      state.auth.refreshToken = payload.refresh_token
    },
    setAccessToken(state, payload) {
      state.auth.accessToken = payload
    },
    resetAuth(state) {
      state.auth = {
        accessToken: '',
        refreshToken: ''
      }
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    resetUserInfo(state) {
      state.userInfo = {
        email: ''
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
