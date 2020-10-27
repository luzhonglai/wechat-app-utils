/*
 * @version: 1.0
 * @Author: Zhonglai Lu
 * @Date: 2020-10-27 21:17:26
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-10-27 22:03:19
 */
import { wxAPI } from './wxApi'

// 配置路由key
const pagesRouter = {

}

let typeArr = ['switchTap', 'naviagteTo', 'redirectTo', 'naviagteBack']

export function Router(type, options) {
  if (!typeArr.includes(type)) {
    new Error('输入符合的type类:'+ typeArr.json())
    return
  }
  return wxAPI[type]({ url })
}

