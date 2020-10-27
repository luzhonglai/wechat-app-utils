<!--
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-09-02 16:13:52
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-10-27 10:12:51
-->

# Wechat_app 常用工具

### utils: 工具类

- wx.js: 常用微信方法

  - wxAPI 重写 wx-API 支持 Promise 回调
    - backSetData: 返回上级界面传值/调用方法

  ```
  使用方法
    const wxAPI = getAPP().wxAPI;
    传统API
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    改造过后
    wxAPI.showModal({title:'这是一个模态弹窗'})
      .then(res=>{
      
      })
  ```

- router.js: 公共路由方法
  - switchTab: tabBar 跳转方法
  - navigateTo: 非 tabBar 跳转方法
  - redirectTo: 非 tabBar 跳转且不记录栈的方法
  - navigateBack: 非 tabBar 回退方法
