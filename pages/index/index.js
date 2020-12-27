/*
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-27 11:43:03
 */

// index.js
// 获取应用实例
const app = getApp();
const { wxAPI } = app;

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
    console.log(wxAPI);
    // const res = await wxAPI.request('/api/config', {}, true);

    // console.log(res);
    // console.log(wx.getStorageSync('apiRes'));
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
