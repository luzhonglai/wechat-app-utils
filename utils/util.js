/*
 * @Descripttion: 
 * @version: 
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-11-10 17:42:28
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

/**
 * 定时存储storage
 * @param {*} path 图片路径
 * 
 */
const wx_downloads = async (path) => {
  let imagPath = path || ''
  let isOPenSetting = wx.getStorageSync('isOpenSetting') || false
  let openSetting = !isOPenSetting && (await wxAPI.openSetting())
  let getSetting = isOPenSetting && (await wxAPI.getSetting())

  if (!imagPath) throw new Error('path 参数不能为空')

  wx.showLoading({ title: '生成海报中' })
  let saveImage = () =>
    wxAPI
      .saveImageToPhotosAlbum({ filePath: imagPath })
      .then((res) => {
        wx.showToast({
          title: '图片保存成功，快去分享到朋友圈吧~',
          icon: 'none',
          duration: 2000,
        })
      })
      .catch((error) => {
        wx.showToast({
          title: '保存失败',
          icon: 'none',
        })
      })

  if (!isOPenSetting && openSetting.authSetting['scope.writePhotosAlbum'] === true) {
    wx.setStorageSync('isOpenSetting', true)
    saveImage(wx.hideLoading())
    return
  }

  if (isOPenSetting && getSetting.authSetting['scope.writePhotosAlbum']) {
    wxAPI
      .authorize({ scope: 'scope.writePhotosAlbum' })
      .then(saveImage(wx.setStorageSync('isOpenSetting', true)))
      .catch((error) => {
        console.log('请设置允许访问相册')
        wx.showToast({
          title: '请设置允许访问相册',
          icon: 'none',
        })
      })
  } else {
    saveImage(wx.hideLoading())
  }
}

module.exports = {
  getRoute,
  timingStorage,
  wx_downloads
}
