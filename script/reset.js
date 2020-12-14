/*
 * @Descripttion: 
 * @version: 
 * @Author: Zhonglai Lu
 * @Date: 2020-12-14 16:50:46
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-14 16:54:56
 */

 /**
 * 设置项目为生成环境
 */
const config = require('config');
const fs = require('fs');
const path = require('path');

const cfgs = config.get('app');

fs.writeFileSync(path.resolve(__dirname, '../os.js'), 'module.exports=' + JSON.stringify(cfgs));
