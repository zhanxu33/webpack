/*
* @source: 文件的原内容
*/
//BannerLoader 给每个文件前面加一段话
const loaderUtils = require('loader-utils')
// 校验
const validate = require('schema-utils')
const json = {
  "type": "object",
  "properties": {
    "hehe": {
      "type": "boolean"
    }
  }
}
module.exports = function(source) {
  // 拿到option的内容
  let options = loaderUtils.getOptions(this)
  validate(json, options, 'jsLoader')
  console.log(options)
  // return source
  // 下面的写法一样的
  this.callback(null, source)
}