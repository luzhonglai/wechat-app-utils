<!--
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-09-02 16:13:52
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-27 10:20:20
-->

# Wechat_app 常用工具

## utils: 工具类

- wx.js: 常用微信方法 改造内置API

  - wxAPI 重写 wx-API 支持 Promise 回调
    - backSetData: 返回上级界面传值/调用方法

```js
  // 使用方法
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
  // 改造过后
  wxAPI.showModal({title:'这是一个模态弹窗'})
    .then(res=>{
    
    })
```

- util.js
  - timingStorage: 定时缓存 新增
  - getRouter: 获取页面路由 新增

- router.js: 公共路由方法 -------> 支持配置路由 支持promise回调
  - switchTab: tabBar 跳转方法
  - navigateTo: 非 tabBar 跳转方法
  - redirectTo: 非 tabBar 跳转且不记录栈的方法
  - navigateBack: 非 tabBar 回退方法

  ```js
    
    // 使用方式
      Router(type,{url}).then().catch(e)
      let res = await Router(type,{url, params});
  ```

## 小程序vscode支持less框架

> 辅助插件: minapp/wehat-snippet/wxml
> 应用商店安装easy less
> seting.json添加配置

```js
"less.compile": {
    "compress":  false,  // 是否删除多余空白字符
    // "sourceMap": true,  // 是否创建文件目录树，true的话会自动生成一个 .css.map 文件
    "outExt": ".wxss" // 输出文件的后缀,默认为.css
}
```

> 创建相应.less文件编写保存后自动生成wxss文件
