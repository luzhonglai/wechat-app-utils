/*
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-12-14 16:50:46
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-15 17:01:56
 */

/**
 * 设置项目为生成环境
 */

"use script";

const fs = require("fs");
const path = require("path");
const config = require("../common/config");

const cfgs = config.app.fundebug;

fs.writeFileSync(
  path.resolve(__dirname, "../os"),
  `module.exports=${JSON.stringify(cfgs)}`
);
