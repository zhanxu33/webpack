// expose-loader(loader),?,变量名字!模块名或者路径 会先加载这个模块，然后得到模块到处对象，并且挂载到window
// 向全局暴露这个,不然在这个模块的其他子模块内，无法使用这个变量,模块之前的变量不能公用
let $ = require('expose-loader?$!jquery')
console.log('hello')
$('#app').text('app')

// npx 可以直接运行 node_modules/.bin 目录下的命令
// 通过配置package.json中的 script "build": "webpack"
// 入口加载CSS代码
// 因为css并不是js模块，所以需要转换，这些转换工具就是loader
require('style-loader!css-loader!./index.css')