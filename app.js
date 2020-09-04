/*
 * @Descripttion: 
 * @version: 
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-09-04 17:26:45
 */

//app.js
import wxApi from './utils/wxApi';

App({
  wxApi,
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  }
})