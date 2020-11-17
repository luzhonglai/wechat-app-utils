/*
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-11-17 16:17:08
 */

// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 事件处理函数
  bindViewTap() {
  },
  async onLoad() {

    // let res = await wxAPI.get('/api/config',{} ,true)

    // console.log(res)
    // console.log(wx.getStorageSync('apiRes'))
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
