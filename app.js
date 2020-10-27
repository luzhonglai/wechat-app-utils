/*
 * @Descripttion: 
 * @version: 
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-10-27 22:17:48
 */

//app.js
import wxAPI from './utils/wxApi';

App({
  wxAPI,
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    DEBUG: false
  }
})