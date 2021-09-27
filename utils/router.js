/*
 * @version: 1.0
 * @Author: Zhonglai Lu
 * @Date: 2020-10-27 21:17:26
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-24 22:41:11
 */
import  wxAPI from './wxApi'


/**
 * 参数拼接
 */ 
function paramsJoint(path, params, isQuestion){
  for (let item in params) {
      path =
          path.indexOf('?') != -1 || isQuestion
              ? `${path}&${item}=${params[item]}`
              : `${path}?${item}=${params[item]}`
  }
  return path
}


/**
 * 配置路由
 */
const pagesRouter = {
  home: '...',
  login:'...',

}

let defaultType = ['reLaunch', 'switchTab', 'redirectTo', 'navigateTo','navigateBack']

/**
 * @param {type} 调用的路由类型
 * @param {name} 路由名
 * @param {params} { query参数 }
 * @param {delta} 回退页数，默认1
 * @param {success} 成功的回调
 * @param {fail} 失败的回调
 * @param {complete} 不管成功或失败的回调
 */
export function Router(type = '', options) {
  // 执行鉴权
  if(options == undefined) throw new Error('没有传入 options 必须是个对象') 
  if (options.params && options.params.constructor !== Object) throw new Error('params属性必须是一个对象')
  if (!defaultType.includes(type)) throw new Error('输入符合的类型:' + defaultType.join())

  // 处理url参数格式化
  let url = paramsJoint(pagesRouter[options.name], options.params) || ''
  let obj = null;
  
  if(type != 'navigateBack') {
    obj = { url }
  } else {
    obj = {
      delta: options.delta || 1
    }
  }
  return wxAPI[type]()
}
