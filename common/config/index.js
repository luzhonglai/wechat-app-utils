/*
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-12-14 16:53:33
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-15 10:59:12
 */

/**
 * 项目根配置
 */
module.exports = {
  name: '小程序配置',
  // 本地服务配置
  server: {
    port: 8088, // 服务的端口
    imgPath: '/assets/wechat_app', // 静态资源的域名路径
  },
  // 小程序配置
  app: {
    fundebug: false, // 开启fundebug日志
  },
};
