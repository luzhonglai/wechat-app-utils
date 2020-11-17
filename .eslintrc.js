/*
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-11-17 14:36:47
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-11-17 16:15:33
 */
module.exports = {
  extends: 'airbnb-base',
  globals: {
    DEBUG: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
    wx: 'readonly',
    getApp: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
};
