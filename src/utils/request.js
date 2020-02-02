import axios from 'axios'
import config from './config'
import store from '../store'
import router from '../router'
import { Message } from 'element-ui'
// function authString(server, method, url) {
//   let methodURL = method + ':' + url
//   let ruleOut = null
//   switch (server) {
//     case 'sso':
//       ruleOut = 'SSO_RULEOUT'
//       break;
//     case 'ct':
//       ruleOut = 'CT_RULEOUT'
//       break;
//   }
//   if (config[ruleOut].indexOf(methodURL) === -1) {
//     return store.state.auth.accessToken || ''
//   }
//   return ''
// }

function refreshAuth() {
  return new Promise((resolve, reject) => {
    axios({
      url: config.HOST + config.SSO_PATH + '/auth',
      method: 'patch',
      data: {
        refresh_token: store.state.auth.refreshToken // 携带 refresh token
      }
    }).then( res => {
      // eslint-disable-next-line no-console
      console.log(res)
      store.commit('setAccessToken', res.data.access_token) // 缓存新的 access token
      resolve(res)
    }).catch( err => {
      if (err && err.response && err.response.status === 401) {
        Message({
          message: '验证失败，请重新登陆',
          type: 'error'
        });
        store.commit('resetAuth') // 重置 auth
        router.replace('/login')
      } else {
        this.$message({
          message: '网络异常',
          type: 'error'
        });
      }
      reject(err)
    })
  })
}

async function net(config) {
  let req
  try {
    req = await axios(config)
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      try {
        let refresh = await refreshAuth()
        config.headers.Authorization = refresh.data.access_token
        req = await axios(config)
      } catch(err) {
        throw err
      }
    } else {
      this.$message({
        message: '网络异常',
        type: 'error'
      });
      throw err
    }
  }
  return req
}

class Request {
  /**
   * 发送请求
   * @param {String} server 选择的服务（sso，ct）
   */
  constructor(server) {
    switch (server) {
      case 'sso':
        this.fullUrl = config.HOST + config.SSO_PATH
        break;
      case 'ct':
        this.fullUrl = config.HOST + config.CLOUDTHINGS_PATH
        break;
      default :
        this.fullUrl = config.HOST + server
        break;
    }
  }
  /**
   * 发送get请求
   * @param {String} url 请求地址
   * @param {Object} data params中的传参
   */
  get(url, data = {}) {
    let config = {
      url: this.fullUrl + url,
      method: 'get',
      params: data,
      headers: {
        'Authorization': store.state.auth.accessToken
      }
    }
    // eslint-disable-next-line no-console
    console.log(config)
    return net(config)
  }
  /**
   * 发送get请求
   * @param {String} url 请求地址
   * @param {Object} data data中的传参
   */
  post(url, data = {}) {
    //eslint-disable-next-line
    console.log(store)
    let config = {
      url: this.fullUrl + url,
      method: 'post',
      data: data,
      headers: {
        'Authorization': store.state.auth.accessToken
      }
    }
    if (url === '/auth') { // 排除登陆
      return axios(config)
    } else {
      return net(config)
    }
  }
  /**
   * 发送put请求
   * @param {String} url 请求地址
   * @param {Object} data data中的传参
   */
  put(url, data = {}) {
    let config = {
      url: this.fullUrl + url,
      method: 'put',
      data: data,
      headers: {
        'Authorization': store.state.auth.accessToken
      }
    }
    return net(config)
  }
  /**
   * 发送patch请求
   * @param {String} url 请求地址
   * @param {Object} data data中的传参
   */
  patch(url, data = {}) {
    let config = {
      url: this.fullUrl + url,
      method: 'patch',
      data: data,
      headers: {
        'Authorization': store.state.auth.accessToken
      }
    }
    return net(config)
  }
  /**
   * 发送delet请求
   * @param {String} url 请求地址
   * @param {Object} data data中的传参
   */
  del(url, data = {}) {
    let config = {
      url: this.fullUrl + url,
      method: 'delete',
      data: data,
      headers: {
        'Authorization': store.state.auth.accessToken
      }
    }
    return net(config)
  }
}

let sso = new Request('sso')
let ct = new Request('ct')

export default {
  sso,
  ct,
  Request
}