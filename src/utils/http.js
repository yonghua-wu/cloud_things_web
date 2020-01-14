import axios from 'axios'
import config from './config'
import vue from 'vue'

let sso = axios.create({
  baseURL: config.HOST + config.SSO_PATH
})
// 添加响应拦截器
sso.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // eslint-disable-next-line
  // console.log('response ', response)
  return response;
}, function (error) {
  // 对响应错误做点什么
  // eslint-disable-next-line
  // console.log('response err:', error.response)
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
export default {
  /**
   * 单点登陆接口
   */
  sso
}