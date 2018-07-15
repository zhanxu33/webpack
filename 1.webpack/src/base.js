console.log('hello')
$('#base').text('fuck you')
// npx 可以直接运行 node_modules/.bin 目录下的命令
// 通过配置package.json中的 script "build": "webpack"
// 入口加载CSS代码
// 因为css并不是js模块，所以需要转换，这些转换工具就是loader
require('./index.css')