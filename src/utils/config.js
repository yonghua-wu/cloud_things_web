export default {
  /**
   * 主机
   */
  HOST: 'http://localhost:18080',
  /**
   * sso路径
   */
  SSO_PATH: '/sso/api/v1',
  /**
   * sso排除添加Authorization规则
   */
  SSO_RULEOUT: ['post:/auth', 'post:/user'], // 请求方法 + 冒号 + 请求路径
  /**
   * 云物路径
   */
  CLOUDTHINGS_PATH: '/cloud_things/api/v1',
  /**
   * 云物排除添加Authorization规则
   */
  CT_RULEOUT: [], // 请求方法 + 冒号 + 请求路径
}