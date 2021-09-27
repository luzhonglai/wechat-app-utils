/**
 * 项目根配置
 */
module.exports = {
  name: '小程序配置',
  // 本地服务配置
  server: {
    port: 8088, // 服务的端口
    imgPath: '/assets/wechat_app', // 静态资源的域名路径
    imgDev: '/assets/images', // 本地静态资源路径
    imgHost: 'http:127.0.0.1:8088/assets/wechat_app/', // 替换路径名
  },
  // 小程序配置
  app: {
    fundebug: false, // 开启fundebug日志
  },
};
