/*
 * @Descripttion:  替换本地图片服务
 * @version: 1.0.0
 * @Author: Zhonglai Lu
 * @Date: 2020-11-18 14:53:27
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-15 16:01:20
 */

'use script';

const path = require('path');
const fs = require('fs');

const fileArr = [];

const defalutTyle = ['.js', '.wxss', '.wxml'];

const readDir = (entry) => {
  const dirents = function (entry) {
    const dirInfo = fs.readdirSync(entry);
    dirInfo.forEach((item) => {
      // true 存在子目录
      const sourcePath = path.join(entry, item);
      const info = fs.statSync(sourcePath);
      if (info.isDirectory()) {
        dirents(sourcePath);
        return;
      }
      if (defalutTyle.includes(path.extname(sourcePath))) fileArr.push(sourcePath);
    });
  };
  return dirents(entry);
};

// 需要替换的文件目录
readDir(path.resolve(__dirname, '../pages'));
// readDir(path.resolve(__dirname, '../components'));
const startDate = Date.now();
fileArr.forEach((item) => {
  const file = fs.readFileSync(item, 'utf8');
  const newFile = file.replace('/assets/image/', 'http:127.0.0.1:8088/assets/wechat_app/');
  fs.writeFileSync(item, newFile, 'utf8');
});
const poorDate = Date.now() - startDate;
// eslint-disable-next-line no-console
console.log(`文件总数: ${fileArr.length} 替换时间: ${poorDate} ms`);
