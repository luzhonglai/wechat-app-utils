/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:40:19
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-10-28 01:31:30
 */

import { getRoute } from './util'
 
// 参数需要放到请求体中的方法
const requestBody = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH']

// code成功状态码
const API_SUCCESS_STATUS = 0

// 鉴权失败状态码
const API_AUTH_STATUS = [403,101,404,500]

let AccountInfoSync = wx.getAccountInfoSync()
// TODO  泛粉未绑定手机无邀请关系结算拦截状态码

// 开发环境 
let DEBUG  = true

//  请求配置
let configs = {
  host: DEBUG ? 'localhost:8811' : '',
  apiKey: '',
  title: '加载中...',
}

// 记录请求发出几次
let count = 0
let MAXIMUN = 3

// 请求默认参数
const defaultOption = async () => {
  let version = getApp().globalData.version
  let defaultOptions = {}
  let userInfo = await wx.getStorageSync('userInfo')
  let address = getCurrentPages().pop() && getCurrentPages().pop().getSelectedAddress ? await getCurrentPages().pop().getSelectedAddress(true) : {}
  defaultOptions.header = {
      platform: 'wxapp',
      'Content-Type': 'application/x-www-form-urlencoded',
      uid: userInfo && userInfo.uid ? userInfo.uid : '',
      utoken: userInfo && userInfo.utoken ? userInfo.utoken : '',
      province: address.province ? encodeURIComponent(address.province) : '',
      city: address.city ? encodeURIComponent(address.city) : '',
      district: address.district ? encodeURIComponent(address.district) : '',
      APIVERSION: '2',
      xcrole: (userInfo.level || userInfo.level == 0) ? userInfo.level : '',
      version: version || ''
  }
  return defaultOptions
}

const request = async (options= {}) => {
  if (count > MAXIMUN) return
  let url = options.url || ''
  const {params =  {}, isLoading = false , isData = true } = options
  const { host, title } = configs
  const defaultOptions  =  await defaultOption()
  const pageRouter = getRoute()

  let stagingRes = null
  console.log(host, options)
  const configOptions = {
    url: `${url.includes('localhost:8811')? url : `http://${host}${url.startsWith('/') ? url : `/${url}`}`}`,
    header:{ ...defaultOptions.header },
    method: (options.method || 'GET').toUpperCase(),
  };
  
  if(requestBody.includes(options.method.toUpperCase())){
    configOptions.data = params;
  } else if (typeof params === 'string') {
    configOptions.url += params;
  } 

  return new Promise((resolve, reject)=> {
    const startDate = Date.now();
    console.log(count)
    count <= 0 && isLoading && wx.showLoading({title})
    count++;
    wx.request({
      ...configOptions,
      success: res =>{
        stagingRes = res;
        let result = res.data;

        // 权限失败情况
        if (API_AUTH_STATUS.includes(result.status)) {
          let error = new Error('服务器错误，请稍后再试');
          if (result.status == '5555') {
              error.oss = '1'
          }
          // 异常错误吗提示
          error.errMsg = result.errMsg || result.errorMsg || '服务器错误，请稍后再试'
          error.status = result.status
          error.message = result.errMsg || result.errorMsg || '服务器错误，请稍后再试'
          reject(error)
        }
        // TODO  条件抽离
        if (result.status == API_SUCCESS_STATUS || (result.status == 200 && result.code == 0)) {
            if (isData) {
                resolve(result);
            } else {
                resolve(result.data);
            }
        } else {
            let error = new Error('服务器错误，请稍后再试');
            if (result.status == '5555') {
                error.oss = '1'
            }
            error.errMsg = result.errMsg || result.errorMsg || '服务器错误，请稍后再试'
            error.status = result.status || 200
            error.message = result.errMsg || result.errorMsg || '服务器错误，请稍后再试'
            reject(error);
        }
      },
      
      fail: (e) => {
        let error = new Error('服务器错误，请稍后再试');
        error.errMsg = '服务器错误，请稍后再试'
        error.message = '服务器错误，请稍后再试'
        reject(error)
      },


      complete: () => {
        const poorDate = Date.now() - startDate;
        count--;
        // 开发日志调试信息
        if (host.indexOf('db') < 0) {
            console.group(
                '%c当前请求详细信息： ',
                'background:#000;color:#bada55'
            );
            console.log('%c请求url：', 'color:#A101A6;font-weight: 600', url);
            console.log('%c请求参数：', 'color:#A101A6;font-weight: 600', params);
            console.log(
                '%c请求配置：',
                'color:#A101A6;font-weight: 600',
                options
            );
            console.log(
                '%c请求耗时：',
                'color:#A101A6;font-weight: 600',
                `${poorDate} ms`
            );
            console.log(
                '%c返回数据：',
                'color:#A101A6;font-weight: 600',
                stagingRes
            );
            console.groupEnd();
        }

        let apiRes = wx.getStorageSync('apiRes')
        let reqList = apiRes ? (apiRes.length >= 20 ? [] : apiRes) : []
        stagingRes && stagingRes.data && reqList && reqList.push({
            options,
            data: stagingRes.data,
            version: AccountInfoSync.miniProgram ? AccountInfoSync.miniProgram.version : '未获取到',
            pageRouter: pageRouter
        })

        wx.setStorageSync('apiRes', reqList)
        if (stagingRes && stagingRes.data && API_AUTH_STATUS.includes(stagingRes.data.code))
          return false;
          
        // 超过400ms 关闭Loading
        if (count <= 0 && isLoading) {
          if (poorDate < 400) {
              let timer = setTimeout(() => {
                  clearTimeout(timer);
                  wx.hideLoading();
              }, 400);
          } else {
              wx.hideLoading();
          }
        }
      }
    })
  }).catch((error) => {
    let catchError = new Error('服务器错误，请稍后再试')
    catchError.message = '服务器错误，请稍后再试'
    throw error || catchError
});
}

// 拼接url 检测是否存在项目名，如果存在不加，不存在自动补全
const parseUrl = url => {
  if (!url || typeof url !== 'string') url = ''
  return /^http/.test(url) ? url : configs.host + url
}

const wxPromise = (wxFn) => (obj) =>
  new Promise((resolve, reject) => {
    obj = obj || {}
    obj.success = (...args) => {
      resolve(...args)
    }
    obj.fail = (...args) => {
      reject(...args)
    }
    wxFn(obj)
  })

const wxAPI = {
  setConfig(newConfig) {
    configs = {
      ...configs,
      ...newConfig,
    }
    delete wxAPI.setConfig
  },
  request,
  get: (url, params = {}, isLoading = false, isData = true) => {
    const options = {
      url,
      params,
      isLoading,
      isData,
    }
    options.method = 'GET'
    return request(options)
  },
  post: (url, params = {}, isLoading = false, isData = true) => {
    const options = {
      url,
      params,
      isLoading,
      isData,
    }
    options.method = 'POST'
    return request(options)
  },
}


// wx对象属性监听器
Object.keys(wx).forEach((key) => {
  if (!(key in wxAPI)) {
    Object.defineProperty(wxAPI, key, {
      get: () => wxPromise(wx[key]),
    });
  }
});


export default wxAPI
