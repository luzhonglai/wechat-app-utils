/*
 * @Descripttion: 
 * @version: 
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-10-28 01:43:26
 */

/**
 * 获取页面路由
 */
const getRoute = () => {
  const pages = getCurrentPages()
  let result = ''
  let ln = pages.length
  if (ln > 0) {
      return pages[ln - 1]['route']
  }
  return result
}

/**
 * 定时存储storage
 * @param {*} key
 * @param {*} value
 * @param {*} expiration 存储时间 默认2天
 */
function timingStorage(key, value = '', expiration = 172800000) {
  let timestamp = Date.parse(new Date())
  //赋值
  if (key && value) {
      wx.setStorageSync(key, value)
      wx.setStorageSync(key + 'Expiration', timestamp + expiration)
  } else {
      //过期 清空
      let timestampExpiration = wx.getStorageSync(key + 'Expiration')
      if (timestampExpiration < timestamp) {
          wx.removeStorageSync(key)
          wx.removeStorageSync(key + 'Expiration')
          return ''
      } else {
          return wx.getStorageSync(key)
      }
  }
}

module.exports = {
  getRoute,
  timingStorage
}
