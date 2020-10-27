/*
 * @Descripttion: 
 * @version: 
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-10-28 01:19:25
 */

//index.js
//获取应用实例
const app = getApp()
const wxAPI = app.wxAPI

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap() {
  },
  async onLoad() {
    let res = await wxAPI.get('/api/config',{} ,true)
    
    console.log(res)
    console.log(wx.getStorageSync('apiRes'))
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
