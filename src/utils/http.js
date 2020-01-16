import axios from 'axios'
import config from './config'
import vue from 'vue'

let sso = axios.create({
  baseURL: config.HOST + config.SSO_PATH
})
// 请求拦截器
sso.interceptors.request.use(function (config) {
  // eslint-disable-next-line
  console.log(config)
  let methodURL = config.method + ':' + config.url
  if (config.SSO_RULEOUT.indexOf(methodURL) === -1) {
    config.headers.Authorization = vue.$store.state.auth.accessToken || ''
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
sso.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 处理错误
  if ('response' in error) {
    return Promise.reject(error);
  } else {
    vue.$message({
      showClose: true,
      message: '网络异常',
      type: 'error'
    })
    return Promise.reject('Network Error')
  }
});

let ct = axios.create({
  baseURL: config.HOST + config.CLOUDTHINGD_PATH
})
ct.interceptors.request.use(function (config) {
  // eslint-disable-next-line
  console.log(config)
  let methodURL = config.method + ':' + config.url
  if (config.CT_RULEOUT.indexOf(methodURL) === -1) {
    config.headers.Authorization = vue.$store.state.auth.accessToken || ''
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default {
  /**
   * 单点登陆请求
   */
  sso,
  /**
   * 云物请求
   */
  ct
}