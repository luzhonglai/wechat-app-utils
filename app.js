/*
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-27 11:41:05
 */

// app.js
import { promiseAll } from 'wechat-api-promise';

App({
  wxAPI: promiseAll(wx, {}),
  onLaunch() {},
  globalData: {
    userInfo: null,
    DEBUG: false,
  },
});
