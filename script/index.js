/*
 * @Descripttion: 配置本地静态资源
 * @version: v1.0.0
 * @Author: Zhonglai Lu
 * @Date: 2020-12-14 16:49:27
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-15 15:34:09
 */

'use script';

const express = require('express');
const path = require('path');
const config = require('../common/config');

// eslint-disable-next-line new-cap
const app = new express();
const serverConfig = config.server;

app.use(serverConfig.imgPath, express.static(path.resolve(__dirname, '../image')));

app.listen(serverConfig.port, (err) => {
  if (err) throw err;
  console.log(`----->server: 127.0.0.1:${serverConfig.port}`);
});
