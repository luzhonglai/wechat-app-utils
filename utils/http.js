/*
 * @Author: Rare lu
 * @Date: 2024-11-28 16:10:43
 * @LastEditTime: 2024-11-28 16:10:44
 * @LastEditors: Rare lu
 * @Description: 
 * @FilePath: /wechat-app-utils/utils/http.js
 */


import { modal, toast } from './extendApi'
import WxRequest from './request'
import { clearStorage, getStorage } from './storage'
// 对WxRequest进行实例化
// 现在会执行 constructor 中的代码
const instance = new WxRequest({
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
  timeout: 15000,
  isLoading: false
})

// 配置请求拦截器
instance.interceptors.request = (config) => {
  // 在请求发送之前做点什么......

  // 在发送请求之前,需要先判断本地是否存在访问令牌 token
  const token = getStorage('token')
  // 如果存在token,就需要在请求头中添加token字段
  if (token) {
    // 这里的['token']是一个属性访问器的语法，它允许你使用字符串作为键（key）来访问或设置对象的属性。
    config.header['token'] = token
  }
  return config
}

// 配置响应拦截器
instance.interceptors.response = async (response) => {
  // 从response中解构isSuccess
  const { isSuccess, data } = response
  // 如果isSuccess为false,说明执行了fail回调函数
  // 这时候就说明网络异常,需要给用户提示网络异常
  if (!isSuccess) {
    wx.showToast({
      title: '网络异常请重试',
      icon: 'error'
    })
    return response
  }
  // 对服务器响应数据做点什么......
  // console.log(response)

  // 判断服务器响应的业务状态码
  switch (data.code) {
    // 如果后端返回的业务状态码等于200,说明请求成功,服务器成功响应了数据
    case 200:
      // 对服务器响应数据做点什么......
      return data
    // 如果返回的业务状态码等于208,说明没有token,或者token失效
    // 就需要让用户登录或者重新登陆
    case 208:
      const res = await modal({
        content: "鉴权失败,请重新登录",
        showCancel: false // 不显示取消按钮
      })
      if (res) {
        // 消除之前失效的token,同时需要清除本地存储的全部信息
        clearStorage()
        wx.navigateTo({
          url: '/modules/otherModule/pages/login/login',
        })
      }
      return Promise.reject(response)
    default:
      toast({
        title: "程序出现异常,请联系客服或稍后重试"
      })
      return Promise.reject(response)
  }

  // 如果网络请求执行成功到这里,那么我们直接把data进行返回即可
  // return response
  return data
}

// 将WxRequest实例暴露出去，方便在其他文件中进行使用
export default instance
