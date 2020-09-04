/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:40:19
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-09-04 17:23:14
 */


// 参数需要放到请求体中的方法
const requestBody = ['POST', 'PUT', 'PATCH'];

// code成功状态码
const API_SUCCESS_STATUS = 0;

// 鉴权失败状态码
const API_AUTH_STATUS = [403];

// 坚定开发环境------>host
const DEBUG = app.globalData.DEBUG

//  配置配置处理
let configs = { 
  host: DEBUG ? 'https://wwww.baidu.com' : '',
  title: '加载中...',
}

// 记录请求发出几次
let count = 0;
let MAXIMUN = 3;


const request = async (options) => {
  if (count > MAXIMUN) return;
  const { url, isLoading = false , isData = true } = options;
  const { host, title } = configs;
  const defaultOptions  =  await defaultOptions();

  let stagingRes = null;

  const configOptions = {
    url: `${url.includes(host) ? url : `https://${host}${url.startsWith('/') ? url : `/${url}`}`}`,
    data,
    header:{ ...defaultOptions.header },
    method: (options.method || 'GET').toUpperCase(),
  }
  
  return new Promise((resolve, reject)=> {
    const startDate = Date.now();
    count <= 0 && isLoading && wx.showLoading({title})
    count++;
    wx.request({
      ...configOptions,
      success: res =>{
        stagingRes = res;
        let result = res.data;

        // 鉴权失败 403 
        if (API_AUTH_STATUS.includes(result.status)) {
          let error = new Error('服务器错误，请稍后再试');
          if (result.status == '5555') {
              error.oss = '1'
          }
          // 根据自己后台数据做提示
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
      fail: () => {
        let error = new Error('服务器错误，请稍后再试');
        error.errMsg = '服务器错误，请稍后再试'
        error.message = '服务器错误，请稍后再试'
        reject(error)
      },
      complete: () => {
        const poorDate = Date.now() - startDate;
        count--;
        if (domain.indexOf('dh') < 0) {
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

// 默认请求头部参数
const defaultOptions = async () =>{
  
}

// 拼接url 检测是否存在项目名，如果存在不加，不存在自动补全
const parseUrl = url => {
  if (!url || typeof url !== 'string') url = ''
  return /^http/.test(url)
      ? url
      : config.host + url
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

Object.keys(wx).map((key) => {
  if (!(wx in wxAPI)) {
    Object.defineProperty(wxAPI, key, {
      get: () => wxPromise(wx[key]),
    })
  }
})


const wxAPI = {
  setConfigs,
  request,
  get: (url, data = {}, isLoading = false, isData = true) => {
    const options = Object.create({
      url,
      data,
      isLoading,
      isData,
    })
    options.method = 'GET'
    return requset(options)
  },
  post: (url, data = {}, isLoading = false, isData = true) => {
    const options = Object.create({
      url,
      data,
      isLoading,
      isData,
    })
    options.method = 'POST'
    return requset(options)
  },
}

export { wxAPI }
