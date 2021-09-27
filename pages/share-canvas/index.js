/*
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-11-03 14:34:18
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-15 16:02:33
 */

// page

// const api = require('../../apiservice/index')
// const wxAPI = getApp().wxAPI

const webURL = 'http://evone-test.sodoulala.com/batteryCheck/dist/batteryCheck.html#/Activate';

const { wx_downloads, np_null } = require('../../utils/wxApi');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgDraw: {
      width: '686rpx',
      height: '646rpx',
      background: '/assets/images/share3.png',
      borderRadius: '16rpx',
      views: [],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const id = options.id || '1101';
  },

  // 分享
  onShareAppMessage(options) {
    return {
      title: '电动汽车电池健康度评估',
      path: `/pages/webViewContainer/index?url=${webURL}`,
      imageUrl: '/assets/images/shareback.png',
    };
  },

  // 下载
  async downloadImage(imagPath) {
    wx_downloads(this.data.imagPath);
  },

  onImgOK(e) {
    this.data.imagPath = e.detail.path || '';
  },
  onShow() {},
  // appendString() {
  //     const str = '测试内容' + Math.random()
  //     addLog(str, { test: 1 })
  // },
  // readStr() {
  //     const list = getLogList(0)
  //     console.log('读取结果', list)
  // },
  // get1() {
  //     const data = getLogInfo(1)
  //     console.log('读取一个', data)
  // },
  // clearStr() {
  //     clearLog()
  // },
});
