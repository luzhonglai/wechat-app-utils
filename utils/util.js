/*
 * @Descripttion: 
 * @version: 
 * @Author: Zhonglai Lu
 * @Date: 2020-09-04 12:37:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-10-28 00:39:23
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

module.exports = {
  getRoute,
}
