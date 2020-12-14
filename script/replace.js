/*
 * @Descripttion:
 * @version:
 * @Author: Zhonglai Lu
 * @Date: 2020-11-18 14:53:27
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-14 16:41:26
 */

const path = require('path')
const fs = require('fs')

let fileArr = []
let defalutTyle = ['.js','.wxss']
const readDir = (entry) => {
  const dirents = function (fileName) {
    let sourcePath = path.join(entry, fileName)
    let reddir =  fs.readdirSync(sourcePath, {
      encoding: 'utf8',
      withFileTypes: true,
    })
    reddir.forEach(item => {
      // true 存在子目录
      if(item.isDirectory()) {
        dirents(item.name)
        return 
      }
      console.log(path.join(entry,item.name))
      if (defalutTyle.includes(path.extname(item.name))) fileArr.push(item.name)
    });
  }
  return dirents(entry)
}

readDir(path.resolve(__dirname, '../pages'))
readDir(path.resolve(__dirname, '../components'))


fileArr.forEach((item) => {
  let file = fs.readFileSync(item, 'utf8')
  let newFile = file.replace(/^http\:\/\/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\:8088$/g, 'https://daawaww.com')
  fs.writeFileSync(item, newFile, 'utf8')
})
