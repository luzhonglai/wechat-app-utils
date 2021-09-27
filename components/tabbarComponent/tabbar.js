// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "/pages/index/index",
            "iconPath": "icon/tab1.png",
            "selectedIconPath": "icon/tab1-active.png",
            "text": "码上服务"
          },
          {
            "pagePath": "/pages/assemblyNumber/assemblyNumber",
            "iconPath": "icon/tab2.png",
            "selectedIconPath": "icon/tab2-active.png",
            "text": "集结号"
          },
          {
            "pagePath": "/pages/message/message",
            "iconPath": "icon/icon_release.png",
            "isSpecial": true,
            "text": ""
          },
          {
            "pagePath": "/pages/message/message",
            "iconPath": "icon/tab3.png",
            "selectedIconPath": "icon/tab3-active.png",
            "text": "消息"
          },
          {
            "pagePath": "/pages/my/my",
            "iconPath": "icon/tab4.png",
            "selectedIconPath": "icon/tab4-active.png",
            "text": "我的"
          },
    
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
